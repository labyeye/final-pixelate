

export const leadStatuses = ['not called', 'called', 'not interested', 'meeting booked', 'interested', 'call back later', 'other'] as const;

export type LeadStatus = (typeof leadStatuses)[number];
