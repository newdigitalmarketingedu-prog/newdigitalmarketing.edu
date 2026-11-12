
(function(){
const MF=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
const curM=()=>new Date().getMonth(),pct=(a,b)=>b?Math.round(a/b*100):0;
const mmeta=m=>m[3]||Math.max(1,Math.round(m[1]/10));
const totMeta=()=>S.metaTot||S.metas.reduce((a,x)=>a+x[1],0);
const lvlIdx=g=>{g=(g||'').toLowerCase();return S.metas.findIndex(m=>g.includes(m[0].toLowerCase())||(g&&m[0].toLowerCase().includes(g)))};
const monthCount=(i,mo)=>S.fam.filter(f=>f.e>=4&&(i==null||lvlIdx(f.g)===i)&&(f.mm===undefined?curM():f.mm)===mo).length;
const CH=['Facebook','Instagram','TikTok'],CK={Facebook:'fb',Instagram:'ig',TikTok:'tt'};
const chTag=c=>CK[c]?tg(CK[c]):esc(c);
const cplS=x=>x.l?'S/ '+(x.g/x.l).toFixed(2):'—';

/* confirm/alert bloqueados en páginas publicadas: eliminar directo */
window.toast=m=>{let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',3500)};
window.confirm=()=>true;window.alert=m=>toast(m);

/* datos nuevos por institución */
const P0=[{t:'Matrícula con 15% de descuento (hasta 30/11)',e:'Vigente'},{t:'Beca por hermanos',e:'Vigente'},{t:'Servicios: talleres, transporte, extracurriculares',e:'Catálogo'}];
DBS.forEach(d=>{d.promo=cp(P0);d.rcon={fb:0,ig:0,tt:0};d.gcon={drive:0,fotos:0};d.glinks=[];d.anio=null;d.metaTot=null;d.segX=0;d.mesSel=null;d.metas.forEach(m=>{if(m[3]===undefined)m[3]=mmeta(m)})});
['promo','rcon','gcon','glinks','anio','metaTot','segX','mesSel'].forEach(k=>DK.push(k));
K.promo='Promociones';K.glinks='Biblioteca';
Object.assign(S,DBS[S.inst||0]);

/* ---------- Dashboard ---------- */
const odb3=V.dashboard;
V.dashboard=function(){odb3();const v=$('view'),k=v.querySelectorAll('.kpi'),[ok]=mt(),tot=totMeta(),cm=curM(),mc=monthCount(null,cm),mm=S.metas.reduce((a,x)=>a+mmeta(x),0);
 k[0].innerHTML=`<span>Nuevos matriculados · ${MF[cm]}</span><b>${mc}/${mm}</b><span>Meta del mes · Año: ${ok} de ${tot}</span><div class="bar"><i style="width:${Math.min(100,pct(mc,mm))}%"></i></div>`;
 k[3].querySelector('span').textContent='ROI actual';
 const inv=inv0(),m=mat0(),leads=S.camp.reduce((a,c)=>a+c.l,0);
 const kc=[...v.querySelectorAll('.card')].find(x=>(x.querySelector('h3')||{}).textContent==='Rendimiento por red (alcance)');
 if(kc){const it=[['Conversión lead → matrícula',pct(m,leads)],['Satisfacción de familias',Math.round(sat()*20)],['Avance de la meta anual',pct(ok,tot)],['Retención',S.rend[0]?S.rend[0][1]:0]];
  kc.innerHTML='<h3>KPI</h3>'+it.map(r=>`<div class="row"><span style="width:170px">${r[0]}</span><div class="bar"><i style="width:${Math.min(100,r[1])}%"></i></div><b>${r[1]}%</b></div>`).join('')+`<p class="note">Costo por lead: S/ ${leads?(inv/leads).toFixed(2):'—'} · Costo por matrícula: S/ ${m?(inv/m).toFixed(0):'—'}</p>`}
 const A=S.camp.filter(c=>c.s==='Activa'),nt=v.querySelector('p.note:last-child');
 const h=`<div class="card scroll" style="margin-top:12px"><h3>Campañas de Meta Ads y TikTok Ads activas</h3>${A.length?`<table><tr><th>Campaña</th><th>Canal</th><th>Gasto</th><th>Leads</th><th>Costo por lead</th><th>Matrículas</th><th>ROI</th></tr>${A.map(c=>`<tr><td>${esc(c.n)}</td><td>${chTag(c.c)}</td><td>S/ ${c.g}</td><td>${c.l}</td><td>${cplS(c)}</td><td>${c.m}</td><td><b>${roiCamp(c).roi}%</b></td></tr>`).join('')}</table>`:'<p class="note">No hay campañas activas.</p>'}</div>`;
 if(nt)nt.insertAdjacentHTML('beforebegin',h);else v.insertAdjacentHTML('beforeend',h)};

/* ---------- Plan anual ---------- */
V.planBase=function(){const P=S.plan,mes=curM(),ce=CE(),[ok]=mt(),tot=totMeta(),yr=S.anio||new Date().getFullYear();
 $('view').innerHTML=`<div class="grid k4"><div class="card kpi"><span>Año del plan</span>${ce?`<input type="number" value="${yr}" style="font-size:22px;font-weight:700;margin-top:4px" onchange="S.anio=+this.value||${yr};logEv('c','Cambió el año del plan')">`:`<b>${yr}</b>`}</div>
 <div class="card kpi"><span>Meta de matrícula (conteo)</span><b>${ok}/${ce?`<input type="number" min="1" value="${tot}" style="width:110px;font-size:20px;font-weight:700" onchange="S.metaTot=+this.value||${tot};logEv('c','Cambió la meta de matrícula');V.plan()">`:tot}</b><div class="bar"><i style="width:${Math.min(100,pct(ok,tot))}%"></i></div></div>
 <div class="card kpi"><span>Eventos institucionales</span><b>${S.act.length}</b></div></div>
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:12px">${P.map((x,i)=>{const e=isE('plan',i);return `<div class="card" style="position:relative"><span style="${cor}">${pen('plan',i,1)}</span><span class="tag ${i===mes?'ok':''}">${x[0]}${i===mes?' · mes actual':''}</span>${e?`<label>Título</label>${ec('plan',i,1)}<label>Contenido</label><textarea id="e_2" rows="3">${esc(x[2])}</textarea>`:`<h3 style="margin:8px 0 6px">${x[1]}</h3><p class="note">${x[2]}</p>`}</div>`}).join('')}</div>`};

/* ---------- Inteligencia de mercado ---------- */
const oin2=V.intel;
V.intel=function(){oin2();const v=$('view'),h=v.querySelector('h3');if(h)h.textContent='Competencia directa';const t=v.querySelector('table');if(t)[...t.rows].forEach(r=>{if(r.cells[5])r.cells[5].remove()})};

/* ---------- Finanzas de marketing ---------- */
window.addPromo=function(){const t=$('pt1').value.trim();if(!t)return;S.promo.push({t,e:'Vigente'});logEv('c','Agregó una promoción');V.camp()};
V.camp=function(){const c=S.cfg,ce=CE();
 const rows=S.camp.map((x,i)=>{const e=isE('camp',i);return `<tr><td>${e?ec('camp',i,'n'):esc(x.n)}</td><td>${e?ec('camp',i,'c',0,CH):chTag(x.c)}</td><td>${e?ec('camp',i,'g','number'):'S/ '+x.g}</td><td>${e?ec('camp',i,'du'):esc(x.du||'—')}</td><td>${e?ec('camp',i,'l','number'):x.l}</td><td>${cplS(x)}</td><td>${e?ec('camp',i,'m','number'):x.m}</td><td><b>${roiCamp(x).roi}%</b></td><td>${e?ec('camp',i,'s',0,['Activa','Finalizada']):`<span class="tag ${x.s==='Activa'?'ok':'wn'}">${x.s}</span>`}</td>${ce?`<td style="white-space:nowrap">${pen('camp',i)}</td>`:''}</tr>`}).join('');
 $('view').innerHTML=`<div class="card scroll"><h3>Campañas de Meta Ads y TikTok Ads</h3><table><tr><th>Campaña</th><th>Canal</th><th>Gasto</th><th>Distrito / Urbanización</th><th>Leads</th><th>Costo por lead</th><th>Matrículas</th><th>ROI</th><th>Estado</th>${ce?'<th>Edición</th>':''}</tr>${rows}</table></div>
 <div class="grid k2" style="margin-top:12px"><div class="card"><h3>Nueva campaña</h3><label>Nombre</label><input id="cn"><label>Canal</label><select id="cc">${CH.map(x=>`<option>${x}</option>`).join('')}</select><label>Gasto (S/)</label><input id="cg" type="number" value="500"><label>Distrito / Urbanización objetivo</label><input id="cdu" placeholder="Ej.: Los Olivos, Urb. Covida"><button class="btn" style="margin-top:10px" onclick="addCamp()">Crear</button></div>
 <div class="card"><h3>Base del cálculo de ROI</h3><label>Valor de matrícula (S/)</label><input id="c1" type="number" value="${c.matricula}"><label>Pensión mensual (S/)</label><input id="c2" type="number" value="${c.pension}"><label>Meses de pensión por año</label><input id="c3" type="number" value="${c.meses}"><label>Años de permanencia considerados</label><input id="c4" type="number" value="${c.anios}"><label>El ROI considera</label><select id="c5"><option value="pens" ${c.modo==='pens'?'selected':''}>Matrícula + pensiones proyectadas</option><option value="mat" ${c.modo==='mat'?'selected':''}>Solo matrícula</option></select><button class="btn" style="margin-top:10px" onclick="calcCfg()">Calcular</button>${S.roi?`<b style="margin-left:10px;color:var(--ok)">Ingresos calculados: S/ ${(mat0()*ingAlumno()).toLocaleString('es-PE')}</b>`:''}<p class="note">Ingreso por alumno actual: <b>S/ ${ingAlumno().toLocaleString()}</b>.</p></div>
 <div class="card"><h3>Promociones y servicios</h3>${S.promo.map((p,i)=>{const e=isE('promo',i);return `<div class="sw"><span>${e?ec('promo',i,'t'):esc(p.t)}</span><span style="white-space:nowrap">${e?ec('promo',i,'e',0,['Vigente','Catálogo','Finalizada']):`<span class="tag ${p.e==='Vigente'?'ok':p.e==='Finalizada'?'wn':''}">${p.e}</span>`} ${pen('promo',i)}</span></div>`}).join('')}${ce?'<div class="row"><input id="pt1" placeholder="Nueva promoción o servicio"><button class="btn" onclick="addPromo()">Agregar</button></div>':''}</div></div>`};

/* ---------- CRM ---------- */
window.fmv=function(j,d){const f=S.fam[j],o=f.e,n=Math.max(0,Math.min(5,o+d));if(n===o)return;f.e=n;const i=lvlIdx(f.g);
 if(o<4&&n>=4){f.mm=curM();if(i>=0)S.metas[i][2]++}
 if(o>=4&&n<4){delete f.mm;if(i>=0)S.metas[i][2]=Math.max(0,S.metas[i][2]-1)}
 logEv('c',d>0?'Avanzó una familia en el embudo':'Retrocedió una familia en el embudo');V.crm()};
const SX0=[['Familias con hijos en inicial','Inicial · 25–34 años','Buscan adaptación cuidadosa y trato afectuoso','Instagram + WhatsApp'],['Padres que priorizan idiomas y tecnología','Primaria · 30–42 años','Valoran inglés, robótica y herramientas digitales','Instagram + Facebook'],['Familias que buscan precio accesible','Todos los niveles · 28–45 años','Comparan pensión, becas y descuentos por hermanos','Facebook + WhatsApp'],['Familias referidas por otros padres','Todos los niveles · 30–48 años','Confían en la recomendación y la reputación','WhatsApp + referidos'],['Padres que trabajan y necesitan horario extendido','Primaria · 32–45 años','Requieren talleres, transporte y cuidado después de clases','Facebook + visita guiada'],['Familias que se mudan a la zona','Inicial y primaria · 28–40 años','Buscan colegio cercano a su nueva vivienda','Instagram + Google']],
 SX1=[['Estudiantes de último ciclo','20–24 años','Quieren especializarse antes de graduarse','Instagram + TikTok'],['Freelancers y creativos','22–35 años','Buscan portafolio y clientes propios','Instagram + correo'],['Personas que cambian de carrera','28–45 años','Necesitan una ruta clara y horarios flexibles','Facebook + WhatsApp'],['Dueños de pequeños negocios','30–50 años','Quieren vender más con redes y publicidad digital','Facebook + WhatsApp']];
const ocrm=V.crm;
V.crm=function(){const t=S.tab;if(!['embudo','mat','seg'].includes(t))return ocrm();
 const T=[['lista',TM.lista],['embudo','Embudo'],['mat','Matrículas'],['seg','Cliente ideal']];let b='';
 if(t==='embudo')b=`<div class="kan">${S.etapas.map((e,i)=>`<div class="col"><h4>${e.toUpperCase()} (${S.fam.filter(f=>f.e===i).length})</h4>${S.fam.map((f,j)=>f.e===i?`<div class="fam"><b>${esc(f.n)}</b><small>${esc(f.g)} · ${esc(f.o)}</small><div style="display:flex;gap:4px;flex-wrap:wrap">${i>0?`<button onclick="fmv(${j},-1)">← Retroceder</button>`:''}${i<5?`<button onclick="fmv(${j},1)">Avanzar →</button>`:''}</div></div>`:'').join('')}</div>`).join('')}</div>`;
 if(t==='mat'){const sm=S.mesSel==null?curM():S.mesSel,ce=CE(),ok=S.metas.reduce((a,x)=>a+x[2],0);
  b=`<div class="grid k2"><div class="card scroll" style="grid-column:1/-1"><h3>Meta de matrículas por ${TM.nivel}</h3><div class="row"><span style="width:auto">Mes</span><select style="width:auto" onchange="S.mesSel=+this.value;V.crm()">${MF.map((x,i)=>`<option value="${i}" ${i===sm?'selected':''}>${x}</option>`).join('')}</select></div><table><tr><th>${TM.nivel[0].toUpperCase()+TM.nivel.slice(1)}</th><th>Meta anual</th><th>Matriculados (acumulado)</th><th>Avance</th><th>Meta de ${MF[sm]}</th><th>Matriculados en ${MF[sm]}</th></tr>${S.metas.map((m,i)=>`<tr><td><b>${m[0]}</b></td><td>${ce?`<input type="number" min="1" style="width:80px" value="${m[1]}" onchange="S.metas[${i}][1]=+this.value||1;V.crm()">`:m[1]}</td><td>${m[2]}/${m[1]}</td><td style="min-width:120px"><div class="bar"><i style="width:${Math.min(100,pct(m[2],m[1]))}%"></i></div></td><td>${ce?`<input type="number" min="1" style="width:70px" value="${mmeta(m)}" onchange="S.metas[${i}][3]=+this.value||1;V.crm()">`:mmeta(m)}</td><td><b>${monthCount(i,sm)}/${mmeta(m)}</b></td></tr>`).join('')}<tr><td><b>Total</b></td><td><b>${S.metas.reduce((a,x)=>a+x[1],0)}</b></td><td><b>${ok}</b></td><td></td><td><b>${S.metas.reduce((a,x)=>a+mmeta(x),0)}</b></td><td><b>${monthCount(null,sm)}</b></td></tr></table><p class="note">Cada vez que una familia llega a «Matriculado» en el embudo, el conteo del nivel y del mes suma automáticamente (y resta si retrocede).</p></div>
  <div class="card scroll" style="grid-column:1/-1"><h3>Matriculados recientes</h3><table><tr><th>${TM.fam}</th><th>${TM.grado}</th><th>Origen</th><th>Mes</th></tr>${mat().map(f=>`<tr><td>${esc(f.n)}</td><td>${esc(f.g)}</td><td>${esc(f.o)}</td><td>${MF[f.mm===undefined?curM():f.mm]}</td></tr>`).join('')}</table></div></div>`}
 if(t==='seg'){if(!S.segX){S.seg.push(...cp(S.inst===1?SX1:SX0));S.segX=1}b=`<div class="grid k2">${S.seg.map(s=>`<div class="card"><h3>${s[0]}</h3><p><b>${s[1]}</b></p><p>${s[2]}</p><span class="tag ok">${s[3]}</span></div>`).join('')}</div>`}
 $('view').innerHTML=`<div class="tabs">${T.map(x=>`<button class="${t===x[0]?'on':''}" onclick="S.tab='${x[0]}';V.crm()">${x[1]}</button>`).join('')}</div>${b}`};

/* ---------- Biblioteca multimedia (Google Drive y Google Fotos) ---------- */
window.gcon=function(k){S.gcon[k]=S.gcon[k]?0:1;logEv('c',(S.gcon[k]?'Conectó ':'Desconectó ')+(k==='drive'?'Google Drive':'Google Fotos'));V.biblio()};
window.addGl=function(){let u=$('gu').value.trim();if(!u){toast('Pega el link de la carpeta o álbum.');return}if(!/^https?:/i.test(u))u='https://'+u;S.glinks.push({n:$('gn').value.trim()||'Sin nombre',t:$('gt').value,a:$('ga').value.trim()||'—',u});logEv('c','Vinculó una carpeta o álbum');V.biblio()};
V.biblio=function(){const ce=CE(),G=S.gcon,L=S.glinks;
 const box=(k,n,ic,u)=>`<div class="card" style="text-align:center"><div style="font-size:34px">${ic}</div><h3>${n}</h3>${G[k]?`<span class="tag ok">Conectado</span><div style="margin-top:10px"><a class="btn" target="_blank" rel="noopener" href="${u}">Abrir ${n}</a> <button class="btn g" onclick="gcon('${k}')">Desconectar</button></div>`:`<p class="note">Sin conectar</p><a class="btn" target="_blank" rel="noopener" href="${u}" onclick="gcon('${k}')">Conectar con ${n}</a>`}</div>`;
 $('view').innerHTML=`<div class="grid k2">${box('drive','Google Drive','📁','https://drive.google.com')}${box('fotos','Google Fotos','🖼️','https://photos.google.com')}</div>
 <p class="note" style="margin-top:8px">Los archivos viven en tu Google Drive y Google Fotos; aquí solo se vinculan las carpetas y álbumes. La conexión real con las cuentas de Google se activará al integrar sus APIs.</p>
 <div class="card scroll" style="margin-top:12px"><h3>Carpetas y álbumes vinculados (${L.length})</h3>${L.length?`<table><tr><th>Nombre</th><th>Origen</th><th>Actividad o campaña</th><th>Enlace</th>${ce?'<th>Edición</th>':''}</tr>${L.map((x,i)=>`<tr><td><b>${esc(x.n)}</b></td><td><span class="tag ${x.t==='Drive'?'ok':'wn'}">${x.t==='Drive'?'📁 Drive':'🖼️ Fotos'}</span></td><td>${esc(x.a)}</td><td><a href="${qa(x.u)}" target="_blank" rel="noopener" style="color:var(--red)">Abrir</a></td>${ce?`<td><button class="btn g" title="Eliminar" onclick="edDel('glinks',${i})">✖</button></td>`:''}</tr>`).join('')}</table>`:'<p class="note">Aún no hay carpetas ni álbumes vinculados.</p>'}</div>
 ${ce?`<div class="card" style="margin-top:12px"><h3>Vincular carpeta o álbum</h3><div class="grid k2"><div><label>Nombre</label><input id="gn" placeholder="Ej.: Fotos Día de la Madre"><label>Origen</label><select id="gt"><option value="Drive">Google Drive</option><option value="Fotos">Google Fotos</option></select></div><div><label>Actividad o campaña</label><input id="ga" placeholder="Ej.: Puertas abiertas"><label>Link de la carpeta o álbum</label><input id="gu" placeholder="https://drive.google.com/..."></div></div><button class="btn" style="margin-top:10px" onclick="addGl()">Vincular</button></div>`:''}`};

/* ---------- Planificador de redes ---------- */
window.rcon=function(k){S.rcon[k]=S.rcon[k]?0:1;logEv('c',(S.rcon[k]?'Conectó ':'Desconectó ')+{fb:'Facebook',ig:'Instagram',tt:'TikTok'}[k]);V.redes()};
const ore2=V.redes;
V.redes=function(){if(S.rtab==='feed')return ore2();
 const ce=CE(),now=new Date(),y=now.getFullYear(),mo=now.getMonth(),dim=new Date(y,mo+1,0).getDate(),off=(new Date(y,mo,1).getDay()+6)%7,SC={Programada:'var(--red)',Pendiente:'#b7791f',Borrador:'#8b8b8b',Publicada:'#1f8a4c'};
 const tabs=`<div class="tabs">${[['cal','Calendario y publicaciones'],['feed','Feeds (perfiles)']].map(x=>`<button class="${(S.rtab||'cal')===x[0]?'on':''}" onclick="S.rtab='${x[0]}';V.redes()">${x[1]}</button>`).join('')}</div>`;
 const NT=[['fb','Facebook','https://www.facebook.com/'],['ig','Instagram','https://www.instagram.com/accounts/login/'],['tt','TikTok','https://www.tiktok.com/login']];
 const con=`<div class="card"><h3>Conectar redes sociales</h3><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${NT.map(n=>`<div class="card" style="text-align:center">${tg(n[0])}<div style="margin:10px 0">${S.rcon[n[0]]?'<span class="tag ok">Conectado</span>':'<span class="note">Sin conectar</span>'}</div>${S.rcon[n[0]]?`<button class="btn g" onclick="rcon('${n[0]}')">Desconectar</button>`:`<a class="btn" target="_blank" rel="noopener" href="${n[2]}" onclick="rcon('${n[0]}')">Conectar ${n[1]}</a>`}</div>`).join('')}</div><p class="note">La publicación automática real requiere aprobar las APIs oficiales de Meta y TikTok.</p></div>`;
 const p=S.posts[S.pe],ed=p&&ce?`<div class="card" style="margin-top:12px;border-color:var(--red)"><h3>Editar publicación</h3><div class="grid k2"><div><label>Texto</label><textarea id="pe_t" rows="3">${esc(p.t)}</textarea><div class="row">${[['fb','Facebook'],['ig','Instagram'],['tt','TikTok']].map(x=>`<label style="margin:0"><input type="checkbox" class="pr" value="${x[0]}" ${p.r.includes(x[0])?'checked':''} style="width:auto"> ${x[1]}</label>`).join('')}</div></div><div><label>Día del mes</label><input id="pe_d" type="number" min="1" max="${dim}" value="${p.d}"><label>Estado</label><select id="pe_s">${['Borrador','Pendiente','Programada','Publicada'].map(s=>`<option ${s===p.s?'selected':''}>${s}</option>`).join('')}</select></div></div><div style="margin-top:10px"><button class="btn" onclick="pubSave()">💾 Guardar</button> <button class="btn g" onclick="pubDel()">✖ Eliminar</button> <button class="btn g" onclick="S.pe=null;V.redes()">Cancelar</button></div></div>`:'';
 let cells=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=>`<div class="wd">${d}</div>`).join('')+'<div class="dy em"></div>'.repeat(off);
 for(let d=1;d<=dim;d++){const ps=S.posts.map((q,i)=>[q,i]).filter(x=>x[0].d===d);cells+=`<div class="dy ${d===now.getDate()?'today':''}"><span class="dn">${d}</span>${ps.map(([q,i])=>`<button class="pc" style="background:${SC[q.s]||'#8b8b8b'};${ce?'':'cursor:default'}" title="${qa(q.t)} (${q.s})" ${ce?`onclick="S.pe=${i};V.redes()"`:''}>${q.r.map(x=>x.toUpperCase()).join('·')} ${esc(q.t)}</button>`).join('')}</div>`}
 const cal=`<div class="card" style="margin-top:12px"><h3>Calendario · ${MF[mo]} ${y}</h3><div class="mcal">${cells}</div><p class="note" style="margin-top:10px">${Object.keys(SC).map(k=>`<span class="lgd" style="background:${SC[k]}"></span>${k}`).join('')}${ce?' · Haz clic en una publicación para editarla o eliminarla.':''}</p></div>`;
 const form=`<div class="grid k2" style="margin-top:12px"><div class="card"><h3>Nueva publicación</h3><label>Texto</label><textarea id="pt" rows="3" placeholder="Escribe una vez, adapta a cada red"></textarea><label>Redes</label><div class="row"><label style="margin:0"><input type="checkbox" id="rfb" checked style="width:auto"> Facebook</label><label style="margin:0"><input type="checkbox" id="rig" checked style="width:auto"> Instagram</label><label style="margin:0"><input type="checkbox" id="rtt" style="width:auto"> TikTok</label></div><label>Día del mes</label><input id="pd" type="number" min="1" max="${dim}" value="15"><button class="btn" style="margin-top:10px" onclick="addPost()">Programar (pendiente de aprobación)</button></div>
 <div class="card"><h3>Sugerencias de contenido de valor</h3>${S.ideas.map((x,i)=>`<div class="sw"><span>${x}</span><button class="btn g" onclick="idea(${i})">Al calendario</button></div>`).join('')}</div></div>`;
 $('view').innerHTML=tabs+con+ed+cal+form};

/* ---------- WhatsApp y fidelización ---------- */
const owa2=V.wa;
V.wa=function(){owa2();const v=$('view'),f=v.firstElementChild;if(f&&f.classList.contains('k2'))f.remove();if(v.firstElementChild)v.firstElementChild.style.marginTop='0'};

/* ---------- Email marketing ---------- */
const oem2=V.email;
V.email=function(){oem2();const v=$('view');
 [...v.querySelectorAll(':scope>.card')].forEach(c=>{const h=(c.querySelector('h3')||{}).textContent;if(h==='Secuencias automáticas'||h==='Plantillas y listas')c.remove()});
 if(v.firstElementChild)v.firstElementChild.style.marginTop='0';
 const c=[...v.querySelectorAll(':scope>.card')].find(x=>(x.querySelector('h3')||{}).textContent===TM.cumple);if(!c)return;
 const L=bdays(),m=c.querySelector('.mood');if(m&&m.lastElementChild)m.lastElementChild.remove();
 const t=c.querySelector('table');
 [...t.rows].forEach((r,k)=>{if(!k){r.cells[6].textContent='Saludo';return}const x=L[k-1];if(!x)return;
  if(!x.em){r.cells[6].textContent='Sin correo';return}
  const fn=x.n.replace(/^(Prof\.|Lic\.) /,'').split(' ')[0],su='¡Feliz cumpleaños, '+fn+'! 🎂',bd='Hola '+fn+',\n\nTodo el equipo de '+S.col+' te desea un feliz cumpleaños. ¡Que tengas un día lleno de alegría!\n\nUn abrazo,\n'+S.col;
  r.cells[6].innerHTML=`<a class="btn" target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(x.em)}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(bd)}" style="text-decoration:none;display:inline-block">Enviar</a>`});
 const n=c.querySelector('p.note:last-child');if(n)n.textContent='Haz clic en «Enviar» para abrir Gmail en una pestaña nueva con el correo de saludo listo para redactar. '+TM.cnote};

/* ---------- Análisis y reportes ---------- */
const PAL=['#FC3030','#1f5bd8','#22a638','#b7791f','#8e44ad','#0e9aa7','#d6336c','#555555'];
const nod='<p class="note">Sin datos aún.</p>';
function hbar(it,fmt,c){if(!it.length)return nod;const mx=Math.max(...it.map(x=>x[1]),1),rh=26;return `<svg viewBox="0 0 520 ${it.length*rh+4}" style="width:100%;height:auto">${it.map((x,i)=>{const w=Math.max(2,x[1]/mx*270);return `<text x="0" y="${i*rh+17}" font-size="11" fill="currentColor">${esc(String(x[0]).slice(0,27))}</text><rect x="175" y="${i*rh+5}" width="${w}" height="16" rx="4" fill="${c||PAL[i%PAL.length]}"/><text x="${181+w}" y="${i*rh+17}" font-size="11" fill="currentColor">${fmt?fmt(x[1]):x[1]}</text>`}).join('')}</svg>`}
function donut(it){const t=it.reduce((a,x)=>a+x[1],0);if(!t)return nod;const R=40,C=2*Math.PI*R;let o=0;
 const arcs=it.map((x,i)=>{const l=x[1]/t*C,s=`<circle r="${R}" cx="60" cy="60" fill="none" stroke="${PAL[i%PAL.length]}" stroke-width="20" stroke-dasharray="${l} ${C-l}" stroke-dashoffset="${-o}" transform="rotate(-90 60 60)"/>`;o+=l;return s}).join('');
 return `<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><svg viewBox="0 0 120 120" width="130">${arcs}<text x="60" y="65" text-anchor="middle" font-size="18" font-weight="700" fill="currentColor">${t}</text></svg><div>${it.map((x,i)=>`<div style="font-size:12px"><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${PAL[i%PAL.length]};margin-right:6px"></i>${esc(x[0])}: <b>${x[1]}</b></div>`).join('')}</div></div>`}
function vcol(it){const mx=Math.max(...it.map(x=>x[1]),1),W=520,H=130,bw=W/it.length;return `<svg viewBox="0 0 ${W} ${H+22}" style="width:100%;height:auto">${it.map((x,i)=>{const h=x[1]/mx*(H-20);return `<rect x="${i*bw+6}" y="${H-h}" width="${bw-12}" height="${h}" rx="4" fill="var(--red)"/><text x="${i*bw+bw/2}" y="${H-h-4}" text-anchor="middle" font-size="10" fill="currentColor">${x[1]||''}</text><text x="${i*bw+bw/2}" y="${H+14}" text-anchor="middle" font-size="10" fill="currentColor">${x[0]}</text>`}).join('')}</svg>`}
const sec=(t,k,ch)=>`<div class="card rsec" style="margin-top:12px"><h3>${t}</h3><div class="mood">${k.map(x=>`<div><b>${x[1]}</b><span class="note">${x[0]}</span></div>`).join('')}</div><div class="grid k2">${ch.map(c=>`<div class="chb"><p class="note" style="margin:0 0 4px"><b>${c[0]}</b></p><div class="cv">${c[1]}</div></div>`).join('')}</div></div>`;
const cnt=(arr,f)=>{const o={};arr.forEach(x=>{const k=f(x);o[k]=(o[k]||0)+1});return Object.entries(o)};
window.printRep=function(){try{window.print()}catch(e){toast('Usa Ctrl+P y elige «Guardar como PDF».')}};
V.analitica=function(){
 const inv=inv0(),m=mat0(),leads=S.camp.reduce((a,c)=>a+c.l,0),ing=m*ingAlumno(),roi=inv?Math.round((ing-inv)/inv*100):0,[ok]=mt(),tot=totMeta(),cm=curM(),mc=monthCount(null,cm);
 const Lg=jget('ndm:log:'+S.col,[]),mem0=mem(),ob=S.inst,atl=S.atl.filter(p=>p.i===ob),hoy=new Date().toLocaleDateString('es-PE');
 const objs=[['Meta de matrícula',pct(ok,tot)],['Leads calificados',pct(leads,300)],['Satisfacción',Math.round(sat()*20)],['ROI (vs 300%)',pct(roi,300)]];
 const dist=cnt(S.fam,f=>f.d||'Sin dato').sort((a,b)=>b[1]-a[1]).slice(0,8);
 const mesesM=MF.map((x,i)=>[x.slice(0,3),monthCount(null,i)]),evM=MF.map((x,i)=>[x.slice(0,3),S.act.filter(a=>+a.f.slice(0,2)===i+1).length]);
 const redes=[['Facebook',S.posts.filter(p=>p.r.includes('fb')).length],['Instagram',S.posts.filter(p=>p.r.includes('ig')).length],['TikTok',S.posts.filter(p=>p.r.includes('tt')).length]];
 const bd=bdays(),usr=ACC.map(a=>[a.u,Lg.filter(x=>x.u===a.u).length]);
 const S1=[
 sec('Dashboard Ejecutivo',[['Matriculados · '+MF[cm],mc],['Leads',leads],['Inversión','S/ '+inv.toLocaleString()],['ROI actual',roi+'%']],[['KPI de gestión (%)',hbar([['Conversión lead → matrícula',pct(m,leads)],['Satisfacción de familias',Math.round(sat()*20)],['Avance de meta anual',pct(ok,tot)],['Retención',S.rend[0]?S.rend[0][1]:0]],v=>v+'%')],['Matriculados por mes',vcol(mesesM)]]),
 sec('Planificación Estratégica de Marketing',[['Meta de matrícula',ok+'/'+tot],['Eventos',S.act.length],['Meses del plan',S.plan.length]],[['Avance de objetivos (%)',hbar(objs,v=>v+'%')],['Eventos por mes',vcol(evM)]]),
 sec('Inteligencia de Mercado y Competencia',[['Competidores directos',S.comp.length],['Nuestra pensión','S/ '+S.cfg.pension]],[['Pensión comparada (S/)',hbar([[S.col,S.cfg.pension],...S.comp.map(c=>[c.n,c.p])],v=>'S/ '+v)]]),
 sec('Finanzas de Marketing, Campañas y ROI',[['Inversión','S/ '+inv.toLocaleString()],['Costo por lead','S/ '+(leads?(inv/leads).toFixed(2):'—')],['Costo por matrícula','S/ '+(m?(inv/m).toFixed(0):'—')],['ROI general',roi+'%']],[['Gasto por campaña (S/)',hbar(S.camp.map(c=>[c.n,c.g]),v=>'S/ '+v)],['ROI por campaña (%)',hbar(S.camp.map(c=>[c.n,roiCamp(c).roi]),v=>v+'%','#22a638')],['Costo por lead (S/)',hbar(S.camp.map(c=>[c.n,c.l?+(c.g/c.l).toFixed(2):0]),v=>'S/ '+v,'#b7791f')],['Leads vs matrículas',hbar(S.camp.flatMap(c=>[[c.n.slice(0,16)+' · leads',c.l],[c.n.slice(0,16)+' · matr.',c.m]]))]]),
 sec('CRM, Embudo Comercial y Matrículas',[[TM.fams.replace(/^./,x=>x.toUpperCase()),S.fam.length],['Matriculados',mat().length],['Conversión',pct(mat().length,S.fam.length)+'%']],[['Embudo por etapa',hbar(S.etapas.map((e,i)=>[e,S.fam.filter(f=>f.e===i).length]))],['Origen',donut(cnt(S.fam,f=>f.o))],['Meta por '+TM.nivel+' (%)',hbar(S.metas.map(x=>[x[0],pct(x[2],x[1])]),v=>v+'%','#1f5bd8')]]),
 sec('Biblioteca Multimedia',[['Google Drive',S.gcon.drive?'Conectado':'Sin conectar'],['Google Fotos',S.gcon.fotos?'Conectado':'Sin conectar'],['Vínculos',S.glinks.length]],[['Vínculos por origen',donut(cnt(S.glinks,x=>x.t==='Drive'?'Drive':'Fotos'))]]),
 sec('Planificador de Redes Sociales',[['Publicaciones',S.posts.length],['Redes conectadas',Object.values(S.rcon).filter(Boolean).length+'/3']],[['Publicaciones por red',donut(redes)],['Publicaciones por estado',hbar(cnt(S.posts,p=>p.s),null,'#8e44ad')]]),
 sec('WhatsApp y Fidelización',[['Satisfacción',sat().toFixed(1)+'/5'],['En alerta',S.animo.filter(a=>a[1]<=2).length]],[['Estado de ánimo',hbar([5,4,3,2,1].map(v=>[EMO[v][1],S.animo.filter(a=>a[1]===v).length]))]]),
 sec('Email Marketing',[['Contactadas',S.fam.filter(f=>f.ce).length],['Abrieron',S.fam.filter(f=>f.ce&&['Abierto','Clic'].includes(f.ce[1])).length],['Cumpleaños en 30 días',bd.filter(x=>x.dias<=30).length]],[['Estado de los correos',donut(cnt(S.fam,f=>f.ce?f.ce[1]:'Sin envío'))]]),
 sec('ATL y Publicidad Exterior',[['Puntos',atl.length],['Instalados',atl.filter(p=>p.est==='Instalada').length]],[['Puntos por estado',donut(cnt(atl,p=>p.est))],['Puntos por formato',hbar(cnt(atl,p=>p.fmt),null,'#0e9aa7')]]),
 sec('Encuestas y Mejoras Institucionales',[['Respuestas',S.enc.reduce((a,e)=>a+e[1],0)],['Mejoras',S.mej.length],['Hechas',S.mej.filter(x=>x[3]==='Hecha').length]],[['Respuestas por encuesta',hbar(S.enc.map(e=>[e[0],e[1]]),null,'#d6336c')],['Mejoras por estado',donut(cnt(S.mej,x=>x[3]))]]),
 sec('Asistente de Inteligencia Artificial',[['Mensajes en memoria',mem0.chat.length],['Plantillas guardadas',mem0.tpl.length]],[['Uso',hbar([['Mensajes',mem0.chat.length],['Plantillas',mem0.tpl.length]],null,'#555555')]]),
 sec('Configuración y Usuarios',[['Cuentas',ACC.length],['Pueden editar',ACC.filter(a=>a.ed).length]],[['Módulos habilitados por usuario',hbar(ACC.map(a=>[a.u,(PERM[a.u]||[]).length]),null,'#1f5bd8')]]),
 sec('Rendimiento Institucional',[['Avance de matrícula',pct(ok,tot)+'%'],['Vacantes por cubrir',Math.max(0,tot-ok)],['Familias en riesgo',S.animo.filter(a=>a[1]<=2).length]],[['Indicadores institucionales (%)',hbar(S.rend.map(r=>[r[0],r[1]]),v=>v+'%','#22a638')],['Actividad por usuario',hbar(usr,null,'#b7791f')]])];
 $('view').innerHTML=`<div class="noprint" style="margin-bottom:12px"><button class="btn" onclick="printRep()">⬇ Descargar PDF</button> <span class="note">Se abrirá el cuadro de impresión: elige «Guardar como PDF».</span></div>
 <div class="card"><h3>Reporte general · ${S.col} · ${hoy}</h3><div class="grid k4"><div class="card kpi"><span>Costo por lead</span><b>S/ ${leads?(inv/leads).toFixed(2):'—'}</b></div><div class="card kpi"><span>Costo por matrícula</span><b>S/ ${m?(inv/m).toFixed(0):'—'}</b></div><div class="card kpi"><span>Ingreso por alumno</span><b>S/ ${ingAlumno().toLocaleString()}</b></div><div class="card kpi"><span>ROI general</span><b>${roi}%</b></div></div><p class="note">ROI = (ingresos − inversión) ÷ inversión × 100. Modo actual: ${S.cfg.modo==='pens'?'matrícula + pensiones proyectadas':'solo matrícula'}.</p></div>${S1.join('')}`};

/* ===== Actualización noviembre: dashboard, plan, mercado, finanzas, redes, email, encuestas, reportes ===== */
S.etapas[2]='Visita/entrevista';
K.enc='Encuestas';K.mej='Mejoras';
const TEND=[['Más familias buscan colegio por redes sociales','Alta','ok'],['Sensibilidad al precio en matrícula','Media','wn'],['Zonas en crecimiento sin oferta cercana','Oportunidad','ok'],['Demanda de inglés y tecnología desde inicial','Alta','ok'],['Los padres comparan colegios con reseñas en Google','Alta','ok'],['El video corto (Reels y TikTok) genera más leads','Alta','ok'],['Crece la preferencia por horarios extendidos','Media','wn'],['Los referidos entre familias son el canal más barato','Oportunidad','ok'],['Competidores aumentan su inversión en anuncios','Amenaza','wn'],['Familias esperan respuesta por WhatsApp en minutos','Alta','ok']];
DBS.forEach(d=>{d.tend=cp(TEND);d.own={d:'—',f:'—'}});DK.push('tend','own');Object.assign(S,DBS[S.inst||0]);

/* ---------- Dashboard ---------- */
const EXT=['Revisar métricas semanales de redes','Actualizar la base de datos de familias','Confirmar asistencia a próximos eventos','Publicar contenido de valor en Instagram','Enviar boletín mensual por correo','Revisar presupuesto de campañas','Contactar familias referidas','Revisar encuestas de satisfacción','Coordinar fotos y video del próximo evento','Verificar puntos de ATL por instalar','Responder comentarios en redes','Preparar reporte mensual de resultados','Revisar competidores de la zona','Hacer seguimiento a familias que visitaron'];
function fillTasks(){S.tasks=S.tasks||[];S.dn=S.dn||[];let g=0;while(S.tasks.length<10){const n=[...pool(),...EXT].find(x=>!S.tasks.includes(x)&&!S.dn.includes(x));if(n)S.tasks.push(n);else if(S.dn.length)S.dn=[];else S.tasks.push('Tarea de seguimiento '+(++g))}}
window.tkDone=function(i){const d=S.tasks.splice(i,1)[0];S.dn=(S.dn||[]).concat(d).slice(-20);logEv('t','Completó: '+d);fillTasks();V.dashboard()};
const odb4=V.dashboard;
V.dashboard=function(){odb4();fillTasks();const v=$('view'),k=v.querySelectorAll('.kpi'),inv=inv0(),m=mat0(),leads=S.camp.reduce((a,c)=>a+c.l,0),ing=m*ingAlumno(),[ok]=mt(),tot=totMeta(),mc=monthCount(null,curM()),mm=S.metas.reduce((a,x)=>a+mmeta(x),0);
 k[1].querySelectorAll('span')[1].textContent='Costo por lead: S/ '+(leads?(inv/leads).toFixed(0):0);
 k[3].querySelector('b').textContent=(inv?Math.round((ing-inv)/inv*100):0)+'%';k[3].querySelectorAll('span')[1].textContent='Costo por matrícula: S/ '+(m?(inv/m).toFixed(0):0);
 const card=t=>[...v.querySelectorAll('.card')].find(x=>((x.querySelector('h3')||{}).textContent||'').startsWith(t));
 const kc=card('KPI');if(kc){const it=[['Conversión lead → matrícula',pct(m,leads)],['Familias contactadas por correo',pct(S.fam.filter(f=>f.ce).length,S.fam.length)],['Avance de la meta anual',pct(ok,tot)],['Avance de la meta del mes',pct(mc,mm)]];
  kc.innerHTML='<h3>KPI</h3>'+it.map(r=>`<div class="row"><span style="width:190px">${r[0]}</span><div class="bar"><i style="width:${Math.min(100,r[1])}%"></i></div><b>${r[1]}%</b></div>`).join('')}
 const tc=card('Tareas pendientes');if(tc)tc.innerHTML='<h3>Tareas pendientes</h3>'+S.tasks.map((t,i)=>`<div class="sw"><span><i class="ck" title="Marcar como hecha" onclick="tkDone(${i})"></i>${esc(t)}</span></div>`).join('');
 const cc=card('Campañas de Meta Ads');if(cc){const A=S.camp.filter(c=>c.s==='Activa');cc.innerHTML='<h3>Campañas de Meta Ads y TikTok Ads activas</h3>'+(A.length?`<table><tr><th>Campaña</th><th>Canal</th><th>Gasto</th><th>Leads</th></tr>${A.map(c=>`<tr><td>${esc(c.n)}</td><td>${chTag(c.c)}</td><td>S/ ${c.g}</td><td>${c.l}</td></tr>`).join('')}</table>`:'<p class="note">No hay campañas activas.</p>')}
 if(kc&&cc&&kc.parentNode.classList.contains('k2')){const col=document.createElement('div');kc.parentNode.insertBefore(col,kc);col.append(kc,cc);cc.style.marginTop='12px'}
 v.querySelectorAll('p.note').forEach(p=>{if(/Datos de ejemplo/.test(p.textContent))p.textContent='Base de datos de la Institución.'})};

/* ---------- Plan anual: lápiz en año y meta ---------- */
const opb=V.planBase;
V.planBase=function(){opb();const k=document.querySelectorAll('#view .kpi'),ce=CE(),yr=S.anio||new Date().getFullYear(),[ok]=mt(),tot=totMeta(),ek=n=>S.ed&&S.ed[0]==='kpi'&&S.ed[1]===n,
 pb=n=>!ce?'':`<span style="position:absolute;top:8px;right:8px">${ek(n)?`<button class="btn" title="Guardar" onclick="kpiSave('${n}')">💾</button>`:`<button class="btn g" title="Editar" onclick="S.ed=['kpi','${n}'];R()">✏️</button>`}</span>`;
 k[0].style.position=k[1].style.position='relative';
 k[0].innerHTML=`<span>Año del plan</span>${ek('a')?`<input id="k_a" type="number" value="${yr}">`:`<b>${yr}</b>`}${pb('a')}`;
 k[1].innerHTML=`<span>Meta de matrícula (conteo)</span>${ek('m')?`<input id="k_m" type="number" min="1" value="${tot}">`:`<b>${ok}/${tot}</b>`}${pb('m')}`};
window.kpiSave=function(n){if(n==='a')S.anio=+$('k_a').value||S.anio;else S.metaTot=+$('k_m').value||S.metaTot;S.ed=null;logEv('c','Editó el plan anual');R()};

/* ---------- Inteligencia de mercado ---------- */
window.ownSave=function(){S.cfg.matricula=+$('o_m').value||0;S.cfg.pension=+$('o_p').value||0;S.own={d:$('o_d').value.trim()||'—',f:$('o_f').value.trim()||'—'};S.ed=null;logEv('c','Editó los datos de la propia institución');R()};
const oin3=V.intel;
V.intel=function(){oin3();const v=$('view'),t=v.querySelector('table'),ce=CE(),ed=isE('own',0);t.rows[0].cells[1].textContent='Distrito / Urbanización';
 if(ce){const c=t.rows[1].cells,o=S.own||{d:'—',f:'—'};
  c[1].innerHTML=ed?`<input id="o_d" value="${qa(o.d)}">`:esc(o.d);c[2].innerHTML=ed?`<input id="o_m" type="number" value="${S.cfg.matricula}">`:'S/ '+S.cfg.matricula;c[3].innerHTML=ed?`<input id="o_p" type="number" value="${S.cfg.pension}">`:'S/ '+S.cfg.pension;c[5].innerHTML=ed?`<input id="o_f" value="${qa(o.f)}">`:esc(o.f);
  c[6].innerHTML=ed?'<button class="btn" title="Guardar" onclick="ownSave()">💾</button>':`<button class="btn g" title="Editar" onclick="S.ed=['own',0];R()">✏️</button>`}
 const dc=[...v.querySelectorAll('.card')].find(x=>((x.querySelector('h3')||{}).textContent||'').startsWith('Demanda por distrito'));if(dc)dc.remove();
 const tc=[...v.querySelectorAll('.card')].find(x=>(x.querySelector('h3')||{}).textContent==='Tendencias y oportunidades');
 if(tc)tc.innerHTML='<h3>Tendencias y oportunidades (5)</h3>'+(S.tend||TEND).slice(0,5).map(x=>`<div class="sw"><span>${esc(x[0])}</span><span class="tag ${x[2]}">${x[1]}</span></div>`).join('')+'<p class="note">Base de datos de la Institución; se completa con investigación propia.</p>'};

/* ---------- Finanzas: costo por lead editable ---------- */
const oca3=V.camp;
V.camp=function(){oca3();const t=$('view').querySelector('table');if(S.ed&&S.ed[0]==='camp'){const x=S.camp[S.ed[1]],c=t.rows[S.ed[1]+1].cells[5],v=x.l?+(x.g/x.l).toFixed(2):0;c.innerHTML=`<input id="e_cp" type="number" step="0.01" value="${v}" data-o="${v}">`}};
const oes=edSave;
edSave=window.edSave=function(k,i){let cp=null;if(k==='camp'){const e=$('e_cp');if(e&&+e.value!==+e.dataset.o)cp=+e.value}oes(k,i);if(k==='camp'){const c=S.camp[i];delete c.cp;if(cp!==null&&c.l>0){c.g=Math.round(cp*c.l*100)/100;R()}}};

/* ---------- Redes: nueva publicación primero, calendario seleccionable ---------- */
const ore3=V.redes;
V.redes=function(){ore3();if(S.rtab==='feed')return;const v=$('view'),k=[...v.children],ce=CE();
 const fg=k[k.length-1],NT=[['fb','Facebook','https://www.facebook.com/'],['ig','Instagram','https://www.instagram.com/accounts/login/'],['tt','TikTok','https://www.tiktok.com/login']];
 const cn=document.createElement('div');cn.className='card';cn.innerHTML='<h3>Conectar redes sociales</h3>'+NT.map(n=>S.rcon[n[0]]?`<button class="btn g" style="width:100%;margin-bottom:8px" onclick="rcon('${n[0]}')">✓ ${n[1]} conectado</button>`:`<a class="btn" target="_blank" rel="noopener" href="${n[2]}" onclick="rcon('${n[0]}')" style="display:block;text-align:center;text-decoration:none;margin-bottom:8px">Conectar ${n[1]}</a>`).join('');
 const ng=document.createElement('div');ng.className='grid';ng.style.cssText='grid-template-columns:repeat(auto-fit,minmax(270px,1fr));margin-top:12px';ng.append(...fg.children,cn);k[1].remove();fg.remove();v.insertBefore(ng,k[0].nextSibling);
 if(!ce)return;document.querySelectorAll('#view .mcal .dy:not(.em)').forEach(d=>{d.style.cursor='pointer';d.title='Clic para crear una publicación este día';d.onclick=e=>{if(e.target.closest('.pc'))return;const n=+d.querySelector('.dn').textContent;document.querySelectorAll('.dy.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');S.dsel=n;$('pd').value=n;$('pt').focus();$('pt').scrollIntoView({behavior:'smooth',block:'center'});toast('Día '+n+' seleccionado: escribe la nueva publicación')}})};

/* ---------- Email marketing: contenido de correo y contacto ---------- */
const NX=['Bienvenida y propuesta educativa','Información de admisión y requisitos','Invitación a visita / entrevista','Seguimiento tras la entrevista','Recordatorio de matrícula','Boletín mensual para familias'];
const oem3=V.email;
V.email=function(){oem3();const c=[...$('view').querySelectorAll(':scope>.card')].find(x=>(x.querySelector('h3')||{}).textContent===TM.contactadas);if(!c)return;const t=c.querySelector('table');
 t.rows[0].cells[2].textContent='Contenido de correo';t.rows[0].cells[3].textContent='Contacto';
 [...t.rows].forEach((r,ri)=>{if(!ri)return;const f=S.fam[ri-1];if(!f)return;const e=Math.min(5,f.e);r.cells[2].innerHTML=`<b>${NX[e]}</b><br><span class="note">Siguiente correo</span>`;
  r.cells[3].innerHTML=f.em?`<a class="btn" target="_blank" rel="noopener" style="text-decoration:none;display:inline-block" href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(f.em)}&su=${encodeURIComponent(NX[e]+' · '+S.col)}&body=${encodeURIComponent('Hola, '+f.n+',\n\nDesde '+S.col+' te escribimos para compartirte: '+NX[e].toLowerCase()+'.\n\nQuedamos atentos a tus consultas.\n\nSaludos cordiales,\n'+S.col)}">Enviar</a>`:'<span class="note">Sin correo</span>'});
 const n=c.querySelector('p.note:last-child');if(n)n.textContent='El contenido cambia según la etapa del embudo. «Enviar» abre Gmail con el correo listo para redactar.'};

/* ---------- Encuestas y mejoras con Google Forms ---------- */
window.addEnc=function(){const n=$('en').value.trim();if(!n){toast('Escribe el nombre de la encuesta.');return}let u=$('eu').value.trim();if(u&&!/^https?:/i.test(u))u='https://'+u;S.enc.push([n,0,'—','Activa',u]);logEv('c','Creó una encuesta');V.encuestas()};
window.cpLink=u=>{try{navigator.clipboard.writeText(u);toast('Enlace copiado')}catch(e){toast(u)}};
V.encuestas=function(){const ce=CE(),n=S.animo.length,pr=S.animo.filter(a=>a[1]===5).length,de=S.animo.filter(a=>a[1]<=3).length,nps=n?Math.round((pr-de)/n*100):0,tr=S.enc.reduce((a,e)=>a+e[1],0),lo=S.animo.filter(a=>a[1]<=2).length,ST=['Pendiente','En curso','Hecha'];
 const gm=e=>'https://mail.google.com/mail/?view=cm&fs=1&su='+encodeURIComponent('Encuesta: '+e[0])+'&body='+encodeURIComponent('Hola,\n\nTe invitamos a responder la encuesta «'+e[0]+'» de '+S.col+':\n'+e[4]+'\n\n¡Gracias por tu opinión!');
 const lk=e=>e[4]?`<a class="btn" target="_blank" rel="noopener" href="${qa(e[4])}" style="text-decoration:none">Abrir</a> <button class="btn g" onclick="cpLink('${qa(e[4])}')">Copiar</button> <a class="btn g" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(e[0]+': '+e[4])}">WhatsApp</a> <a class="btn g" target="_blank" rel="noopener" href="${qa(gm(e))}">Correo</a>`:'<span class="note">Sin vincular</span>';
 const rows=S.enc.map((e,i)=>{const x=isE('enc',i);return `<tr><td>${x?ec('enc',i,0):`<b>${esc(e[0])}</b>`}</td><td>${x?ec('enc',i,1,'number'):e[1]}</td><td>${x?ec('enc',i,2):e[2]}</td><td>${x?ec('enc',i,3,0,['Activa','Cerrada']):`<span class="tag ${e[3]==='Activa'?'ok':''}">${e[3]}</span>`}</td><td>${x?`<input id="e_4" value="${qa(e[4]||'')}" placeholder="https://forms.gle/...">`:lk(e)}</td>${ce?`<td style="white-space:nowrap">${pen('enc',i)}</td>`:''}</tr>`}).join('');
 const mj=S.mej.map((m,i)=>{const x=isE('mej',i);return `<tr><td>${x?ec('mej',i,0):esc(m[0])}</td><td>${x?ec('mej',i,1):esc(m[1])}</td><td>${x?ec('mej',i,2):esc(m[2])}</td><td>${x?ec('mej',i,3,0,ST):`<button class="btn g" onclick="cyMej(${i})"><span class="tag ${ES[m[3]]}">${m[3]}</span></button>`}</td>${ce?`<td style="white-space:nowrap">${pen('mej',i)}</td>`:''}</tr>`}).join('');
 $('view').innerHTML=`<div class="grid k4"><div class="card kpi"><span>Satisfacción promedio</span><b>${sat().toFixed(1).replace('.',',')}/5</b></div><div class="card kpi"><span>Respuestas totales</span><b>${tr}</b></div><div class="card kpi"><span>NPS de las familias</span><b>${nps}</b></div><div class="card kpi"><span>En alerta</span><b>${lo}</b></div></div>
 <div class="card scroll" style="margin-top:12px"><h3>Encuestas conectadas con Google Forms</h3><table><tr><th>Encuesta</th><th>Respuestas</th><th>Nota</th><th>Estado</th><th>Google Forms</th>${ce?'<th>Edición</th>':''}</tr>${rows||'<tr><td colspan="6" class="note">Aún no hay encuestas.</td></tr>'}</table><p class="note">Pega el enlace del formulario para abrirlo, copiarlo y compartirlo por WhatsApp o Gmail. Actualiza las respuestas y la nota con el lápiz ✏️.</p></div>
 ${ce?`<div class="grid k2" style="margin-top:12px"><div class="card"><h3>Nueva encuesta</h3><label>Nombre</label><input id="en" placeholder="Ej.: Satisfacción del trimestre"><label>Enlace de Google Forms (opcional)</label><input id="eu" placeholder="https://forms.gle/..."><button class="btn" style="margin-top:10px" onclick="addEnc()">Agregar</button> <a class="btn g" target="_blank" rel="noopener" href="https://forms.new" style="text-decoration:none;display:inline-block;margin-top:10px">Crear en Google Forms</a></div></div>`:''}
 <div class="grid k2" style="margin-top:12px"><div class="card"><h3>Lo que más preocupa</h3>${S.animo.filter(a=>a[1]<=3).map(a=>`<div class="sw"><span>${EMO[a[1]][0]} ${esc(a[0])}: ${esc(a[2])}</span></div>`).join('')||'<p class="note">Sin preocupaciones registradas.</p>'}</div></div>
 <div class="card scroll" style="margin-top:12px"><h3>Plan de mejoras institucionales</h3><table><tr><th>Mejora</th><th>Área</th><th>Responsable</th><th>Estado</th>${ce?'<th>Edición</th>':''}</tr>${mj}</table>${ce?`<div class="grid k2"><div><label>Nueva mejora</label><input id="mj1"><label>Área</label><input id="mj2"></div><div><label>Responsable</label><input id="mj3"></div></div><button class="btn" style="margin-top:10px" onclick="addMej()">Agregar mejora</button>`:''}</div>`};

/* ---------- Reportes: rendimiento = solo usuarios ---------- */
const orp=V.analitica;
V.analitica=function(){orp();const Lg=jget('ndm:log:'+S.col,[]),T=jget('ndm:time:'+S.col,{}),us=ACC.map(a=>a.u),by=y=>us.map(u=>[u,Lg.filter(x=>x.u===u&&x.y===y).length]),tm=us.map(u=>[u,Math.round((T[u]||0)/60)]),sm=a=>a.reduce((s,x)=>s+x[1],0);
 const h=[...document.querySelectorAll('#view .rsec')].find(x=>x.querySelector('h3').textContent==='Rendimiento Institucional');
 if(h)h.outerHTML=sec('Rendimiento de usuarios',[['Sesiones',sm(by('l'))],['Cambios',sm(by('c'))],['Tareas completadas',sm(by('t'))],['Tiempo total (min)',sm(tm)]],[['Sesiones por usuario',hbar(by('l'),null,'#1f5bd8')],['Cambios por usuario',hbar(by('c'),null,'#b7791f')],['Tareas completadas por usuario',hbar(by('t'),null,'#22a638')],['Tiempo en la plataforma (min)',hbar(tm,v=>v+' min','#8e44ad')]])};


K.metas='Metas';
const ocrm2=V.crm;
V.crm=function(){ocrm2();if(S.tab!=='mat')return;const sm=S.mesSel==null?curM():S.mesSel,ce=CE(),c=[...$('view').querySelectorAll('.card')].find(x=>((x.querySelector('h3')||{}).textContent||'').startsWith('Meta de matr'));if(!c)return;
 S.metas.forEach(m=>{if(m[3]===undefined)m[3]=mmeta(m)});
 const tm=S.metas.reduce((a,x)=>a+mmeta(x),0),ta=S.metas.reduce((a,x)=>a+x[1],0),ok=S.metas.reduce((a,x)=>a+x[2],0);
 c.innerHTML=`<h3>Meta de matrículas por ${TM.nivel}</h3><div class="row"><span style="width:auto">Mes</span><select style="width:auto" onchange="S.mesSel=+this.value;V.crm()">${MF.map((x,i)=>`<option value="${i}" ${i===sm?'selected':''}>${x}</option>`).join('')}</select></div><table><tr><th>${TM.nivel[0].toUpperCase()+TM.nivel.slice(1)}</th><th>Meta de ${MF[sm]}</th><th>Matriculados en ${MF[sm]}</th><th>Meta anual</th><th>Matriculados (acumulado)</th><th>Avance</th>${ce?'<th>Edición</th>':''}</tr>${S.metas.map((m,i)=>{const e=isE('metas',i);return `<tr><td><b>${esc(m[0])}</b></td><td>${e?ec('metas',i,3,'number'):mmeta(m)}</td><td><b>${monthCount(i,sm)}/${mmeta(m)}</b></td><td>${e?ec('metas',i,1,'number'):m[1]}</td><td>${m[2]}/${m[1]}</td><td style="min-width:120px"><div class="bar"><i style="width:${Math.min(100,pct(m[2],m[1]))}%"></i></div></td>${ce?`<td>${pen('metas',i,1)}</td>`:''}</tr>`}).join('')}<tr><td><b>Total</b></td><td><b>${tm}</b></td><td><b>${monthCount(null,sm)}</b></td><td><b>${ta}</b></td><td><b>${ok}</b></td><td></td>${ce?'<td></td>':''}</tr></table><p class="note">Cada vez que una familia llega a «Matriculado» en el embudo, el conteo del nivel y del mes suma automáticamente. Edita las metas con el lápiz.</p>`};
if(S.v==='analitica')V.analitica();
})();
