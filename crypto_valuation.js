const fs=require('fs'),path=require('path');
const root=__dirname, indexPath=path.join(root,'index.html'), domainDir=path.join(root,'domain');
let index=fs.readFileSync(indexPath,'utf8');

// Portfolio-wide .crypto asking-price pass.
// This is a seller pricing framework, not an independent appraisal or prediction of resale value.
// It deliberately rewards commercial intent, concise memorable wording and strong .crypto fit,
// while keeping fan/IP-sensitive names conservative and preserving hand-curated flagship prices.
const explicit={
  'thecheckout.crypto':20000,
  'songsdirect.crypto':6500,
  'showseats.crypto':5000,
  'bookataxi.crypto':3500,
  'buyausedcar.crypto':3500,
  'buyabook.crypto':3000,
  'elvistributeartist.crypto':1500,
  'adelelive.crypto':1500
};
const high=['checkout','payment','payments','pay','cash','finance','financial','bank','banking','credit','loan','loans','insurance','invest','investment','exchange','market','commerce','shop','store','booking','book','hotel','travel','casino','games','property','realestate','asset','wealth','business','merchant','ticket','tickets','seats','crypto'];
const medium=['direct','online','digital','music','songs','car','cars','taxi','food','menu','fashion','phone','phones','health','legal','claims','energy','solar','trade','trading','wallet','web','data','cloud','media','network','global'];
const fan=['adele','elvis','presley','bond','beatles','madonna','gaga','swift','beyonce','celebrity','tribute','fan'];
const round=n=>{ if(n>=10000)return Math.round(n/500)*500; if(n>=3000)return Math.round(n/250)*250; return Math.round(n/100)*100; };
function priceFor(domain,obj){
  if(explicit[domain]) return explicit[domain];
  const stem=domain.slice(0,-7).toLowerCase();
  const hay=(stem+' '+(obj.category||'')+' '+(obj.title||'')).toLowerCase();
  if(fan.some(k=>hay.includes(k)) || /fan use/i.test(obj.category||'')) return Math.min(Number(obj.price)||1500,2000);
  let score=0;
  const len=stem.length;
  if(len<=5)score+=5; else if(len<=8)score+=4; else if(len<=12)score+=3; else if(len<=16)score+=2; else if(len<=22)score+=1;
  high.forEach(k=>{if(hay.includes(k))score+=3});
  medium.forEach(k=>{if(hay.includes(k))score+=1});
  if(/^(the|my|your)/.test(stem))score+=1;
  if(/^(buy|book|pay|sell|invest)/.test(stem))score+=2;
  if(/\d/.test(stem))score-=1;
  let p=1250;
  if(score>=11)p=9500; else if(score>=9)p=7500; else if(score>=7)p=5000; else if(score>=5)p=3500; else if(score>=3)p=2500; else p=1500;
  // Avoid arbitrary price cuts on already stronger hand-set names unless they are clearly fan-use.
  p=Math.max(p,Math.min(Number(obj.price)||0,7500));
  return round(p);
}

const objRx=/\{"domain":"([^"]+\.crypto)"[^}]*\}/g;
const valuations=[];
index=index.replace(objRx,m=>{
  let o; try{o=JSON.parse(m)}catch(e){return m}
  const old=Number(o.price)||0, price=priceFor(o.domain,o);
  o.price=price;
  if(price>=7500){o.grade='Premium';o.featured=true;}
  valuations.push({domain:o.domain,old_price:old,new_price:price,category:o.category||'',basis:explicit[o.domain]?'hand-curated':'portfolio scoring'});
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
fs.writeFileSync(path.join(root,'crypto-valuation-report.json'),JSON.stringify({generated:new Date().toISOString(),count:valuations.length,method:'seller asking-price framework based on commercial intent, memorability, extension fit and conservative fan/IP treatment',valuations},null,2));
console.log(`Revalued ${valuations.length} .crypto names.`);
