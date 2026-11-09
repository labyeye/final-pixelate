import type { AgreementBlock } from "./agreement-pdf";

export type AgreementType = "work" | "nda";

export interface AgreementFields {
  type: AgreementType;
  name: string;
  role: string; // e.g. Graphic Designer
  date: string; // ISO yyyy-mm-dd
  // work agreement only
  responsibilities?: string; // one per line
  startDate?: string; // ISO
  endDate?: string; // ISO
  compensation?: string; // e.g. 16000
  paymentTerms?: string;
}

const COMPANY = "Pixelate Nest";

export const DEFAULT_RESPONSIBILITIES = [
  "Creating 40 Graphics Designs",
  "Follow brand guidelines to ensure consistency across all platforms",
  "The Designer will provide up to 2–3 revisions per design. Additional revisions will be chargeable.",
  "The Designer is required to submit all designs at least 2 days prior to the scheduled posting dates (Monday and Friday) for review, approval, and revisions.",
  "All designs must meet professional standards and follow brand guidelines. Repeated low-quality work may lead to termination.",
  "Delays without prior notice may result in payment deductions or contract termination.",
].join("\n");

export const DEFAULT_PAYMENT_TERMS =
  "Payment will be processed 20% on 4th May, 2026, 30% on 20th May, 2026, rest 50% on 1 June, 2026.";

/** 2026-05-04 -> 04/05/2026 */
export function fmtDMY(iso?: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** 2026-05-04 -> 4 May, 2026 */
export function fmtLong(iso?: string) {
  if (!iso) return "";
  const dt = new Date(`${iso}T00:00:00`);
  return `${dt.getDate()} ${dt.toLocaleString("en-GB", { month: "long" })}, ${dt.getFullYear()}`;
}

export function titleFor(type: AgreementType) {
  return type === "nda" ? "NON-DISCLOSURE AGREEMENT (NDA)" : "WORK AGREEMENT DOCUMENT";
}

export function subjectFor(f: AgreementFields) {
  return f.type === "nda"
    ? "Confidentiality & Non-Disclosure Agreement"
    : `Assignment of Role – ${f.role}`;
}

export function buildBlocks(f: AgreementFields): AgreementBlock[] {
  if (f.type === "nda") {
    return [
      { type: "p", text: `This letter serves as a formal Non-Disclosure Agreement (NDA) between you and ${COMPANY}.` },
      {
        type: "p",
        text: "During the course of your engagement, you may have access to confidential information including, but not limited to, business strategies, client data, content, designs, marketing plans, financial information, and internal processes.",
      },
      { type: "p", text: "You agree to the following:" },
      {
        type: "bullets",
        items: [
          "Not to disclose, share, or distribute any confidential information to any third party without prior written consent",
          "Not to use any confidential information for personal or external purposes",
          "To maintain strict confidentiality of all data, files, and materials shared during the project",
          "To return or delete all company-related data upon completion of your work or termination of engagement",
        ],
      },
      { type: "p", text: "This obligation of confidentiality will continue even after the completion or termination of your role with the company." },
      { type: "p", text: "Any breach of this agreement may result in immediate termination and may lead to legal action as per applicable laws." },
      { type: "p", text: `By continuing your work with ${COMPANY}, you acknowledge and agree to abide by the terms stated above.` },
    ];
  }

  const items = (f.responsibilities || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const amt = Number(f.compensation);
  const blocks: AgreementBlock[] = [
    { type: "p", text: `We are pleased to assign you the role of ${f.role} for our ongoing projects at ${COMPANY}.` },
    { type: "p", text: "Your key responsibilities will include:" },
    { type: "bullets", items },
    {
      type: "p",
      text: "You are expected to maintain consistency, ensure timely execution, and provide regular updates on progress and performance.",
    },
  ];
  if (f.startDate && f.endDate)
    blocks.push({ type: "kv", label: "Project Duration", value: `${fmtLong(f.startDate)} - ${fmtLong(f.endDate)}` });
  if (amt)
    blocks.push({
      type: "kv",
      label: "Compensation",
      value: `₹${amt.toLocaleString("en-IN")} (as per agreed payment terms)`,
    });
  if (f.paymentTerms?.trim()) blocks.push({ type: "p", text: f.paymentTerms.trim() });
  blocks.push({
    type: "p",
    text: "This agreement does not constitute employment and is strictly a freelance/contract-based engagement.",
  });
  return blocks;
}

export const SIGNATORY = {
  name: "Labh Chandra Bothra",
  designation: "Co-Founder",
  company: COMPANY,
};
