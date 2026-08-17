const fs=require('fs'),path=require('path');
const root=__dirname,indexPath=path.join(root,'index.html'),domainDir=path.join(root,'domain');
let index=fs.readFileSync(indexPath,'utf8');

// Patient end-user asking-price framework for .x names.
// This is seller pricing strategy, not an independent appraisal or resale guarantee.
// Unlike .crypto, .x receives explicit credit for extension-as-letter wordplay/completion,
// recurring seasonal utility, exact commercial phrases and broad brandability.
const explicit={
  'merrychristmas.x':25000,
  'grandhotel.x':20000,
  'bookahotel.x':17500,
  'bookaflight.x':17500,
  'thepawnshop.x':17500,
  'injuryclaims.x':15000,
  'investdubai.x':15000,
  'bargainholidays.x':15000,
  'energysaver.x':12500,
  'pizzamenu.x':12500,
  'swisstime.x':12500,
  'onlinecrypto.x':12500,
  'sellyourdomain.x':12500,
  'casinolive.x':12500,
  'casinoresort.x':12500,
  'bookingonline.x':10000,
  'onlinefoodmenu.x':10000,
  'fastfoodmenu.x':10000,
  'hotelsforless.x':10000,
  'assetportfolio.x':10000,
  'vegasgames.x':10000,
  'carpoint.x':10000,
  'cosmeticsurgeon.x':10000,
  'phonesdirect.x':10000,
  'repairmycredit.x':10000,
  'generatewealth.x':10000,
  'houseoffashion.x':10000,
  'indianmenu.x':7500,
  'wildatlanticway.x':7500,
  'guitarman.x':7500,
  'countykerry.x':5000
};
const veryHigh=['hotel','flight','booking','book','pawn','claims','invest','investment','finance','credit','loan','insurance','casino','property','realestate','checkout','payment','payments','sell','buy','travel','holiday','holidays','energy','wealth','asset','business','commerce'];
const high=['menu','food','phone','phones','car','cars','fashion','surgeon','medical','games','vegas','direct','online','shop','store','market','time','crypto','taxi','ticket','tickets','seats','music','songs','guitar'];
const seasonal=['christmas','xmas','halloween','easter','valentine','holiday','holidays','newyear'];
const fan=['adele','elvis','presley','bond','beatles','madonna','gaga','swift','beyonce','celebrity','tribute','fan'];
const round=n=>n>=10000?Math.round(n/2500)*2500:n>=5000?Math.round(n/1000)*1000:Math.round(n/500)*500;
function priceFor(domain,obj){
  if(explicit[domain])return explicit[domain];
  const stem=domain.slice(0,-2).toLowerCase();
  const hay=(stem+' '+(obj.category||'')+' '+(obj.title||'')).toLowerCase();
  if(fan.some(k=>hay.includes(k))||/fan use/i.test(obj.category||''))return Math.min(Number(obj.price)||2000,2500);
  let score=0,len=stem.length;
  if(len<=5)score+=7;else if(len<=8)score+=6;else if(len<=12)score+=5;else if(len<=16)score+=4;else if(len<=22)score+=2;else score+=1;
  veryHigh.forEach(k=>{if(hay.includes(k))score+=5});
  high.forEach(k=>{if(hay.includes(k))score+=3});
  seasonal.forEach(k=>{if(hay.includes(k))score+=4});
  if(/^(buy|book|sell|invest|repair|generate)/.test(stem))score+=3;
  if(/^(the|my|your|our)/.test(stem))score+=1;
  // Reward constructions where the extension can visually act as the final letter X.
  // Example patterns include stems that naturally suggest a word/brand ending in x or an X-themed concept.
  if(/(bo|fo|ma|lu|mi|phoeni|rela|remi|det|inde|ap)e?$/.test(stem))score+=4;
  if(/\d/.test(stem))score-=1;
  let p=3000;
  if(score>=20)p=25000;else if(score>=17)p=20000;else if(score>=14)p=15000;else if(score>=12)p=12500;else if(score>=10)p=10000;else if(score>=8)p=7500;else if(score>=6)p=5000;
  p=Math.max(p,Number(obj.price)||0); // patient retail: never auto-cut a non-fan existing ask
  return round(p);
}
const rx=/\{"domain":"([^"]+\.x)"[^}]*\}/g,vals=[];
index=index.replace(rx,m=>{let o;try{o=JSON.parse(m)}catch(e){return m}const old=Number(o.price)||0,price=priceFor(o.domain,o);o.price=price;if(price>=12500){o.grade='Premium';o.featured=true;}vals.push({domain:o.domain,old_price:old,new_price:price,category:o.category||'',basis:explicit[o.domain]?'hand-curated end-user':'patient .x scoring'});return JSON.stringify(o)});
function applyPage(domain,price){const p=path.join(domainDir,domain,'index.html');if(!fs.existsSync(p))return;let s=fs.readFileSync(p,'utf8'),shown='$'+price.toLocaleString('en-US'),encoded=encodeURIComponent(shown);s=s.replace(/(<div class="price">)\$[\d,]+(<\/div>)/,(_,a,b)=>a+shown+b).replace(/(listed price of )\$[\d,]+/g,(_,a)=>a+shown).replace(/(asking price is )\$[\d,]+/g,(_,a)=>a+shown).replace(/(<meta name="description" content="[^"]*? at )\$[\d,]+([^"]*">)/,(_,a,b)=>a+shown+b).replace(/(<meta property="og:description" content="[^"]*? at )\$[\d,]+([^"]*">)/,(_,a,b)=>a+shown+b).replace(/%24[\d%2C]+/gi,()=>encoded);fs.writeFileSync(p,s)}
vals.forEach(v=>applyPage(v.domain,v.new_price));

