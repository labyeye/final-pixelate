// Client-safe runtime constants. Keep this file free of any server-only imports.
export const leadStatuses = ['called', 'not interested', 'meeting booked', 'interested', 'call back later', 'other'] as const;

export type LeadStatus = (typeof leadStatuses)[number];
