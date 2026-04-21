"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialMediaPost, SocialAccount } from "@/lib/social-media-planner";
import { PlatformLogo } from "./platform-logo";

interface PostLinksModalProps {
  isOpen: boolean;
  post: SocialMediaPost | null;
  accountIds?: string[];
  onClose: () => void;
  onSave: (links: Record<string, string>) => Promise<void>;
}

export function PostLinksModal({
  isOpen,
  post,
  accountIds = [],
  onClose,
  onSave,
}: PostLinksModalProps) {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !accountIds || accountIds.length === 0) {
      setAccounts([]);
      return;
    }

    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const promises = accountIds.map((id) => {
          const url = new URL("/api/social-media-accounts", window.location.origin);
          url.searchParams.set("id", id);
          return fetch(url.toString(), { cache: "no-store" }).then((res) =>
            res.ok ? res.json() : null
          );
        });

        const results = await Promise.all(promises);
        const loaded = results
          .map((data) => (Array.isArray(data) ? data[0] : data))
          .filter(Boolean) as SocialAccount[];
        setAccounts(loaded);

        // Initialize links object with empty strings
        const initialLinks: Record<string, string> = {};
        loaded.forEach((account) => {
          initialLinks[account._id || account.id || ""] = "";
        });
        setLinks(initialLinks);
      } catch (e) {
        console.error("Failed to fetch accounts:", e);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [isOpen, accountIds]);

  const handleLinkChange = (accountId: string, link: string) => {
    setLinks((prev) => ({
      ...prev,
      [accountId]: link,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(links);
      setLinks({});
      onClose();
    } catch (e) {
      console.error("Error saving links:", e);
      alert("Failed to save links. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="border-b-2 border-black p-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-black">Posted Links</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded"
            disabled={saving}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Enter the posted link for each account:
          </p>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading accounts...</div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No accounts to add links for
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => {
                const accountId = account._id || account.id || "";
                return (
                  <div
                    key={accountId}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <PlatformLogo
                        platform={account.platform}
                        size="md"
                        showLabel={false}
                      />
                      <span className="font-semibold">@{account.handle}</span>
                      {account.displayName && account.displayName !== account.handle && (
                        <span className="text-sm text-gray-600">
                          ({account.displayName})
                        </span>
                      )}
                    </div>
                    <Input
                      type="url"
                      placeholder="https://example.com/post/123"
                      value={links[accountId] || ""}
                      onChange={(e) => handleLinkChange(accountId, e.target.value)}
                      disabled={saving}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black p-4 flex justify-end gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || accounts.length === 0}
          >
            {saving ? "Saving..." : "Save Links"}
          </Button>
        </div>
      </div>
    </div>
  );
}
