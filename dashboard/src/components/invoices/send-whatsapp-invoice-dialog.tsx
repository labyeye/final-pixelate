"use client";

/**
 * WhatsAppInvoiceSendButton
 *
 * A single button that:
 *  1. On click → immediately shows a loading spinner, disables itself
 *  2. Reads the phone number from the client/invoice record (no manual input)
 *  3. Calls the full useWhatsAppInvoice send flow in the background
 *  4. On success → shows a success modal
 *  5. On error   → shows an error modal with the exact reason
 *
 * No phone-input modal. No manual steps. Fully automated.
 *
 * Usage (replaces the old SendWhatsAppInvoiceDialog):
 *   <WhatsAppInvoiceSendButton invoice={invoice} client={client} />
 */

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWhatsAppInvoice } from "@/hooks/use-whatsapp-invoice";

// ── Shared WhatsApp SVG icon ──────────────────────────────────────────────────
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <path
        d="M22.8 19.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
        fill="white"
      />
      <path
        d="M16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.86.5 3.6 1.36 5.1L5.5 26.5l5.56-1.34A10.44 10.44 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5S21.8 5.5 16 5.5zm0 19.25a8.73 8.73 0 0 1-4.47-1.22l-.32-.19-3.3.8.82-3.22-.21-.33A8.74 8.74 0 0 1 7.25 16c0-4.83 3.93-8.75 8.75-8.75S24.75 11.17 24.75 16 20.83 24.75 16 24.75z"
        fill="white"
      />
    </svg>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  invoice: any;
  client?: any;
}

/** Strip non-digits and auto-prepend 91 for bare 10-digit Indian numbers */
function resolvePhone(client: any, invoice: any): string | null {
  const raw =
    client?.phone ??
    client?.whatsapp ??
    invoice?.clientPhone ??
    invoice?.phone ??
    "";
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) return "91" + digits;
  return digits;
}

// ── Main component ────────────────────────────────────────────────────────────
export function WhatsAppInvoiceSendButton({ invoice, client }: Props) {
  const { send, sending, status, statusMessage, error, messageId } =
    useWhatsAppInvoice();

  const [resultModalOpen, setResultModalOpen] = useState(false);

  const isSuccess = status === "success";
  const isError   = status === "error";

  const clientName = client?.name ?? invoice?.clientName ?? invoice?.client ?? "Client";
  const invNo      = invoice?.invoiceNo ?? invoice?.id ?? "—";
  const phone      = resolvePhone(client, invoice);

  async function handleSend() {
    if (sending) return;

    if (!phone) {
      // No phone on record — show error modal immediately without API call
      setResultModalOpen(true);
      return;
    }

    setResultModalOpen(false);
    await send({ invoice, client, phone });
    // Open result modal after send completes (success or error)
    setResultModalOpen(true);
  }

  return (
    <>
      {/* ── The button ─────────────────────────────────────────────────── */}
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
        title={phone ? `Send invoice to ${phone} via WhatsApp` : "No WhatsApp number on record"}
        disabled={sending}
        onClick={handleSend}
      >
        {sending ? <Spinner /> : <WhatsAppIcon />}
      </Button>

      {/* ── Result modal (success or error) ────────────────────────────── */}
      <Dialog
        open={resultModalOpen}
        onOpenChange={(open) => {
          if (!open && !sending) setResultModalOpen(false);
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {!phone ? (
                <>⚠️ No WhatsApp Number</>
              ) : isSuccess ? (
                <>
                  <span className="text-[#25D366]">
                    <WhatsAppIcon className="w-5 h-5 inline" />
                  </span>{" "}
                  Message Sent
                </>
              ) : (
                <>❌ Delivery Failed</>
              )}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 pt-1 text-sm text-muted-foreground">
                {!phone && (
                  <p>
                    No WhatsApp / phone number is saved for{" "}
                    <strong>{clientName}</strong>. Please update the client
                    record and try again.
                  </p>
                )}

                {isSuccess && (
                  <>
                    <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-800 text-sm space-y-1">
                      <p>
                        ✅ Invoice <strong>#{invNo}</strong> was accepted by
                        WhatsApp for delivery to{" "}
                        <strong className="font-mono">+{phone}</strong>.
                      </p>
                      {messageId && (
                        <p className="text-xs opacity-70 break-all">
                          Message ID: {messageId}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> "Accepted" means WhatsApp queued
                      the message. Actual delivery is tracked via the webhook.
                      The recipient will receive it on all linked devices
                      (mobile + WhatsApp Web) as long as their number is active.
                    </p>
                  </>
                )}

                {isError && (
                  <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-800 text-sm space-y-2">
                    <p>
                      ❌ Failed to send invoice <strong>#{invNo}</strong> to{" "}
                      <strong className="font-mono">+{phone}</strong>.
                    </p>
                    {error && (
                      <p className="font-medium">{error}</p>
                    )}
                    <p className="text-xs opacity-80">
                      Common causes: number not on WhatsApp, wrong country code,
                      template not approved, or expired access token.
                    </p>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant={isError ? "destructive" : "outline"}
              size="sm"
              onClick={() => setResultModalOpen(false)}
            >
              Close
            </Button>
            {isError && phone && (
              <Button
                size="sm"
                className="bg-[#25D366] hover:bg-[#1ebe5a] text-white"
                onClick={async () => {
                  setResultModalOpen(false);
                  await send({ invoice, client, phone });
                  setResultModalOpen(true);
                }}
                disabled={sending}
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Retrying…
                  </span>
                ) : (
                  "Retry"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ── Backwards-compatible alias ────────────────────────────────────────────────
// The old dialog accepted open/onClose props. This shim lets any code that
// still uses <SendWhatsAppInvoiceDialog open={x} onClose={y} …/> compile
// without errors during migration.
export function SendWhatsAppInvoiceDialog({
  invoice,
  client,
}: {
  invoice: any;
  client?: any;
  open?: boolean;
  onClose?: () => void;
}) {
  return <WhatsAppInvoiceSendButton invoice={invoice} client={client} />;
}