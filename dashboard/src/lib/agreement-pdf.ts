import fs from "fs/promises";
import path from "path";
import { PDFDocument, PDFFont, PDFPage, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/**
 * Agreement PDF generator.
 * Draws text at explicit x/y positions on top of public/assets/letterhead.pdf.
 * Each new page is created by copying the letterhead page again.
 */

export const AGREEMENT_PREFIX = "KTSLLP/AGREEMENT/";

export type AgreementBlock =
  | { type: "p"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "kv"; label: string; value: string }
  | { type: "space"; size?: number };

export interface AgreementContent {
  agreementNo: string; // e.g. KTSLLP/AGREEMENT/0001
  date: string; // display string, e.g. 04/05/2026
  toName: string;
  /** Each document starts on a fresh letterhead page, all share the same Ref no. */
  documents: { title: string; subject: string; blocks: AgreementBlock[] }[];
  signatory: { name: string; designation: string; company: string };
  recipient: { name: string; designation: string };
  includeCompanySign?: boolean;
}

// ---- Layout (A4 = 595.28 x 841.89 pt, origin bottom-left) ----
const PAGE_H = 841.89;
const MARGIN_X = 58;
const CONTENT_TOP = PAGE_H - 140; // below letterhead header (ends ~117pt from top)
const CONTENT_BOTTOM = 88; // above letterhead footer (starts ~65pt from bottom)
const BODY_SIZE = 11;
const LINE_H = 16;
const TITLE_SIZE = 16;
const INK = rgb(0.07, 0.07, 0.09);

const publicPath = (...p: string[]) => path.join(process.cwd(), "public", ...p);

export function formatAgreementNo(n: number) {
  return `${AGREEMENT_PREFIX}${String(n).padStart(4, "0")}`;
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const out: string[] = [];
  for (const para of text.split("\n")) {
    const words = para.split(/\s+/).filter(Boolean);
    if (!words.length) {
      out.push("");
      continue;
    }
    let line = "";
    for (const w of words) {
      const t = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(t, size) <= maxW) line = t;
      else {
        if (line) out.push(line);
        line = w;
      }
    }
    out.push(line);
  }
  return out;
}

export async function generateAgreementPdf(c: AgreementContent): Promise<Uint8Array> {
  const [letterheadBytes, regBytes, boldBytes, signBytes] = await Promise.all([
    fs.readFile(publicPath("assets", "letterhead.pdf")),
    fs.readFile(publicPath("fonts", "NotoSans-Regular.ttf")),
    fs.readFile(publicPath("fonts", "NotoSans-Bold.ttf")),
    c.includeCompanySign !== false
      ? fs.readFile(publicPath("assets", "images", "sign.png")).catch(() => null)
      : Promise.resolve(null),
  ]);

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(regBytes, { subset: true });
  const bold = await doc.embedFont(boldBytes, { subset: true });
  const sign = signBytes ? await doc.embedPng(signBytes) : null;

  const [letterhead] = await doc.embedPdf(letterheadBytes, [0]);
  const { width: PAGE_W, height } = letterhead;

  let page!: PDFPage;
  let y = 0;
  const textW = PAGE_W - MARGIN_X * 2;

  const newPage = () => {
    page = doc.addPage([PAGE_W, height]);
    page.drawPage(letterhead, { x: 0, y: 0 });
    y = CONTENT_TOP;
  };
  const ensure = (h: number) => {
    if (y - h < CONTENT_BOTTOM) newPage();
  };
  const draw = (t: string, x: number, size = BODY_SIZE, f = font) =>
    page.drawText(t, { x, y, size, font: f, color: INK });

  for (let di = 0; di < c.documents.length; di++) {
  const d = c.documents[di];
  newPage();

  // Agreement no. (left) and date (right) on the same row
  draw(`Ref: ${c.agreementNo}`, MARGIN_X, 9.5, bold);
  const dateTxt = `Date: ${c.date}`;
  draw(dateTxt, PAGE_W - MARGIN_X - font.widthOfTextAtSize(dateTxt, BODY_SIZE), BODY_SIZE);
  y -= 34;

  // Title (centered, bold)
  const tw = bold.widthOfTextAtSize(d.title, TITLE_SIZE);
  draw(d.title, (PAGE_W - tw) / 2, TITLE_SIZE, bold);
  y -= 34;

  // Addressee
  for (const l of ["To,", c.toName]) {
    draw(l, MARGIN_X);
    y -= LINE_H;
  }
  for (const l of wrap(`Subject: ${d.subject}`, bold, BODY_SIZE, textW)) {
    draw(l, MARGIN_X, BODY_SIZE, bold);
    y -= LINE_H;
  }
  draw(`Dear ${c.toName},`, MARGIN_X);
  y -= LINE_H + 8;

  // Body blocks
  for (const b of d.blocks) {
    if (b.type === "space") {
      y -= b.size ?? 8;
    } else if (b.type === "p") {
      const lines = wrap(b.text, font, BODY_SIZE, textW);
      for (const l of lines) {
        ensure(LINE_H);
        draw(l, MARGIN_X);
        y -= LINE_H;
      }
      y -= 6;
    } else if (b.type === "kv") {
      const lines = wrap(`${b.label}: ${b.value}`, font, BODY_SIZE, textW);
      lines.forEach((l, i) => {
        ensure(LINE_H);
        if (i === 0) {
          const lab = `${b.label}:`;
          draw(lab, MARGIN_X, BODY_SIZE, bold);
          draw(l.slice(lab.length), MARGIN_X + bold.widthOfTextAtSize(lab, BODY_SIZE));
        } else draw(l, MARGIN_X);
        y -= LINE_H;
      });
      y -= 4;
    } else if (b.type === "bullets") {
      const indent = 16;
      for (const item of b.items) {
        const lines = wrap(item, font, BODY_SIZE, textW - indent);
        lines.forEach((l, i) => {
          ensure(LINE_H);
          if (i === 0) draw("•", MARGIN_X + 4);
          draw(l, MARGIN_X + indent);
          y -= LINE_H;
        });
        y -= 3;
      }
      y -= 4;
    }
  }

  // Signature block — keep together on one page
  const SIGN_H = 104;
  ensure(SIGN_H);
  y -= 8;
  draw("Sincerely,", MARGIN_X);
  y -= 8;
  const sigTop = y;
  if (sign) {
    const w = 100;
    const h = (sign.height / sign.width) * w;
    page.drawImage(sign, { x: MARGIN_X, y: sigTop - h, width: w, height: h });
  }
  y = sigTop - 50;
  const left = [c.signatory.name, c.signatory.designation, c.signatory.company];
  const rightX = PAGE_W - MARGIN_X - 170;
  const right = [c.recipient.name, c.recipient.designation];
  const rowY = y;
  left.forEach((l, i) => {
    page.drawText(l, { x: MARGIN_X, y: rowY - i * LINE_H, size: BODY_SIZE, font: i === 0 ? bold : font, color: INK });
  });
  // Recipient signature line (left blank for Adobe Sign placement)
  page.drawLine({
    start: { x: rightX, y: rowY + 14 },
    end: { x: PAGE_W - MARGIN_X, y: rowY + 14 },
    thickness: 0.6,
    color: rgb(0.4, 0.4, 0.45),
  });
  right.forEach((l, i) => {
    page.drawText(l, { x: rightX, y: rowY - i * LINE_H, size: BODY_SIZE, font: i === 0 ? bold : font, color: INK });
  });

  }

  doc.setTitle(`Agreement - ${c.agreementNo}`);
  doc.setAuthor("Kalahanu Tech Studios LLP");
  return doc.save();
}
