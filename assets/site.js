/* Public-site enhancement only. No company API, CRM credential or tracking. */
(()=>{'use strict';
 document.documentElement.classList.add('js');
 const nav=document.querySelector('.site-nav'),toggle=document.querySelector('.nav-toggle');
 function closeMenu(returnFocus=false){if(!nav||!toggle)return;nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');if(returnFocus)toggle.focus();}
 if(nav&&toggle){
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
  window.matchMedia('(min-width:901px)').addEventListener('change',()=>closeMenu());
 }
 const filters=[...document.querySelectorAll('[data-filter]')],rows=[...document.querySelectorAll('[data-stage]')],search=document.getElementById('venture-search'),count=document.getElementById('venture-count'),empty=document.getElementById('venture-empty');
 let filter='all';
 function discover(){const term=(search?.value||'').trim().toLocaleLowerCase();let visible=0;for(const row of rows){row.hidden=(filter!=='all'&&row.dataset.stage!==filter)||(term&&!row.dataset.search.includes(term));if(!row.hidden)visible++;}if(count)count.textContent=visible+' '+(visible===1?'venture':'ventures')+(term?' matching your search':'');if(empty)empty.hidden=visible>0;for(const button of filters){const active=button.dataset.filter===filter;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}}
 filters.forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;discover();}));search?.addEventListener('input',discover);
 document.getElementById('clear-filters')?.addEventListener('click',()=>{filter='all';search.value='';discover();search.focus();});
 const interest=document.getElementById('contact-interest');
 if(interest){const requested=new URLSearchParams(location.search).get('interest');if([...interest.options].some(option=>option.value===requested))interest.value=requested;}
 document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{if(interest&&[...interest.options].some(option=>option.value===link.dataset.interest))interest.value=link.dataset.interest;}));
 const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
})();
