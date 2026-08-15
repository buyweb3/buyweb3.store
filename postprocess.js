// BuyWeb3 generated-page postprocessor
const fs=require('fs'),path=require('path');
const root=__dirname,dir=path.join(root,'domain');

const IMG={
 dubai:'https://images.unsplash.com/photo-1753029111752-f12018752cd3?auto=format&fit=crop&w=2200&q=82',
 auto:'https://images.unsplash.com/photo-1772813457685-7ffe55ec191f?auto=format&fit=crop&w=2200&q=82',
 ireland:'https://images.unsplash.com/photo-1773587563667-1aacf904769c?auto=format&fit=crop&w=2200&q=82',
 yacht:'https://images.unsplash.com/photo-1743485753817-cdfcf2fbb9c0?auto=format&fit=crop&w=2200&q=82',
 travel:'https://images.unsplash.com/photo-1772064901543-fb4a5d9f4736?auto=format&fit=crop&w=2200&q=82',
 food:'https://images.unsplash.com/photo-1755811248279-1ab13b7d4384?auto=format&fit=crop&w=2200&q=82',
 aviation:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=82',
 finance:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2200&q=82',
 gaming:'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=2200&q=82',
 music:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=82',
 energy:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=82',
 commerce:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=82',
 legal:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=82',
 brand:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=82'
};

const premiumCss=`<style id="premium-theme">
:root{--mint:#58e6c2;--mint2:#2fbf9d;--navy:#06111f;--navy2:#0b243a;--line:rgba(88,230,194,.34)}
body{background:#06111f!important;color:#f7fbff!important}.hero{background-size:cover!important;background-position:center!important;background-attachment:fixed!important;position:relative!important}.hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,17,31,.97) 0%,rgba(6,17,31,.88) 42%,rgba(8,42,54,.48) 72%,rgba(6,17,31,.35) 100%),linear-gradient(180deg,rgba(6,17,31,.12),rgba(6,17,31,.62));pointer-events:none}.hero>*{position:relative;z-index:1}.nav{border-bottom:1px solid rgba(88,230,194,.16)}.logo span,.accent,.eyebrow{color:var(--mint)!important}.navlinks a,.lang{background:rgba(6,17,31,.74)!important;border-color:rgba(88,230,194,.30)!important;backdrop-filter:blur(12px)}.panel{background:linear-gradient(145deg,rgba(6,17,31,.92),rgba(9,28,42,.84))!important;border:1px solid var(--line)!important;box-shadow:0 28px 90px rgba(0,0,0,.55),0 0 45px rgba(88,230,194,.10)!important;backdrop-filter:blur(16px)!important}.domain{letter-spacing:-.035em}.tagline{font-size:clamp(20px,2.2vw,31px);color:#9feeda;font-weight:700;margin:0 0 8px}.price{color:#fff!important;text-shadow:0 0 24px rgba(88,230,194,.12)}.available{background:rgba(28,95,86,.42)!important;border:1px solid rgba(88,230,194,.60)!important;color:#8af1d6!important}.buy{background:linear-gradient(135deg,#58e6c2,#3fc7a9)!important;color:#06111f!important;border:1px solid rgba(117,244,212,.82)!important;box-shadow:0 10px 30px rgba(88,230,194,.18)}.offer{background:rgba(6,17,31,.80)!important;color:#dffbf4!important;border:1px solid rgba(88,230,194,.52)!important}.below{background:linear-gradient(180deg,#081624,#06111f)!important;border-top:1px solid rgba(88,230,194,.22)!important}.box{background:linear-gradient(145deg,rgba(13,28,43,.96),rgba(8,20,32,.96))!important;border:1px solid rgba(88,230,194,.22)!important;color:#b8cbd4!important}.notice{background:#102535!important;border-color:rgba(88,230,194,.24)!important}.footer{background:#050d17!important;border-top:1px solid rgba(88,230,194,.16)}
@media(max-width:760px){.hero{background-attachment:scroll!important;background-position:62% center!important}.hero:before{background:linear-gradient(180deg,rgba(6,17,31,.68),rgba(6,17,31,.92))}.panel{margin-top:24px}}
</style>`;

