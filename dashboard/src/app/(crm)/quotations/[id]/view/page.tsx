"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Printer, Download, Edit } from "lucide-react";
import type { Quotation, AgencySettings, Client } from "@/lib/quotation-models";
import { calculateQuotationTotals } from "@/lib/quotation-models";

export default function QuotationViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [settings, setSettings] = useState<AgencySettings | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        // Fetch quotation
        const qRes = await fetch(`/api/quotations/${id}`);
        if (!qRes.ok) throw new Error("Failed to fetch quotation");
        const qData = await qRes.json();
        setQuotation(qData);

        // Fetch client
        if (qData.clientId) {
          const cRes = await fetch(`/api/clients/${qData.clientId}`);
          if (cRes.ok) setClient(await cRes.json());
        }

        // Fetch settings
        const sRes = await fetch("/api/settings");
        if (sRes.ok) setSettings(await sRes.json());
      } catch (error) {
        console.error("Error loading quotation:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading quotation...</div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Quotation not found</div>
      </div>
    );
  }

  const { subtotal, taxAmount, grandTotal } =
    calculateQuotationTotals(quotation);
  const formattedDate = new Date(quotation.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => {
            const editId =
              (quotation as any)._id || (quotation as any).id || id;
            router.push(`/quotations/create?edit=${editId}`);
          }}
          size="lg"
          variant="outline"
          className="shadow-lg"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button onClick={handlePrint} size="lg" className="shadow-lg">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button
          onClick={handlePrint}
          size="lg"
          className="shadow-lg bg-[#F36F21] hover:bg-[#d85e1a]"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      <div className="print-area min-h-screen bg-white">
        <div className="max-w-[210mm] mx-auto">
          <div className="relative bg-[#F36F21] w-full px-12 py-6 print:fixed print:top-0 print:left-0 print:right-0 print:z-50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-white opacity-30"></div>

            <div className="max-w-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-lg">
                    <img
                      src="/assets/images/logo-transparent.png"
                      alt="Pixelate Nest Logo"
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="border-l-2 border-white pl-4">
                    <h1 className="text-2xl font-black text-white tracking-tight">
                      Pixelate Nest
                    </h1>
                    <p className="text-white text-xs font-medium opacity-90">
                      Creative Digital Solutions
                    </p>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white border-opacity-30">
                  <p className="text-white text-xs font-semibold">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    |{" "}
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="h-screen flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-orange-50 via-white to-orange-50 print:pt-32">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F36F21] via-orange-400 to-[#F36F21]"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#F36F21] via-orange-400 to-[#F36F21]"></div>

            <div className="text-center space-y-8 max-w-2xl">
              <div className="inline-block bg-[#F36F21] text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                {quotation.quoteId}
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                {quotation.title}
              </h1>

              {quotation.subtitle && (
                <p className="text-2xl text-gray-700 font-light">
                  {quotation.subtitle}
                </p>
              )}

              <div className="flex items-center justify-center gap-4 py-4">
                <div className="w-20 h-1 bg-[#F36F21]"></div>
                <div className="w-3 h-3 bg-[#F36F21] rounded-full"></div>
                <div className="w-20 h-1 bg-[#F36F21]"></div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  Prepared For
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {client?.businessName || client?.name || "Valued Client"}
                </p>
              </div>

              <p className="text-lg text-gray-600">{formattedDate}</p>
            </div>
          </section>
          <section className="min-h-screen print:pt-10">
            <div className="px-12 pt-10">
              {/* About Us - Permanent */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-8 bg-[#F36F21] mr-3"></span>
                  About Pixelate Nest
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                  <p>
                    {settings?.aboutUs ||
                      "Pixelate Nest is a leading creative digital agency specializing in innovative software solutions, cutting-edge web and app development, stunning photography, and professional video editing services. We help businesses transform their digital presence and achieve measurable growth through technology-driven solutions."}
                  </p>
                  <p className="text-sm">
                    With a team of experienced developers, designers, and
                    creative professionals, we deliver end-to-end solutions
                    tailored to each client's unique needs. Our expertise spans
                    custom software development, e-commerce platforms, mobile
                    applications, brand photography, corporate video production,
                    and digital marketing content creation.
                  </p>
                  <p className="text-sm">
                    We pride ourselves on our commitment to quality, timely
                    delivery, and exceptional client service. Every project is
                    executed with precision, creativity, and a focus on
                    delivering tangible business results.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🎯</span>
                      Mission
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {settings?.mission ||
                        "To deliver exceptional digital solutions that exceed client expectations."}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-2">👁️</span>
                      Vision
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {settings?.vision ||
                        "To be the leading creative digital agency transforming businesses globally."}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🚀</span>
                      Goal
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {settings?.goal ||
                        "To empower 1000+ businesses with cutting-edge digital solutions."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="min-h-screen px-12 print:pt-20">
            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-8 bg-[#F36F21] mr-3"></span>
                Client Information
              </h3>
              <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#F36F21]">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Client Name
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {client?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900">
                      {client?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <p className="font-semibold text-gray-900">
                      {client?.phone || "N/A"}
                    </p>
                  </div>
                  {client?.address && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Address
                      </p>
                      <p className="font-semibold text-gray-900">
                        {client.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {quotation.objective && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Project Objective
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {quotation.objective}
                </p>
              </section>
            )}

            {quotation.purpose && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Purpose
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {quotation.purpose}
                </p>
              </section>
            )}

            {quotation.scope && quotation.scope.length > 0 && (
              <section className="mb-8 page-break-after">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Scope of Work
                </h3>
                <ul className="space-y-2">
                  {quotation.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#F36F21] mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {quotation.deliverables && quotation.deliverables.length > 0 && (
              <section className="mb-8 page-break-before print:pt-36">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {quotation.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#F36F21] mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {quotation.services && quotation.services.length > 0 && (
              <section className="mb-8 page-break-before">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Services Breakdown
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                          Service
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {quotation.services.map((item, idx) => {
                        const itemTotal = item.price * item.qty;
                        return (
                          <tr key={idx}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {item.serviceName}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 text-center">
                              {item.qty}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                              ₹{item.price.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                              ₹{itemTotal.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-3 text-right text-sm font-semibold text-gray-900"
                        >
                          Grand Total
                        </td>
                        <td className="px-4 py-3 text-right text-lg font-bold text-[#F36F21]">
                          ₹
                          {quotation.services
                            .reduce(
                              (sum, item) => sum + item.price * item.qty,
                              0
                            )
                            .toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
            )}

            {quotation.timeline && quotation.timeline.length > 0 && (
              <section className="mb-8 page-break-after">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Project Timeline
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                          Phase
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                          Description
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {quotation.timeline.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.phase}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {item.description}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            {item.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {quotation.modules && quotation.modules.length > 0 && (
              <section className="mb-8 print:pt-36">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                  Modules & Features
                </h3>
                <div className="space-y-3">
                  {quotation.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {mod.moduleName}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            mod.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : mod.status === "Ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {mod.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{mod.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8 page-break-before">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-[#F36F21] mr-3"></span>
                Terms & Conditions
              </h3>
              <div className="bg-gray-50 p-5 rounded-lg">
                <ol className="space-y-2 list-decimal list-inside">
                  {(quotation.customTerms && quotation.customTerms.length > 0
                    ? quotation.customTerms
                    : settings?.terms || []
                  ).map((term, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      {term}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="mb-8 mt-40">
              <div className="grid grid-cols-2 gap-8">
                <div className="border-t-2 border-gray-300 pt-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Authorized Signatory
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {settings?.name || "Pixelate Nest"}
                  </p>
                </div>
                <div className="border-t-2 border-gray-300 pt-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Client Signature
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {client?.name || "Client"}
                  </p>
                </div>
              </div>
            </section>

            <footer className="p-4 pt-3 border-t-2 border-gray-200 text-center text-xs text-gray-500 print:fixed print:bottom-0 print:left-0 print:right-0 print:bg-white">
              <div className="max-w-4xl mx-auto space-y-2">
                <p>
                  {settings?.footerText ||
                    "© 2025 Pixelate Nest. All rights reserved."}
                </p>

                <div className="flex items-center justify-center gap-6 mt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-small">
                      +91 92341 12345
                    </span>
                  </div>

                  <div className="w-px h-5 bg-gray-300"></div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-small">
                      pixelatenest@gmail.com
                    </span>
                  </div>
                </div>

                <p className="mt-1">
                  {settings?.website || "www.pixelatenest.com"}
                </p>
              </div>
            </footer>
          </div>
          <div className="print:pb-32"></div>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .print-area {
            margin: 0;
            padding: 0;
            max-width: none;
          }

           {
          : always;
            margin-top: 0;
            padding-top: 140px;
          }

          .page-break-after {
            page-break-after: always;
          }

          @page {
            size: A4;
            margin: 0;
          }

          .print\\:fixed {
            position: fixed !important;
          }

          .print\\:top-0 {
            top: 0 !important;
          }

          .print\\:pt-32 {
            padding-top: 140px !important;
          }
        }
      `}</style>
    </>
  );
}
