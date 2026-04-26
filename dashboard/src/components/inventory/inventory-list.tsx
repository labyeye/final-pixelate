"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Package, Search } from "lucide-react";
import InventoryModal from "./inventory-modal";

export default function InventoryList() {
  const [items, setItems] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "stock" | "price">("name");
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter(
    (i) =>
      (i.itemName || "").toLowerCase().includes(query.toLowerCase()) ||
      (i.category || "").toLowerCase().includes(query.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "name")
      return String(a.itemName || "").localeCompare(String(b.itemName || ""));
    if (sort === "price") return Number(a.price || 0) - Number(b.price || 0);
    return Number(a.quantityAvailable || 0) - Number(b.quantityAvailable || 0);
  });

  return (
    <div className="space-y-4">
      {}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by item or category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 border-2 border-black rounded-none h-10"
          />
        </div>
        <select
          value={sort}
          onChange={(e: any) => setSort(e.target.value)}
          className="border-2 border-black px-3 h-10 text-sm font-medium bg-white focus:outline-none"
        >
          <option value="name">Sort: Name</option>
          <option value="stock">Sort: Stock</option>
          <option value="price">Sort: Price</option>
        </select>
        <div className="ml-auto text-sm text-muted-foreground font-medium">
          {sorted.length} item{sorted.length !== 1 ? "s" : ""}
        </div>
      </div>

      {}
      <div className="border-2 border-black rounded-none overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black bg-primary hover:bg-primary">
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Item</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Category</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3 text-center">Qty</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Unit</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Price</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Vendor</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3 text-center">Status</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <Package className="h-10 w-10 opacity-30" />
                    <p className="text-sm font-medium">No inventory items found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {sorted.map((it, idx) => (
              <TableRow
                key={String(it._id ?? it.id)}
                className={`border-b border-black/10 last:border-b-0 transition-colors hover:bg-muted/40 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
              >
                <TableCell className="font-bold text-sm py-3">
                  {it.itemName}
                </TableCell>
                <TableCell className="text-sm py-3">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5">
                    {it.category || "—"}
                  </span>
                </TableCell>
                <TableCell className="text-sm py-3 text-center">
                  <span
                    className={`font-black text-base ${
                      Number(it.quantityAvailable) <= 0
                        ? "text-red-600"
                        : Number(it.quantityAvailable) <= 5
                        ? "text-yellow-600"
                        : "text-green-700"
                    }`}
                  >
                    {it.quantityAvailable}
                  </span>
                </TableCell>
                <TableCell className="text-sm py-3 text-muted-foreground">{it.unit}</TableCell>
                <TableCell className="text-sm py-3 font-semibold">
                  ₹{Number(it.price || 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm py-3">
                  <div className="font-medium">{it.vendorName || "—"}</div>
                  {it.vendorContact && (
                    <div className="text-xs text-muted-foreground">{it.vendorContact}</div>
                  )}
                </TableCell>
                <TableCell className="py-3 text-center">
                  <span
                    className={`text-xs font-black tracking-widest px-2 py-1 ${
                      it.status === "Booked"
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                  >
                    {it.status || "Available"}
                  </span>
                </TableCell>
                <TableCell className="text-right py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-2 border-black hover:bg-black hover:text-white"
                      onClick={() => setEditingItem(it)}
                      title="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      title="Delete"
                      onClick={async () => {
                        if (!window.confirm("Delete this inventory item?")) return;
                        try {
                          const res = await fetch(
                            `/api/inventory/${it._id ?? it.id}`,
                            { method: "DELETE" }
                          );
                          if (!res.ok) throw new Error("Delete failed");
                          await load();
                        } catch (e) {
                          console.error(e);
                          alert("Failed to delete item");
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {}
      {editingItem && (
        <InventoryModal
          key={String(editingItem._id ?? editingItem.id)}
          editItem={editingItem}
          showTrigger={false}
          onSaved={() => {
            setEditingItem(null);
            load();
          }}
        />
      )}
    </div>
  );
}
