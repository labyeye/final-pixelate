"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { SuccessModal } from "@/components/ui/success-modal";

const formSchema = z.object({
  title: z.string().min(1),
  link: z.string().url().or(z.string().min(0)),
  tech: z.string().optional(),
  description: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  showOn: z.enum([
    "web-development",
    "software-development",
    "app-development",
    "video-editing",
    "photography",
    "none",
  ]),
  brand: z.string().optional(),
  thumbnailBase64: z.string().optional(),
  webDevBgImageUrl: z.string().optional(),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WorkGalleryPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      tech: "",
      description: "",
      rating: 0,
      showOn: "none",
      webDevBgImageUrl: "",
      brand: "",
    },
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/work-gallery");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (mounted) setItems(json || []);
      } catch (e) {
        console.error("Failed to load gallery", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onFile = async (f: File | null) => {
    if (!f) return null;
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = { ...values } as any;

      Object.keys(payload).forEach((k) => {
        if (payload[k] === "undefined") payload[k] = "";
      });

      console.debug("work-gallery: submitting payload", payload);
      if (editingId) {
        const res = await apiFetch(`/api/work-gallery/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setItems((prev) =>
          prev.map((i) =>
            String(i._id ?? i.id) === String(editingId) ? updated : i,
          ),
        );
        setEditingId(null);
        form.reset();
        showSuccess("Gallery item updated!");
        toast({
          title: "Data updated",
          description: "Gallery item updated successfully.",
        });
        setOpenModal(false);
      } else {
        const res = await apiFetch("/api/work-gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save");
        const created = await res.json();
        setItems((prev) => [...prev, created]);
        form.reset();
        showSuccess("Gallery item added!");
        toast({ title: "Saved", description: "Gallery item added." });
        setOpenModal(false);
      }
    } catch (e) {
      console.error("Failed to save gallery item", e);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    const data = f ? await onFile(f) : null;
    form.setValue("thumbnailBase64", data || "");
  };

  const deleteItem = async (id: string) => {
    try {
      if (!window.confirm("Delete this gallery item?")) return;
      const token =
        typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await apiFetch(`/api/work-gallery/${id}`, {
        method: "DELETE",
        headers,
      });
      const body = await res.json();
      if (!res.ok) {
        console.error("Delete failed:", res.status, body);
        toast({
          title: "Delete Failed",
          description: body.error || "Unknown error",
          variant: "destructive",
        });
        return;
      }
      setItems((prev) =>
        prev.filter((x) => String(x._id ?? x.id) !== String(id)),
      );
      toast({
        title: "Deleted",
        description: "Gallery item removed successfully.",
      });
    } catch (e) {
      console.error("Failed to delete", e);
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const startEdit = (it: any) => {
    setEditingId(String(it._id ?? it.id));

    form.reset({
      title: it.title || "",
      link: it.link || "",
      tech: it.tech || "",
      description: it.description ?? it.note ?? "",
      rating: Number(it.rating ?? 0),
      showOn: it.showOn || "none",
      brand: it.brand || "",
      thumbnailBase64: it.thumbnailBase64 || "",
      webDevBgImageUrl: it.webDevBgImageUrl || "",
      note: it.note || "",
    });
    setOpenModal(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  return (
    <>
      {successMessage && <SuccessModal message={successMessage} />}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gallery Items</h2>
        <div>
          <Button
            onClick={() => {
              setEditingId(null);
              form.reset();
              setOpenModal(true);
            }}
          >
            Add Gallery Item
          </Button>
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Gallery Item" : "Add Gallery Item"}
            </DialogTitle>
            <DialogDescription>
              Thumbnail, title, link, tech tags and rating
            </DialogDescription>
          </DialogHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit((v) => onSubmit(v))}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <Input {...form.register("title")} />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Project Link (optional)
                  </label>
                  <Input {...form.register("link")} />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Tech / Tags (comma separated)
                  </label>
                  <Input {...form.register("tech")} />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Rating (0-5)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    {...form.register("rating", { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Show on</label>
                <select
                  {...form.register("showOn")}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="none">Do not display</option>
                  <option value="web-development">Web Development</option>
                  <option value="software-development">
                    Software Development
                  </option>
                  <option value="app-development">App Development</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="photography">Photography</option>
                </select>
              </div>

              {form.watch("showOn") === "software-development" && (
                <div>
                  <label className="block text-sm font-medium">
                    Brand (optional)
                  </label>
                  <Input
                    {...form.register("brand")}
                    placeholder="Brand name (e.g. Acme Inc)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Displayed on Software Development portfolio cards only.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {form.watch("showOn") === "web-development" && (
                <div>
                  <label className="block text-sm font-medium">
                    Web Dev Background Image URL
                  </label>
                  <Input
                    {...form.register("webDevBgImageUrl")}
                    placeholder="https://example.com/bg-image.jpg"
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This image will be used as background for large showcase
                    cards on the Web Development page.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium">Note</label>
                <Textarea {...form.register("note")} />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <Textarea {...form.register("description")} />
              </div>

              <DialogFooter>
                <Button type="submit">{editingId ? "Update" : "Save"}</Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setOpenModal(false);
                    form.reset();
                  }}
                >
                  {editingId ? "Cancel" : "Reset"}
                </Button>
              </DialogFooter>
            </form>
          </CardContent>
        </DialogContent>
      </Dialog>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Tech</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead>Show On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((it) => (
              <TableRow key={it._id ?? it.id}>
                <TableCell>
                  {it.thumbnailBase64 ? (
                    <img
                      src={it.thumbnailBase64}
                      alt={it.title}
                      style={{ width: 80, height: 60, objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-20 h-12 bg-gray-100 flex items-center justify-center">
                      No image
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-bold">{it.title}</TableCell>
                <TableCell>{it.brand || "-"}</TableCell>
                <TableCell>{it.tech}</TableCell>
                <TableCell className="text-right">{it.rating ?? "-"}</TableCell>
                <TableCell>{it.showOn ?? "none"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(it.link || "#", "_blank")}
                    >
                      Open
                    </Button>
                    <Button size="sm" onClick={() => startEdit(it)}>
                      Edit
                    </Button>
                    {isAdmin ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteItem(String(it._id ?? it.id))}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
