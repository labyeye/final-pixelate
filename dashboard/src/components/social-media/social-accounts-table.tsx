"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SOCIAL_PLATFORMS,
  type SocialAccount,
  type SocialPlatform,
} from "@/lib/social-media-planner";
import { PlatformLogo } from "./platform-logo";
import { Trash2, Plus } from "lucide-react";
import { PlatformIcon } from "./platform-icon";

interface SocialAccountsTableProps {
  clientId: string;
}

export function SocialAccountsTable({ clientId }: SocialAccountsTableProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialPlatform>("Instagram");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load accounts for client
  const loadAccounts = async () => {
    if (!clientId) {
      setAccounts([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/social-media-accounts?clientId=${clientId}`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch accounts");
      const data = await res.json();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error loading accounts:", e);
      setAccounts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, [clientId]);

  const handleAddAccount = async () => {
    setError("");
    
    if (!username.trim()) {
      setError("Username/Handle is required");
      return;
    }

    if (username.trim().length > 500) {
      setError("Username/Handle must be less than 500 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/social-media-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          platform: selectedPlatform,
          handle: username.trim(),
          displayName: displayName.trim() || username.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add account");
      }

      // Reset form
      setUsername("");
      setDisplayName("");
      setSelectedPlatform("Instagram");
      setIsDialogOpen(false);

      // Reload accounts
      await loadAccounts();
    } catch (e: any) {
      setError(e.message || "Failed to add account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (!window.confirm("Delete this account?")) return;

    try {
      const res = await fetch(`/api/social-media-accounts?id=${accountId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");

      await loadAccounts();
    } catch (e) {
      console.error("Error deleting account:", e);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Social Media Accounts</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Social Media Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {error && (
                <div className="rounded bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select
                  value={selectedPlatform}
                  onValueChange={(val) =>
                    setSelectedPlatform(val as SocialPlatform)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        <div className="flex items-center gap-2">
                          <PlatformIcon platform={platform} size="sm" />
                          <span>{platform}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Username / Handle</label>
                <Input
                  placeholder="e.g., john_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Display Name (Optional)
                </label>
                <Input
                  placeholder="e.g., John Doe Marketing"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <Button
                onClick={handleAddAccount}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Adding..." : "Add Account"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8 text-gray-500">
          Loading accounts...
        </div>
      ) : accounts.length === 0 ? (
        <div className="rounded border border-dashed bg-gray-50 p-8 text-center text-gray-500">
          No accounts added yet. Click "Add Account" to get started.
        </div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Platform</th>
                <th className="px-4 py-3 text-left font-medium">Username</th>
                <th className="px-4 py-3 text-left font-medium">
                  Display Name
                </th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account._id || account.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <PlatformLogo platform={account.platform as SocialPlatform} size="md" showLabel />
                  </td>
                  <td className="px-4 py-3 font-mono">@{account.handle}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {account.displayName || account.handle}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        handleDeleteAccount(account._id || account.id || "")
                      }
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-red-600 hover:bg-red-50"
                      title="Delete account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
