import fs from "fs";
import path from "path";
import { PDFDocument, rgb, PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

// Fills the blanks of src/assets/welcomecertificate.pdf (A4 landscape, 842x595 pt) with DM Sans text.
// Coordinates are pt measured from the page's top-left, read off the template's own text boxes.
const DIR = path.join(process.cwd(), "src", "assets");
const H = 595.28;
const INK = rgb(0.07, 0.07, 0.07);

function draw(page: any, font: PDFFont, text: string, cx: number, base: number, size: number, track: number, maxW: number) {
  const width = (sz: number) => font.widthOfTextAtSize(text, sz) + track * Math.max(text.length - 1, 0) * (sz / size);
  let sz = size;
  while (width(sz) > maxW && sz > size * 0.5) sz -= 0.25; // shrink long names/products to fit the blank
  const tr = track * (sz / size);
  let x = cx - width(sz) / 2;
  for (const ch of text) {
    page.drawText(ch, { x, y: H - base, size: sz, font, color: INK });
    x += font.widthOfTextAtSize(ch, sz) + tr;
  }
}

export async function makeCertificate(a: { name: string; product: string; validTill?: Date | string; date?: Date }) {
  const fmt = (d: Date | string, o: Intl.DateTimeFormatOptions) => new Date(d).toLocaleDateString("en-GB", o);
  const doc = await PDFDocument.load(fs.readFileSync(path.join(DIR, "welcomecertificate.pdf")));
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(fs.readFileSync(path.join(DIR, "DMSans.ttf")), { subset: true });
  const page = doc.getPage(0);
  draw(page, font, a.name.toUpperCase(), 420.6, 333, 26, 5, 480);
  draw(page, font, a.product, 332, 369, 11.2, 0, 72);
  if (a.validTill) draw(page, font, fmt(a.validTill, { day: "2-digit", month: "short", year: "numeric" }), 461, 384, 11.2, 0, 56);
  draw(page, font, fmt(a.date ?? new Date(), { day: "2-digit", month: "long", year: "numeric" }).toUpperCase(), 645.5, 492, 8.6, 2, 112);
  return doc.save();
}
