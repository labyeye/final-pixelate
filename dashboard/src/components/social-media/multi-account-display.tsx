"use client";

import { useEffect, useState } from "react";
import { SocialAccount } from "@/lib/social-media-planner";
import { PlatformLogo } from "./platform-logo";

interface MultiAccountDisplayProps {
  accountIds?: string[];
  fallback?: string;
  className?: string;
}

export function MultiAccountDisplay({
  accountIds,
  fallback = "(No Accounts)",
  className = "",
}: MultiAccountDisplayProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(!!accountIds && accountIds.length > 0);

  useEffect(() => {
    if (!accountIds || accountIds.length === 0) {
      setLoading(false);
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
      } catch (e) {
        console.error("Failed to fetch accounts:", e);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [accountIds]);

  if (loading) {
    return <span className={`text-gray-400 ${className}`}>Loading...</span>;
  }

  if (!accounts || accounts.length === 0) {
    return <span className={`text-gray-500 ${className}`}>{fallback}</span>;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {accounts.map((account) => (
        <div
          key={account._id || account.id}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-1 text-xs font-medium"
        >
          <PlatformLogo platform={account.platform} size="sm" />
          <span>
            @{account.handle}
            {account.displayName && account.displayName !== account.handle && (
              <span className="text-gray-600 ml-1">
                ({account.displayName})
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
