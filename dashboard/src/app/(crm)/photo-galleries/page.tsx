"use client";

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
import { Image, Grid3x3, Trash2, Eye, Plus } from "lucide-react";

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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("/api/photos", {
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
      const response = await fetch(`/api/photos/${photoId}`, {
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

  const getImageUrl = (photo: Photo) => {
    return (
      photo.thumbnailBase64 ||
      photo.thumbnail ||
      photo.url ||
      "/assets/placeholder.png"
    );
  };

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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Image className="w-8 h-8" />
          Photo Galleries
        </h1>
        <p className="text-muted-foreground">
          Manage and organize your photography portfolio
        </p>
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
            <div className="text-2xl font-bold text-sm">{stats.latest}</div>
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
                  <i className="fas fa-list w-4 h-4" />
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
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPhotos.map((photo) => (
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
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePhoto(photo._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {}
                  <div className="p-3 space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {photo.title}
                    </h3>
                    {photo.category && (
                      <Badge variant="secondary" className="w-fit text-xs">
                        {photo.category}
                      </Badge>
                    )}
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
                {filteredPhotos.map((photo) => (
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
                      <h3 className="font-semibold text-sm">{photo.title}</h3>
                      {photo.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {photo.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-2">
                        {photo.category && (
                          <Badge variant="secondary" className="text-xs">
                            {photo.category}
                          </Badge>
                        )}
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
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePhoto(photo._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.title}</DialogTitle>
            {selectedPhoto?.description && (
              <DialogDescription>{selectedPhoto.description}</DialogDescription>
            )}
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="w-full rounded-lg overflow-hidden bg-muted">
                <img
                  src={getImageUrl(selectedPhoto)}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">
                    {selectedPhoto.category || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">
                    {selectedPhoto.createdAt
                      ? new Date(selectedPhoto.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                {selectedPhoto.showOn && selectedPhoto.showOn.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Featured on:</span>
                    <div className="flex gap-2 mt-2">
                      {selectedPhoto.showOn.map((page) => (
                        <Badge key={page} variant="secondary">
                          {page}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
