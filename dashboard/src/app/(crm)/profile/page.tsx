"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
          avatar: profile.avatar || null,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        toast({
          title: "Profile Updated",
          description: "Your profile has been saved successfully.",
        });
      } else {
        const err = await res.json();
        toast({
          title: "Save Failed",
          description: "Failed: " + (err.error || res.status),
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Save Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    setSaving(false);
  }

  async function changePassword() {
    if (!newPassword) {
      toast({
        title: "Enter Password",
        description: "Please enter a new password.",
        variant: "destructive",
      });
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
        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully.",
        });
        setNewPassword("");
      } else {
        const err = await res.json();
        toast({
          title: "Failed",
          description: "Failed: " + (err.error || res.status),
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Change Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    setPwSaving(false);
  }

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile loaded</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm">Full name</label>
          <Input
            value={profile.name || ""}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <Input
            value={profile.email || ""}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm">Job role</label>
          <Select
            value={profile.jobRole || ""}
            onValueChange={(value) =>
              setProfile((p: any) => ({ ...p, jobRole: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Camera Man",
                "Editor",
                "Camera Man & Editor",
                "Developer",
                "Designer",
                "Manager",
                "Content Writer",
                "Other",
              ].map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
              {}
              {profile.jobRole &&
                ![
                  "Camera Man",
                  "Editor",
                  "Camera Man & Editor",
                  "Developer",
                  "Designer",
                  "Manager",
                  "Content Writer",
                  "Other",
                ].includes(profile.jobRole) && (
                  <SelectItem value={profile.jobRole}>
                    {profile.jobRole}
                  </SelectItem>
                )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm">
            New password (enter new password)
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <Button onClick={saveProfile} disabled={saving}>
            {saving ? "Saving..." : "Save profile"}
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={changePassword}
            disabled={pwSaving}
          >
            {pwSaving ? "Updating..." : "Change password"}
          </Button>
        </div>
      </div>

      <hr />

      <h2 className="text-xl font-bold">Change Profile Picture</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {avatarPreview || profile.avatar ? (
            <img
              src={avatarPreview || profile.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-md mt-2 object-cover"
            />
          ) : null}
          <label className="block text-sm">Upload avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const f = e.currentTarget.files && e.currentTarget.files[0];
              if (!f) return;
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string | null;
                if (result) {
                  setAvatarPreview(result);
                  setProfile((p: any) => ({ ...p, avatar: result }));
                }
              };
              reader.readAsDataURL(f);
            }}
          />
        </div>
      </div>
    </div>
  );
}
