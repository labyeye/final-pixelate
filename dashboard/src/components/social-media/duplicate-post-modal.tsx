"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { type SocialMediaPost } from "@/lib/social-media-planner";
import { PlatformSelector } from "./platform-selector";
import { MultiAccountSelector } from "./multi-account-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface DuplicatePostModalProps {
  isOpen: boolean;
  post: SocialMediaPost | null;
  clientId: string;
  onClose: () => void;
  onDuplicate: (platform: string, accountIds: string[]) => Promise<void>;
}

export function DuplicatePostModal({
  isOpen,
  post,
  clientId,
  onClose,
  onDuplicate,
}: DuplicatePostModalProps) {
  const [platform, setPlatform] = useState("Instagram");
  const [accountIds, setAccountIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && post) {
      setPlatform(post.platform || "Instagram");
      const ids = post.socialAccountIds?.length
        ? post.socialAccountIds
        : post.socialAccountId
          ? [post.socialAccountId]
          : [];
      setAccountIds(ids);
    }
  }, [isOpen, post]);

  const handlePlatformChange = (val: string) => {
    setPlatform(val);
    setAccountIds([]);
  };

  const handleSave = async () => {
    if (!accountIds.length) {
      alert("Please select at least one account.");
      return;
    }
    setSaving(true);
    try {
      await onDuplicate(platform, accountIds);
      onClose();
    } catch {
      alert("Failed to duplicate post.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-md font-headline">
        <div className="border-b-2 border-black p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary border-2 border-black rounded-lg flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faCopy} className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Duplicate Post</h2>
            <p className="text-xs text-muted-foreground font-medium truncate max-w-[280px]">
              {post.title}
            </p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <PlatformSelector
            value={platform}
            onChange={handlePlatformChange}
            label="Platform"
          />

          <div>
            <label className="block text-sm font-semibold mb-2">
              Social Accounts *
            </label>
            <MultiAccountSelector
              clientId={clientId}
              platforms={[platform]}
              value={accountIds}
              onChange={(ids) => setAccountIds(ids)}
            />
          </div>
        </div>

        <div className="border-t-2 border-black p-4 flex gap-2 justify-end bg-gray-50 rounded-b-xl">
          <Button variant="outline" onClick={onClose} disabled={saving} className="border-2 border-black">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !accountIds.length}
            className="bg-primary text-white border-2 border-black hover:bg-primary font-bold shadow-[2px_2px_0px_#000]"
          >
            {saving ? "Duplicating…" : "Duplicate & Schedule"}
          </Button>
        </div>
      </div>
    </div>
  );
}
