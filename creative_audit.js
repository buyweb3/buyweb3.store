const fs=require('fs'),path=require('path');
const root=__dirname,dir=path.join(root,'domain');
const IMG={
 vegas:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Las%20Vegas%20strip%20at%20night,%20Nevada.jpg',
 property:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2200&q=82',
 travel:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=82',
 hotel:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=82',
 car:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=82',
 food:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2200&q=82',
 pizza:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=2200&q=82',
 phones:'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=2200&q=82',
 finance:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2200&q=82',
 legal:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=82',
 energy:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=82',
 music:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=82',
 art:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=2200&q=82',
 fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2200&q=82',
 beauty:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2200&q=82',
 pawn:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=2200&q=82',
 swisswatch:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2200&q=88',
 pets:'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=2200&q=82',
 charity:'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2200&q=82',
 architecture:'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2200&q=82',
 news:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2200&q=82',
 crypto:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=82',
 ireland:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=82',
 dubai:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82'
};
function pick(n){n=n.toLowerCase();
 if(/swisstime/.test(n))return ['swisswatch','A premium identity for Swiss watches and horology'];
 if(/casino|roulette|poker|blackjack|jackpot|odds|bet|vegas|gambler|lucky/.test(n))return ['vegas','A high-energy gaming and entertainment identity'];
 if(/dubai|abu.?dhabi|uae|emirate/.test(n))return ['dubai','A premium identity for the UAE market'];
 if(/ireland|irish|dublin|kerry|cork|galway|tralee|burren|wildatlantic/.test(n))return ['ireland','A distinctive Irish digital identity'];
 if(/rent|rental|property|house|housing|home|estate|realt|landlord|tenant|apartment|villa|mortgage/.test(n))return ['property','Built for property, rentals and real estate'];
 if(/hotel|room|stay|resort|bnb/.test(n))return ['hotel','A premium hospitality and accommodation identity'];
 if(/flight|airline|airport|aviation|fly|travel|holiday|trip|tour/.test(n))return ['travel','A first-class travel identity'];
 if(/car|auto|motor|vehicle|garage|drive|taxi|wheel/.test(n))return ['car','Driven by a stronger digital identity'];
 if(/pizza/.test(n))return ['pizza','A mouth-watering food and delivery identity'];
 if(/food|menu|restaurant|dining|meal|cafe|coffee|vegan|takeout/.test(n))return ['food','A memorable food and hospitality identity'];
 if(/phone|mobile|cellular/.test(n))return ['phones','Built for mobile retail and technology'];
 if(/invest|finance|money|bank|fund|wealth|stock|trade|capital|loan|credit|cash/.test(n))return ['finance','Built for finance, investment and growth'];
 if(/law|legal|lawyer|attorney|claim|injury|compensation/.test(n))return ['legal','A strong professional legal identity'];
 if(/solar|energy|power|green|eco|electric/.test(n))return ['energy','A forward-looking clean-energy identity'];
 if(/music|song|jazz|band|artist|concert|radio|vinyl|guitar|sax/.test(n))return ['music','Turn up your digital presence'];
 if(/art|gallery|painting|memorabilia|autograph/.test(n))return ['art','A distinctive identity for collectors and creators'];
 if(/fashion|clothes|apparel|redsoles/.test(n))return ['fashion','A polished fashion and lifestyle identity'];
 if(/perfume|fragrance|cosmetic|beauty|surgeon|hair/.test(n))return ['beauty','A premium beauty and personal-care identity'];
 if(/pawn|goldandsilver|bullion|jewel|watch/.test(n))return ['pawn','Built for valuables, collectors and premium resale'];
 if(/dog|pet|springer/.test(n))return ['pets','A friendly identity for pet owners and communities'];
 if(/donate|charity|fundrais/.test(n))return ['charity','A purposeful identity for giving and community support'];
 if(/architect|architecture|building|design/.test(n))return ['architecture','A strong visual identity for architecture and design'];
 if(/news|dailynews|media|press/.test(n))return ['news','A memorable identity for news and media'];
 if(/crypto|bitcoin|token|coin|blockchain|nft|wallet/.test(n))return ['crypto','A modern Web3 and digital-asset identity'];
 return null;}
