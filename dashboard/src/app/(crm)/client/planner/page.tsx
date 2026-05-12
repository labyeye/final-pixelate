"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCircleCheck,
  faCircleXmark,
  faArrowRotateLeft,
  faLock,
  faFileLines,
  faMapPin,
  faLink,
  faChartBar,
  faHourglassHalf,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface Post {
  _id?: string;
  clientId?: string;
  title: string;
  platform: string;
  caption: string;
  hashtags?: string;
  contentType?: string;
  scheduledDate: string;
  scheduledTime?: string;
  status: string;
  approvalStatus?: "Pending" | "Approved" | "Rejected";
  createdBy?: string;
  assignedTo?: string;
  notes?: string;
  rejectionReason?: string;
  clientRemarks?: string;
  mediaFile?: string;
  postedLink?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  followers_gained?: number;
}

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Ready: "bg-blue-100 text-blue-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Posted: "bg-green-100 text-green-700",
  Missed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-100 text-slate-700",
};

const approvalColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Approved: "bg-green-100 text-green-700 border-green-300",
  Rejected: "bg-red-100 text-red-700 border-red-300",
};

type ActionType = "Approve" | "Reject" | "MarkPending";

function PostDetailModal({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-black">
        <div className="border-b-2 border-black p-4 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-black">Post Details</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded text-gray-500"
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {post.mediaFile && (
            <div className="border-2 border-black rounded-xl overflow-hidden">
              <img
                src={post.mediaFile}
                alt={post.title}
                className="w-full max-h-80 object-contain bg-gray-50"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  (e.currentTarget
                    .nextElementSibling as HTMLElement)!.style.display = "flex";
                }}
              />
              <a
                href={post.mediaFile}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 p-3 bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100"
              >
                <FontAwesomeIcon icon={faLink} className="w-3 h-3" /> View Media
                File
              </a>
            </div>
          )}

          <div>
            <h3 className="text-2xl font-black break-words">{post.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                {post.platform}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${statusColors[post.status] || "bg-gray-100"}`}
              >
                {post.status}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold border ${approvalColors[post.approvalStatus || "Pending"]}`}
              >
                <FontAwesomeIcon
                  icon={
                    post.approvalStatus === "Approved"
                      ? faCircleCheck
                      : post.approvalStatus === "Rejected"
                        ? faCircleXmark
                        : faHourglassHalf
                  }
                  className="w-2.5 h-2.5"
                />
                {post.approvalStatus === "Approved"
                  ? "Approved"
                  : post.approvalStatus === "Rejected"
                    ? "Rejected"
                    : "Pending Review"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {post.contentType && (
              <div className="border rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">
                  CONTENT TYPE
                </p>
                <p className="font-semibold">{post.contentType}</p>
              </div>
            )}
            <div className="border rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 mb-1">SCHEDULED</p>
              <p className="font-semibold">
                {post.scheduledDate}
                {post.scheduledTime ? ` at ${post.scheduledTime}` : ""}
              </p>
            </div>
            {post.assignedTo && (
              <div className="border rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">
                  ASSIGNED TO
                </p>
                <p className="font-semibold">{post.assignedTo}</p>
              </div>
            )}
            {post.createdBy && (
              <div className="border rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">
                  CREATED BY
                </p>
                <p className="font-semibold">{post.createdBy}</p>
              </div>
            )}
          </div>

          <div className="border rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 mb-1">CAPTION</p>
            <p className="text-sm whitespace-pre-wrap break-words">
              {post.caption}
            </p>
          </div>

          {post.hashtags && (
            <div className="border rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 mb-1">HASHTAGS</p>
              <p className="text-sm font-mono text-blue-600 break-words">
                {post.hashtags}
              </p>
            </div>
          )}

          {post.mediaFile && (
            <div className="border rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 mb-2">MEDIA LINK</p>
              <a
                href={post.mediaFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faLink} className="w-3 h-3" /> Open Media
              </a>
            </div>
          )}

          {post.postedLink && (
            <div className="border rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 mb-2">
                POSTED LINK
              </p>
              <a
                href={post.postedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
              >
                <FontAwesomeIcon icon={faLink} className="w-3 h-3" /> View Post
              </a>
            </div>
          )}

          {post.notes && (
            <div className="border rounded-lg p-3 bg-amber-50">
              <p className="text-xs font-bold text-gray-500 mb-1">
                NOTES FROM TEAM
              </p>
              <p className="text-sm whitespace-pre-wrap">{post.notes}</p>
            </div>
          )}

          {post.rejectionReason && (
            <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50">
              <p className="text-xs font-bold text-red-600 mb-1">
                YOUR REJECTION FEEDBACK
              </p>
              <p className="text-sm text-red-800 whitespace-pre-wrap">
                {post.rejectionReason}
              </p>
            </div>
          )}

          {post.clientRemarks && (
            <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50">
              <p className="text-xs font-bold text-blue-600 mb-1">
                YOUR REMARKS
              </p>
              <p className="text-sm text-blue-800 whitespace-pre-wrap">
                {post.clientRemarks}
              </p>
            </div>
          )}

          {(() => {
            const fmt = (d: string | Date | undefined) =>
              d
                ? new Date(d).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

            type TEntry = {
              dot: string;
              icon: any;
              iconColor: string;
              label: string;
              sub?: string;
              date?: string;
              italic?: string;
            };
            const entries: TEntry[] = [];

            if ((post as any).createdAt) {
              entries.push({
                dot: "bg-blue-500",
                icon: faFileLines,
                iconColor: "text-white",
                label: "Plan Created",
                date: fmt((post as any).createdAt),
              });
            }

            if ((post as any).statusHistory?.length) {
              for (const e of (post as any).statusHistory as any[]) {
                const cfg: Record<
                  string,
                  { dot: string; icon: any; iconColor: string; label: string }
                > = {
                  Approved: {
                    dot: "bg-green-500",
                    icon: faCircleCheck,
                    iconColor: "text-white",
                    label: "You Approved",
                  },
                  Rejected: {
                    dot: "bg-red-500",
                    icon: faCircleXmark,
                    iconColor: "text-white",
                    label: "You Rejected",
                  },
                  Pending: {
                    dot: "bg-yellow-400",
                    icon: faArrowRotateLeft,
                    iconColor: "text-white",
                    label: "Re-opened for Review",
                  },
                };
                const c = cfg[e.approvalStatus] || {
                  dot: "bg-gray-400",
                  icon: faHourglassHalf,
                  iconColor: "text-white",
                  label: e.approvalStatus,
                };
                entries.push({
                  ...c,
                  date: fmt(e.changedAt),
                  italic: e.remarks,
                });
              }
            }

            if ((post as any).postedAt) {
              entries.push({
                dot: "bg-green-600",
                icon: faMapPin,
                iconColor: "text-white",
                label: "Post Published",
                date: fmt((post as any).postedAt),
              });
            }

            if (entries.length === 0) return null;

            return (
              <div className="border-2 border-gray-200 rounded-xl p-4">
                <p className="text-xs font-black text-gray-500 mb-4 tracking-wider">
                  POST TIMELINE
                </p>
                <div className="relative pl-5">
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200" />
                  <div className="space-y-5">
                    {entries.map((e, i) => (
                      <div key={i} className="relative flex gap-3 items-start">
                        <div
                          className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full ${e.dot} flex-shrink-0 shadow-sm flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={(e as any).icon}
                            className={`w-2 h-2 ${(e as any).iconColor}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800">
                            {e.label}
                          </p>
                          {e.sub && (
                            <p className="text-xs text-gray-500">{e.sub}</p>
                          )}
                          {e.italic && (
                            <p className="text-xs text-gray-600 italic mt-0.5">
                              "{e.italic}"
                            </p>
                          )}
                          {e.date && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {e.date}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {post.status === "Posted" && (
            <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
              <p className="text-xs font-bold text-green-600 mb-3 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faChartBar} className="w-3 h-3" />{" "}
                ANALYTICS
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-xl font-black text-green-700">
                    {post.views ?? 0}
                  </p>
                  <p className="text-xs text-green-600">Views</p>
                </div>
                <div>
                  <p className="text-xl font-black text-green-700">
                    {post.likes ?? 0}
                  </p>
                  <p className="text-xs text-green-600">Likes</p>
                </div>
                <div>
                  <p className="text-xl font-black text-green-700">
                    {post.comments ?? 0}
                  </p>
                  <p className="text-xs text-green-600">Comments</p>
                </div>
                <div>
                  <p className="text-xl font-black text-green-700">
                    {post.shares ?? 0}
                  </p>
                  <p className="text-xs text-green-600">Shares</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t-2 border-black p-4 flex justify-end sticky bottom-0 bg-white">
          <Button onClick={onClose} className="font-semibold">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function ActionModal({
  post,
  action,
  onClose,
  onConfirm,
  isSubmitting,
}: {
  post: Post;
  action: ActionType;
  onClose: () => void;
  onConfirm: (remarks: string) => void;
  isSubmitting: boolean;
}) {
  const [remarks, setRemarks] = useState("");
  const isApprove = action === "Approve";
  const isMarkPending = action === "MarkPending";
  const isReject = action === "Reject";

  const headerBg = isApprove
    ? "bg-green-50"
    : isMarkPending
      ? "bg-yellow-50"
      : "bg-red-50";
  const title = isApprove
    ? "✅ Approve Post"
    : isMarkPending
      ? "⏳ Re-open for Review"
      : "❌ Reject Post";
  const labelText = isReject
    ? "Reason for rejection (required)"
    : "Remarks (optional)";
  const placeholder = isApprove
    ? "Any feedback or notes for your team..."
    : isMarkPending
      ? "Why are you re-opening this for review?"
      : "Explain what needs to be changed or why you're rejecting this post...";
  const btnClass = isApprove
    ? "bg-green-600 hover:bg-green-700"
    : isMarkPending
      ? "bg-yellow-500 hover:bg-yellow-600"
      : "bg-red-600 hover:bg-red-700";
  const btnLabel = isSubmitting
    ? "Submitting..."
    : isApprove
      ? "Confirm Approval"
      : isMarkPending
        ? "Re-open for Review"
        : "Confirm Rejection";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border-2 border-black">
        <div className={`border-b-2 border-black p-4 rounded-t-xl ${headerBg}`}>
          <h2 className="text-xl font-black">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {post.title}
          </p>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm font-bold mb-2 block">{labelText}</label>
            <Textarea
              placeholder={placeholder}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="border-2 border-black text-sm"
              rows={4}
            />
            {isReject && !remarks.trim() && (
              <p className="text-xs text-red-500 mt-1">
                A reason is required to reject a post.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-black"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={() => onConfirm(remarks)}
              disabled={isSubmitting || (isReject && !remarks.trim())}
              className={`flex-1 border-2 border-black font-bold text-white ${btnClass}`}
            >
              {btnLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PendingPostCard({
  post,
  onAction,
}: {
  post: Post;
  onAction: (
    postId: string,
    actionType: ActionType,
    remarks: string,
  ) => Promise<void>;
}) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { toast } = useToast();

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      await onAction(post._id || "", "Approve", "");
      toast({
        title: "Post Approved ✅",
        description: "Your team will be notified.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to approve post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;
    try {
      setIsSubmitting(true);
      await onAction(post._id || "", "Reject", rejectionReason);
      toast({
        title: "Post Rejected ❌",
        description: "Your team will be notified with the reason.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to reject post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-2 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {post.mediaFile && !imgError && (
        <div className="bg-gray-100 border-b-2 border-black">
          <img
            src={post.mediaFile}
            alt={post.title}
            className="w-full max-h-72 object-contain"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-black text-lg leading-snug">{post.title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white border-2 border-black text-xs font-bold">
              {post.platform}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${statusColors[post.status] || "bg-gray-100"}`}
            >
              {post.status}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-500 mb-1.5">Caption</p>
          <div className="border-2 border-black rounded-lg p-3 bg-white text-sm whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
            {post.caption}
          </div>
          {post.hashtags && (
            <p className="text-xs text-blue-600 font-mono mt-1.5 break-words">
              {post.hashtags}
            </p>
          )}
        </div>

        {post.mediaFile && (
          <div className="flex items-center gap-2">
            <a
              href={post.mediaFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border-2 border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
            >
              <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
              {imgError ? "View Media File" : "Open Full Size Media"}
            </a>
          </div>
        )}

        <p className="text-xs text-gray-500">
          📅 {post.scheduledDate}
          {post.scheduledTime ? ` at ${post.scheduledTime}` : ""}
        </p>

        <div>
          <label className="text-xs font-bold text-gray-500 mb-1.5 block">
            Rejection Reason (if needed)
          </label>
          <Textarea
            placeholder="Explain why you're rejecting this post..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="border-2 border-black text-sm"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white border-2 border-black font-bold"
            onClick={handleApprove}
            disabled={isSubmitting}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Approve"}
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-2 border-black font-bold"
            onClick={handleReject}
            disabled={isSubmitting || !rejectionReason.trim()}
          >
            <FontAwesomeIcon icon={faCircleXmark} className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Reject"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function MediaCell({ url }: { url?: string }) {
  const [imgError, setImgError] = useState(false);
  if (!url) return <span className="text-xs text-gray-400">—</span>;
  if (!imgError) {
    return (
      <div className="flex flex-col gap-1">
        <img
          src={url}
          alt="media"
          className="w-16 h-16 object-cover rounded border border-gray-200"
          onError={() => setImgError(true)}
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faLink} className="w-2.5 h-2.5" /> View
        </a>
      </div>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100"
    >
      <FontAwesomeIcon icon={faLink} className="w-3 h-3" /> View Media
    </a>
  );
}

function AnalyticsTab({ posts }: { posts: Post[] }) {
  const postedPosts = posts.filter((p) => p.status === "Posted");

  const summary = postedPosts.reduce(
    (acc, p) => {
      const accountMetrics = (p as any).accountMetrics;
      const accountIds =
        (p as any).socialAccountIds ||
        ((p as any).socialAccountId ? [(p as any).socialAccountId] : null);
      if (accountIds && accountMetrics) {
        for (const id of accountIds) {
          const m = accountMetrics[id];
          if (m) {
            acc.views += m.views || 0;
            acc.likes += m.likes || 0;
            acc.comments += m.comments || 0;
            acc.shares += m.shares || 0;
          }
        }
      } else {
        acc.views += p.views || 0;
        acc.likes += p.likes || 0;
        acc.comments += p.comments || 0;
        acc.shares += p.shares || 0;
      }
      return acc;
    },
    { views: 0, likes: 0, comments: 0, shares: 0 },
  );

  const statCards = [
    {
      label: "Total Views",
      value: summary.views,
      icon: "👁",
      bg: "bg-blue-50 border-blue-300",
    },
    {
      label: "Total Likes",
      value: summary.likes,
      icon: "❤️",
      bg: "bg-red-50 border-red-300",
    },
    {
      label: "Comments",
      value: summary.comments,
      icon: "💬",
      bg: "bg-green-50 border-green-300",
    },
    {
      label: "Shares",
      value: summary.shares,
      icon: "↗",
      bg: "bg-purple-50 border-purple-300",
    },
  ];

  return (
    <div className="space-y-6">
      {postedPosts.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center text-muted-foreground">
          <p className="text-xl font-bold">No posted content yet</p>
          <p className="text-sm mt-2">
            Analytics will appear here once posts go live
          </p>
        </div>
      ) : (
        <>
          {}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((s) => (
              <div key={s.label} className={`border-2 rounded-xl p-4 ${s.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {s.label}
                  </span>
                  <span className="text-lg">{s.icon}</span>
                </div>
                <div className="text-3xl font-black">
                  {s.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="border-2 border-black rounded-xl overflow-hidden">
            <div className="bg-black text-white px-4 py-3">
              <h3 className="font-black text-sm tracking-tight">
                POSTS PERFORMANCE
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-black">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Post
                    </th>
                    <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Platform
                    </th>
                    <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Date
                    </th>
                    <th className="text-right px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Views
                    </th>
                    <th className="text-right px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Likes
                    </th>
                    <th className="text-right px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Comments
                    </th>
                    <th className="text-right px-4 py-3 font-black text-xs uppercase tracking-wide">
                      Shares
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {postedPosts.map((post, i) => {
                    const accountMetrics = (post as any).accountMetrics;
                    const accountIds =
                      (post as any).socialAccountIds ||
                      ((post as any).socialAccountId
                        ? [(post as any).socialAccountId]
                        : null);
                    let views = post.views || 0,
                      likes = post.likes || 0,
                      comments = post.comments || 0,
                      shares = post.shares || 0;
                    if (accountIds && accountMetrics) {
                      views = 0;
                      likes = 0;
                      comments = 0;
                      shares = 0;
                      for (const id of accountIds) {
                        const m = accountMetrics[id];
                        if (m) {
                          views += m.views || 0;
                          likes += m.likes || 0;
                          comments += m.comments || 0;
                          shares += m.shares || 0;
                        }
                      }
                    }
                    return (
                      <tr
                        key={post._id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 font-semibold max-w-[200px] truncate">
                          {post.title}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                            {post.platform}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 font-semibold">
                          {post.scheduledDate}
                        </td>
                        <td className="px-4 py-3 text-right font-black">
                          {views.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-black">
                          {likes.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-black">
                          {comments.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-black">
                          {shares.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ClientPlannerPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [actionPost, setActionPost] = useState<Post | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "analytics">("posts");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", user?.clientId || "");
      const res = await fetch(url.toString(), { headers });
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data: any[] = await res.json();
      const clientPosts = Array.isArray(data)
        ? data.filter((p) => p.clientId === user?.clientId)
        : [];
      setPosts(clientPosts);
    } catch (err) {
      console.error("Failed to load posts", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "client") return;
    fetchPosts();
  }, [user]);

  const doAction = async (
    postId: string,
    actionType: ActionType,
    remarks: string,
  ) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const newStatus =
      actionType === "Approve"
        ? "Approved"
        : actionType === "Reject"
          ? "Rejected"
          : "Pending";
    const body: any = { approvalStatus: newStatus };
    if (actionType === "Reject") body.rejectionReason = remarks;
    if (remarks.trim()) body.clientRemarks = remarks;

    const res = await fetch(`/api/social-media-posts/${postId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Failed to ${actionType.toLowerCase()} post`);
    await fetchPosts();
  };

  const handleModalAction = async (remarks: string) => {
    if (!actionPost || !actionType) return;
    try {
      setIsSubmitting(true);
      await doAction(actionPost._id || "", actionType, remarks);

      const msgs: Record<string, { title: string; description: string }> = {
        Approve: {
          title: "Post Approved ✅",
          description: "Your team will be notified.",
        },
        Reject: {
          title: "Post Rejected ❌",
          description: "Your team will be notified with the reason.",
        },
        MarkPending: {
          title: "Re-opened for Review ⏳",
          description: "Your team will be notified.",
        },
      };
      const msg = msgs[actionType] || { title: "Updated", description: "" };
      toast({ title: msg.title, description: msg.description });
      setActionPost(null);
      setActionType(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== "client") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-2 border-black rounded-xl p-8 text-center">
          <h2 className="text-xl font-black">Access Denied</h2>
          <p className="text-muted-foreground mt-2">
            This page is only accessible to clients.
          </p>
        </div>
      </div>
    );
  }

  const pendingPosts = posts.filter(
    (p) => !p.approvalStatus || p.approvalStatus === "Pending",
  );
  const approvedPosts = posts.filter((p) => p.approvalStatus === "Approved");
  const rejectedPosts = posts.filter((p) => p.approvalStatus === "Rejected");

  return (
    <div className="min-h-screen bg-background font-headline p-6 space-y-8">
      <div className="border-b-2 border-black pb-4">
        <h1 className="text-4xl font-black tracking-tighter">Social Media</h1>
        <p className="text-muted-foreground mt-1">
          Review content and track your post performance
        </p>
      </div>

      {}
      <div className="flex gap-2 border-b-2 border-black">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-5 py-2 font-black text-sm border-2 border-b-0 rounded-t-lg transition-colors ${activeTab === "posts" ? "bg-black text-white border-black" : "border-transparent text-gray-500 hover:text-black"}`}
        >
          Posts & Approvals
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-5 py-2 font-black text-sm border-2 border-b-0 rounded-t-lg transition-colors ${activeTab === "analytics" ? "bg-black text-white border-black" : "border-transparent text-gray-500 hover:text-black"}`}
        >
          Analytics
        </button>
      </div>

      {activeTab === "analytics" && <AnalyticsTab posts={posts} />}

      {activeTab === "posts" && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-black bg-yellow-50 rounded-xl p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-3xl font-black">{pendingPosts.length}</div>
              <p className="text-sm font-semibold text-yellow-600 mt-1">
                ⏳ Pending Review
              </p>
            </div>
            <div className="border-2 border-black bg-green-50 rounded-xl p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-3xl font-black text-green-700">
                {approvedPosts.length}
              </div>
              <p className="text-sm font-semibold text-green-600 mt-1">
                ✅ Approved
              </p>
            </div>
            <div className="border-2 border-black bg-red-50 rounded-xl p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-3xl font-black text-red-700">
                {rejectedPosts.length}
              </div>
              <p className="text-sm font-semibold text-red-600 mt-1">
                ❌ Rejected
              </p>
            </div>
          </div>

          {loading ? (
            <div className="border-2 border-black rounded-xl p-12 text-center text-muted-foreground">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="border-2 border-black rounded-xl p-12 text-center">
              <p className="text-xl font-bold">No posts yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Your team will share posts here for your approval
              </p>
            </div>
          ) : (
            <>
              {}
              <section className="space-y-4">
                <h2 className="text-2xl font-black flex items-center gap-2">
                  ⏳ Pending Review
                  {pendingPosts.length > 0 && (
                    <span className="text-base font-bold text-yellow-600 bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded-full">
                      {pendingPosts.length}
                    </span>
                  )}
                </h2>
                {pendingPosts.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-muted-foreground">
                    No posts pending review right now 🎉
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pendingPosts.map((post) => (
                      <PendingPostCard
                        key={post._id}
                        post={post}
                        onAction={doAction}
                      />
                    ))}
                  </div>
                )}
              </section>

              {}
              <section className="space-y-4">
                <h2 className="text-2xl font-black flex items-center gap-2">
                  ✅ Approved Posts
                  {approvedPosts.length > 0 && (
                    <span className="text-base font-bold text-green-700 bg-green-100 border border-green-300 px-2 py-0.5 rounded-full">
                      {approvedPosts.length}
                    </span>
                  )}
                </h2>
                {approvedPosts.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-muted-foreground">
                    No approved posts yet
                  </div>
                ) : (
                  <div className="border-2 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-green-50">
                          <tr>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Title & Caption
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Platform
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Content Type
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Schedule
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Status
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Media
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {approvedPosts.map((post) => (
                            <tr
                              key={post._id}
                              className="border-b hover:bg-green-50/30 transition-colors"
                            >
                              <td className="p-3 align-top max-w-xs">
                                <div className="font-semibold">
                                  {post.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-words leading-relaxed">
                                  {post.caption}
                                </div>
                                {post.hashtags && (
                                  <div className="text-xs text-blue-600 font-mono mt-1 break-words">
                                    {post.hashtags}
                                  </div>
                                )}
                              </td>
                              <td className="p-3 align-top">
                                <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                                  {post.platform}
                                </span>
                              </td>
                              <td className="p-3 align-top text-muted-foreground text-xs">
                                {post.contentType || "—"}
                              </td>
                              <td className="p-3 align-top">
                                <div className="font-semibold text-xs">
                                  {post.scheduledDate}
                                </div>
                                {post.scheduledTime && (
                                  <div className="text-xs text-muted-foreground">
                                    {post.scheduledTime}
                                  </div>
                                )}
                              </td>
                              <td className="p-3 align-top">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-bold ${statusColors[post.status] || "bg-gray-100"}`}
                                >
                                  {post.status}
                                </span>
                              </td>
                              <td className="p-3 align-top">
                                <MediaCell url={post.mediaFile} />
                              </td>
                              <td className="p-3 align-top">
                                <div className="flex flex-col gap-1.5">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-black text-xs h-7"
                                    onClick={() => setViewingPost(post)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="w-3 h-3 mr-1"
                                    />{" "}
                                    View
                                  </Button>
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 border border-green-300 text-xs font-bold">
                                    <FontAwesomeIcon
                                      icon={faLock}
                                      className="w-2.5 h-2.5"
                                    />{" "}
                                    Approved
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>

              {}
              {rejectedPosts.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-2xl font-black flex items-center gap-2">
                    ❌ Rejected Posts
                    <span className="text-base font-bold text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full">
                      {rejectedPosts.length}
                    </span>
                  </h2>
                  <div className="border-2 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-red-50">
                          <tr>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Title & Caption
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Platform
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Schedule
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Media
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Your Reason
                            </th>
                            <th className="text-left p-3 border-b-2 border-black font-bold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rejectedPosts.map((post) => (
                            <tr
                              key={post._id}
                              className="border-b hover:bg-red-50/20 transition-colors"
                            >
                              <td className="p-3 align-top max-w-xs">
                                <div className="font-semibold">
                                  {post.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-words leading-relaxed">
                                  {post.caption}
                                </div>
                              </td>
                              <td className="p-3 align-top">
                                <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                                  {post.platform}
                                </span>
                              </td>
                              <td className="p-3 align-top">
                                <div className="font-semibold text-xs">
                                  {post.scheduledDate}
                                </div>
                                {post.scheduledTime && (
                                  <div className="text-xs text-muted-foreground">
                                    {post.scheduledTime}
                                  </div>
                                )}
                              </td>
                              <td className="p-3 align-top">
                                <MediaCell url={post.mediaFile} />
                              </td>
                              <td className="p-3 align-top max-w-[180px]">
                                {post.rejectionReason ? (
                                  <p className="text-xs text-red-700 whitespace-pre-wrap break-words">
                                    {post.rejectionReason}
                                  </p>
                                ) : (
                                  <span className="text-xs text-gray-400">
                                    —
                                  </span>
                                )}
                              </td>
                              <td className="p-3 align-top">
                                <div className="flex flex-col gap-1.5">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-black text-xs h-7"
                                    onClick={() => setViewingPost(post)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="w-3 h-3 mr-1"
                                    />{" "}
                                    View
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white border-2 border-black text-xs h-7 font-bold"
                                    onClick={() => {
                                      setActionPost(post);
                                      setActionType("Approve");
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faCircleCheck}
                                      className="w-3 h-3 mr-1"
                                    />{" "}
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-2 border-yellow-400 text-yellow-700 text-xs h-7 font-bold hover:bg-yellow-50"
                                    onClick={() => {
                                      setActionPost(post);
                                      setActionType("MarkPending");
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faArrowRotateLeft}
                                      className="w-3 h-3 mr-1"
                                    />{" "}
                                    Re-open
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          <div className="border-2 border-black rounded-xl p-4 bg-primary/5">
            <p className="text-sm">
              <span className="font-bold">💡 How it works:</span> Your team
              creates social media posts and sends them here for your review.
              Click <strong>Approve</strong> or fill in a reason and click{" "}
              <strong>Reject</strong> on each pending card.
            </p>
          </div>
        </>
      )}

      {viewingPost && (
        <PostDetailModal
          post={viewingPost}
          onClose={() => setViewingPost(null)}
        />
      )}

      {actionPost && actionType && (
        <ActionModal
          post={actionPost}
          action={actionType}
          onClose={() => {
            setActionPost(null);
            setActionType(null);
          }}
          onConfirm={handleModalAction}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
