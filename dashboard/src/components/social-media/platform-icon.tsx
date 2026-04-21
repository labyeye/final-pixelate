"use client";

import React from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  MapPin,
} from "lucide-react";

interface PlatformIconProps {
  platform: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Platform icon component using Lucide icons
 * Maps social platform names to proper brand icons
 */
export function PlatformIcon({ platform, size = "md", className = "" }: PlatformIconProps) {
  const sizeMap = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const iconSize = sizeMap[size];

  const iconProps = {
    size: iconSize,
    className: `${className} flex-shrink-0`,
    strokeWidth: 2.5,
  };

  switch (platform) {
    case "Instagram":
      return <Instagram {...iconProps} />;
    case "Facebook":
      return <Facebook {...iconProps} />;
    case "LinkedIn":
      return <Linkedin {...iconProps} />;
    case "X / Twitter":
      return <Twitter {...iconProps} />;
    case "YouTube Shorts":
      return <Youtube {...iconProps} />;
    case "WhatsApp Channel":
      return <MessageCircle {...iconProps} />;
    case "Google My Business":
      return <MapPin {...iconProps} />;
    default:
      return <MapPin {...iconProps} />;
  }
}

/**
 * Platform selector option component with icon
 * Used in select dropdowns
 */
export function PlatformOption({ platform }: { platform: string }) {
  return (
    <div className="flex items-center gap-2">
      <PlatformIcon platform={platform} size="sm" />
      <span>{platform}</span>
    </div>
  );
}
