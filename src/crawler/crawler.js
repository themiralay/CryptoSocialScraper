import fetch from 'node-fetch';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
];

class Crawler {
  constructor() {
    this.headers = {
      'User-Agent': this.getRandomUserAgent(),
      'Accept-Language': 'en-US,en;q=0.9',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  }

  getRandomUserAgent() {
    const randomIndex = Math.floor(Math.random() * USER_AGENTS.length);
    return USER_AGENTS[randomIndex];
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetchWithDelay(url) {
    //await this.delay(Math.floor(Math.random() * 100) + 100);
    const response = await fetch(url, { headers: this.headers });

    // Control With IP Ban
    if (response.status === 403 || response.status === 429) {
      throw new IPBanError('IP ban occurred.');
    }

    const html = await response.text();
    return html;
  }

  async crawl(url, parserFunction) {
    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
      try {
        const data = await this.fetchWithDelay(url);

        if (parserFunction) {
          return parserFunction(data);
        }

        return data;
      } catch (error) {
        console.error(`An error occurred while crawling ${url}:`, error);
        if (error instanceof IPBanError) {
          await this.delay(5000); // 5 saniye bekleme
        }

        retries++;
      }
    }

    console.error(`Failed to crawl ${url} after ${maxRetries} retries.`);
    return null;
  }
}

export default Crawler;