"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { User } from "@/lib/models";
import { apiFetch } from "@/lib/api-fetch";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "@/lib/compress-image";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.union([z.literal("admin"), z.literal("staff")]),
  password: z.string().min(6).optional(),
});

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  initialValues: User;
  onSave: (update: Partial<User>) => Promise<void> | void;
};

export default function EditUserDialog({
  isOpen,
  setIsOpen,
  initialValues,
  onSave,
}: Props) {
  const { toast } = useToast();
  const [avatar, setAvatar] = React.useState((initialValues as any).avatar || "");
  const [uploading, setUploading] = React.useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues.name || "",
      email: initialValues.email || "",
      role: (initialValues.role as any) || "staff",
      password: "",
    },
  });

  React.useEffect(() => {
    setAvatar((initialValues as any).avatar || "");
  }, [initialValues]);

  async function handleAvatarUpload(file: File) {
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressed);
      const res = await apiFetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      const { url } = await res.json();
      setAvatar(url);
      toast({ title: "Photo Uploaded", description: "Save to apply changes." });
    } catch (e: any) {
      toast({
        title: "Upload Failed",
        description: e.message || "Something went wrong",
        variant: "destructive",
      });
    }
    setUploading(false);
  }

  async function handleSubmit(values: z.infer<typeof schema>) {
    const update: any = {
      name: values.name,
      email: values.email,
      role: values.role,
      avatar,
    };
    if (values.password) update.password = values.password;
    await onSave(update);
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <FormLabel>Photo</FormLabel>
              <div className="flex items-center gap-4">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-16 w-16 rounded-full object-cover border-2 border-black"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 border-2 border-black" />
                )}
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  onClick={() =>
                    document.getElementById("edit-user-avatar-upload")?.click()
                  }
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </Button>
                <input
                  id="edit-user-avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2">
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password (leave blank to keep)</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
