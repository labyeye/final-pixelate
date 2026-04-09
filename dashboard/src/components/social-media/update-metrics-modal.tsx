"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export interface UpdateMetricsModalProps {
  isOpen: boolean;
  postTitle: string;
  currentMetrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    followers_gained: number;
  };
  onClose: () => void;
  onSave: (metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    followers_gained: number;
  }) => Promise<void>;
}

export function UpdateMetricsModal({
  isOpen,
  postTitle,
  currentMetrics,
  onClose,
  onSave,
}: UpdateMetricsModalProps) {
  const [metrics, setMetrics] = useState(currentMetrics);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMetrics(currentMetrics);
  }, [currentMetrics, isOpen]);

  const handleMetricChange = (field: keyof typeof metrics, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setMetrics((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(metrics);
      onClose();
    } catch (error) {
      console.error("Failed to save metrics:", error);
      alert("Failed to update metrics. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Metrics</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">Post: {postTitle}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Views</label>
            <Input
              type="number"
              min="0"
              value={metrics.views}
              onChange={(e) => handleMetricChange("views", e.target.value)}
              placeholder="0"
              disabled={isSaving}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Likes</label>
            <Input
              type="number"
              min="0"
              value={metrics.likes}
              onChange={(e) => handleMetricChange("likes", e.target.value)}
              placeholder="0"
              disabled={isSaving}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Comments</label>
            <Input
              type="number"
              min="0"
              value={metrics.comments}
              onChange={(e) => handleMetricChange("comments", e.target.value)}
              placeholder="0"
              disabled={isSaving}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Shares</label>
            <Input
              type="number"
              min="0"
              value={metrics.shares}
              onChange={(e) => handleMetricChange("shares", e.target.value)}
              placeholder="0"
              disabled={isSaving}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Followers Gained</label>
            <Input
              type="number"
              min="0"
              value={metrics.followers_gained}
              onChange={(e) => handleMetricChange("followers_gained", e.target.value)}
              placeholder="0"
              disabled={isSaving}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
