#!/usr/bin/env python3
"""Arma index.html (un solo archivo) a partir de src/, uniendo los archivos en el orden original."""
import re, pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
tpl = (src / "index.template.html").read_text(encoding="utf-8")
def inline(m):
    tag, a, files, b = m.group(1), m.group(2), m.group(3), m.group(4)
    body = "".join((src / f).read_text(encoding="utf-8") for f in files.split(","))
    return f"<{tag}{a}{b}>{body}</{tag}>"
out = re.sub(r'<(style|script)([^>]*?) data-src="([^"]+)"([^>]*)></\1>', inline, tpl)
(root / "index.html").write_text(out, encoding="utf-8")
print("Listo: index.html", len(out), "caracteres")
