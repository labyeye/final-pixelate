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
import { apiFetch } from "@/lib/api-fetch";

const WA_GREEN = "#25D366";

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

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

interface Props {
  invoice: any;
  client?: any;
  onClientUpdate?: (updatedClient: any) => void;
}

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

export function WhatsAppOptInToggle({
  client,
  onClientUpdate,
}: {
  client?: any;
  onClientUpdate?: (updated: any) => void;
}) {
  const [toggling, setToggling] = useState(false);
  const togglingRef = React.useRef(false);
  const optedIn = client?.whatsapp_opted_in === true;
  const clientId = String(client?._id ?? client?.id ?? "");

  if (!clientId) return null;

  const toggle = async () => {
    if (togglingRef.current) return;
    togglingRef.current = true;
    setToggling(true);
    try {
      if (!optedIn) {
        const res = await apiFetch("/api/whatsapp-optin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, source: "manual_toggle" }),
        });
        if (!res.ok) throw new Error("Opt-in failed");
      } else {
        const res = await apiFetch("/api/whatsapp-optin", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId }),
        });
        if (!res.ok) throw new Error("Opt-out failed");
      }
      onClientUpdate?.(null);
    } catch (e) {
      console.error("WhatsApp opt-in toggle failed", e);
    } finally {
      togglingRef.current = false;
      setToggling(false);
    }
  };

  return (
    <button
      type="button"
      title={
        optedIn
          ? "WhatsApp opted in — click to revoke"
          : "Click to opt this client in to WhatsApp messages"
      }
      onClick={toggle}
      disabled={toggling}
      className={`h-8 w-8 flex items-center justify-center rounded border-2 text-xs font-bold transition-colors disabled:opacity-50 ${
        optedIn
          ? "border-[#25D366] bg-green-50 text-[#25D366]"
          : "border-gray-300 bg-white text-gray-400 hover:border-[#25D366] hover:text-[#25D366]"
      }`}
    >
      {toggling ? (
        <svg
          className="animate-spin w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : optedIn ? (
        <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <WhatsAppIcon className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

export function WhatsAppInvoiceSendButton({
  invoice,
  client,
  onClientUpdate,
}: Props) {
  const { send, sending, status, statusMessage, error, messageId } =
    useWhatsAppInvoice();

  const [resultModalOpen, setResultModalOpen] = useState(false);

  const isSuccess = status === "success";
  const isError = status === "error";

  const clientName =
    client?.name ?? invoice?.clientName ?? invoice?.client ?? "Client";
  const invNo = invoice?.invoiceNo ?? invoice?.id ?? "—";
  const phone = resolvePhone(client, invoice);

  const optedIn = client?.whatsapp_opted_in === true;
  const alreadySent = invoice?.whatsapp_sent === true;
  const clientId = String(client?._id ?? client?.id ?? "");
  const invoiceId = String(invoice?._id ?? invoice?.id ?? "");

  const disabledReason: string | null = !phone
    ? "No WhatsApp number saved for this client"
    : !optedIn
      ? "Client has not opted in to receive WhatsApp messages. Ask them to consent on next invoice creation."
      : null;

  const isDisabled = sending || !!disabledReason;

  async function handleSend() {
    if (isDisabled) return;

    setResultModalOpen(false);
    await send({
      invoice,
      client,
      phone: phone!,
      ...(clientId ? { clientId } : {}),
      ...(invoiceId ? { invoiceId } : {}),
    } as any);
    setResultModalOpen(true);
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 border-[#25D366] disabled:opacity-60 disabled:cursor-not-allowed text-[#25D366] hover:bg-[#25D366] hover:text-white"
        title={
          disabledReason ??
          (alreadySent
            ? `Resend invoice to ${phone} via WhatsApp (already sent${invoice?.whatsapp_sent_at ? ` on ${new Date(invoice.whatsapp_sent_at).toLocaleDateString("en-IN")}` : ""})`
            : `Send invoice to ${phone} via WhatsApp`)
        }
        disabled={isDisabled}
        onClick={handleSend}
      >
        {sending ? <Spinner /> : <WhatsAppIcon />}
      </Button>
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
              ) : !optedIn ? (
                <>🔒 Opt-In Required</>
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

                {phone && !optedIn && (
                  <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-amber-800 text-sm space-y-1">
                    <p className="font-semibold">📋 WhatsApp Opt-In Required</p>
                    <p>
                      <strong>{clientName}</strong> has not consented to receive
                      WhatsApp messages from Pixelate Studio.
                    </p>
                    <p className="text-xs mt-2">
                      To send invoices on WhatsApp, check the{" "}
                      <em>"Send on WhatsApp"</em> checkbox the next time you
                      create an invoice for this client. This records their
                      consent and prevents error 131049.
                    </p>
                  </div>
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
                    {error && <p className="font-medium">{error}</p>}
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
            {isError && phone && optedIn && (
              <Button
                size="sm"
                className="bg-[#25D366] hover:bg-[#1ebe5a] text-white"
                onClick={async () => {
                  setResultModalOpen(false);
                  await send({
                    invoice,
                    client,
                    phone: phone!,
                    ...(clientId ? { clientId } : {}),
                    ...(invoiceId ? { invoiceId } : {}),
                  } as any);
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
