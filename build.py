#!/usr/bin/env python3
"""Ensambla index.html (archivo único) desde src/. Uso: python3 build.py [salida]"""
import re,sys,os,subprocess
R=os.path.dirname(os.path.abspath(__file__));S=os.path.join(R,'src')
args=[a for a in sys.argv[1:] if not a.startswith('--')]
MIN='--min' in sys.argv   # --min: archivo final compacto (CSS y JS sin comentarios ni espacios). Sin --min: legible.
import shutil
ESB=shutil.which('esbuild') or '/opt/npm-tools/node_modules/.bin/esbuild'
out=args[0] if args else os.path.join(R,'index.html')

def mincss(c):
    """Compacta CSS sin tocar cadenas ni url(...). Quita comentarios y espacios redundantes."""
    toks=re.split(r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|url\([^)]*\))',c)
    o=[]
    for i,x in enumerate(toks):
        if i%2:o.append(x);continue
        x=re.sub(r'/\*.*?\*/','',x,flags=re.S)
        x=re.sub(r'\s+',' ',x)
        x=re.sub(r' ?([{};,]) ?',r'\1',x)
        o.append(x)
    return ''.join(o).replace(';}','}').strip()
t=open(os.path.join(S,'index.template.html'),encoding='utf-8').read()
t=re.sub(r'\{\{([\w./-]+)\}\}',lambda m:open(os.path.join(S,m.group(1)),encoding='utf-8').read(),t)
def minjs(j):
    r=subprocess.run([ESB,'--loader=js','--minify-whitespace','--charset=utf8'],input=j,capture_output=True,text=True)
    if r.returncode:print('esbuild falló, se deja sin compactar');return j
    return r.stdout
if MIN and os.path.exists(ESB):t=re.sub(r'(<script>)(.*?)(</script>)',lambda m:m.group(1)+minjs(m.group(2))+m.group(3),t,flags=re.S)
if MIN:t=re.sub(r'(<style[^>]*>)(.*?)(</style>)',lambda m:m.group(1)+mincss(m.group(2))+m.group(3),t,flags=re.S)
open(out,'w',encoding='utf-8').write(t)
bad=0
for m in re.finditer(r'<script>(.*?)</script>',t,re.S):
    open('/tmp/_chk.js','w').write(m.group(1))
    r=subprocess.run(['node','--check','/tmp/_chk.js'],capture_output=True,text=True)
    if r.returncode:bad=1;print('ERR',r.stderr[:300])
print('build OK' if not bad else 'build FAIL',len(t),'bytes')
