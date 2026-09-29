(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/_6998a599._.js",
"[project]/src/instrumentation.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Runs once when the Next.js server process boots (dev and prod, PM2 restarts
// included). Pings each connected product's backend so a misconfigured URL/
// secret or a down backend shows up immediately in the server logs instead of
// only surfacing later as a "Fetch Failed" toast somewhere in the CRM UI.
__turbopack_context__.s([
    "register",
    ()=>register
]);
async function checkProduct({ label, backendUrl, secret }) {
    if (!backendUrl || !secret) {
        console.log(`⚠️  ${label} not configured — missing backend URL or secret`);
        return;
    }
    try {
        const controller = new AbortController();
        const timeout = setTimeout(()=>controller.abort(), 5000);
        const res = await fetch(`${backendUrl}/internal/stats`, {
            headers: {
                "X-Stats-Key": secret
            },
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (res.ok) {
            console.log(`✅ ${label} Connected (${backendUrl})`);
        } else {
            console.log(`❌ ${label} responded with ${res.status} (${backendUrl})`);
        }
    } catch (err) {
        console.log(`❌ ${label} unreachable at ${backendUrl} — ${err?.message ?? err}`);
    }
}
async function register() {
    // This module is also loaded for the edge runtime; only run the checks
    // once, from the actual Node.js server process.
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const products = undefined;
}
}),
"[project]/edge-wrapper.js { MODULE => \"[project]/src/instrumentation.ts [instrumentation-edge] (ecmascript)\" } [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i("[project]/src/instrumentation.ts [instrumentation-edge] (ecmascript)"));
modProm.catch(()=>{});
self._ENTRIES["middleware_instrumentation"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}),
]);

//# sourceMappingURL=_6998a599._.js.map