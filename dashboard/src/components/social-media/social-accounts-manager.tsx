"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialAccount, SOCIAL_PLATFORMS } from "@/lib/social-media-planner";

interface SocialAccountsManagerProps {
  clientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SocialAccountsManager({
  clientId,
  isOpen,
  onClose,
}: SocialAccountsManagerProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [newHandle, setNewHandle] = useState("");
  const [newPlatform, setNewPlatform] = useState<string>("Instagram");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDisplayName, setEditingDisplayName] = useState("");

  useEffect(() => {
    if (!isOpen || !clientId) return;
    loadAccounts();
  }, [isOpen, clientId]);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const url = new URL("/api/social-media-accounts", window.location.origin);
      url.searchParams.set("clientId", clientId);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setAccounts(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error("Failed to load accounts:", e);
    } finally {
      setLoading(false);
    }
  };

  const normalizeHandle = (h: string): string => {
    return (h || "").toLowerCase().replace(/^@+/, "").trim();
  };

  const handleAddAccount = async () => {
    if (!newHandle.trim()) {
      alert("Please enter a handle");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch("/api/social-media-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          platform: newPlatform,
          handle: normalizeHandle(newHandle),
          displayName: newDisplayName || normalizeHandle(newHandle),
        }),
      });

      if (res.ok) {
        setNewHandle("");
        setNewDisplayName("");
        await loadAccounts();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add account");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to add account");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (!window.confirm("Delete this account?")) return;

    try {
      const res = await fetch(`/api/social-media-accounts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadAccounts();
      } else {
        alert("Failed to delete account");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete account");
    }
  };

  const handleUpdateDisplayName = async (id: string) => {
    try {
      setSaving(true);
      const res = await apiFetch("/api/social-media-accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          displayName: editingDisplayName,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        setEditingDisplayName("");
        await loadAccounts();
      } else {
        alert("Failed to update account");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to update account");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Manage Social Accounts</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:opacity-70"
          >
            ×
          </button>
        </div>

        {}
        <div className="p-6 space-y-6">
          {}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Add New Account</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Platform
                  </label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="border rounded-md p-2 w-full"
                  >
                    {SOCIAL_PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Handle *
                  </label>
                  <Input
                    placeholder="e.g. @brandname"
                    value={newHandle}
                    onChange={(e) => setNewHandle(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Display Name (optional)
                </label>
                <Input
                  placeholder="e.g. Brand Name"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddAccount} disabled={saving}>
                  {saving ? "Adding..." : "Add Account"}
                </Button>
              </div>
            </div>
          </div>

          {}
          <div>
            <h3 className="font-semibold mb-3">Linked Accounts</h3>
            {loading ? (
              <p className="text-gray-500">Loading accounts...</p>
            ) : accounts.length === 0 ? (
              <p className="text-gray-500 text-sm">No accounts added yet</p>
            ) : (
              <div className="space-y-2">
                {accounts.map((account) => (
                  <div
                    key={account._id}
                    className="border rounded-lg p-3 flex items-center justify-between bg-white hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">@{account.handle}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {account.platform}
                        </span>
                      </div>
                      {account.displayName &&
                        account.displayName !== account.handle && (
                          <p className="text-sm text-gray-600 mt-1">
                            {account.displayName}
                          </p>
                        )}
                      {editingId === account._id && (
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Update display name"
                            value={editingDisplayName}
                            onChange={(e) =>
                              setEditingDisplayName(e.target.value)
                            }
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateDisplayName(String(account._id))
                            }
                            disabled={saving}
                          >
                            {saving ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setEditingDisplayName("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingId !== account._id && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(String(account._id));
                            setEditingDisplayName(account.displayName || "");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDeleteAccount(String(account._id))
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <div className="border-t p-4 flex gap-2 justify-end bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
