
addEventListener('pageshow',function(e){if(e.persisted)location.reload()});
logout=function(){saveNow();noSave=true;var ii=String(S.inst||0);try{localStorage.setItem('ndm:lastInst',ii)}catch(e){}try{sessionStorage.setItem('ndm:lastInst',ii)}catch(e){}try{location.replace('#'+SL[+ii])}catch(e){}document.documentElement.style.visibility='hidden';setTimeout(function(){document.documentElement.style.visibility=''},3000);location.reload()};
requestAnimationFrame(function(){requestAnimationFrame(function(){var b=document.getElementById('boot');if(b)b.remove()})});
