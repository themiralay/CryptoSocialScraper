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