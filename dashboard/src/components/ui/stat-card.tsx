"use client";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  iconVariant?: "primary" | "secondary";
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  iconVariant = "primary",
  className,
}: StatCardProps) {
  return (
    <div className={cn("border-2 border-black bg-white p-4 space-y-3", className)}>
      <div
        className={cn(
          "w-11 h-11 flex items-center justify-center",
          iconVariant === "primary"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-3xl font-black tracking-tighter leading-none">{value}</p>
        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase mt-1">
          {label}
        </p>
        {sub && (
          <p className="text-xs font-semibold text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}
