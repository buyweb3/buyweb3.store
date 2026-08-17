const fs=require('fs'),path=require('path');
const root=__dirname, indexPath=path.join(root,'index.html'), domainDir=path.join(root,'domain');
let index=fs.readFileSync(indexPath,'utf8');

// Patient end-user asking-price framework for the .crypto portfolio.
// Seller pricing strategy, not an independent appraisal or guarantee of resale value.
// Rewards real-world customer acquisition value, commercial intent, memorability and natural .crypto fit.
const explicit={
  'thecheckout.crypto':30000,
  'lenditnow.crypto':30000,
  'sellmyphone.crypto':20000,
  'ourmenu.crypto':17500,
  'songsdirect.crypto':12500,
  'showseats.crypto':12500,
  'buyausedcar.crypto':12500,
  'bookataxi.crypto':10000,
  'buyabook.crypto':7500,
  'elvistributeartist.crypto':1500,
  'adelelive.crypto':1500
};
const veryHigh=['checkout','lend','lending','loan','loans','payment','payments','pay','cash','finance','financial','bank','banking','credit','insurance','invest','investment','exchange','merchant','commerce','business','property','realestate'];
const high=['sell','buy','booking','book','hotel','travel','casino','games','shop','store','market','asset','wealth','ticket','tickets','seats','phone','phones','menu','food','car','cars','taxi','trade','trading'];
const medium=['direct','online','digital','music','songs','fashion','health','legal','claims','energy','solar','wallet','web','data','cloud','media','network','global'];
const fan=['adele','elvis','presley','bond','beatles','madonna','gaga','swift','beyonce','celebrity','tribute','fan'];
const round=n=>n>=10000?Math.round(n/2500)*2500:n>=5000?Math.round(n/1000)*1000:Math.round(n/500)*500;
function priceFor(domain,obj){
  if(explicit[domain]) return explicit[domain];
  const stem=domain.slice(0,-7).toLowerCase();
  const hay=(stem+' '+(obj.category||'')+' '+(obj.title||'')).toLowerCase();
  if(fan.some(k=>hay.includes(k)) || /fan use/i.test(obj.category||'')) return Math.min(Number(obj.price)||1500,2000);
  let score=0;
  const len=stem.length;
  if(len<=5)score+=6; else if(len<=8)score+=5; else if(len<=12)score+=4; else if(len<=16)score+=3; else if(len<=22)score+=2; else score+=1;
  veryHigh.forEach(k=>{if(hay.includes(k))score+=5});
  high.forEach(k=>{if(hay.includes(k))score+=3});
  medium.forEach(k=>{if(hay.includes(k))score+=1});
  if(/^(the|my|your|our)/.test(stem))score+=1;
  if(/^(buy|book|pay|sell|lend|invest)/.test(stem))score+=3;
  if(/now$/.test(stem))score+=2;
  if(/\d/.test(stem))score-=1;
  let p=2500;
  if(score>=18)p=20000; else if(score>=15)p=15000; else if(score>=12)p=12500; else if(score>=10)p=10000; else if(score>=8)p=7500; else if(score>=6)p=5000; else if(score>=4)p=3500;
  // Patient end-user strategy: don't reduce existing non-fan asking prices.
  p=Math.max(p,Number(obj.price)||0);
  return round(p);
}

const objRx=/\{"domain":"([^"]+\.crypto)"[^}]*\}/g;
const valuations=[];
index=index.replace(objRx,m=>{
  let o; try{o=JSON.parse(m)}catch(e){return m}
  const old=Number(o.price)||0, price=priceFor(o.domain,o);
  o.price=price;
  if(price>=10000){o.grade='Premium';o.featured=true;}
  valuations.push({domain:o.domain,old_price:old,new_price:price,category:o.category||'',basis:explicit[o.domain]?'hand-curated end-user':'patient end-user scoring'});
  return JSON.stringify(o);
});
function applyPage(domain,price){
  const p=path.join(domainDir,domain,'index.html'); if(!fs.existsSync(p))return;
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
valuations.forEach(v=>applyPage(v.domain,v.new_price));
fs.writeFileSync(indexPath,index);
fs.writeFileSync(path.join(root,'crypto-valuation-report.json'),JSON.stringify({generated:new Date().toISOString(),count:valuations.length,method:'patient end-user seller pricing: real-world commercial intent, customer-acquisition value, memorability, extension fit, conservative fan/IP treatment',valuations},null,2));
console.log(`Revalued ${valuations.length} .crypto names for patient end-user sale.`);
