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
import { MultiAccountSelector } from "./multi-account-selector";
import { PlatformIcon } from "./platform-icon";
import { PlatformSelector } from "./platform-selector";

interface AddPostModalProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onSave: (post: SocialMediaPost) => Promise<void>;
  staffOptions: string[];
  createdBy?: string;
  editingPost?: SocialMediaPost | null;
}

const initialForm: SocialMediaPost = {
  clientId: "",
  socialAccountId: "",
  socialAccountIds: [],
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
  editingPost,
}: AddPostModalProps) {
  const [form, setForm] = useState<SocialMediaPost>(initialForm);
  const [saving, setSaving] = useState(false);
  const [action, setAction] = useState<"draft" | "schedule">("draft");
  const [isMultipleMode, setIsMultipleMode] = useState(true);
  const [singleModeAccounts, setSingleModeAccounts] = useState<any[]>([]);
  const isEditing = !!editingPost;

  useEffect(() => {
    if (isOpen) {
      if (editingPost) {
        
        setForm(editingPost);
        
        setIsMultipleMode((editingPost.socialAccountIds?.length ?? 0) > 1 || (editingPost.socialAccountIds?.length ?? 0) === 0);
      } else {
        
        setForm({ ...initialForm, clientId });
        setIsMultipleMode(true); 
      }
    }
  }, [isOpen, clientId, editingPost]);

  
  useEffect(() => {
    if (!isMultipleMode || !clientId || !form.platform) return;
    
    const loadAccounts = async () => {
      try {
        const url = new URL("/api/social-media-accounts", window.location.origin);
        url.searchParams.set("clientId", clientId);
        url.searchParams.set("platform", form.platform);
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setSingleModeAccounts(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Failed to load accounts:", e);
      }
    };

    loadAccounts();
  }, [isMultipleMode, clientId, form.platform]);

  const handleChange = (key: keyof SocialMediaPost, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAccountsChange = (accountIds: string[]) => {
    setForm((prev) => ({ 
      ...prev, 
      socialAccountIds: accountIds,
      socialAccountId: accountIds[0] || "", 
    }));
  };

  const handleSingleAccountChange = (accountId: string) => {
    setForm((prev) => ({
      ...prev,
      socialAccountId: accountId,
      socialAccountIds: accountId ? [accountId] : [],
    }));
  };

  const toggleMode = () => {
    setIsMultipleMode(!isMultipleMode);
    
    setForm((prev) => ({
      ...prev,
      socialAccountId: "",
      socialAccountIds: [],
    }));
  };

  const handleSave = async (saveAction: "draft" | "schedule") => {
    if (!form.title || !form.platform || !form.scheduledDate || !form.scheduledTime) {
      alert("Please fill title, platform, scheduled date and time.");
      return;
    }

    
    const hasAccount = isMultipleMode 
      ? (form.socialAccountIds && form.socialAccountIds.length > 0)
      : form.socialAccountId;
    
    if (!hasAccount) {
      alert("Please select at least one social account.");
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Post Title *</label>
              <Input
                placeholder="Enter post title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <PlatformSelector
              value={form.platform}
              onChange={(val) => handleChange("platform", val)}
              label="Platform"
            />
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

          {}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold">Social Accounts *</label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${isMultipleMode ? "text-gray-400" : "text-gray-700"}`}>Single</span>
                <button
                  onClick={toggleMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isMultipleMode ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  type="button"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isMultipleMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`text-xs font-medium ${isMultipleMode ? "text-gray-700" : "text-gray-400"}`}>Multiple</span>
              </div>
            </div>

            {isMultipleMode ? (
              <MultiAccountSelector
                clientId={clientId}
                platform={form.platform}
                value={form.socialAccountIds || []}
                onChange={(accountIds) => handleAccountsChange(accountIds)}
              />
            ) : (
              
              <select
                value={form.socialAccountId || ""}
                onChange={(e) => handleSingleAccountChange(e.target.value)}
                className="border rounded-md p-2 w-full bg-white"
              >
                <option value="">Select an account...</option>
                {singleModeAccounts.map((account) => (
                  <option key={account._id || account.id} value={account._id || account.id}>
                    {account.displayName || account.handle}
                  </option>
                ))}
              </select>
            )}
          </div>

          {}
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

          {}
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

          {}
          <div>
            <label className="block text-sm font-semibold mb-1">Caption</label>
            <Textarea
              placeholder="Enter post caption/copy"
              value={form.caption}
              onChange={(e) => handleChange("caption", e.target.value)}
              className="h-24"
            />
          </div>

          {}
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

          {}
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

          {}
          {form.mediaFile && (
            <div className="border rounded p-3 bg-gray-50">
              <div className="text-xs font-semibold text-muted-foreground mb-2">Media</div>
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
                  href={form.mediaFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                >
                  🔗 Link
                </a>
              )}
            </div>
          )}

          {}
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

        {}
        <div className="border-t p-4 flex gap-2 justify-end bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          {isEditing ? (
            <Button
              onClick={() => handleSave("schedule")}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
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
              <Button
                onClick={() => handleSave("schedule")}
                disabled={saving}
              >
                {saving ? "Scheduling..." : "Schedule Post"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
