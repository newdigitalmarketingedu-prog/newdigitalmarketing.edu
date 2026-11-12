
/* ---- Sincronización en tiempo real entre todos los usuarios ---- */
(function(){
const KEYS=[...new Set([...DK,'comp','media','enc','mej','rend','ideas','roi'])].filter(k=>k!=='mesSel');KEYS.push('atlOwn');
let col=null,ready=false,started=false,warned=0;const last={},pend={},fly={};
const rep=(k,v)=>k==='u'?undefined:v;
function pack(k){const v=k==='atlOwn'?S.atl.filter(p=>p.i===S.inst):S[k];if(v===undefined)return null;let s=JSON.stringify(v,rep);if(k==='posts'&&s.length>240000){s=JSON.stringify(v.map(p=>Object.assign({},p,{img:''})),rep);if(!pack.w){pack.w=1;toast('Las imágenes superan el límite compartido; algunas no se sincronizarán.')}}return s}
const busy=()=>{const a=document.activeElement,v=$('view');if(S.ed||S.pe!=null||S.oed)return true;if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&a.type!=='checkbox'&&v.contains(a))return true;return [...v.querySelectorAll('input,textarea')].some(e=>e.type==='file'?e.files.length:(e.type!=='checkbox'&&e.value!==e.defaultValue))};
function render(){if(!S.user||!V[S.v])return;const y=scrollY;try{V[S.v]()}catch(e){}scrollTo(0,y)}
function flush(){if(!Object.keys(pend).length||busy())return;let ch=0;for(const k in pend){const s=pend[k];delete pend[k];last[k]=s;try{const v=JSON.parse(s);if(k==='atlOwn')S.atl=S.atl.filter(p=>p.i!==S.inst).concat(v);else S[k]=v;ch=1}catch(e){}}if(ch)render()}
async function start(){if(started||!S.user)return;const db=await claude.use('db');if(!db)return;started=true;col=db.collection('i_'+SL[S.inst||0]);
 col.onSnapshot(sn=>{sn.docChanges().forEach(c=>{if(c.type==='removed')return;const d=c.doc;if(d.metadata&&d.metadata.hasPendingWrites)return;const dt=d.data(),s=dt&&dt.s;if(typeof s!=='string'||!KEYS.includes(d.id))return;if(s!==last[d.id])pend[d.id]=s;else delete pend[d.id]});if(!(sn.metadata&&sn.metadata.fromCache))ready=true;flush()},()=>toast('No se pudo sincronizar los datos compartidos.'))}
setInterval(()=>{if(!ready||!col)return;KEYS.forEach(k=>{if(pend[k]||fly[k])return;const s=pack(k);if(s===null||s===last[k])return;fly[k]=1;last[k]=s;col.doc(k).set({s}).catch(()=>{last[k]=undefined;if(!warned){warned=1;toast('No tienes permiso para guardar cambios compartidos.')}}).finally(()=>{fly[k]=0})})},1200);
setInterval(flush,700);
const oen=enter;enter=function(){oen();if($('app').style.display==='block')start()};
/* cuentas y permisos compartidos */
let lastAcc,accReady=false;
async function startAcc(){if(!window.claude)return;const db=await claude.use('db');if(!db)return;const ref=db.doc('g_cfg/accounts');
 ref.onSnapshot(sn=>{if(sn.metadata&&sn.metadata.hasPendingWrites)return;if(!(sn.metadata&&sn.metadata.fromCache))accReady=true;if(sn.exists){const s=(sn.data()||{}).s;if(s&&s!==lastAcc){try{const o=JSON.parse(s);if(Array.isArray(o.acc)&&o.acc.some(a=>a.u==='Admin')){lastAcc=s;ACC.length=0;o.acc.forEach(a=>ACC.push(a));PERM=o.perm||PERM;saveAcc();LSset('ndm:perms',JSON.stringify(PERM));if(S.user&&S.v==='config'&&!busy())render()}}catch(e){}}}},()=>{});
 setInterval(()=>{if(!accReady)return;const s=JSON.stringify({acc:ACC,perm:PERM});if(s!==lastAcc){lastAcc=s;ref.set({s}).catch(()=>{})}},1500)}
startAcc();
})();
