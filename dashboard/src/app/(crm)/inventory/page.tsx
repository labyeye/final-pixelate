"use client";

import React from 'react';
import InventoryList from '@/components/inventory/inventory-list';
import InventoryModal from '@/components/inventory/inventory-modal';

export default function InventoryPage() {
  return (
    <div className="space-y-8 font-headline">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">INVENTORY</h1>
          <p className="text-muted-foreground text-lg">Manage stock, vendors and pricing.</p>
        </div>
        <div>
          <InventoryModal onSaved={() => { /* handled by list refresh */ }} />
        </div>
      </header>

      <InventoryList />
    </div>
  );
}
