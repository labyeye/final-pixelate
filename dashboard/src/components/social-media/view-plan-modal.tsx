"use client";

import { SocialMediaPost, formatAccountDisplay, toDateTime } from "@/lib/social-media-planner";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PostAccountDisplay } from "./post-account-display";
import { MultiAccountDisplay } from "./multi-account-display";

interface ViewPlanModalProps {
  isOpen: boolean;
  plan: SocialMediaPost | null;
  onClose: () => void;
}

const statusBadge: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Ready: "bg-blue-100 text-blue-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Posted: "bg-green-100 text-green-700",
  Missed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-100 text-slate-700",
};

const approvalBadge: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export function ViewPlanModal({ isOpen, plan, onClose }: ViewPlanModalProps) {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  if (!isOpen || !plan) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    setIsScrolledDown(element.scrollTop > 0);
  };

  const scheduledDateTime = toDateTime(plan.scheduledDate, plan.scheduledTime);
  const isOverdue =
    !!scheduledDateTime &&
    scheduledDateTime < new Date() &&
    plan.status !== "Posted" &&
    plan.status !== "Cancelled" &&
    plan.status !== "Missed";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl">
        {}
        <div className="border-b-2 border-black p-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-black">View Plan Details</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded"
          >
            ✕
          </button>
        </div>

        {}
        <div
          onScroll={handleScroll}
          className="overflow-y-auto flex-1 p-6 space-y-6"
        >
          {}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black break-words">{plan.title}</h3>
                {plan.caption && (
                  <p className="text-base text-gray-600 mt-2 whitespace-pre-wrap break-words">
                    {plan.caption}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${
                    statusBadge[plan.status] || "bg-gray-100"
                  }`}
                >
                  {plan.status}
                </span>
                {plan.approvalStatus && (
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${
                      approvalBadge[plan.approvalStatus] || "bg-gray-100"
                    }`}
                  >
                    {plan.approvalStatus}
                  </span>
                )}
                {isOverdue && (
                  <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-red-100 text-red-700 whitespace-nowrap">
                    ⚠️ Overdue
                  </span>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">PLATFORM</label>
              <p className="text-lg font-semibold">{plan.platform}</p>
            </div>
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">CONTENT TYPE</label>
              <p className="text-lg font-semibold">{plan.contentType}</p>
            </div>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">ACCOUNT(S)</label>
              <div className="mt-2">
                {plan.socialAccountIds && plan.socialAccountIds.length > 0 ? (
                  <MultiAccountDisplay accountIds={plan.socialAccountIds} />
                ) : (
                  <PostAccountDisplay accountId={plan.socialAccountId} />
                )}
              </div>
            </div>
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">SCHEDULED DATE & TIME</label>
              <p className="text-lg font-semibold">
                {plan.scheduledDate} {plan.scheduledTime}
              </p>
            </div>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">ASSIGNED TO</label>
              <p className="text-lg font-semibold">{plan.assignedTo || "Unassigned"}</p>
            </div>
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">CREATED BY</label>
              <p className="text-lg font-semibold">{plan.createdBy || "—"}</p>
            </div>
          </div>

          {}
          {plan.hashtags && (
            <div className="border rounded-lg p-3 space-y-1">
              <label className="text-xs font-bold text-gray-500">HASHTAGS</label>
              <p className="text-sm font-mono break-words">{plan.hashtags}</p>
            </div>
          )}

          {}
          {plan.mediaFile && (
            <div className="border rounded-lg p-3 space-y-2">
              <label className="text-xs font-bold text-gray-500">MEDIA</label>
              <a
                href={plan.mediaFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                🔗 Open Media
              </a>
            </div>
          )}

          {}
          {(plan.postedLinks && Object.keys(plan.postedLinks).length > 0) ? (
            <div className="border rounded-lg p-3 space-y-2">
              <label className="text-xs font-bold text-gray-500">POSTED LINKS</label>
              <div className="space-y-2">
                {Object.entries(plan.postedLinks).map(([accountId, link]) => (
                  <a
                    key={accountId}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    🔗 View Post ({accountId.slice(-6)})
                  </a>
                ))}
              </div>
            </div>
          ) : plan.postedLink ? (
            <div className="border rounded-lg p-3 space-y-2">
              <label className="text-xs font-bold text-gray-500">POSTED LINK</label>
              <a
                href={plan.postedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                🔗 View Posted Post
              </a>
            </div>
          ) : null}

          {}
          {plan.notes && (
            <div className="border rounded-lg p-3 space-y-1 bg-amber-50">
              <label className="text-xs font-bold text-gray-500">NOTES</label>
              <p className="text-sm whitespace-pre-wrap break-words">{plan.notes}</p>
            </div>
          )}

          {}
          {plan.status === "Posted" && (
            <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-3">📊 Analytics</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">{plan.views || 0}</p>
                  <p className="text-xs text-green-600">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">{plan.likes || 0}</p>
                  <p className="text-xs text-green-600">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">{plan.comments || 0}</p>
                  <p className="text-xs text-green-600">Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">{plan.shares || 0}</p>
                  <p className="text-xs text-green-600">Shares</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">
                    {plan.followers_gained || 0}
                  </p>
                  <p className="text-xs text-green-600">Followers</p>
                </div>
              </div>
            </div>
          )}

          {}
          <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg border">
            <p>Created: {new Date(plan.createdAt || "").toLocaleString()}</p>
            {plan.updatedAt && (
              <p>Updated: {new Date(plan.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>

        {}
        <div className={`border-t-2 border-black p-4 flex justify-end gap-2 flex-shrink-0 transition-colors ${isScrolledDown ? "bg-gray-50" : ""}`}>
          <Button
            onClick={onClose}
            className="font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
