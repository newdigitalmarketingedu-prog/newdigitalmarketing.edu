
(function(){
const MF=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
const cm=()=>new Date().getMonth(),pct=(a,b)=>b?Math.round(a/b*100):0,mm=m=>m[3]||Math.max(1,Math.round(m[1]/10)),totM=()=>S.metaTot||S.metas.reduce((a,x)=>a+x[1],0);
const lvl=g=>{g=(g||'').toLowerCase();return S.metas.findIndex(m=>g.includes(m[0].toLowerCase())||(g&&m[0].toLowerCase().includes(g)))};
const mc=(i,mo)=>S.fam.filter(f=>f.e>=4&&(i==null||lvl(f.g)===i)&&(f.mm===undefined?cm():f.mm)===mo).length;
const CK={Facebook:'fb',Instagram:'ig',TikTok:'tt'},chT=c=>CK[c]?tg(CK[c]):esc(c);
const fd=f=>+f.slice(3)+' '+MES[+f.slice(0,2)-1];

/* 1. Dashboard: resumen de campañas bajo los KPI */
const od=V.dashboard;
V.dashboard=function(){mig();od();const v=$('view');
 const old=[...v.querySelectorAll('.card')].find(x=>((x.querySelector('h3')||{}).textContent||'').startsWith('Campañas de Meta Ads'));if(old)old.remove();
 const k=v.querySelector('.grid.k4');if(!k)return;kpiMore(v);
 const tg0=S.camp.reduce((a,c)=>a+c.g,0),tl=S.camp.reduce((a,c)=>a+c.l,0);
 k.insertAdjacentHTML('afterend',`<div class="card scroll" style="margin-top:12px"><h3>Resumen de campañas de Meta Ads y TikTok Ads</h3>${S.camp.length?`<table><tr><th>Campaña</th><th>Canal</th><th>Gasto</th><th>Leads</th></tr>${S.camp.map(c=>`<tr><td>${esc(c.n)}</td><td>${chT(c.c)}</td><td>S/ ${c.g}</td><td>${c.l}</td></tr>`).join('')}<tr><td><b>Total</b></td><td></td><td><b>S/ ${tg0}</b></td><td><b>${tl}</b></td></tr></table>`:'<p class="note">Aún no hay campañas.</p>'}</div>`)};

/* 2. Matrículas: metas en una sola columna */
const oc=V.crm;
V.crm=function(){oc();if(S.tab!=='mat')return;const sm=S.mesSel==null?cm():S.mesSel,ce=CE();
 const c=[...document.querySelectorAll('#view .card')].find(x=>((x.querySelector('h3')||{}).textContent||'').startsWith('Meta de matr'));if(!c)return;
 S.metas.forEach(m=>{if(m[3]===undefined)m[3]=mm(m)});
 const tm=S.metas.reduce((a,x)=>a+mm(x),0),ta=S.metas.reduce((a,x)=>a+x[1],0),ok=S.metas.reduce((a,x)=>a+x[2],0);
 c.innerHTML=`<h3>Meta de matrículas por ${TM.nivel}</h3><div class="row"><span style="width:auto">Mes</span><select style="width:auto" onchange="S.mesSel=+this.value;V.crm()">${MF.map((x,i)=>`<option value="${i}" ${i===sm?'selected':''}>${x}</option>`).join('')}</select></div><table><tr><th>${TM.nivel[0].toUpperCase()+TM.nivel.slice(1)}</th><th>${MF[sm]} (matriculados / meta)</th><th>Año (matriculados / meta)</th><th>Avance</th>${ce?'<th>Edición</th>':''}</tr>${S.metas.map((m,i)=>{const e=isE('metas',i);return `<tr><td><b>${esc(m[0])}</b></td><td>${e?`${mc(i,sm)} / ${ec('metas',i,3,'number')}`:`<b>${mc(i,sm)} / ${mm(m)}</b>`}</td><td>${e?`${m[2]} / ${ec('metas',i,1,'number')}`:`<b>${m[2]} / ${m[1]}</b>`}</td><td style="min-width:150px"><div style="display:flex;align-items:center;gap:8px"><div class="bar" style="flex:1"><i style="width:${Math.min(100,pct(m[2],m[1]))}%"></i></div><b>${pct(m[2],m[1])}%</b></div></td>${ce?`<td>${pen('metas',i,1)}</td>`:''}</tr>`}).join('')}<tr><td><b>Total</b></td><td><b>${mc(null,sm)} / ${tm}</b></td><td><b>${ok} / ${ta}</b></td><td></td>${ce?'<td></td>':''}</tr></table><p class="note">El conteo suma solo cuando una familia llega a «Matriculado» en el embudo. Edita las metas con el lápiz.</p>`};

/* 3. Redes: botones de conectar más angostos */
const orr=V.redes;
V.redes=function(){orr();[...document.querySelectorAll('#view .card')].forEach(c=>{if(((c.querySelector('h3')||{}).textContent||'')==='Conectar redes sociales')c.classList.add('cncard')})};

/* 4. Email marketing: listas de docentes y alumnos */
window.addCum=function(){const n=$('cn1').value.trim(),d=$('cd1').value;if(!n||!d){toast('Completa el nombre y la fecha de cumpleaños del docente.');return}S.cum.push([n,'Docente',$('ca1').value.trim()||'—',d.slice(5),0]);logEv('c','Agregó una persona a las listas de cumpleaños');V.email()};
const oe=V.email;
V.email=function(){mig();oe();const c=[...$('view').querySelectorAll(':scope>.card')].find(x=>(x.querySelector('h3')||{}).textContent===TM.cumple);if(!c)return;
 const L=bdays(),by=(a,b)=>a.n.localeCompare(b.n),dc=L.filter(x=>x.t==='Docente').sort(by),al=L.filter(x=>x.t!=='Docente').sort(by);
 const tD=`<div class="card scroll" style="margin-top:12px"><h3>Lista de docentes (${dc.length})</h3><table><tr><th>Nombre</th><th>Área</th><th>Correo</th><th>Fecha de cumpleaños</th></tr>${dc.map(x=>`<tr><td><b>${esc(x.n)}</b></td><td>${esc(x.r)}</td><td>${x.em||'—'}</td><td>${fd(x.f)}</td></tr>`).join('')||'<tr><td colspan="4" class="note">Sin docentes registrados.</td></tr>'}</table></div>`;
 const tA=`<div class="card scroll" style="margin-top:12px"><h3>Lista de alumnos (${al.length})</h3><table><tr><th>Nombre</th><th>Familia</th><th>${TM.grado}</th><th>Correo</th><th>Fecha de cumpleaños</th></tr>${al.map(x=>`<tr><td><b>${esc(x.n)}</b></td><td>${esc(x.r)}</td><td>${esc(F(x.r).g||'—')}</td><td>${x.em||'—'}</td><td>${fd(x.f)}</td></tr>`).join('')||'<tr><td colspan="5" class="note">Sin alumnos registrados.</td></tr>'}</table></div>`;
 const fm=CE()?`<div class="card" style="margin-top:12px"><h3>Agregar docente a la lista</h3><div class="grid k2"><div><label>Nombre del docente</label><input id="cn1"></div><div><label>Área</label><input id="ca1"><label>Fecha de cumpleaños</label><input id="cd1" type="date"></div></div><button class="btn" style="margin-top:10px" onclick="addCum()">Agregar</button></div>`:'';
 c.insertAdjacentHTML('afterend',tD+tA+fm)};

/* 5. Análisis y reportes: nueva estructura por áreas */
const PAL=['#FC3030','#1f5bd8','#22a638','#b7791f','#8e44ad','#0e9aa7','#d6336c','#555555'],nd='<p class="note">Sin datos aún.</p>';
const hb=(it,fmt,col,mx)=>{if(!it.length)return nd;mx=mx||Math.max(...it.map(x=>x[1]),1);return it.map((x,i)=>`<div class="rb"><span class="l" title="${qa(x[0])}">${esc(x[0])}</span><span class="t"><i style="width:${Math.max(2,Math.min(100,x[1]/mx*100))}%;background:${col||PAL[i%PAL.length]}"></i></span><b>${fmt?fmt(x[1]):x[1]}</b></div>`).join('')};
const vc=it=>{const mx=Math.max(...it.map(x=>x[1]),1);return `<div class="vc">${it.map(x=>`<div><span>${x[1]||''}</span><i style="height:${x[1]/mx*100}px"></i><em>${x[0]}</em></div>`).join('')}</div>`};
const dn=it=>{const t=it.reduce((a,x)=>a+x[1],0);if(!t)return nd;const R=40,C=2*Math.PI*R;let o=0;return `<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><svg viewBox="0 0 120 120" width="120" height="120">${it.map((x,i)=>{const l=x[1]/t*C,s=`<circle r="${R}" cx="60" cy="60" fill="none" stroke="${PAL[i%PAL.length]}" stroke-width="20" stroke-dasharray="${l} ${C-l}" stroke-dashoffset="${-o}" transform="rotate(-90 60 60)"/>`;o+=l;return s}).join('')}<text x="60" y="65" text-anchor="middle" font-size="18" font-weight="700" fill="currentColor">${t}</text></svg><div>${it.map((x,i)=>`<div style="font-size:12px"><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${PAL[i%PAL.length]};margin-right:6px"></i>${esc(x[0])}: <b>${x[1]}</b></div>`).join('')}</div></div>`};
const cnt=(a,f)=>{const o={};a.forEach(x=>{const k=f(x);o[k]=(o[k]||0)+1});return Object.entries(o)};
const sec=(t,k,ch,extra)=>`<div class="card rps"><h3>${t}</h3><div class="mood">${k.map(x=>`<div><b>${x[1]}</b><span class="note">${x[0]}</span></div>`).join('')}</div>${extra||''}<div class="rg">${ch.map(c=>`<div class="chb"><p><b>${c[0]}</b></p>${c[1]}</div>`).join('')}</div></div>`;
window.printRep=function(){try{window.print()}catch(e){toast('Usa Ctrl+P y elige «Guardar como PDF».')}};
V.analitica=function(){mig();
 const inv=inv0(),m=mat0(),leads=S.camp.reduce((a,c)=>a+c.l,0),ing=m*ingAlumno(),roi=inv?Math.round((ing-inv)/inv*100):0,ok=S.metas.reduce((a,x)=>a+x[2],0),tot=totM(),cmo=cm(),mcn=mc(null,cmo);
 const Lg=jget('ndm:log:'+S.col,[]),T=jget('ndm:time:'+S.col,{}),me=mem(),atl=S.atl.filter(p=>p.i===S.inst),bd=bdays(),hoy=new Date().toLocaleDateString('es-PE'),sm=a=>a.reduce((s,x)=>s+x[1],0);
 const us=ACC.map(a=>a.u),by=y=>us.map(u=>[u,Lg.filter(x=>x.u===u&&x.y===y).length]),tm=us.map(u=>[u,Math.round((T[u]||0)/60)]);
 const ra=S.ra||'res',G=[['res','Resumen'],['camp','Campañas y ROI'],['cap','Captación'],['com','Comunicación'],['ins','Institución']];
 const objs=[['Meta de matrícula',pct(ok,tot)],['Leads calificados',pct(leads,300)],['Satisfacción',Math.round(sat()*20)],['ROI (vs 300%)',pct(roi,300)]];
 const campT=`<div class="scroll"><table><tr><th>Campaña</th><th>Canal</th><th>Gasto</th><th>Leads</th><th>Costo por lead</th><th>Matrículas</th><th>ROI</th></tr>${S.camp.map(c=>`<tr><td>${esc(c.n)}</td><td>${chT(c.c)}</td><td>S/ ${c.g}</td><td>${c.l}</td><td>${c.l?'S/ '+(c.g/c.l).toFixed(2):'—'}</td><td>${c.m}</td><td><b>${roiCamp(c).roi}%</b></td></tr>`).join('')}</table></div>`;
 const g={
 res:[sec('Dashboard Ejecutivo',[['Matriculados · '+MF[cmo],mcn],['Leads',leads],['Inversión','S/ '+inv.toLocaleString()],['ROI actual',roi+'%']],[['Indicadores de gestión',hb([['Conversión lead → matrícula',pct(m,leads)],['Satisfacción de familias',Math.round(sat()*20)],['Avance de la meta anual',pct(ok,tot)],['Familias contactadas por correo',pct(S.fam.filter(f=>f.ce).length,S.fam.length)]],v=>v+'%','#1f5bd8',100)],['Matriculados por mes',vc(MF.map((x,i)=>[x.slice(0,3),mc(null,i)]))]]),
  sec('Planificación Estratégica',[['Avance de matrícula',ok+'/'+tot],['Eventos del año',S.act.length],['Meses del plan',S.plan.length]],[['Avance de objetivos',hb(objs,v=>v+'%','#22a638',100)],['Eventos por mes',vc(MF.map((x,i)=>[x.slice(0,3),S.act.filter(a=>+a.f.slice(0,2)===i+1).length]))]])],
 camp:[sec('Finanzas de Marketing y ROI',[['Inversión','S/ '+inv.toLocaleString()],['Costo por lead','S/ '+(leads?(inv/leads).toFixed(2):'—')],['Costo por matrícula','S/ '+(m?(inv/m).toFixed(0):'—')],['Ingreso por alumno','S/ '+ingAlumno().toLocaleString()]],[['Gasto por campaña',hb(S.camp.map(c=>[c.n,c.g]),v=>'S/ '+v,'#FC3030')],['ROI por campaña',hb(S.camp.map(c=>[c.n,roiCamp(c).roi]),v=>v+'%','#22a638')],['Costo por lead',hb(S.camp.map(c=>[c.n,c.l?+(c.g/c.l).toFixed(2):0]),v=>'S/ '+v,'#b7791f')],['Leads por campaña',hb(S.camp.map(c=>[c.n,c.l]),null,'#1f5bd8')]],'<p class="note" style="margin-bottom:4px"><b>Detalle de campañas de Meta Ads y TikTok Ads</b></p>'+campT),
  sec('Inteligencia de Mercado',[['Competidores',S.comp.length],['Nuestra pensión','S/ '+S.cfg.pension]],[['Pensión comparada',hb([[S.col,S.cfg.pension],...S.comp.map(c=>[c.n,c.p])],v=>'S/ '+v,'#8e44ad')]])],
 cap:[sec('CRM, Embudo y Matrículas',[[TM.fams[0].toUpperCase()+TM.fams.slice(1),S.fam.length],['Matriculados',mat().length],['Conversión',pct(mat().length,S.fam.length)+'%']],[['Embudo por etapa',hb([0,1,2,4,5].map(i=>[S.etapas[i],S.fam.filter(f=>f.e===i).length]),null,'#FC3030')],['Origen de los contactos',dn(cnt(S.fam,f=>f.o))],['Avance de meta por '+TM.nivel,hb(S.metas.map(x=>[x[0],pct(x[2],x[1])]),v=>v+'%','#1f5bd8',100)]])],
 com:[sec('Planificador de Redes Sociales',[['Publicaciones',S.posts.length],['Redes conectadas',Object.values(S.rcon).filter(Boolean).length+'/3']],[['Publicaciones por red',dn([['Facebook',S.posts.filter(p=>p.r.includes('fb')).length],['Instagram',S.posts.filter(p=>p.r.includes('ig')).length],['TikTok',S.posts.filter(p=>p.r.includes('tt')).length]])],['Publicaciones por estado',hb(cnt(S.posts,p=>p.s),null,'#8e44ad')]]),
  sec('WhatsApp y Fidelización',[['Satisfacción',sat().toFixed(1)+'/5'],['En alerta',S.animo.filter(a=>a[1]<=2).length]],[['Estado de ánimo',hb([5,4,3,2,1].map(v=>[EMO[v][1],S.animo.filter(a=>a[1]===v).length]),null,'#22a638')]]),
  sec('Email Marketing',[['Contactadas',S.fam.filter(f=>f.ce).length],['Abrieron',S.fam.filter(f=>f.ce&&['Abierto','Clic'].includes(f.ce[1])).length],['Cumpleaños en 30 días',bd.filter(x=>x.dias<=30).length]],[['Estado de los correos',dn(cnt(S.fam,f=>f.ce?f.ce[1]:'Sin envío'))]]),
  sec('ATL y Publicidad Exterior',[['Puntos',atl.length],['Instalados',atl.filter(p=>p.est==='Instalada').length]],[['Puntos por estado',dn(cnt(atl,p=>p.est))],['Puntos por formato',hb(cnt(atl,p=>p.fmt),null,'#0e9aa7')]])],
 ins:[sec('Encuestas y Mejoras',[['Respuestas',S.enc.reduce((a,e)=>a+e[1],0)],['Mejoras',S.mej.length],['Hechas',S.mej.filter(x=>x[3]==='Hecha').length]],[['Respuestas por encuesta',hb(S.enc.map(e=>[e[0],e[1]]),null,'#d6336c')],['Mejoras por estado',dn(cnt(S.mej,x=>x[3]))]]),
  sec('Biblioteca, IA y Configuración',[['Google Drive',S.gcon.drive?'Conectado':'Sin conectar'],['Google Fotos',S.gcon.fotos?'Conectado':'Sin conectar'],['Plantillas de IA',me.tpl.length],['Cuentas',ACC.length]],[['Vínculos por origen',dn(cnt(S.glinks,x=>x.t==='Drive'?'Drive':'Fotos'))],['Módulos habilitados por usuario',hb(ACC.map(a=>[a.u,(PERM[a.u]||[]).length]),null,'#1f5bd8')]]),
  sec('Rendimiento de usuarios',[['Sesiones',sm(by('l'))],['Cambios',sm(by('c'))],['Tareas completadas',sm(by('t'))],['Tiempo total (min)',sm(tm)]],[['Sesiones por usuario',hb(by('l'),null,'#1f5bd8')],['Cambios por usuario',hb(by('c'),null,'#b7791f')],['Tareas completadas',hb(by('t'),null,'#22a638')],['Tiempo en la plataforma (min)',hb(tm,v=>v+' min','#8e44ad')]])]};
 $('view').innerHTML=`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><h3 style="margin:0">Reporte general · ${S.col} · ${hoy}</h3><button class="btn noprint" onclick="printRep()">⬇ Descargar PDF</button></div><div class="grid k4" style="margin-top:10px"><div class="card kpi"><span>Costo por lead</span><b>S/ ${leads?(inv/leads).toFixed(2):'—'}</b></div><div class="card kpi"><span>Costo por matrícula</span><b>S/ ${m?(inv/m).toFixed(0):'—'}</b></div><div class="card kpi"><span>Ingreso por alumno</span><b>S/ ${ingAlumno().toLocaleString()}</b></div><div class="card kpi"><span>ROI general</span><b>${roi}%</b></div></div><p class="note">ROI = (ingresos − inversión) ÷ inversión × 100. Modo actual: ${S.cfg.modo==='pens'?'matrícula + pensiones proyectadas':'solo matrícula'}. El PDF incluye todas las áreas.</p></div>
 <div class="tabs rtabs" style="margin-top:12px">${G.map(x=>`<button class="${ra===x[0]?'on':''}" onclick="S.ra='${x[0]}';V.analitica()">${x[1]}</button>`).join('')}</div>
 ${G.map(x=>`<div class="rgrp" style="${ra===x[0]?'':'display:none'}">${g[x[0]].join('')}</div>`).join('')}`};
function mig(){S.fam.forEach(f=>{if(f.e===3)f.e=2});S.etapas[2]='Visita/entrevista'}
function kpiMore(v){const kc=[...v.querySelectorAll('.card')].find(x=>((x.querySelector('h3')||{}).textContent||'')==='KPI');if(!kc)return;
 const h=new Date(),md=(h.getMonth()+1)*100+h.getDate(),past=S.act.filter(a=>+a.f.slice(0,2)*100+(+a.f.slice(3))<md).length;
 const it=[['Familias en alerta',pct(S.animo.filter(a=>a[1]<=2).length,S.animo.length)],['Satisfacción de familias',Math.round(sat()*20)],['Retención',S.rend[0]?S.rend[0][1]:0],['Asistencia promedio',S.rend[1]?S.rend[1][1]:0],['Campañas activas',pct(S.camp.filter(c=>c.s==='Activa').length,S.camp.length)],['Publicaciones programadas o publicadas',pct(S.posts.filter(p=>['Programada','Publicada'].includes(p.s)).length,S.posts.length)],['Eventos realizados',pct(past,S.act.length)],['Mejoras institucionales hechas',pct(S.mej.filter(x=>x[3]==='Hecha').length,S.mej.length)],['Leads frente a la meta (300)',pct(S.camp.reduce((a,c)=>a+c.l,0),300)]];
 kc.insertAdjacentHTML('beforeend',it.map(r=>`<div class="row"><span style="width:190px">${r[0]}</span><div class="bar"><i style="width:${Math.min(100,r[1])}%"></i></div><b>${r[1]}%</b></div>`).join(''))}
window.fmv=function(j,d){const f=S.fam[j],o=f.e;let n=o+d;if(n===3)n=d>0?4:2;n=Math.max(0,Math.min(5,n));if(n===o)return;f.e=n;const i=lvl(f.g);
 if(o<4&&n>=4){f.mm=cm();if(i>=0)S.metas[i][2]++}
 if(o>=4&&n<4){delete f.mm;if(i>=0)S.metas[i][2]=Math.max(0,S.metas[i][2]-1)}
 logEv('c',d>0?'Avanzó una familia en el embudo':'Retrocedió una familia en el embudo');V.crm()};
const oaf=window.addFam;
window.addFam=function(){const n=$('fn')?$('fn').value.trim():'',a=$('fal')?$('fal').value.trim():n,cu=$('fcu')?$('fcu').value:'';oaf();if(n&&a&&cu){S.cum.push([a,'Alumno',TM.pre+n,cu.slice(5),0]);logEv('c','Agregó cumpleaños del estudiante')}};
const oc2=V.crm;
V.crm=function(){mig();
 if(S.tab==='embudo'){const T=[['lista',TM.lista],['embudo','Embudo'],['mat','Matrículas'],['seg','Cliente ideal']],ix=[0,1,2,4,5];
  $('view').innerHTML=`<div class="tabs">${T.map(x=>`<button class="${S.tab===x[0]?'on':''}" onclick="S.tab='${x[0]}';V.crm()">${x[1]}</button>`).join('')}</div><div class="kan" style="grid-template-columns:repeat(5,minmax(170px,1fr))">${ix.map(i=>`<div class="col"><h4>${esc(S.etapas[i]).toUpperCase()} (${S.fam.filter(f=>f.e===i).length})</h4>${S.fam.map((f,j)=>f.e===i?`<div class="fam"><b>${esc(f.n)}</b><small>${esc(f.g)} · ${esc(f.o)}</small><div style="display:flex;gap:4px;flex-wrap:wrap">${i>0?`<button onclick="fmv(${j},-1)">← Retroceder</button>`:''}${i<5?`<button onclick="fmv(${j},1)">Avanzar →</button>`:''}</div></div>`:'').join('')}</div>`).join('')}</div>`;return}
 oc2();
 if(S.tab==='lista'&&$('fo')){const l=$('fo').previousElementSibling;if(l)l.insertAdjacentHTML('beforebegin',S.inst===1?'<label>Cumpleaños del alumno</label><input id="fcu" type="date">':'<label>Nombre del estudiante</label><input id="fal"><label>Cumpleaños del estudiante</label><input id="fcu" type="date">')}};
})();
