"use client";

import { BulkWhatsAppMessenger } from "@/components/whatsapp/bulk-messenger";

export default function BulkMessagingPage() {
  return (
    <div className="space-y-6 font-headline">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-black tracking-tighter">
          📱 BULK WHATSAPP MESSAGING
        </h1>
        <p className="text-muted-foreground mt-2">
          Send personalized messages to BNI contacts in bulk. Perfect for follow-ups after
          networking events.
        </p>
      </header>

      {/* Main Component */}
      <BulkWhatsAppMessenger />

      {/* Quick Stats */}
      
    </div>
  );
}
