"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar-1");

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function AdminTopbar() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  if (!user || user.role !== "admin") return null;

  return (
    <header className="hidden md:flex items-center justify-between border-b-2 border-black bg-background px-6 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-black rounded-lg">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : userAvatar ? (
            <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />
          ) : null}
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-black">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-black text-sm leading-tight">
            {greeting}, {user.name}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
            {user.role}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 border-2 border-black"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 border-2 border-black">
          <DropdownMenuLabel className="font-black">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-6 text-center text-sm text-muted-foreground font-bold">
            You&apos;re all caught up.
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
