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
