export const SOCIAL_PLATFORMS = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "X / Twitter",
  "YouTube Shorts",
  "WhatsApp Channel",
  "Google My Business",
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
  "Failed",
  "Cancelled",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
export type ContentType = (typeof CONTENT_TYPES)[number];
export type PostStatus = (typeof POST_STATUSES)[number];

export type SocialAccount = {
  _id?: string;
  id?: string;
  clientId: string;
  platform: SocialPlatform;
  handle: string;
  displayName?: string;

  platformAccountId?: string;
  igAccountId?: string;
  connectedPageName?: string;
  isConnected?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type SocialMediaPost = {
  _id?: string;
  id?: string;
  clientId?: string;
  socialAccountId?: string;
  socialAccountIds?: string[];
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
  rejectionReason?: string;
  clientRemarks?: string;
  postedAt?: string | Date;
  statusHistory?: {
    approvalStatus: "Pending" | "Approved" | "Rejected";
    remarks?: string;
    changedAt: string | Date;
    changedBy?: string;
  }[];
  campaign?: string;
  internalComments?: string;
  notes?: string;
  postedLink?: string;
  postedLinks?: Record<string, string>;
  createdBy?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  followers_gained?: number;
  accountMetrics?: Record<
    string,
    {
      views: number;
      likes: number;
      comments: number;
      shares: number;
      followers_gained: number;
    }
  >;
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

export const fetchSocialAccount = async (
  accountId: string,
): Promise<SocialAccount | null> => {
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

export const formatAccountDisplay = (
  account?: SocialAccount | null,
): string => {
  if (!account) return "(No Account)";
  return `@${account.handle}`;
};

export const getPlatformIcon = (platform: SocialPlatform): string => {
  const icons: Record<SocialPlatform, string> = {
    Instagram: "IG",
    Facebook: "FB",
    LinkedIn: "IN",
    "X / Twitter": "X",
    "YouTube Shorts": "YT",
    "WhatsApp Channel": "WA",
    "Google My Business": "G",
  };
  return icons[platform] || "SM";
};
