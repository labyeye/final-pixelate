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
  // Fallback for old single-platform posts where account lookup fails
  const [fallbackLink, setFallbackLink] = useState("");

  useEffect(() => {
    if (!isOpen || !post) {
      setAccounts([]);
      setLinks({});
      setFallbackLink("");
      return;
    }

    // Pre-seed fallback with legacy postedLink for old posts
    setFallbackLink(post.postedLink || "");

    if (!accountIds || accountIds.length === 0) {
      setAccounts([]);
      return;
    }

    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const promises = accountIds.map((id) => {
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
        const loaded = results
          .map((data) => (Array.isArray(data) ? data[0] : data))
          .filter(Boolean) as SocialAccount[];
        setAccounts(loaded);

        const initialLinks: Record<string, string> = {};
        loaded.forEach((account) => {
          const accId = account._id || account.id || "";
          // For old posts that only have postedLink (not postedLinks map),
          // pre-fill from postedLink when there's only one account
          initialLinks[accId] =
            post.postedLinks?.[accId] ||
            (loaded.length === 1 ? post.postedLink || "" : "");
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
  }, [isOpen, post, accountIds]);

  const handleLinkChange = (accountId: string, link: string) => {
    setLinks((prev) => ({ ...prev, [accountId]: link }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (accounts.length === 0) {
        // Fallback mode: no accounts found, save link directly using a
        // sentinel key that handleSavePostedLinks recognises
        await onSave({ __direct__: fallbackLink });
      } else {
        await onSave(links);
      }
      setLinks({});
      setFallbackLink("");
      onClose();
    } catch (e) {
      console.error("Error saving links:", e);
      alert("Failed to save links. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !post) return null;

  const isFallbackMode = !loading && accounts.length === 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl">
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

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Enter the posted link for each account:
          </p>

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading accounts...
            </div>
          ) : isFallbackMode ? (
            // Old single-platform posts — account record not found,
            // let user edit postedLink directly
            <div className="space-y-2">
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                Account details not found for this post. You can still edit the posted link directly.
              </p>
              <Input
                type="url"
                placeholder="https://instagram.com/reel/... or https://facebook.com/..."
                value={fallbackLink}
                onChange={(e) => setFallbackLink(e.target.value)}
                disabled={saving}
                className="border-2 border-black"
              />
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
                      {account.displayName &&
                        account.displayName !== account.handle && (
                          <span className="text-sm text-gray-600">
                            ({account.displayName})
                          </span>
                        )}
                    </div>
                    <Input
                      type="url"
                      placeholder="https://example.com/post/123"
                      value={links[accountId] || ""}
                      onChange={(e) =>
                        handleLinkChange(accountId, e.target.value)
                      }
                      disabled={saving}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t-2 border-black p-4 flex justify-end gap-2 flex-shrink-0">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Links"}
          </Button>
        </div>
      </div>
    </div>
  );
}
