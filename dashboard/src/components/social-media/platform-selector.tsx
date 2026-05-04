"use client";

import {
  SOCIAL_PLATFORMS,
  type SocialPlatform,
} from "@/lib/social-media-planner";
import { PlatformIcon } from "./platform-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlatformSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function PlatformSelector({
  value,
  onChange,
  label = "Platform",
}: PlatformSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label} *</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a platform" />
        </SelectTrigger>
        <SelectContent>
          {SOCIAL_PLATFORMS.map((platform) => (
            <SelectItem key={platform} value={platform}>
              <div className="flex items-center gap-2">
                <PlatformIcon platform={platform} size="sm" />
                <span>{platform}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
