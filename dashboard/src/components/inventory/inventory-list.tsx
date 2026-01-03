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
  const sorted = filtered.sort((a, b) => {
    if (sort === "name")
      return String(a.itemName || "").localeCompare(String(b.itemName || ""));
    if (sort === "price") return Number(a.price || 0) - Number(b.price || 0);
    return Number(a.quantityAvailable || 0) - Number(b.quantityAvailable || 0);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <input
            placeholder="Search inventory"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2"
          />
          <select
            value={sort}
            onChange={(e: any) => setSort(e.target.value)}
            className="border p-2"
          >
            <option value="name">Name</option>
            <option value="stock">Stock</option>
            <option value="price">Price</option>
          </select>
        </div>
        {/* Add button is located on the main page header to avoid duplicates */}
      </div>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((it) => (
              <TableRow
                key={String(it._id ?? it.id)}
                className="border-b-2 border-black last:border-b-0"
              >
                <TableCell className="font-bold">{it.itemName}</TableCell>
                <TableCell>{it.category}</TableCell>
                <TableCell>{it.quantityAvailable}</TableCell>
                <TableCell>{it.unit}</TableCell>
                <TableCell>₹{Number(it.price || 0).toLocaleString()}</TableCell>
                <TableCell>{it.vendorName}</TableCell>
                <TableCell>
                  <span
                    className={
                      "font-bold " +
                      (it.status === "Booked"
                        ? "text-red-600"
                        : "text-green-600")
                    }
                  >
                    {it.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" onClick={() => setEditingItem(it)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (!confirm("Delete this inventory item?")) return;
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
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Hidden modal used for editing rows; opens when `editingItem` is set */}
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
