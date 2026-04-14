"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { SocialAccount, SocialPlatform } from "@/lib/social-media-planner";

interface AccountSelectorProps {
  clientId: string;
  platform: SocialPlatform;
  value: string; // account handle or ID
  onChange: (accountId: string, handle: string) => void;
  onCreateNew?: (handle: string) => void;
  disabled?: boolean;
}

export function AccountSelector({
  clientId,
  platform,
  value,
  onChange,
  disabled,
}: AccountSelectorProps) {
  const [input, setInput] = useState("");
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<SocialAccount[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedHandle, setSelectedHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load accounts for this client and platform
  useEffect(() => {
    if (!clientId || !platform) return;

    const loadAccounts = async () => {
      try {
        setLoading(true);
        const url = new URL("/api/social-media-accounts", window.location.origin);
        url.searchParams.set("clientId", clientId);
        url.searchParams.set("platform", platform);
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setAccounts(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Failed to load social accounts:", e);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, [clientId, platform]);

  // Normalize handle (remove @, lowercase)
  const normalizeHandle = (h: string): string => {
    return (h || "").toLowerCase().replace(/^@+/, "").trim();
  };

  // Handle input change and filter suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setShowSuggestions(true);

    const normalized = normalizeHandle(val);

    // Filter existing accounts that match
    const matching = accounts.filter((acc) =>
      acc.handle.includes(normalized)
    );

    // Prepare suggestions
    const suggestions = [
      ...matching,
      // Add "create new" option if input is not empty and doesn't match existing
      ...(val.trim() && !matching.some((acc) => acc.handle === normalized)
        ? [
            {
              _id: "NEW",
              clientId,
              platform,
              handle: normalized,
              displayName: `+ Add "@${normalized}"`,
              createdAt: new Date(),
            } as any,
          ]
        : []),
    ];

    setFilteredAccounts(suggestions);
  };

  // Handle selection of an account or create new
  const handleSelectAccount = async (account: SocialAccount | any) => {
    if (account.handle === "NEW" || account._id === "NEW") {
      // Create new account
      try {
        const res = await fetch("/api/social-media-accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            platform,
            handle: normalizeHandle(input),
            displayName: input,
          }),
        });

        if (res.ok) {
          const newAccount = await res.json();
          setSelectedHandle(newAccount.handle);
          onChange(newAccount._id || newAccount.id || "", newAccount.handle);
          setInput("");
          setShowSuggestions(false);
          // Add to accounts list
          setAccounts((prev) => [...prev, newAccount]);
        }
      } catch (e) {
        console.error("Failed to create account:", e);
        alert("Failed to create new account");
      }
    } else {
      // Select existing account
      setSelectedHandle(account.handle);
      onChange(account._id || account.id || "", account.handle);
      setInput("");
      setShowSuggestions(false);
    }
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset when platform changes
  useEffect(() => {
    setInput("");
    setSelectedHandle("");
    setShowSuggestions(false);
  }, [platform]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter Instagram handle (e.g. @brandname)"
        value={input || selectedHandle}
        onChange={handleInputChange}
        onFocus={() => {
          if (!input && accounts.length > 0) {
            setFilteredAccounts(accounts);
          }
          setShowSuggestions(true);
        }}
        disabled={disabled || loading}
        className="relative z-10"
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && (filteredAccounts.length > 0 || input) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-20 max-h-64 overflow-y-auto"
        >
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectAccount(account)}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  account._id === "NEW" || account.handle === "NEW"
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {account._id === "NEW" || account.handle === "NEW" ? (
                  <span className="text-sm">{account.displayName}</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">@{account.handle}</span>
                    {account.displayName && (
                      <span className="text-xs text-gray-500">
                        ({account.displayName})
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              No accounts found. Type to create a new one.
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
