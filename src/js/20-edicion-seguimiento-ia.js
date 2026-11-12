
/* ===== Actualización: edición, seguimiento, usuarios, IA y enlaces ===== */
const SL=['colegio-demo','ndm-institute','ucv','maria-del-angel','catolica-school','colegio-la-union','virgen-del-carmen'];
const GR=['Inicial 2 años','Inicial 3 años','Inicial 4 años','Inicial 5 años','1.º primaria','2.º primaria','3.º primaria','4.º primaria','5.º primaria','6.º primaria','1.º secundaria','2.º secundaria','3.º secundaria','4.º secundaria','5.º secundaria'];
const K={comp:'Competencia',camp:'Campañas',fam:'Lista de familias',act:'Eventos',plan:'Plan anual',mv:'Misión y visión',foda:'FODA',users:'Equipo'};
const jget=(k,d)=>{try{return JSON.parse(LSget(k))||d}catch(e){return d}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const qa=s=>String(s==null?'':s).replace(/"/g,'&quot;');
try{const a=JSON.parse(LSget('ndm:acc')||'null');if(a&&a.length){ACC.length=0;a.forEach(x=>ACC.push(x))}}catch(e){}
ACC.forEach(a=>{if(a.ed===undefined)a.ed=a.u==='Admin'});
const saveAcc=()=>LSset('ndm:acc',JSON.stringify(ACC));
const CE=()=>S.user==='Admin'||!!(ACC.find(a=>a.u===S.user)||{}).ed;
loadPerm=function(){const p=jget('ndm:perms',null);PERM={};ACC.forEach(a=>{const l=p&&Array.isArray(p[a.u])?p[a.u].filter(k=>ALLK().includes(k)):(a.u==='Admin'?ALLK():ALLK().slice(0,3));PERM[a.u]=l.length?l:[ALLK()[0]]});if(!PERM.Admin.includes('config'))PERM.Admin.push('config')};
loadPerm();

/* --- datos propios por institución --- */
const cp=o=>JSON.parse(JSON.stringify(o));
const FODA0=[['Fortalezas','Comunidad cercana, resultados académicos, presencia en redes'],['Oportunidades','Zonas con poca oferta, referidos, alianzas locales'],['Debilidades','Seguimiento manual de familias, baja actividad en TikTok'],['Amenazas','Competidores con más inversión, sensibilidad al precio']];
DBS.forEach((d,i)=>{d.mv=[{mis:i===1?'Atraer y fidelizar alumnos que valoren nuestra propuesta formativa.':'Atraer y fidelizar familias que valoren nuestra propuesta educativa.',vis:'Ser la primera opción educativa de nuestra zona de influencia.'}];d.foda=cp(FODA0);d.tasks=[];d.dn=[];d.comp=i?[]:S.comp;d.media=i?[]:S.media;d.enc=i?[]:S.enc;d.mej=i?[]:S.mej;d.camp.forEach(c=>{if(!c.du)c.du=['Los Olivos','Comas','San Miguel'][i%3]})});
DK.push('mv','foda','tasks','dn','comp','media','enc','mej');

/* --- seguimiento de usuarios --- */
function logEv(y,a){if(!S.user)return;const k='ndm:log:'+S.col,L=jget(k,[]);L.push({u:S.user,t:Date.now(),y,a});LSset(k,JSON.stringify(L.slice(-400)))}
setInterval(()=>{if(!S.user||document.hidden)return;const k='ndm:time:'+S.col,T=jget(k,{});T[S.user]=(T[S.user]||0)+10;LSset(k,JSON.stringify(T))},10000);
const og=go;go=function(v){S.ed=null;S.pe=null;og(v);if(S.user)logEv('v',(MODS.find(m=>m[0]===S.v)||[])[1])};
const oe=enter;enter=function(){oe();if($('app').style.display==='block')logEv('l','Inició sesión')};
const AL={addFam:'Agregó una familia o alumno',addPost:'Programó una publicación',addCamp:'Creó una campaña',addAct:'Agregó un evento',addComp:'Agregó un competidor',addMej:'Agregó una mejora',addMedia:'Subió archivos',tgB:'Programó un saludo de cumpleaños',idea:'Llevó una idea al calendario',adv:'Avanzó una familia en el embudo',setAn:'Cambió un estado de ánimo'};
Object.keys(AL).forEach(n=>{const f=window[n];window[n]=function(){const r=f.apply(this,arguments);logEv('c',AL[n]);return r}});

/* --- edición genérica (lápiz / x / guardar) --- */
const isE=(k,i)=>S.ed&&S.ed[0]===k&&S.ed[1]===i;
const R=()=>{const y=scrollY;V[S.v]();scrollTo(0,y)};
function ec(k,i,f,ty,op){if(!isE(k,i))return null;const v=S[k][i][f];
 if(op){const n=typeof (Array.isArray(op[0])?op[0][0]:op[0])==='number'?1:0;return `<select id="e_${f}" data-n="${n}">`+op.map(o=>{const a=Array.isArray(o)?o[0]:o,b=Array.isArray(o)?o[1]:o;return `<option value="${qa(a)}" ${a==v?'selected':''}>${b}</option>`}).join('')+'</select>'}
 return `<input id="e_${f}" type="${ty||'text'}" value="${qa(v)}" style="min-width:80px">`}
const pen=(k,i,nd)=>!CE()?'':isE(k,i)?`<button class="btn" title="Guardar" onclick="edSave('${k}',${i})">💾</button>`:`<button class="btn g" title="Editar" onclick="edOn('${k}',${i})">✏️</button>${nd?'':` <button class="btn g" title="Eliminar" onclick="edDel('${k}',${i})">✖</button>`}`;
function edOn(k,i){S.ed=[k,i];R()}
function edSave(k,i){const o=S[k][i];document.querySelectorAll('#view [id^=e_]').forEach(e=>{if(e.type==='checkbox')return;const f=e.id.slice(2);let v=e.value;if(e.type==='number'||e.dataset.n==='1')v=+v;if(k==='act'&&f==='f')v=v.slice(5);o[f]=v});
 if(k==='act')o.doc=['Fotos','Video','Live'].filter((x,j)=>$('e_c'+j).checked);
 S.ed=null;logEv('c','Editó en '+K[k]);R()}
function edDel(k,i){if(!confirm('¿Eliminar este elemento?'))return;
 if(k==='fam'){const n=S.fam[i].n;S.animo=S.animo.filter(a=>a[0]!==n)}
 if(k==='users'){const u=S.users[i][2],j=ACC.findIndex(a=>a.u===u&&a.u!=='Admin'&&a.u!==S.user);if(j>=0){ACC.splice(j,1);saveAcc()}}
 S[k].splice(i,1);S.ed=null;logEv('c','Eliminó en '+K[k]);R()}
function patchT(t,k,r0,F){if(!t||!CE())return;[...t.rows].forEach((r,ri)=>{if(!ri){r.insertAdjacentHTML('beforeend','<th>Edición</th>');return}const i=ri-r0;if(i<0){r.insertAdjacentHTML('beforeend','<td></td>');return}for(const c in F){const h=ec(k,i,F[c][0],F[c][1],F[c][2]);if(h)r.cells[c].innerHTML=h}r.insertAdjacentHTML('beforeend','<td style="white-space:nowrap">'+pen(k,i)+'</td>')})}

/* --- Dashboard: pendientes dinámicos --- */
function pool(){const P=[],hoy=new Date(),md=(hoy.getMonth()+1)*100+hoy.getDate();
 S.animo.filter(a=>a[1]<=2).forEach(a=>P.push('Llamar a '+a[0]+' (estado de ánimo bajo)'));
 S.fam.forEach(f=>{if(f.e===1)P.push('Dar seguimiento a '+f.n+' (Contactado)');if(f.e===2)P.push('Agendar entrevista con '+f.n);if(f.ce&&f.ce[1]==='No abierto')P.push('Reenviar correo a '+f.n)});
 S.posts.filter(p=>p.s==='Pendiente').forEach(p=>P.push('Aprobar publicación: '+p.t));
 S.camp.filter(c=>c.s==='Activa').forEach(c=>P.push('Revisar resultados de '+c.n));
 bdays().filter(x=>x.dias<=14&&!x.a).forEach(x=>P.push('Programar saludo de cumpleaños de '+x.n));
 S.act.filter(a=>Number(a.f.slice(0,2))*100+Number(a.f.slice(3))>=md).slice(0,2).forEach(a=>P.push('Preparar el evento: '+a.n));
 S.metas.filter(m=>m[2]<m[1]).forEach(m=>P.push('Reforzar captación en '+m[0]+' (faltan '+(m[1]-m[2])+')'));
 P.push('Actualizar el plan de marketing del mes','Responder consultas pendientes de WhatsApp');return P}
function tkDone(i){const d=S.tasks.splice(i,1)[0];S.dn=(S.dn||[]).concat(d).slice(-20);logEv('t','Completó: '+d);let n=pool().find(x=>!S.tasks.includes(x)&&!S.dn.includes(x));if(!n){S.dn=[];n=pool().find(x=>!S.tasks.includes(x))||'Revisar el avance de la semana'}S.tasks.push(n);V.dashboard()}
const odb=V.dashboard;V.dashboard=function(){odb();if(!S.tasks||!S.tasks.length)S.tasks=pool().slice(0,3);const c=[...document.querySelectorAll('#view .card')].find(x=>(x.querySelector('h3')||{}).textContent==='Tareas pendientes');
 if(c)c.innerHTML='<h3>Tareas pendientes</h3>'+S.tasks.map((t,i)=>`<div class="sw"><span><button class="btn g" style="padding:0 7px;margin-right:6px" title="Marcar como hecha" onclick="tkDone(${i})">☐</button>${t}</span></div>`).join('')+'<p class="note">Al marcar una tarea se elimina y la plataforma sugiere una nueva según tus datos.</p>'};

/* --- Planificación: objetivos, FODA, plan anual, eventos --- */
V.plan=function(){const t=S.ptab||'obj',T=[['obj','Objetivos y FODA'],['plan','Plan anual'],['act','Eventos institucionales']];if(t==='act')V.act();else if(t==='plan')V.planBase();else V.obj();
 $('view').innerHTML=`<div class="tabs">${T.map(x=>`<button class="${t===x[0]?'on':''}" onclick="S.ed=null;S.ptab='${x[0]}';V.plan()">${x[1]}</button>`).join('')}</div>`+$('view').innerHTML};
const cor='position:absolute;top:8px;right:8px;white-space:nowrap';
V.obj=function(){const [ok,tot]=mt(),inv=inv0(),m=mat0(),roi=inv?Math.round((m*ingAlumno()-inv)/inv*100):0,leads=S.camp.reduce((a,c)=>a+c.l,0),mv=S.mv[0],e0=isE('mv',0);
 const O=[['Alcanzar la meta de matrícula',ok,tot],['Captar leads calificados',leads,300],['Satisfacción de las familias (de 5)',+sat().toFixed(1),4.5],['ROI de marketing (%)',roi,300]];
 $('view').innerHTML=`<div class="grid k2"><div class="card" style="position:relative"><span style="${cor}">${pen('mv',0,1)}</span><h3>Misión y visión de marketing</h3><p class="note">Misión</p>${e0?`<textarea id="e_mis" rows="3">${esc(mv.mis)}</textarea>`:`<p>${esc(mv.mis)}</p>`}<p class="note">Visión</p>${e0?`<textarea id="e_vis" rows="3">${esc(mv.vis)}</textarea>`:`<p>${esc(mv.vis)}</p>`}</div>
 <div class="card"><h3>Objetivos del año</h3>${O.map(o=>`<div class="row"><span style="width:190px">${o[0]}</span><div class="bar"><i style="width:${Math.min(100,o[1]/o[2]*100)}%"></i></div><b>${o[1]}/${o[2]}</b></div>`).join('')}</div></div>
 <div class="card" style="margin-top:12px"><h3>FODA</h3><div class="grid k2">${S.foda.map((f,i)=>`<div class="card" style="position:relative"><span style="${cor}">${pen('foda',i,1)}</span><b>${f[0]}</b>${isE('foda',i)?`<textarea id="e_1" rows="3">${esc(f[1])}</textarea>`:`<p class="note">${esc(f[1])}</p>`}</div>`).join('')}</div></div>`};
V.planBase=function(){const P=S.plan,tot=P.reduce((a,x)=>a+x[3],0),mx=Math.max(...P.map(x=>x[3]),1),mes=new Date().getMonth();
 $('view').innerHTML=`<div class="grid k4"><div class="card kpi"><span>Año del plan</span><b>${new Date().getFullYear()}</b></div><div class="card kpi"><span>Inversión anual planificada</span><b>S/ ${tot.toLocaleString()}</b></div><div class="card kpi"><span>Eventos institucionales</span><b>${S.act.length}</b></div><div class="card kpi"><span>Meta de matrícula</span><b>${S.metas.reduce((a,x)=>a+x[1],0)}</b></div></div>
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:12px">${P.map((x,i)=>{const e=isE('plan',i);return `<div class="card" style="position:relative"><span style="${cor}">${pen('plan',i,1)}</span><span class="tag ${i===mes?'ok':''}">${x[0]}${i===mes?' · mes actual':''}</span>${e?`<label>Título</label>${ec('plan',i,1)}<label>Contenido</label><textarea id="e_2" rows="3">${esc(x[2])}</textarea><label>Presupuesto (S/)</label>${ec('plan',i,3,'number')}`:`<h3 style="margin:8px 0 6px">${x[1]}</h3><p class="note">${x[2]}</p><div class="row"><span style="width:auto">Presupuesto</span><div class="bar"><i style="width:${x[3]/mx*100}%"></i></div><b>S/ ${x[3]}</b></div>`}</div>`}).join('')}</div>`};
V.act=function(){const h=new Date(),md=(h.getMonth()+1)*100+h.getDate(),yr=h.getFullYear(),ce=CE(),ic={Fotos:'📷',Video:'🎥',Live:'🔴'},L=S.act.map((a,i)=>[a,i]).sort((x,y)=>x[0].f.localeCompare(y[0].f));
 $('view').innerHTML=`<div class="card scroll"><h3>Calendario de eventos del año</h3><table><tr><th>Fecha</th><th>Evento</th><th>Qué se realizará</th><th>Implementos</th><th>Documentación</th><th>Estado</th>${ce?'<th>Edición</th>':''}</tr>${L.map(([a,i])=>{const m=+a.f.slice(0,2),d=+a.f.slice(3),p=m*100+d<md,e=isE('act',i);
 return `<tr><td>${e?`<input id="e_f" type="date" value="${yr}-${a.f}">`:d+' '+MES[m-1]}</td><td>${e?ec('act',i,'n'):`<b>${a.n}</b>`}</td><td>${e?ec('act',i,'q'):a.q}</td><td>${e?ec('act',i,'i'):a.i}</td><td>${e?['Fotos','Video','Live'].map((x,j)=>`<label style="margin:0;display:block"><input type="checkbox" id="e_c${j}" style="width:auto" ${a.doc.includes(x)?'checked':''}> ${ic[x]} ${x}</label>`).join(''):a.doc.map(x=>`<span class="tag ${x==='Live'?'wn':'ok'}">${ic[x]} ${x}</span>`).join(' ')}</td><td><span class="tag ${p?'':'wn'}">${p?'Realizado':'Pendiente'}</span></td>${ce?`<td style="white-space:nowrap">${pen('act',i)}</td>`:''}</tr>`}).join('')}</table></div>
 ${ce?`<div class="card" style="margin-top:12px"><h3>Nuevo evento</h3><div class="grid k2"><div><label>Fecha</label><input id="af" type="date"><label>Nombre del evento</label><input id="an"><label>Qué se realizará</label><textarea id="aq" rows="2"></textarea></div><div><label>Implementos a usar</label><textarea id="ai" rows="2" placeholder="Banners, sonido, stands..."></textarea><label>Cómo se documentará</label><div class="row"><label style="margin:0"><input type="checkbox" id="d1" checked style="width:auto"> 📷 Fotos</label><label style="margin:0"><input type="checkbox" id="d2" style="width:auto"> 🎥 Video</label><label style="margin:0"><input type="checkbox" id="d3" style="width:auto"> 🔴 Live</label></div></div></div><button class="btn" style="margin-top:10px" onclick="addAct()">Agregar evento</button></div>`:''}`};

/* --- Inteligencia de mercado --- */
const oin=V.intel;V.intel=function(){oin();patchT($('view').querySelector('table'),'comp',2,{0:['n'],1:['d'],2:['m','number'],3:['p','number'],5:['s'],6:['f']})};

/* --- Finanzas de marketing: Meta Ads, distrito, calcular ROI --- */
const oca=V.camp;V.camp=function(){oca();const v=$('view');v.querySelector('h3').textContent='Campañas de Meta Ads';const t=v.querySelector('table');
 [...t.rows].forEach((r,i)=>r.cells[2].insertAdjacentHTML('afterend',i?`<td>${S.camp[i-1].du||'—'}</td>`:'<th>Distrito / Urbanización</th>'));
 patchT(t,'camp',1,{0:['n'],1:['c',0,['Instagram','Facebook','TikTok','Correo','WhatsApp']],2:['g','number'],3:['du'],4:['l','number'],5:['m','number'],7:['s',0,['Activa','Finalizada']]});
 $('cg').insertAdjacentHTML('afterend','<label>Distrito / Urbanización objetivo</label><input id="cdu" placeholder="Ej.: Los Olivos, Urb. Covida">');
 const b=[...v.querySelectorAll('button')].find(x=>/saveCfg/.test(x.getAttribute('onclick')||''));b.textContent='Calcular';b.setAttribute('onclick','calcCfg()');
 if(S.roi)b.insertAdjacentHTML('afterend',`<b style="margin-left:10px;color:var(--ok)">Ingresos calculados: S/ ${(mat0()*ingAlumno()).toLocaleString('es-PE')}</b>`)};
function calcCfg(){S.cfg={matricula:+c1.value||0,pension:+c2.value||0,meses:+c3.value||0,anios:+c4.value||1,modo:c5.value};S.roi=1;logEv('c','Calculó el ROI');R()}
addCamp=function(){const n=$('cn').value.trim();if(!n)return;S.camp.push({n,c:$('cc').value,g:+$('cg').value||0,du:$('cdu').value.trim()||'—',l:0,m:0,s:'Activa'});logEv('c','Creó una campaña');V.camp()};

/* --- CRM: lista completa, agregar debajo, grados --- */
const ocr=V.crm;V.crm=function(){ocr();if(S.tab!=='lista')return;const cs=[...document.querySelectorAll('#view>.grid.k2>.card')];if(cs.length<3)return;const [up,tb,ad]=cs;
 tb.style.gridColumn=ad.style.gridColumn=up.style.gridColumn='1/-1';tb.parentNode.append(tb,ad,up);
 if(S.inst!==1&&$('fg'))$('fg').outerHTML=`<select id="fg">${GR.map(x=>`<option>${x}</option>`).join('')}</select>`;
 patchT(tb.querySelector('table'),'fam',1,{0:['n'],1:['em'],2:['tel'],3:['g',0,S.inst===1?null:GR],4:['d'],5:['o',0,['Instagram','Facebook','TikTok','Referido','Web','Excel']],6:['e',0,S.etapas.map((x,i)=>[i,x])]})};

/* --- Planificador de redes: clic en publicación para editar o eliminar --- */
const ore=V.redes;V.redes=function(){ore();if(S.rtab==='feed'||!CE())return;const ord=[];for(let d=1;d<=30;d++)S.posts.forEach((p,i)=>{if(p.d===d)ord.push(i)});
 document.querySelectorAll('#view .cal em').forEach((e,j)=>{e.style.cursor='pointer';e.title='Clic para editar o eliminar';e.onclick=()=>{S.pe=ord[j];V.redes()}});
 const p=S.posts[S.pe],col=document.querySelector('#view .grid.k2>div:not(.card)');if(!p||!col)return;
 col.insertAdjacentHTML('afterbegin',`<div class="card" style="margin-bottom:12px;border-color:var(--red)"><h3>Editar publicación</h3><label>Texto</label><textarea id="pe_t" rows="2">${esc(p.t)}</textarea><div class="row">${[['fb','Facebook'],['ig','Instagram'],['tt','TikTok']].map(x=>`<label style="margin:0"><input type="checkbox" class="pr" value="${x[0]}" ${p.r.includes(x[0])?'checked':''} style="width:auto"> ${x[1]}</label>`).join('')}</div><label>Día del mes</label><input id="pe_d" type="number" min="1" max="30" value="${p.d}"><label>Estado</label><select id="pe_s">${['Borrador','Pendiente','Programada','Publicada'].map(s=>`<option ${s===p.s?'selected':''}>${s}</option>`).join('')}</select><div style="margin-top:10px"><button class="btn" onclick="pubSave()">💾 Guardar</button> <button class="btn g" onclick="pubDel()">✖ Eliminar</button> <button class="btn g" onclick="S.pe=null;V.redes()">Cancelar</button></div></div>`)};
function pubSave(){const p=S.posts[S.pe];p.t=$('pe_t').value.trim()||p.t;p.d=Math.min(30,Math.max(1,+$('pe_d').value||1));p.s=$('pe_s').value;p.r=[...document.querySelectorAll('.pr:checked')].map(x=>x.value);S.pe=null;logEv('c','Editó una publicación');V.redes()}
function pubDel(){if(!confirm('¿Eliminar esta publicación?'))return;S.posts.splice(S.pe,1);S.pe=null;logEv('c','Eliminó una publicación');V.redes()}

/* --- Rendimiento institucional: seguimiento por usuario --- */
V.rend=function(){const L=jget('ndm:log:'+S.col,[]),T=jget('ndm:time:'+S.col,{}),fm=s=>s>=3600?Math.floor(s/3600)+' h '+Math.floor(s%3600/60)+' min':Math.floor(s/60)+' min',fd=t=>new Date(t).toLocaleString('es-PE',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}),TY={l:['Sesión',''],v:['Visita',''],c:['Cambio','wn'],t:['Tarea','ok']};
 const rows=ACC.map(a=>{const l=L.filter(x=>x.u===a.u),lg=l.filter(x=>x.y==='l'),vis={};l.filter(x=>x.y==='v').forEach(x=>vis[x.a]=(vis[x.a]||0)+1);const top=Object.entries(vis).sort((x,y)=>y[1]-x[1])[0];
  return `<tr><td><b>${a.u}</b><br><span class="note">${a.rol}</span></td><td>${lg.length}</td><td>${lg.length?fd(lg[lg.length-1].t):'—'}</td><td>${fm(T[a.u]||0)}</td><td>${l.filter(x=>x.y==='c').length}</td><td>${l.filter(x=>x.y==='t').length}</td><td>${top?top[0]+' ('+top[1]+')':'—'}</td></tr>`}).join('');
 $('view').innerHTML=`<div class="grid k4"><div class="card kpi"><span>Usuarios con actividad</span><b>${new Set(L.map(x=>x.u)).size}</b></div><div class="card kpi"><span>Sesiones iniciadas</span><b>${L.filter(x=>x.y==='l').length}</b></div><div class="card kpi"><span>Cambios realizados</span><b>${L.filter(x=>x.y==='c').length}</b></div><div class="card kpi"><span>Tareas completadas</span><b>${L.filter(x=>x.y==='t').length}</b></div></div>
 <div class="card scroll" style="margin-top:12px"><h3>Seguimiento por usuario · ${S.col}</h3><table><tr><th>Usuario</th><th>Sesiones</th><th>Última sesión</th><th>Tiempo en la plataforma</th><th>Cambios</th><th>Tareas hechas</th><th>Módulo más usado</th></tr>${rows}</table></div>
 <div class="card scroll" style="margin-top:12px"><h3>Actividad reciente</h3><table><tr><th>Cuándo</th><th>Usuario</th><th>Tipo</th><th>Detalle</th></tr>${L.slice(-25).reverse().map(x=>`<tr><td>${fd(x.t)}</td><td>${x.u}</td><td><span class="tag ${TY[x.y][1]}">${TY[x.y][0]}</span></td><td>${esc(x.a||'')}</td></tr>`).join('')||'<tr><td colspan="4" class="note">Aún no hay actividad registrada.</td></tr>'}</table><p class="note">Se registra por institución: ingresos, módulos visitados, cambios, tareas y tiempo de uso (en este navegador).</p></div>`};

/* --- Configuración y usuarios --- */
function setEd(i,v){ACC[i].ed=v;saveAcc();V.config()}
function delAcc(i){if(!confirm('¿Eliminar este usuario?'))return;const u=ACC[i].u;ACC.splice(i,1);delete PERM[u];saveAcc();saveNow(true);logEv('c','Eliminó al usuario '+u);V.config()}
function addTeam(){const n=$('tn').value.trim(),c=$('tc').value.trim(),u=$('tu').value.trim(),p=$('tp').value;if(!n||!c||!u||!p){alert('Completa nombre, cargo, usuario y contraseña.');return}if(ACC.some(a=>a.u.toLowerCase()===u.toLowerCase())){alert('Ese usuario ya existe.');return}
 ACC.push({u,p,rol:c,ed:$('te').checked});S.users.push([n,c,u]);PERM[u]=ALLK().slice(0,3);saveAcc();saveNow(true);logEv('c','Creó al usuario '+u);V.config()}
V.config=function(){const adm=S.user==='Admin',base=LSget('ndm:base')||'';
 const rows=MODS.map(m=>`<tr><td>${m[1]}</td>${ACC.map(a=>`<td style="text-align:center"><input type="checkbox" style="width:auto" ${(PERM[a.u]||[]).includes(m[0])?'checked':''} ${!adm||(a.u==='Admin'&&m[0]==='config')?'disabled':''} onchange="togPerm('${a.u}','${m[0]}',this.checked)"></td>`).join('')}</tr>`).join('');
 $('view').innerHTML=`<div class="card scroll"><h3>Cuentas de acceso</h3><table><tr><th>Usuario</th><th>Contraseña</th><th>Rol</th><th>Puede editar</th><th>Módulos</th><th></th></tr>${ACC.map((a,i)=>`<tr><td><b>${a.u}</b>${a.u===S.user?' <span class="tag ok">Sesión actual</span>':''}</td><td>••••••</td><td>${a.rol}</td><td><input type="checkbox" style="width:auto" ${a.ed?'checked':''} ${!adm||a.u==='Admin'?'disabled':''} onchange="setEd(${i},this.checked)"> <span class="tag ${a.ed?'ok':'wn'}">${a.ed?'Edita':'Solo lectura'}</span></td><td>${(PERM[a.u]||[]).length} de ${MODS.length}</td><td>${adm&&a.u!=='Admin'&&a.u!==S.user?`<button class="btn g" title="Eliminar usuario" onclick="delAcc(${i})">✖</button>`:''}</td></tr>`).join('')}</table><p class="note">Quien puede editar ve los íconos ✏️ y ✖ en cada módulo; quien no, solo lee. Solo Admin cambia estos permisos.</p></div>
 <div class="card scroll" style="margin-top:12px"><h3>Módulos habilitados por usuario</h3>${adm?'':'<p class="note">Solo el usuario Admin puede cambiar estos permisos.</p>'}<table><tr><th>Módulo</th>${ACC.map(a=>`<th style="text-align:center">${a.u}</th>`).join('')}</tr>${rows}</table></div>
 <div class="card scroll" style="margin-top:12px"><h3>Equipo de la institución</h3><table><tr><th>Nombre</th><th>Cargo</th><th>Usuario</th><th>Edición</th></tr>${S.users.map((u,i)=>`<tr><td>${ec('users',i,0)||u[0]}</td><td>${ec('users',i,1)||u[1]}</td><td>${ec('users',i,2)||u[2]||'—'}</td><td style="white-space:nowrap">${pen('users',i)}</td></tr>`).join('')}</table>
 ${adm?`<h3 style="margin-top:14px">Agregar integrante y crear su usuario</h3><div class="grid k2"><div><label>Nombre</label><input id="tn"><label>Cargo</label><input id="tc"></div><div><label>Usuario</label><input id="tu"><label>Contraseña</label><input id="tp" type="password"></div></div><div class="row"><label style="margin:0"><input type="checkbox" id="te" style="width:auto"> Puede editar</label></div><button class="btn" onclick="addTeam()">Crear usuario</button>`:''}</div>
 <div class="card" style="margin-top:12px"><h3>Autoguardado</h3><p>Último autoguardado: <b>${lastTs?fmtTs(lastTs):'sin cambios aún'}</b></p><p class="note">Cada cambio de esta cuenta (${S.user} · ${S.col}) se guarda solo en este navegador. Al volver a ingresar con el mismo usuario e institución, todo se restaura.</p><button class="btn" onclick="saveNow(true)">Guardar ahora</button> <button class="btn g" onclick="clearMine()">Borrar mis datos guardados</button></div>
`};

/* --- Asistente de IA con memoria por usuario --- */
const MK=()=>'ndm:mem:'+S.col+':'+S.user,mem=()=>jget(MK(),{chat:[],tpl:[]}),memSave=m=>LSset(MK(),JSON.stringify(m));
const bub=c=>`<div class="fam" style="${c.r==='u'?'margin-left:20%;background:var(--sb)':'margin-right:20%'}"><b>${c.r==='u'?'Tú':'Asistente'}</b><br>${esc(c.t).replace(/\n/g,'<br>')}</div>`;
V.ia=function(){const m=mem(),Q=['¿Cómo va el ROI?','Crea un copy para Instagram 📸','Redacta un mensaje de WhatsApp 💬','Dame ideas de contenido','¿Qué familias necesitan atención?'];
 $('view').innerHTML=`<div class="grid k2"><div class="card" style="grid-column:1/-1;min-width:0"><h3>Asistente de IA · Especialista en marketing · ${S.col}</h3><p class="note">Conversa con modelo de lenguaje: resuelve dudas de la plataforma y crea copys, plantillas y mensajes con emojis usando los datos de esta institución. Recuerda tu conversación y tus plantillas. Para enseñarle un estilo escribe «plantilla: …» con tu copy.</p><div class="tabs">${Q.map(q=>`<button onclick="iaSend(this.textContent)">${q}</button>`).join('')}</div>
 <div id="chat" style="max-height:420px;overflow:auto;margin:10px 0">${m.chat.map(bub).join('')||'<p class="note">Escribe tu primera pregunta.</p>'}</div><div class="row"><textarea id="iq" rows="2" placeholder="Pide un copy, una plantilla, un mensaje o pregunta por la plataforma..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();iaSend()}"></textarea><button class="btn" onclick="iaSend()">Enviar</button></div><button class="btn g" onclick="iaClear()">Borrar conversación</button></div>
 <div class="card" style="grid-column:1/-1"><h3>Mi memoria: plantillas de copy (${m.tpl.length})</h3>${m.tpl.map((t,i)=>`<div class="sw"><span><b>${esc(t.n)}</b><br><span class="note">${esc(t.t.slice(0,140))}${t.t.length>140?'…':''}</span></span><span style="white-space:nowrap"><button class="btn g" onclick="tplUse(${i})">Usar</button> <button class="btn g" onclick="tplDel(${i})">✖</button></span></div>`).join('')||'<p class="note">Aún no hay plantillas guardadas.</p>'}<label>Nombre</label><input id="tpn"><label>Copy o plantilla</label><textarea id="tpt" rows="3" placeholder="Pega aquí tu copy modelo..."></textarea><button class="btn" style="margin-top:10px" onclick="tplSave()">Guardar en mi memoria</button></div></div>`;
 const c=$('chat');c.scrollTop=c.scrollHeight};
function tplSave(){const n=$('tpn').value.trim(),t=$('tpt').value.trim();if(!t)return;const m=mem();m.tpl.push({n:n||t.slice(0,30),t});memSave(m);logEv('c','Guardó una plantilla en la IA');V.ia()}
function tplDel(i){const m=mem();m.tpl.splice(i,1);memSave(m);V.ia()}
function tplUse(i){const t=mem().tpl[i];$('iq').value='Usa mi plantilla «'+t.n+'» y adáptala para: ';$('iq').focus()}
function iaClear(){const m=mem();m.chat=[];memSave(m);V.ia()}
function ctxStr(){const inv=inv0(),m=mat0(),[ok,tot]=mt();return `Institución: ${S.col}. Registros: ${S.fam.length} (matriculados ${mat().length}). Meta de matrícula ${ok}/${tot}. Campañas Meta Ads: ${S.camp.map(c=>c.n+' (gasto S/'+c.g+', leads '+c.l+', matrículas '+c.m+', '+c.s+')').join('; ')}. Inversión S/${inv}, ROI ${inv?Math.round((m*ingAlumno()-inv)/inv*100):0}%. Ingreso por alumno S/${ingAlumno()}. En alerta: ${S.animo.filter(a=>a[1]<=2).map(a=>a[0]+' ('+a[2]+')').join('; ')||'ninguna'}. Eventos: ${S.act.slice(0,5).map(a=>a.n+' '+a.f).join('; ')}. Usuario: ${S.user}.`}
let iaBusy=0;
async function iaSend(t){const el=$('iq');t=(t||(el&&el.value)||'').trim();if(!t||iaBusy)return;if(el)el.value='';const m=mem(),lt=t.match(/^(plantilla|aprende|guarda)\s*:\s*([\s\S]+)/i);
 if(lt){m.tpl.push({n:lt[2].slice(0,30),t:lt[2]});logEv('c','Enseñó una plantilla a la IA')}
 m.chat.push({r:'u',t},{r:'a',t:'…'});m.chat=m.chat.slice(-40);memSave(m);iaBusy=1;V.ia();let ans;
 try{const sm=await claude.use('sample');if(!sm)throw 0;
  const hist=m.chat.slice(-13,-2).map(x=>(x.r==='u'?'Usuario: ':'Asistente: ')+x.t).join('\n'),tp=m.tpl.map(x=>'- «'+x.n+'»: '+x.t).join('\n')||'(ninguna)';
  const r=await sm(`Eres un especialista senior en marketing digital y captación para instituciones educativas (colegios, institutos y universidades) de Perú, con más de 15 años de experiencia, integrado en la plataforma New Digital Marketing.edu de ${S.col}. Dominas estrategia y plan anual, embudo de admisión y CRM, segmentación y cliente ideal, Meta Ads y TikTok Ads (presupuesto, segmentación por distrito, creatividades, pruebas A/B, costo por lead, ROI), contenido y calendario en Facebook, Instagram y TikTok, email marketing, WhatsApp y fidelización, ATL y publicidad exterior, eventos, encuestas y NPS, marca, copywriting, analítica y reportes, y la Ley peruana de protección de datos personales (Ley 29733) con especial cuidado en datos de menores. Tu misión es resolver todas las dudas de los colaboradores: explica con claridad y paso a paso, da recomendaciones concretas y accionables con ejemplos, plantillas y cifras cuando los datos lo permitan, e indica en qué módulo de la plataforma hacerlo. Si falta información, haz una sola pregunta breve. Si piden algo fuera del marketing o de la plataforma, responde brevemente y reorienta. Hablas en español peruano, tono cálido y profesional, con emojis cuando ayuden. Puedes explicar cualquier módulo de la plataforma, redactar copys, plantillas, mensajes de WhatsApp o correo, guiones e ideas. Usa solo los datos de abajo para cifras y no inventes datos. Imita el estilo de las plantillas guardadas del usuario y reutilízalas cuando encajen.${lt?' El usuario acaba de enseñarte una plantilla nueva: confirma que la guardaste y resume su estilo en una línea.':''}\n\nMÓDULOS: ${MODS.map(x=>x[1]).join('; ')}\n\nDATOS ACTUALES: ${ctxStr()}\n\nPLANTILLAS GUARDADAS:\n${tp}\n\nCONVERSACIÓN PREVIA:\n${hist||'(inicio)'}\n\nMENSAJE DEL USUARIO: ${t}`,{cache:false,onText:({text})=>{const c=$('chat');if(c&&c.lastElementChild)c.lastElementChild.innerHTML=bub({r:'a',t:text});if(c)c.scrollTop=c.scrollHeight}});
  ans=r.text}
 catch(e){ans=(m.tpl.length&&/copy|mensaje|plantilla|texto/i.test(t)?'Con la IA desconectada te dejo tu última plantilla guardada para adaptar:\n\n'+m.tpl[m.tpl.length-1].t:iaAns(t))+'\n\n(Modo sin conexión: concede el permiso de IA al abrir la página para respuestas completas.)'}
 m.chat[m.chat.length-1]={r:'a',t:ans||'No pude responder, intenta de nuevo.'};memSave(m);iaBusy=0;if(S.v==='ia')V.ia()}

/* --- Enlace por institución (hash) --- */
const oat=applyTheme;applyTheme=function(i){oat(i);try{if(location.hash.slice(1)!==SL[i])location.replace('#'+SL[i])}catch(e){}};
addEventListener('hashchange',()=>{if(S.user)return;const i=SL.indexOf(location.hash.slice(1));if(i>=0&&i!==S.inst){$('sch').selectedIndex=i;applyTheme(i)}});
{const i=SL.indexOf(location.hash.slice(1));$('sch').selectedIndex=i>=0?i:0;applyTheme(i>=0?i:0)}

