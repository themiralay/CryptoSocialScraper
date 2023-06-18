import Crawler from './crawler/crawler.js';

const crawler = new Crawler();

const url = 'https://google.com';
const twitterParser = (data) => {
  // Twitter parsing işlemleri
  // ...
  return parsedData;
};

const result = await crawler.crawl(url);
debugger