import type { AgreementBlock } from "./agreement-pdf";

export interface AgreementFields {
  name: string;
  role: string;
  date: string; // ISO yyyy-mm-dd
  deliverables: string; // one per line - what is to be delivered
  responsibilities: string; // one per line - terms / expectations
  startDate: string; // ISO
  endDate: string; // ISO
  compensation: string; // e.g. 16000
  paymentTerms: string;
}

export const ROLES = [
  "Graphic Designer",
  "Video Editor",
  "Content Writer",
  "Social Media Manager",
  "UI/UX Designer",
  "Web Developer",
  "SEO Specialist",
  "Photographer",
  "Videographer",
  "Voice-over Artist",
  "Animator",
  "Digital Marketing Executive",
];

const COMPANY = "Pixelate Nest";

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

const lines = (t: string) => (t || "").split("\n").map((x) => x.trim()).filter(Boolean);

function workBlocks(f: AgreementFields): AgreementBlock[] {
  const deliverables = lines(f.deliverables);
  const resp = lines(f.responsibilities);
  const amt = Number(f.compensation);
  const b: AgreementBlock[] = [
    { type: "p", text: `We are pleased to assign you the role of ${f.role} for our ongoing projects at ${COMPANY}.` },
  ];
  if (deliverables.length) {
    b.push({ type: "p", text: "Work deliverables:" }, { type: "bullets", items: deliverables });
  }
  if (resp.length) {
    b.push({ type: "p", text: "Your key responsibilities will include:" }, { type: "bullets", items: resp });
    b.push({
      type: "p",
      text: "You are expected to maintain consistency, ensure timely execution, and provide regular updates on progress and performance.",
    });
  }
  if (f.startDate && f.endDate)
    b.push({ type: "kv", label: "Project Duration", value: `${fmtLong(f.startDate)} - ${fmtLong(f.endDate)}` });
  if (amt)
    b.push({ type: "kv", label: "Compensation", value: `₹${amt.toLocaleString("en-IN")} (as per agreed payment terms)` });
  if (f.paymentTerms?.trim()) b.push({ type: "p", text: f.paymentTerms.trim() });
  b.push({
    type: "p",
    text: "This agreement does not constitute employment and is strictly a freelance/contract-based engagement.",
  });
  return b;
}

function ndaBlocks(): AgreementBlock[] {
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

/** Every agreement = Work Agreement + NDA, in one PDF under one Ref no. */
export function buildDocuments(f: AgreementFields) {
  return [
    { title: "WORK AGREEMENT DOCUMENT", subject: `Assignment of Role – ${f.role}`, blocks: workBlocks(f) },
    { title: "NON-DISCLOSURE AGREEMENT (NDA)", subject: "Confidentiality & Non-Disclosure Agreement", blocks: ndaBlocks() },
  ];
}

export const SIGNATORY = {
  name: "Labh Chandra Bothra",
  designation: "Co-Founder",
  company: COMPANY,
};