function themeFor(name,html){
 const n=name.toLowerCase(),h=html.toLowerCase();
 if(/dubai|abu.?dhabi|uae|emirate/.test(n)) return ['dubai','Power Your Vision in the UAE'];
 if(/ireland|irish|dublin|galway|cork|wildatlantic/.test(n)) return ['ireland','A Distinctive Irish Digital Identity'];
 if(/yacht|boat|sail|marine|marina/.test(n)) return ['yacht','Built for Premium Maritime Brands'];
 if(/jet|flight|airline|airport|aviation|aircraft|flying/.test(n)) return ['aviation','A First-Class Digital Identity'];
 if(/car|auto|motor|vehicle|garage|drive|road/.test(n)||h.includes('auto ·')) return ['auto','Driven by a Stronger Digital Identity'];
 if(/casino|poker|roulette|bet|odds|gaming|game|vegas|lucky/.test(n)||h.includes('gaming ·')) return ['gaming','Made for High-Energy Digital Brands'];
 if(/music|song|jazz|band|artist|concert|radio/.test(n)||h.includes('music ·')) return ['music','Turn Up Your Digital Presence'];
 if(/food|pizza|menu|restaurant|gourmet|vegan|dining|cafe/.test(n)) return ['food','A Memorable Name for Food & Hospitality'];
 if(/hotel|travel|holiday|booking|booka|tour|trip|room|stay|vacation/.test(n)||h.includes('travel ·')) return ['travel','A Premium Identity for Travel & Hospitality'];
 if(/invest|finance|loan|credit|cash|money|bank|wealth|fund|capital|mortgage|asset/.test(n)||h.includes('finance ·')) return ['finance','Built for Finance, Investment & Growth'];
 if(/solar|energy|green|power|eco|electric/.test(n)||h.includes('energy ·')) return ['energy','A Forward-Looking Digital Identity'];
 if(/law|legal|lawyer|claim|injury|attorney/.test(n)||h.includes('legal ·')) return ['legal','A Strong Professional Digital Identity'];
 if(/shop|sell|buy|store|market|commerce|retail|phone/.test(n)||h.includes('commerce ·')) return ['commerce','Built for Digital Commerce'];
 return ['brand','A Premium Web3 Digital Identity'];
}

for(const name of fs.readdirSync(dir)){
 const p=path.join(dir,name,'index.html'); if(!fs.existsSync(p)) continue;
 let s=fs.readFileSync(p,'utf8');
 const [theme,tagline]=themeFor(name,s),img=IMG[theme]||IMG.brand;
 s=s.replace(/<main class="hero"[^>]*>/,`<main class="hero premium-${theme}" style="--hero:url('${img}');background-image:var(--hero)">`);
 s=s.replace(/<style id="premium-theme">[\s\S]*?<\/style>/,premiumCss);
 if(!s.includes('id="premium-theme"')) s=s.replace('</head>',premiumCss+'</head>');
 if(!s.includes('class="tagline"')) s=s.replace(/(<h1 class="domain">[^<]+<\/h1>)/,`$1<div class="tagline">${tagline}</div>`);
 s=s.replace(/https:\/\/buyweb3\.store\/buyweb3-brand\.webp/g,img);
 fs.writeFileSync(p,s);
}

let home=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!home.includes('/assets/i18n.js')) home=home.replace('</head>','<script defer src="/assets/i18n.js"></script></head>');
home=home.replace(/<button class="view" data-domain="\$\{d\.domain\}">View Details<\/button>/g,'<a class="view" href="/domain/${encodeURIComponent(d.domain)}/">View Details</a>');
fs.writeFileSync(path.join(root,'index.html'),home);
console.log('Applied BuyWeb3 teal/navy styling and themed imagery to every generated domain page.');