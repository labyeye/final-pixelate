"use client";

import Image from "next/image";

import { Twitter, MessageCircle } from "lucide-react";
import instagramIcon from "@/assets/images/social/Instagram_icon.png";
import facebookIcon from "@/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp";
import linkedinIcon from "@/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp";
import youtubeIcon from "@/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp";
import gmbIcon from "@/assets/images/social/google-my-business-logo.svg";

interface PlatformIconProps {
  platform: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PlatformIcon({
  platform,
  size = "md",
  className = "",
}: PlatformIconProps) {
  const sizeMap = { sm: 16, md: 20, lg: 26 };
  const px = sizeMap[size];

  const imgClass = `flex-shrink-0 ${className}`;

  switch (platform) {
    case "Instagram":
      return (
        <Image
          src={instagramIcon}
          alt="Instagram"
          width={px}
          height={px}
          className={imgClass}
        />
      );
    case "Facebook":
      return (
        <Image
          src={facebookIcon}
          alt="Facebook"
          width={px}
          height={px}
          className={imgClass}
        />
      );
    case "LinkedIn":
      return (
        <Image
          src={linkedinIcon}
          alt="LinkedIn"
          width={px}
          height={px}
          className={imgClass}
        />
      );
    case "YouTube Shorts":
      return (
        <Image
          src={youtubeIcon}
          alt="YouTube Shorts"
          width={px}
          height={px}
          className={imgClass}
        />
      );
    case "Google My Business":
      return (
        <Image
          src={gmbIcon}
          alt="Google My Business"
          width={px}
          height={px}
          className={imgClass}
        />
      );
    case "X / Twitter":
      return (
        <Twitter
          size={px}
          className={`${className} flex-shrink-0`}
          strokeWidth={2.5}
        />
      );
    case "WhatsApp Channel":
      return (
        <MessageCircle
          size={px}
          className={`${className} flex-shrink-0`}
          strokeWidth={2.5}
        />
      );
    default:
      return null;
  }
}

export function PlatformOption({ platform }: { platform: string }) {
  return (
    <div className="flex items-center gap-2">
      <PlatformIcon platform={platform} size="sm" />
      <span>{platform}</span>
    </div>
  );
}
