"""PDF -> assets/docs/user-manual/<sub>/pages/pNN.webp + cover.webp.  python render-nesthr-manual.py [hr|leads]
(needs: pip install pymupdf pillow)"""
import os, sys, pymupdf
from PIL import Image
from manuals_config import MANUALS, d
m = MANUALS[sys.argv[1] if len(sys.argv) > 1 else "hr"]
base = d(m); out = base + "/pages"; os.makedirs(out, exist_ok=True)
for i, p in enumerate(pymupdf.open(os.path.join(os.path.dirname(base) if m["sub"] else base, m["pdf"])), 1):
    pix = p.get_pixmap(matrix=pymupdf.Matrix(1.6, 1.6))
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    im.save(f"{out}/p{i:02d}.webp", "WEBP", quality=78)
    if i == 1:
        im.resize((420, int(420 * im.height / im.width))).save(base + "/cover.webp", "WEBP", quality=82)
print("rendered", i)
