import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

//const url = 'https://t.me/Aavesome';
const url = 'https://t.me/pepecoineth';

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