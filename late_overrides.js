const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'domain');
const veganImg='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2200&q=88';
const veganNames=/^(govegan|livevegan)(\.|$)/i;
for(const name of fs.readdirSync(dir)){
  if(!veganNames.test(name)) continue;
  const p=path.join(dir,name,'index.html');
  if(!fs.existsSync(p)) continue;
  let s=fs.readFileSync(p,'utf8');
  s=s.replace(/--hero:url\('[^']+'\)/,`--hero:url('${veganImg}')`);
  if(s.includes('class="tagline"')) s=s.replace(/<div class="tagline">[^<]*<\/div>/,'<div class="tagline">The ultimate Web3 identity for a vegan lifestyle</div>');
  const ideas=[
    `Make a statement to friends and family with ${name} — a catchy vegan Web3 identity and one-of-a-kind wallet address built around your values.`,
    `Pay or get paid with a memorable vegan wallet address that is easier to share than a long crypto string, while showing what you stand for.`,
    `Own it, use it and keep it as a transferable digital asset with potential resale value, while building a vegan community, content brand or ethical business identity around the name.`
  ];
  let i=0;
  s=s.replace(/<div class="box"><strong>([^<]+)<\/strong><br>[^<]*<\/div>/g,(m,h)=>`<div class="box"><strong>${h}</strong><br>${ideas[Math.min(i++,2)]}</div>`);
  fs.writeFileSync(p,s);
}
console.log('Protected vegan overrides applied.');