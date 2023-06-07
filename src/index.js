import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'node:fs'

//const url = 'https://t.me/Aavesome';
//const url = 'https://t.me/pepecoineth';
const cmcUrl = 'https://coinmarketcap.com/';

const headers = {
  'Content-Type': 'application/json',
  //'Authorization': 'Bearer your_token'
};

const options = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'no-cache'
  // Additional options can be added here
};



async function fetcher(url,options){
    const result = await fetch(url, options)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
    return result
}


async function getChannelStatus($){
    const ret ={
        totalCount:0,
        onlineCount:0
    }
    let counterText = $('.tgme_page_extra')?.text();
    counterText = counterText.split(',')
    if(counterText===''){
        throw new Error('Telegram counterText not found')
    }
    for (const iterator of counterText) {
        if(iterator.includes('subscribers') || iterator.includes('members') ){
            ret.totalCount= await cleanStringToInt(iterator)
        }
        if(iterator.includes('online')){
            ret.onlineCount= await cleanStringToInt(iterator)
        }
    }
    return ret;
}

async function cleanStringToInt(string) {
    const cleanedStr = string.replace(/\D/g, '');
    const result = parseInt(cleanedStr, 10);
    return result;
}

async function getAllLink($,url){
    let baseUrl = url
    const baseHref = $('base').attr('href')

    if (baseHref) {
        const isHrefAbsolute = /^[a-z][a-z0-9+.-]*:/.test(baseHref)
        if (isHrefAbsolute) {
        baseUrl = baseHref
        } else if (baseHref === '/') {
        baseUrl = (new URL(baseHref, url)).href
        }
    }

    const urlArray = $('a')
    .map((_i, el) => $(el).attr('href'))
    .get()
    .filter((href) => !!href)
    .map((href) => {
      // Throw a meaningful error when only a relative URL would be extracted instead of waiting for the Request to fail later.
      // http htpps
      const isHrefAbsolute = /^[a-z][a-z0-9+.-]*:/.test(href) // Grabbed this in 'is-absolute-url' package.
      if (!isHrefAbsolute && !baseUrl) {
        throw new Error(`An extracted URL: ${href} is relative and options.baseUrl is not set. ` +
                'Use options.baseUrl in enqueueLinks() to automatically resolve relative URLs.')
      }
      const tryAbsolute = () => {
        try {
          return (new URL(href, baseUrl)).href
        } catch {
          return undefined
        }
      }
      return baseUrl
        ? tryAbsolute()
        : href
    })
    .filter((href) => !!href) || []
    return urlArray
}
const regex = /currencies\/([^/]+)\/$/;

// function cutLastTwoSlash(str) {
//     var cutSlashIndex = str.lastIndexOf('/');
//     var secondSlashIndex = str.lastIndexOf('/', cutSlashIndex - 1);
//     return str.slice(0, secondSlashIndex);
//   }

async function cmcCurrencyGetter(url){
    const fetchCMC = await fetcher(url,options)
    const $ = cheerio.load(fetchCMC)
    const links = await getAllLink($,url)
    const cmcCryptoLinks = []
    for (const link of links) {
        const match = link.match(regex);
        if(match){
            cmcCryptoLinks.push(link)
        }
    }
    return cmcCryptoLinks
}

async function saveArrayToCSV(array, filePath) {
    const csvData = array.join('\n');
  
    await new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filePath, { flags: 'a' });
      stream.write(csvData, 'utf-8', (error) => {
        if (error) {
          reject(error);
        } else {
          stream.end();
          resolve();
        }
      });
    });
  
    console.log('Write Ok:', filePath);
  }


for (let index = 1; index <= 60; index++) {
    const url = `${cmcUrl}?page=${index}`
    const cmcPageCoin = await cmcCurrencyGetter(url)
    await saveArrayToCSV(cmcPageCoin, 'output.csv');
}
debugger
//const result = getChannelStatus($page)