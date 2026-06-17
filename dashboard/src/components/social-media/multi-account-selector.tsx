"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PlatformIcon } from "./platform-icon";

interface SocialAccount {
  _id?: string;
  id?: string;
  platform: string;
  handle: string;
  displayName?: string;
}

interface MultiAccountSelectorProps {
  clientId: string;
  platforms: string[];
  value: string[];
  onChange: (accountIds: string[], handles: string[]) => void;
}

export function MultiAccountSelector({
  clientId,
  platforms,
  value,
  onChange,
}: MultiAccountSelectorProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!clientId) {
      setAccounts([]);
      return;
    }

    setLoading(true);
    apiFetch(`/api/social-media-accounts?clientId=${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        setAccounts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load accounts:", err);
        setAccounts([]);
      })
      .finally(() => setLoading(false));
  }, [clientId]);

  const filteredAccounts =
    platforms.length > 0
      ? accounts.filter((acc) => platforms.includes(acc.platform))
      : accounts;

  const selectedAccounts = filteredAccounts.filter((acc) =>
    value.includes(acc._id || acc.id || ""),
  );

  const availableAccounts = filteredAccounts.filter(
    (acc) => !value.includes(acc._id || acc.id || ""),
  );

  const handleSelectAccount = (account: SocialAccount) => {
    const accountId = account._id || account.id || "";
    const newIds = [...value, accountId];
    const handles = newIds
      .map((id) => accounts.find((acc) => (acc._id || acc.id) === id)?.handle)
      .filter(Boolean) as string[];
    onChange(newIds, handles);
    setShowDropdown(false);
  };

  const handleRemoveAccount = (accountId: string) => {
    const newIds = value.filter((id) => id !== accountId);
    const handles = newIds
      .map((id) => accounts.find((acc) => (acc._id || acc.id) === id)?.handle)
      .filter(Boolean) as string[];
    onChange(newIds, handles);
  };

  const groupedAvailable = availableAccounts.reduce<
    Record<string, SocialAccount[]>
  >((acc, account) => {
    const p = account.platform;
    if (!acc[p]) acc[p] = [];
    acc[p].push(account);
    return acc;
  }, {});

  return (
    <div className="relative w-full">
      <div className="border rounded-md p-2 mb-2 bg-gray-50 min-h-[36px] flex flex-wrap gap-2 items-center">
        {selectedAccounts.length === 0 ? (
          <span className="text-sm text-gray-400">
            {loading
              ? "Loading accounts..."
              : platforms.length === 0
                ? "Select platforms above first"
                : "Select accounts..."}
          </span>
        ) : (
          selectedAccounts.map((acc) => (
            <div
              key={acc._id || acc.id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              <PlatformIcon platform={acc.platform} size="sm" />
              <span>{acc.displayName || acc.handle}</span>
              <button
                onClick={() => handleRemoveAccount(acc._id || acc.id || "")}
                className="hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="relative">
        <Button
          onClick={() => setShowDropdown(!showDropdown)}
          variant="outline"
          className="w-full text-left"
          disabled={
            loading || availableAccounts.length === 0 || platforms.length === 0
          }
        >
          {platforms.length === 0
            ? "Select platforms first"
            : availableAccounts.length === 0
              ? "No more accounts available"
              : `+ Add Account (${availableAccounts.length} available)`}
        </Button>

        {showDropdown && availableAccounts.length > 0 && (
          <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-[240px] overflow-y-auto">
            {Object.entries(groupedAvailable).map(([platform, accs]) => (
              <div key={platform}>
                <div className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-500 flex items-center gap-1 sticky top-0">
                  <PlatformIcon platform={platform} size="sm" />
                  {platform}
                </div>
                {accs.map((acc) => (
                  <button
                    key={acc._id || acc.id}
                    onClick={() => handleSelectAccount(acc)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 flex items-center gap-2"
                  >
                    <div>
                      <div className="font-medium">
                        {acc.displayName || acc.handle}
                      </div>
                      <div className="text-xs text-gray-500">@{acc.handle}</div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedAccounts.length > 0 && (
        <p className="text-xs text-green-600 mt-2">
          ✓ This post will be shared to {selectedAccounts.length} account(s)
        </p>
      )}
    </div>
  );
}
