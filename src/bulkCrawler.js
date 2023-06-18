import ClusterCrawler from "./crawler/cluster.js";

const clusterCrawler = new ClusterCrawler();

const urls = ['https://google.com', 'https://stackoverflow.com/', 'https://mynet.com'];
const twitterParser = (data) => {
  // Twitter parsing işlemleri
  // ...
  return parsedData;
};

const results = await clusterCrawler.crawlInCluster(urls,null);

console.log('All results:', results);