const fs=require('fs'),path=require('path');
const root=__dirname,indexPath=path.join(root,'index.html');
let index=fs.readFileSync(indexPath,'utf8');

// Final presentation-only synchronization. Runs AFTER .crypto and .x valuations so
// Premium Picks always displays the same asking prices as the marketplace/domain pages.
// This file is also a build trigger whenever premium presentation logic changes.
const premium=[
  ['thecheckout.crypto','Flagship crypto-commerce identity for checkout, payment gateways and Web3 transactions'],
  ['lenditnow.crypto','Memorable action-led fintech and DeFi lending brand'],
  ['merrychristmas.x','Recurring global festive brand for greetings, music, gifts, savings and seasonal commerce'],
  ['sellmyphone.crypto','High-intent recommerce identity for phone resale, trade-in and digital payment services'],
  ['grandhotel.x','Short global luxury-hospitality brand with broad end-user appeal'],
  ['ourmenu.crypto','Restaurant, ordering and hospitality identity with natural digital-payment potential'],
  ['bookahotel.x','Exact commercial action for hotel booking'],
  ['bookaflight.x','Exact commercial action for flight booking'],
  ['thepawnshop.x','Exact-category commerce brand with strong recall'],
  ['injuryclaims.x','High-intent legal and claims lead-generation term'],
  ['investdubai.x','Investment proposition paired with a premium global location'],
  ['bargainholidays.x','Clear consumer travel proposition with recurring commercial demand']
];

function getPrice(domain){
  const esc=domain.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const m=index.match(new RegExp(`\\{"domain":"${esc}"[^}]*?"price":(\\d+)`));
  return m?Number(m[1]):null;
}

index=index.replace(/<!-- BUYWEB3_PREMIUM_START -->[\s\S]*?<!-- BUYWEB3_PREMIUM_END -->\s*/g,'');
if(!index.includes('id="buyweb3-premium-style"')){
  index=index.replace('</head>',`<style id="buyweb3-premium-style">
.premium-market{padding:58px 0;background:linear-gradient(180deg,#091a2b,#07131f);border-top:1px solid #19364d;border-bottom:1px solid #19364d}.premium-market .premium-intro{max-width:800px;color:#9fb2c0;margin:7px 0 26px}.premium-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.premium-card{display:flex;flex-direction:column;min-height:200px;background:linear-gradient(145deg,#10283a,#0b1a28);border:1px solid #2d6570;border-radius:15px;padding:19px;text-decoration:none;transition:.18s transform,.18s border-color}.premium-card:hover{transform:translateY(-3px);border-color:#58e6c2}.premium-kicker{color:#f4d476;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.premium-name{font-size:20px;font-weight:900;margin:7px 0 5px;overflow-wrap:anywhere}.premium-reason{color:#91a7b5;font-size:12px;flex:1}.premium-price{font-size:22px;font-weight:900;color:#58e6c2;margin-top:14px}.premium-note{font-size:12px;color:#71899a;margin-top:18px}@media(max-width:1000px){.premium-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.premium-grid{grid-template-columns:1fr}}
</style></head>`);
}
const cards=premium.map(([name,reason])=>{
  const price=getPrice(name);
  if(price===null)return '';
  return `<a class="premium-card" href="/domain/${name}/"><span class="premium-kicker">Premium Pick</span><span class="premium-name">${name}</span><span class="premium-reason">${reason}</span><span class="premium-price">$${price.toLocaleString('en-US')}</span></a>`;
}).join('');
const block=`<!-- BUYWEB3_PREMIUM_START --><section id="premium" class="premium-market"><div class="wrap"><div class="eyebrow">Curated portfolio leaders</div><div class="section-head"><div><h2>Premium Picks</h2><p class="premium-intro">A focused selection of BuyWeb3 names with the strongest combination of commercial intent, memorability, extension fit, recurring utility and potential end-user appeal.</p></div></div><div class="premium-grid">${cards}</div><div class="premium-note">Prices shown are seller asking prices, not independent appraisals or guarantees of future resale value. Make Offer remains available on individual listings.</div></div></section><!-- BUYWEB3_PREMIUM_END -->`;
index=index.replace('<main id="marketplace" class="market">',block+'\n<main id="marketplace" class="market">');
fs.writeFileSync(indexPath,index);
console.log('Premium Picks synchronized to final post-valuation prices.');
