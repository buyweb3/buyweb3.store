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

// Approved Elvis treatment: Mark's musical-gates artwork already stored in the repository.
// SVG is used deliberately so the hero remains sharp at large desktop resolutions.
const elvisImg='/assets/elvis-gates.svg';
const elvisNames=[
  'elvisfan.wallet','elvistheking.wallet','elvistributeartist.wallet','elvistributeartist.x','elvistributeartist.crypto',
  'iloveelvis.wallet','elvislives.wallet','elvispresleyrip.wallet','worldsgreatestelvis.x','elvisworld.crypto','elvisworld.zil',
  'tcbinaflash.wallet'
];
for(const name of elvisNames) setHero(name,elvisImg);

console.log('Protected Adele and Elvis background imagery applied.');