function copyFor(n){n=n.toLowerCase();
 if(/swisstime/.test(n))return ['Take a traditional Swiss-watch dealership online and reduce showroom overheads, creating room for sharper pricing while maintaining a premium presentation.','Build a luxury watch marketplace where authorised dealers, independent specialists and collectors can list, buy and sell premium Swiss watches internationally.','Create an online-first Swiss watch outlet for selected inventory, previous-season pieces and competitive prices aimed at customers searching globally for luxury timepieces.'];
 if(/casino|roulette|poker|blackjack|jackpot|odds|bet|vegas|gambler|lucky/.test(n))return ['Launch a live gaming destination covering casino games, tournaments, entertainment and community features.','Build a premium VIP gaming brand around rewards, loyalty, events and high-value player experiences.','Create an entertainment hub combining gaming content, reviews, promotions and destination-style experiences.'];
 if(/rent|rental|property|house|housing|home|estate|realt|landlord|tenant|apartment|villa|mortgage/.test(n))return ['Show available homes, apartments and rental properties with clear information for prospective tenants.','Build a property-search or letting platform connecting tenants with landlords, agents and suitable homes.','Create a memorable digital identity for rentals, property management, relocation services or real-estate listings.'];
 if(/hotel|room|stay|resort|bnb/.test(n))return ['Build a direct-booking site for hotels, rooms, resorts or short-stay accommodation.','Create a hospitality comparison or discovery platform for travellers choosing where to stay.','Use the name for a premium accommodation brand, concierge service or destination booking portal.'];
 if(/flight|airline|airport|aviation|fly|travel|holiday|trip|tour/.test(n))return ['Create a flight, holiday or travel-booking service around an immediately understandable name.','Build a comparison platform for fares, routes, destinations, packages and travel offers.','Use the domain for a travel brand, loyalty community, concierge service or destination portal.'];
 if(/car|auto|motor|vehicle|garage|drive|taxi|wheel/.test(n))return ['Launch an automotive marketplace for cars, parts, services or enthusiast listings.','Build a mobility, rental, servicing or vehicle-comparison business around a memorable name.','Create an enthusiast community, buying guide or premium automotive content platform.'];
 if(/food|menu|restaurant|dining|meal|cafe|coffee|vegan|takeout|pizza/.test(n))return ['Build an ordering, booking or menu platform that lets customers act immediately.','Create a memorable brand for a restaurant, takeaway, food marketplace or hospitality group.','Use the domain for promotions, loyalty, local discovery, reviews or a food-focused community.'];
 return null;}
let themed=0,fallback=0,updatedCopy=0;
for(const name of fs.readdirSync(dir)){
 const p=path.join(dir,name,'index.html'); if(!fs.existsSync(p))continue;
 let s=fs.readFileSync(p,'utf8'); const hit=pick(name);
 if(hit){const [key,tag]=hit,img=IMG[key];s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('${img}')`); if(key==='swisswatch')s=s.replace('<main class="hero"','<main class="hero swisswatch"'); if(s.includes('class="tagline"'))s=s.replace(/<div class="tagline">[^<]*<\/div>/,`<div class="tagline">${tag}</div>`);themed++;} else fallback++;
 const ideas=copyFor(name); if(ideas){let i=0;s=s.replace(/<div class="box"><strong>([^<]+)<\/strong><br>[^<]*<\/div>/g,(m,h)=>`<div class="box"><strong>${h}</strong><br>${ideas[Math.min(i++,2)]}</div>`);updatedCopy++;}
 if(hit&&hit[0]==='vegas'&&!s.includes('Photo: Matt Kieffer'))s=s.replace('</footer>',' · <span style="opacity:.55;font-size:11px">Las Vegas photo: Matt Kieffer / CC BY-SA 2.0</span></footer>');
 fs.writeFileSync(p,s);
}
console.log(`Creative audit applied: ${themed} pages received semantic imagery, ${updatedCopy} received specific use-case copy, ${fallback} remained on neutral brand imagery.`);