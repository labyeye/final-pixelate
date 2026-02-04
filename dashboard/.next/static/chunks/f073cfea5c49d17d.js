(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  88511,
  (e) => {
    "use strict";
    let t = (0, e.i(75254).default)("SquarePen", [
      [
        "path",
        {
          d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
          key: "1m0v6g",
        },
      ],
      [
        "path",
        {
          d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
          key: "ohrbg2",
        },
      ],
    ]);
    e.s(["Edit", () => t], 88511);
  },
  16015,
  (e, t, s) => {},
  98547,
  (e, t, s) => {
    var a = e.i(47167);
    e.r(16015);
    var i = e.r(71645),
      r = i && "object" == typeof i && "default" in i ? i : { default: i },
      c = void 0 !== a.default && a.default.env && !0,
      n = function (e) {
        return "[object String]" === Object.prototype.toString.call(e);
      },
      l = (function () {
        function e(e) {
          var t = void 0 === e ? {} : e,
            s = t.name,
            a = void 0 === s ? "stylesheet" : s,
            i = t.optimizeForSpeed,
            r = void 0 === i ? c : i;
          (o(n(a), "`name` must be a string"),
            (this._name = a),
            (this._deletedRulePlaceholder = "#" + a + "-deleted-rule____{}"),
            o("boolean" == typeof r, "`optimizeForSpeed` must be a boolean"),
            (this._optimizeForSpeed = r),
            (this._serverSheet = void 0),
            (this._tags = []),
            (this._injected = !1),
            (this._rulesCount = 0));
          var l =
            "undefined" != typeof window &&
            document.querySelector('meta[property="csp-nonce"]');
          this._nonce = l ? l.getAttribute("content") : null;
        }
        var t,
          s = e.prototype;
        return (
          (s.setOptimizeForSpeed = function (e) {
            (o(
              "boolean" == typeof e,
              "`setOptimizeForSpeed` accepts a boolean",
            ),
              o(
                0 === this._rulesCount,
                "optimizeForSpeed cannot be when rules have already been inserted",
              ),
              this.flush(),
              (this._optimizeForSpeed = e),
              this.inject());
          }),
          (s.isOptimizeForSpeed = function () {
            return this._optimizeForSpeed;
          }),
          (s.inject = function () {
            var e = this;
            if (
              (o(!this._injected, "sheet already injected"),
              (this._injected = !0),
              "undefined" != typeof window && this._optimizeForSpeed)
            ) {
              ((this._tags[0] = this.makeStyleTag(this._name)),
                (this._optimizeForSpeed = "insertRule" in this.getSheet()),
                this._optimizeForSpeed ||
                  (c ||
                    console.warn(
                      "StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.",
                    ),
                  this.flush(),
                  (this._injected = !0)));
              return;
            }
            this._serverSheet = {
              cssRules: [],
              insertRule: function (t, s) {
                return (
                  "number" == typeof s
                    ? (e._serverSheet.cssRules[s] = { cssText: t })
                    : e._serverSheet.cssRules.push({ cssText: t }),
                  s
                );
              },
              deleteRule: function (t) {
                e._serverSheet.cssRules[t] = null;
              },
            };
          }),
          (s.getSheetForTag = function (e) {
            if (e.sheet) return e.sheet;
            for (var t = 0; t < document.styleSheets.length; t++)
              if (document.styleSheets[t].ownerNode === e)
                return document.styleSheets[t];
          }),
          (s.getSheet = function () {
            return this.getSheetForTag(this._tags[this._tags.length - 1]);
          }),
          (s.insertRule = function (e, t) {
            if (
              (o(n(e), "`insertRule` accepts only strings"),
              "undefined" == typeof window)
            )
              return (
                "number" != typeof t && (t = this._serverSheet.cssRules.length),
                this._serverSheet.insertRule(e, t),
                this._rulesCount++
              );
            if (this._optimizeForSpeed) {
              var s = this.getSheet();
              "number" != typeof t && (t = s.cssRules.length);
              try {
                s.insertRule(e, t);
              } catch (t) {
                return (
                  c ||
                    console.warn(
                      "StyleSheet: illegal rule: \n\n" +
                        e +
                        "\n\nSee https://stackoverflow.com/q/20007992 for more info",
                    ),
                  -1
                );
              }
            } else {
              var a = this._tags[t];
              this._tags.push(this.makeStyleTag(this._name, e, a));
            }
            return this._rulesCount++;
          }),
          (s.replaceRule = function (e, t) {
            if (this._optimizeForSpeed || "undefined" == typeof window) {
              var s =
                "undefined" != typeof window
                  ? this.getSheet()
                  : this._serverSheet;
              if (
                (t.trim() || (t = this._deletedRulePlaceholder), !s.cssRules[e])
              )
                return e;
              s.deleteRule(e);
              try {
                s.insertRule(t, e);
              } catch (a) {
                (c ||
                  console.warn(
                    "StyleSheet: illegal rule: \n\n" +
                      t +
                      "\n\nSee https://stackoverflow.com/q/20007992 for more info",
                  ),
                  s.insertRule(this._deletedRulePlaceholder, e));
              }
            } else {
              var a = this._tags[e];
              (o(a, "old rule at index `" + e + "` not found"),
                (a.textContent = t));
            }
            return e;
          }),
          (s.deleteRule = function (e) {
            if ("undefined" == typeof window)
              return void this._serverSheet.deleteRule(e);
            if (this._optimizeForSpeed) this.replaceRule(e, "");
            else {
              var t = this._tags[e];
              (o(t, "rule at index `" + e + "` not found"),
                t.parentNode.removeChild(t),
                (this._tags[e] = null));
            }
          }),
          (s.flush = function () {
            ((this._injected = !1),
              (this._rulesCount = 0),
              "undefined" != typeof window
                ? (this._tags.forEach(function (e) {
                    return e && e.parentNode.removeChild(e);
                  }),
                  (this._tags = []))
                : (this._serverSheet.cssRules = []));
          }),
          (s.cssRules = function () {
            var e = this;
            return "undefined" == typeof window
              ? this._serverSheet.cssRules
              : this._tags.reduce(function (t, s) {
                  return (
                    s
                      ? (t = t.concat(
                          Array.prototype.map.call(
                            e.getSheetForTag(s).cssRules,
                            function (t) {
                              return t.cssText === e._deletedRulePlaceholder
                                ? null
                                : t;
                            },
                          ),
                        ))
                      : t.push(null),
                    t
                  );
                }, []);
          }),
          (s.makeStyleTag = function (e, t, s) {
            t &&
              o(n(t), "makeStyleTag accepts only strings as second parameter");
            var a = document.createElement("style");
            (this._nonce && a.setAttribute("nonce", this._nonce),
              (a.type = "text/css"),
              a.setAttribute("data-" + e, ""),
              t && a.appendChild(document.createTextNode(t)));
            var i = document.head || document.getElementsByTagName("head")[0];
            return (s ? i.insertBefore(a, s) : i.appendChild(a), a);
          }),
          (t = [
            {
              key: "length",
              get: function () {
                return this._rulesCount;
              },
            },
          ]),
          (function (e, t) {
            for (var s = 0; s < t.length; s++) {
              var a = t[s];
              ((a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a));
            }
          })(e.prototype, t),
          e
        );
      })();
    function o(e, t) {
      if (!e) throw Error("StyleSheet: " + t + ".");
    }
    var d = function (e) {
        for (var t = 5381, s = e.length; s; ) t = (33 * t) ^ e.charCodeAt(--s);
        return t >>> 0;
      },
      x = {};
    function b(e, t) {
      if (!t) return "jsx-" + e;
      var s = String(t),
        a = e + s;
      return (x[a] || (x[a] = "jsx-" + d(e + "-" + s)), x[a]);
    }
    function m(e, t) {
      "undefined" == typeof window && (t = t.replace(/\/style/gi, "\\/style"));
      var s = e + t;
      return (
        x[s] || (x[s] = t.replace(/__jsx-style-dynamic-selector/g, e)),
        x[s]
      );
    }
    var h = (function () {
        function e(e) {
          var t = void 0 === e ? {} : e,
            s = t.styleSheet,
            a = void 0 === s ? null : s,
            i = t.optimizeForSpeed,
            r = void 0 !== i && i;
          ((this._sheet =
            a || new l({ name: "styled-jsx", optimizeForSpeed: r })),
            this._sheet.inject(),
            a &&
              "boolean" == typeof r &&
              (this._sheet.setOptimizeForSpeed(r),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
            (this._fromServer = void 0),
            (this._indices = {}),
            (this._instancesCounts = {}));
        }
        var t = e.prototype;
        return (
          (t.add = function (e) {
            var t = this;
            (void 0 === this._optimizeForSpeed &&
              ((this._optimizeForSpeed = Array.isArray(e.children)),
              this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
              "undefined" == typeof window ||
                this._fromServer ||
                ((this._fromServer = this.selectFromServer()),
                (this._instancesCounts = Object.keys(this._fromServer).reduce(
                  function (e, t) {
                    return ((e[t] = 0), e);
                  },
                  {},
                ))));
            var s = this.getIdAndRules(e),
              a = s.styleId,
              i = s.rules;
            if (a in this._instancesCounts) {
              this._instancesCounts[a] += 1;
              return;
            }
            var r = i
              .map(function (e) {
                return t._sheet.insertRule(e);
              })
              .filter(function (e) {
                return -1 !== e;
              });
            ((this._indices[a] = r), (this._instancesCounts[a] = 1));
          }),
          (t.remove = function (e) {
            var t = this,
              s = this.getIdAndRules(e).styleId;
            if (
              ((function (e, t) {
                if (!e) throw Error("StyleSheetRegistry: " + t + ".");
              })(s in this._instancesCounts, "styleId: `" + s + "` not found"),
              (this._instancesCounts[s] -= 1),
              this._instancesCounts[s] < 1)
            ) {
              var a = this._fromServer && this._fromServer[s];
              (a
                ? (a.parentNode.removeChild(a), delete this._fromServer[s])
                : (this._indices[s].forEach(function (e) {
                    return t._sheet.deleteRule(e);
                  }),
                  delete this._indices[s]),
                delete this._instancesCounts[s]);
            }
          }),
          (t.update = function (e, t) {
            (this.add(t), this.remove(e));
          }),
          (t.flush = function () {
            (this._sheet.flush(),
              this._sheet.inject(),
              (this._fromServer = void 0),
              (this._indices = {}),
              (this._instancesCounts = {}));
          }),
          (t.cssRules = function () {
            var e = this,
              t = this._fromServer
                ? Object.keys(this._fromServer).map(function (t) {
                    return [t, e._fromServer[t]];
                  })
                : [],
              s = this._sheet.cssRules();
            return t.concat(
              Object.keys(this._indices)
                .map(function (t) {
                  return [
                    t,
                    e._indices[t]
                      .map(function (e) {
                        return s[e].cssText;
                      })
                      .join(e._optimizeForSpeed ? "" : "\n"),
                  ];
                })
                .filter(function (e) {
                  return !!e[1];
                }),
            );
          }),
          (t.styles = function (e) {
            var t, s;
            return (
              (t = this.cssRules()),
              void 0 === (s = e) && (s = {}),
              t.map(function (e) {
                var t = e[0],
                  a = e[1];
                return r.default.createElement("style", {
                  id: "__" + t,
                  key: "__" + t,
                  nonce: s.nonce ? s.nonce : void 0,
                  dangerouslySetInnerHTML: { __html: a },
                });
              })
            );
          }),
          (t.getIdAndRules = function (e) {
            var t = e.children,
              s = e.dynamic,
              a = e.id;
            if (s) {
              var i = b(a, s);
              return {
                styleId: i,
                rules: Array.isArray(t)
                  ? t.map(function (e) {
                      return m(i, e);
                    })
                  : [m(i, t)],
              };
            }
            return { styleId: b(a), rules: Array.isArray(t) ? t : [t] };
          }),
          (t.selectFromServer = function () {
            return Array.prototype.slice
              .call(document.querySelectorAll('[id^="__jsx-"]'))
              .reduce(function (e, t) {
                return ((e[t.id.slice(2)] = t), e);
              }, {});
          }),
          e
        );
      })(),
      f = i.createContext(null);
    function p() {
      return new h();
    }
    function u() {
      return i.useContext(f);
    }
    f.displayName = "StyleSheetContext";
    var j = r.default.useInsertionEffect || r.default.useLayoutEffect,
      g = "undefined" != typeof window ? p() : void 0;
    function y(e) {
      var t = g || u();
      return (
        t &&
          ("undefined" == typeof window
            ? t.add(e)
            : j(
                function () {
                  return (
                    t.add(e),
                    function () {
                      t.remove(e);
                    }
                  );
                },
                [e.id, String(e.dynamic)],
              )),
        null
      );
    }
    ((y.dynamic = function (e) {
      return e
        .map(function (e) {
          return b(e[0], e[1]);
        })
        .join(" ");
    }),
      (s.StyleRegistry = function (e) {
        var t = e.registry,
          s = e.children,
          a = i.useContext(f),
          c = i.useState(function () {
            return a || t || p();
          })[0];
        return r.default.createElement(f.Provider, { value: c }, s);
      }),
      (s.createStyleRegistry = p),
      (s.style = y),
      (s.useStyleRegistry = u));
  },
  37902,
  (e, t, s) => {
    t.exports = e.r(98547).style;
  },
  70294,
  (e) => {
    "use strict";
    var t = e.i(43476),
      s = e.i(37902),
      a = e.i(71645),
      i = e.i(18566),
      r = e.i(19455),
      c = e.i(75254);
    let n = (0, c.default)("Printer", [
        [
          "path",
          {
            d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
            key: "143wyd",
          },
        ],
        [
          "path",
          { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" },
        ],
        [
          "rect",
          { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" },
        ],
      ]),
      l = (0, c.default)("Download", [
        [
          "path",
          { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
        ],
        ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
        ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
      ]);
    var o = e.i(88511);
    function d() {
      let e,
        c = (0, i.useParams)(),
        d = (0, i.useRouter)(),
        x = c.id,
        [b, m] = (0, a.useState)(null),
        [h, f] = (0, a.useState)(null),
        [p, u] = (0, a.useState)(null),
        [j, g] = (0, a.useState)(!0);
      (0, a.useEffect)(() => {
        x &&
          (async () => {
            try {
              let e = await fetch(`/api/quotations/${x}`);
              if (!e.ok) throw Error("Failed to fetch quotation");
              let t = await e.json();
              if ((m(t), t.clientId)) {
                let e = await fetch(`/api/clients/${t.clientId}`);
                e.ok && u(await e.json());
              }
              let s = await fetch("/api/settings");
              s.ok && f(await s.json());
            } catch (e) {
              console.error("Error loading quotation:", e);
            } finally {
              g(!1);
            }
          })();
      }, [x]);
      let y = () => {
        window.print();
      };
      if (j)
        return (0, t.jsx)("div", {
          className: "flex items-center justify-center min-h-screen",
          children: (0, t.jsx)("div", {
            className: "text-lg",
            children: "Loading quotation...",
          }),
        });
      if (!b)
        return (0, t.jsx)("div", {
          className: "flex items-center justify-center min-h-screen",
          children: (0, t.jsx)("div", {
            className: "text-lg text-red-600",
            children: "Quotation not found",
          }),
        });
      let {
          subtotal: v,
          taxAmount: N,
          grandTotal: w,
        } = ((e =
          b.lineItems.reduce((e, t) => e + t.total, 0) +
          b.services.reduce((e, t) => e + t.total, 0)),
        {
          subtotal: e,
          taxAmount: b.lineItems.reduce(
            (e, t) => e + (t.unitPrice * t.qty * t.tax) / 100,
            0,
          ),
          grandTotal: e,
        }),
        _ = new Date(b.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      return (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsxs)("div", {
            className:
              "jsx-b715cb8c1fa75266 print:hidden fixed top-4 right-4 z-50 flex gap-2",
            children: [
              (0, t.jsxs)(r.Button, {
                onClick: () => {
                  let e = b._id || b.id || x;
                  d.push(`/quotations/create?edit=${e}`);
                },
                size: "lg",
                variant: "outline",
                className: "shadow-lg",
                children: [
                  (0, t.jsx)(o.Edit, { className: "mr-2 h-4 w-4" }),
                  "Edit",
                ],
              }),
              (0, t.jsxs)(r.Button, {
                onClick: y,
                size: "lg",
                className: "shadow-lg",
                children: [
                  (0, t.jsx)(n, { className: "mr-2 h-4 w-4" }),
                  "Print",
                ],
              }),
              (0, t.jsxs)(r.Button, {
                onClick: y,
                size: "lg",
                className: "shadow-lg bg-[#F36F21] hover:bg-[#d85e1a]",
                children: [
                  (0, t.jsx)(l, { className: "mr-2 h-4 w-4" }),
                  "Download PDF",
                ],
              }),
            ],
          }),
          (0, t.jsx)("div", {
            className: "jsx-b715cb8c1fa75266 print-area min-h-screen bg-white",
            children: (0, t.jsxs)("div", {
              className: "jsx-b715cb8c1fa75266 max-w-[210mm] mx-auto",
              children: [
                (0, t.jsxs)("div", {
                  className:
                    "jsx-b715cb8c1fa75266 relative bg-[#F36F21] w-full px-12 py-6 print:fixed print:top-0 print:left-0 print:right-0 print:z-50",
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "jsx-b715cb8c1fa75266 absolute top-0 left-0 right-0 h-1 bg-white opacity-30",
                    }),
                    (0, t.jsx)("div", {
                      className: "jsx-b715cb8c1fa75266 max-w-full",
                      children: (0, t.jsxs)("div", {
                        className:
                          "jsx-b715cb8c1fa75266 flex items-start justify-between mb-4",
                        children: [
                          (0, t.jsxs)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 flex items-center gap-4",
                            children: [
                              (0, t.jsx)("div", {
                                className:
                                  "jsx-b715cb8c1fa75266 bg-white p-2 rounded-lg shadow-lg",
                                children: (0, t.jsx)("img", {
                                  src: "/assets/images/logo-transparent.png",
                                  alt: "Pixelate Nest Logo",
                                  className: "jsx-b715cb8c1fa75266 h-10 w-auto",
                                }),
                              }),
                              (0, t.jsxs)("div", {
                                className:
                                  "jsx-b715cb8c1fa75266 border-l-2 border-white pl-4",
                                children: [
                                  (0, t.jsx)("h1", {
                                    className:
                                      "jsx-b715cb8c1fa75266 text-2xl font-black text-white tracking-tight",
                                    children: "Pixelate Nest",
                                  }),
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 text-white text-xs font-medium opacity-90",
                                    children: "Creative Digital Solutions",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsx)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 bg-white bg-opacity-10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white border-opacity-30",
                            children: (0, t.jsxs)("p", {
                              className:
                                "jsx-b715cb8c1fa75266 text-white text-xs font-semibold",
                              children: [
                                new Date().toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }),
                                " ",
                                "|",
                                " ",
                                new Date().toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, t.jsxs)("section", {
                  className:
                    "jsx-b715cb8c1fa75266 h-screen flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-orange-50 via-white to-orange-50 print:pt-32",
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "jsx-b715cb8c1fa75266 absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F36F21] via-orange-400 to-[#F36F21]",
                    }),
                    (0, t.jsx)("div", {
                      className:
                        "jsx-b715cb8c1fa75266 absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#F36F21] via-orange-400 to-[#F36F21]",
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "jsx-b715cb8c1fa75266 text-center space-y-8 max-w-2xl",
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "jsx-b715cb8c1fa75266 inline-block bg-[#F36F21] text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide",
                          children: b.quoteId,
                        }),
                        (0, t.jsx)("h1", {
                          className:
                            "jsx-b715cb8c1fa75266 text-5xl md:text-6xl font-black text-gray-900 leading-tight",
                          children: b.title,
                        }),
                        b.subtitle &&
                          (0, t.jsx)("p", {
                            className:
                              "jsx-b715cb8c1fa75266 text-2xl text-gray-700 font-light",
                            children: b.subtitle,
                          }),
                        (0, t.jsxs)("div", {
                          className:
                            "jsx-b715cb8c1fa75266 flex items-center justify-center gap-4 py-4",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "jsx-b715cb8c1fa75266 w-20 h-1 bg-[#F36F21]",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "jsx-b715cb8c1fa75266 w-3 h-3 bg-[#F36F21] rounded-full",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "jsx-b715cb8c1fa75266 w-20 h-1 bg-[#F36F21]",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "jsx-b715cb8c1fa75266 space-y-2",
                          children: [
                            (0, t.jsx)("p", {
                              className:
                                "jsx-b715cb8c1fa75266 text-sm text-gray-500 uppercase tracking-wider",
                              children: "Prepared For",
                            }),
                            (0, t.jsx)("p", {
                              className:
                                "jsx-b715cb8c1fa75266 text-3xl font-bold text-gray-900",
                              children:
                                p?.businessName || p?.name || "Valued Client",
                            }),
                          ],
                        }),
                        (0, t.jsx)("p", {
                          className:
                            "jsx-b715cb8c1fa75266 text-lg text-gray-600",
                          children: _,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("section", {
                  className: "jsx-b715cb8c1fa75266 min-h-screen print:pt-10",
                  children: (0, t.jsxs)("div", {
                    className: "jsx-b715cb8c1fa75266 px-12 pt-10",
                    children: [
                      (0, t.jsxs)("div", {
                        className: "jsx-b715cb8c1fa75266 mb-6",
                        children: [
                          (0, t.jsxs)("h2", {
                            className:
                              "jsx-b715cb8c1fa75266 text-2xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-8 bg-[#F36F21] mr-3",
                              }),
                              "About Pixelate Nest",
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 space-y-4 text-gray-700 leading-relaxed text-base",
                            children: [
                              (0, t.jsx)("p", {
                                className: "jsx-b715cb8c1fa75266",
                                children:
                                  h?.aboutUs ||
                                  "Pixelate Nest is a leading creative digital agency specializing in innovative software solutions, cutting-edge web and app development, stunning photography, and professional video editing services. We help businesses transform their digital presence and achieve measurable growth through technology-driven solutions.",
                              }),
                              (0, t.jsx)("p", {
                                className: "jsx-b715cb8c1fa75266 text-sm",
                                children:
                                  "With a team of experienced developers, designers, and creative professionals, we deliver end-to-end solutions tailored to each client's unique needs. Our expertise spans custom software development, e-commerce platforms, mobile applications, brand photography, corporate video production, and digital marketing content creation.",
                              }),
                              (0, t.jsx)("p", {
                                className: "jsx-b715cb8c1fa75266 text-sm",
                                children:
                                  "We pride ourselves on our commitment to quality, timely delivery, and exceptional client service. Every project is executed with precision, creativity, and a focus on delivering tangible business results.",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)("div", {
                        className: "jsx-b715cb8c1fa75266 mb-6",
                        children: (0, t.jsxs)("div", {
                          className:
                            "jsx-b715cb8c1fa75266 grid grid-cols-1 md:grid-cols-3 gap-6",
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "jsx-b715cb8c1fa75266 bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400",
                              children: [
                                (0, t.jsxs)("h3", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-3 flex items-center",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-2xl mr-2",
                                      children: "🎯",
                                    }),
                                    "Mission",
                                  ],
                                }),
                                (0, t.jsx)("p", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-gray-700 text-sm leading-relaxed",
                                  children:
                                    h?.mission ||
                                    "To deliver exceptional digital solutions that exceed client expectations.",
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className:
                                "jsx-b715cb8c1fa75266 bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400",
                              children: [
                                (0, t.jsxs)("h3", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-3 flex items-center",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-2xl mr-2",
                                      children: "👁️",
                                    }),
                                    "Vision",
                                  ],
                                }),
                                (0, t.jsx)("p", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-gray-700 text-sm leading-relaxed",
                                  children:
                                    h?.vision ||
                                    "To be the leading creative digital agency transforming businesses globally.",
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className:
                                "jsx-b715cb8c1fa75266 bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400",
                              children: [
                                (0, t.jsxs)("h3", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-3 flex items-center",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-2xl mr-2",
                                      children: "🚀",
                                    }),
                                    "Goal",
                                  ],
                                }),
                                (0, t.jsx)("p", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-gray-700 text-sm leading-relaxed",
                                  children:
                                    h?.goal ||
                                    "To empower 1000+ businesses with cutting-edge digital solutions.",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                (0, t.jsxs)("div", {
                  className:
                    "jsx-b715cb8c1fa75266 min-h-screen px-12 print:pt-20",
                  children: [
                    (0, t.jsxs)("section", {
                      className: "jsx-b715cb8c1fa75266 mb-6",
                      children: [
                        (0, t.jsxs)("h3", {
                          className:
                            "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-6 flex items-center",
                          children: [
                            (0, t.jsx)("span", {
                              className:
                                "jsx-b715cb8c1fa75266 w-1 h-8 bg-[#F36F21] mr-3",
                            }),
                            "Client Information",
                          ],
                        }),
                        (0, t.jsx)("div", {
                          className:
                            "jsx-b715cb8c1fa75266 bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#F36F21]",
                          children: (0, t.jsxs)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 grid grid-cols-3 gap-6",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "jsx-b715cb8c1fa75266",
                                children: [
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 text-xs text-gray-500 uppercase tracking-wide mb-1",
                                    children: "Client Name",
                                  }),
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 text-lg font-bold text-gray-900",
                                    children: p?.name || "N/A",
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className: "jsx-b715cb8c1fa75266",
                                children: [
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 text-xs text-gray-500 uppercase tracking-wide mb-1",
                                    children: "Email",
                                  }),
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 font-semibold text-gray-900",
                                    children: p?.email || "N/A",
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className: "jsx-b715cb8c1fa75266",
                                children: [
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 text-xs text-gray-500 uppercase tracking-wide mb-1",
                                    children: "Phone",
                                  }),
                                  (0, t.jsx)("p", {
                                    className:
                                      "jsx-b715cb8c1fa75266 font-semibold text-gray-900",
                                    children: p?.phone || "N/A",
                                  }),
                                ],
                              }),
                              p?.address &&
                                (0, t.jsxs)("div", {
                                  className: "jsx-b715cb8c1fa75266 col-span-2",
                                  children: [
                                    (0, t.jsx)("p", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-xs text-gray-500 uppercase tracking-wide mb-1",
                                      children: "Address",
                                    }),
                                    (0, t.jsx)("p", {
                                      className:
                                        "jsx-b715cb8c1fa75266 font-semibold text-gray-900",
                                      children: p.address,
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    b.objective &&
                      (0, t.jsxs)("section", {
                        className: "jsx-b715cb8c1fa75266 mb-8",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Project Objective",
                            ],
                          }),
                          (0, t.jsx)("p", {
                            className:
                              "jsx-b715cb8c1fa75266 text-gray-700 leading-relaxed whitespace-pre-wrap",
                            children: b.objective,
                          }),
                        ],
                      }),
                    b.purpose &&
                      (0, t.jsxs)("section", {
                        className: "jsx-b715cb8c1fa75266 mb-8",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Purpose",
                            ],
                          }),
                          (0, t.jsx)("p", {
                            className:
                              "jsx-b715cb8c1fa75266 text-gray-700 leading-relaxed whitespace-pre-wrap",
                            children: b.purpose,
                          }),
                        ],
                      }),
                    b.scope &&
                      b.scope.length > 0 &&
                      (0, t.jsxs)("section", {
                        className: "jsx-b715cb8c1fa75266 mb-8 page-break-after",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Scope of Work",
                            ],
                          }),
                          (0, t.jsx)("ul", {
                            className: "jsx-b715cb8c1fa75266 space-y-2",
                            children: b.scope.map((e, s) =>
                              (0, t.jsxs)(
                                "li",
                                {
                                  className:
                                    "jsx-b715cb8c1fa75266 flex items-start",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-[#F36F21] mr-2",
                                      children: "•",
                                    }),
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-gray-700",
                                      children: e,
                                    }),
                                  ],
                                },
                                s,
                              ),
                            ),
                          }),
                        ],
                      }),
                    b.deliverables &&
                      b.deliverables.length > 0 &&
                      (0, t.jsxs)("section", {
                        className:
                          "jsx-b715cb8c1fa75266 mb-8 page-break-before print:pt-36",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Deliverables",
                            ],
                          }),
                          (0, t.jsx)("ul", {
                            className: "jsx-b715cb8c1fa75266 space-y-2",
                            children: b.deliverables.map((e, s) =>
                              (0, t.jsxs)(
                                "li",
                                {
                                  className:
                                    "jsx-b715cb8c1fa75266 flex items-start",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-[#F36F21] mr-2",
                                      children: "✓",
                                    }),
                                    (0, t.jsx)("span", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-gray-700",
                                      children: e,
                                    }),
                                  ],
                                },
                                s,
                              ),
                            ),
                          }),
                        ],
                      }),
                    b.services &&
                      b.services.length > 0 &&
                      (0, t.jsxs)("section", {
                        className:
                          "jsx-b715cb8c1fa75266 mb-8 page-break-before",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Services Breakdown",
                            ],
                          }),
                          (0, t.jsx)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 overflow-hidden border border-gray-200 rounded-lg",
                            children: (0, t.jsxs)("table", {
                              className: "jsx-b715cb8c1fa75266 w-full",
                              children: [
                                (0, t.jsx)("thead", {
                                  className: "jsx-b715cb8c1fa75266 bg-gray-100",
                                  children: (0, t.jsxs)("tr", {
                                    className: "jsx-b715cb8c1fa75266",
                                    children: [
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-left text-sm font-semibold text-gray-900",
                                        children: "Service",
                                      }),
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-center text-sm font-semibold text-gray-900",
                                        children: "Qty",
                                      }),
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                        children: "Price",
                                      }),
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                        children: "Total",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, t.jsx)("tbody", {
                                  className:
                                    "jsx-b715cb8c1fa75266 divide-y divide-gray-200",
                                  children: b.services.map((e, s) => {
                                    let a = e.price * e.qty;
                                    return (0, t.jsxs)(
                                      "tr",
                                      {
                                        className: "jsx-b715cb8c1fa75266",
                                        children: [
                                          (0, t.jsx)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm text-gray-900",
                                            children: e.serviceName,
                                          }),
                                          (0, t.jsx)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm text-gray-700 text-center",
                                            children: e.qty,
                                          }),
                                          (0, t.jsxs)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm text-gray-900 text-right",
                                            children: [
                                              "₹",
                                              e.price.toLocaleString(),
                                            ],
                                          }),
                                          (0, t.jsxs)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm font-semibold text-gray-900 text-right",
                                            children: ["₹", a.toLocaleString()],
                                          }),
                                        ],
                                      },
                                      s,
                                    );
                                  }),
                                }),
                                (0, t.jsx)("tfoot", {
                                  className:
                                    "jsx-b715cb8c1fa75266 bg-gray-50 border-t-2 border-gray-300",
                                  children: (0, t.jsxs)("tr", {
                                    className: "jsx-b715cb8c1fa75266",
                                    children: [
                                      (0, t.jsx)("td", {
                                        colSpan: 3,
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                        children: "Grand Total",
                                      }),
                                      (0, t.jsxs)("td", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-right text-lg font-bold text-[#F36F21]",
                                        children: [
                                          "₹",
                                          b.services
                                            .reduce(
                                              (e, t) => e + t.price * t.qty,
                                              0,
                                            )
                                            .toLocaleString(),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    b.timeline &&
                      b.timeline.length > 0 &&
                      (0, t.jsxs)("section", {
                        className: "jsx-b715cb8c1fa75266 mb-8 page-break-after",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Project Timeline",
                            ],
                          }),
                          (0, t.jsx)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 overflow-hidden border border-gray-200 rounded-lg",
                            children: (0, t.jsxs)("table", {
                              className: "jsx-b715cb8c1fa75266 w-full",
                              children: [
                                (0, t.jsx)("thead", {
                                  className: "jsx-b715cb8c1fa75266 bg-gray-100",
                                  children: (0, t.jsxs)("tr", {
                                    className: "jsx-b715cb8c1fa75266",
                                    children: [
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-left text-sm font-semibold text-gray-900",
                                        children: "Phase",
                                      }),
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-left text-sm font-semibold text-gray-900",
                                        children: "Description",
                                      }),
                                      (0, t.jsx)("th", {
                                        className:
                                          "jsx-b715cb8c1fa75266 px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                        children: "Duration",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, t.jsx)("tbody", {
                                  className:
                                    "jsx-b715cb8c1fa75266 divide-y divide-gray-200",
                                  children: b.timeline.map((e, s) =>
                                    (0, t.jsxs)(
                                      "tr",
                                      {
                                        className:
                                          "jsx-b715cb8c1fa75266 hover:bg-gray-50",
                                        children: [
                                          (0, t.jsx)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm text-gray-900",
                                            children: e.phase,
                                          }),
                                          (0, t.jsx)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm text-gray-700",
                                            children: e.description,
                                          }),
                                          (0, t.jsx)("td", {
                                            className:
                                              "jsx-b715cb8c1fa75266 px-4 py-3 text-sm text-gray-900 text-right",
                                            children: e.duration,
                                          }),
                                        ],
                                      },
                                      s,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    b.modules &&
                      b.modules.length > 0 &&
                      (0, t.jsxs)("section", {
                        className: "jsx-b715cb8c1fa75266 mb-8 print:pt-36",
                        children: [
                          (0, t.jsxs)("h3", {
                            className:
                              "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                              }),
                              "Modules & Features",
                            ],
                          }),
                          (0, t.jsx)("div", {
                            className: "jsx-b715cb8c1fa75266 space-y-3",
                            children: b.modules.map((e, s) =>
                              (0, t.jsxs)(
                                "div",
                                {
                                  className:
                                    "jsx-b715cb8c1fa75266 border border-gray-200 rounded-lg p-4",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className:
                                        "jsx-b715cb8c1fa75266 flex items-start justify-between mb-2",
                                      children: [
                                        (0, t.jsx)("h4", {
                                          className:
                                            "jsx-b715cb8c1fa75266 font-semibold text-gray-900",
                                          children: e.moduleName,
                                        }),
                                        (0, t.jsx)("span", {
                                          className: `jsx-b715cb8c1fa75266 text-xs px-2 py-1 rounded-full ${"Completed" === e.status ? "bg-green-100 text-green-800" : "Ongoing" === e.status ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`,
                                          children: e.status,
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)("p", {
                                      className:
                                        "jsx-b715cb8c1fa75266 text-sm text-gray-700",
                                      children: e.description,
                                    }),
                                  ],
                                },
                                s,
                              ),
                            ),
                          }),
                        ],
                      }),
                    (0, t.jsxs)("section", {
                      className: "jsx-b715cb8c1fa75266 mb-8 page-break-before",
                      children: [
                        (0, t.jsxs)("h3", {
                          className:
                            "jsx-b715cb8c1fa75266 text-xl font-bold text-gray-900 mb-4 flex items-center",
                          children: [
                            (0, t.jsx)("span", {
                              className:
                                "jsx-b715cb8c1fa75266 w-1 h-6 bg-[#F36F21] mr-3",
                            }),
                            "Terms & Conditions",
                          ],
                        }),
                        (0, t.jsx)("div", {
                          className:
                            "jsx-b715cb8c1fa75266 bg-gray-50 p-5 rounded-lg",
                          children: (0, t.jsx)("ol", {
                            className:
                              "jsx-b715cb8c1fa75266 space-y-2 list-decimal list-inside",
                            children: (b.customTerms && b.customTerms.length > 0
                              ? b.customTerms
                              : h?.terms || []
                            ).map((e, s) =>
                              (0, t.jsx)(
                                "li",
                                {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-sm text-gray-700 leading-relaxed",
                                  children: e,
                                },
                                s,
                              ),
                            ),
                          }),
                        }),
                      ],
                    }),
                    (0, t.jsx)("section", {
                      className: "jsx-b715cb8c1fa75266 mb-8 mt-40",
                      children: (0, t.jsxs)("div", {
                        className:
                          "jsx-b715cb8c1fa75266 grid grid-cols-2 gap-8",
                        children: [
                          (0, t.jsxs)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 border-t-2 border-gray-300 pt-4",
                            children: [
                              (0, t.jsx)("p", {
                                className:
                                  "jsx-b715cb8c1fa75266 text-sm font-semibold text-gray-900",
                                children: "Authorized Signatory",
                              }),
                              (0, t.jsx)("p", {
                                className:
                                  "jsx-b715cb8c1fa75266 text-xs text-gray-600 mt-1",
                                children: h?.name || "Pixelate Nest",
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 border-t-2 border-gray-300 pt-4",
                            children: [
                              (0, t.jsx)("p", {
                                className:
                                  "jsx-b715cb8c1fa75266 text-sm font-semibold text-gray-900",
                                children: "Client Signature",
                              }),
                              (0, t.jsx)("p", {
                                className:
                                  "jsx-b715cb8c1fa75266 text-xs text-gray-600 mt-1",
                                children: p?.name || "Client",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsx)("footer", {
                      className:
                        "jsx-b715cb8c1fa75266 p-4 pt-3 border-t-2 border-gray-200 text-center text-xs text-gray-500 print:fixed print:bottom-0 print:left-0 print:right-0 print:bg-white",
                      children: (0, t.jsxs)("div", {
                        className:
                          "jsx-b715cb8c1fa75266 max-w-4xl mx-auto space-y-2",
                        children: [
                          (0, t.jsx)("p", {
                            className: "jsx-b715cb8c1fa75266",
                            children:
                              h?.footerText ||
                              "© 2026 Kalahanu Tech Studios LLP. All Rights Reserved.",
                          }),
                          (0, t.jsxs)("div", {
                            className:
                              "jsx-b715cb8c1fa75266 flex items-center justify-center gap-6 mt-1 text-xs",
                            children: [
                              (0, t.jsx)("div", {
                                className:
                                  "jsx-b715cb8c1fa75266 flex items-center gap-2",
                                children: (0, t.jsx)("span", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-gray-700 font-small",
                                  children: "+91 84069 12345",
                                }),
                              }),
                              (0, t.jsx)("div", {
                                className:
                                  "jsx-b715cb8c1fa75266 w-px h-5 bg-gray-300",
                              }),
                              (0, t.jsx)("div", {
                                className:
                                  "jsx-b715cb8c1fa75266 flex items-center gap-2",
                                children: (0, t.jsx)("span", {
                                  className:
                                    "jsx-b715cb8c1fa75266 text-gray-700 font-small",
                                  children: "support@pixelatenest.com",
                                }),
                              }),
                            ],
                          }),
                          (0, t.jsx)("p", {
                            className: "jsx-b715cb8c1fa75266 mt-1",
                            children: h?.website || "www.pixelatenest.com",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className: "jsx-b715cb8c1fa75266 print:pb-32",
                }),
              ],
            }),
          }),
          (0, t.jsx)(s.default, {
            id: "b715cb8c1fa75266",
            children:
              "@media print{*{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important;color-adjust:exact!important}body{margin:0;padding:0}.print-area{max-width:none;margin:0;padding:0}.page-break-after{page-break-after:always}@page{size:A4;margin:0}.print\\\\:fixed{position:fixed!important}.print\\\\:top-0{top:0!important}.print\\\\:pt-32{padding-top:140px!important}}",
          }),
        ],
      });
    }
    e.s(["default", () => d], 70294);
  },
]);