// Bespoke premium treatment for MerryChristmas.x: recurring annual platform, not a novelty seasonal listing.
{
 const d='merrychristmas.x',p=path.join(domainDir,d,'index.html');if(fs.existsSync(p)){let s=fs.readFileSync(p,'utf8');const price=explicit[d],shown='$'+price.toLocaleString('en-US');
 const img='https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=2200&q=90';
 s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('${img}')`).replace(/<div class="tagline">[\s\S]*?<\/div>/,`<div class="tagline">A year-round brand for the world's biggest recurring festive season</div>`).replace(/<p class="copy">[\s\S]*?<\/p><\/article>/,`<p class="copy"><strong>More than a Christmas greeting:</strong> MerryChristmas.x can become a memorable annual destination that builds audience, content and customer recognition year after year — from digital greetings and Christmas music to gifts, toys, savings and festive commerce.</p></article>`).replace(/<div class="eyebrow">Ideas for this name<\/div>[\s\S]*?<div class="notice">/,`<div class="eyebrow">Commercial possibilities</div><h2>One memorable name, many recurring Christmas businesses</h2><div class="grid"><div class="box"><strong>Digital Christmas greetings</strong><br>Create personalised cards, animated greetings, video messages, family greetings and corporate festive campaigns from a brand people instantly understand.</div><div class="box"><strong>Christmas music & song database</strong><br>Build a permanent catalogue of Christmas songs, artists, playlists, histories, new releases and festive music discovery that gains authority year after year.</div><div class="box"><strong>Gifts, toys & direct delivery</strong><br>Develop a Christmas marketplace for discounted gifts and toys, curated offers and delivery-before-Christmas propositions.</div><div class="box"><strong>Christmas savings club</strong><br>Turn a seasonal brand into a year-round relationship by helping customers save throughout the year for Christmas spending, gifts and experiences.</div><div class="box"><strong>Festive content destination</strong><br>Recipes, events, travel, decorating ideas, Santa experiences, family activities and seasonal entertainment can all live naturally under the name.</div><div class="box"><strong>Annual brand equity</strong><br>Christmas returns every year. A well-built platform can retain content, search visibility, customers and recognition instead of restarting each season.</div></div><div class="notice">`);
 fs.writeFileSync(p,s)}
}
fs.writeFileSync(indexPath,index);fs.writeFileSync(path.join(root,'x-valuation-report.json'),JSON.stringify({generated:new Date().toISOString(),count:vals.length,method:'patient end-user .x pricing including commercial intent, extension-as-X wordplay, recurring seasonal utility, memorability and conservative fan/IP treatment',valuations:vals},null,2));console.log(`Revalued ${vals.length} .x names.`);
