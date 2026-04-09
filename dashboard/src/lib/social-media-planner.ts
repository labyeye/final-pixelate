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

export type SocialMediaPost = {
  _id?: string;
  id?: string;
  clientId?: string;
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
