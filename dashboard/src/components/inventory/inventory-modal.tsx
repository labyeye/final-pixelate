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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editItem ? "Edit Inventory" : "Add Inventory"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="itemName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="quantityAvailable"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Available</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="vendorName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="vendorContact"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Contact (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...form.register("isGst")} />
                <span className="font-bold">Is GST Applicable?</span>
              </label>
              {form.watch("isGst") && (
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    name="vendorGstNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor GST Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="gstPercentage"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Percentage</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
