
addEventListener('pageshow',function(e){if(e.persisted)location.reload()});
logout=function(){saveNow();noSave=true;document.documentElement.style.visibility='hidden';setTimeout(function(){document.documentElement.style.visibility=''},3000);location.reload()};
requestAnimationFrame(function(){requestAnimationFrame(function(){var b=document.getElementById('boot');if(b)b.remove()})});
