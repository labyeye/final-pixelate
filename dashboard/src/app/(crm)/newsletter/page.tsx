"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Mail,
  Send,
  ImagePlus,
  X,
  Users,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NewsletterPage() {
  const { toast } = useToast();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file (PNG, JPG, WebP, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5 MB",
        variant: "destructive",
      });
      return;
    }

    setBanner(file);
    const url = URL.createObjectURL(file);
    setBannerPreview(url);
  };

  const removeBanner = () => {
    setBanner(null);
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBannerPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter a subject for your newsletter.",
        variant: "destructive",
      });
      return;
    }
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please write a message before sending.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("subject", subject.trim());
      formData.append("message", message.trim());
      if (banner) formData.append("banner", banner);

      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send newsletter");
      }

      toast({
        title: "Newsletter Sent! 🎉",
        description: `Successfully delivered to ${data.sent} client${data.sent !== 1 ? "s" : ""}.`,
      });

      
      setSubject("");
      setMessage("");
      removeBanner();
    } catch (err: any) {
      toast({
        title: "Failed to send",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  
  const messageHtml = message
    .split(/\n\n+/)
    .map(
      (para) =>
        `<p style="color:#444;line-height:1.8;margin:0 0 16px;">${para.split("\n").join("<br/>")}</p>`,
    )
    .join("");

  const previewHtml = `
    <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:0;margin:0;">
      <div style="background:#1a1a1a;padding:24px 30px;">
        <span style="color:#ff640d;font-size:22px;font-weight:900;letter-spacing:-1px;">Pixelate Nest</span>
      </div>
      <div style="max-width:600px;margin:0 auto;padding:30px 20px;">
        ${bannerPreview ? `<div style="margin-bottom:24px;"><img src="${bannerPreview}" alt="Banner" style="width:100%;border-radius:10px;"/></div>` : ""}
        <div style="background:#fff;padding:36px 30px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h1 style="color:#ff640d;font-size:26px;margin:0 0 20px;">${subject || "Your Subject Here"}</h1>
          ${messageHtml || '<p style="color:#aaa;">Your message will appear here...</p>'}
        </div>
      </div>
      <div style="background:#1a1a1a;color:#888;text-align:center;padding:20px;font-size:13px;">
        <p style="margin:0 0 6px;">© 2026 Kalahanu Tech Studios LLP. All Rights Reserved.</p>
        <p style="margin:0;">You are receiving this because you are a valued client of Pixelate Nest.</p>
      </div>
    </div>`;

  return (
    <div className="space-y-8 font-headline max-w-4xl mx-auto">
      {}
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-3">
            <Mail className="w-10 h-10" />
            NEWSLETTER
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Compose and send a newsletter to all your clients instantly.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-2 border-black gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0">
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-xl font-black">
                  Email Preview
                </DialogTitle>
              </DialogHeader>
              <div
                className="border-t"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleSend}
            disabled={sending}
            size="lg"
            className="gap-2 text-base"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Newsletter
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {}
        <div className="flex items-center gap-3 rounded-lg border-2 border-black bg-primary/10 px-5 py-4">
          <Users className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm font-bold">
            This newsletter will be delivered to{" "}
            <span className="text-primary">all clients</span> stored in the
            database. Each client's email will be BCC'd to protect privacy.
          </p>
        </div>

        {}
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-xl font-black">Subject Line</CardTitle>
            <CardDescription>
              Write a compelling subject to improve open rates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Exciting news from Pixelate Nest 🚀"
              className="border-2 border-black text-base h-12 font-bold placeholder:font-normal"
              maxLength={150}
            />
            <p className="text-xs text-muted-foreground mt-2 text-right">
              {subject.length} / 150
            </p>
          </CardContent>
        </Card>

        {}
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-xl font-black">
              Header Banner Image
            </CardTitle>
            <CardDescription>
              Upload a banner image that will appear at the top of the email.
              (Optional · max 5 MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bannerPreview ? (
              <div className="relative">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full rounded-lg border-2 border-black object-cover max-h-64"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 border-2 border-black"
                  onClick={removeBanner}
                >
                  <X className="w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-2 font-bold">
                  {banner?.name} &nbsp;·&nbsp;{" "}
                  {((banner?.size ?? 0) / 1024).toFixed(0)} KB
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-black rounded-lg hover:bg-muted/40 transition-colors cursor-pointer gap-3"
              >
                <ImagePlus className="w-10 h-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="font-bold text-sm">Click to upload banner</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WebP — up to 5 MB
                  </p>
                </div>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
          </CardContent>
        </Card>

        {}
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-xl font-black">Message Body</CardTitle>
            <CardDescription>
              Write your newsletter content. Use blank lines to separate
              paragraphs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear clients,&#10;&#10;We're excited to share some great updates with you…&#10;&#10;Warm regards,&#10;Team Pixelate Nest"
              className="border-2 border-black text-base min-h-[320px] resize-y leading-relaxed"
            />
            <p className="text-xs text-muted-foreground mt-2 text-right">
              {message.length} characters
            </p>
          </CardContent>
        </Card>

        {}
        <div className="flex justify-end pb-4">
          <Button
            onClick={handleSend}
            disabled={sending}
            size="lg"
            className="gap-2 text-base px-10"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending to all clients…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Newsletter
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
