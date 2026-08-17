(()=>{
function renderMarkProfile(){
  const about=document.getElementById('about');
  if(!about||document.getElementById('mark-profile')) return;
  const style=document.createElement('style');
  style.textContent=`#mark-profile{width:min(1180px,92%);margin:46px auto 0;padding-top:46px;border-top:1px solid #183149}.mark-profile-card{display:grid;grid-template-columns:240px 1fr;gap:42px;align-items:center;background:linear-gradient(145deg,#0d1c2b,#0a1724);border:1px solid #1d3b51;border-radius:20px;padding:28px}.mark-profile-photo{width:240px;height:240px;aspect-ratio:1/1;object-fit:cover;object-position:center;display:block;border-radius:16px;border:1px solid #28536b;box-shadow:0 20px 52px rgba(0,0,0,.38)}.mark-profile-copy h2{font-size:34px;margin:0 0 14px}.mark-profile-copy p{color:#afc0cc;margin:0 0 14px}.mark-profile-copy .mark-note{font-size:13px;color:#7891a3;margin-top:18px}@media(max-width:760px){.mark-profile-card{grid-template-columns:1fr;padding:20px}.mark-profile-photo{width:220px;height:220px;max-width:220px;margin:auto}.mark-profile-copy h2{font-size:30px}}`;
  document.head.appendChild(style);
  const panel=document.createElement('div');
  panel.id='mark-profile';
  panel.innerHTML=`<div class="mark-profile-card"><img class="mark-profile-photo" alt="Mark Leen at the airport" width="240" height="240" loading="lazy"><div class="mark-profile-copy"><div class="eyebrow">Founder · Entrepreneur · Inventor · Creative</div><h2>About Mark Leen</h2><p><strong>Mark Leen</strong> is an Irish multidisciplinary entrepreneur, inventor, writer and artist based in Tralee, County Kerry. His work spans publishing, music and product innovation, including the patented Razr Savr, alongside creative and digital ventures.</p><p>Through BuyWeb3, Mark brings together a personally curated portfolio of distinctive Web3 names selected for memorable branding, practical use and long-term digital value.</p><p class="mark-note">BuyWeb3 is independently owned and operated.</p></div></div>`;
  const img=panel.querySelector('.mark-profile-photo');
  img.src=window.__BUYWEB3_MARK_IMG||'';
  about.appendChild(panel);
}
function boot(){
  if(window.__BUYWEB3_MARK_IMG){renderMarkProfile();return;}
  const s=document.createElement('script');
  s.src='/assets/about-mark-image-data.js';
  s.onload=renderMarkProfile;
  s.onerror=renderMarkProfile;
  document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
