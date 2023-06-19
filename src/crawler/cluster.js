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
      return this.setupWorkerProcess(urls, parserFunction);
    }
  }

  async setupWorkerProcess(urls, parserFunction) {
    const results = [];

    for (const url of urls) {
      try {
        const result = await this.crawler.crawl(url, parserFunction);
        results.push(result);
      } catch (error) {
        console.error(`Error crawling ${url}:`, error);
      }
    }

    return results;
  }

  async setupMasterProcess(urls, parserFunction) {
    const numWorkers = Math.min(this.numCPUs, urls.length);
    const urlChunks = this.splitUrlsIntoChunks(urls, numWorkers);

    const promises = [];

    for (let i = 0; i < numWorkers; i++) {
      const workerUrls = urlChunks[i];

      promises.push(
        new Promise((resolve, reject) => {
          const worker = cluster.fork();

          worker.on('message', (message) => {
            if (message.type === 'result') {
              resolve(message.result);
            } else if (message.type === 'error') {
              console.error('Worker error:', message.error);
              resolve([]);
            }
          });

          worker.send({ urls: workerUrls, parser: parserFunction });

          worker.on('exit', (code, signal) => {
            console.log(`Worker ${worker.process.pid} exited with code: ${code}. Restarting...`);
            cluster.fork();
          });
        })
      );
    }

    const results = await Promise.all(promises);
    return results.flat();
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