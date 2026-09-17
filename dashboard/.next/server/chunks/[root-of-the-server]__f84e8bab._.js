module.exports=[814747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},500874,(e,t,r)=>{t.exports=e.x("buffer",()=>require("buffer"))},193695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},918622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},556704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},832319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},324725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},224361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},688947,(e,t,r)=>{t.exports=e.x("stream",()=>require("stream"))},254799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},673507,e=>{"use strict";var t=e.i(89171),r=e.i(79832);function o(e){let o=(e.headers.get("authorization")||"").replace("Bearer ",""),n=o?(0,r.verifyToken)(o):null;return n?{decoded:n,error:null}:{decoded:null,error:t.NextResponse.json({error:"unauthorized"},{status:401})}}e.s(["requireAuth",()=>o])},522734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},446786,(e,t,r)=>{t.exports=e.x("os",()=>require("os"))},427699,(e,t,r)=>{t.exports=e.x("events",()=>require("events"))},792509,(e,t,r)=>{t.exports=e.x("url",()=>require("url"))},921517,(e,t,r)=>{t.exports=e.x("http",()=>require("http"))},524836,(e,t,r)=>{t.exports=e.x("https",()=>require("https"))},406461,(e,t,r)=>{t.exports=e.x("zlib",()=>require("zlib"))},504446,(e,t,r)=>{t.exports=e.x("net",()=>require("net"))},679594,(e,t,r)=>{t.exports=e.x("dns",()=>require("dns"))},755004,(e,t,r)=>{t.exports=e.x("tls",()=>require("tls"))},233405,(e,t,r)=>{t.exports=e.x("child_process",()=>require("child_process"))},95643,e=>{"use strict";var t=e.i(747909),r=e.i(174017),o=e.i(996250),n=e.i(759756),a=e.i(561916),i=e.i(114444),s=e.i(837092),p=e.i(869741),d=e.i(316795),l=e.i(487718),c=e.i(995169),x=e.i(47587),u=e.i(666012),g=e.i(570101),f=e.i(626937),h=e.i(10372),m=e.i(193695);e.i(52474);var y=e.i(600220),v=e.i(89171),b=e.i(129508),w=e.i(673507);async function R(e){let t=(0,w.requireAuth)(e);if(t.error)return t.error;let r=process.env.EMAIL,o=process.env.APP_PASSWORD,n=process.env.WEBSITE_URL||"https://pixelatenest.com";if(!r||!o)return v.NextResponse.json({error:"Email credentials not configured"},{status:503});try{let t=await e.json(),{to:a,clientName:i,quotation:s,agencyName:p,agencyPhone:d,agencyEmail:l,agencyWebsite:c}=t;if(!a)return v.NextResponse.json({error:"Recipient email is required"},{status:400});let x=(s.services||[]).reduce((e,t)=>e+t.price*t.qty,0),u=s.date?new Date(s.date).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}):new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),g=(s.services||[]).map(e=>`
        <tr>
          <td style="padding:10px 14px;border:1px solid #ddd;font-weight:600;color:#111;">${e.serviceName}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:center;color:#555;">${e.qty}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:right;color:#555;">Rs.${e.price.toLocaleString("en-IN")}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:700;color:#111;">Rs.${(e.price*e.qty).toLocaleString("en-IN")}</td>
        </tr>`).join(""),f=(s.timeline||[]).map(e=>`
        <tr>
          <td style="padding:10px 14px;border:1px solid #ddd;font-weight:600;color:#111;">${e.phase}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:right;color:#555;">${e.duration}</td>
        </tr>`).join(""),h=`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">

  <!-- Header -->
  <div style="background:#111;padding:24px 40px;display:flex;align-items:center;justify-content:space-between;">
    <img src="${n}/assets/images/Logo_White_Name_Large.png" alt="${p||"Pixelate Nest"}" style="height:48px;object-fit:contain;">
    <span style="color:#aaa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Quotation</span>
  </div>

  <!-- Body -->
  <div style="max-width:640px;margin:0 auto;padding:32px 20px;">

    <!-- Quote ID + title block -->
    <div style="background:#fff;border:2px solid #111;margin-bottom:24px;">
      <div style="background:#111;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;">
        <span style="color:#fff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;">${s.quoteId||"QUOTATION"}</span>
        <span style="color:#aaa;font-size:11px;font-weight:700;">${u}</span>
      </div>
      <div style="padding:24px;">
        <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#111;text-transform:uppercase;letter-spacing:-0.01em;">${s.title||"Project Quotation"}</h1>
        <p style="margin:0;font-size:14px;color:#555;">Prepared for <strong>${i}</strong></p>
      </div>
    </div>

    <!-- Greeting -->
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:15px;color:#111;">Dear <strong>${i}</strong>,</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
        Thank you for considering <strong>${p||"Pixelate Nest"}</strong>. Please find below the details of our quotation for your project. We would be happy to discuss any aspect of this proposal at your convenience.
      </p>
    </div>

    ${g?`
    <!-- Services -->
    <div style="margin-bottom:24px;">
      <div style="background:#111;padding:12px 16px;border:2px solid #111 border-bottom:none;">
        <span style="color:#fff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;">Services Breakdown</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:left;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Service</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:center;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Qty</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Price</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Total</th>
          </tr>
        </thead>
        <tbody>${g}</tbody>
        <tfoot>
          <tr style="background:#111;">
            <td colspan="3" style="padding:14px;border:1px solid #333;text-align:right;color:#fff;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Grand Total</td>
            <td style="padding:14px;border:1px solid #333;text-align:right;color:#fff;font-weight:900;font-size:18px;">Rs.${x.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    `:`
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;text-align:center;">
      <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#555;margin-bottom:8px;">Total Amount</div>
      <div style="font-size:32px;font-weight:900;color:#111;">Rs.${x.toLocaleString("en-IN")}</div>
    </div>
    `}

    ${f?`
    <!-- Timeline -->
    <div style="margin-bottom:24px;">
      <div style="background:#111;padding:12px 16px;">
        <span style="color:#fff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;">Project Timeline</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:left;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Phase</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Duration</th>
          </tr>
        </thead>
        <tbody>${f}</tbody>
      </table>
    </div>
    `:""}

    ${s.paymentTerms?`
    <!-- Payment Terms -->
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#555;margin-bottom:8px;">Payment Terms</div>
      <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">${s.paymentTerms}</p>
    </div>
    `:""}

    ${s.notes?`
    <!-- Notes -->
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#555;margin-bottom:8px;">Notes</div>
      <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">${s.notes}</p>
    </div>
    `:""}

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <p style="font-size:14px;color:#555;margin-bottom:16px;">Have questions? We are here to help.</p>
      <a href="mailto:${l||r}" style="display:inline-block;background:#111;color:#fff;padding:14px 32px;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;">Contact Us</a>
    </div>

  </div>

  <!-- Footer -->
  <div style="background:#111;padding:20px 40px;text-align:center;">
    <p style="margin:0 0 6px;color:#aaa;font-size:11px;font-weight:700;">${p||"Pixelate Nest"} &nbsp;|&nbsp; ${d||"+91 84069 12345"} &nbsp;|&nbsp; ${l||"support@pixelatenest.com"}</p>
    <p style="margin:0;color:#666;font-size:10px;">${c||"www.pixelatenest.com"}</p>
  </div>

</body>
</html>`,m=b.default.createTransport({service:"gmail",auth:{user:r,pass:o}}),y={from:`${p||"Pixelate Nest"} <${r}>`,to:a,subject:`Quotation ${s.quoteId||""} — ${s.title||"Project Proposal"} | ${p||"Pixelate Nest"}`,html:h};if(t.pdfBase64){let e=(s.title||"Quotation").replace(/[^a-zA-Z0-9-_]/g,"-");y.attachments=[{filename:t.pdfFilename||`${s.quoteId||"Quotation"}-${e}.pdf`,content:t.pdfBase64,encoding:"base64",contentType:"application/pdf"}]}return await m.sendMail(y),v.NextResponse.json({success:!0})}catch(e){return console.error("send-quotation-email error:",e),v.NextResponse.json({error:e.message||"Failed to send email"},{status:500})}}e.s(["POST",()=>R],211983);var q=e.i(211983);let E=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/send-quotation-email/route",pathname:"/api/send-quotation-email",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/send-quotation-email/route.ts",nextConfigOutput:"",userland:q}),{workAsyncStorage:$,workUnitAsyncStorage:N,serverHooks:P}=E;function T(){return(0,o.patchFetch)({workAsyncStorage:$,workUnitAsyncStorage:N})}async function k(e,t,o){E.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let v="/api/send-quotation-email/route";v=v.replace(/\/index$/,"")||"/";let b=await E.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==o.waitUntil||o.waitUntil.call(o,Promise.resolve()),null;let{buildId:w,params:R,nextConfig:q,parsedUrl:$,isDraftMode:N,prerenderManifest:P,routerServerContext:T,isOnDemandRevalidate:k,revalidateOnlyGenerated:A,resolvedPathname:C,clientReferenceManifest:z,serverActionsManifest:j}=b,S=(0,p.normalizeAppPath)(v),I=!!(P.dynamicRoutes[S]||P.routes[C]),_=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,$,!1):t.end("This page could not be found"),null);if(I&&!N){let e=!!P.routes[C],t=P.dynamicRoutes[S];if(t&&!1===t.fallback&&!e){if(q.experimental.adapterPath)return await _();throw new m.NoFallbackError}}let O=null;!I||E.isDev||N||(O="/index"===(O=C)?"/":O);let D=!0===E.isDev||!I,H=I&&!D;j&&z&&(0,i.setReferenceManifestsSingleton)({page:v,clientReferenceManifest:z,serverActionsManifest:j,serverModuleMap:(0,s.createServerModuleMap)({serverActionsManifest:j})});let U=e.method||"GET",M=(0,a.getTracer)(),L=M.getActiveScopeSpan(),B={params:R,prerenderManifest:P,renderOpts:{experimental:{authInterrupts:!!q.experimental.authInterrupts},cacheComponents:!!q.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:q.cacheLife,waitUntil:o.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,o)=>E.onRequestError(e,t,o,T)},sharedContext:{buildId:w}},F=new d.NodeNextRequest(e),K=new d.NodeNextResponse(t),Q=l.NextRequestAdapter.fromNodeNextRequest(F,(0,l.signalFromNodeResponse)(t));try{let i=async e=>E.handle(Q,B).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=r.get("next.route");if(o){let t=`${U} ${o}`;e.setAttributes({"next.route":o,"http.route":o,"next.span_name":t}),e.updateName(t)}else e.updateName(`${U} ${v}`)}),s=!!(0,n.getRequestMeta)(e,"minimalMode"),p=async n=>{var a,p;let d=async({previousCacheEntry:r})=>{try{if(!s&&k&&A&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await i(n);e.fetchMetrics=B.renderOpts.fetchMetrics;let p=B.renderOpts.pendingWaitUntil;p&&o.waitUntil&&(o.waitUntil(p),p=void 0);let d=B.renderOpts.collectedTags;if(!I)return await (0,u.sendResponse)(F,K,a,B.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(a.headers);d&&(t[h.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==B.renderOpts.collectedRevalidate&&!(B.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&B.renderOpts.collectedRevalidate,o=void 0===B.renderOpts.collectedExpire||B.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:B.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:o}}}}catch(t){throw(null==r?void 0:r.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,x.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:k})},T),t}},l=await E.handleResponse({req:e,nextConfig:q,cacheKey:O,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:P,isRoutePPREnabled:!1,isOnDemandRevalidate:k,revalidateOnlyGenerated:A,responseGenerator:d,waitUntil:o.waitUntil,isMinimalMode:s});if(!I)return null;if((null==l||null==(a=l.value)?void 0:a.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(p=l.value)?void 0:p.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",k?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let c=(0,g.fromNodeOutgoingHttpHeaders)(l.value.headers);return s&&I||c.delete(h.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||t.getHeader("Cache-Control")||c.get("Cache-Control")||c.set("Cache-Control",(0,f.getCacheControlHeader)(l.cacheControl)),await (0,u.sendResponse)(F,K,new Response(l.value.body,{headers:c,status:l.value.status||200})),null};L?await p(L):await M.withPropagatedContext(e.headers,()=>M.trace(c.BaseServerSpan.handleRequest,{spanName:`${U} ${v}`,kind:a.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},p))}catch(t){if(t instanceof m.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:S,routeType:"route",revalidateReason:(0,x.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:k})}),I)throw t;return await (0,u.sendResponse)(F,K,new Response(null,{status:500})),null}}e.s(["handler",()=>k,"patchFetch",()=>T,"routeModule",()=>E,"serverHooks",()=>P,"workAsyncStorage",()=>$,"workUnitAsyncStorage",()=>N],95643)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__f84e8bab._.js.map