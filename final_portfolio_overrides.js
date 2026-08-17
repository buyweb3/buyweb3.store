const fs=require('fs'),path=require('path');
const root=__dirname,indexPath=path.join(root,'index.html'),domainDir=path.join(root,'domain');
let index=fs.readFileSync(indexPath,'utf8');

// Final owner-approved asking-price and presentation overrides.
// Seller asking prices only; not independent appraisals or resale guarantees.
const prices={
  'energysaver.x':27500,
  'casinoresort.wallet':995,
  '007bond.x':7000,

  // Elvis / TCB fan-use portfolio: stronger .x names priced above wallet identities.
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

for(const [domain,price] of Object.entries(prices)){
  index=index.replace(new RegExp(`("domain":"${esc(domain)}"[^}]*?"price":)\\d+`),(_,a)=>a+price);
  updatePage(domain,price);
}

// Keep EnergySaver.x visibly premium after the final valuation pass.
index=index.replace(/\{"domain":"energysaver\.x"[^}]*\}/,m=>{try{const o=JSON.parse(m);o.price=27500;o.grade='Premium';o.featured=true;o.score=Math.max(Number(o.score)||0,77);return JSON.stringify(o)}catch(e){return m}});

// Elvis / TCB fan-use treatment: retro record player and 1950s Memphis recording-studio atmosphere.
// No Elvis likeness, official logo or endorsement is implied.
const elvis=[
  'elvisfan.wallet','elvistheking.wallet','elvistributeartist.wallet','elvistributeartist.x',
  'elvistributeartist.crypto','iloveelvis.wallet','elvislives.wallet','elvispresleyrip.wallet',
  'worldsgreatestelvis.x','elvisworld.crypto','elvisworld.zil','tcbinaflash.wallet'
];
for(const domain of elvis){
  const p=path.join(domainDir,domain,'index.html'); if(!fs.existsSync(p))continue;
  let s=fs.readFileSync(p,'utf8');
  s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('/assets/elvis-recording-studio.svg')`);
  s=s.replace(/<style id="elvis-stage-fix">[\s\S]*?<\/style>/g,'');
  if(!s.includes('id="elvis-recording-fix"'))s=s.replace('</head>',`<style id="elvis-recording-fix">.hero{background-image:linear-gradient(90deg,rgba(3,10,19,.90),rgba(5,17,30,.10)),var(--hero)!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}@media(max-width:760px){.hero{background-image:linear-gradient(180deg,rgba(3,10,19,.48),rgba(5,17,30,.76)),var(--hero)!important;background-position:62% center!important}}</style></head>`);
  fs.writeFileSync(p,s);
}

// 007/Bond fan-use treatment: elegant generic spy silhouette in a tuxedo under a spotlight.
// No actor likeness, franchise logo or claim of official affiliation.
const bond=['007bond.x'];
for(const domain of bond){
  const p=path.join(domainDir,domain,'index.html'); if(!fs.existsSync(p))continue;
  let s=fs.readFileSync(p,'utf8');
  s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('/assets/spy-tuxedo-spotlight.svg')`);
  s=s.replace(/<div class="grid">[\s\S]*?<\/div><div class="notice">/,`<div class="grid"><div class="box"><strong>Independent spy fan club</strong><br>Show your love for the world's best-loved spy with an unmistakable Web3 identity for an independent fan club, discussion group or enthusiast community.</div><div class="box"><strong>Memorabilia & collectors</strong><br>Create a destination for collectors to discuss memorabilia, rare editions, posters, models, watches, cars and other spy-film collectibles without implying official affiliation.</div><div class="box"><strong>Enthusiast community</strong><br>Build a memorable home for fan stories, collections and enthusiast culture around 007bond.x while keeping the project clearly unofficial and independent.</div></div><div class="notice">`);
  fs.writeFileSync(p,s);
}

// If the stored founder portrait data cannot decode, remove the broken-image icon and
// show a clean branded fallback rather than an empty box with alt text.
const about=path.join(root,'assets','about-mark.js');
if(fs.existsSync(about)){
  let s=fs.readFileSync(about,'utf8');
  if(!s.includes('mark-photo-fallback')){
    s=s.replace("const img=panel.querySelector('.mark-profile-photo');img.src=window.__BUYWEB3_MARK_IMG||'';about.appendChild(panel);",
      "const img=panel.querySelector('.mark-profile-photo');img.src=window.__BUYWEB3_MARK_IMG||'';img.onerror=()=>{img.style.display='none';const f=document.createElement('div');f.className='mark-profile-photo mark-photo-fallback';f.setAttribute('aria-label','Mark Leen');f.textContent='ML';f.style.cssText='display:grid;place-items:center;font-size:64px;font-weight:900;letter-spacing:-4px;color:#58e6c2;background:radial-gradient(circle at 50% 30%,#173b52,#081624 72%)';img.parentNode.insertBefore(f,img.nextSibling)};about.appendChild(panel);");
    fs.writeFileSync(about,s);
  }
}

fs.writeFileSync(indexPath,index);
console.log('Final portfolio pricing, Elvis/TCB recording-studio imagery and 007 fan-use presentation applied.');
