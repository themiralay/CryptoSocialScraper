const telegramDomains= [
    "telegram.me",
    "telegram.org",
    "telesco.pe",
    "tg.dev",
    "t.me"
]

const discordDomains = [
    "discordapp.com",
    "discordapp.net",
    "discord.com",
    "discord.gg",
    "discord.media",
    "discordstatus.com"
]

const redditDomains = [
    "redd.it",
    "redditblog.com",
    "reddit.com",
    "redditinc.com",
    "redditmedia.com",
    "redditstatic.com",
    "redditstatus.com"
]

const twitterDomains = [
    "twttr.com",
    "twitterinc.com",
    "twitter.com",
    "twitter.co",
    "t.co",
    "tweetdeck.com"
]

const CMC_CURRENCY_GETTER = /currencies\/([^/]+)\/$/;

async function cmcCurrencyGetter(url){
    const fetchCMC = await fetcher(url,options)
    const $ = cheerio.load(fetchCMC)
    const links = await getAllLink($,url)
    const cmcCryptoLinks = []
    for (const link of links) {
        const match = link.match(CMC_CURRENCY_GETTER);
        if(match){
            cmcCryptoLinks.push(link)
        }
    }
    return cmcCryptoLinks
}


async function cmcDiscordTelegramGetter(url){
    const urlSet = new Set();
    const Crypto ={
        name:"",
        symbol:"",
        telegram:{
            pages:[],
            onlineAverage:0,
            memBerAverage:0
        },
        discord:{
            pages:[],
            onlineAverage:0,
            memBerAverage:0
        },
        reddit:{
            pages:[]
        },
        twitter:{
            pages:[]
        },
    }
    const fetchCMC = await fetcher(url,options)
    const $ = cheerio.load(fetchCMC)
    const filteredLinks = $('a[rel="nofollow noopener"]');
    filteredLinks.each((index, element) => {
        const href = $(element).attr('href');
        urlSet.add(href)
    });
    for (const item of urlSet) {
        if(telegramDomains.includes(item)){
            Crypto.telegram.push(item)
        }else if(twitterDomains.includes(item)){
            Crypto.telegram.push(item)
        }else if(redditDomains.includes(item)){
            Crypto.reddit.push(item)
        }else if(redditDomains.includes(item)){
            Crypto.reddit.push(item)
        }
    }
    debugger

}