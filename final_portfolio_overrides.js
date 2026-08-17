const fs=require('fs'),path=require('path');
const root=__dirname,indexPath=path.join(root,'index.html'),domainDir=path.join(root,'domain');
let index=fs.readFileSync(indexPath,'utf8');

// Final owner-approved asking-price and presentation overrides.
// Seller asking prices only; not independent appraisals or resale guarantees.
const prices={
  'energysaver.x':27500,
  'casinoresort.wallet':995,
  '007bond.x':7000,
  'worldsgreatestelvis.x':7500,
  'elvistributeartist.x':5000,
  'elvisworld.crypto':5000,
  'elvistributeartist.crypto':3500,
  'elvisfan.wallet':1935,
  'elvistheking.wallet':1995,
  'elvistributeartist.wallet':1977,
  'iloveelvis.wallet':1995,
  'elvislives.wallet':1995,
  'elvispresleyrip.wallet':1995,
  'elvisworld.zil':1495,
  'tcbinaflash.wallet':1995
};

const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function updatePage(domain,price){
  const p=path.join(domainDir,domain,'index.html');
  if(!fs.existsSync(p))return;
  let s=fs.readFileSync(p,'utf8'),shown='$'+price.toLocaleString('en-US'),encoded=encodeURIComponent(shown);
  s=s.replace(/(<div class="price">)\$[\d,]+(<\/div>)/,(_,a,b)=>a+shown+b)
    .replace(/(listed price of )\$[\d,]+/gi,(_,a)=>a+shown)
    .replace(/(asking price is )\$[\d,]+/gi,(_,a)=>a+shown)
    .replace(/(<meta name="description" content="[^"]*? at )\$[\d,]+([^"]*">)/i,(_,a,b)=>a+shown+b)
    .replace(/(<meta property="og:description" content="[^"]*? at )\$[\d,]+([^"]*">)/i,(_,a,b)=>a+shown+b)
    .replace(/(<meta name="twitter:description" content="[^"]*? at )\$[\d,]+([^"]*">)/i,(_,a,b)=>a+shown+b)
    .replace(/%24[\d%2C]+/gi,()=>encoded);
  fs.writeFileSync(p,s);
}
function setHero(domain,img){
  const p=path.join(domainDir,domain,'index.html'); if(!fs.existsSync(p))return;
  let s=fs.readFileSync(p,'utf8');
  s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('${img}')`);
  fs.writeFileSync(p,s);
}

for(const [domain,price] of Object.entries(prices)){
  index=index.replace(new RegExp(`("domain":"${esc(domain)}"[^}]*?"price":)\\d+`),(_,a)=>a+price);
  updatePage(domain,price);
}

index=index.replace(/\{"domain":"energysaver\.x"[^}]*\}/,m=>{try{const o=JSON.parse(m);o.price=27500;o.grade='Premium';o.featured=true;o.score=Math.max(Number(o.score)||0,77);return JSON.stringify(o)}catch(e){return m}});

// Owner-approved fan-use artwork. These run late so earlier generators cannot replace them.
for(const domain of fs.readdirSync(domainDir).filter(n=>/(elvis|tcb)/i.test(n))) setHero(domain,'/assets/elvis-tcb-approved.webp');
for(const domain of fs.readdirSync(domainDir).filter(n=>/beatles/i.test(n))) setHero(domain,'/assets/beatles-approved.webp');
for(const domain of fs.readdirSync(domainDir).filter(n=>/(^007|bond)/i.test(n))) setHero(domain,'/assets/bond007-approved.webp');

// Keep the approved 007 fan-use positioning and collector/community copy.
for(const domain of fs.readdirSync(domainDir).filter(n=>/(^007|bond)/i.test(n))){
  const p=path.join(domainDir,domain,'index.html'); if(!fs.existsSync(p))continue;
  let s=fs.readFileSync(p,'utf8');
  if(domain==='007bond.x') s=s.replace(/<div class="grid">[\s\S]*?<\/div><div class="notice">/,`<div class="grid"><div class="box"><strong>Independent spy fan club</strong><br>Show your love for the world's best-loved spy with an unmistakable Web3 identity for an independent fan club, discussion group or enthusiast community.</div><div class="box"><strong>Memorabilia & collectors</strong><br>Create a destination for collectors to discuss memorabilia, rare editions, posters, models, watches, cars and other spy-film collectibles without implying official affiliation.</div><div class="box"><strong>Enthusiast community</strong><br>Build a memorable home for fan stories, collections and enthusiast culture around 007bond.x while keeping the project clearly unofficial and independent.</div></div><div class="notice">`);
  fs.writeFileSync(p,s);
}

fs.writeFileSync(indexPath,index);
console.log('Approved Elvis/TCB, Beatles and 007/Bond artwork applied in final build.');
