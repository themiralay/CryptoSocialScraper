import cluster from 'cluster';
import os from 'os';
import Crawler from './crawler.js';

class ClusterCrawler {
  constructor() {
    this.numCPUs = os.cpus().length;
    this.crawler = new Crawler();
  }

  async crawlInCluster(urls, parserFunction) {
    if (cluster.isPrimary) {
      return this.setupMasterProcess(urls, parserFunction);
    } else {
      await this.setupWorkerProcess();
    }
  }

  async setupWorkerProcess() {
    process.on('message', async (message) => {
      const { urls, parser } = message;
      const results = [];

      for (const url of urls) {
        try {
          const result = await this.crawler.crawl(url, parser);
          results.push(result);
        } catch (error) {
          console.error(`Error crawling ${url}:`, error);
        }
      }

      this.sendResultsToMasterProcess(results);
      process.exit(0);
    });
  }

  async setupMasterProcess(urls, parser) {
    const numWorkers = Math.min(this.numCPUs, urls.length);
    const urlChunks = this.splitUrlsIntoChunks(urls, numWorkers);
  
    const promises = [];
    const allResults = [];
  
    for (let i = 0; i < numWorkers; i++) {
      const worker = cluster.fork();
      const workerUrls = urlChunks[i];
  
      promises.push(
        new Promise((resolve, reject) => {
          worker.on('message', (message) => {
            if (message.type === 'result') {
              allResults.push(...message.result);
            } else if (message.type === 'error') {
              console.error('Worker error:', message.error);
            }
          });
  
          worker.on('exit', (code, signal) => {
            if (signal) {
              console.log(`Worker ${worker.process.pid} was terminated by signal: ${signal}`);
            } else if (code !== 0) {
              console.error(`Worker ${worker.process.pid} exited with error code: ${code}`);
            }
          });
  
          worker.send({ urls: workerUrls, parser });
  
          // İşçi süreci sonlandığında resolve() çağırılır
          worker.on('exit', () => {
            resolve();
          });
        })
      );
    }
  
    await Promise.all(promises);
  
    // Tüm işçi süreçleri tamamlandığında sonuçları döndürür
    return allResults;
  }

  sendResultsToMasterProcess(results) {
    process.send({ type: 'result', result: results });
  }

  splitUrlsIntoChunks(urls, numChunks) {
    const urlChunks = [];
    const chunkSize = Math.ceil(urls.length / numChunks);

    for (let i = 0; i < urls.length; i += chunkSize) {
      const chunk = urls.slice(i, i + chunkSize);
      urlChunks.push(chunk);
    }

    return urlChunks;
  }
}

export default ClusterCrawler;