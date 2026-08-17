const fs=require('fs'),path=require('path');
const root=__dirname,dir=path.join(root,'domain'),indexPath=path.join(root,'index.html');
let index=fs.readFileSync(indexPath,'utf8');

// Seller asking-price strategy, not an independent appraisal. 2026 portfolio pass:
// commercial clarity + memorability + extension fit + end-user breadth + Web3 sale patterns.
const prices={
'bookaflight.x':12500,'bookahotel.x':12500,'grandhotel.x':15000,'thecheckout.crypto':12500,'thepawnshop.x':12500,
'bargainholidays.x':9500,'injuryclaims.x':9500,'energysaver.x':8500,'investdubai.x':7500,'onlinecrypto.x':7500,
'pizzamenu.x':7500,'swisstime.x':7500,'sellyourdomain.x':7500,'casinolive.x':7500,'casinoresort.x':7500,
'assetportfolio.x':6500,'bookingonline.x':6500,'onlinefoodmenu.x':6500,'fastfoodmenu.x':6500,'hotelsforless.x':6500,
'vegasgames.x':6500,'carpoint.x':6000,'cosmeticsurgeon.x':6000,'phonesdirect.x':5000,'repairmycredit.x':5000,
'generatewealth.x':5000,'houseoffashion.x':5000,'songsdirect.crypto':4500,'indianmenu.x':4500,'showseats.crypto':3500,
'friendsbook.x':3500,'sexetera.x':3500,'thepawnshop.wallet':3000,'thepawnshop.bitcoin':2500,'bookingsonline.wallet':2500,
'buyausedcar.crypto':2500,'buyabook.crypto':2500,'bookataxi.crypto':2500,'guitarman.x':2500,'wildatlanticway.x':2500,
'lovechina.x':2500,'lovejapan.x':2500,'mywebsite.wallet':2500,'marxman.x':2500,'countykerry.x':1500,
'jazzman.wallet':1250,'choosevegan.wallet':950,'investers.zil':99
};
const premium=['thecheckout.crypto','grandhotel.x','bookahotel.x','bookaflight.x','thepawnshop.x','injuryclaims.x','bargainholidays.x','investdubai.x','onlinecrypto.x','songsdirect.crypto'];
const reasons={
'thecheckout.crypto':'Crypto-native ecommerce and payments identity','grandhotel.x':'Short global luxury-hospitality brand',
'bookahotel.x':'Exact commercial action for hotel booking','bookaflight.x':'Exact commercial action for flight booking',
'thepawnshop.x':'Exact-category commerce brand with strong recall','injuryclaims.x':'High-intent legal and claims lead-generation term',
'bargainholidays.x':'Clear consumer travel proposition with broad reach','investdubai.x':'Investment plus premium geographic market',
'onlinecrypto.x':'Broad, memorable crypto commerce/media identity','songsdirect.crypto':'Music marketplace concept with natural crypto fit'};

const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
for(const [domain,price] of Object.entries(prices)){
  index=index.replace(new RegExp(`("domain":"${esc(domain)}"[^}]*?"price":)\\d+`),(_,a)=>a+price);
  const p=path.join(dir,domain,'index.html'); if(!fs.existsSync(p))continue;
  let s=fs.readFileSync(p,'utf8'),shown='$'+price.toLocaleString('en-US'),encoded=encodeURIComponent(shown);
  s=s.replace(/(<div class="price">)\$[\d,]+(<\/div>)/,(_,a,b)=>a+shown+b)
     .replace(/(listed price of )\$[\d,]+/g,(_,a)=>a+shown)
     .replace(/(asking price is )\$[\d,]+/g,(_,a)=>a+shown)
     .replace(/(<meta name="description" content="[^"]*? at )\$[\d,]+([^"]*">)/,(_,a,b)=>a+shown+b)
     .replace(/(<meta property="og:description" content="[^"]*? at )\$[\d,]+([^"]*">)/,(_,a,b)=>a+shown+b)
     .replace(/(<meta name="twitter:description" content="[^"]*? at )\$[\d,]+([^"]*">)/,(_,a,b)=>a+shown+b)
     .replace(/%24[\d%2C]+/gi,()=>encoded);
  fs.writeFileSync(p,s);
}
for(const domain of premium){
  const rx=new RegExp(`\\{"domain":"${esc(domain)}"[^}]*\\}`);
  index=index.replace(rx,m=>{try{const o=JSON.parse(m);o.grade='Premium';o.featured=true;o.score=Math.max(Number(o.score)||0,80-premium.indexOf(domain));return JSON.stringify(o)}catch(e){return m}});
}

index=index.replace(/<!-- BUYWEB3_PREMIUM_START -->[\s\S]*?<!-- BUYWEB3_PREMIUM_END -->\s*/g,'');
if(!index.includes('id="buyweb3-premium-style"')) index=index.replace('</head>',`<style id="buyweb3-premium-style">
.premium-market{padding:58px 0;background:linear-gradient(180deg,#091a2b,#07131f);border-top:1px solid #19364d;border-bottom:1px solid #19364d}.premium-market .premium-intro{max-width:760px;color:#9fb2c0;margin:7px 0 26px}.premium-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:13px}.premium-card{display:flex;flex-direction:column;min-height:190px;background:linear-gradient(145deg,#10283a,#0b1a28);border:1px solid #2d6570;border-radius:15px;padding:19px;text-decoration:none;transition:.18s transform,.18s border-color}.premium-card:hover{transform:translateY(-3px);border-color:#58e6c2}.premium-kicker{color:#f4d476;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.premium-name{font-size:20px;font-weight:900;margin:7px 0 5px;overflow-wrap:anywhere}.premium-reason{color:#91a7b5;font-size:12px;flex:1}.premium-price{font-size:22px;font-weight:900;color:#58e6c2;margin-top:14px}.premium-note{font-size:12px;color:#71899a;margin-top:18px}@media(max-width:1000px){.premium-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.premium-grid{grid-template-columns:1fr}}
</style></head>`);
const cards=premium.map(name=>`<a class="premium-card" href="/domain/${name}/"><span class="premium-kicker">Premium Pick</span><span class="premium-name">${name}</span><span class="premium-reason">${reasons[name]}</span><span class="premium-price">$${prices[name].toLocaleString('en-US')}</span></a>`).join('');
const block=`<!-- BUYWEB3_PREMIUM_START --><section id="premium" class="premium-market"><div class="wrap"><div class="eyebrow">Curated portfolio leaders</div><div class="section-head"><div><h2>Premium Picks</h2><p class="premium-intro">A focused selection of BuyWeb3 names with the strongest combination of commercial intent, memorability, extension fit and potential end-user appeal.</p></div></div><div class="premium-grid">${cards}</div><div class="premium-note">Prices shown are seller asking prices, not independent appraisals or guarantees of future resale value.</div></div></section><!-- BUYWEB3_PREMIUM_END -->`;
index=index.replace('<main id="marketplace" class="market">',block+'\n<main id="marketplace" class="market">');
fs.writeFileSync(indexPath,index);
console.log('Protected valuation and Premium Picks pass applied.');
