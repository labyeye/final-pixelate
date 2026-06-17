"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTENT_TYPES,
  SOCIAL_PLATFORMS,
  type SocialAccount,
  type SocialMediaPost,
} from "@/lib/social-media-planner";
import { MultiAccountSelector } from "./multi-account-selector";
import { PlatformIcon } from "./platform-icon";

interface AddPostModalProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onSave: (post: SocialMediaPost) => Promise<void>;
  staffOptions: string[];
  createdBy?: string;
  editingPost?: SocialMediaPost | null;
}

const CAPTION_LIMITS: Partial<Record<string, number>> = {
  Instagram: 2200,
  Facebook: 63206,
  "X / Twitter": 280,
  LinkedIn: 3000,
  "YouTube Shorts": 5000,
  "WhatsApp Channel": 1024,
  "Google My Business": 1500,
};

const initialForm: SocialMediaPost = {
  clientId: "",
  socialAccountId: "",
  socialAccountIds: [],
  title: "",
  platform: "Instagram",
  platforms: [],
  contentType: "Image Post",
  caption: "",
  hashtags: "",
  mediaFile: "",
  carouselMediaLinks: [],
  reelLink: "",
  reelCoverLink: "",
  scheduledDate: "",
  scheduledTime: "",
  assignedTo: "",
  status: "Draft",
  approvalStatus: "Pending",
  campaign: "",
  internalComments: "",
  notes: "",
};

