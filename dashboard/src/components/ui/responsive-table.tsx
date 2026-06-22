"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface ResponsiveColumn<T = any> {
  label: string;
  render: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  /** If true, this column is shown as a full-width block in mobile card (for actions) */
  isAction?: boolean;
  /** If true, hide this column label on the card */
  hideLabel?: boolean;
}

interface ResponsiveTableProps<T = any> {
  columns: ResponsiveColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

/**
 * Desktop: standard border-2 border-black table (invoicing style).
 * Mobile: each row becomes a card with label → value rows.
 */
export function ResponsiveTable<T = any>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data found.",
  className,
}: ResponsiveTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn("border-2 border-black p-8 text-center text-muted-foreground font-bold", className)}>
        {emptyMessage}
      </div>
    );
  }

  const dataColumns = columns.filter((c) => !c.isAction);
  const actionColumn = columns.find((c) => c.isAction);

  return (
    <>
      {/* ── Desktop table ── */}
      <div className={cn("hidden md:block border-2 border-black overflow-x-auto", className)}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black bg-white">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    "px-3 py-2.5 text-left text-sm font-bold whitespace-nowrap",
                    col.headerClassName
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr
                key={keyExtractor(row, ri)}
                className="border-b-2 border-black last:border-b-0 hover:bg-gray-50"
              >
                {columns.map((col, ci) => (
                  <td
                    key={ci}
                    className={cn("px-3 py-2", col.className)}
                  >
                    {col.render(row, ri)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="md:hidden space-y-3">
        {data.map((row, ri) => (
          <div
            key={keyExtractor(row, ri)}
            className="border-2 border-black bg-white"
          >
            {/* Data rows */}
            <div className="divide-y divide-gray-100">
              {dataColumns.map((col, ci) => {
                const content = col.render(row, ri);
                if (content === null || content === undefined || content === "") return null;
                return (
                  <div key={ci} className="flex items-start justify-between gap-3 px-3 py-2">
                    {!col.hideLabel && (
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase whitespace-nowrap pt-0.5 min-w-[80px]">
                        {col.label}
                      </span>
                    )}
                    <span className={cn("text-sm text-right flex-1", col.className)}>
                      {content}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Action row */}
            {actionColumn && (
              <div className="px-3 py-2 border-t-2 border-black bg-gray-50 flex items-center gap-2 flex-wrap">
                {actionColumn.render(row, ri)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
