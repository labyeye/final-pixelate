"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronDown,
  User,
  Phone,
  FileText,
  MessageCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface WaTemplate {
  _id: string;
  name: string;
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  language: string;
  headerType: "NONE" | "TEXT" | "IMAGE" | "DOCUMENT" | "VIDEO";
  headerText?: string | null;
  body: string;
  footer?: string | null;
  variables: string[];
  status: "LOCAL" | "SUBMITTED" | "APPROVED" | "REJECTED" | "PAUSED" | "UNKNOWN";
}

interface Client {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  MARKETING: "bg-purple-100 text-purple-700 border-purple-200",
  UTILITY: "bg-blue-100 text-blue-700 border-blue-200",
  AUTHENTICATION: "bg-orange-100 text-orange-700 border-orange-200",
};

function renderBodyPreview(body: string, values: Record<string, string>): string {
  return body.replace(/\{\{(\d+)\}\}/g, (_match, num) => {
    const val = values[num];
    return val ? `*${val}*` : `{{${num}}}`;
  });
}

export default function WhatsAppSendPage() {
  const { toast } = useToast();

  const [templates, setTemplates] = useState<WaTemplate[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);

  // Recipient state
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [manualPhone, setManualPhone] = useState("");
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  // Template state
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<WaTemplate | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  // Send state
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState<{ success: boolean; messageId?: string } | null>(null);

  useEffect(() => {
    apiFetch("/api/whatsapp-templates?status=APPROVED")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setTemplates(list);
      })
      .catch(() => setTemplates([]))
      .finally(() => setLoadingTemplates(false));

    apiFetch("/api/clients?slim=1")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setClients(list);
      })
      .catch(() => setClients([]))
      .finally(() => setLoadingClients(false));
  }, []);

  const filteredClients = useMemo(() => {
    const q = clientSearch.toLowerCase();
    if (!q) return clients.slice(0, 10);
    return clients
      .filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.phone?.includes(q) ||
          c.company?.toLowerCase().includes(q),
      )
      .slice(0, 10);
  }, [clients, clientSearch]);

  const filteredTemplates = useMemo(() => {
    const q = templateSearch.toLowerCase();
    if (!q) return templates;
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.body.toLowerCase().includes(q),
    );
  }, [templates, templateSearch]);

  function selectClient(c: Client) {
    setSelectedClient(c);
    setClientSearch(c.name);
    setManualPhone(c.phone || "");
    setShowClientDropdown(false);
  }

  function clearClient() {
    setSelectedClient(null);
    setClientSearch("");
    setManualPhone("");
  }

  function selectTemplate(t: WaTemplate) {
    setSelectedTemplate(t);
    setVariableValues({});
    setLastResult(null);
  }

  const effectivePhone = manualPhone.trim();
  const bodyVarNums = selectedTemplate
    ? [...new Set([...(selectedTemplate.body.matchAll(/\{\{(\d+)\}\}/g))].map((m) => Number(m[1])))].sort((a, b) => a - b)
    : [];
  const canSend =
    !!selectedTemplate &&
    !!effectivePhone &&
    bodyVarNums.every((n) => variableValues[String(n)]?.trim());

  async function handleSend() {
    if (!canSend || !selectedTemplate) return;
    setSending(true);
    setLastResult(null);

    // Count variables from the body text itself ({{1}}, {{2}}...) — source of truth for Meta
    const bodyVarNums = [...new Set(
      [...(selectedTemplate.body.matchAll(/\{\{(\d+)\}\}/g))].map((m) => Number(m[1]))
    )].sort((a, b) => a - b);

    const bodyParams = bodyVarNums.map((n) => ({
      type: "text",
      text: variableValues[String(n)] || "",
    }));

    const components: any[] = [];
    if (bodyParams.length > 0) {
      components.push({ type: "body", parameters: bodyParams });
    }

    try {
      const res = await apiFetch("/api/whatsapp/send-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: effectivePhone,
          templateName: selectedTemplate.name,
          templateLang: selectedTemplate.language || "en",
          components,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        setLastResult({ success: true, messageId: data.messageId });
        toast({ title: "Message sent!", description: `Delivered to ${effectivePhone}` });
      } else {
        setLastResult({ success: false });
        toast({
          title: "Send failed",
          description: data?.error || "Unknown error",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      setLastResult({ success: false });
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

  const variables = bodyVarNums;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Send WhatsApp Message</h1>
          </div>
          <p className="text-sm text-gray-500 ml-12">
            Select a client and a template, fill in the variables, then send.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: recipient + template picker */}
          <div className="lg:col-span-2 space-y-5">
            {/* Recipient */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Recipient
              </h2>

              {/* Client search */}
              <div className="relative mb-3">
                <Label className="text-xs text-gray-500 mb-1 block">Search client</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-9 pr-9"
                    placeholder="Search by name, phone, or company…"
                    value={clientSearch}
                    onChange={(e) => {
                      setClientSearch(e.target.value);
                      setShowClientDropdown(true);
                      if (!e.target.value) clearClient();
                    }}
                    onFocus={() => setShowClientDropdown(true)}
                  />
                  {selectedClient && (
                    <button
                      onClick={clearClient}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {showClientDropdown && clientSearch && !selectedClient && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                    {loadingClients ? (
                      <div className="p-3 text-sm text-gray-500 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                      </div>
                    ) : filteredClients.length === 0 ? (
                      <div className="p-3 text-sm text-gray-400">No clients found</div>
                    ) : (
                      filteredClients.map((c) => (
                        <button
                          key={c._id}
                          onClick={() => selectClient(c)}
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center justify-between gap-2 border-b last:border-0"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-800">{c.name}</p>
                            {c.company && (
                              <p className="text-xs text-gray-500">{c.company}</p>
                            )}
                          </div>
                          {c.phone && (
                            <span className="text-xs text-gray-400 shrink-0">{c.phone}</span>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Phone number */}
              <div>
                <Label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone number
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  placeholder="919876543210 (with country code, no +)"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Include country code without +. E.g. 919876543210
                </p>
              </div>
            </div>

            {/* Template picker */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Choose a Template
              </h2>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search templates…"
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                />
              </div>

              {loadingTemplates ? (
                <div className="flex items-center justify-center py-12 gap-2 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Loading templates…</span>
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No approved templates found.</p>
                  <p className="text-xs mt-1">
                    Go to WhatsApp Templates to create and get one approved.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 max-h-[420px] overflow-y-auto pr-1">
                  {filteredTemplates.map((t) => {
                    const isSelected = selectedTemplate?._id === t._id;
                    return (
                      <button
                        key={t._id}
                        onClick={() => selectTemplate(t)}
                        className={cn(
                          "w-full text-left rounded-xl border-2 p-4 transition-all hover:shadow-md",
                          isSelected
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-gray-100 bg-gray-50 hover:border-gray-300",
                        )}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-800 text-sm">
                              {t.name}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                                CATEGORY_COLORS[t.category] ?? "bg-gray-100 text-gray-600 border-gray-200",
                              )}
                            >
                              {t.category}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                          {t.body}
                        </p>
                        {(() => {
                          const cnt = new Set([...(t.body.matchAll(/\{\{(\d+)\}\}/g))].map(m => m[1])).size;
                          return cnt > 0 ? (
                            <p className="text-[10px] text-gray-400 mt-2">
                              {cnt} variable{cnt > 1 ? "s" : ""} to fill
                            </p>
                          ) : null;
                        })()}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right panel: variables + preview + send */}
          <div className="space-y-5">
            {/* Variables */}
            {selectedTemplate && variables.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                  Fill Variables
                </h2>
                <div className="space-y-3">
                  {variables.map((n) => {
                    const key = String(n);
                    return (
                      <div key={key}>
                        <Label className="text-xs text-gray-500 mb-1 block">
                          {`{{${key}}}`}
                        </Label>
                        <Input
                          placeholder={`Variable ${key}`}
                          value={variableValues[key] || ""}
                          onChange={(e) =>
                            setVariableValues((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Preview */}
            {selectedTemplate && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Preview</h2>
                <div className="bg-[#ECE5DD] rounded-xl p-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm max-w-[260px] ml-auto">
                    {selectedTemplate.headerText && (
                      <p className="text-xs font-bold text-gray-700 mb-2">
                        {selectedTemplate.headerText}
                      </p>
                    )}
                    <p
                      className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: renderBodyPreview(selectedTemplate.body, variableValues)
                          .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br/>"),
                      }}
                    />
                    {selectedTemplate.footer && (
                      <p className="text-[10px] text-gray-400 mt-2 border-t pt-1">
                        {selectedTemplate.footer}
                      </p>
                    )}
                    <p className="text-[9px] text-gray-300 text-right mt-1">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Send button */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              {lastResult?.success && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3 mb-4 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <div>
                    <p className="font-medium">Sent successfully!</p>
                    {lastResult.messageId && (
                      <p className="text-xs text-green-500 mt-0.5 break-all">
                        ID: {lastResult.messageId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {lastResult?.success === false && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3 mb-4 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>Failed to send. Check the phone number and template.</p>
                </div>
              )}

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
                disabled={!canSend || sending}
                onClick={handleSend}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>

              {!selectedTemplate && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  Select a template first
                </p>
              )}
              {selectedTemplate && !effectivePhone && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  Enter a phone number to send
                </p>
              )}
              {selectedTemplate &&
                effectivePhone &&
                variables.length > 0 &&
                !variables.every((_, i) => variableValues[String(i + 1)]?.trim()) && (
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Fill all variables to enable send
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
