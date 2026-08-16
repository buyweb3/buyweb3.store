const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'domain');

function pagePath(name){return path.join(dir,name,'index.html')}
function apply(name,{img,tag,ideas}={}){
  const p=pagePath(name); if(!fs.existsSync(p)) return false;
  let s=fs.readFileSync(p,'utf8');
  if(img) s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('${img}')`);
  if(tag && s.includes('class="tagline"')) s=s.replace(/<div class="tagline">[^<]*<\/div>/,`<div class="tagline">${tag}</div>`);
  if(ideas){let i=0;s=s.replace(/<div class="box"><strong>([^<]+)<\/strong><br>[^<]*<\/div>/g,(m,h)=>`<div class="box"><strong>${h}</strong><br>${ideas[Math.min(i++,ideas.length-1)]}</div>`)}
  fs.writeFileSync(p,s); return true;
}
function family(re,opts){for(const name of fs.readdirSync(dir))if(re.test(name))apply(name,typeof opts==='function'?opts(name):opts)}

const prices={'investers.zil':99,'sellyourdomain.x':4000,'thepawnshop.x':10000,'thepawnshop.bitcoin':1000,'thepawnshop.wallet':2500,'jazzman.wallet':499,'bargainholidays.x':12500,'bookingsonline.wallet':1000,'buyausedcar.crypto':999,'thecheckout.crypto':3000,'choosevegan.wallet':700,'bookataxi.crypto':800};
const indexPath=path.join(__dirname,'index.html');
let index=fs.readFileSync(indexPath,'utf8');
for(const [name,price] of Object.entries(prices)){
  const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  index=index.replace(new RegExp(`("domain":"${escaped}"[^}]*?"price":)\\d+`),(_,a)=>a+price);
  const p=pagePath(name); if(!fs.existsSync(p)) continue;
  let s=fs.readFileSync(p,'utf8'); const shown='$'+price.toLocaleString('en-US'); const encoded=encodeURIComponent(shown);
  s=s.replace(/\$[\d,]+/g,()=>shown).replace(/%24[\d%2C]+/gi,()=>encoded);
  fs.writeFileSync(p,s);
}
fs.writeFileSync(indexPath,index);

const irishCoast='https://images.unsplash.com/photo-1773587563667-1aacf904769c?auto=format&fit=crop&w=2200&q=88';
family(/^wildatlanticway\./i,name=>({img:irishCoast,tag:'A distinctive digital identity for Ireland’s Wild Atlantic Way',ideas:[`Show your love for Ireland and the Wild Atlantic Way with ${name} — a memorable Web3 identity celebrating one of the world’s great coastal routes.`,name.endsWith('.wallet')?'Pay or get paid with a memorable Irish wallet address that is easy to share on cards, profiles and tourism material.':'Build a tourism, travel, photography or local-business destination around the Wild Atlantic Way.',`Own and develop ${name} as a transferable Web3 digital asset with potential resale value.`]}));

apply('countykerry.x',{img:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Location%20map%20Ireland%20County%20Kerry.png?width=1600',tag:'Show your love for The Kingdom',ideas:['Show your love for County Kerry — “The Kingdom” — and be the only person on earth who can own CountyKerry.x.','Build a County Kerry tourism, local-business, events or information portal around an instantly recognisable geographic name.','Create a Kerry community or diaspora destination and retain the Web3 domain as a transferable digital asset with potential resale value.']});

const guitarImg='https://images.unsplash.com/photo-1743634426436-e36691c4311d?auto=format&fit=crop&w=2200&q=88';
family(/^guitarman\./i,name=>({img:guitarImg,tag:'A memorable Web3 identity for a guitarist',ideas:[`Make ${name} the digital identity of a guitarist, teacher, performer or guitar-focused creator.`,name.endsWith('.wallet')?'Pay or get paid, receive digital tips at gigs, and put the memorable wallet address on cards, posters and social profiles.':'Build a guitar store, lessons platform, music community or performer brand around the name.',`Own and develop ${name} while retaining a transferable Web3 asset with potential resale value.`]}));

apply('imalondoner.x',{img:'https://images.unsplash.com/photo-1663669719518-4d4ec6f61192?auto=format&fit=crop&w=2200&q=88',tag:'I’m a Londoner — make it your digital identity',ideas:['Celebrate London identity and pride with a memorable Web3 address built around one of the world’s great cities.','Build a London community, lifestyle, events or local-information platform.','Create a London-focused tourism or local-business portal and retain the name as a transferable digital asset.']});
apply('lovechina.x',{img:'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2200&q=88',tag:'Show your love for China',ideas:['Make LoveChina.x a distinctive personal or community identity celebrating China.','Build a travel, tourism, food, culture or lifestyle platform for people interested in China.','Develop a memorable China-focused digital brand and retain the Web3 name as a transferable asset.']});
apply('lovejapan.x',{img:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=88',tag:'Show your love for Japan',ideas:['Make LoveJapan.x a distinctive personal or community identity celebrating Japan.','Build a travel, tourism, food, culture or lifestyle platform for people interested in Japan.','Develop a memorable Japan-focused digital brand and retain the Web3 name as a transferable asset.']});

apply('showseats.crypto',{img:'https://images.unsplash.com/photo-1722321974501-059dff03e970?auto=format&fit=crop&w=2200&q=88',tag:'A natural Web3 identity for theatre and show tickets',ideas:['Build a theatre and live-show ticket booking platform around the memorable ShowSeats.crypto name.','Create a destination for last-minute, discounted or late-availability seats for theatre, concerts and live entertainment.','Use the name for a theatre, promoter or entertainment-ticket marketplace accepting digital payments.']});

apply('indianmenu.x',{img:'https://images.unsplash.com/photo-1616734755909-bb016ce64930?auto=format&fit=crop&w=2200&q=88',tag:'A memorable digital home for Indian food and menus',ideas:['Build an online ordering and menu platform for Indian restaurants, from curries and tikka dishes to rice, naan and sides.','Create a multi-restaurant Indian food directory or delivery marketplace.','Offer Indian restaurants a branded digital-menu and ordering service built around the instantly descriptive IndianMenu.x name.']});

apply('songsdirect.crypto',{tag:'A direct marketplace for music licensing and digital payment',ideas:['Build a music-licensing marketplace where human composers and AI-assisted creators can offer tracks for film, television, advertising, games, theatre, podcasts and online media.','Help producers find, license and pay for music digitally, with the platform earning a transaction, listing or licensing fee.','Give musicians and creators a direct-to-media marketplace while building SongsDirect.crypto into a memorable commercial music brand.']});
apply('mrroulette.crypto',{tag:'A memorable crypto identity for roulette and gaming operators',ideas:['Use MrRoulette.crypto as a branded wallet or payments identity for a gaming platform featuring roulette.','Create a memorable address for digital-asset deposits, withdrawals or other supported transactions connected with a gaming platform.','Build a roulette-focused entertainment or gaming brand while retaining the domain as a transferable digital asset.']});

const pawnImg='https://images.unsplash.com/photo-1771471790940-74ced68ab3f4?auto=format&fit=crop&w=2200&q=88';
family(/^thepawnshop\./i,name=>({img:pawnImg,tag:name.endsWith('.wallet')?'The ultimate Web3 wallet identity for an online pawn shop':name.endsWith('.bitcoin')?'The online pawn shop for the Bitcoin era':'The ultimate online pawn shop address',ideas:['Build an online pawn shop filled with jewellery, watches, collectibles, electronics, musical instruments, antiques and other valuable goods.',name.endsWith('.wallet')?'Pay and get paid digitally with a memorable wallet identity for a pawn business.':'Take the traditional pawn-shop model online for buying, selling or lending against valuable items.','Own the memorable ThePawnShop identity and retain the Web3 domain as a transferable digital asset with potential resale value.']}));

apply('grandhotel.x',{img:'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2200&q=88',tag:'Bring the grand hotels of the world to one memorable address',ideas:['This is not merely a domain for a property called The Grand Hotel. GrandHotel.x is an opportunity to build a platform around the fact that discerning travellers want more — exceptional hotels, memorable stays and better value.','Create a destination where travellers discover some of the world’s grand hotels at bargain rates, using off-season availability, special offers, late deals and selected luxury packages to make premium stays more accessible.','Bring “the grand hotels” of the world directly to the consumer’s browser — a memorable global brand for luxury hotel discovery, special-rate bookings, curated stays and high-end travel offers.']});

console.log('Session overrides, price repair and GrandHotel marketplace positioning applied.');