export function AddPostModal({
  isOpen,
  clientId,
  onClose,
  onSave,
  staffOptions,
  createdBy,
  editingPost,
}: AddPostModalProps) {
  const [form, setForm] = useState<SocialMediaPost>(initialForm);
  const [saving, setSaving] = useState(false);
  const [isAlreadyPosted, setIsAlreadyPosted] = useState(false);
  const [postedLinksByAccount, setPostedLinksByAccount] = useState<
    Record<string, string>
  >({});
  const [postedAccounts, setPostedAccounts] = useState<SocialAccount[]>([]);
  const isEditing = !!editingPost;

  useEffect(() => {
    if (isOpen) {
      if (editingPost) {
        const platforms =
          editingPost.platforms && editingPost.platforms.length > 0
            ? editingPost.platforms
            : editingPost.platform
              ? [editingPost.platform]
              : [];
        setForm({ ...editingPost, platforms });
      } else {
        setForm({ ...initialForm, clientId });
      }
      setIsAlreadyPosted(false);
      setPostedLinksByAccount({});
      setPostedAccounts([]);
    }
  }, [isOpen, clientId, editingPost]);

  useEffect(() => {
    if (!isAlreadyPosted) {
      setPostedAccounts([]);
      return;
    }

    const accIds = form.socialAccountIds || [];

    if (accIds.length === 0) {
      setPostedAccounts([]);
      return;
    }

    let cancelled = false;
    const fetchAccounts = async () => {
      try {
        const promises = accIds.map((id) => {
          const url = new URL(
            "/api/social-media-accounts",
            window.location.origin,
          );
          url.searchParams.set("id", id);
          return apiFetch(url.toString(), { cache: "no-store" }).then((res) =>
            res.ok ? res.json() : null,
          );
        });
        const results = await Promise.all(promises);
        if (cancelled) return;
        const loaded = results
          .map((d) => (Array.isArray(d) ? d[0] : d))
          .filter(Boolean) as SocialAccount[];
        setPostedAccounts(loaded);
      } catch (e) {
        console.error("Failed to fetch accounts for posted links:", e);
        if (!cancelled) setPostedAccounts([]);
      }
    };

    fetchAccounts();
    return () => {
      cancelled = true;
    };
  }, [isAlreadyPosted, form.socialAccountIds]);

  const handleChange = (key: keyof SocialMediaPost, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlatformsChange = (selectedPlatforms: string[]) => {
    setForm((prev) => ({
      ...prev,
      platforms: selectedPlatforms,
      platform: (selectedPlatforms[0] as any) || prev.platform,
      socialAccountId: "",
      socialAccountIds: [],
    }));
  };

  const handleAccountsChange = (accountIds: string[]) => {
    setForm((prev) => ({
      ...prev,
      socialAccountIds: accountIds,
      socialAccountId: accountIds[0] || "",
    }));
  };

  const handleSave = async (saveAction: "draft" | "schedule" | "posted") => {
    if (!form.title || !form.scheduledDate || !form.scheduledTime) {
      alert(
        isAlreadyPosted
          ? "Please fill title, posted date and time."
          : "Please fill title, scheduled date and time.",
      );
      return;
    }

    if (!form.platforms || form.platforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    const hasAccount =
      form.socialAccountIds && form.socialAccountIds.length > 0;

    if (!hasAccount) {
      alert("Please select at least one social account.");
      return;
    }

    if (!clientId) {
      alert("Please select a client first");
      return;
    }

    let postedAtIso: string | undefined;
    let firstPostedLink = "";
    let nonEmptyPostedLinks: Record<string, string> = {};

    if (saveAction === "posted") {
      const accIds = form.socialAccountIds || [];

      nonEmptyPostedLinks = Object.fromEntries(
        accIds
          .map((id) => [id, (postedLinksByAccount[id] || "").trim()])
          .filter(([, v]) => (v as string).length > 0),
      );

      if (Object.keys(nonEmptyPostedLinks).length === 0) {
        alert("Please enter the posted link.");
        return;
      }

      firstPostedLink = (Object.values(nonEmptyPostedLinks)[0] as string) || "";

      const dt = new Date(
        `${form.scheduledDate}T${form.scheduledTime}:00+05:30`,
      );
      if (Number.isNaN(dt.getTime())) {
        alert("Invalid posted date or time.");
        return;
      }
      postedAtIso = dt.toISOString();
    }

    setSaving(true);
    try {
      const status =
        saveAction === "posted"
          ? ("Posted" as const)
          : saveAction === "schedule"
            ? ("Scheduled" as const)
            : ("Draft" as const);
      const payload: SocialMediaPost = {
        ...form,
        clientId,
        status,
        createdBy: createdBy || "",
      };
      if (saveAction === "posted") {
        payload.postedAt = postedAtIso;
        payload.postedLink = firstPostedLink;
        payload.postedLinks = nonEmptyPostedLinks;
      }
      await onSave(payload);
      setForm(initialForm);
      setPostedLinksByAccount({});
      setIsAlreadyPosted(false);
      onClose();
    } catch (e: any) {
      console.error("Save error:", e);
      const errorMsg = e?.message || "Failed to save post";
      alert(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const fileToBase64 = (file: File | null) => {
    if (!file) return Promise.resolve("");
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit Social Post" : "Add New Social Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:opacity-70"
            disabled={saving}
          >
            ×
          </button>
        </div>

        {}
        <div className="p-6 space-y-4">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Post Title *
              </label>
              <Input
                placeholder="Enter post title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Content Type *
              </label>
              <select
                value={form.contentType}
                onChange={(e) => handleChange("contentType", e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                {CONTENT_TYPES.map((contentType) => (
                  <option key={contentType} value={contentType}>
                    {contentType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Platforms *{" "}
              <span className="text-xs font-normal text-gray-400">
                (select one or more)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_PLATFORMS.map((p) => {
                const selected = (form.platforms || []).includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      const current = form.platforms || [];
                      const next = selected
                        ? current.filter((x) => x !== p)
                        : [...current, p];
                      handlePlatformsChange(next);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                      selected
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <PlatformIcon platform={p} size="sm" />
                    {p}
                    {selected && (
                      <span className="text-blue-500 font-bold leading-none">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {(form.platforms || []).length === 0 && (
              <p className="text-xs text-amber-600 mt-1">
                Please select at least one platform.
              </p>
            )}
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Campaign / Project
            </label>
            <Input
              placeholder="e.g. Summer Launch, Diwali 2025"
              value={form.campaign || ""}
              onChange={(e) => handleChange("campaign", e.target.value)}
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Social Accounts *
            </label>
            <MultiAccountSelector
              clientId={clientId}
              platforms={form.platforms || []}
              value={form.socialAccountIds || []}
              onChange={(accountIds) => handleAccountsChange(accountIds)}
            />
          </div>

          {}
          {!isEditing && (
            <div
              className={`flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2 ${
                isAlreadyPosted
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div>
                <label className="block text-sm font-semibold">
                  Already Posted?
                </label>
                <p className="text-xs text-gray-600">
                  Toggle on if this post has already gone live. We'll save the
                  posted link, date and time.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAlreadyPosted((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                  isAlreadyPosted ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-pressed={isAlreadyPosted}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAlreadyPosted ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          )}

          {}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">
                {isAlreadyPosted ? "Posted Date *" : "Schedule Date *"}
              </label>
              <Input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => handleChange("scheduledDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                {isAlreadyPosted ? "Posted Time *" : "Schedule Time *"}
              </label>
              <Input
                type="time"
                value={form.scheduledTime}
                onChange={(e) => handleChange("scheduledTime", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Assigned Staff
              </label>
              <select
                value={form.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option value="">-- Unassigned --</option>
                {staffOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {}
          {isAlreadyPosted &&
            (() => {
              const accIds = form.socialAccountIds || [];

              if (accIds.length === 0) {
                return (
                  <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
                    Select at least one social account above to enter its posted
                    link.
                  </div>
                );
              }

              if (accIds.length === 1) {
                const id = accIds[0];
                const acc = postedAccounts.find((a) => (a._id || a.id) === id);
                return (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Posted Link *
                      {acc && (
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          (@{acc.handle})
                        </span>
                      )}
                    </label>
                    <Input
                      type="url"
                      placeholder="https://instagram.com/p/..."
                      value={postedLinksByAccount[id] || ""}
                      onChange={(e) =>
                        setPostedLinksByAccount((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }))
                      }
                    />
                  </div>
                );
              }

              return (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Posted Links *
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      (one per account)
                    </span>
                  </label>
                  {accIds.map((id) => {
                    const acc = postedAccounts.find(
                      (a) => (a._id || a.id) === id,
                    );
                    const label = acc
                      ? `@${acc.handle}${
                          acc.displayName && acc.displayName !== acc.handle
                            ? ` (${acc.displayName})`
                            : ""
                        }`
                      : id;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 border rounded-md p-2"
                      >
                        <span className="text-xs font-semibold text-gray-700 w-44 truncate shrink-0">
                          {label}
                        </span>
                        <Input
                          type="url"
                          placeholder="https://example.com/post/123"
                          value={postedLinksByAccount[id] || ""}
                          onChange={(e) =>
                            setPostedLinksByAccount((prev) => ({
                              ...prev,
                              [id]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })()}

          {}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Approval Status
              </label>
              <select
                value={form.approvalStatus || "Pending"}
                onChange={(e) => handleChange("approvalStatus", e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-semibold">Caption</label>
              {(() => {
                const limit = CAPTION_LIMITS[form.platform];
                const len = (form.caption || "").length;
                if (!limit) return null;
                const pct = len / limit;
                const color =
                  pct >= 1
                    ? "text-red-600 font-bold"
                    : pct >= 0.9
                      ? "text-orange-500 font-semibold"
                      : "text-gray-400";
                return (
                  <span className={`text-xs ${color}`}>
                    {len.toLocaleString()} / {limit.toLocaleString()}
                  </span>
                );
              })()}
            </div>
            <Textarea
              placeholder="Enter post caption/copy"
              value={form.caption}
              onChange={(e) => handleChange("caption", e.target.value)}
              className="h-24"
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-1">Hashtags</label>
            <Input
              placeholder="#hashtag1 #hashtag2"
              value={form.hashtags || ""}
              onChange={(e) => handleChange("hashtags", e.target.value)}
            />
          </div>

          {}
          {form.contentType === "Carousel" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold">
                  Carousel Media Links
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      carouselMediaLinks: [
                        ...(prev.carouselMediaLinks || []),
                        "",
                      ],
                    }))
                  }
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100 font-semibold"
                >
                  + Add Slide
                </button>
              </div>
              {(form.carouselMediaLinks || []).length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Click "+ Add Slide" to add media links for each carousel
                  slide.
                </p>
              )}
              <div className="space-y-2">
                {(form.carouselMediaLinks || []).map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 w-6 shrink-0">
                      {idx + 1}.
                    </span>
                    <Input
                      placeholder={`Slide ${idx + 1} media URL`}
                      value={link}
                      onChange={(e) => {
                        const updated = [...(form.carouselMediaLinks || [])];
                        updated[idx] = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          carouselMediaLinks: updated,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (form.carouselMediaLinks || []).filter(
                          (_, i) => i !== idx,
                        );
                        setForm((prev) => ({
                          ...prev,
                          carouselMediaLinks: updated,
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 text-lg leading-none shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {form.contentType === "Reel" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Reel Video Link *
                </label>
                <Input
                  placeholder="https://example.com/reel.mp4"
                  value={form.reelLink || ""}
                  onChange={(e) => handleChange("reelLink", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Cover Page Link
                </label>
                <Input
                  placeholder="https://example.com/cover.jpg"
                  value={form.reelCoverLink || ""}
                  onChange={(e) =>
                    handleChange("reelCoverLink", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {}
          {form.contentType !== "Carousel" && form.contentType !== "Reel" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Media URL or Path
                </label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={form.mediaFile || ""}
                  onChange={(e) => handleChange("mediaFile", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Upload Media File
                </label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0] || null;
                    const data = await fileToBase64(file);
                    if (data) handleChange("mediaFile", data);
                  }}
                />
              </div>

              {form.mediaFile && (
                <div className="border rounded p-3 bg-gray-50">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">
                    Media
                  </div>
                  {String(form.mediaFile).startsWith("data:image") ? (
                    <img
                      src={form.mediaFile}
                      alt="preview"
                      className="h-32 w-32 object-cover rounded"
                    />
                  ) : String(form.mediaFile).startsWith("data:video") ? (
                    <video
                      src={form.mediaFile}
                      className="h-40 rounded"
                      controls
                    />
                  ) : (
                    <a
                      href={form.mediaFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                    >
                      Open Link
                    </a>
                  )}
                </div>
              )}
            </>
          )}

          {}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Internal Comments{" "}
              <span className="text-xs text-gray-400 font-normal">
                (staff only, not visible to client)
              </span>
            </label>
            <Textarea
              placeholder="Team notes, revision requests, internal feedback..."
              value={form.internalComments || ""}
              onChange={(e) => handleChange("internalComments", e.target.value)}
              className="h-20"
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Notes{" "}
              <span className="text-xs text-gray-400 font-normal">
                (visible to client)
              </span>
            </label>
            <Textarea
              placeholder="Notes visible to the client"
              value={form.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="h-20"
            />
          </div>
        </div>

        {}
        <div className="border-t p-4 flex gap-2 justify-end bg-gray-50">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          {isEditing ? (
            <Button onClick={() => handleSave("schedule")} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          ) : isAlreadyPosted ? (
            <Button
              onClick={() => handleSave("posted")}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700"
            >
              {saving ? "Saving..." : "Save as Posted"}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save as Draft"}
              </Button>
              <Button onClick={() => handleSave("schedule")} disabled={saving}>
                {saving ? "Scheduling..." : "Schedule Post"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
