module.exports = [
"[project]/src/lib/quotation-pdf-generator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateQuotationPdfNative",
    ()=>generateQuotationPdfNative
]);
async function generateQuotationPdfNative(quote, clientData, settings) {
    const { default: jsPDF } = await __turbopack_context__.A("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript, async loader)");
    const W = 210;
    const H = 297;
    const M = 15;
    const CW = W - 2 * M;
    const HEADER_H = 18;
    const CT = HEADER_H + 6; // content top
    const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait"
    });
    const clientName = (clientData?.businessName || clientData?.name || "Valued Client").toUpperCase();
    const displayId = quote.quoteId || quote.id || "QUOTATION";
    const grandTotal = (quote.services || []).reduce((s, sv)=>s + (sv.price || 0) * (sv.qty || 1), 0);
    const generatedAt = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    const formattedDate = new Date(quote.date || Date.now()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const agencyName = (settings?.name || "PIXELATE NEST").toUpperCase();
    // total pages count
    let totalPagesCount = 3;
    if (quote.scope?.length > 0) totalPagesCount++;
    totalPagesCount += 2; // deliverables+services, timeline
    if (quote.modules?.length > 0) totalPagesCount++;
    totalPagesCount++; // notes+terms+signature
    let currentPage = 0;
    // ── helpers ──────────────────────────────────────────────────
    const drawHeader = ()=>{
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, W, HEADER_H, "F");
        doc.setDrawColor(17, 17, 17);
        doc.setLineWidth(0.7);
        doc.line(0, HEADER_H, W, HEADER_H);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(17, 17, 17);
        doc.text(agencyName, M, 11);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(17, 17, 17);
        doc.text(clientName, W - M, 8, {
            align: "right"
        });
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Generated: " + generatedAt, W - M, 14, {
            align: "right"
        });
    };
    const drawPageNum = (n)=>{
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(180, 180, 180);
        doc.text(`${n} / ${totalPagesCount}`, W - M, H - 5, {
            align: "right"
        });
    };
    const sectionHead = (text, y)=>{
        doc.setFillColor(17, 17, 17);
        doc.rect(M, y, 1.5, 7, "F");
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(17, 17, 17);
        doc.text(text.toUpperCase(), M + 5, y + 5.5);
        return y + 12;
    };
    const wrapText = (text, x, y, maxW, fs = 9, color = [
        51,
        51,
        51
    ])=>{
        doc.setFontSize(fs);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text || "", maxW);
        doc.text(lines, x, y);
        return y + lines.length * (fs * 0.38 + 0.5);
    };
    // ── P1: Cover ────────────────────────────────────────────────
    currentPage++;
    const cx = W / 2;
    doc.setFillColor(17, 17, 17);
    doc.rect(0, 0, W, 5, "F");
    let y = 48;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    doc.text(agencyName, cx, y, {
        align: "center"
    });
    y += 18;
    // Quote ID pill
    const pillText = displayId.toUpperCase();
    doc.setFontSize(8);
    const pillW = doc.getTextWidth(pillText) + 12;
    doc.setFillColor(17, 17, 17);
    doc.rect(cx - pillW / 2, y - 5, pillW, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.text(pillText, cx, y, {
        align: "center"
    });
    y += 18;
    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    const titleLines = doc.splitTextToSize((quote.title || "PROJECT QUOTATION").toUpperCase(), 170);
    doc.text(titleLines, cx, y, {
        align: "center"
    });
    y += titleLines.length * 10 + 6;
    if (quote.subtitle) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        const subLines = doc.splitTextToSize(quote.subtitle, 140);
        doc.text(subLines, cx, y, {
            align: "center"
        });
        y += subLines.length * 5.5 + 8;
    }
    y += 8;
    doc.setDrawColor(17, 17, 17);
    doc.setLineWidth(0.8);
    doc.line(M + 20, y, W - M - 20, y);
    y += 7;
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("PREPARED FOR", cx, y, {
        align: "right"
    });
    y += 8;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    doc.text(clientName, cx, y, {
        align: "center"
    });
    y += 4;
    doc.line(M + 20, y, W - M - 20, y);
    y += 14;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text(formattedDate.toUpperCase(), cx, y, {
        align: "center"
    });
    doc.setFillColor(17, 17, 17);
    doc.rect(0, H - 5, W, 5, "F");
    drawPageNum(currentPage);
    // ── P2: About / Company ──────────────────────────────────────
    doc.addPage();
    currentPage++;
    // Dark background
    doc.setFillColor(17, 17, 17);
    doc.rect(0, 0, W, H, "F");
    // Dark header
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.7);
    doc.line(0, HEADER_H, W, HEADER_H);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(agencyName, M, 11);
    doc.setFontSize(8);
    doc.text(clientName, W - M, 8, {
        align: "right"
    });
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(170, 170, 170);
    doc.text("Generated: " + generatedAt, W - M, 14, {
        align: "right"
    });
    y = CT + 2;
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(agencyName, M, y);
    y += 5;
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(170, 170, 170);
    doc.text("CREATIVE SOFTWARE & DIGITAL SOLUTIONS", M, y);
    y += 3;
    doc.setDrawColor(68, 68, 68);
    doc.setLineWidth(0.5);
    doc.line(M, y, W - M, y);
    y += 10;
    if (settings?.aboutUs) {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(1.5);
        doc.line(M, y, M, y + 5);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(170, 170, 170);
        doc.text("ABOUT US", M + 5, y + 4);
        y += 9;
        const aLines = doc.splitTextToSize(settings.aboutUs, CW);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(200, 200, 200);
        doc.text(aLines, M, y);
        y += aLines.length * 4.2 + 10;
    }
    // MVG boxes
    const bW = (CW - 8) / 3;
    const bH = 42;
    const mvg = [
        {
            label: "Mission",
            text: settings?.mission || "To deliver exceptional digital solutions that exceed client expectations."
        },
        {
            label: "Vision",
            text: settings?.vision || "To be the leading creative digital agency transforming businesses globally."
        },
        {
            label: "Goal",
            text: settings?.goal || "To empower 1000+ businesses with cutting-edge digital solutions."
        }
    ];
    const mvgY = y;
    mvg.forEach((item, i)=>{
        const bx = M + i * (bW + 4);
        doc.setFillColor(30, 30, 30);
        doc.setDrawColor(51, 51, 51);
        doc.setLineWidth(0.5);
        doc.rect(bx, mvgY, bW, bH, "FD");
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text(item.label.toUpperCase(), bx + 4, mvgY + 8);
        const tl = doc.splitTextToSize(item.text, bW - 8);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(187, 187, 187);
        doc.text(tl.slice(0, 6), bx + 4, mvgY + 14);
    });
    y = mvgY + bH + 8;
    // Contact box
    doc.setDrawColor(51, 51, 51);
    doc.setLineWidth(0.5);
    doc.rect(M, y, CW, 34, "D");
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.5);
    doc.line(M + 3, y + 5, M + 3, y + 11);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(170, 170, 170);
    doc.text("CONTACT", M + 7, y + 10);
    const contacts = [
        {
            label: "Email",
            value: settings?.email || "info@pixelatenest.com"
        },
        {
            label: "Phone",
            value: settings?.phone || "+91 XXXXXXXXXX"
        },
        {
            label: "Address",
            value: settings?.address || "Kala Bhawan, Muzaffarpur, Bihar"
        },
        {
            label: "Website",
            value: settings?.website || "www.pixelatenest.com"
        }
    ];
    contacts.forEach((c, i)=>{
        const ccx = M + i % 2 * (CW / 2) + 6;
        const ccy = y + 17 + Math.floor(i / 2) * 10;
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(102, 102, 102);
        doc.text(c.label.toUpperCase(), ccx, ccy);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text(c.value, ccx, ccy + 4.5);
    });
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(120, 120, 120);
    doc.text(`${currentPage} / ${totalPagesCount}`, W - M, H - 5, {
        align: "right"
    });
    // ── P3: Client Information ────────────────────────────────────
    doc.addPage();
    currentPage++;
    drawHeader();
    y = CT;
    y = sectionHead("Client Information", y);
    doc.setDrawColor(17, 17, 17);
    doc.setLineWidth(0.6);
    doc.rect(M, y, CW, 24, "D");
    const cf = [
        {
            label: "Client Name",
            value: clientData?.name || "N/A"
        },
        {
            label: "Email",
            value: clientData?.email || "N/A"
        },
        {
            label: "Phone",
            value: clientData?.phone || "N/A"
        }
    ];
    cf.forEach((f, i)=>{
        const fx = M + 5 + i * 61;
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text(f.label.toUpperCase(), fx, y + 7);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(17, 17, 17);
        doc.text(f.value, fx, y + 13);
    });
    if (clientData?.address) {
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("ADDRESS", M + 5, y + 18);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(17, 17, 17);
        doc.text(clientData.address, M + 5, y + 22.5);
    }
    y += 28;
    if (quote.objective) {
        y = sectionHead("Project Objective", y);
        y = wrapText(quote.objective, M, y, CW) + 10;
    }
    if (quote.purpose) {
        y = sectionHead("Purpose", y);
        y = wrapText(quote.purpose, M, y, CW) + 10;
    }
    drawPageNum(currentPage);
    // ── P4 (cond): Scope of Work ────────────────────────────────
    if (quote.scope?.length > 0) {
        doc.addPage();
        currentPage++;
        drawHeader();
        y = CT;
        y = sectionHead("Scope of Work", y);
        quote.scope.forEach((item, idx)=>{
            const bg = idx % 2 === 0 ? [
                255,
                255,
                255
            ] : [
                248,
                248,
                248
            ];
            const lines = doc.splitTextToSize(item, CW - 14);
            const rH = Math.max(8, lines.length * 4.5 + 4);
            if (y + rH > H - 16) {
                doc.addPage();
                currentPage++;
                drawHeader();
                y = CT;
            }
            doc.setFillColor(bg[0], bg[1], bg[2]);
            doc.setDrawColor(221, 221, 221);
            doc.setLineWidth(0.3);
            doc.rect(M, y, CW, rH, "FD");
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(17, 17, 17);
            doc.text(String(idx + 1).padStart(2, "0") + ".", M + 3, y + rH / 2 + 1.5);
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 51, 51);
            doc.text(lines, M + 12, y + rH / 2 - (lines.length - 1) * 2.1 + 1.5);
            y += rH;
        });
        drawPageNum(currentPage);
    }
    // ── P5: Deliverables + Services ─────────────────────────────
    doc.addPage();
    currentPage++;
    drawHeader();
    y = CT;
    if (quote.deliverables?.length > 0) {
        y = sectionHead("Deliverables", y);
        quote.deliverables.forEach((item, idx)=>{
            const bg = idx % 2 === 0 ? [
                255,
                255,
                255
            ] : [
                248,
                248,
                248
            ];
            const lines = doc.splitTextToSize(item, CW - 12);
            const rH = Math.max(7, lines.length * 4.2 + 3);
            doc.setFillColor(bg[0], bg[1], bg[2]);
            doc.setDrawColor(221, 221, 221);
            doc.setLineWidth(0.3);
            doc.rect(M, y, CW, rH, "FD");
            doc.setDrawColor(17, 17, 17);
            doc.setLineWidth(0.5);
            doc.rect(M + 3, y + rH / 2 - 1.5, 3, 3, "D");
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 51, 51);
            doc.text(lines, M + 9, y + rH / 2 - (lines.length - 1) * 2 + 1.5);
            y += rH;
        });
        y += 8;
    }
    if (quote.services?.length > 0) {
        y = sectionHead("Services Breakdown", y);
        const cols = [
            {
                label: "Service",
                x: M,
                w: 88,
                align: "left"
            },
            {
                label: "Qty",
                x: M + 88,
                w: 20,
                align: "center"
            },
            {
                label: "Price",
                x: M + 108,
                w: 37,
                align: "right"
            },
            {
                label: "Total",
                x: M + 145,
                w: 35,
                align: "right"
            }
        ];
        doc.setFillColor(17, 17, 17);
        doc.rect(M, y, CW, 8, "F");
        cols.forEach((col)=>{
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            const tx = col.align === "right" ? col.x + col.w - 2 : col.align === "center" ? col.x + col.w / 2 : col.x + 3;
            doc.text(col.label.toUpperCase(), tx, y + 5.5, {
                align: col.align
            });
        });
        y += 8;
        quote.services.forEach((item, idx)=>{
            const itemTotal = (item.price || 0) * (item.qty || 1);
            const bg = idx % 2 === 0 ? [
                255,
                255,
                255
            ] : [
                248,
                248,
                248
            ];
            doc.setFillColor(bg[0], bg[1], bg[2]);
            doc.setDrawColor(221, 221, 221);
            doc.setLineWidth(0.3);
            doc.rect(M, y, CW, 8, "FD");
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(17, 17, 17);
            doc.text(item.serviceName || "Service", M + 3, y + 5.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 51, 51);
            doc.text(String(item.qty || 1), M + 98, y + 5.5, {
                align: "center"
            });
            doc.text("Rs." + (item.price || 0).toLocaleString("en-IN"), M + 143, y + 5.5, {
                align: "right"
            });
            doc.setFont("helvetica", "bold");
            doc.setTextColor(17, 17, 17);
            doc.text("Rs." + itemTotal.toLocaleString("en-IN"), W - M - 2, y + 5.5, {
                align: "right"
            });
            y += 8;
        });
        // Grand total
        doc.setFillColor(17, 17, 17);
        doc.rect(M, y, CW, 10, "F");
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text("GRAND TOTAL", M + 3, y + 6.5);
        doc.setFontSize(12);
        doc.text("Rs." + grandTotal.toLocaleString("en-IN"), W - M - 2, y + 7, {
            align: "right"
        });
        y += 10;
    }
    drawPageNum(currentPage);
    // ── P6: Timeline ────────────────────────────────────────────
    doc.addPage();
    currentPage++;
    drawHeader();
    y = CT;
    if (quote.timeline?.length > 0) {
        y = sectionHead("Project Timeline", y);
        doc.setFillColor(17, 17, 17);
        doc.rect(M, y, CW, 8, "F");
        const tlCols = [
            {
                label: "Phase",
                x: M + 3
            },
            {
                label: "Description",
                x: M + 55
            },
            {
                label: "Duration",
                x: W - M - 2,
                right: true
            }
        ];
        tlCols.forEach((c)=>{
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text(c.label.toUpperCase(), c.x, y + 5.5, c.right ? {
                align: "right"
            } : undefined);
        });
        y += 8;
        quote.timeline.forEach((item, idx)=>{
            const bg = idx % 2 === 0 ? [
                255,
                255,
                255
            ] : [
                248,
                248,
                248
            ];
            const descLines = doc.splitTextToSize(item.description || "", 62);
            const rH = Math.max(8, descLines.length * 4.2 + 4);
            doc.setFillColor(bg[0], bg[1], bg[2]);
            doc.setDrawColor(221, 221, 221);
            doc.setLineWidth(0.3);
            doc.rect(M, y, CW, rH, "FD");
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(17, 17, 17);
            doc.text(item.phase || "", M + 3, y + rH / 2 + 1.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 51, 51);
            doc.text(descLines, M + 55, y + rH / 2 - (descLines.length - 1) * 2 + 1.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(17, 17, 17);
            doc.text(item.duration || "", W - M - 2, y + rH / 2 + 1.5, {
                align: "right"
            });
            y += rH;
        });
    }
    drawPageNum(currentPage);
    // ── P7 (cond): Modules ──────────────────────────────────────
    if (quote.modules?.length > 0) {
        doc.addPage();
        currentPage++;
        drawHeader();
        y = CT;
        y = sectionHead("Modules & Features", y);
        const mW = (CW - 6) / 2;
        quote.modules.forEach((mod, idx)=>{
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const bx = M + col * (mW + 6);
            const by = y + row * 38;
            doc.setDrawColor(17, 17, 17);
            doc.setLineWidth(0.6);
            doc.rect(bx, by, mW, 35, "D");
            const sBg = mod.status === "Completed" ? [
                17,
                17,
                17
            ] : mod.status === "Ongoing" ? [
                85,
                85,
                85
            ] : [
                221,
                221,
                221
            ];
            const sFg = mod.status === "Completed" || mod.status === "Ongoing" ? [
                255,
                255,
                255
            ] : [
                17,
                17,
                17
            ];
            const sW = 22;
            doc.setFillColor(sBg[0], sBg[1], sBg[2]);
            doc.rect(bx + mW - sW - 3, by + 3, sW, 5, "F");
            doc.setFontSize(6);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(sFg[0], sFg[1], sFg[2]);
            doc.text((mod.status || "PLANNED").toUpperCase(), bx + mW - sW / 2 - 3, by + 6.5, {
                align: "center"
            });
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(17, 17, 17);
            doc.text(mod.moduleName || "Module", bx + 4, by + 9);
            doc.setFontSize(7.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(85, 85, 85);
            const dl = doc.splitTextToSize(mod.description || "", mW - 8);
            doc.text(dl.slice(0, 4), bx + 4, by + 15);
        });
        drawPageNum(currentPage);
    }
    // ── P Last: Notes + Terms + Signature ───────────────────────
    doc.addPage();
    currentPage++;
    drawHeader();
    y = CT;
    if (quote.paymentTerms || quote.notes) {
        y = sectionHead("Additional Information", y);
        const aiTop = y;
        if (quote.paymentTerms) {
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(100, 100, 100);
            doc.text("PAYMENT TERMS", M + 4, y + 5);
            const ptLines = doc.splitTextToSize(quote.paymentTerms, CW - 8);
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 51, 51);
            doc.text(ptLines, M + 4, y + 11);
            y += 11 + ptLines.length * 4.5 + 4;
        }
        if (quote.notes) {
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(100, 100, 100);
            doc.text("NOTES", M + 4, y + 5);
            const nLines = doc.splitTextToSize(quote.notes, CW - 8);
            doc.setFontSize(8.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 51, 51);
            doc.text(nLines, M + 4, y + 11);
            y += 11 + nLines.length * 4.5 + 4;
        }
        doc.setDrawColor(17, 17, 17);
        doc.setLineWidth(0.6);
        doc.rect(M, aiTop - 2, CW, y - aiTop + 4, "D");
        y += 8;
    }
    y = sectionHead("Terms & Conditions", y);
    const terms = settings?.terms?.length > 0 ? settings.terms : [
        "Payment terms: 50% advance, 50% on completion",
        "Project timeline is subject to timely feedback and approvals",
        "Revisions beyond agreed scope will be charged separately",
        "All deliverables remain property of agency until full payment",
        "Client must provide necessary content and assets on time"
    ];
    const termsTop = y;
    terms.forEach((term, idx)=>{
        const tl = doc.splitTextToSize(term, CW - 14);
        const rH = tl.length * 4.5 + 4;
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(17, 17, 17);
        doc.text(String(idx + 1) + ".", M + 4, y + 4.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 51, 51);
        doc.text(tl, M + 10, y + 4.5);
        y += rH;
    });
    doc.setDrawColor(17, 17, 17);
    doc.setLineWidth(0.6);
    doc.rect(M, termsTop - 2, CW, y - termsTop + 4, "D");
    y += 10;
    // Signature
    doc.setDrawColor(17, 17, 17);
    doc.setLineWidth(0.8);
    doc.line(M, y, W - M, y);
    y += 6;
    const hW = (CW - 10) / 2;
    doc.setLineWidth(0.5);
    doc.line(M, y + 16, M + hW, y + 16);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    doc.text("AUTHORIZED SIGNATORY", M, y + 21);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 85);
    doc.text(settings?.name || "Kalahanu Tech Studios LLP", M, y + 27);
    const sigX = M + hW + 10;
    doc.line(sigX, y + 16, sigX + hW, y + 16);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    doc.text("CLIENT SIGNATURE", sigX, y + 21);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 85);
    doc.text(clientName, sigX, y + 27);
    doc.setTextColor(153, 153, 153);
    doc.text("Date: __________________", sigX, y + 32);
    y += 42;
    // Footer
    doc.setDrawColor(221, 221, 221);
    doc.setLineWidth(0.4);
    doc.line(M, y, W - M, y);
    y += 5;
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(85, 85, 85);
    const footerText = settings?.footerText || `© 2026 ${settings?.name || "Kalahanu Tech Studios LLP"}. All Rights Reserved.`;
    doc.text(footerText, cx, y, {
        align: "center"
    });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(153, 153, 153);
    doc.text(`${settings?.phone || "+91 84069 12345"}  |  ${settings?.email || "support@pixelatenest.com"}  |  ${settings?.website || "www.pixelatenest.com"}`, cx, y + 5, {
        align: "center"
    });
    drawPageNum(currentPage);
    const blob = doc.output("blob");
    const base64 = doc.output("datauristring").split(",")[1];
    const safeTitle = (quote.title || "Quotation").replace(/[^a-zA-Z0-9-_]/g, "-");
    const filename = `${displayId}-${safeTitle}.pdf`;
    return {
        blob,
        base64,
        filename
    };
}
}),
];

//# sourceMappingURL=src_lib_quotation-pdf-generator_ts_b7e7265f._.js.map