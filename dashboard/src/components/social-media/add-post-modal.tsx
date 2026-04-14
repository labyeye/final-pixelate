"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTENT_TYPES,
  POST_STATUSES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
} from "@/lib/social-media-planner";
import { AccountSelector } from "./account-selector";

interface AddPostModalProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onSave: (post: SocialMediaPost) => Promise<void>;
  staffOptions: string[];
  createdBy?: string;
}

const initialForm: SocialMediaPost = {
  clientId: "",
  socialAccountId: "",
  title: "",
  platform: "Instagram",
  contentType: "Image Post",
  caption: "",
  hashtags: "",
  mediaFile: "",
  scheduledDate: "",
  scheduledTime: "",
  assignedTo: "",
  status: "Draft",
  approvalStatus: "Pending",
  notes: "",
};

export function AddPostModal({
  isOpen,
  clientId,
  onClose,
  onSave,
  staffOptions,
  createdBy,
}: AddPostModalProps) {
  const [form, setForm] = useState<SocialMediaPost>(initialForm);
  const [saving, setSaving] = useState(false);
  const [action, setAction] = useState<"draft" | "schedule">("draft");

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm, clientId });
    }
  }, [isOpen, clientId]);

  const handleChange = (key: keyof SocialMediaPost, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (saveAction: "draft" | "schedule") => {
    if (!form.title || !form.platform || !form.scheduledDate || !form.scheduledTime) {
      alert("Please fill title, platform, scheduled date and time.");
      return;
    }

    if (!form.socialAccountId) {
      alert("Please select or create a social account.");
      return;
    }

    if (!clientId) {
      alert("Please select a client first");
      return;
    }

    setSaving(true);
    try {
      const status = saveAction === "schedule" ? ("Scheduled" as const) : ("Draft" as const);
      const payload = {
        ...form,
        clientId,
        status,
        createdBy: createdBy || "",
      };
      await onSave(payload);
      setForm(initialForm);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to save post");
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
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Social Post</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:opacity-70"
            disabled={saving}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Row 1: Title, Platform, Content Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Post Title *</label>
              <Input
                placeholder="Enter post title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Platform *</label>
              <select
                value={form.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                {SOCIAL_PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Content Type *</label>
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

          {/* Row 1.5: Social Account */}
          <div>
            <label className="block text-sm font-semibold mb-1">Social Account *</label>
            <AccountSelector
              clientId={clientId}
              platform={form.platform}
              value={form.socialAccountId || ""}
              onChange={(accountId, handle) => {
                handleChange("socialAccountId", accountId);
              }}
            />
          </div>

          {/* Row 2: Date, Time, Assigned Staff */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Schedule Date *</label>
              <Input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => handleChange("scheduledDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Schedule Time *</label>
              <Input
                type="time"
                value={form.scheduledTime}
                onChange={(e) => handleChange("scheduledTime", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Assigned Staff</label>
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

          {/* Row 3: Status */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Approval Status</label>
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

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-1">Caption</label>
            <Textarea
              placeholder="Enter post caption/copy"
              value={form.caption}
              onChange={(e) => handleChange("caption", e.target.value)}
              className="h-24"
            />
          </div>

          {/* Hashtags & Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Hashtags</label>
              <Input
                placeholder="#hashtag1 #hashtag2"
                value={form.hashtags || ""}
                onChange={(e) => handleChange("hashtags", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Media URL or Path</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={form.mediaFile || ""}
                onChange={(e) => handleChange("mediaFile", e.target.value)}
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1">Upload Media File</label>
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

          {/* Media Preview */}
          {form.mediaFile && (
            <div className="border rounded p-3 bg-gray-50">
              <div className="text-xs font-semibold text-muted-foreground mb-2">Media Preview</div>
              {String(form.mediaFile).startsWith("data:image") ? (
                <img
                  src={form.mediaFile}
                  alt="preview"
                  className="h-32 w-32 object-cover rounded"
                />
              ) : String(form.mediaFile).startsWith("data:video") ? (
                <video src={form.mediaFile} className="h-40 rounded" controls />
              ) : (
                <a
                  className="text-sm underline text-blue-600"
                  href={form.mediaFile}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Attachment
                </a>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <Textarea
              placeholder="Internal notes for this post"
              value={form.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="h-20"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex gap-2 justify-end bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={() => handleSave("schedule")}
            disabled={saving}
          >
            {saving ? "Scheduling..." : "Schedule Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
