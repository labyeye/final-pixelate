(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Button",
      () => Button,
      "buttonVariants",
      () => buttonVariants,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-client] (ecmascript)",
      );
    const buttonVariants = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      "cva"
    ])(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      {
        variants: {
          variant: {
            default:
              "bg-primary text-primary-foreground hover:bg-primary/80 border-2 border-foreground",
            destructive:
              "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-2 border-foreground",
            outline:
              "border-2 border-foreground bg-background hover:bg-foreground hover:text-background",
            secondary:
              "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
          },
          size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3",
            lg: "h-11 px-8",
            icon: "h-10 w-10",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      },
    );
    const Button =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = (
          { className, variant, size, asChild = false, ...props },
          ref,
        ) => {
          const Comp = asChild
            ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Slot"
              ]
            : "button";
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            Comp,
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])(
                buttonVariants({
                  variant,
                  size,
                  className,
                }),
              ),
              ref: ref,
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/button.tsx",
              lineNumber: 48,
              columnNumber: 7,
            },
            ("TURBOPACK compile-time value", void 0),
          );
        }),
      );
    _c1 = Button;
    Button.displayName = "Button";
    var _c, _c1;
    __turbopack_context__.k.register(_c, "Button$React.forwardRef");
    __turbopack_context__.k.register(_c1, "Button");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/ui/card.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Card",
      () => Card,
      "CardContent",
      () => CardContent,
      "CardDescription",
      () => CardDescription,
      "CardFooter",
      () => CardFooter,
      "CardHeader",
      () => CardHeader,
      "CardTitle",
      () => CardTitle,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-client] (ecmascript)",
      );
    const Card =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])(
                "rounded-none border-2 bg-card text-card-foreground",
                className,
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/card.tsx",
              lineNumber: 9,
              columnNumber: 3,
            },
            ("TURBOPACK compile-time value", void 0),
          )),
      );
    _c1 = Card;
    Card.displayName = "Card";
    const CardHeader =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c2 = ({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])("flex flex-col space-y-1.5 p-4", className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/card.tsx",
              lineNumber: 24,
              columnNumber: 3,
            },
            ("TURBOPACK compile-time value", void 0),
          )),
      );
    _c3 = CardHeader;
    CardHeader.displayName = "CardHeader";
    const CardTitle =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c4 = ({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "h3",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])(
                "text-2xl font-semibold leading-none tracking-tight",
                className,
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/card.tsx",
              lineNumber: 36,
              columnNumber: 3,
            },
            ("TURBOPACK compile-time value", void 0),
          )),
      );
    _c5 = CardTitle;
    CardTitle.displayName = "CardTitle";
    const CardDescription =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c6 = ({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "p",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])("text-sm text-muted-foreground", className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/card.tsx",
              lineNumber: 51,
              columnNumber: 3,
            },
            ("TURBOPACK compile-time value", void 0),
          )),
      );
    _c7 = CardDescription;
    CardDescription.displayName = "CardDescription";
    const CardContent =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c8 = ({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])("p-4 pt-0", className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/card.tsx",
              lineNumber: 63,
              columnNumber: 3,
            },
            ("TURBOPACK compile-time value", void 0),
          )),
      );
    _c9 = CardContent;
    CardContent.displayName = "CardContent";
    const CardFooter =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c10 = ({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])("flex items-center p-4 pt-0", className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/card.tsx",
              lineNumber: 71,
              columnNumber: 3,
            },
            ("TURBOPACK compile-time value", void 0),
          )),
      );
    _c11 = CardFooter;
    CardFooter.displayName = "CardFooter";
    var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
    __turbopack_context__.k.register(_c, "Card$React.forwardRef");
    __turbopack_context__.k.register(_c1, "Card");
    __turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
    __turbopack_context__.k.register(_c3, "CardHeader");
    __turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
    __turbopack_context__.k.register(_c5, "CardTitle");
    __turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
    __turbopack_context__.k.register(_c7, "CardDescription");
    __turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
    __turbopack_context__.k.register(_c9, "CardContent");
    __turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
    __turbopack_context__.k.register(_c11, "CardFooter");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Input", () => Input]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-client] (ecmascript)",
      );
    const Input =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, type, ...props }, ref) => {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "input",
            {
              type: type,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])(
                "flex h-14 w-full rounded-none border-2 border-foreground bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className,
              ),
              ref: ref,
              ...props,
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/ui/input.tsx",
              lineNumber: 8,
              columnNumber: 7,
            },
            ("TURBOPACK compile-time value", void 0),
          );
        }),
      );
    _c1 = Input;
    Input.displayName = "Input";
    var _c, _c1;
    __turbopack_context__.k.register(_c, "Input$React.forwardRef");
    __turbopack_context__.k.register(_c1, "Input");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/hooks/use-auth.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "AuthProvider",
      () => AuthProvider,
      "useAuth",
      () => useAuth,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/navigation.js [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature(),
      _s1 = __turbopack_context__.k.signature();
    ("use client");
    const AuthContext = /*#__PURE__*/ (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      "createContext"
    ])(undefined);
    const publicRoutes = ["/login"];
    const clientRoutes = ["/client-portal"];
    const AuthProvider = ({ children }) => {
      _s();
      const [user, setUser] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const pathname = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "usePathname"
      ])();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AuthProvider.useEffect": () => {
            let mounted = true;
            ({
              "AuthProvider.useEffect": async () => {
                try {
                  const storedUserId = sessionStorage.getItem("userId");
                  const res = await fetch("/api/users");
                  const allUsers = await res.json();
                  if (!mounted) return;
                  if (storedUserId) {
                    const foundUser = allUsers.find(
                      {
                        "AuthProvider.useEffect.foundUser": (u) =>
                          (u.id ?? u._id) ===
                          (isNaN(Number(storedUserId))
                            ? storedUserId
                            : Number(storedUserId)),
                      }["AuthProvider.useEffect.foundUser"],
                    );
                    if (foundUser) {
                      setUser(foundUser);
                    } else {
                      sessionStorage.removeItem("userId");
                      setUser(null);
                    }
                  } else {
                    setUser(null);
                  }
                } catch (e) {
                  console.error(
                    "Could not access users or session storage.",
                    e,
                  );
                  setUser(null);
                } finally {
                  if (mounted) setLoading(false);
                }
              },
            })["AuthProvider.useEffect"]();
            return {
              "AuthProvider.useEffect": () => {
                mounted = false;
              },
            }["AuthProvider.useEffect"];
          },
        }["AuthProvider.useEffect"],
        [pathname],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AuthProvider.useEffect": () => {
            if (!loading) {
              const isPublic = publicRoutes.includes(pathname);
              if (!user && !isPublic) {
                router.push("/login");
              }
              if (
                user &&
                user.role !== "client" &&
                clientRoutes.some(
                  {
                    "AuthProvider.useEffect": (r) => pathname.startsWith(r),
                  }["AuthProvider.useEffect"],
                )
              ) {
                router.push("/dashboard");
              }
            }
          },
        }["AuthProvider.useEffect"],
        [loading, user, pathname, router],
      );
      const login = (userId) => {
        sessionStorage.setItem("userId", String(userId));
        (async () => {
          try {
            const res = await fetch("/api/users");
            const allUsers = await res.json();
            const normalized = allUsers.find((u) => {
              const candidate = u.id ?? u._id;
              return String(candidate) === String(userId);
            });
            if (normalized) setUser(normalized);
          } catch (e) {}
        })();
        return true;
      };
      const logout = () => {
        try {
          if (user) {
            (async () => {
              try {
                await fetch("/api/erp-events", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "logout",
                    userId: user.id || user._id,
                    email: user.email,
                    adminName: user.name,
                    details: {
                      message: "User logged out",
                    },
                  }),
                });
              } catch (e) {}
            })();
          }
        } catch (e) {}
        setUser(null);
        try {
          sessionStorage.removeItem("userId");
        } catch (e) {}
        try {
          localStorage.removeItem("auth_token");
        } catch (e) {}
        try {
          router.replace("/login");
          try {
            router.refresh();
          } catch (e) {}
        } catch (e) {
          try {
            router.push("/login");
          } catch (er) {}
        }
      };
      if (loading) {
        return null;
      }
      if (!user && !publicRoutes.includes(pathname)) {
        return null;
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        AuthContext.Provider,
        {
          value: {
            user,
            login,
            logout,
            loading: loading,
          },
          children: children,
        },
        void 0,
        false,
        {
          fileName: "[project]/src/hooks/use-auth.tsx",
          lineNumber: 156,
          columnNumber: 5,
        },
        ("TURBOPACK compile-time value", void 0),
      );
    };
    _s(AuthProvider, "GW5IAz/41mFv7naHdemrili0vlk=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useRouter"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "usePathname"
        ],
      ];
    });
    _c = AuthProvider;
    const useAuth = () => {
      _s1();
      const context = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useContext"
      ])(AuthContext);
      if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
    };
    _s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
    var _c;
    __turbopack_context__.k.register(_c, "AuthProvider");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/assets/images/logo-transparent.png (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v(
      "/_next/static/media/logo-transparent.2aba66e8.png",
    );
  },
  '[project]/src/assets/images/logo-transparent.png.mjs { IMAGE => "[project]/src/assets/images/logo-transparent.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$images$2f$logo$2d$transparent$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/src/assets/images/logo-transparent.png (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$images$2f$logo$2d$transparent$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 6400,
      height: 6400,
      blurWidth: 8,
      blurHeight: 8,
      blurDataURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAw0lEQVR42mWPTwvBcBjHH5tt5ifNbESJ/D3KRQ67IaEkd6UpylVq4+jP3oiDd8DZwY0X4ODKO1AcZr/fNCvf+tbT5+n59n0A3KJZnvhPDBKADcoeXkpg45kwR5SXlVOl+lxfH3RttZeSxSpm31gfAhTPjSaL3ft6Ml+3s6mOtS2gWBZoDgF4KBoPjc5g87gcn3fLtXZ/aTE/2dkdAiITLlSU1tBQmqrBiPmyxUK/DnYKD5neDNLdKfnEuXaLE6KWI270ASTpIyjNhun7AAAAAElFTkSuQmCC",
    };
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/app/login/page.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => LoginPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/navigation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/card.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/hooks/use-auth.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/image.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$images$2f$logo$2d$transparent$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$images$2f$logo$2d$transparent$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/assets/images/logo-transparent.png.mjs { IMAGE => "[project]/src/assets/images/logo-transparent.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)',
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function LoginContent() {
      _s();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const { login } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [email, setEmail] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [password, setPassword] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const body = await res.json();
          if (!res.ok) throw new Error(body?.error || "Login failed");
          const { token, user } = body;
          if (token) localStorage.setItem("auth_token", token);
          if (user && (user.id || user._id))
            sessionStorage.setItem("userId", String(user.id ?? user._id));
          login(user.id ?? user._id);
          if (user.role === "client") {
            router.replace("/client-portal");
          } else {
            router.replace("/dashboard");
          }
        } catch (err) {
          alert(err?.message || String(err));
        } finally {
          setLoading(false);
        }
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "flex min-h-screen items-center justify-center bg-background p-4 font-headline",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "Card"
            ],
            {
              className: "w-full max-w-md border-4 border-black",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "CardHeader"
                  ],
                  {
                    className: "text-center",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "default"
                        ],
                        {
                          src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$images$2f$logo$2d$transparent$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$images$2f$logo$2d$transparent$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                            "default"
                          ],
                          alt: "Pixelate Nest Logo",
                          width: 120,
                          height: 120,
                          className: "mx-auto mb-4",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/login/page.tsx",
                          lineNumber: 58,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "CardTitle"
                        ],
                        {
                          className: "text-5xl font-black tracking-tighter",
                          children: "PIXELATE NEST",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/login/page.tsx",
                          lineNumber: 65,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "CardDescription"
                        ],
                        {
                          className: "text-lg font-bold text-muted-foreground",
                          children: "AGENCY CRM LOGIN",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/login/page.tsx",
                          lineNumber: 68,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: "[project]/src/app/login/page.tsx",
                    lineNumber: 57,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "CardContent"
                  ],
                  {
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "form",
                      {
                        onSubmit: handleSubmit,
                        className: "space-y-4",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "space-y-2",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "label",
                                  {
                                    className: "block text-sm font-medium",
                                    children: "Email",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/login/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "Input"
                                  ],
                                  {
                                    type: "email",
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value),
                                    required: true,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/login/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 74,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "space-y-2",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "label",
                                  {
                                    className: "block text-sm font-medium",
                                    children: "Password",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/login/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "Input"
                                  ],
                                  {
                                    type: "password",
                                    value: password,
                                    onChange: (e) =>
                                      setPassword(e.target.value),
                                    required: true,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/login/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 83,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "Button"
                            ],
                            {
                              type: "submit",
                              className: "w-full",
                              disabled: loading,
                              children: loading ? "Signing in..." : "Sign in",
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 92,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 73,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: "[project]/src/app/login/page.tsx",
                    lineNumber: 72,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: "[project]/src/app/login/page.tsx",
              lineNumber: 56,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/app/login/page.tsx",
          lineNumber: 55,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(LoginContent, "c44vvyoDGCNf1dCy3AzKgGD6MA0=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useRouter"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useAuth"
        ],
      ];
    });
    _c = LoginContent;
    function LoginPage() {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "AuthProvider"
        ],
        {
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            LoginContent,
            {},
            void 0,
            false,
            {
              fileName: "[project]/src/app/login/page.tsx",
              lineNumber: 105,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/app/login/page.tsx",
          lineNumber: 104,
          columnNumber: 5,
        },
        this,
      );
    }
    _c1 = LoginPage;
    var _c, _c1;
    __turbopack_context__.k.register(_c, "LoginContent");
    __turbopack_context__.k.register(_c1, "LoginPage");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
]);

//# sourceMappingURL=src_6d22e290._.js.map
