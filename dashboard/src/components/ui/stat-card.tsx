"use client";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  iconVariant?: "primary" | "secondary";
  /** Hex accent for the icon chip; overrides iconVariant. */
  color?: string;
  className?: string;
}

const VARIANT_HEX = { primary: "#024BAB", secondary: "#FA731C" } as const;

/**
 * Summary card — tinted icon chip with a coloured border, uppercase label and
 * a big number (same design as the Students / StatCard in the other apps).
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  iconVariant = "primary",
  color,
  className,
}: StatCardProps) {
  const accent = color ?? VARIANT_HEX[iconVariant];
  return (
    <div
      className={cn(
        "border-2 border-black bg-white p-4 flex items-center gap-3 text-left",
        className
      )}
    >
      <div
        className="w-10 h-10 border-2 flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}1A`, borderColor: accent }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider truncate">
          {label}
        </p>
        <p className="text-2xl font-bold text-black">{value}</p>
        {sub && (
          <p className="text-xs text-muted-foreground truncate">{sub}</p>
        )}
      </div>
    </div>
  );
}
