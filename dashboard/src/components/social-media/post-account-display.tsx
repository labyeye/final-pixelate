"use client";

import { useEffect, useState } from "react";
import { SocialAccount } from "@/lib/social-media-planner";
import { PlatformLogo } from "./platform-logo";

interface PostAccountDisplayProps {
  accountId?: string;
  fallback?: string;
  className?: string;
}

export function PostAccountDisplay({
  accountId,
  fallback = "(No Account)",
  className = "",
}: PostAccountDisplayProps) {
  const [account, setAccount] = useState<SocialAccount | null>(null);
  const [loading, setLoading] = useState(!!accountId);

  useEffect(() => {
    if (!accountId) {
      setLoading(false);
      return;
    }

    const fetchAccount = async () => {
      try {
        setLoading(true);
        const url = new URL(
          "/api/social-media-accounts",
          window.location.origin,
        );
        url.searchParams.set("id", accountId);
        const res = await apiFetch(url.toString(), { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const acc = Array.isArray(data) ? data[0] : data;
          setAccount(acc || null);
        }
      } catch (e) {
        console.error("Failed to fetch account:", e);
        setAccount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [accountId]);

  if (loading) {
    return <span className={`text-gray-400 ${className}`}>Loading...</span>;
  }

  if (!account) {
    return <span className={`text-gray-500 ${className}`}>{fallback}</span>;
  }

  return (
    <div className={`font-medium inline-flex items-center gap-2 ${className}`}>
      <PlatformLogo platform={account.platform} size="sm" />
      <span>
        @{account.handle}
        {account.displayName && account.displayName !== account.handle && (
          <span className="text-xs text-gray-600 ml-1">
            ({account.displayName})
          </span>
        )}
      </span>
    </div>
  );
}
