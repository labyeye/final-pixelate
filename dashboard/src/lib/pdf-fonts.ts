// Lightweight helper to register Noto Sans with jsPDF at runtime.
// It fetches the TTF from Google's fonts CDN, converts to base64 and registers
// it using doc.addFileToVFS + doc.addFont. Returns the family name to use.
export async function loadNotoSansForJsPDF(doc: any, fontName = 'NotoSans') {
  try {
    // Prefer a local copy (no network dependency). Place the TTF at /fonts/NotoSans-Regular.ttf
    // If the local file isn't present, fall back to the Google fonts URL.
    const localUrl = '/fonts/NotoSans-Regular.ttf';
    let res = await fetch(localUrl, { method: 'GET' }).catch(() => null as any);
    if (!res || !res.ok) {
      // fallback to CDN
      const cdn = 'https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNb4g.ttf';
      res = await fetch(cdn);
      if (!res.ok) throw new Error('Failed to fetch font from CDN');
    }
    const arrayBuffer = await res.arrayBuffer();
    // convert to base64
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, Array.from(bytes.slice(i, i + chunkSize)) as any);
    }
    const base64 = typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');

    const vfsName = fontName + '.ttf';
    // jsPDF expects the base64 string without data: prefix
    doc.addFileToVFS(vfsName, base64);
    // register font: fontName, alias, style
    doc.addFont(vfsName, fontName, 'normal');
    return fontName;
  } catch (e) {
    console.error('Could not load Noto Sans for jsPDF', e);
    return null;
  }
}
