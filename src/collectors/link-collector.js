//import { CheckUrlFast } from '@searchengine/bulcheckurl'

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
    const cleanUrls = []
    for (const currentUrl of urlArray) {
        const parsedUrl = CheckUrlFast(currentUrl)
        cleanUrls.push(parsedUrl.cleanUrl)
    }
    const linkSet = new Set(cleanUrls)
    return [...linkSet]
}