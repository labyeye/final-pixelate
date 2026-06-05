"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Image,
  Grid3x3,
  Trash2,
  Eye,
  Plus,
  Edit2,
  Upload,
  Loader2,
  List as ListIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Photo {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  thumbnailBase64?: string;
  thumbnail?: string;
  url?: string;
  link?: string;
  showOn?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default function PhotoGalleriesPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Photo>>({
    title: "",
    description: "",
    category: "",
    thumbnailBase64: "",
    showOn: [],
  });
  const [pendingFiles, setPendingFiles] = useState<
    { file: File; preview: string }[]
  >([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await apiFetch("/api/photos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load photos");

        const data = await response.json();
        setPhotos(data);

        const uniqueCategories = [
          ...new Set(data.map((p: Photo) => p.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error("Error loading photos:", error);
        toast({
          title: "Error",
          description: "Failed to load photo galleries",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [toast]);

  useEffect(() => {
    let filtered = photos;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredPhotos(filtered);
  }, [photos, searchTerm, selectedCategory]);

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await apiFetch(`/api/photos/${photoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete photo");

      setPhotos(photos.filter((p) => p._id !== photoId));
      toast({
        title: "Success",
        description: "Photo deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      });
    }
  };

  const handleOpenAddDialog = () => {
    setEditingPhoto(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      thumbnailBase64: "",
      showOn: [],
    });
    setPendingFiles([]);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (photo: Photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description || "",
      category: photo.category || "",
      thumbnailBase64:
        photo.thumbnailBase64 || photo.thumbnail || photo.url || "",
      showOn: photo.showOn || [],
    });
    setIsDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles: { file: File; preview: string }[] = [];
      let processedCount = 0;

      files.forEach((file) => {
        if (file.size > 2 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 2MB and will be skipped.`,
            variant: "destructive",
          });
          processedCount++;
          if (processedCount === files.length && newFiles.length > 0) {
            setPendingFiles([...pendingFiles, ...newFiles]);
          }
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          newFiles.push({ file, preview: reader.result as string });
          processedCount++;
          if (processedCount === files.length) {
            setPendingFiles([...pendingFiles, ...newFiles]);
            if (!editingPhoto && !formData.title && files.length === 1) {
              setFormData((prev) => ({
                ...prev,
                title: file.name.split(".")[0],
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePendingFile = (index: number) => {
    setPendingFiles(pendingFiles.filter((_, i) => i !== index));
  };

  const handleSavePhoto = async () => {
    if (!formData.title && pendingFiles.length === 0) {
      toast({
        title: "Title or files required",
        description: "Please provide a title or select files to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      if (editingPhoto) {
        const response = await apiFetch(`/api/photos/${editingPhoto._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            thumbnailBase64:
              pendingFiles[0]?.preview || formData.thumbnailBase64,
          }),
        });

        if (!response.ok) throw new Error("Failed to update photo");
        const savedPhoto = await response.json();
        setPhotos(
          photos.map((p) => (p._id === savedPhoto._id ? savedPhoto : p)),
        );
        toast({ title: "Success", description: "Photo updated successfully" });
      } else {
        const uploadPromises = pendingFiles.map(async (pf) => {
          const photoData = {
            ...formData,
            title:
              pendingFiles.length > 1
                ? pf.file.name.split(".")[0]
                : formData.title || pf.file.name.split(".")[0],
            thumbnailBase64: pf.preview,
          };

          const response = await apiFetch("/api/photos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(photoData),
          });

          if (!response.ok) throw new Error(`Failed to upload ${pf.file.name}`);
          return response.json();
        });

        const savedPhotos = await Promise.all(uploadPromises);
        setPhotos([...savedPhotos, ...photos]);
        toast({
          title: "Success",
          description: `${savedPhotos.length} photo(s) added successfully`,
        });
      }

      setIsDialogOpen(false);
      setPendingFiles([]);
    } catch (error: any) {
      console.error("Error saving photo:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save photo(s)",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getImageUrl = (photo: Photo) => {
    return (
      photo.thumbnailBase64 ||
      photo.thumbnail ||
      photo.url ||
      "/assets/placeholder.png"
    );
  };

  const groupPhotosByCategory = (photosList: Photo[]) => {
    const groups: { [key: string]: Photo[] } = {};
    photosList.forEach((photo) => {
      const cat = photo.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(photo);
    });
    return groups;
  };

  const groupedPhotos = groupPhotosByCategory(filteredPhotos);

  const stats = {
    total: photos.length,
    categories: categories.length,
    latest: photos[0]?.createdAt
      ? new Date(photos[0].createdAt).toLocaleDateString()
      : "N/A",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Grid3x3 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading photo galleries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Image className="w-8 h-8" />
            Photo Galleries
          </h1>
          <p className="text-muted-foreground">
            Manage and organize your photography portfolio
          </p>
        </div>
        {user?.role === "admin" && (
          <Button onClick={handleOpenAddDialog} className="w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add Photo
          </Button>
        )}
      </div>

      {}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">In gallery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground mt-1">Photo types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Latest Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.latest}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Most recent photo
            </p>
          </CardContent>
        </Card>
      </div>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Browse Gallery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            {}
            <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between">
              <Input
                placeholder="Search photos by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      {filteredPhotos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-3">
            <Image className="w-12 h-12 mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">
              {searchTerm ? "No photos match your search" : "No photos found"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {Object.entries(groupedPhotos).map(([category, categoryPhotos]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-primary">{category}</h2>
                <div className="h-px flex-1 bg-border" />
                <Badge variant="outline">{categoryPhotos.length} Photos</Badge>
              </div>

              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryPhotos.map((photo) => (
                    <div
                      key={photo._id}
                      className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow"
                    >
                      {}
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={getImageUrl(photo)}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedPhoto(photo);
                            setShowPreview(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {user?.role === "admin" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                              onClick={() => handleOpenEditDialog(photo)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePhoto(photo._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>

                      {}
                      <div className="p-3 space-y-1">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {photo.title}
                        </h3>
                        {photo.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="divide-y pt-6">
                    {categoryPhotos.map((photo) => (
                      <div
                        key={photo._id}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        {}
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={getImageUrl(photo)}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">
                            {photo.title}
                          </h3>
                          {photo.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {photo.description}
                            </p>
                          )}
                          <div className="flex gap-2 mt-2">
                            {photo.showOn && photo.showOn.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                Featured on {photo.showOn.length} page(s)
                              </Badge>
                            )}
                          </div>
                        </div>

                        {}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedPhoto(photo);
                              setShowPreview(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user?.role === "admin" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenEditDialog(photo)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeletePhoto(photo._id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </>
      )}

      {}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingPhoto ? "Edit Photo" : "Add New Photo"}
            </DialogTitle>
            <DialogDescription>
              {editingPhoto
                ? "Update the details of your photo"
                : "Fill in the details to add a new photo to your gallery"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Photo Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category / Gallery Title</Label>
              <Input
                id="category"
                placeholder="e.g. Products, Events, Portrait"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Photos are grouped by this field on the website.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the photo..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Photos Upload (Multiple allowed)</Label>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {pendingFiles.map((pf, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-muted border group"
                    >
                      <img
                        src={pf.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePendingFile(idx)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {!editingPhoto && (
                    <div className="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                      <Plus className="w-6 h-6" />
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                  {editingPhoto && pendingFiles.length === 0 && (
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border">
                      <img
                        src={formData.thumbnailBase64}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {editingPhoto && (
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Max size: 2MB per photo. You can select multiple files.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="featured"
                checked={formData.showOn?.includes("photography")}
                onCheckedChange={(checked) => {
                  const currentShowOn = formData.showOn || [];
                  if (checked) {
                    setFormData({
                      ...formData,
                      showOn: [...currentShowOn, "photography"],
                    });
                  } else {
                    setFormData({
                      ...formData,
                      showOn: currentShowOn.filter((p) => p !== "photography"),
                    });
                  }
                }}
              />
              <Label
                htmlFor="featured"
                className="text-sm font-normal cursor-pointer"
              >
                Show on Photography page
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePhoto} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingPhoto ? "Update Photo" : "Add Photo"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.title}</DialogTitle>
            <DialogDescription>{selectedPhoto?.category}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedPhoto && (
              <div className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                  <img
                    src={getImageUrl(selectedPhoto)}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                {selectedPhoto.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedPhoto.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
