"use client";

import { apiFetch } from "@/lib/api-fetch";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "@/lib/data";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (userId: number) => boolean;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ["/login"];

const clientRoutes = ["/client-portal"];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const storedUserId = sessionStorage.getItem("userId");
        const token = localStorage.getItem("auth_token");

        if (!storedUserId || !token) {
          setUser(null);
          return;
        }

        const res = await apiFetch("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const allUsers = (await res.json()) as User[];
        if (!mounted) return;
        if (Array.isArray(allUsers)) {
          const foundUser = allUsers.find(
            (u) =>
              (u.id ?? (u._id as any)) ===
              (isNaN(Number(storedUserId))
                ? storedUserId
                : Number(storedUserId)),
          );
          if (foundUser) {
            setUser(foundUser);
          } else {
            sessionStorage.removeItem("userId");
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Could not access users or session storage.", e);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      const isPublic = publicRoutes.includes(pathname);
      if (!user && !isPublic) {
        router.push("/login");
      }

      if (
        user &&
        user.role !== "client" &&
        clientRoutes.some((r) => pathname.startsWith(r))
      ) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, pathname, router]);

  const login = (userId: string | number) => {
    sessionStorage.setItem("userId", String(userId));

    (async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;
        const res = await apiFetch("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const allUsers = (await res.json()) as User[];
        if (!Array.isArray(allUsers)) return;
        const normalized = allUsers.find((u) => {
          const candidate = u.id ?? (u._id as any);
          return String(candidate) === String(userId);
        });
        if (normalized) setUser(normalized);
      } catch (e) {}
    })();
    return true;
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;
      const res = await apiFetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const updated = await res.json();
        setUser(updated as User);
      }
    } catch (e) {
      console.error("refreshUser failed", e);
    }
  };

  const logout = () => {
    try {
      if (user) {
        (async () => {
          try {
            await apiFetch("/api/erp-events", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "logout",
                userId: user.id || user._id,
                email: user.email,
                adminName: user.name,
                details: { message: "User logged out" },
              }),
            });
          } catch (e) {}
        })();
      }
    } catch (e) {}

    setUser(null);
    try {
      sessionStorage.removeItem("userId");
    } catch (e) {}
    try {
      localStorage.removeItem("auth_token");
    } catch (e) {}

    try {
      router.replace("/login");

      try {
        (router as any).refresh();
      } catch (e) {}
    } catch (e) {
      try {
        router.push("/login");
      } catch (er) {}
    }
  };

  if (loading) {
    return null;
  }

  if (!user && !publicRoutes.includes(pathname)) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading: loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
