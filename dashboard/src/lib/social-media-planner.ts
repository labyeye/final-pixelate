export const SOCIAL_PLATFORMS = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "X / Twitter",
  "YouTube Shorts",
  "WhatsApp Channel",
] as const;

export const CONTENT_TYPES = [
  "Image Post",
  "Reel",
  "Carousel",
  "Video",
  "Text Post",
  "Story",
  "Promotional Post",
  "Festival Post",
  "Announcement",
  "Testimonial",
  "Educational Post",
] as const;

export const POST_STATUSES = [
  "Draft",
  "Ready",
  "Scheduled",
  "Posted",
  "Missed",
  "Cancelled",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
export type ContentType = (typeof CONTENT_TYPES)[number];
export type PostStatus = (typeof POST_STATUSES)[number];

/**
 * Represents a social media account linked to a client
 * Each client can have multiple accounts per platform
 */
export type SocialAccount = {
  _id?: string;
  id?: string;
  clientId: string;
  platform: SocialPlatform;
  handle: string; // normalized: lowercase, no @ symbol
  displayName?: string; // optional: display name or account name
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type SocialMediaPost = {
  _id?: string;
  id?: string;
  clientId?: string;
  socialAccountId?: string; // deprecated: use socialAccountIds instead
  socialAccountIds?: string[]; // multiple account IDs for collaboration
  title: string;
  platform: SocialPlatform;
  contentType: ContentType;
  caption: string;
  hashtags?: string;
  mediaFile?: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  status: PostStatus;
  approvalStatus?: "Pending" | "Approved" | "Rejected";
  notes?: string;
  postedLink?: string;
  createdBy?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  followers_gained?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export const toDateTime = (scheduledDate?: string, scheduledTime?: string) => {
  if (!scheduledDate) return null;
  const time = scheduledTime && scheduledTime.trim() ? scheduledTime : "00:00";
  const date = new Date(`${scheduledDate}T${time}:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * Hook to fetch a social account by ID
 * Returns the account or null if not found
 */
export const fetchSocialAccount = async (accountId: string): Promise<SocialAccount | null> => {
  try {
    const res = await fetch(`/api/social-media-accounts?id=${accountId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data[0] || null : data;
    }
  } catch (e) {
    console.error("Failed to fetch social account:", e);
  }
  return null;
};

/**
 * Format account display: @handle or fallback to displayName
 */
export const formatAccountDisplay = (account?: SocialAccount | null): string => {
  if (!account) return "(No Account)";
  return `@${account.handle}`;
};
