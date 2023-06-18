import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'node:fs'

//const url = 'https://t.me/Aavesome';
//const url = 'https://t.me/pepecoineth';
const cmcUrl = 'https://coinmarketcap.com/';



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


const cmcTelegram= await cmcDiscordTelegramGetter("https://coinmarketcap.com/currencies/cardano/")
debugger
for (let index = 1; index <= 60; index++) {
    const url = `${cmcUrl}?page=${index}`
    const cmcPageCoin = await cmcCurrencyGetter(url)
    await saveArrayToCSV(cmcPageCoin, 'output.csv');
}
//const result = getChannelStatus($page)