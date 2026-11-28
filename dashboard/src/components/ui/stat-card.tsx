"use client";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { AnimatedValue } from "@/components/ui/animated-value";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  sub?: string;
  iconVariant?: "primary" | "secondary";
  /** Hex accent for the icon chip; overrides iconVariant. */
  color?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const VARIANT_HEX = { primary: "#024BAB", secondary: "#FA731C" } as const;

/** Summary card, same look as NestHR: solid icon chip, big animated number, uppercase label. */
export function StatCard({ icon: Icon, label, value, sub, iconVariant = "primary", color, onClick, active, className }: StatCardProps) {
  const accent = color ?? VARIANT_HEX[iconVariant];
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "nb-rise nb-lift border-2 border-black bg-white p-4 flex items-center gap-3 text-left",
        !onClick && "hover:!shadow-none hover:!translate-x-0 hover:!translate-y-0",
        active && "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        className,
      )}
      style={active ? { backgroundColor: `${accent}12` } : undefined}
    >
      <div
        className="nb-chip nb-chip-hover w-10 h-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0"
        style={{ backgroundColor: accent }}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-black leading-tight tabular-nums">
          <AnimatedValue value={value} />
        </p>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider truncate">{label}</p>
        {sub && <p className="text-xs text-muted-foreground truncate">{sub}</p>}
      </div>
    </Tag>
  );
}
