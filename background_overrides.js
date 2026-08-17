const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'domain');

function setHero(name,img){
  const p=path.join(dir,name,'index.html');
  if(!fs.existsSync(p)) return false;
  let s=fs.readFileSync(p,'utf8');
  s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('${img}')`);
  fs.writeFileSync(p,s);
  return true;
}

// Approved Adele treatment: sharp, atmospheric live-concert imagery without implying an official page.
const adeleImg='https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=90';
const adeleNames=['adelefan.x','adelefan.wallet','adelelive.x','adelelive.crypto','adelelive.nft','adelelive.wallet'];
for(const name of adeleNames) setHero(name,adeleImg);

// Owner-approved Elvis / TCB fan-use visual.
const elvisImg='/assets/elvis-tcb-approved.webp';
for(const name of fs.readdirSync(dir).filter(n=>/(elvis|tcb)/i.test(n))) setHero(name,elvisImg);

// Owner-approved Beatles fan-use visual.
const beatlesImg='/assets/beatles-approved.webp';
for(const name of fs.readdirSync(dir).filter(n=>/beatles/i.test(n))) setHero(name,beatlesImg);

// Owner-approved 007/Bond fan-use visual.
const bondImg='/assets/bond007-approved.webp';
for(const name of fs.readdirSync(dir).filter(n=>/(^007|bond)/i.test(n))) setHero(name,bondImg);

console.log('Approved Elvis/TCB, Beatles and 007/Bond artwork applied.');
