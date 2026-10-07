const walkingReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const walkingOverlay = document.createElement('div');
walkingOverlay.className = 'walking-transition';
walkingOverlay.setAttribute('role','status');
walkingOverlay.setAttribute('aria-live','polite');
walkingOverlay.innerHTML = `<div class="walking-brand">AERFORM<span>®</span></div><div class="walking-stage" aria-hidden="true"><div class="walking-ground"></div><div class="walking-shoe step-one"><img src="assets/sneaker-hero.webp" alt="" width="1024" height="1024"></div><div class="walking-shoe step-two"><img src="assets/sneaker-hero.webp" alt="" width="1024" height="1024"></div><div class="walking-shadow shadow-one"></div><div class="walking-shadow shadow-two"></div></div><p>Следующий шаг.</p><span class="walking-caption">AERFORM / IN MOTION</span>`;
walkingOverlay.hidden = true;
document.body.append(walkingOverlay);
let walkingBusy = false;
document.querySelectorAll('a[href]').forEach(link => {
 const target = new URL(link.href,location.href);
 const sameDocument = target.pathname === location.pathname || (location.pathname.endsWith('/') && target.pathname === location.pathname+'index.html');
 if(target.origin!==location.origin || sameDocument || !/\/(index|about|approach)\.html$/.test(target.pathname))return;
 link.addEventListener('click', event => {
  if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target==='_blank' || link.hasAttribute('download'))return;
  event.preventDefault(); if(walkingBusy)return;
  walkingBusy=true;walkingOverlay.hidden=false;document.body.classList.add('is-transitioning');
  const onError=()=>{walkingBusy=false;walkingOverlay.hidden=true;document.body.classList.remove('is-transitioning')};
  setTimeout(()=>{try{location.assign(target.href)}catch{onError()}},walkingReduced?150:1250);
 });
});
window.addEventListener('pageshow',()=>{walkingBusy=false;walkingOverlay.hidden=true;document.body.classList.remove('is-transitioning')});
