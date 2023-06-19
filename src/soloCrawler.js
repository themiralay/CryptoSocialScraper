import Crawler from './crawler/crawler.js';

const crawler = new Crawler();

class SoloCrawler(url){
    const url = 'https://google.com';

    const result = await crawler.crawl(url);
    debugger
}