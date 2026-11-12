const TH=[{k:'demo'},{k:'ndm',a:'#111111',a2:'#333333'},{k:'x',a:'#b7791f',hue:37},{k:'mda',a:'#1b8a2f',a2:'#14702a',hue:125},{k:'cat',a:'#1f5bd8',a2:'#1a4cb8',hue:225},{k:'x',a:'#0e9aa7',hue:185},{k:'x',a:'#d6336c',hue:340}];
const DL=$('llogo').innerHTML,DS=$('slogo').innerHTML;
const LG={1:NDM_LOGO,3:MDA_LOGO,4:CAT_LOGO};
function logoOf(i,big){if(i===0)return big?DL:DS;if(LG[i])return '<img src="'+LG[i]+'" alt="'+INST[i]+'" style="width:100%;max-width:'+(big?290:210)+'px;display:block;margin:0 auto">';return '<div class="logo" style="font-size:'+(big?26:17)+'px;color:var(--red);padding:0">'+INST[i]+'</div>'}
function applyTheme(i){const t=TH[i],r=document.documentElement.style;document.body.dataset.th=t.k;
 if(i===0){r.removeProperty('--red');r.removeProperty('--red2');r.removeProperty('--hue')}else{r.setProperty('--red',t.a);r.setProperty('--red2',t.a2||t.a);r.setProperty('--hue',(t.hue||0)+'deg')}
 $('llogo').innerHTML=logoOf(i,true);$('slogo').innerHTML=logoOf(i,false);
 $('schwrap').style.display=i===0?'block':'none';$('ndmlink').style.display=i===0?'none':'block';Object.assign(S,DBS[i]);S.inst=i;S.atlF=null;S.atlSel=i;TM=i===1?TM1:TM0}
function pickInst(){applyTheme($('sch').selectedIndex)}
function backDemo(){$('sch').selectedIndex=0;applyTheme(0)}

const DK=['fam','animo','camp','posts','cum','act','metas','seg','users','cfg','links','plan','dom'];
const DBS=[Object.fromEntries(DK.map(k=>[k,S[k]]))];
const mkDB=o=>Object.assign({users:[['Dirección','Director/a'],['Equipo de marketing','Personal de marketing']],cfg:{matricula:300,pension:450,meses:10,anios:1,modo:'pens'},links:{fb:'',ig:'',tt:''},plan:S.plan.map(x=>x.slice()),dom:'colegio.edu.pe',seg:S.seg.map(x=>x.slice()),metas:[['Inicial',30,0],['Primaria',40,0],['Secundaria',30,0]]},o);
const P2=(a,b)=>[{d:3,t:a,r:['ig','fb'],s:'Programada'},{d:12,t:b,r:['fb','tt'],s:'Pendiente'}];
DBS[1]=mkDB({
 fam:[{n:'Camila Rojas Vega',em:'camila.rojas@gmail.com',tel:'987 111 222',ce:['Bienvenida','Clic'],g:'Marketing Digital',d:'San Isidro',o:'Instagram',e:4},{n:'Diego Salazar Pinto',em:'diego.salazar@hotmail.com',tel:'986 333 444',ce:['Seguimiento tras visita','Abierto'],g:'Diseño de Contenidos',d:'Miraflores',o:'Facebook',e:2},{n:'Lucía Fernández Cruz',em:'lucia.fernandez@gmail.com',tel:'985 555 666',ce:['Bienvenida','Abierto'],g:'Gestión de Redes Sociales',d:'Surco',o:'TikTok',e:1}],
 animo:[['Camila Rojas Vega',5,'Muy contenta con las clases'],['Diego Salazar Pinto',3,'Pide más horarios'],['Lucía Fernández Cruz',4,'Interesada en el próximo ciclo']],
 camp:[{n:'Matrículas Marketing Digital – Instagram',c:'Instagram',g:900,l:14,m:1,s:'Activa'},{n:'Taller gratuito – Facebook',c:'Facebook',g:500,l:9,m:0,s:'Activa'}],
 posts:P2('Nuevo ciclo de Marketing Digital','Casos de éxito de nuestros alumnos'),
 cum:[['Prof. Andrea Vidal','Docente','Marketing','11-18',1],['Prof. Marco Neyra','Docente','Diseño','12-02',0],['Camila Rojas Vega','Alumna','Camila Rojas Vega','11-14',1]],
 act:[{f:'11-22',n:'Taller gratuito de Marketing Digital',q:'Taller práctico para interesados',i:'Proyector, laptops, material impreso',doc:['Fotos','Live']},{f:'12-15',n:'Clausura del ciclo y entrega de certificados',q:'Ceremonia de certificación',i:'Certificados, sonido, backing',doc:['Fotos','Video','Live']}],
 metas:[['Marketing Digital',20,1],['Diseño de Contenidos',15,0],['Redes Sociales',15,0]],
 seg:[['Jóvenes que buscan su primera carrera','18–25 años','Valoran certificación y empleabilidad','Instagram + TikTok'],['Profesionales que quieren actualizarse','26–40 años','Buscan horarios flexibles y casos reales','Facebook + correo'],['Emprendedores','25–45 años','Quieren aplicar el marketing a su negocio','Instagram + WhatsApp']],
 users:[['Dirección NDM','Director/a'],['Equipo de marketing NDM','Personal de marketing'],['Admisiones NDM','Admisiones']],
 cfg:{matricula:200,pension:350,meses:6,anios:1,modo:'pens'},dom:'ndminstitute.edu.pe'});
[['Pérez Gómez','Ramírez Soto','Chávez Luna'],['Mendoza Ríos','Castro Vera','Flores Díaz'],['Gutiérrez Paz','Silva Romero','Ortiz Mejía'],['Aguilar Torres','Paredes Gil','Navarro Ruiz'],['Campos Rivas','Vega Núñez','Delgado Prado']].forEach((N,k)=>{
 const sl=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ /g,'.'),E=[4,2,1],G=['1.º primaria','Inicial 4 años','3.º secundaria'],A=[5,3,4],O=['Instagram','Facebook','Referido'];
 DBS[k+2]=mkDB({fam:N.map((x,j)=>({n:'Familia '+x,em:sl(x)+'@gmail.com',tel:'98'+(k+1)+' '+(100+j*111)+' '+(200+k*55),ce:['Bienvenida',j?'Abierto':'Clic'],g:G[j],d:['Lima','Surco','San Miguel'][j],o:O[j],e:E[j]})),
  animo:N.map((x,j)=>['Familia '+x,A[j],['Muy satisfechos','Piden más comunicación','Contentos con la acogida'][j]]),
  camp:[{n:'Admisión – Instagram',c:'Instagram',g:600,l:20,m:2,s:'Activa'}],posts:P2('Admisión abierta','Un día en nuestra institución'),
  cum:[['Prof. Rosa Díaz','Docente','Primaria','11-20',1],['Prof. Jorge Ávila','Docente','Secundaria','12-05',0],['Sofía '+N[0].split(' ')[0],'Alumna','Familia '+N[0],'11-16',1]],
  act:[{f:'09-14',n:'Puertas abiertas',q:'Visitas guiadas para familias interesadas',i:'Stands, folletos, señalética',doc:['Fotos','Video']},{f:'12-12',n:'Clausura y premiación',q:'Ceremonia de clausura',i:'Auditorio, diplomas, sonido',doc:['Fotos','Video','Live']}]})});
applyTheme(0);
