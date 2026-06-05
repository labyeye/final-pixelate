"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle, Upload, Send } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
  company?: string;
  status?: "pending" | "done" | "failed";
  messageId?: string;
  error?: string;
}

interface SendResult {
  success: boolean;
  phone: string;
  messageId?: string;
  error?: string;
}

export function BulkWhatsAppMessenger() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [csvInput, setCsvInput] = useState("");
  const [templateName, setTemplateName] = useState("bni_outreach");
  const [isSending, setIsSending] = useState(false);
  const [results, setResults] = useState<SendResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "template">("upload");

  const parseCSV = (csv: string): Contact[] => {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return [];

    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const nameIdx = header.findIndex(
      (h) => h === "name" || h === "contact name" || h === "person name",
    );
    const phoneIdx = header.findIndex(
      (h) => h === "phone" || h === "mobile" || h === "phone number",
    );
    const companyIdx = header.findIndex(
      (h) => h === "company" || h === "organization" || h === "business",
    );

    if (nameIdx === -1 || phoneIdx === -1) {
      setError("CSV must have 'Name' and 'Phone' columns");
      return [];
    }

    const parsed: Contact[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(",").map((p) => p.trim());
      if (parts[nameIdx] && parts[phoneIdx]) {
        parsed.push({
          name: parts[nameIdx],
          phone: parts[phoneIdx],
          company: companyIdx !== -1 ? parts[companyIdx] : undefined,
        });
      }
    }

    return parsed;
  };

  const parseXLSX = (buffer: ArrayBuffer): Contact[] => {
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!worksheet) {
      setError("No worksheet found in XLSX file");
      return [];
    }

    const data = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

    if (data.length < 2) {
      setError("XLSX must have header row and at least one data row");
      return [];
    }

    const header = (data[0] as string[]).map((h) =>
      String(h).trim().toLowerCase(),
    );
    const nameIdx = header.findIndex(
      (h) => h === "name" || h === "contact name" || h === "person name",
    );
    const phoneIdx = header.findIndex(
      (h) => h === "phone" || h === "mobile" || h === "phone number",
    );
    const companyIdx = header.findIndex(
      (h) => h === "company" || h === "organization" || h === "business",
    );

    if (nameIdx === -1 || phoneIdx === -1) {
      setError("XLSX must have 'Name' and 'Phone' columns");
      return [];
    }

    const parsed: Contact[] = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i] as (string | undefined)[];
      const name = String(row[nameIdx] || "").trim();
      const phone = String(row[phoneIdx] || "").trim();

      if (name && phone) {
        parsed.push({
          name,
          phone,
          company:
            companyIdx !== -1
              ? String(row[companyIdx] || "").trim()
              : undefined,
        });
      }
    }

    return parsed;
  };

  const handleCSVPaste = () => {
    if (!csvInput.trim()) {
      setError("Please paste CSV data");
      return;
    }

    const parsed = parseCSV(csvInput);
    if (parsed.length === 0) {
      setError("No valid contacts found in CSV");
      return;
    }

    setContacts(parsed);
    setError("");
    setCsvInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        const buffer = await file.arrayBuffer();
        const parsed = parseXLSX(buffer);

        if (parsed.length === 0) {
          setError("No valid contacts found in XLSX file");
          return;
        }

        setContacts(parsed);
        setError("");
      } else if (file.name.endsWith(".csv")) {
        const text = await file.text();
        const parsed = parseCSV(text);

        if (parsed.length === 0) {
          setError("No valid contacts found in CSV file");
          return;
        }

        setContacts(parsed);
        setError("");
      } else {
        setError("Please upload a CSV or XLSX file");
        return;
      }
    } catch (err: any) {
      setError("Failed to read file: " + err.message);
    }
  };

  const handleSendMessages = async () => {
    if (contacts.length === 0) {
      setError("No contacts to send messages to");
      return;
    }

    if (!window.confirm(`Send messages to ${contacts.length} contacts?`)) {
      return;
    }

    setIsSending(true);
    setError("");
    setResults([]);

    try {
      const response = await apiFetch("/api/whatsapp/bulk-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contacts,
          template_name: templateName,
          is_promotional: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send messages");
      }

      const data = await response.json();
      setResults(data.details || []);
      setShowResults(true);

      const updatedContacts = contacts.map((contact) => {
        const result = data.details?.find(
          (r: SendResult) => r.phone === contact.phone,
        );
        if (result) {
          return {
            ...contact,
            status: result.success ? ("done" as const) : ("failed" as const),
            messageId: result.messageId,
            error: result.error,
          };
        }
        return contact;
      });
      setContacts(updatedContacts);

      alert(
        `Messages sent! Success: ${data.summary.successful}, Failed: ${data.summary.failed}`,
      );
    } catch (err: any) {
      setError(err.message || "Failed to send messages");
    } finally {
      setIsSending(false);
    }
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const addContact = (name: string, phone: string, company?: string) => {
    if (!name || !phone) return;
    setContacts([...contacts, { name, phone, company }]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk WhatsApp Messaging - BNI Visitor Outreach</CardTitle>
          <CardDescription>
            Send personalized messages to multiple contacts at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "upload"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              📁 Upload Contacts
            </button>
            <button
              onClick={() => setActiveTab("template")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "template"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              📋 Message Template
            </button>
          </div>

          {}
          {activeTab === "upload" && (
            <div className="space-y-4">
              {}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Option 1: Upload File (CSV or XLSX)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Supported: CSV, XLSX, XLS - Must have columns: Name, Phone,
                  (Company optional)
                </p>
              </div>

              {}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Option 2: Paste CSV Data
                </label>
                <Textarea
                  placeholder={`Name,Phone,Company
John Doe,9876543210,ABC Corp
Jane Smith,9123456789,XYZ Ltd`}
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  className="min-h-[150px] font-mono text-sm"
                />
                <Button
                  onClick={handleCSVPaste}
                  variant="outline"
                  className="w-full"
                >
                  Parse CSV Data
                </Button>
              </div>

              {}
              {error && (
                <div className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {}
              {contacts.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Contacts Loaded: {contacts.length}
                  </label>
                  <div className="max-h-[300px] overflow-y-auto rounded border">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">
                            Name
                          </th>
                          <th className="px-3 py-2 text-left font-medium">
                            Phone
                          </th>
                          <th className="px-3 py-2 text-left font-medium">
                            Company
                          </th>
                          <th className="px-3 py-2 text-center font-medium">
                            Status
                          </th>
                          <th className="px-3 py-2 text-center font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact, idx) => (
                          <tr key={idx} className="border-t hover:bg-gray-50">
                            <td className="px-3 py-2">{contact.name}</td>
                            <td className="px-3 py-2 font-mono">
                              {contact.phone}
                            </td>
                            <td className="px-3 py-2 text-gray-600">
                              {contact.company || "-"}
                            </td>
                            <td className="px-3 py-2 text-center">
                              {contact.status === "done" ? (
                                <div className="flex items-center justify-center gap-1">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-xs text-green-600 font-semibold">
                                    Done
                                  </span>
                                </div>
                              ) : contact.status === "failed" ? (
                                <div
                                  className="flex items-center justify-center gap-1"
                                  title={contact.error}
                                >
                                  <XCircle className="h-4 w-4 text-red-600" />
                                  <span className="text-xs text-red-600 font-semibold">
                                    Failed
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-1">
                                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                                  <span className="text-xs text-gray-500 font-semibold">
                                    Pending
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <button
                                onClick={() => removeContact(idx)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {}
              {contacts.length > 0 && (
                <Button
                  onClick={handleSendMessages}
                  disabled={isSending}
                  size="lg"
                  className="w-full"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSending
                    ? "Sending Messages..."
                    : `Send to ${contacts.length} Contacts`}
                </Button>
              )}
            </div>
          )}

          {}
          {activeTab === "template" && (
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📌 Message Template - Kalahanu Tech Studios LLP
                </h3>
                <div className="space-y-3 text-sm text-blue-900">
                  <p>
                    <strong>Subject:</strong> BNI Visitor Follow-up from
                    Kalahanu Tech Studios
                  </p>
                  <p>
                    <strong>Main Message:</strong>
                  </p>
                  <div className="ml-4 font-mono text-xs bg-white p-3 rounded border border-blue-300 whitespace-pre-wrap">
                    {`I came as a visitor and met you at BNI recently! 👋

I'm from Kalahanu Tech Studios LLP and we specialize in:
{{service_one}}
{{service_two}}
{{service_three}}

If you need any of these services or know someone who does, feel free to reach out!
Let's connect!`}
                  </div>
                  <p className="mt-3">
                    <strong>Placeholders Used:</strong>
                  </p>
                  <ul className="ml-4 space-y-1">
                    <li>person_name = Your Contact's Name</li>
                    <li>service_one = Web Development</li>
                    <li>service_two = App Development</li>
                    <li>service_three = Digital Solutions</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  ⚠️ Important: Promotional Message Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-yellow-900">
                  <li>
                    ✅ <strong>DO:</strong> Personalize with person's name
                  </li>
                  <li>
                    ✅ <strong>DO:</strong> Mention how you met them (BNI
                    visitor)
                  </li>
                  <li>
                    ✅ <strong>DO:</strong> Keep CTA (Call-To-Action) soft
                  </li>
                  <li>
                    ❌ <strong>DON'T:</strong> Use ALL CAPS
                  </li>
                  <li>
                    ❌ <strong>DON'T:</strong> Use too many emojis
                  </li>
                  <li>
                    ❌ <strong>DON'T:</strong> Mention direct discount/pricing
                  </li>
                  <li>
                    ⚠️ <strong>NOTE:</strong> WhatsApp may flag as promotional
                    if not from approved template
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">
                  ✅ CSV Format Required
                </h3>
                <div className="font-mono text-xs bg-white p-3 rounded border border-green-300 overflow-x-auto">
                  {`Name,Phone,Company
Aayush Agarwal,9176778826,Rudravir Industries
Abhishek Bidasaria,9177399803,Arohi Sales Pvt Ltd
Khushij Jain,9182946509,Matrix Sports`}
                </div>
                <p className="text-sm text-green-900 mt-2">
                  • <strong>Name:</strong> Person's name (required)
                </p>
                <p className="text-sm text-green-900">
                  • <strong>Phone:</strong> 10-digit or +91 format (required)
                </p>
                <p className="text-sm text-green-900">
                  • <strong>Company:</strong> Their business name (optional)
                </p>
              </div>
            </div>
          )}

          {}
          {showResults && results.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">📊 Send Results</h3>
              <div className="max-h-[300px] overflow-y-auto rounded border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Phone</th>
                      <th className="px-3 py-2 text-left font-medium">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="px-3 py-2 font-mono text-sm">
                          {result.phone}
                        </td>
                        <td className="px-3 py-2">
                          {result.success ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              Sent
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600">
                              <XCircle className="h-4 w-4" />
                              Failed
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-gray-600 text-xs">
                          {result.error || result.messageId || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
