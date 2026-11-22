
(function(){
/* ===== New Digital Marketing.edu · Configuración, Mejora autónoma y versiones ===== */
const KEY='ndm:sys',BASE=INST.length,BN=INST.slice(),BL=Object.assign({},LG),BT=TH.map(x=>Object.assign({},x));
const SPLBG={0:'#FC3030',1:'#000000',3:'#22a638'},LIGHT={1:1,3:1};
const h=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const nz=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
const slugify=s=>nz(s).replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'inst';
const blank=()=>({ver:1,pid:1,t:0,patches:[],insts:{added:[],hidden:[],names:{},logos:{},cols:{},light:{}},cdata:{},hist:[]});
let SYS=(function(){try{const o=JSON.parse(LSget(KEY)||'null');if(o&&Array.isArray(o.patches)){const b=blank();return Object.assign(b,o,{insts:Object.assign(b.insts,o.insts||{}),hist:o.hist||[],cdata:o.cdata||{}})}}catch(e){}return blank()})();
const shared=()=>({ver:SYS.ver,pid:SYS.pid,t:SYS.t,patches:SYS.patches,insts:SYS.insts,cdata:SYS.cdata});
let pushFn=null;
function save(){SYS.t=Date.now();let s=JSON.stringify(SYS);while(!LSset(KEY,s)&&SYS.hist.length){SYS.hist.shift();s=JSON.stringify(SYS)}if(pushFn)pushFn()}
const snapState=()=>JSON.stringify({ver:SYS.ver,pid:SYS.pid,patches:SYS.patches,insts:SYS.insts});
function commit(fn){const sn=snapState();const r=fn();if(r===false)return false;SYS.hist.push(sn);if(SYS.hist.length>10)SYS.hist.shift();save();applyAll();render();return true}
const verTxt=()=>'v. 0.0.'+SYS.ver;
const hid=i=>i>0&&SYS.insts.hidden.includes(i);
const inApp=()=>$('app').style.display==='block';

/* ---------- color ---------- */
function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let H=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);H=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;H*=60}return[H,s,l]}
function hsl2hex(H,s,l){const a=s*Math.min(l,1-l),f=n=>{const k=(n+H/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1))))};return'#'+[f(0),f(8),f(4)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function hex2rgb(x){const m=/^#?([0-9a-f]{6})$/i.exec(x||'');const n=parseInt(m?m[1]:'1f5bd8',16);return[n>>16&255,n>>8&255,n&255]}
const rgbHex=(r,g,b)=>'#'+[r,g,b].map(x=>Math.round(x).toString(16).padStart(2,'0')).join('');
function mkTheme(hex,forceGray){const[r,g,b]=hex2rgb(hex);let[H,s,l]=rgb2hsl(r,g,b);const gray=forceGray||s<.12;s=gray?Math.min(s,.06):Math.max(s,.45);l=Math.min(Math.max(l,.26),.5);return{a:hsl2hex(H,s,l),a2:hsl2hex(H,s,Math.max(.12,l-.09)),hue:gray?0:Math.round(H),gray}}
function pickColor(img){const c=document.createElement('canvas'),M=72,w=img.naturalWidth||M,hh=img.naturalHeight||M,k=Math.min(1,M/Math.max(w,hh));c.width=Math.max(1,Math.round(w*k));c.height=Math.max(1,Math.round(hh*k));const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,c.width,c.height);const d=x.getImageData(0,0,c.width,c.height).data;
 const B=Array.from({length:24},()=>({w:0,r:0,g:0,b:0}));let op=0,gn=0,gr=0,gg=0,gb=0,lum=0;
 for(let i=0;i<d.length;i+=4){if(d[i+3]<128)continue;op++;const r=d[i],g=d[i+1],b=d[i+2],[H,s,l]=rgb2hsl(r,g,b);lum+=l;if(l>.93||l<.07)continue;
  if(s>=.3&&l>.15&&l<.88){const wt=s*(1-Math.abs(l-.5)),q=B[Math.floor(H/15)%24];q.w+=wt;q.r+=r*wt;q.g+=g*wt;q.b+=b*wt}else if(l<.8){gn++;gr+=r;gg+=g;gb+=b}}
 const light=op?lum/op>.78:false,tot=B.reduce((a,q)=>a+q.w,0);let bi=-1,bw=0;
 B.forEach((q,i)=>{const p=B[(i+23)%24],n=B[(i+1)%24],w=q.w+p.w*.6+n.w*.6;if(w>bw){bw=w;bi=i}});
 if(bi>=0&&tot>op*.02){const g=[B[(bi+23)%24],B[bi],B[(bi+1)%24]];let W=0,R=0,G=0,Bl=0;g.forEach(q=>{W+=q.w;R+=q.r;G+=q.g;Bl+=q.b});return{hex:rgbHex(R/W,G/W,Bl/W),gray:false,light}}
 if(gn)return{hex:rgbHex(gr/gn,gg/gn,gb/gn),gray:true,light};
 return{hex:'#1f5bd8',gray:false,light}}
const readFile=f=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(f)});
const loadImg=src=>new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=src});
async function procLogo(file){const src=await readFile(file),im=await loadImg(src),col=pickColor(im);
 const mk=W=>{const w0=im.naturalWidth||W,h0=im.naturalHeight||Math.round(W/2),k=Math.min(1,W/w0),c=document.createElement('canvas');c.width=Math.max(1,Math.round(w0*k));c.height=Math.max(1,Math.round(h0*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/png')};
 let url=mk(260);if(url.length>220000)url=mk(160);return{url,hex:col.hex,gray:col.gray,light:col.light}}

/* ---------- instituciones ---------- */
const cp2=o=>JSON.parse(JSON.stringify(o));
function cloneDB(name){const src=DBS[5]||DBS[DBS.length-1],from=INST[5]||'';const o=JSON.parse(JSON.stringify(src,(k,v)=>typeof v==='string'&&from?v.split(from).join(name):v));return o}
function applyAll(){const ad=SYS.insts.added,n=BASE+ad.length,I=SYS.insts;
 INST.length=n;SL.length=n;TH.length=n;DBS.length=n;Object.keys(LG).forEach(k=>{if(+k>=n)delete LG[k]});
 for(let i=1;i<BASE;i++){INST[i]=I.names[i]||BN[i];if(I.logos[i])LG[i]=I.logos[i];else if(BL[i])LG[i]=BL[i];else delete LG[i];TH[i]=I.cols[i]?Object.assign({},BT[i],I.cols[i]):Object.assign({},BT[i])}
 ad.forEach((x,k)=>{const i=BASE+k;INST[i]=x.name;SL[i]=x.slug;TH[i]={k:x.gray?'xg':'x',a:x.a,a2:x.a2,hue:x.hue};if(x.logo)LG[i]=x.logo;else delete LG[i];if(!DBS[i])DBS[i]=cloneDB(x.name)});
 const sel=$('sch'),cur=sel.selectedIndex;
 sel.innerHTML=INST.map((nm,i)=>'<option'+(hid(i)?' hidden disabled style="display:none"':'')+'>'+h(nm)+'</option>').join('');
 let ix=cur<0||cur>=n||hid(cur)?0:cur;sel.selectedIndex=ix;
 if(!inApp())applyTheme(ix);
 applyStyles();updVer();sync()}
function migrate(old,nu){if(old===nu)return;let keys=[];try{for(let i=0;i<localStorage.length;i++)keys.push(localStorage.key(i))}catch(e){return}
 keys.forEach(k=>{let nk=null;if(k.startsWith('ndm:data:')&&k.endsWith(':'+old))nk=k.slice(0,k.length-old.length)+nu;else if(k==='ndm:log:'+old)nk='ndm:log:'+nu;else if(k==='ndm:time:'+old)nk='ndm:time:'+nu;else if(k.startsWith('ndm:mem:'+old+':'))nk='ndm:mem:'+nu+k.slice(('ndm:mem:'+old).length);
  if(nk&&LSget(nk)===null){const v=LSget(k);if(v!==null&&LSset(nk,v)){try{localStorage.removeItem(k)}catch(e){}}}})}
const visNames=ex=>INST.map((n,i)=>[n,i]).filter(x=>!hid(x[1])&&x[1]!==ex).map(x=>nz(x[0]));
function say(t,err){const m=$('cfmsg');if(m){m.textContent=t;m.className='msg'+(err?' e':'');m.style.display='block'}}
function colOf(i){const t=TH[i]||{};return i===0?'#FC3030':(t.a||'#888')}
function addInst(name,pend,hex){name=(name||'').trim();if(!name){say('Escribe el nombre de la institución.',1);return false}if(visNames(-1).includes(nz(name))){say('Ya existe una institución con ese nombre.',1);return false}
 const th=mkTheme(hex,pend&&pend.gray&&!pend.manual);let slug=slugify(name),b=slug,c=2;while(SL.includes(slug))slug=b+'-'+c++;
 commit(()=>{SYS.insts.added.push({name,slug,a:th.a,a2:th.a2,hue:th.hue,gray:th.gray,logo:pend?pend.url:'',light:pend?!!pend.light:false})});
 say('Institución «'+name+'» agregada con el color '+th.a+'. Elígela en la lista «Institución educativa» para ver su inicio de sesión y plataforma con esos colores.');try{ensureAccounts();const ad=adminOf(SL[INST.length-1]);if(ad)say($('cfmsg').textContent+' Su usuario Admin (clave inicial: Admin) tiene control total y es independiente del Admin de las demás instituciones.')}catch(e){}return true}
function removeInst(i){if(i<1||i>=INST.length)return;const nm=INST[i];commit(()=>{if(!SYS.insts.hidden.includes(i))SYS.insts.hidden.push(i)});say('Se quitó «'+nm+'». Sus datos guardados no se borran; puedes volver atrás con «Volver a la versión anterior».')}
function renameInst(i,nu){nu=(nu||'').trim();const old=INST[i];if(!nu||nu===old)return render();if(visNames(i).includes(nz(nu))){say('Ya existe una institución con ese nombre.',1);return render()}
 commit(()=>{if(i<BASE)SYS.insts.names[i]=nu;else SYS.insts.added[i-BASE].name=nu});migrate(old,nu);say('«'+old+'» ahora se llama «'+nu+'».')}
function applyLogo(i,p){commit(()=>{const th=mkTheme(p.hex,p.gray);if(i<BASE){SYS.insts.logos[i]=p.url;SYS.insts.light[i]=p.light;if(BT[i].k==='x')SYS.insts.cols[i]={k:th.gray?'xg':'x',a:th.a,a2:th.a2,hue:th.hue}}else{const x=SYS.insts.added[i-BASE];x.logo=p.url;x.light=p.light;x.a=th.a;x.a2=th.a2;x.hue=th.hue;x.gray=th.gray}})}
async function stageLogo(i,file){try{editLogo=await procLogo(file);editI=i;render()}catch(e){say('No pude leer esa imagen.',1)}}
function saveInst(i){const nm=(editName||'').trim(),old=INST[i],lg=editLogo;if(!nm)return say('Escribe el nombre de la institución.',1);if(nm!==old&&visNames(i).includes(nz(nm)))return say('Ya existe una institución con ese nombre.',1);
 editI=-1;editLogo=null;if(lg)applyLogo(i,lg);if(nm!==old)renameInst(i,nm);else render();say('Guardado: «'+nm+'»'+(lg?' con el nuevo logo y sus colores leídos del logo':'')+'.')}
async function changeLogo(i,file){try{applyLogo(i,await procLogo(file));say('Logo actualizado y colores leídos del logo.')}catch(e){say('No pude leer esa imagen.',1)}}

/* ---------- Mejora: intérprete de instrucciones ---------- */
const MS={panel:['panel de configuracion','panel configuracion','panel de ajustes','panel de new digital marketing','panel lateral'],dashboard:['dashboard','ejecutivo'],plan:['plan anual','planificacion','estrategic','plan'],intel:['inteligencia de mercado','competencia','inteligencia','mercado'],camp:['campanas','campana','finanzas','roi'],crm:['crm','embudo','matriculas','matricula'],biblio:['biblioteca','multimedia'],redes:['redes sociales','redes','planificador'],wa:['whatsapp','fidelizacion'],email:['email','correo'],atl:['atl','publicidad exterior','gigantografia'],encuestas:['encuestas','encuesta'],ia:['asistente'],rend:['rendimiento'],analitica:['analisis','reportes','analitica']};
const QR=/"([^"]+)"|“([^”]+)”|«([^»]+)»|‘([^’]+)’|'([^']+)'/g;
function quotes(t){const o=[];let m;QR.lastIndex=0;while(m=QR.exec(t))o.push((m[1]||m[2]||m[3]||m[4]||m[5]).trim());return o}
function modTitle(k){if(k==='panel')return'Panel Configuración';const m=MODS.find(x=>x[0]===k);return m?m[1]:k}
function resolveMod(n){let best=null;for(const k in MS)MS[k].forEach(w=>{const r=new RegExp('(^|[^a-z0-9])'+w+'(?![a-z0-9])').exec(n);if(r&&(!best||w.length>best.w.length))best={k,w}});if(!best)return{};let tab=null;if(best.k==='plan'){if(/plan anual/.test(n))tab='plan';else if(/foda|objetivo/.test(n))tab='obj';else if(/actividad|evento/.test(n))tab='act';else if(/idea/.test(n))tab='ideas'}return{mod:best.k,tab}}
const where=p=>p.mod?(modTitle(p.mod)+(p.tab?' › '+({plan:'Plan anual',obj:'Objetivos y FODA',act:'Eventos',ideas:'Ideas de mejora'})[p.tab]:'')):'toda la plataforma';
/* ---------- Mejora de diseño ---------- */
const CN={rojo:'#d92020',azul:'#1f5bd8',verde:'#1b8a2f',amarillo:'#f2b705',naranja:'#f57c00',morado:'#7b3fe4',violeta:'#7b3fe4',rosado:'#e91e8c',rosa:'#e91e8c',fucsia:'#d6197f',celeste:'#29a9e0',turquesa:'#0e9aa7',negro:'#111111',blanco:'#ffffff',gris:'#6b7280',plomo:'#6b7280',marron:'#7b4a2a',dorado:'#c9a227',vino:'#7a1230',lila:'#b794f4',cafe:'#6f4e37'};
const FN={arial:'Arial, sans-serif',georgia:'Georgia, serif',verdana:'Verdana, sans-serif',tahoma:'Tahoma, sans-serif',trebuchet:'"Trebuchet MS", sans-serif',times:'"Times New Roman", serif',courier:'"Courier New", monospace',serif:'Georgia, serif',monospace:'"Courier New", monospace',sans:'Arial, sans-serif',elegante:'Georgia, serif',moderna:'"Trebuchet MS", sans-serif',clasica:'"Times New Roman", serif'};
function getColor(t){const m=/#([0-9a-f]{6}|[0-9a-f]{3})(?![0-9a-z])/i.exec(t);if(m){let x=m[1];if(x.length===3)x=x.split('').map(c=>c+c).join('');return'#'+x.toLowerCase()}const n=nz(t);let best=null;for(const k in CN){const re=new RegExp('(^|[^a-z])'+k+'(?![a-z])','g');let r;while(r=re.exec(n)){if(!best||r.index>=best.i)best={i:r.index,c:CN[k]}}}return best?best.c:null}
function scopeOf(n){for(let i=0;i<INST.length;i++){if(hid(i))continue;if(i===0?/new digital marketing|ndm\.edu/.test(n):n.includes(nz(INST[i])))return i}return-1}
function design(n,t,sc){const R=sc>=0?'body[data-inst="'+sc+'"]':':root',PL=l=>l.split(',').map(x=>(sc>=0?'body[data-inst="'+sc+'"] ':'')+x).join(','),w=sc>=0?' ('+INST[sc]+')':' (toda la plataforma)';
 let m;
 if((m=/^\s*(?:css|estilo)\s*[:\-]?\s*([^{}]+\{[^{}]+\}[\s\S]*)$/i.exec(t)))return{key:'raw'+Date.now(),css:m[1].replace(/<\/?style|@import|javascript:|expression\(/gi,''),label:'apliqué tu estilo CSS personalizado'};
 if(/(modo|tema) oscuro|fondo oscuro del sistema/.test(n))return{key:'dark',css:'html{filter:invert(1) hue-rotate(180deg)}img,iframe,video{filter:invert(1) hue-rotate(180deg)}',label:'activé el modo oscuro'};
 if(/(modo|tema) claro/.test(n))return{key:'dark',css:'',label:'volví al modo claro'};
 if(/(letra|fuente|tipografia)/.test(n)&&!/(grande|pequen|tamano|chica)/.test(n)){let f=null;for(const k in FN)if(new RegExp('(^|[^a-z])'+k+'(?![a-z])').test(n)){f=k;break}if(f){const ff=FN[f];return{key:'font|'+sc,css:PL('body,button,input,select,textarea')+'{font-family:'+ff+'!important}',label:'cambié la tipografía a '+ff.split(',')[0].replace(/"/g,'')+w}}}
 if(/(tamano|letra|texto|zoom|agranda|achica|aumenta|reduce|interfaz|pantalla)/.test(n)&&/(grande|agranda|aumenta|mayor|pequen|reduce|achica|chic|menor|normal|restablece|enorme)/.test(n)&&!/(boton|logo|titulo)/.test(n)){const z=/muy grande|enorme/.test(n)?1.2:/pequen|reduce|achica|chic|menor/.test(n)?.92:/normal|restablece/.test(n)?1:1.1;return{key:'zoom|'+sc,css:R+'{zoom:'+z+'}',label:'dejé el tamaño de la interfaz en '+Math.round(z*100)+'%'+w}}
 {const TGT=[['encabezados de tabla','th'],['encabezado de tabla','th'],['titulos','h1,h2,h3'],['titulo','h1,h2,h3'],['botones','.btn'],['boton','.btn'],['tarjetas','.card'],['tarjeta','.card'],['tablas','table'],['tabla','table'],['menu lateral','aside'],['barra lateral','aside'],['barra superior','.top'],['panel de configuracion','#cfgp'],['panel','#cfgp'],['pestanas','.tabs button'],['etiquetas','.tag'],['parrafos','p,.note'],['campos','input,select,textarea'],['inicio de sesion','#login'],['login','#login'],['etiquetas de los campos','label']];
  let T=null;TGT.forEach(x=>{if(new RegExp('(^|[^a-z])'+x[0]+'(?![a-z])').test(n)&&(!T||x[0].length>T[0].length))T=x});
  if(T){const num=(/(\d+(?:[.,]\d+)?)\s*(px|pt|%)?/.exec(n)||[]),nv=num[1]?num[1].replace(',','.'):null,un=num[2]||'px',col=getColor(t),css=[];let lab=[];
   const WH=['texto','letra'];
   if(/(tamano|grande|pequen|agranda|achica)/.test(n)&&/(letra|texto|fuente|tamano)/.test(n)){if(nv){css.push('font-size:'+nv+(un==='%'?'px':un)+'!important');lab.push('tamaño de letra '+nv+(un==='%'?'px':un))}else{const g=/(pequen|achica|reduce|menor)/.test(n);css.push('font-size:'+(g?'.85em':'1.25em')+'!important');lab.push('letra '+(g?'más pequeña':'más grande'))}}
   if(/\bsin negrita\b/.test(n)){css.push('font-weight:400!important');lab.push('sin negrita')}else if(/negrita/.test(n)){css.push('font-weight:700!important');lab.push('en negrita')}
   if(/cursiva/.test(n)){css.push('font-style:italic!important');lab.push('en cursiva')}
   if(/mayuscula/.test(n)){css.push('text-transform:uppercase!important');lab.push('en mayúsculas')}
   if(col&&/(color de (la )?(letra|texto)|(letra|texto) (de |en )?color|(letra|texto) (rojo|azul|verde|negro|blanco|amarillo|naranja|morado|rosado|celeste|gris|dorado|violeta)|(letra|texto) (en|a|de) #)/.test(n)){css.push('color:'+col+'!important');lab.push('color de letra '+col)}
   else if(col&&/(color de fondo|fondo)/.test(n)&&!(/^(inicio de sesion|login|menu lateral|barra lateral)$/.test(T[0])&&!/(color de fondo)/.test(n))){css.push('background:'+col+'!important');lab.push('fondo '+col)}
   if(/sin borde/.test(n)){css.push('border:none!important');lab.push('sin borde')}else if(col&&/\bborde\b/.test(n)&&!/redond/.test(n)){css.push('border:'+(nv&&num[2]?nv+un:'2px')+' solid '+col+'!important');lab.push('borde '+col)}
   if(nv&&/\bancho\b/.test(n)){css.push('width:'+nv+(un==='%'?'%':un)+'!important');lab.push('ancho '+nv+un)}
   if(nv&&/\balto\b/.test(n)){css.push('height:'+nv+(un==='%'?'%':un)+'!important');lab.push('alto '+nv+un)}
   if(nv&&/(espacio interno|relleno|padding)/.test(n)){css.push('padding:'+nv+'px!important');lab.push('espacio interno '+nv+'px')}
   if(nv&&/\bmargen\b/.test(n)){css.push('margin:'+nv+'px!important');lab.push('margen '+nv+'px')}
   if(nv&&/(opacidad|transparen)/.test(n)){css.push('opacity:'+(un==='%'||+nv>1?+nv/100:+nv)+'!important');lab.push('opacidad '+nv+(un==='%'?'%':''))}
   if(/(ocult|quita|elimina)/.test(n)&&/(sombra)/.test(n)){}
   else if(/(redonde|esquina)/.test(n)&&nv){css.push('border-radius:'+nv+'px!important');lab.push('bordes de '+nv+'px')}
   if(css.length)return{key:'el|'+sc+'|'+T[1]+'|'+css.map(c=>c.split(':')[0]).join(','),css:PL(T[1])+'{'+css.join(';')+'}',label:'apliqué en '+T[0]+': '+lab.join(', ')+w}}}
 if(/(redonde|esquina|borde)/.test(n)){const r=/cuadrad|recto|sin redond|filoso/.test(n)?0:/muy redond|circular|pildora/.test(n)?26:/menos|poco/.test(n)?6:16;return{key:'radius|'+sc,css:PL('.card,.btn,.lbox,input,select,textarea,.tag,nav button,.kpi')+'{border-radius:'+r+'px!important}',label:'puse los bordes a '+r+' px'+w}}
 if(/sombra/.test(n)){const no=/(sin|quita|elimina|oculta|saca|no )/.test(n);return{key:'shadow|'+sc,css:no?PL('.card,.lbox,.kpi,.btn,aside')+'{box-shadow:none!important}':PL('.card,.lbox,.kpi')+'{box-shadow:0 10px 30px rgba(0,0,0,.22)!important}',label:(no?'quité':'reforcé')+' las sombras'+w}}
 if(/(compact|menos espacio|mas espacio|espacioso|airead|espaciad)/.test(n)){const c=/(compact|menos espacio)/.test(n);return{key:'dens|'+sc,css:PL('.card')+'{padding:'+(c?10:24)+'px!important}',label:'hice el diseño más '+(c?'compacto':'espaciado')+w}}
 const col=getColor(t);
 if(col&&/(color|colores|fondo|boton|barra|menu|sidebar|lateral|titulo|encabezado|pinta|tono|tema|acento|texto|principal|primario|login|inicio de sesion)/.test(n)){
  if(/(boton|botones)/.test(n))return{key:'btn|'+sc,css:PL('.btn,nav button.on')+'{background:'+col+'!important;border-color:'+col+'!important}',label:'puse los botones en '+col+w};
  if(/(barra lateral|menu|sidebar|lateral)/.test(n))return{key:'side|'+sc,css:'html '+PL('body[data-th] aside,aside')+'{background:'+col+'!important}',label:'puse el menú lateral en '+col+w};
  if(/(titulo|encabezado)/.test(n))return{key:'ttl|'+sc,css:PL('h1,h2,h3')+'{color:'+col+'!important}',label:'puse los títulos en '+col+w};
  if(/(login|inicio de sesion)/.test(n)&&/fondo/.test(n))return{key:'login|'+sc,css:'html '+PL('body[data-th] #login')+'{background:'+col+'!important}',label:'puse el fondo del inicio de sesión en '+col+w};
  if(/fondo/.test(n))return{key:'bg|'+sc,css:'html '+PL('body')+'{background:'+col+'!important}'+PL('body::before')+'{background:'+col+'!important}',label:'puse el fondo en '+col+w};
  if(/texto/.test(n)&&!/principal/.test(n))return{key:'txt|'+sc,css:PL('body')+'{color:'+col+'!important}',label:'puse el texto en '+col+w};
  const th=mkTheme(col),hu=th.hue;return{key:'acc|'+sc,css:R+'{--red:'+th.a+'!important;--red2:'+th.a2+'!important;--hue:'+hu+'deg!important}'+(sc>0?'':PL('body[data-th="demo"] .scene,body[data-th="demo"] .adeco,body[data-th="demo"]::after').replace(/body\[data-inst="0"\] body\[data-th="demo"\]/g,'body[data-inst="0"][data-th="demo"]'))+((sc>0)?'':'{filter:hue-rotate('+hu+'deg)}'),label:'cambié el color principal a '+th.a+w}}
 return null}
function interpret(txt){const t=(txt||'').trim();if(t.length<4)return{err:'Escribe qué quieres mejorar.'};const q=quotes(t),n=nz(t.replace(QR,' ')),{mod,tab}=resolveMod(n);
 const V_ADD=/\b(agrega|agregar|agregues|agreguen|agregame|anade|anadir|anadas|crea|crear|inserta|insertar|incluye|incluir|nuevo|nueva)\b/,V_REN=/\b(cambia|cambiar|cambien|cambies|renombra|renombrar|reemplaza|reemplazar|sustituye|modifica|modificar|llama|ponle)\b/,V_HID=/\b(quita|quitar|quites|quiten|elimina|eliminar|borra|borrar|oculta|ocultar|saca|sacar|remueve|remover)\b/,V_SHO=/\b(muestra|mostrar|restaura|restaurar|restablece|recupera|recuperar|reponer|repon)\b/;
 let m;
 if(V_REN.test(n)&&q.length>=2&&/\b(por|a|como)\b/.test(n))return{p:{kind:'rename',from:q[0],to:q[1],mod:mod||null,tab:tab||null}};
 const rawD=/^\s*(css|estilo)\b/i.test(t),ds=design(n,t,rawD?-1:scopeOf(n));if(ds)return{p:Object.assign({kind:'style'},ds)};
 if(/\b(mueve|mover|sube|subir|baja|bajar|coloca|pon)\b/.test(n)&&q[0]&&/(inicio|principio|arriba|primero|final|ultimo|abajo)/.test(n)){const mm=MODS.find(x=>nz(x[1])===nz(q[0])||nz(x[1]).includes(nz(q[0])));if(!mm)return{err:'No encontré ese módulo para moverlo.'};return{p:{kind:'move',what:mm[1],pos:/(final|ultimo|abajo)/.test(n)?'end':'start'}}}
 if(V_REN.test(n)&&q.length<2){const r=/(?:cambia|cambiar|renombra|renombrar|reemplaza|reemplazar|sustituye)\s+(?:el |la |los |las )?(?:nombre |titulo |texto )?(?:de |del )?(.+?)\s+(?:por|a)\s+(.+)$/i.exec(t);if(r)return{p:{kind:'rename',from:r[1].replace(/^["“«']|["”»']$/g,'').trim(),to:r[2].replace(/^["“«']|["”»']$/g,'').replace(/[.]+$/,'').trim(),mod:mod||null,tab:tab||null}}}
 if(V_HID.test(n)){const w=q[0]||((/(?:quita|quitar|elimina|eliminar|borra|borrar|oculta|ocultar|saca|sacar)\s+(?:el |la |los |las )?(?:apartado |seccion |modulo |tarjeta |columna |bloque )?(?:de )?(.+?)(?:\s+(?:en|del|de la|de)\s+.*)?$/i.exec(t)||[])[1]);if(!w)return{err:'Dime qué quieres quitar, por ejemplo: Oculta "Eventos" en Plan anual.'};
  const wn=nz(w),isCol=/\bcolumna\b/.test(n),mm=MODS.find(x=>x[0]!=='config'&&(nz(x[1])===wn||(wn.length>=5&&/\bmodulo\b/.test(n)&&nz(x[1]).includes(wn))));
  if(mm&&!isCol)return{p:{kind:'hide',what:mm[1],nav:true,mod:null}};
  return{p:{kind:'hide',what:w,col:isCol,mod:mod||null,tab:tab||null}}}
 if(V_SHO.test(n)&&!V_ADD.test(n)){const w=q[0];if(!w)return{err:'Dime qué quieres volver a mostrar, por ejemplo: Muestra "Eventos".'};return{p:{kind:'show',what:w,mod:null}}}
 if(V_ADD.test(n)||V_REN.test(n)){
  if(!mod)return{err:'Indica en qué módulo, por ejemplo: «en Plan anual», «en CRM», «en Campañas», «en Biblioteca».'};
  const url=(/(https?:\/\/\S+|www\.\S+)/i.exec(t)||[])[1];let title=q[0];
  if(!title&&(m=/(?:llamad[oa]|titulad[oa]|de nombre|que diga|que se llame)\s+(.+?)(?:\s+(?:en|con|dentro)\s+.*)?$/i.exec(t)))title=m[1].replace(/[.]+$/,'').trim();
  if(!title)return{err:'Ponle un nombre entre comillas, por ejemplo: Agrega en Plan anual un apartado "Presupuesto".'};
  if(url&&/(imagen|foto|logo|banner)/.test(n)&&/\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url))return{p:{kind:'img',title,url:url.startsWith('http')?url:'https://'+url,mod,tab}};
  if(url&&/(enlace|link|boton|url|pagina)/.test(n))return{p:{kind:'link',title,url:url.startsWith('http')?url:'https://'+url,mod,tab}};
  if(/\b(tabla|columnas?|lista|registro|cuadro)\b/.test(n)){let cols=q[1]?q[1].split(/[,;]|\s+y\s+/):((/columnas?\s*:?\s*(.+)$/i.exec(t)||[])[1]||'').replace(/["“”«»]/g,'').split(/[,;]|\s+y\s+/);cols=cols.map(s=>s.trim()).filter(Boolean).slice(0,8);if(!cols.length)cols=['Detalle','Responsable','Fecha'];return{p:{kind:'table',title,cols,mod,tab}}}
  return{p:{kind:'card',title,body:q[1]||'',mod,tab}}}
 return{err:'No entendí la instrucción. Prueba con: Agrega en Plan anual un apartado "Presupuesto" · Cambia "Plan anual" por "Plan del año" · Agrega en CRM una tabla "Responsables" con columnas "Nombre, Cargo" · Oculta "Eventos" en Plan anual · Quita el módulo "Email Marketing".'}}
function describe(p){const w=where(p);switch(p.kind){case'card':return'agregué el apartado «'+p.title+'» en '+w;case'table':return'agregué la tabla «'+p.title+'» ('+p.cols.join(', ')+') en '+w;case'img':return'agregué la imagen «'+p.title+'» en '+w;case'link':return'agregué el enlace «'+p.title+'» en '+w;case'rename':return'cambié «'+p.from+'» por «'+p.to+'» en '+w;case'hide':return(p.nav?'quité el módulo «':'oculté «')+p.what+'»'+(p.nav?'':(p.col?' (columna)':'')+' en '+w);case'show':return'volví a mostrar «'+p.what+'»';case'style':return p.label;case'move':return'moví el módulo «'+p.what+'» al '+(p.pos==='end'?'final':'inicio')}return''}
function mejora(txt){const r=interpret(txt);if(r.err)return say(r.err,1);const p=r.p;
 commit(()=>{p.id=SYS.pid++;p.txt=txt.trim();SYS.ver++;p.v=SYS.ver;p.t=Date.now();SYS.patches.push(p)});let hint='';try{const bt=nz(document.body.innerText);if(p.kind==='rename'&&!bt.includes(nz(p.from)))hint=' Ojo: no veo el texto «'+p.from+'» en la pantalla actual; se cambiará donde aparezca.';if(p.kind==='hide'&&!p.nav&&!bt.includes(nz(p.what)))hint=' Ojo: no veo «'+p.what+'» en la pantalla actual; se ocultará donde aparezca.'}catch(e){}
 say('Listo: '+describe(p)+'. Ahora es '+verTxt()+'.'+(p.kind==='style'?' El diseño ya se aplicó.':p.mod==='panel'?' Ya se ve en el panel.':' Verás el cambio al abrir ese módulo.')+hint);const ta=$('cfTxt');if(ta)ta.value=''}
const match=(a,b)=>{a=nz(a);b=nz(b);return a===b||(b.length>2&&(a.includes(b)||b.includes(a)))};
function act(P){const out=[];(P||SYS.patches).forEach(p=>{if(p.kind==='show'){for(let i=out.length-1;i>=0;i--)if(out[i].kind==='hide'&&match(out[i].what,p.what))out.splice(i,1)}else out.push(p)});return out}
function revert(){if(!SYS.hist.length)return say('No hay una versión anterior a la cual volver.',1);const sn=JSON.parse(SYS.hist.pop());SYS.ver=sn.ver;SYS.pid=sn.pid;SYS.patches=sn.patches;SYS.insts=Object.assign(blank().insts,sn.insts);save();applyAll();render();say('Listo: volviste a la versión anterior ('+verTxt()+').')}
function optimize(){const before=SYS.patches.length,P=act(),out=[];
 P.forEach(p=>{if(p.kind==='style'){const j=out.findIndex(o=>o.kind==='style'&&o.key===p.key);if(j>=0)out.splice(j,1);out.push(p);return}if(p.kind==='rename'){const prev=out.find(o=>o.kind==='rename'&&nz(o.to)===nz(p.from)&&o.mod===p.mod&&o.tab===p.tab);if(prev){prev.to=p.to;prev.txt+=' + '+p.txt;return}}
  const dup=out.find(o=>o.kind===p.kind&&o.mod===p.mod&&o.tab===p.tab&&nz(o.title||o.what||o.from)===nz(p.title||p.what||p.from)&&(p.kind==='hide'||p.kind==='rename'));if(dup){if(p.kind==='rename')dup.to=p.to;return}out.push(p)});
 const samples=[...MODS.map(m=>m[1]),...P.map(p=>p.from).filter(Boolean),...P.map(p=>p.to).filter(Boolean)],ren=L=>s=>{L.filter(p=>p.kind==='rename').forEach(p=>{s=s.replace(new RegExp(p.from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),p.to)});return s};
 const a=ren(P),b=ren(out),same=samples.every(s=>a(s)===b(s));
 if(!same)return say('La optimización se canceló: no pude garantizar que todo siga igual. No se cambió nada.',1);
 const keep=new Set(out.map(p=>p.id));let cdel=0;Object.keys(SYS.cdata).forEach(k=>{if(!keep.has(+k.split('|')[0])){delete SYS.cdata[k];cdel++}});
 commit(()=>{SYS.patches=out});say('Optimización lista: '+before+' ajustes → '+out.length+' (sin cambiar el funcionamiento'+(cdel?', '+cdel+' datos huérfanos limpiados':'')+'). La versión sigue en '+verTxt()+'.')}

/* ---------- aplicar mejoras al sistema ---------- */
const curTab=k=>k==='plan'?(S.ptab||'obj'):null;
const slug=()=>SL[S.inst||0];
const okTab=(p,k)=>(!p.tab||p.tab===curTab(k));
function buildCard(p){const d=document.createElement('div');d.className='card cm-card';d.dataset.pid=p.id;d.style.marginTop='12px';fillCard(d,p);return d}
function fillCard(d,p){const key=p.id+'|'+slug(),dat=SYS.cdata[key],ro=(typeof CE==='function'&&!CE())?' disabled':'';
 if(p.kind==='card')d.innerHTML='<h3>'+h(p.title)+'</h3><textarea data-cm="t" data-k="'+h(key)+'"'+ro+' placeholder="Escribe aquí…">'+h(dat!=null?dat:p.body||'')+'</textarea><p class="note">Apartado agregado con Mejora. Se guarda automáticamente.</p>';
 else if(p.kind==='img')d.innerHTML='<h3>'+h(p.title)+'</h3><img class="cmi" alt="'+h(p.title)+'" src="'+h(p.url)+'">';
 else if(p.kind==='link')d.innerHTML='<h3>'+h(p.title)+'</h3><a class="btn" style="text-decoration:none;display:inline-block" target="_blank" rel="noopener" href="'+h(p.url)+'">Abrir '+h(p.title)+'</a>';
 else{const rows=(dat&&dat.rows)||[];d.innerHTML='<h3>'+h(p.title)+'</h3><div class="scroll"><table><tr>'+p.cols.map(c=>'<th>'+h(c)+'</th>').join('')+'<th></th></tr>'+rows.map((r,ri)=>'<tr>'+p.cols.map((_,ci)=>'<td><input data-cm="c" data-k="'+h(key)+'" data-r="'+ri+'" data-c="'+ci+'" value="'+h(r[ci]||'')+'"'+ro+'></td>').join('')+'<td>'+(ro?'':'<button class="btn g" onclick="__cmDel('+p.id+','+ri+')">✕</button>')+'</td></tr>').join('')+'</table></div>'+(ro?'':'<button class="btn" style="margin-top:8px" onclick="__cmAdd('+p.id+')">+ Agregar fila</button>')+'<p class="note">Tabla agregada con Mejora. Se guarda automáticamente.</p>'}}
function repaint(id){const p=SYS.patches.find(x=>x.id===id);document.querySelectorAll('.cm-card[data-pid="'+id+'"]').forEach(d=>fillCard(d,p))}
window.__cmAdd=function(id){const p=SYS.patches.find(x=>x.id===id);if(!p)return;const k=id+'|'+slug(),d=SYS.cdata[k]||(SYS.cdata[k]={rows:[]});d.rows.push(p.cols.map(()=>''));save();repaint(id)};
window.__cmDel=function(id,ri){const k=id+'|'+slug(),d=SYS.cdata[k];if(!d)return;d.rows.splice(ri,1);save();repaint(id)};
let sv=0;document.addEventListener('input',e=>{const t=e.target;if(!t||!t.dataset||!t.dataset.cm)return;const k=t.dataset.k;if(t.dataset.cm==='t')SYS.cdata[k]=t.value;else{const d=SYS.cdata[k]||(SYS.cdata[k]={rows:[]});(d.rows[+t.dataset.r]||(d.rows[+t.dataset.r]=[]))[+t.dataset.c]=t.value}clearTimeout(sv);sv=setTimeout(save,400)});
const done=new WeakMap();
function textPass(root,P,k){const R=P.filter(p=>p.kind==='rename'&&(!p.mod||p.mod===k)&&(k==null||okTab(p,k)));if(!R.length||!root)return;const rx=R.map(p=>{const e=p.from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return[new RegExp((/^[\p{L}\p{N}]/u.test(p.from)?'(?<![\\p{L}\\p{N}])':'')+e+(/[\p{L}\p{N}]$/u.test(p.from)?'(?![\\p{L}\\p{N}])':''),'giu'),p.to,p]});const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n,L=[];while(n=w.nextNode())L.push(n);
 L.forEach(n=>{const pe=n.parentNode&&n.parentNode.nodeName;if(/SCRIPT|STYLE|TEXTAREA/.test(pe))return;if(done.get(n)===n.nodeValue)return;let v=n.nodeValue;rx.forEach(([r,to])=>{if(r.test(v)){r.lastIndex=0;v=v.replace(r,to)}r.lastIndex=0});if(v!==n.nodeValue)n.nodeValue=v;done.set(n,v)})}
function hidePass(view,P,k){P.filter(p=>p.kind==='hide'&&!p.nav&&(!p.mod||p.mod===k)&&okTab(p,k)).forEach(p=>{const w=nz(p.what);if(p.col){view.querySelectorAll('table').forEach(t=>{const hr=t.rows[0];if(!hr)return;const ci=[...hr.cells].findIndex(c=>nz(c.textContent).includes(w));if(ci<0)return;[...t.rows].forEach(r=>{if(r.cells[ci])r.cells[ci].style.display='none'})});return}
  view.querySelectorAll('.card,.cfi,h4').forEach(c=>{const hd=c.querySelector('h1,h2,h3,h4'),tx=nz(hd?hd.textContent:(c.textContent.length<90?c.textContent:''));if(tx&&tx.includes(w))c.style.display='none'})})}
function post(k){const view=$('view');if(!view||(S.v&&S.v!==k))return;const P=act();view.querySelectorAll('.cm-card').forEach(e=>e.remove());
 P.filter(p=>p.mod===k&&okTab(p,k)&&(p.kind==='card'||p.kind==='table'||p.kind==='link'||p.kind==='img')).forEach(p=>view.appendChild(buildCard(p)));
 hidePass(view,P,k);textPass(view,P,k);textPass($('title'),P,k)}
function applyStyles(){let st=$('cfdyn');if(!st){st=document.createElement('style');st.id='cfdyn';document.body.appendChild(st)}const mp=new Map();act().filter(p=>p.kind==='style').forEach(p=>{mp.delete(p.key);mp.set(p.key,p.css)});st.textContent=[...mp.values()].join('\n')}
function navPost(){const P=act(),nav=$('nav');if(!nav)return;P.filter(p=>p.kind==='move').forEach(p=>{const b=[...nav.children].find(x=>nz(x.textContent)===nz(p.what));if(b){if(p.pos==='end')nav.appendChild(b);else nav.insertBefore(b,nav.firstChild)}});P.filter(p=>p.kind==='hide'&&p.nav).forEach(p=>{[...nav.children].forEach(b=>{if(nz(b.textContent)===nz(p.what)||nz(b.textContent).includes(nz(p.what)))b.remove()})});textPass(nav,P);textPass($('title'),P)}
MODS.forEach(m=>{const k=m[0],o=V[k];if(typeof o!=='function')return;V[k]=function(){const r=o.apply(this,arguments);try{post(k)}catch(e){}return r}});
/* ---------- descarga del sistema y base de datos (solo Colegio Ndm.edu · Admin) ---------- */
const CT=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CT[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
function makeZip(files){const enc=new TextEncoder(),d=new Date(),dt=((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(),tm=(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1),parts=[],cen=[];let off=0;
 files.forEach(f=>{const nm=enc.encode(f.name),data=f.data,crc=crc32(data),lh=new DataView(new ArrayBuffer(30));lh.setUint32(0,0x04034b50,true);lh.setUint16(4,20,true);lh.setUint16(6,0x0800,true);lh.setUint16(8,0,true);lh.setUint16(10,tm,true);lh.setUint16(12,dt,true);lh.setUint32(14,crc,true);lh.setUint32(18,data.length,true);lh.setUint32(22,data.length,true);lh.setUint16(26,nm.length,true);lh.setUint16(28,0,true);
  parts.push(new Uint8Array(lh.buffer),nm,data);
  const ch=new DataView(new ArrayBuffer(46));ch.setUint32(0,0x02014b50,true);ch.setUint16(4,20,true);ch.setUint16(6,20,true);ch.setUint16(8,0x0800,true);ch.setUint16(10,0,true);ch.setUint16(12,tm,true);ch.setUint16(14,dt,true);ch.setUint32(16,crc,true);ch.setUint32(20,data.length,true);ch.setUint32(24,data.length,true);ch.setUint16(28,nm.length,true);ch.setUint32(42,off,true);
  cen.push(new Uint8Array(ch.buffer),nm);off+=30+nm.length+data.length});
 const cs=cen.reduce((a,x)=>a+x.length,0),ed=new DataView(new ArrayBuffer(22));ed.setUint32(0,0x06054b50,true);ed.setUint16(8,files.length,true);ed.setUint16(10,files.length,true);ed.setUint32(12,cs,true);ed.setUint32(16,off,true);
 return new Blob([...parts,...cen,new Uint8Array(ed.buffer)],{type:'application/zip'})}
function cleanClone(){const c=document.documentElement.cloneNode(true);['cfgp','cftab','cfver','cfFile','splash','cfdyn'].forEach(id=>{const e=c.querySelector('#'+id);if(e)e.remove()});c.removeAttribute('style');const b=c.querySelector('body');['data-th','data-inst','class','style'].forEach(a=>b.removeAttribute(a));
 ['login','app'].forEach(id=>{const e=c.querySelector('#'+id);if(e)e.removeAttribute('style')});['view','nav'].forEach(id=>{const e=c.querySelector('#'+id);if(e)e.innerHTML=''});c.querySelectorAll('.cm-card,.nw .nb').forEach(e=>e.remove());return'<!DOCTYPE html>\n'+c.outerHTML}
async function sourceHtml(){try{const ac=typeof AbortController==='function'?new AbortController():null,tm=setTimeout(()=>{try{ac&&ac.abort()}catch(e){}},6000),r=await Promise.race([fetch(location.href.split('#')[0],{cache:'no-store',signal:ac?ac.signal:undefined}),new Promise((_,j)=>setTimeout(()=>j(new Error('t')),6500))]);if(r.ok){const t=await Promise.race([r.text(),new Promise((_,j)=>setTimeout(()=>j(new Error('t')),6500))]);clearTimeout(tm);if(t.indexOf('ndm:acc')>0&&t.indexOf('cfgp')>0)return t}clearTimeout(tm)}catch(e){}return cleanClone()}
async function pullShared(){if(!window.claude||!claude.use)return null;try{const db=await Promise.race([claude.use('db'),new Promise(r=>setTimeout(()=>r(null),5000))]);if(!db)return null;const out={data:{}},T=p=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('t')),8000))]);
 await Promise.all(INST.map(async(n,i)=>{try{const qs=await T(db.collection('i_'+SL[i]).get()),o={};qs.docs.forEach(d=>{const dt=d.data&&d.data(),s=dt&&dt.s;if(typeof s==='string'&&d.id!=='atlOwn'){try{o[d.id]=JSON.parse(s)}catch(e){}}});if(Object.keys(o).length)out.data[SL[i]]=o}catch(e){}}));
 try{const sn=await T(db.doc('g_cfg/accounts').get());if(sn.exists){const o=JSON.parse((sn.data()||{}).s||'{}');if(Array.isArray(o.acc))out.acc=o.acc;if(o.perm)out.perm=o.perm}}catch(e){}
 return out}catch(e){return null}}
function collectDB(extra){const st={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf('ndm:')===0&&!/^ndm:(lastInst|splash|seeded)$/.test(k))st[k]=localStorage.getItem(k)}}catch(e){}
 const accs=ACC.slice();if(extra&&extra.acc)extra.acc.forEach(a=>{if(a&&a.u&&!accs.some(x=>x.u.toLowerCase()===a.u.toLowerCase()&&instOf(x)===instOf(a)))accs.push(a)});
 const perm=Object.assign({},(extra&&extra.perm)||{},PERM);
 st['ndm:acc']=JSON.stringify(accs);st['ndm:perms']=JSON.stringify(perm);st['ndm:sys']=JSON.stringify(SYS);
 const por=INST.map((n,i)=>{let datos=null;try{const r=JSON.parse(st['ndm:data:'+n]||'null');if(r&&r.data)datos=r.data}catch(e){}
  let org=datos?'guardado por los usuarios':'datos iniciales del sistema';const shd=extra&&extra.data&&extra.data[SL[i]];if(shd){datos=Object.assign({},datos||JSON.parse(JSON.stringify(DBS[i]||{},(k,v)=>k==='u'?undefined:v)),shd);st['ndm:data:'+n]=JSON.stringify({ts:Date.now(),data:datos});org='guardado por los usuarios (base compartida)'}
  const us=accs.filter(a=>instOf(a)===SL[i]).map(a=>({usuario:a.u,clave:a.p,rol:a.rol,puede_editar:isAdm(a.u)||!!a.ed,modulos:perm[a.u]||[]}));
  return{indice:i,nombre:n,slug:SL[i],oculta:hid(i),usuarios:us,configuracion_y_datos:datos||JSON.parse(JSON.stringify(DBS[i]||{},(k,v)=>k==='u'?undefined:v)),origen_datos:org}});
 return{plataforma:'New Digital Marketing.edu',exportado:new Date().toISOString(),version:verTxt(),instituciones:por,mejoras_y_diseno:{version:SYS.ver,mejoras:SYS.patches,instituciones_agregadas:SYS.insts},almacenamiento:st}}
const README=v=>`# New Digital Marketing.edu — paquete listo para GitHub Pages

Exportado: ${new Date().toLocaleString('es-PE')} · Versión ${v}

## Qué contiene este paquete
- index.html — toda la plataforma (todas las instituciones) con sus usuarios, permisos, configuración, datos, diseño y mejoras ya incluidos. Es lo único que necesita GitHub.
- 404.html — lleva a la página principal si alguien entra a una dirección que no existe.
- LEEME.md — estas instrucciones (puedes subirlo o no).
- respaldo-NO-SUBIR/base-de-datos.json — copia legible de los datos. NO la subas a GitHub: contiene contraseñas.

## Publicar en GitHub Pages (5 pasos)
1. Descomprime este ZIP en tu computadora (GitHub no abre ZIP).
2. En GitHub crea un repositorio nuevo (o usa uno existente) y entra a «Add file › Upload files».
3. Arrastra SOLO index.html y 404.html (y LEEME.md si quieres) a la raíz del repositorio, es decir, sueltos, no dentro de una carpeta. Pulsa «Commit changes».
4. Ve a Settings › Pages. En «Build and deployment» elige «Deploy from a branch», rama main, carpeta / (root), y pulsa Save.
5. Espera uno o dos minutos y abre https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/ (con el nombre del repositorio al final).

Ingresa con tu usuario de siempre (por ejemplo Admin). La primera vez que se abre en un navegador, los datos incluidos se cargan solos.

## Importante
- Los datos incluidos en index.html (usuarios y contraseñas) quedan visibles para quien pueda abrir el código de la página. Usa un repositorio privado si tu plan de GitHub permite Pages privado; si no, no publiques datos reales.
- Los datos se guardan en el navegador de cada persona. Para moverlos a otro servidor, descarga de nuevo este paquete desde Colegio Ndm.edu › Configuración y Usuarios.
`
async function downloadAll(){const btn=$('cfdlb'),msg=$('cfdlm'),say2=t=>{if(msg)msg.innerHTML=t};let stage='inicio';
 try{if(btn)btn.disabled=true;say2('Preparando archivos…');
  stage='guardar datos';try{saveNow(true)}catch(e){}
  stage='leer base compartida';say2('Reuniendo usuarios y datos de todas las instituciones…');const sh=await pullShared();
  stage='reunir datos';const db=collectDB(sh);
  stage='leer el sistema';say2('Reuniendo el sistema…');let html=await sourceHtml();html=html.replace(new RegExp('<scr'+'ipt id="ndm-seed"[\\s\\S]*?<'+'/scr'+'ipt>\\s*','g'),'');
  stage='armar el paquete';const seed={__stamp:String(Date.now())};Object.keys(db.almacenamiento).forEach(k=>seed[k]=db.almacenamiento[k]);
  const tag='<scr'+'ipt id="ndm-seed" type="application/json">'+JSON.stringify(seed).replace(/</g,'\\u003c')+'<\/script>\n<script>try{var __e=document.getElementById("ndm-seed"),__d=JSON.parse(__e.textContent);if(!localStorage.getItem("ndm:seeded")){Object.keys(__d).forEach(function(k){if(k!=="__stamp"&&localStorage.getItem(k)===null)localStorage.setItem(k,__d[k])});localStorage.setItem("ndm:seeded",__d.__stamp)}}catch(e){}<\/script>\n';
  html=/<head[^>]*>/i.test(html)?html.replace(/<head[^>]*>/i,m=>m+'\n'+tag):tag+html;
  const enc=new TextEncoder(),z=makeZip([{name:'index.html',data:enc.encode(html)},{name:'404.html',data:enc.encode('<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./"><title>New Digital Marketing.edu</title></head><body><a href="./">Ir a New Digital Marketing.edu</a></body></html>')},{name:'LEEME.md',data:enc.encode(README(verTxt()))},{name:'respaldo-NO-SUBIR/base-de-datos.json',data:enc.encode(JSON.stringify(db,null,1))}]);
  stage='descargar';const name='ndm-sistema-y-base-de-datos-'+new Date().toISOString().slice(0,10)+'.zip',url=URL.createObjectURL(z);
  say2('Descarga lista: <a href="'+url+'" download="'+name+'" style="font-weight:700;color:var(--red)">'+name+'</a> ('+Math.round(z.size/1024)+' KB)');
  const a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),1000)
 }catch(e){say2('No se pudo generar la descarga (paso: '+stage+'): '+h(e&&e.message||e))}finally{if(btn)btn.disabled=false}}
window.__cfDownload=downloadAll;
function addDl(){const v=$('view');if(!v||(S.inst||0)!==0||S.user!=='Admin')return;const o=$('cfdl');if(o)o.remove();const d=document.createElement('div');d.className='card';d.id='cfdl';d.style.marginTop='12px';
 d.innerHTML='<h3>Sistema y base de datos</h3><p class="note">Descarga toda la plataforma (todas las instituciones) y sus datos para moverla a otro servidor o a otro repositorio de GitHub. Solo disponible para Admin en Colegio Ndm.edu.</p><button class="btn" id="cfdlb" onclick="__cfDownload()">Descargar sistema y base de datos de instituciones</button> <span class="note" id="cfdlm"></span>';v.appendChild(d)}
const ocf=V.config;V.config=function(){const r=ocf.apply(this,arguments);try{addDl()}catch(e){}return r};
const og=go;go=function(v){const r=og.apply(this,arguments);try{navPost();post(S.v)}catch(e){}return r};

/* ---------- panel ---------- */
let pend=null,confirmI=-1,open=false,editI=-1,editName='',editLogo=null;
function mount(){if($('cfgp'))return;const t=document.createElement('button');t.id='cftab';t.type='button';t.textContent='⚙ Configuración';t.onclick=()=>toggle();document.body.appendChild(t);
 const p=document.createElement('div');p.id='cfgp';p.setAttribute('role','dialog');p.setAttribute('aria-label','Configuración');document.body.appendChild(p);
 const v=document.createElement('div');v.id='cfver';document.body.appendChild(v);
 const f=document.createElement('input');f.type='file';f.id='cfFile';f.accept='image/*';f.className='cf-hide';document.body.appendChild(f);
 p.addEventListener('click',onClick);p.addEventListener('change',onChange);p.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.dataset.act==='rn'){editName=e.target.value;saveInst(+e.target.closest('.cfi').dataset.i)}});
 f.addEventListener('change',()=>{const i=+f.dataset.i,fl=f.files[0];f.value='';if(fl)stageLogo(i,fl)});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&open)toggle(false)})}
function toggle(v){open=v===undefined?!open:v;$('cfgp').classList.toggle('open',open);if(open)render()}
function panelPost(){const b=document.querySelector('#cfgp .cf-b');if(!b)return;const P=act();P.filter(p=>p.mod==='panel'&&(p.kind==='card'||p.kind==='table'||p.kind==='link'||p.kind==='img')).forEach(p=>b.appendChild(buildCard(p)));hidePass(b,P,'panel');textPass(b,P,'panel')}
function render(){const p=$('cfgp');if(!p)return;const _sb=p.querySelector('.cf-b'),_st=_sb?_sb.scrollTop:0;const keep=$('cfmsg')?{t:$('cfmsg').textContent,c:$('cfmsg').className}:null,tx=$('cfTxt')?$('cfTxt').value:'',nn=$('cfNew')?$('cfNew').value:'';
 const rows=[];for(let i=1;i<INST.length;i++){if(hid(i))continue;const ed=editI===i,lg=ed&&editLogo?editLogo.url:LG[i],im=lg?'<img alt="" src="'+h(lg)+'">':'';
  rows.push('<div class="cfi" data-i="'+i+'"><span class="sw" style="background:'+h(ed&&editLogo?mkTheme(editLogo.hex,editLogo.gray).a:colOf(i))+'"></span>'+im+(ed?'<input type="text" data-act="rn" value="'+h(editName)+'" aria-label="Nombre de la institución"><button class="ib" data-act="lg" title="Cambiar logo (lee sus colores)">🖼</button><button class="ib s" data-act="sv" title="Guardar">💾</button><button class="ib" data-act="cx" title="Cancelar">↩</button>':'<span class="nm">'+h(INST[i])+'</span><button class="ib" data-act="ed" title="Editar nombre y logo">✏️</button>'+(confirmI===i?'<button class="ib c" data-act="rm2">¿Quitar?</button>':'<button class="ib d" data-act="rm" title="Quitar">✕</button>'))+'</div>')}
 const hist=SYS.patches.slice(-6).reverse().map(x=>'<div class="lg"><b>'+('v. 0.0.'+x.v)+'</b> · '+h(x.txt)+'</div>').join('');
 p.innerHTML='<div class="cf-h"><b>⚙ Configuración</b><button class="cf-x" data-act="close" aria-label="Cerrar">×</button></div><div class="cf-b">'
 +'<p class="cf-legal">La presente plataforma le pertenece exclusivamente a New Digital Marketing.Edu<sup>®</sup> la cual fue creada por Juan Andrés Deza Meléndez, todo acto de infracción, copia o similitud será tomado con las medidas legales correspondientes. <b>®</b></p>'
 +'<div class="cf-row"><button class="cf-btn" data-act="opt" title="Reorganiza y compacta los ajustes sin cambiar el funcionamiento">⚡ Optimizar</button><button class="cf-btn" data-act="undo"'+(SYS.hist.length?'':' disabled')+'>↩ Volver a la versión anterior</button></div>'
 +'<h4>Instituciones educativas</h4><div class="lock">● New Digital Marketing.edu (principal, no se puede quitar)</div>'+rows.join('')
 +'<div class="add"><b>Agregar institución</b><input type="text" id="cfNew" placeholder="Nombre de la institución" value="'+h(nn)+'"><div class="cf-row"><button class="cf-btn" data-act="pick" type="button">🖼 Subir logo</button><input type="color" id="cfCol" value="'+h(pend?pend.shown:'#1f5bd8')+'" title="Color de la institución"></div>'
 +'<div class="det" id="cfDet">'+(pend?'<i style="background:'+h(pend.shown)+'"></i><span>Color leído del logo: <b>'+h(pend.shown)+'</b> · puedes ajustarlo</span>':'<span class="fl">Sube el logo y el sistema leerá sus colores; o elige uno a mano.</span>')+'</div><input type="file" id="cfNewLogo" accept="image/*" class="cf-hide"><button class="cf-btn p" data-act="add">+ Agregar institución</button></div>'
 +'<h4>Mejora</h4><textarea id="cfTxt" placeholder="Escribe lo que quieres mejorar, como si me lo pidieras a mí…">'+h(tx)+'</textarea><button class="cf-btn p" style="width:100%;margin-top:8px" data-act="mej">Aplicar mejora</button>'
 +'<p class="ex">Ejemplos:<br><code>Agrega en Plan anual un apartado "Presupuesto"</code><br><code>Cambia "Plan anual" por "Plan del año"</code><br><code>Agrega en CRM una tabla "Responsables" con columnas "Nombre, Cargo, Fecha"</code><br><code>Oculta "Eventos" en Planificación</code> · <code>Quita el módulo "Email Marketing"</code> · <code>Muestra "Eventos"</code><br><code>Agrega en Biblioteca un enlace "Manual" https://…</code><br><code>Mueve el módulo "CRM, Embudo Comercial y Matrículas" al inicio</code><br><b>Diseño:</b> <code>Cambia el color principal a azul</code> · <code>Pon los botones en #0e9aa7</code> · <code>Fondo del menú lateral negro</code> · <code>Cambia la letra a Georgia</code> · <code>Letra más grande</code> · <code>Bordes más redondeados</code> · <code>Quita las sombras</code> · <code>Diseño más compacto</code> · <code>Modo oscuro</code> · <code>Color principal verde en Católica School</code> · <code>css: .card{border:2px solid red}</code></p>'
 +(hist?'<h4>Mejoras aplicadas</h4>'+hist:'')+'<div id="cfmsg" class="msg" style="display:none"></div></div>';
 if(keep&&keep.t){const m=$('cfmsg');m.textContent=keep.t;m.className=keep.c;m.style.display='block'}try{panelPost()}catch(e){}const _nb=p.querySelector('.cf-b');if(_nb)_nb.scrollTop=_st;if(editI>=0){const ei=p.querySelector('.cfi input[data-act=rn]');if(ei&&document.activeElement!==ei)try{ei.focus({preventScroll:true})}catch(e){}}}
function onClick(e){const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act,row=b.closest('.cfi'),i=row?+row.dataset.i:-1;
 if(a==='close')toggle(false);else if(a==='opt')optimize();else if(a==='undo')revert();
 else if(a==='mej'){const ta=$('cfTxt');mejora(ta?ta.value:'')}
 else if(a==='rm'){confirmI=i;render()}else if(a==='rm2'){confirmI=-1;removeInst(i)}
 else if(a==='ed'){editI=i;editName=INST[i];editLogo=null;confirmI=-1;render()}
 else if(a==='cx'){editI=-1;editLogo=null;render()}
 else if(a==='sv')saveInst(i)
 else if(a==='lg'){const f=$('cfFile'),r=row&&row.querySelector('input[data-act=rn]');if(r)editName=r.value;f.dataset.i=i;f.click()}
 else if(a==='pick')$('cfNewLogo').click()
 else if(a==='add'){const nm=$('cfNew').value,hex=$('cfCol').value;if(addInst(nm,pend,hex)){pend=null;render()}}}
async function onChange(e){const t=e.target;
 if(t.dataset.act==='rn'){editName=t.value}
 else if(t.id==='cfNewLogo'&&t.files[0]){try{const r=await procLogo(t.files[0]);pend={url:r.url,gray:r.gray,light:r.light,manual:false,shown:mkTheme(r.hex,r.gray).a};const nn=$('cfNew').value;render();$('cfNew').value=nn}catch(er){say('No pude leer esa imagen.',1)}}
 else if(t.id==='cfCol'){if(pend){pend.manual=true;pend.shown=t.value}else pend={url:'',gray:false,light:false,manual:true,shown:t.value};const nn=$('cfNew').value;render();$('cfNew').value=nn}}
function updVer(){const v=$('cfver');if(v)v.innerHTML='<span>New Digital Marketing.edu</span><em>'+h(verTxt())+'</em>'}
function sync(){document.body.classList.toggle('inapp',inApp());try{ensureAccounts()}catch(e){}const on=!inApp()&&$('sch')&&$('sch').selectedIndex===0;['cftab','cfgp','cfver'].forEach(id=>{const e=$(id);if(e)e.classList.toggle('cf-hide',!on)});if(!on&&open){open=false;const p=$('cfgp');if(p)p.classList.remove('open')}}
/* ---------- usuarios únicos por institución ---------- */
function inferInst(u){for(let i=0;i<INST.length;i++){const keys=['ndm:data:'+INST[i]];try{for(let k=0;k<localStorage.length;k++){const key=localStorage.key(k);if(key&&key.indexOf('ndm:data:')===0&&key.slice(-(INST[i].length+1))===':'+INST[i])keys.push(key)}}catch(e){}
  for(const key of keys){try{const r=JSON.parse(LSget(key)||'null');if(r&&r.data&&Array.isArray(r.data.users)&&r.data.users.some(x=>x[2]===u))return SL[i]}catch(e){}}}return null}
function adminOf(sl){return ACC.find(a=>a.u==='Admin'&&a.inst===sl)}
function ensureAccounts(){if(inApp())return false;let ch=false;
 ACC.forEach(a=>{if(!a.inst){a.inst=(a.u==='Admin'||a.u==='Prueba')?SL[0]:(inferInst(a.u)||SL[0]);ch=true}});
 for(let j=ACC.length-1;j>=0;j--){const a=ACC[j];if(a.adm&&a.u==='admin-'+a.inst){ACC.splice(j,1);ch=true}}
 for(let i=0;i<INST.length;i++){if(hid(i))continue;const sl=SL[i];if(adminOf(sl))continue;ACC.push({u:'Admin',p:'Admin',rol:'Administrador',ed:true,inst:sl});ch=true}
 if(ch){saveAcc();loadPerm()}return ch}
const oen0=enter;enter=function(){const u=$('u').value.trim(),pw=$('p').value,a=ACC.find(x=>x.u.toLowerCase()===u.toLowerCase()&&instOf(x)===SL[$('sch').selectedIndex]);
 
 return oen0.apply(this,arguments)};
const oat=applyTheme;applyTheme=function(i){if(hid(i)){i=0;$('sch').selectedIndex=0}const r=oat(i);document.body.dataset.inst=i;sync();return r};
const oen=enter;enter=function(){const r=oen.apply(this,arguments);sync();return r};
setInterval(sync,900);

/* ---------- salida: color + logo de la institución, luego el inicio de sesión ---------- */
function spColor(i){return i===1?'#000':(SPLBG[i]||(TH[i]&&TH[i].a)||'#d92020')}
const olo=logout;logout=function(){try{const c=spColor(S.inst||0);localStorage.setItem('ndm:spbg',c);document.documentElement.style.setProperty('background',c,'important');sessionStorage.setItem('ndm:splash','1');localStorage.setItem('ndm:splash','1')}catch(e){}return olo.apply(this,arguments)};
function splash(i){const bg=SPLBG[i]||(TH[i]&&TH[i].a)||'#d92020',light=!!LIGHT[i]||(i>=BASE?!!(SYS.insts.added[i-BASE]||{}).light:!!SYS.insts.light[i]&&!!LG[i]&&LG[i]===SYS.insts.logos[i]);
 const s=document.createElement('div');s.id='splash';s.style.background=i===1?'radial-gradient(circle at 20% 20%,#3a3a3a,transparent 45%),radial-gradient(circle at 85% 80%,#555,transparent 45%),#000':'radial-gradient(circle at 15% 15%,rgba(255,255,255,.28),transparent 45%),radial-gradient(circle at 85% 85%,rgba(0,0,0,.28),transparent 50%),'+bg;
 const c=document.createElement('div');c.className='sc'+(light?'':' card');c.style.setProperty('--red',i===0?'#FC3030':bg);c.innerHTML=logoOf(i,true);s.appendChild(c);const b=document.createElement('div');b.className='sb';b.innerHTML='<i></i>';s.appendChild(b);document.body.appendChild(s);
 let gone=0;const end=()=>{if(gone)return;gone=1;const sb=document.getElementById('spboot');if(sb)sb.remove();s.classList.add('out');setTimeout(()=>s.remove(),650)};s.addEventListener('click',end);setTimeout(end,1500)}


/* ---------- PIN para volver al inicio de New Digital Marketing.edu ---------- */
let pinTry=0,pinLock=0;
window.ndmPin=function(){if($('pinbk'))return;const bk=document.createElement('div');bk.id='pinbk';bk.innerHTML='<div id="pinbx" role="dialog" aria-label="PIN de acceso"><h4>🔒 PIN de acceso</h4><p>Ingresa el PIN de 6 dígitos para ir al inicio de New Digital Marketing.Edu</p><input id="pinin" type="password" inputmode="numeric" autocomplete="off" maxlength="6"><div class="pe" id="pine"></div><div class="pr"><button type="button" id="pinx">Cancelar</button><button type="button" class="p" id="pinok">Entrar</button></div></div>';document.body.appendChild(bk);
 const inp=$('pinin'),er=$('pine'),close=()=>bk.remove(),go=()=>{if(Date.now()<pinLock){er.textContent='Demasiados intentos. Espera '+Math.ceil((pinLock-Date.now())/1000)+' s.';return}const v=inp.value.trim();if(!/^\d{6}$/.test(v)){er.textContent='El PIN tiene 6 dígitos.';return}
  if(v==='050300'){pinTry=0;close();backDemo()}else{pinTry++;inp.value='';er.textContent='PIN incorrecto.';const bx=$('pinbx');bx.classList.remove('sh');void bx.offsetWidth;bx.classList.add('sh');if(pinTry>=5){pinTry=0;pinLock=Date.now()+30000;er.textContent='Demasiados intentos. Espera 30 s.'}}};
 inp.addEventListener('input',()=>{inp.value=inp.value.replace(/\D/g,'');er.textContent=''});inp.addEventListener('keydown',e=>{if(e.key==='Enter')go();if(e.key==='Escape')close()});$('pinok').onclick=go;$('pinx').onclick=close;bk.addEventListener('mousedown',e=>{if(e.target===bk)close()});setTimeout(()=>inp.focus(),30)};

/* ---------- sincronización compartida (si la plataforma la ofrece) ---------- */
async function startSync(){if(!window.claude||!claude.use)return;let db;try{db=await claude.use('db')}catch(e){return}if(!db)return;const ref=db.doc('g_cfg/system');let last='',ready=false;
 pushFn=()=>{if(!ready)return;const s=JSON.stringify(shared());if(s!==last){last=s;ref.set({s}).catch(()=>{})}};
 ref.onSnapshot(sn=>{if(sn.metadata&&sn.metadata.hasPendingWrites)return;if(!(sn.metadata&&sn.metadata.fromCache)){if(!ready){ready=true;if(!sn.exists&&SYS.t)setTimeout(()=>pushFn&&pushFn(),50)}}
  if(sn.exists){const s=(sn.data()||{}).s;if(s&&s!==last){try{const o=JSON.parse(s);if(o&&Array.isArray(o.patches)&&(o.t||0)>(SYS.t||0)){last=s;SYS.ver=o.ver;SYS.pid=o.pid;SYS.patches=o.patches;SYS.insts=Object.assign(blank().insts,o.insts||{});SYS.cdata=o.cdata||{};SYS.t=o.t;LSset(KEY,JSON.stringify(SYS));applyAll();if(open)render()}}catch(e){}}}},()=>{})}

/* ---------- arranque ---------- */
try{migrate('Colegio Demo',INST[0])}catch(e){}
mount();applyAll();render();try{const it=[...document.querySelectorAll('#world>.it')],P=[null,null,{l:'6%',t:'10%'},{r:'20%',t:'33%'},{l:'8%',b:'14%'},{r:'6%',t:'11%'},{r:'7%',t:'58%'},{r:'22%',b:'10%'},{l:'18%',t:'38%'},null];it.forEach((e,i)=>{const p=P[i];if(!p){e.remove();return}e.style.left=p.l||'auto';e.style.right=p.r||'auto';e.style.top=p.t||'auto';e.style.bottom=p.b||'auto'})}catch(e){}try{document.querySelectorAll('.cb').forEach((c,i)=>{c.style.animationName='cbs'+(i%3+1);c.style.animationDuration=[44,36,52][i%3]+'s'})}catch(e){}
{const B=window.__B||{},ix=SL.indexOf(B.h);if(ix>0&&!hid(ix)){$('sch').selectedIndex=ix;applyTheme(ix)}
 if(B.sp){try{splash($('sch').selectedIndex)}catch(e){}}}
startSync();
})();
