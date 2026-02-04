module.exports = [
  "[project]/src/app/(crm)/blogs/page.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => BlogsAdminPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function BlogsAdminPage() {
      const [posts, setPosts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [title, setTitle] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [category, setCategory] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [excerpt, setExcerpt] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [content, setContent] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [imagePreview, setImagePreview] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [importText, setImportText] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [serverPosts, setServerPosts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        const raw = localStorage.getItem("pn_posts");
        if (raw) {
          try {
            setPosts(JSON.parse(raw));
          } catch (e) {}
        }
        // fetch server posts
        (async () => {
          try {
            const res = await fetch("/api/blogs");
            if (res.ok) {
              const data = await res.json();
              setServerPosts(Array.isArray(data) ? data : []);
            }
          } catch (e) {
            // ignore
          }
        })();
      }, []);
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const isAdmin = user?.role === "admin";
      function persist(p) {
        localStorage.setItem("pn_posts", JSON.stringify(p));
      }
      function handleFile(e) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => setImagePreview(String(r.result));
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
          createdAt: new Date().toISOString(),
        };
        // try to POST to server API first (dashboard dev server runs on 9002)
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        try {
          const res = await fetch(API_BASE + "/api/blogs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
          });
          if (res.ok) {
            const saved = await res.json();
            // server returns the saved object (may include _id); keep our id for compatibility
            const toUse = {
              ...newPost,
              ...saved,
            };
            const p = [toUse, ...posts];
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
          // ignore and fallback to localStorage below
        }
        // fallback: persist to localStorage so website can still show the post locally
        const p = [newPost, ...posts];
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
        (async () => {
          const API_BASE =
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
              ? "https://backend.pixelatenest.com"
              : "";
          try {
            // try to delete from server by numeric id or _id if present
            const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
              method: "DELETE",
            });
            if (res.ok) {
              const p = posts.filter((x) => x.id !== id);
              setPosts(p);
              persist(p);
              return;
            }
          } catch (e) {
            // ignore and fallback to local delete
          }
          // fallback to local removal
          const p = posts.filter((x) => x.id !== id);
          setPosts(p);
          persist(p);
        })();
      }
      // Publish posts from localStorage to server API
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
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        const published = [...posts];
        for (const post of local) {
          try {
            const res = await fetch(API_BASE + "/api/blogs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(post),
            });
            if (res.ok) {
              const saved = await res.json();
              published.unshift({
                ...post,
                ...saved,
              });
            } else {
              // keep locally if server fails for this post
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
      // Import JSON text (from paste) and publish each entry
      async function importJsonAndPublish() {
        if (!importText) return alert("Paste JSON into the import box first");
        let parsed;
        try {
          parsed = JSON.parse(importText);
        } catch (e) {
          return alert("Invalid JSON");
        }
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        const published = [...posts];
        for (const post of arr) {
          try {
            const res = await fetch(API_BASE + "/api/blogs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(post),
            });
            if (res.ok) {
              const saved = await res.json();
              published.unshift({
                ...post,
                ...saved,
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
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "p-8",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "h2",
              {
                className: "text-2xl font-bold mb-4",
                children: "Blogs Management",
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                lineNumber: 208,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "md:col-span-2",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "mb-4",
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "input",
                              {
                                value: title,
                                onChange: (e) => setTitle(e.target.value),
                                placeholder: "Title",
                                className:
                                  "w-full p-3 rounded-md bg-background border",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 212,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 211,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "mb-4 grid grid-cols-2 gap-4",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "input",
                                {
                                  value: category,
                                  onChange: (e) => setCategory(e.target.value),
                                  placeholder: "Category",
                                  className:
                                    "p-3 rounded-md bg-background border",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                  lineNumber: 215,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "input",
                                {
                                  type: "file",
                                  onChange: handleFile,
                                  className:
                                    "p-3 rounded-md bg-background border",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                  lineNumber: 216,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 214,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "mb-4",
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "textarea",
                              {
                                value: excerpt,
                                onChange: (e) => setExcerpt(e.target.value),
                                placeholder: "Excerpt",
                                className:
                                  "w-full p-3 rounded-md bg-background border",
                                rows: 3,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 219,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 218,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "mb-4",
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "textarea",
                              {
                                value: content,
                                onChange: (e) => setContent(e.target.value),
                                placeholder: "Content (HTML allowed)",
                                className:
                                  "w-full p-3 rounded-md bg-background border",
                                rows: 8,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 222,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "flex gap-3",
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                onClick: addPost,
                                children: "Add Post",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 224,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 210,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "aside",
                    {
                      className: "p-4 bg-muted rounded-md",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "h3",
                          {
                            className: "font-bold mb-2",
                            children: "Preview",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 229,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        imagePreview
                          ? /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "img",
                              {
                                src: imagePreview,
                                alt: "preview",
                                className: "w-full mb-2",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 230,
                                columnNumber: 27,
                              },
                              this,
                            )
                          : /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "mb-2 text-sm text-muted",
                                children: "No image",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                lineNumber: 230,
                                columnNumber: 94,
                              },
                              this,
                            ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "font-bold",
                            children: title || "Title goes here",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 231,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "text-sm text-muted mb-2",
                            children: category,
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 232,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "text-sm",
                            children: excerpt,
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 233,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 228,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                lineNumber: 209,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "mt-8",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h3",
                    {
                      className: "font-bold mb-2",
                      children: "Existing Posts",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 238,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "space-y-6",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h4",
                                {
                                  className: "font-bold mb-2",
                                  children: "Server posts",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                  lineNumber: 241,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "overflow-x-auto",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "table",
                                    {
                                      className: "w-full text-left",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "thead",
                                          {
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "tr",
                                              {
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className: "px-2 py-1",
                                                      children: "Title",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/blogs/page.tsx",
                                                      lineNumber: 246,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className: "px-2 py-1",
                                                      children: "Category",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/blogs/page.tsx",
                                                      lineNumber: 247,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className: "px-2 py-1",
                                                      children: "Created",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/blogs/page.tsx",
                                                      lineNumber: 248,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className: "px-2 py-1",
                                                      children: "Actions",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/blogs/page.tsx",
                                                      lineNumber: 249,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/blogs/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/blogs/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "tbody",
                                          {
                                            children: serverPosts.map((sp) =>
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "tr",
                                                {
                                                  className: "border-t",
                                                  children: [
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "td",
                                                      {
                                                        className: "px-2 py-2",
                                                        children: sp.title,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "td",
                                                      {
                                                        className: "px-2 py-2",
                                                        children:
                                                          sp.category || "-",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "td",
                                                      {
                                                        className: "px-2 py-2",
                                                        children: sp.createdAt
                                                          ? new Date(
                                                              sp.createdAt,
                                                            ).toLocaleString()
                                                          : "-",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "td",
                                                      {
                                                        className: "px-2 py-2",
                                                        children:
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "div",
                                                            {
                                                              className:
                                                                "flex gap-2",
                                                              children: [
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                    "Button"
                                                                  ],
                                                                  {
                                                                    onClick:
                                                                      () => {
                                                                        navigator.clipboard?.writeText(
                                                                          JSON.stringify(
                                                                            sp,
                                                                          ),
                                                                        );
                                                                        alert(
                                                                          "Copied post JSON to clipboard",
                                                                        );
                                                                      },
                                                                    children:
                                                                      "Copy JSON",
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/blogs/page.tsx",
                                                                    lineNumber: 260,
                                                                    columnNumber: 27,
                                                                  },
                                                                  this,
                                                                ),
                                                                isAdmin
                                                                  ? /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        onClick:
                                                                          () => {
                                                                            if (
                                                                              confirm(
                                                                                "Delete server post?",
                                                                              )
                                                                            )
                                                                              fetch(
                                                                                "/api/blogs/" +
                                                                                  (sp._id ||
                                                                                    sp.id),
                                                                                {
                                                                                  method:
                                                                                    "DELETE",
                                                                                },
                                                                              ).then(
                                                                                (
                                                                                  r,
                                                                                ) =>
                                                                                  r.ok &&
                                                                                  setServerPosts(
                                                                                    (
                                                                                      s,
                                                                                    ) =>
                                                                                      s.filter(
                                                                                        (
                                                                                          x,
                                                                                        ) =>
                                                                                          (x._id ||
                                                                                            x.id) !==
                                                                                          (sp._id ||
                                                                                            sp.id),
                                                                                      ),
                                                                                  ),
                                                                              );
                                                                          },
                                                                        children:
                                                                          "Delete",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                                                        lineNumber: 261,
                                                                        columnNumber: 38,
                                                                      },
                                                                      this,
                                                                    )
                                                                  : null,
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/blogs/page.tsx",
                                                              lineNumber: 259,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          ),
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                  ],
                                                },
                                                sp._id || sp.id,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                                  lineNumber: 254,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/blogs/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/blogs/page.tsx",
                                      lineNumber: 243,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                  lineNumber: 242,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 240,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h4",
                                {
                                  className: "font-bold mb-2",
                                  children: "Local posts",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                  lineNumber: 272,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "space-y-2",
                                  children: posts.map((p) =>
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "p-3 bg-background rounded-md flex items-center justify-between",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "flex items-center gap-3",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "img",
                                                  {
                                                    src:
                                                      p.image || "/favicon.ico",
                                                    alt: "",
                                                    className:
                                                      "w-16 h-12 object-cover",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/blogs/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "font-bold",
                                                          children: p.title,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/blogs/page.tsx",
                                                          lineNumber: 279,
                                                          columnNumber: 23,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "text-sm text-muted",
                                                          children: [
                                                            p.category,
                                                            " · ",
                                                            new Date(
                                                              p.createdAt,
                                                            ).toLocaleString(),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/blogs/page.tsx",
                                                          lineNumber: 280,
                                                          columnNumber: 23,
                                                        },
                                                        this,
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/blogs/page.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/blogs/page.tsx",
                                              lineNumber: 276,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "flex gap-2",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "Button"
                                                  ],
                                                  {
                                                    onClick: () => {
                                                      navigator.clipboard?.writeText(
                                                        JSON.stringify(p),
                                                      );
                                                      alert(
                                                        "Copied post JSON to clipboard",
                                                      );
                                                    },
                                                    children: "Copy JSON",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/blogs/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                isAdmin
                                                  ? /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "Button"
                                                      ],
                                                      {
                                                        onClick: () =>
                                                          removePost(p.id),
                                                        children: "Delete",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 32,
                                                      },
                                                      this,
                                                    )
                                                  : null,
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/blogs/page.tsx",
                                              lineNumber: 283,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      p.id,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/blogs/page.tsx",
                                        lineNumber: 275,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/blogs/page.tsx",
                                  lineNumber: 273,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 271,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 239,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                lineNumber: 237,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "mt-8",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h3",
                    {
                      className: "font-bold mb-2",
                      children: "Publish / Import",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 295,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "mb-4",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "button",
                          {
                            className: "mr-2",
                            onClick: publishLocalPosts,
                            children: "Publish Local Posts to Server",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 297,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className: "text-sm text-muted",
                            children:
                              "(Attempts to POST any localStorage posts to the dashboard API)",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                            lineNumber: 298,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 296,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "mb-4",
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "textarea",
                        {
                          value: importText,
                          onChange: (e) => setImportText(e.target.value),
                          placeholder:
                            "Paste post JSON or an array of posts here",
                          className:
                            "w-full p-3 rounded-md bg-background border",
                          rows: 6,
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                          lineNumber: 301,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 300,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "button",
                        {
                          onClick: importJsonAndPublish,
                          children: "Import & Publish",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                          lineNumber: 304,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                      lineNumber: 303,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/blogs/page.tsx",
                lineNumber: 294,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/(crm)/blogs/page.tsx",
          lineNumber: 207,
          columnNumber: 5,
        },
        this,
      );
    }
  },
];

//# sourceMappingURL=src_app_%28crm%29_blogs_page_tsx_4a324778._.js.map
