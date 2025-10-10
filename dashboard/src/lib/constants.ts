// Client-safe runtime constants. Keep this file free of any server-only imports.
// include 'not called' as default for new imports
export const leadStatuses = ['not called', 'called', 'not interested', 'meeting booked', 'interested', 'call back later', 'other'] as const;

export type LeadStatus = (typeof leadStatuses)[number];
