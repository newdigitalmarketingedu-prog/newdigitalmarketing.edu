
/* ===== Metas de matrícula independientes por mes ===== */
window.metaMes=function(m,mo){const cm=new Date().getMonth();if(mo==null)mo=cm;if(m[4]&&typeof m[4]==='object')return +m[4][mo]||0;return mo===cm?(m[3]||Math.max(1,Math.round(m[1]/10))):0};

/* ===== ATL: medidas en un solo campo (8m x 5m) ===== */
(function(){
K.atl='ATL';
const pm=s=>{const m=/(\d+(?:[.,]\d+)?)\s*(?:m|mt|mts|metros)?\s*[x×*]\s*(\d+(?:[.,]\d+)?)/i.exec(s||'');return m?[+m[1].replace(',','.'),+m[2].replace(',','.')]:[0,0]};
const wh=p=>{if(p.w>0&&p.h>0)return[+p.w,+p.h];return pm(p.fmt)};
const ar=p=>{const[w,h]=wh(p);return Math.round(w*h*100)/100};
window.atlAddP=function(){const r=$('aR').value.trim(),[w,h]=pm($('aM').value);if(!r){toast('Escribe la dirección o referencia del punto.');return}if(!(w>0&&h>0)){toast('Escribe las medidas, por ejemplo 8m x 5m.');return}
 S.atl.push({i:S.inst||0,x:0,y:0,ref:r,w:w,h:h,fmt:'Gigantografía '+w+'×'+h+' m',est:$('aE').value});S.atlP=S.atl.length-1;logEv('c','Agregó un punto de ATL');V.atl()};
const oes=window.edSave;
window.edSave=edSave=function(k,i){
 if(k==='atl'&&$('e_m')){const[a,b]=pm($('e_m').value);if(a>0&&b>0){S.atl[i].w=a;S.atl[i].h=b}}
 if(k==='metas'&&$('e_mm')){const m=S.metas[i],cm=new Date().getMonth(),mo=S.mesSel==null?cm:S.mesSel;if(!m[4]||typeof m[4]!=='object'){const l=metaMes(m,cm);m[4]={};m[4][cm]=l}m[4][mo]=Math.max(0,+$('e_mm').value||0)}
 oes(k,i);
 if(k==='atl'){const p=S.atl[i];if(p){const[w,h]=wh(p);p.fmt='Gigantografía '+w+'×'+h+' m';R()}}};
V.atl=function(){const own=S.inst||0,ce=CE(),pts=S.atl.map((p,i)=>[p,i]).filter(x=>x[0].i===own),sel=pts.find(x=>x[1]===S.atlP)||pts[0],
 q=p=>encodeURIComponent(p.ref+', Lima, Perú'),src=sel?'https://maps.google.com/maps?q='+q(sel[0])+'&z=16&output=embed':'https://maps.google.com/maps?q=Lima,Per%C3%BA&z=11&output=embed',
 tot=Math.round(pts.reduce((a,x)=>a+ar(x[0]),0)*100)/100;
 const rows=pts.map(([p,i])=>{const e=isE('atl',i),[w,h]=wh(p);return `<tr style="${sel&&sel[1]===i?'font-weight:700':''}"><td>${e?ec('atl',i,'ref'):esc(p.ref)}</td><td>${e?`<input id="e_m" value="${w}m x ${h}m">`:w+'m x '+h+'m'}</td><td>${e?ec('atl',i,'est',0,['Instalada','Por instalar']):`<span class="tag ${p.est==='Instalada'?'ok':'wn'}">${p.est}</span>`}</td><td style="white-space:nowrap"><button class="btn g" onclick="atlSelP(${i})">Ver en el mapa</button> <a class="btn g" target="_blank" rel="noopener" style="text-decoration:none" href="https://www.google.com/maps/search/?api=1&query=${q(p)}">Google Maps</a></td>${ce?`<td style="white-space:nowrap">${pen('atl',i)}</td>`:''}</tr>`}).join('');
 $('view').innerHTML=`<div class="grid k4"><div class="card kpi"><span>Puntos registrados</span><b>${pts.length}</b></div><div class="card kpi"><span>Instalados</span><b>${pts.filter(x=>x[0].est==='Instalada').length}</b></div></div>
 <div class="card" style="margin-top:12px"><h3>Mapa de Lima: gigantografías de la institución</h3><iframe src="${src}" style="width:100%;height:440px;border:0;border-radius:10px;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google Maps"></iframe><p class="note">${sel?'Mostrando: '+esc(sel[0].ref)+'. ':''}Elige un punto de la lista para verlo en Google Maps. Si el mapa no aparece, usa el botón «Google Maps».</p></div>
 <div class="card scroll" style="margin-top:12px"><h3>Puntos registrados de ${esc(S.col)} (${pts.length})</h3>${pts.length?`<table><tr><th>Referencia / dirección</th><th>Medidas</th><th>Estado</th><th>Mapa</th>${ce?'<th>Edición</th>':''}</tr>${rows}</table>`:'<p class="note">Esta institución aún no tiene gigantografías registradas.</p>'}</div>
 ${ce?`<div class="card" style="margin-top:12px"><h3>Nuevo punto</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px"><div><label>Referencia / dirección</label><input id="aR" placeholder="Av. Universitaria cdra. 12, Los Olivos"></div><div><label>Medidas (ancho x alto)</label><input id="aM" placeholder="8m x 5m"></div><div><label>Estado</label><select id="aE"><option>Instalada</option><option>Por instalar</option></select></div></div><p class="note">Escribe las medidas como 8m x 5m (también sirve 7.5 x 3.2).</p><button class="btn" style="margin-top:6px" onclick="atlAddP()">Agregar punto</button></div>`:''}`};
})();

/* ===== Plan anual independiente por año (cambio manual con el lápiz) ===== */
(function(){
const MN=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
const blank=y=>MN.map(m=>[m,'Sin definir','Pulsa ✏️ para definir el enfoque y las acciones de '+m.toLowerCase()+' de '+y+'.',0,y]);
window.ensurePlan=function(){const yr=S.anio||new Date().getFullYear();S.planY=S.planY||{};if(!Array.isArray(S.plan)||!S.plan.length)S.plan=blank(yr);const tag=S.plan[0][4];
 if(tag===undefined){S.plan.forEach(x=>x[4]=yr);S.planY[yr]=S.plan}
 else if(tag===yr)S.planY[yr]=S.plan;
 else{S.planY[tag]=S.plan;S.plan=S.planY[yr]||blank(yr);S.planY[yr]=S.plan}
 S.anio=yr};
const oks=window.kpiSave;
window.kpiSave=function(n){if(n==='a'){const y=Math.round(+$('k_a').value);if(y>=2000&&y<=2200){ensurePlan();S.anio=y;ensurePlan();logEv('c','Cambió al plan del año '+y)}S.ed=null;R();return}oks(n)};
const opb2=V.planBase;V.planBase=function(){ensurePlan();opb2()};
})();

/* ===== Sincronización por usuario entre computadoras ===== */
(function(){
const uid=u=>btoa(unescape(encodeURIComponent(u))).replace(/[^A-Za-z0-9]/g,'');
let col=null,ready=false,lastMem='',lts=0,lastLog='',lastT=-1;
const kL=()=>'ndm:log:'+S.col,kT=()=>'ndm:time:'+S.col;
function apply(dt){if(!dt||!dt.k)return;
 if(dt.k==='mem'&&dt.u===S.user){if(dt.ts>lts&&dt.s!==lastMem){LSset(MK(),dt.s);lastMem=dt.s;lts=dt.ts;const a=document.activeElement;if(S.v==='ia'&&!iaBusy&&!(a&&a.tagName==='TEXTAREA'))V.ia()}}
 else if(dt.k==='log'){try{const r=JSON.parse(dt.s),L=jget(kL(),[]),key=x=>x.u+'|'+x.t+'|'+x.y+'|'+x.a,seen=new Set(L.map(key));let n=0;r.forEach(x=>{if(!seen.has(key(x))){L.push(x);n++}});if(n){L.sort((a,b)=>a.t-b.t);LSset(kL(),JSON.stringify(L.slice(-400)))}}catch(e){}}
 else if(dt.k==='time'){const T=jget(kT(),{});if(+dt.s>(T[dt.u]||0)){T[dt.u]=+dt.s;LSset(kT(),JSON.stringify(T))}}}
async function start(){if(col||!S.user||!window.claude)return;const db=await claude.use('db');if(!db)return;col=db.collection('x_'+SL[S.inst||0]);
 col.onSnapshot(sn=>{sn.docChanges().forEach(c=>{if(c.type==='removed')return;const d=c.doc;if(d.metadata&&d.metadata.hasPendingWrites)return;apply(d.data())});if(!(sn.metadata&&sn.metadata.fromCache))ready=true},()=>{})}
setInterval(()=>{if(!ready||!col||!S.user)return;const id=uid(S.user);
 const s=LSget(MK())||'';try{const m=JSON.parse(s||'{}');if(((m.chat||[]).length||(m.tpl||[]).length)&&s!==lastMem){lastMem=s;lts=Date.now();col.doc('mem_'+id).set({u:S.user,k:'mem',s,ts:lts}).catch(()=>{})}}catch(e){}
 const mine=jget(kL(),[]).filter(x=>x.u===S.user).slice(-150),ls=JSON.stringify(mine);if(mine.length&&ls!==lastLog){lastLog=ls;col.doc('log_'+id).set({u:S.user,k:'log',s:ls}).catch(()=>{})}
 const t=jget(kT(),{})[S.user]||0;if(t!==lastT){lastT=t;col.doc('time_'+id).set({u:S.user,k:'time',s:t}).catch(()=>{})}},3000);
const oen=enter;let wait=0;
function doEnter(){oen();if($('app').style.display==='block')start()}
enter=window.enter=function(){const u=$('u').value.trim(),pw=$('p').value,ok=ACC.some(a=>a.u.toLowerCase()===u.toLowerCase()&&a.p===pw);
 if(!ok&&!window.__accReady&&window.claude&&!wait){wait=1;$('lerr').innerHTML='<span class="tag">Sincronizando cuentas…</span>';let n=0;const t=setInterval(()=>{n++;if(window.__accReady||n>12){clearInterval(t);wait=0;doEnter()}},500);return}
 doEnter()};
})();

/* ===== Flechas numéricas con fondo blanco ===== */
(function(){
function deco(){document.querySelectorAll('input[type=number]').forEach(i=>{if(i.dataset.st||i.disabled||i.parentNode.classList.contains('nw'))return;const r=i.getBoundingClientRect(),pw=i.parentNode.clientWidth;if(!r.width)return;i.dataset.st=1;
 const w=document.createElement('span');w.className='nw';if(r.width>=pw-4){w.style.display='block'}else{w.style.display='inline-block';w.style.width=r.width+'px'}
 i.parentNode.insertBefore(w,i);w.appendChild(i);const b=document.createElement('span');b.className='nb';b.innerHTML='<i>▲</i><i>▼</i>';w.appendChild(b);
 const st=up=>{i.focus();try{up?i.stepUp():i.stepDown()}catch(e){i.value=(+i.value||0)+(up?1:-1)}i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))};
 b.children[0].onmousedown=e=>{e.preventDefault();st(1)};b.children[1].onmousedown=e=>{e.preventDefault();st(0)}})}
let t;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(deco,30)}).observe(document.body,{childList:true,subtree:true});deco();
})();
