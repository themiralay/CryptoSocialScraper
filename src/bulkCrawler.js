import ClusterCrawler from "./crawler/cluster.js";

const clusterCrawler = new ClusterCrawler();

const urls = ["https://www.hurriyet.com.tr/ekonomi/dunyada-tam-elektrikli-otomobil-yapan-ikinci-firmayiz-42171679 ", 
"https://www.trthaber.com/haber/gundem/togg-ile-yeni-donem-avmde-begen-eve-teslim-al-724162.html ", 
"https://www.ahaber.com.tr/gundem/2022/11/17/istanbul-sagduyulu-diplomasinin-merkezi-oldu-bm-genel-sekreteri-guterres-erdogana-derin-sukranlarimi-sunuyorum: ",
 "https://www.haberler.com/guncel/hedef-ucak-simsek-supersonik-ucaga-15365435-haberi/ ", 
 "https://www.haberler.com/teknoloji/apple-watch-bu-kez-bir-cocugun-hayatini-kurtardi-15376839-haberi/ ", 
 "https://www.haberler.com/yerel/yanik-ulkenin-rengi-togg-u-susleyecek-15393655-haberi/ ", 
 "https://www.haberler.com/teknoloji/togg-ilk-siparisi-veren-cumhurbaskani-recep-15409606-haberi/ ", 
 "https://www.haberler.com/yerel/twitter-kullanici-sayisi-tum-zamanlarin-en-yuksek-15415135-haberi/ ",
  "https://www.haberler.com/teknoloji/turkiye-nin-ilk-ucak-gemisine-helikopterler-15437781-haberi/ ",
   "https://www.haberler.com/teknoloji/turkiye-nin-en-yuksek-yerlilik-oranina-sahip-15436749-haberi/ ",
    "https://www.haberler.com/ekonomi/togg-ceo-su-gurcan-karakas-3-dakikada-bir-togg-15452041-haberi/ ", 
    "https://www.ntv.com.tr/ntvpara/kenya-40-dolara-akilli-telefon-uretecek,MBC4WlmX5kq3eELc8nZtMQ ", 
    "https://www.ntv.com.tr/teknoloji/avrupa-uzayda-elektrik-uretimi-icin-harekete-geciyor-solaris-girisimi-nedir,XgNC3XEuBUCQzcc3zFn1Gw ", 
    "https://www.ntv.com.tr/teknoloji/yerli-savas-ucaginin-gorev-bilgisayari-ilk-kez-tanitildi,_add7DvfBECg0_FGIeqQCQ ", 
    "https://www.ntv.com.tr/teknoloji/musteri-deneyiminde-emea-bolgesinin-en-iyisi-yine-teleperformance-oldu,X0ZY0rbN2kKfw2xsQ9iJ9Q ", 
    "https://www.ntv.com.tr/galeri/teknoloji/nasanin-ay-gorevi-rekor-kirdi-en-uzak-noktaya-uctu,-eygrm1akk-pf4BVT_HvIQ ", 
    "https://www.ntv.com.tr/galeri/sporskor/alperen-kariyer-rekoru-kirdi-rockets-kazandi,xkhXVnuGyUOvjflOGeMiWQ ",
     "https://www.ntv.com.tr/galeri/sporskor/kosta-rika-japonyayi-devirdi,w-SAT_-xTkuU9ae0eoPHiA/6KohyCKqnUipQfCXGUJNMg ",
      "https://www.ntv.com.tr/galeri/sporskor/dunya-kupasi-portekiz-2-golle-turladi,fEgz-w0hlkq6l_NOVL3Deg ",
       "https://www.ntv.com.tr/turkiye/kabine-sonrasi-aciklama-cumhurbaskani-erdogan-eytyil-sonuna-kadar-gundemimizden-cikacak,DLRA2R6rnkuj5XTnADeUFQ ", 
       "https://www.ntv.com.tr/galeri/n-life/magazin/gulsenden-izmir-gundogdu-meydaninda-yilbasi-konseri,FMWWvYu7T0iygNJSaDcSBA ", 
       "https://www.ntv.com.tr/galeri/n-life/magazin/yali-capkini-oyunculari-kapak-yildizi-oldu,WhYmIm3Bc0-bit9GaxtIYQ ", 
       "https://www.ntv.com.tr/galeri/n-life/magazin/romada-evlenenipek-filiz-yazici-ve-ufuk-beydemir-istanbulda-dugun-yapti,kI05bBQGsUSZJOXmPPGBEA ",
        "https://www.ntv.com.tr/galeri/n-life/kultur-ve-sanat/avatar-suyun-yolu-zirveyi-birakmiyor-23-25-aralik-2022-abd-gisesi,jy8q4fBH_UWY-0niGBX3qg ",
        "https://www.ntv.com.tr/video/teknoloji/cinde-enerji-devrimi,lMfQLI1qMEK3mB3p7RZD5w ",
         "https://www.ntv.com.tr/video/teknoloji/cin-uzay-istasyonunu-tamamlayacak-tekno-hayat,scGmpQmg2EG5roNUqvWnrQ ", 
         "https://www.sozcu.com.tr/spor/basketbol/fenerbahce-beko-anadolu-efesi-uzatmalarda-gecti-93-90-7536369/?utm_source=anasayfa&utm_medium=free&utm_campaign=alt_surmanset ", 
         "https://www.sozcu.com.tr/hayatim/seyahat/dunyanin-en-populer-10-plaji/?utm_source=anasayfa&utm_medium=free&utm_campaign=sag_textmanset ", 
         "https://www.sozcu.com.tr/spor/futbol/georgina-rodriguezden-ronaldoya-cilgin-yeni-yil-hediyesi-7536109/ ", 
         "https://www.sozcu.com.tr/spor/dunyadan-spor/liverpool-aston-villa-galibiyetiyle-dondu-1-3-7536421/?utm_source=anasayfa_spor&utm_medium=free&utm_campaign=anasayfa_spor_zone_2 "
];
const twitterParser = (data) => {
  // Twitter parsing işlemleri
  // ...
  return parsedData;
};

try {
  const results = await clusterCrawler.crawlInCluster(urls)
  console.log(results)
} catch (error) {
  console.log(error)
}