export const leadStatuses = [
  "not called",
  "called",
  "not interested",
  "meeting booked",
  "interested",
  "call back later",
  "converted",
  "other",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const leadStatusColors: Record<string, string> = {
  "not called": "bg-gray-100 text-gray-700 border-gray-300",
  called: "bg-blue-100 text-blue-700 border-blue-300",
  interested: "bg-green-100 text-green-700 border-green-300",
  "meeting booked": "bg-purple-100 text-purple-700 border-purple-300",
  "call back later": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "not interested": "bg-red-100 text-red-700 border-red-300",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-300",
  other: "bg-orange-100 text-orange-700 border-orange-300",
};

export const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  low: "bg-green-100 text-green-700 border-green-300",
};

export const clientStatuses = [
  "active",
  "inactive",
  "prospect",
  "churned",
] as const;
export type ClientStatus = (typeof clientStatuses)[number];

export const clientStatusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-300",
  inactive: "bg-gray-100 text-gray-700 border-gray-300",
  prospect: "bg-blue-100 text-blue-700 border-blue-300",
  churned: "bg-red-100 text-red-700 border-red-300",
};
