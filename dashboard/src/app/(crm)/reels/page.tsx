"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessModal } from "@/components/ui/success-modal";
import { useToast } from "@/hooks/use-toast";
import { Youtube, Film, Play, PlusCircle, Trash2, Video } from "lucide-react";

type ReelEntry = { thumbnailBase64?: string; link?: string; title?: string };
type CinematicEntry = {
  brandName?: string;
  youtubeLink?: string;
  thumbnailBase64?: string;
};

type FormValues = {
  category: "reel" | "cinematic";
  brandName: string;
  brandLogoBase64?: string;
  entries: ReelEntry[];
  cinematicEntries: CinematicEntry[];
};

const EMPTY_DEFAULTS: FormValues = {
  category: "reel",
  brandName: "",
  brandLogoBase64: "",
  entries: [],
  cinematicEntries: [],
};

export default function ReelsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  const { register, control, handleSubmit, reset, setValue, getValues, watch } =
    useForm<FormValues>({ defaultValues: EMPTY_DEFAULTS });

  const {
    fields: reelFields,
    append: appendReel,
    remove: removeReel,
    replace: replaceReels,
  } = useFieldArray({ control, name: "entries" });

  const {
    fields: cinematicFields,
    append: appendCinematic,
    remove: removeCinematic,
    replace: replaceCinematics,
  } = useFieldArray({ control, name: "cinematicEntries" });

  const watchedCategory = watch("category");
  const watchedLogo = watch("brandLogoBase64");
  const watchedReelEntries = watch("entries");
  const watchedCinematicEntries = watch("cinematicEntries");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/reels");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (mounted) setItems(json || []);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const toBase64 = (f: File | null): Promise<string> => {
    if (!f) return Promise.resolve("");
    return new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onerror = reject;
      r.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d")!.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/webp", 0.85));
        };
        img.src = String(r.result);
      };
      r.readAsDataURL(f);
    });
  };

  const onBrandLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await toBase64(e.target.files?.[0] ?? null);
    setValue("brandLogoBase64", data);
  };

  const onReelEntryFile = async (index: number, f: File | null) => {
    if (!f) return;
    const data = await toBase64(f);
    const current = getValues().entries || [];
    const copy = [...current];
    while (copy.length <= index)
      copy.push({ thumbnailBase64: "", link: "", title: "" });
    copy[index] = { ...copy[index], thumbnailBase64: data };
    replaceReels(copy);
  };

  const onCinematicEntryFile = async (index: number, f: File | null) => {
    if (!f) return;
    const data = await toBase64(f);
    const current = getValues().cinematicEntries || [];
    const copy = [...current];
    while (copy.length <= index)
      copy.push({ brandName: "", youtubeLink: "", thumbnailBase64: "" });
    copy[index] = { ...copy[index], thumbnailBase64: data };
    replaceCinematics(copy);
  };

  const onSubmit = async (v: FormValues) => {
    try {
      const payload =
        v.category === "cinematic"
          ? {
              category: "cinematic",
              brandName: v.brandName,
              brandLogoBase64: "",
              entries: [],
              cinematicEntries: v.cinematicEntries,
            }
          : {
              category: "reel",
              brandName: v.brandName,
              brandLogoBase64: v.brandLogoBase64,
              entries: v.entries,
              cinematicEntries: [],
            };

      if (editingId) {
        const res = await apiFetch(`/api/reels/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setItems((prev) =>
          prev.map((i) =>
            String(i._id ?? i.id) === String(editingId) ? updated : i,
          ),
        );
        setEditingId(null);
        reset(EMPTY_DEFAULTS);
        showSuccess("Updated!");
      } else {
        const res = await apiFetch("/api/reels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Save failed");
        const created = await res.json();
        setItems((prev) => [created, ...prev]);
        reset(EMPTY_DEFAULTS);
        showSuccess("Saved!");
      }
    } catch (e) {
      console.error("Failed to save", e);
      toast({ title: "Save Failed", variant: "destructive" });
    }
  };

  const startEdit = (it: any) => {
    setEditingId(String(it._id ?? it.id));
    reset({
      category: it.category || "reel",
      brandName: it.brandName || "",
      brandLogoBase64: it.brandLogoBase64 || "",
      entries: it.entries || [],
      cinematicEntries: it.cinematicEntries || [],
    });
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const res = await apiFetch(`/api/reels/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) =>
        prev.filter((x) => String(x._id ?? x.id) !== String(id)),
      );
      showSuccess("Deleted!");
      toast({ title: "Deleted" });
    } catch (e) {
      console.error(e);
      toast({ title: "Delete Failed", variant: "destructive" });
    }
  };

  const reelItems = items.filter((i) => !i.category || i.category === "reel");
  const cinematicItems = items.filter((i) => i.category === "cinematic");

  return (
    <div className="space-y-8">
      {successMessage && <SuccessModal message={successMessage} />}

      <header>
        <h1 className="text-4xl font-black">Reels Management</h1>
        <p className="text-muted-foreground">
          Manage reel thumbnails and cinematic video showcases for the Video
          Editing page.
        </p>
      </header>

      {/* ── Form ── */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Entry" : "Add Entry"}</CardTitle>
          <CardDescription>
            Choose a category then fill in the details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Category selector */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer font-semibold transition-colors ${
                    watchedCategory === "reel"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-600 hover:border-gray-500"
                  }`}
                >
                  <input
                    type="radio"
                    {...register("category")}
                    value="reel"
                    className="hidden"
                  />
                  <Video className="h-4 w-4" />
                  Reel
                </label>
                <label
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer font-semibold transition-colors ${
                    watchedCategory === "cinematic"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-600 hover:border-gray-500"
                  }`}
                >
                  <input
                    type="radio"
                    {...register("category")}
                    value="cinematic"
                    className="hidden"
                  />
                  <Film className="h-4 w-4" />
                  Cinematic Video
                </label>
              </div>
            </div>

            {/* ── REEL fields ── */}
            {watchedCategory === "reel" && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    Brand Name
                  </label>
                  <Input {...register("brandName")} className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Brand Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onBrandLogo}
                    className="mt-1"
                  />
                  {watchedLogo && (
                    <img
                      src={watchedLogo}
                      alt="Brand logo preview"
                      className="mt-2 h-16 object-contain rounded border"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Thumbnails (reels)
                  </label>
                  <div className="space-y-2">
                    {reelFields.map((f, idx) => (
                      <div
                        key={f.id}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            {...register(`entries.${idx}.link` as const)}
                            placeholder="Link (Instagram / YouTube...)"
                          />
                          <Input
                            {...register(`entries.${idx}.title` as const)}
                            placeholder="Title (optional)"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) =>
                              await onReelEntryFile(
                                idx,
                                e.target.files?.[0] ?? null,
                              )
                            }
                          />
                          {watchedReelEntries?.[idx]?.thumbnailBase64 && (
                            <img
                              src={watchedReelEntries[idx].thumbnailBase64}
                              alt={`Thumbnail ${idx + 1}`}
                              className="h-16 w-28 object-cover rounded border"
                            />
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeReel(idx)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() =>
                        appendReel({ thumbnailBase64: "", link: "", title: "" })
                      }
                    >
                      <PlusCircle className="h-4 w-4" /> Add thumbnail
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* ── CINEMATIC fields ── */}
            {watchedCategory === "cinematic" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Collection / Brand Name{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (shown as the section heading on the website)
                    </span>
                  </label>
                  <Input
                    {...register("brandName")}
                    placeholder="e.g. Wedding Films, Corporate Videos, Nike Campaign..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cinematic Videos
                  </label>
                  <div className="space-y-3">
                    {cinematicFields.map((f, idx) => (
                      <div
                        key={f.id}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-500">
                            Video #{idx + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:bg-red-50"
                            onClick={() => removeCinematic(idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              Brand Name
                            </label>
                            <Input
                              {...register(
                                `cinematicEntries.${idx}.brandName` as const,
                              )}
                              placeholder="e.g. Nike, Coca Cola..."
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              YouTube Link
                            </label>
                            <Input
                              {...register(
                                `cinematicEntries.${idx}.youtubeLink` as const,
                              )}
                              placeholder="https://youtube.com/watch?v=..."
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Thumbnail Image
                          </label>
                          <div className="flex items-center gap-4 mt-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) =>
                                await onCinematicEntryFile(
                                  idx,
                                  e.target.files?.[0] ?? null,
                                )
                              }
                            />
                            {watchedCinematicEntries?.[idx]
                              ?.thumbnailBase64 && (
                              <img
                                src={
                                  watchedCinematicEntries[idx].thumbnailBase64
                                }
                                alt={`Cinematic thumbnail ${idx + 1}`}
                                className="h-20 w-36 object-cover rounded-lg border-2 border-gray-200"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 w-full border-dashed"
                      onClick={() =>
                        appendCinematic({
                          brandName: "",
                          youtubeLink: "",
                          thumbnailBase64: "",
                        })
                      }
                    >
                      <PlusCircle className="h-4 w-4" /> Add Cinematic Video
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button type="submit">{editingId ? "Update" : "Save"}</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  reset(EMPTY_DEFAULTS);
                  setEditingId(null);
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ── Reel items list ── */}
      {reelItems.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Video className="h-5 w-5" /> Reels
          </h2>
          <div className="space-y-2">
            {reelItems.map((it) => (
              <div
                key={String(it._id ?? it.id)}
                className="border-2 border-black p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {it.brandLogoBase64 ? (
                    <img
                      src={it.brandLogoBase64}
                      alt={it.brandName}
                      className="h-10 w-20 object-contain rounded"
                    />
                  ) : (
                    <div className="w-20 h-10 bg-gray-100 rounded" />
                  )}
                  <div className="flex-1">
                    <div className="font-bold">{it.brandName}</div>
                    <div className="text-sm text-muted-foreground">
                      {(it.entries || []).length} thumbnails
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => startEdit(it)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteItem(String(it._id ?? it.id))}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Cinematic items list ── */}
      {cinematicItems.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Film className="h-5 w-5" /> Cinematic Videos
          </h2>
          <div className="space-y-4">
            {cinematicItems.map((it) => (
              <div
                key={String(it._id ?? it.id)}
                className="border-2 border-black rounded-xl overflow-hidden"
              >
                {/* header */}
                <div className="flex items-center justify-between px-4 py-3 bg-black text-white">
                  <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <Film className="h-4 w-4" /> Cinematic Collection
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-black border-white bg-white hover:bg-gray-100"
                      onClick={() => startEdit(it)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-7"
                      onClick={() => deleteItem(String(it._id ?? it.id))}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* cards grid — rectangle 16:9 */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(it.cinematicEntries || []).map(
                    (entry: CinematicEntry, idx: number) => (
                      <div
                        key={idx}
                        className="group relative rounded-xl overflow-hidden border-2 border-gray-200 bg-black shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      >
                        {/* 16:9 aspect ratio container */}
                        <div
                          className="relative w-full"
                          style={{ paddingBottom: "56.25%" }}
                        >
                          {entry.thumbnailBase64 ? (
                            <img
                              src={entry.thumbnailBase64}
                              alt={entry.brandName || `Video ${idx + 1}`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-gray-800 flex items-center justify-center">
                              <Film className="h-10 w-10 text-gray-500" />
                            </div>
                          )}

                          {/* Play overlay */}
                          {entry.youtubeLink && (
                            <a
                              href={entry.youtubeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors"
                            >
                              <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                                <Play
                                  className="h-5 w-5 text-white ml-0.5"
                                  fill="white"
                                />
                              </div>
                            </a>
                          )}

                          {/* YouTube badge */}
                          {entry.youtubeLink && (
                            <div className="absolute top-2 right-2">
                              <div className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Youtube className="h-2.5 w-2.5" />
                                YT
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Brand name footer */}
                        <div className="px-3 py-2 bg-white border-t border-gray-100">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {entry.brandName || `Video ${idx + 1}`}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
