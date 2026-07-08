"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { compressImage } from "@/lib/compress-image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JOB_ROLES = [
  "Camera Man",
  "Editor",
  "Camera Man & Editor",
  "Developer",
  "Designer",
  "Manager",
  "Content Writer",
  "Other",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { refreshUser } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("auth_token") || "";
        const res = await apiFetch("/api/me", {
          headers: token ? { Authorization: "Bearer " + token } : {},
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  async function handleAvatarUpload(file: File) {
    setUploading(true);
    try {
      const token = localStorage.getItem("auth_token") || "";
      const compressed = await compressImage(file);
      const form = new FormData();
      form.append("file", compressed);

      const uploadRes = await fetch("/api/upload/avatar", {
        method: "POST",
        headers: token ? { Authorization: "Bearer " + token } : {},
        body: form,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Upload failed");
      }

      const { url } = await uploadRes.json();

      // Save avatar URL to profile
      const patchRes = await apiFetch("/api/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({ avatar: url }),
      });

      if (!patchRes.ok) {
        throw new Error("Failed to save avatar");
      }

      const updated = await patchRes.json();
      setProfile(updated);
      await refreshUser();

      toast({ title: "Avatar Updated", description: "Profile picture saved." });
    } catch (e: any) {
      toast({
        title: "Upload Failed",
        description: e.message || "Something went wrong",
        variant: "destructive",
      });
    }
    setUploading(false);
  }

  async function saveProfile() {
    if (!profile) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token") || "";
      const res = await apiFetch("/api/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          jobRole: profile.jobRole,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        await refreshUser();
        toast({ title: "Profile Updated", description: "Changes saved successfully." });
      } else {
        const err = await res.json();
        toast({
          title: "Save Failed",
          description: err.error || String(res.status),
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Save Failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setSaving(false);
  }

  async function changePassword() {
    if (!newPassword) {
      toast({ title: "Enter Password", description: "Please enter a new password.", variant: "destructive" });
      return;
    }
    setPwSaving(true);
    try {
      const token = localStorage.getItem("auth_token") || "";
      const res = await apiFetch("/api/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({ action: "change-password", newPassword }),
      });
      if (res.ok) {
        toast({ title: "Password Changed", description: "Password updated successfully." });
        setNewPassword("");
      } else {
        const err = await res.json();
        toast({ title: "Failed", description: err.error || String(res.status), variant: "destructive" });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Change Failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setPwSaving(false);
  }

  if (loading) return <div className="flex items-center gap-2 p-6"><Loader2 className="animate-spin w-4 h-4" /> Loading...</div>;
  if (!profile) return <div className="p-6">No profile loaded</div>;

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="text-4xl font-black tracking-tighter">PROFILE</h1>
        <p className="text-muted-foreground">Manage your account details and profile picture.</p>
      </header>

      {/* Avatar section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-black rounded-xl">
            <AvatarImage src={profile.avatar || undefined} alt={profile.name} className="object-cover" />
            <AvatarFallback className="rounded-xl bg-primary text-primary-foreground text-3xl font-black">
              {profile.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Camera className="w-6 h-6 text-white" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              if (f) handleAvatarUpload(f);
              e.currentTarget.value = "";
            }}
          />
        </div>
        <div>
          <p className="font-bold text-lg">{profile.name}</p>
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">{profile.role}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-2 border-black font-bold"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Uploading...</> : "Change Photo"}
          </Button>
        </div>
      </div>

      <hr className="border-black/20" />

      {/* Profile fields */}
      <div className="space-y-4">
        <h2 className="text-xl font-black">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold">Full Name</label>
            <Input
              value={profile.name || ""}
              onChange={(e) => setProfile((p: any) => ({ ...p, name: e.target.value }))}
              className="border-2 border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold">Email</label>
            <Input
              value={profile.email || ""}
              onChange={(e) => setProfile((p: any) => ({ ...p, email: e.target.value }))}
              className="border-2 border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold">Job Role</label>
            <Select
              value={profile.jobRole || ""}
              onValueChange={(value) => setProfile((p: any) => ({ ...p, jobRole: value }))}
            >
              <SelectTrigger className="border-2 border-black">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {JOB_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
                {profile.jobRole && !JOB_ROLES.includes(profile.jobRole) && (
                  <SelectItem value={profile.jobRole}>{profile.jobRole}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : "Save Profile"}
        </Button>
      </div>

      <hr className="border-black/20" />

      {/* Password */}
      <div className="space-y-4">
        <h2 className="text-xl font-black">Change Password</h2>
        <div className="flex gap-3 items-end">
          <div className="space-y-1 flex-1 max-w-xs">
            <label className="text-sm font-bold">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-2 border-black"
              placeholder="Enter new password"
            />
          </div>
          <Button
            variant="secondary"
            onClick={changePassword}
            disabled={pwSaving}
            className="border-2 border-black font-bold"
          >
            {pwSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
