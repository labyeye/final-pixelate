"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function InventoryModal({
  onSaved,
  editItem,
  showTrigger = true,
}: {
  onSaved?: () => void;
  editItem?: any;
  showTrigger?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      itemName: editItem?.itemName || "",
      category: editItem?.category || "",
      quantityAvailable: editItem?.quantityAvailable ?? 0,
      unit: editItem?.unit || "pcs",
      price: editItem?.price ?? 0,
      vendorName: editItem?.vendorName || "",
      vendorContact: editItem?.vendorContact || "",
      isGst: !!(editItem?.vendorGstNumber || editItem?.gstPercentage),
      vendorGstNumber: editItem?.vendorGstNumber || "",
      gstPercentage: editItem?.gstPercentage ?? 0,
    },
  });

  useEffect(() => {
    if (editItem) {
      form.reset({
        itemName: editItem.itemName || "",
        category: editItem.category || "",
        quantityAvailable: editItem.quantityAvailable ?? 0,
        unit: editItem.unit || "pcs",
        price: editItem.price ?? 0,
        vendorName: editItem.vendorName || "",
        vendorContact: editItem.vendorContact || "",
        isGst: !!(editItem.vendorGstNumber || editItem.gstPercentage),
        vendorGstNumber: editItem.vendorGstNumber || "",
        gstPercentage: editItem.gstPercentage ?? 0,
      });
      // open dialog when an edit item is provided programmatically
      setOpen(true);
    }
  }, [editItem]);

  const onSubmit = async (values: any) => {
    try {
      const payload: any = {
        itemName: values.itemName,
        category: values.category,
        quantityAvailable: Number(values.quantityAvailable || 0),
        unit: values.unit,
        price: Number(values.price || 0),
        vendorName: values.vendorName,
        vendorContact: values.vendorContact,
      };
      if (values.isGst) {
        payload.vendorGstNumber = values.vendorGstNumber || null;
        payload.gstPercentage = Number(values.gstPercentage || 0);
        payload.gstAmount =
          Number(payload.price || 0) *
          (Number(payload.gstPercentage || 0) / 100);
      }
      const url = editItem
        ? `/api/inventory/${editItem._id ?? editItem.id}`
        : "/api/inventory";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      setOpen(false);
      form.reset();
      if (onSaved) onSaved();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>+ Add Inventory</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black tracking-tight">
            {editItem ? "Edit Inventory Item" : "Add Inventory Item"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Row 1: Item Name + Category */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="itemName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Item Name</FormLabel>
                    <FormControl>
                      <Input className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Category</FormLabel>
                    <FormControl>
                      <Input className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Quantity + Unit + Price */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                name="quantityAvailable"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Unit</FormLabel>
                    <FormControl>
                      <Input className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Vendor Name + Vendor Contact */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="vendorName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Vendor Name</FormLabel>
                    <FormControl>
                      <Input className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="vendorContact"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase tracking-widest">Vendor Contact <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                    <FormControl>
                      <Input className="border-2 border-black rounded-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* GST Section */}
            <div className="border-2 border-black p-4 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-black"
                  {...form.register("isGst")}
                />
                <span className="font-black text-sm uppercase tracking-widest">GST Applicable?</span>
              </label>
              {form.watch("isGst") && (
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <FormField
                    name="vendorGstNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">GST Number</FormLabel>
                        <FormControl>
                          <Input className="border-2 border-black rounded-none" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="gstPercentage"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">GST %</FormLabel>
                        <FormControl>
                          <Input type="number" className="border-2 border-black rounded-none" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full h-11 text-base font-black tracking-widest rounded-none">
                {editItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
