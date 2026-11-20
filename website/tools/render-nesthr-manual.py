"""PDF -> assets/docs/user-manual/pages/pNN.webp + cover.webp (needs: pip install pymupdf pillow)."""
import os, pymupdf
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = os.path.join(ROOT, "assets/docs/user-manual"); out = d + "/pages"; os.makedirs(out, exist_ok=True)
for i, p in enumerate(pymupdf.open(d + "/NestHR_Web_User_Manual.pdf"), 1):
    pix = p.get_pixmap(matrix=pymupdf.Matrix(1.6, 1.6))
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    im.save(f"{out}/p{i:02d}.webp", "WEBP", quality=78)
    if i == 1:
        im.resize((420, int(420 * im.height / im.width))).save(d + "/cover.webp", "WEBP", quality=82)
