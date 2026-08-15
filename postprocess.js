const fs=require('fs'),path=require('path');
const root=__dirname,dir=path.join(root,'domain');
for(const name of fs.readdirSync(dir)){
 const p=path.join(dir,name,'index.html'); if(!fs.existsSync(p)) continue;
 let s=fs.readFileSync(p,'utf8');
 if(/dubai|abu.?dhabi|uae/i.test(name)){
  s=s.replace(/<main class="hero"[^>]*>/,'<main class="hero premium-dubai" style="--hero:url(\'/assets/dubai-premium.jpg\')">');
  if(!s.includes('class="tagline"')) s=s.replace(/(<h1 class="domain">[^<]+<\/h1>)/,'$1<div class="tagline">A Premium UAE Digital Identity</div>');
  s=s.replace(/https:\/\/buyweb3\.store\/buyweb3-brand\.webp/g,'https://buyweb3.store/assets/dubai-premium.jpg');
 }
 fs.writeFileSync(p,s);
}
let home=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!home.includes('/assets/i18n.js')) home=home.replace('</head>','<script defer src="/assets/i18n.js"></script></head>');
// Ensure every marketplace card has a direct individual sales-page link.
home=home.replace(/<button class="view" data-domain="\$\{d\.domain\}">View Details<\/button>/g,'<a class="view" href="/domain/${encodeURIComponent(d.domain)}/">View Details</a>');
fs.writeFileSync(path.join(root,'index.html'),home);
console.log('Applied premium destination styling and direct listing links.');