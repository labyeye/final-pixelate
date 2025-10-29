"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";

export default function AnnouncementBarPage() {
  const [text, setText] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAnnouncement();
  }, []);

  const loadAnnouncement = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/announcement");
      if (res.ok) {
        const data = await res.json();
        setText(data.text || "");
        setEnabled(data.enabled !== false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load announcement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!text.trim()) {
      toast({
        title: "Validation Error",
        description: "Announcement text cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (text.length > 200) {
      toast({
        title: "Validation Error",
        description: "Announcement text must be 200 characters or less",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/announcement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, enabled }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Announcement updated successfully",
        });
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update announcement",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Announcement Bar Settings</CardTitle>
          <CardDescription>
            Manage the announcement bar that appears at the top of your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="relative overflow-hidden rounded-lg">
              <div
                className="announcement-preview"
                style={{
                  background:
                    "linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #ff6b6b 100%)",
                  backgroundSize: "200% 100%",
                  color: "white",
                  padding: "12px",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "14px",
                  opacity: enabled ? 1 : 0.5,
                }}
              >
                {text || "Your announcement text will appear here..."}
              </div>
            </div>
          </div>

          {/* Enable/Disable Switch */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="enabled">Show Announcement Bar</Label>
              <p className="text-sm text-muted-foreground">
                Toggle the visibility of the announcement bar on the website
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {enabled ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
              <Switch
                id="enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <Label htmlFor="announcement-text">
              Announcement Text
              <span className="text-sm text-muted-foreground ml-2">
                ({text.length}/200)
              </span>
            </Label>
            <Input
              id="announcement-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Get FLAT 25% OFF Sitewide"
              maxLength={200}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              This text will scroll across the announcement bar at the top of
              your website
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={loadAnnouncement}
              disabled={saving}
            >
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving || !text.trim()}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-sm mb-2">Tips:</h4>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>Keep the message short and impactful (max 200 characters)</li>
              <li>The announcement scrolls automatically across the screen</li>
              <li>
                Use this for promotions, important updates, or time-sensitive
                information
              </li>
              <li>Toggle the switch to hide/show without deleting the text</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
