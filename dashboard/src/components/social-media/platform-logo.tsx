"use client";

import { SocialPlatform } from "@/lib/social-media-planner";
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Play,
} from "lucide-react";

interface PlatformLogoProps {
  platform: SocialPlatform;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const wrapperSizeMap = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};

const platformColors: Record<SocialPlatform, { bg: string; fg: string }> = {
  Instagram: {
    bg: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    fg: "text-white",
  },
  Facebook: { bg: "bg-blue-600", fg: "text-white" },
  LinkedIn: { bg: "bg-blue-700", fg: "text-white" },
  "X / Twitter": { bg: "bg-black", fg: "text-white" },
  "YouTube Shorts": { bg: "bg-red-600", fg: "text-white" },
  "WhatsApp Channel": { bg: "bg-green-600", fg: "text-white" },
  "Google My Business": { bg: "bg-blue-500", fg: "text-white" },
};

export function PlatformLogo({
  platform,
  size = "md",
  showLabel = false,
}: PlatformLogoProps) {
  const iconSizeClass = sizeMap[size];
  const wrapperSizeClass = wrapperSizeMap[size];
  const colors = platformColors[platform] || {
    bg: "bg-gray-400",
    fg: "text-white",
  };

  const renderIcon = (targetPlatform: SocialPlatform) => {
    switch (targetPlatform) {
      case "Instagram":
        return <Instagram className={iconSizeClass} />;
      case "Facebook":
        return <Facebook className={iconSizeClass} />;
      case "LinkedIn":
        return <Linkedin className={iconSizeClass} />;
      case "X / Twitter":
        return <span className="font-black leading-none">X</span>;
      case "YouTube Shorts":
        return <Play className={iconSizeClass} fill="currentColor" />;
      case "WhatsApp Channel":
        return <MessageCircle className={iconSizeClass} />;
      case "Google My Business":
        return <Building2 className={iconSizeClass} />;
      default:
        return <span className="font-black leading-none">S</span>;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${wrapperSizeClass} ${colors.bg} ${colors.fg} rounded-md flex items-center justify-center text-xs flex-shrink-0`}
      >
        {renderIcon(platform)}
      </div>
      {showLabel && <span className="text-sm font-medium">{platform}</span>}
    </div>
  );
}
