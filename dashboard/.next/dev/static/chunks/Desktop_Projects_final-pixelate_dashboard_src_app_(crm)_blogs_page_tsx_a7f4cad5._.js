(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogsAdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function BlogsAdminPage() {
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [excerpt, setExcerpt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [importText, setImportText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [serverPosts, setServerPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogsAdminPage.useEffect": ()=>{
            const raw = localStorage.getItem("pn_posts");
            if (raw) {
                try {
                    setPosts(JSON.parse(raw));
                } catch (e) {}
            }
            
            ({
                "BlogsAdminPage.useEffect": async ()=>{
                    try {
                        const res = await fetch("/api/blogs");
                        if (res.ok) {
                            const data = await res.json();
                            setServerPosts(Array.isArray(data) ? data : []);
                        }
                    } catch (e) {
                    
                    }
                }
            })["BlogsAdminPage.useEffect"]();
        }
    }["BlogsAdminPage.useEffect"], []);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const isAdmin = user?.role === "admin";
    function persist(p) {
        localStorage.setItem("pn_posts", JSON.stringify(p));
    }
    function handleFile(e) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = ()=>setImagePreview(String(r.result));
        r.readAsDataURL(f);
    }
    async function addPost() {
        if (!title) return alert("title required");
        const newPost = {
            id: Date.now(),
            title,
            category,
            excerpt,
            content,
            image: imagePreview,
            createdAt: new Date().toISOString()
        };
        
        const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://backend.pixelatenest.com" : "";
        try {
            const res = await fetch(API_BASE + "/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });
            if (res.ok) {
                const saved = await res.json();
                
                const toUse = {
                    ...newPost,
                    ...saved
                };
                const p = [
                    toUse,
                    ...posts
                ];
                setPosts(p);
                persist(p);
                setTitle("");
                setCategory("");
                setExcerpt("");
                setContent("");
                setImagePreview("");
                return;
            }
        } catch (e) {
        
        }
        
        const p = [
            newPost,
            ...posts
        ];
        setPosts(p);
        persist(p);
        setTitle("");
        setCategory("");
        setExcerpt("");
        setContent("");
        setImagePreview("");
        alert("Saved locally (server unreachable).");
    }
    function removePost(id) {
        (async ()=>{
            const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://backend.pixelatenest.com" : "";
            try {
                
                const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
                    method: "DELETE"
                });
                if (res.ok) {
                    const p = posts.filter((x)=>x.id !== id);
                    setPosts(p);
                    persist(p);
                    return;
                }
            } catch (e) {
            
            }
            
            const p = posts.filter((x)=>x.id !== id);
            setPosts(p);
            persist(p);
        })();
    }
    
    async function publishLocalPosts() {
        const raw = localStorage.getItem("pn_posts");
        if (!raw) return alert("No local posts found");
        let local = [];
        try {
            local = JSON.parse(raw);
        } catch (e) {
            return alert("Invalid local posts JSON");
        }
        if (!local.length) return alert("No local posts to publish");
        const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://backend.pixelatenest.com" : "";
        const published = [
            ...posts
        ];
        for (const post of local){
            try {
                const res = await fetch(API_BASE + "/api/blogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(post)
                });
                if (res.ok) {
                    const saved = await res.json();
                    published.unshift({
                        ...post,
                        ...saved
                    });
                } else {
                    
                    published.unshift(post);
                }
            } catch (e) {
                published.unshift(post);
            }
        }
        setPosts(published);
        persist(published);
        alert("Publish attempt finished. Check public site or API to confirm.");
    }
    
    async function importJsonAndPublish() {
        if (!importText) return alert("Paste JSON into the import box first");
        let parsed;
        try {
            parsed = JSON.parse(importText);
        } catch (e) {
            return alert("Invalid JSON");
        }
        const arr = Array.isArray(parsed) ? parsed : [
            parsed
        ];
        const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://backend.pixelatenest.com" : "";
        const published = [
            ...posts
        ];
        for (const post of arr){
            try {
                const res = await fetch(API_BASE + "/api/blogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(post)
                });
                if (res.ok) {
                    const saved = await res.json();
                    published.unshift({
                        ...post,
                        ...saved
                    });
                } else {
                    published.unshift(post);
                }
            } catch (e) {
                published.unshift(post);
            }
        }
        setPosts(published);
        persist(published);
        setImportText("");
        alert("Import finished. Check public site or API to confirm.");
    }
    return  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8",
        children: [
             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: "Blogs Management"
            }, void 0, false, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                children: [
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-2",
                        children: [
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: title,
                                    onChange: (e)=>setTitle(e.target.value),
                                    placeholder: "Title",
                                    className: "w-full p-3 rounded-md bg-background border"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 grid grid-cols-2 gap-4",
                                children: [
                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: category,
                                        onChange: (e)=>setCategory(e.target.value),
                                        placeholder: "Category",
                                        className: "p-3 rounded-md bg-background border"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        onChange: handleFile,
                                        className: "p-3 rounded-md bg-background border"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: excerpt,
                                    onChange: (e)=>setExcerpt(e.target.value),
                                    placeholder: "Excerpt",
                                    className: "w-full p-3 rounded-md bg-background border",
                                    rows: 3
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: content,
                                    onChange: (e)=>setContent(e.target.value),
                                    placeholder: "Content (HTML allowed)",
                                    className: "w-full p-3 rounded-md bg-background border",
                                    rows: 8
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: addPost,
                                    children: "Add Post"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "p-4 bg-muted rounded-md",
                        children: [
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-2",
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            imagePreview ?  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: imagePreview,
                                alt: "preview",
                                className: "w-full mb-2"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this) :  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 text-sm text-muted",
                                children: "No image"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-bold",
                                children: title || "Title goes here"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-muted mb-2",
                                children: category
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: excerpt
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: [
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold mb-2",
                        children: "Existing Posts"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold mb-2",
                                        children: "Server posts"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, this),
                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-left",
                                            children: [
                                                 (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1",
                                                                children: "Title"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 298,
                                                                columnNumber: 21
                                                            }, this),
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1",
                                                                children: "Category"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 21
                                                            }, this),
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1",
                                                                children: "Created"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 21
                                                            }, this),
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1",
                                                                children: "Actions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 17
                                                }, this),
                                                 (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: serverPosts.map((sp)=> (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t",
                                                            children: [
                                                                 (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-2 py-2",
                                                                    children: sp.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                    lineNumber: 307,
                                                                    columnNumber: 23
                                                                }, this),
                                                                 (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-2 py-2",
                                                                    children: sp.category || "-"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                    lineNumber: 308,
                                                                    columnNumber: 23
                                                                }, this),
                                                                 (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-2 py-2",
                                                                    children: sp.createdAt ? new Date(sp.createdAt).toLocaleString() : "-"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                    lineNumber: 309,
                                                                    columnNumber: 23
                                                                }, this),
                                                                 (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-2 py-2",
                                                                    children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: [
                                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                onClick: ()=>{
                                                                                    navigator.clipboard?.writeText(JSON.stringify(sp));
                                                                                    toast({
                                                                                        title: "Copied",
                                                                                        description: "Post JSON copied to clipboard."
                                                                                    });
                                                                                },
                                                                                children: "Copy JSON"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                                lineNumber: 316,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            isAdmin ?  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                onClick: ()=>{
                                                                                    if (window.confirm("Delete server post?")) fetch("/api/blogs/" + (sp._id || sp.id), {
                                                                                        method: "DELETE"
                                                                                    }).then((r)=>r.ok && setServerPosts((s)=>s.filter((x)=>(x._id || x.id) !== (sp._id || sp.id))));
                                                                                },
                                                                                children: "Delete"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                                lineNumber: 327,
                                                                                columnNumber: 29
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                        lineNumber: 315,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, sp._id || sp.id, true, {
                                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold mb-2",
                                        children: "Local posts"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this),
                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: posts.map((p)=> (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-background rounded-md flex items-center justify-between",
                                                children: [
                                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: p.image || "/favicon.ico",
                                                                alt: "",
                                                                className: "w-16 h-12 object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 21
                                                            }, this),
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold",
                                                                        children: p.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                        lineNumber: 373,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-muted",
                                                                        children: [
                                                                            p.category,
                                                                            " · ",
                                                                            new Date(p.createdAt).toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                        lineNumber: 374,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 19
                                                    }, this),
                                                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                onClick: ()=>{
                                                                    navigator.clipboard?.writeText(JSON.stringify(p));
                                                                    alert("Copied post JSON to clipboard");
                                                                },
                                                                children: "Copy JSON"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 21
                                                            }, this),
                                                            isAdmin ?  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                onClick: ()=>removePost(p.id),
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 23
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: [
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold mb-2",
                        children: "Publish / Import"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mr-2",
                                onClick: publishLocalPosts,
                                children: "Publish Local Posts to Server"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                             (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted",
                                children: "(Attempts to POST any localStorage posts to the dashboard API)"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this),
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: importText,
                            onChange: (e)=>setImportText(e.target.value),
                            placeholder: "Paste post JSON or an array of posts here",
                            className: "w-full p-3 rounded-md bg-background border",
                            rows: 6
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 410,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this),
                     (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children:  (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: importJsonAndPublish,
                            children: "Import & Publish"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/blogs/page.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
_s(BlogsAdminPage, "ggJGcT3LLlegPLlPXwaLksA4p9M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = BlogsAdminPage;
var _c;
__turbopack_context__.k.register(_c, "BlogsAdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

