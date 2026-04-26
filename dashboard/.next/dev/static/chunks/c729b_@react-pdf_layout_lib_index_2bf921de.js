(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@react-pdf/layout/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@react-pdf/fns/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@react-pdf/primitives/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@react-pdf/stylesheet/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@react-pdf/textkit/lib/textkit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$load$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/yoga-layout/dist/src/load.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/yoga-layout/dist/src/generated/YGEnums.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$emoji$2d$regex$2d$xs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/emoji-regex-xs/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$image$2f$lib$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@react-pdf/image/lib/index.browser.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;






 const transformText = (text, transformation)=>{
    switch(transformation){
        case 'uppercase':
            return text.toUpperCase();
        case 'lowercase':
            return text.toLowerCase();
        case 'capitalize':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["capitalize"])(text);
        case 'upperfirst':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["upperFirst"])(text);
        default:
            return text;
    }
};
const isTspan = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tspan"];
const isTextInstance$4 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInstance"];
const engines$1 = {
    bidi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bidi"],
    linebreaker: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linebreaker"],
    justification: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["justification"],
    textDecoration: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textDecoration"],
    scriptItemizer: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scriptItemizer"],
    wordHyphenation: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wordHyphenation"],
    fontSubstitution: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSubstitution"]
};
const engine$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(engines$1);
const getFragments$1 = (fontStore, instance)=>{
    if (!instance) return [
        {
            string: ''
        }
    ];
    const fragments = [];
    const { fill = 'black', fontFamily = 'Helvetica', fontWeight, fontStyle, fontSize = 18, textDecorationColor, textDecorationStyle, textTransform, opacity } = instance.props;
    const _textDecoration = instance.props.textDecoration;
    const fontFamilies = typeof fontFamily === 'string' ? [
        fontFamily
    ] : [
        ...fontFamily || []
    ];
    
    fontFamilies.push('Helvetica');
    const font = fontFamilies.map((fontFamilyName)=>{
        const opts = {
            fontFamily: fontFamilyName,
            fontWeight,
            fontStyle
        };
        const obj = fontStore.getFont(opts);
        return obj?.data;
    });
    const attributes = {
        font,
        opacity,
        fontSize,
        color: fill,
        underlineStyle: textDecorationStyle,
        underline: _textDecoration === 'underline' || _textDecoration === 'underline line-through' || _textDecoration === 'line-through underline',
        underlineColor: textDecorationColor || fill,
        strike: _textDecoration === 'line-through' || _textDecoration === 'underline line-through' || _textDecoration === 'line-through underline',
        strikeStyle: textDecorationStyle,
        strikeColor: textDecorationColor || fill
    };
    for(let i = 0; i < instance.children.length; i += 1){
        const child = instance.children[i];
        if (isTextInstance$4(child)) {
            fragments.push({
                string: transformText(child.value, textTransform),
                attributes
            });
        } else if (child) {
            fragments.push(...getFragments$1(fontStore, child));
        }
    }
    return fragments;
};
const getAttributedString$1 = (fontStore, instance)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromFragments"])(getFragments$1(fontStore, instance));
const AlmostInfinity = 999999999999;
const shrinkWhitespaceFactor = {
    before: -0.5,
    after: -0.5
};
const layoutTspan = (fontStore)=>(node, xOffset)=>{
        const attributedString = getAttributedString$1(fontStore, node);
        const x = node.props.x === undefined ? xOffset : node.props.x;
        const y = node.props?.y || 0;
        const container = {
            x,
            y,
            width: AlmostInfinity,
            height: AlmostInfinity
        };
        const hyphenationCallback = node.props.hyphenationCallback || fontStore?.getHyphenationCallback() || null;
        const layoutOptions = {
            hyphenationCallback,
            shrinkWhitespaceFactor
        };
        const lines = engine$1(attributedString, container, layoutOptions).flat();
        return Object.assign({}, node, {
            lines
        });
    };

const joinTSpanLines = (node)=>{
    const children = node.children.map((child, index)=>{
        if (!isTspan(child)) return child;
        const textInstance = child.children[0];
        if (child.props.x === undefined && index < node.children.length - 1 && textInstance?.value) {
            return Object.assign({}, child, {
                children: [
                    {
                        ...textInstance,
                        value: `${textInstance.value} `
                    }
                ]
            });
        }
        return child;
    }, []);
    return Object.assign({}, node, {
        children
    });
};
const layoutText$1 = (fontStore, node)=>{
    if (!node.children) return node;
    let currentXOffset = node.props?.x || 0;
    const layoutFn = layoutTspan(fontStore);
    const joinedNode = joinTSpanLines(node);
    const children = joinedNode.children.map((child)=>{
        const childWithLayout = layoutFn(child, currentXOffset);
        currentXOffset += childWithLayout.lines[0].xAdvance;
        return childWithLayout;
    });
    return Object.assign({}, node, {
        children
    });
};
const isDefs = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Defs"];
const getDefs = (node)=>{
    const children = node.children || [];
    const defs = children.find(isDefs);
    const values = defs?.children || [];
    return values.reduce((acc, value)=>{
        const id = value.props?.id;
        if (id) acc[id] = value;
        return acc;
    }, {});
};
const isNotDefs = (node)=>node.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Defs"];
const detachDefs = (node)=>{
    if (!node.children) return node;
    const children = node.children.filter(isNotDefs);
    return Object.assign({}, node, {
        children
    });
};
const URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;
const replaceDef = (defs, value)=>{
    if (!value) return undefined;
    if (!URL_REGEX.test(value)) return value;
    const match = value.match(URL_REGEX);
    return defs[match[1]];
};
const parseNodeDefs = (defs)=>(node)=>{
        const props = node.props;
        const fill = `fill` in props ? replaceDef(defs, props?.fill) : undefined;
        const clipPath = `clipPath` in props ? replaceDef(defs, props?.clipPath) : undefined;
        const newProps = Object.assign({}, node.props, {
            fill,
            clipPath
        });
        const children = node.children ? node.children.map(parseNodeDefs(defs)) : undefined;
        return Object.assign({}, node, {
            props: newProps,
            children
        });
    };
const parseDefs = (root)=>{
    if (!root.children) return root;
    const defs = getDefs(root);
    const children = root.children.map(parseNodeDefs(defs));
    return Object.assign({}, root, {
        children
    });
};
const replaceDefs = (node)=>{
    return detachDefs(parseDefs(node));
};
const parseViewbox = (value)=>{
    if (!value) return null;
    if (typeof value !== 'string') return value;
    const values = value.split(/[,\s]+/).map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"]);
    if (values.length !== 4) return null;
    return {
        minX: values[0],
        minY: values[1],
        maxX: values[2],
        maxY: values[3]
    };
};
const getContainer$1 = (node)=>{
    const viewbox = parseViewbox(node.props.viewBox);
    if (viewbox) {
        return {
            width: viewbox.maxX,
            height: viewbox.maxY
        };
    }
    if (node.props.width && node.props.height) {
        return {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"])(node.props.width),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"])(node.props.height)
        };
    }
    return {
        width: 0,
        height: 0
    };
};
const BASE_SVG_INHERITED_PROPS = [
    'x',
    'y',
    'clipPath',
    'clipRule',
    'opacity',
    'fill',
    'fillOpacity',
    'fillRule',
    'stroke',
    'strokeLinecap',
    'strokeLinejoin',
    'strokeOpacity',
    'strokeWidth',
    'textAnchor',
    'dominantBaseline',
    'color',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'letterSpacing',
    'opacity',
    'textDecoration',
    'lineHeight',
    'textAlign',
    'visibility',
    'wordSpacing'
];

const TEXT_SVG_INHERITED_PROPS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["without"])([
    'x'
], BASE_SVG_INHERITED_PROPS);
const SVG_INHERITED_PROPS = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"]]: TEXT_SVG_INHERITED_PROPS
};
const getInheritProps = (node)=>{
    const props = node.props || {};
    const svgInheritedProps = SVG_INHERITED_PROPS[node.type] ?? BASE_SVG_INHERITED_PROPS;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(svgInheritedProps, props);
};
const inheritProps = (node)=>{
    if (!node.children) return node;
    const inheritedProps = getInheritProps(node);
    const children = node.children.map((child)=>{
        const props = Object.assign({}, inheritedProps, child.props || {});
        const newChild = Object.assign({}, child, {
            props
        });
        return inheritProps(newChild);
    });
    return Object.assign({}, node, {
        children
    });
};
const parseAspectRatio = (value)=>{
    if (typeof value !== 'string') return value;
    const match = value.replace(/[\s\r\t\n]+/gm, ' ').replace(/^defer\s/, '').split(' ');
    const align = match[0] || 'xMidYMid';
    const meetOrSlice = match[1] || 'meet';
    return {
        align,
        meetOrSlice
    };
};
const STYLE_PROPS = [
    'width',
    'height',
    'color',
    'stroke',
    'strokeWidth',
    'opacity',
    'fillOpacity',
    'strokeOpacity',
    'fill',
    'fillRule',
    'clipPath',
    'offset',
    'transform',
    'strokeLinejoin',
    'strokeLinecap',
    'strokeDasharray',
    'gradientUnits',
    'gradientTransform'
];
const VERTICAL_PROPS = [
    'y',
    'y1',
    'y2',
    'height',
    'cy',
    'ry'
];
const HORIZONTAL_PROPS = [
    'x',
    'x1',
    'x2',
    'width',
    'cx',
    'rx'
];
const isSvg$3 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Svg"];
const isText$5 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"];
const isTextInstance$3 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInstance"];
const transformPercent = (container)=>(props)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapValues"])(props, (value, key)=>{
            const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(value);
            if (match && VERTICAL_PROPS.includes(key)) {
                return match.percent * container.height;
            }
            if (match && HORIZONTAL_PROPS.includes(key)) {
                return match.percent * container.width;
            }
            return value;
        });
const parsePercent = (value)=>{
    const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(value);
    return match ? match.percent : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"])(value);
};
const parseTransform = (container)=>(value)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(container, {
            transform: value
        }).transform;
    };
const parseProps = (container)=>(node)=>{
        let props = transformPercent(container)(node.props);
        props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evolve"])({
            x: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            x1: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            x2: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            y: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            y1: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            y2: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            r: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            rx: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            ry: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            cx: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            cy: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
            offset: parsePercent,
            fill: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"],
            opacity: parsePercent,
            stroke: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"],
            stopOpacity: parsePercent,
            stopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"],
            transform: parseTransform(container),
            gradientTransform: parseTransform(container)
        }, props);
        return Object.assign({}, node, {
            props
        });
    };
const mergeStyles$1 = (node)=>{
    const style = node.style || {};
    const props = Object.assign({}, style, node.props);
    return Object.assign({}, node, {
        props
    });
};
const removeNoneValues = (node)=>{
    const removeNone = (value)=>value === 'none' ? null : value;
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapValues"])(node.props, removeNone);
    return Object.assign({}, node, {
        props
    });
};
const pickStyleProps = (node)=>{
    const props = node.props || {};
    const styleProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(STYLE_PROPS, props);
    const style = Object.assign({}, styleProps, node.style || {});
    return Object.assign({}, node, {
        style
    });
};
const parseSvgProps = (node)=>{
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evolve"])({
        width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
        height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseFloat"],
        viewBox: parseViewbox,
        preserveAspectRatio: parseAspectRatio
    }, node.props);
    return Object.assign({}, node, {
        props
    });
};
const wrapBetweenTspan = (node)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tspan"],
        props: {},
        style: {},
        children: [
            node
        ]
    });
const addMissingTspan = (node)=>{
    if (!isText$5(node)) return node;
    if (!node.children) return node;
    const resolveChild = (child)=>isTextInstance$3(child) ? wrapBetweenTspan(child) : child;
    const children = node.children.map(resolveChild);
    return Object.assign({}, node, {
        children
    });
};
const parseText = (fontStore)=>(node)=>{
        if (isText$5(node)) return layoutText$1(fontStore, node);
        if (!node.children) return node;
        const children = node.children.map(parseText(fontStore));
        return Object.assign({}, node, {
            children
        });
    };
const resolveSvgNode = (container)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(parseProps(container), addMissingTspan, removeNoneValues, mergeStyles$1);
const resolveChildren = (container)=>(node)=>{
        if (!node.children) return node;
        const resolveChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(resolveChildren(container), resolveSvgNode(container));
        const children = node.children.map(resolveChild);
        return Object.assign({}, node, {
            children
        });
    };
const buildXLinksIndex = (node)=>{
    const idIndex = {};
    const listToExplore = node.children?.slice(0) || [];
    while(listToExplore.length > 0){
        const child = listToExplore.shift();
        if (child.props && 'id' in child.props) {
            idIndex[child.props.id] = child;
        }
        if (child.children) listToExplore.push(...child.children);
    }
    return idIndex;
};
const replaceXLinks = (node, idIndex)=>{
    if (node.props && 'xlinkHref' in node.props) {
        const linkedNode = idIndex[node.props.xlinkHref.replace(/^#/, '')];
        
        if (!linkedNode) return node;
        const newProps = Object.assign({}, linkedNode.props, node.props);
        delete newProps.xlinkHref;
        return Object.assign({}, linkedNode, {
            props: newProps
        });
    }
    const children = node.children?.map((child)=>replaceXLinks(child, idIndex));
    return Object.assign({}, node, {
        children
    });
};
const resolveXLinks = (node)=>{
    const idIndex = buildXLinksIndex(node);
    return replaceXLinks(node, idIndex);
};
const resolveSvgRoot = (node, fontStore)=>{
    const container = getContainer$1(node);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(replaceDefs, parseText(fontStore), parseSvgProps, pickStyleProps, inheritProps, resolveChildren(container), resolveXLinks)(node);
};






 const resolveSvg = (node, fontStore)=>{
    if (!('children' in node)) return node;
    const resolveChild = (child)=>resolveSvg(child, fontStore);
    const root = isSvg$3(node) ? resolveSvgRoot(node, fontStore) : node;
    const children = root.children?.map(resolveChild);
    return Object.assign({}, root, {
        children
    });
};
let instancePromise;
const loadYoga = async ()=>{
    
    
    const instance = await (instancePromise ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$load$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadYoga"])());
    const config = instance.Config.create();
    config.setPointScaleFactor(0);
    const node = {
        create: ()=>instance.Node.createWithConfig(config)
    };
    return {
        node
    };
};
const resolveYoga = async (root)=>{
    const yoga = await loadYoga();
    return Object.assign({}, root, {
        yoga
    });
};
const getZIndex = (node)=>node.style.zIndex;
const shouldSort = (node)=>node.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Document"] && node.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Svg"];
const sortZIndex = (a, b)=>{
    const za = getZIndex(a);
    const zb = getZIndex(b);
    if (!za && !zb) return 0;
    if (!za) return 1;
    if (!zb) return -1;
    return zb - za;
};





 const resolveNodeZIndex = (node)=>{
    if (!node.children) return node;
    const sortedChildren = shouldSort(node) ? node.children.sort(sortZIndex) : node.children;
    const children = sortedChildren.map(resolveNodeZIndex);
    return Object.assign({}, node, {
        children
    });
};





 const resolveZIndex = (root)=>resolveNodeZIndex(root);
 
const emojis = {};
const regex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$emoji$2d$regex$2d$xs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();









 const removeVariationSelectors = (x)=>x !== '️';
const getCodePoints = (string, withVariationSelectors = false)=>Array.from(string).filter(withVariationSelectors ? ()=>true : removeVariationSelectors).map((char)=>char.codePointAt(0).toString(16)).join('-');
const buildEmojiUrl = (emoji, source)=>{
    if ('builder' in source) {
        return source.builder(getCodePoints(emoji, source.withVariationSelectors));
    }
    const { url, format = 'png', withVariationSelectors } = source;
    return `${url}${getCodePoints(emoji, withVariationSelectors)}.${format}`;
};
const fetchEmojis = (string, source)=>{
    if (!source) return [];
    const promises = [];
    Array.from(string.matchAll(regex)).forEach((match)=>{
        const emoji = match[0];
        if (!emojis[emoji] || emojis[emoji].loading) {
            const emojiUrl = buildEmojiUrl(emoji, source);
            emojis[emoji] = {
                loading: true
            };
            promises.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$image$2f$lib$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                uri: emojiUrl
            }).then((image)=>{
                emojis[emoji].loading = false;
                emojis[emoji].data = image.data;
            }).catch((e)=>{
                console.warn(e, 'Failed to load emoji image');
                emojis[emoji].loading = false;
            }));
        }
    });
    return promises;
};
const embedEmojis = (fragments)=>{
    const result = [];
    for(let i = 0; i < fragments.length; i += 1){
        const fragment = fragments[i];
        let lastIndex = 0;
        Array.from(fragment.string.matchAll(regex)).forEach((match)=>{
            const { index } = match;
            const emoji = match[0];
            const emojiSize = fragment.attributes.fontSize;
            const chunk = fragment.string.slice(lastIndex, index + match[0].length);
            
            
            if (emojis[emoji] && emojis[emoji].data) {
                result.push({
                    string: chunk.replace(match[0], String.fromCharCode(0xfffc)),
                    attributes: {
                        ...fragment.attributes,
                        attachment: {
                            width: emojiSize,
                            height: emojiSize,
                            yOffset: Math.floor(emojiSize * 0.1),
                            image: emojis[emoji].data
                        }
                    }
                });
            } else {
                
                result.push({
                    string: chunk,
                    attributes: fragment.attributes
                });
            }
            lastIndex = index + emoji.length;
        });
        if (lastIndex < fragment.string.length) {
            result.push({
                string: fragment.string.slice(lastIndex),
                attributes: fragment.attributes
            });
        }
    }
    return result;
};





 const getSource = (node)=>{
    if (node.props.src) return node.props.src;
    if (node.props.source) return node.props.source;
};







 const resolveSource = async (src)=>{
    const source = typeof src === 'function' ? await src() : await src;
    return typeof source === 'string' ? {
        uri: source
    } : source;
};





 const fetchImage = async (node)=>{
    const src = getSource(node);
    const { cache } = node.props;
    if (!src) {
        console.warn(false, 'Image should receive either a "src" or "source" prop');
        return;
    }
    try {
        const source = await resolveSource(src);
        if (!source) {
            throw new Error(`Image's "src" or "source" prop returned ${source}`);
        }
        node.image = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$image$2f$lib$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(source, {
            cache
        });
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(source) || source instanceof Blob) return;
        node.image.key = 'data' in source ? source.data.toString() : source.uri;
    } catch (e) {
        console.warn(e.message);
    }
};
const isImage$2 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"];






 const fetchAssets = (fontStore, node)=>{
    const promises = [];
    const listToExplore = node.children?.slice(0) || [];
    const emojiSource = fontStore ? fontStore.getEmojiSource() : null;
    while(listToExplore.length > 0){
        const n = listToExplore.shift();
        if (isImage$2(n)) {
            promises.push(fetchImage(n));
        }
        if (fontStore && n.style?.fontFamily) {
            const fontFamilies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["castArray"])(n.style.fontFamily);
            promises.push(...fontFamilies.map((fontFamily)=>fontStore.load({
                    fontFamily,
                    fontStyle: n.style.fontStyle,
                    fontWeight: n.style.fontWeight
                })));
        }
        if (typeof n === 'string') {
            promises.push(...fetchEmojis(n, emojiSource));
        }
        if ('value' in n && typeof n.value === 'string') {
            promises.push(...fetchEmojis(n.value, emojiSource));
        }
        if (n.children) {
            n.children.forEach((childNode)=>{
                listToExplore.push(childNode);
            });
        }
    }
    return promises;
};







 const resolveAssets = async (node, fontStore)=>{
    const promises = fetchAssets(fontStore, node);
    await Promise.all(promises);
    return node;
};
const isLink$1 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"];
const DEFAULT_LINK_STYLES = {
    color: 'blue',
    textDecoration: 'underline'
};






 const computeStyle = (container, node)=>{
    let baseStyle = [
        node.style
    ];
    if (isLink$1(node)) {
        baseStyle = Array.isArray(node.style) ? [
            DEFAULT_LINK_STYLES,
            ...node.style
        ] : [
            DEFAULT_LINK_STYLES,
            node.style
        ];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(container, baseStyle);
};





 const resolveNodeStyles = (container)=>(node)=>{
        const style = computeStyle(container, node);
        if (!node.children) return Object.assign({}, node, {
            style
        });
        const children = node.children.map(resolveNodeStyles(container));
        return Object.assign({}, node, {
            style,
            children
        });
    };





 const resolvePageStyles = (page)=>{
    const dpi = page.props?.dpi || 72;
    const style = page.style;
    const width = page.box?.width || style.width;
    const height = page.box?.height || style.height;
    const orientation = page.props?.orientation || 'portrait';
    const remBase = style?.fontSize || 18;
    const container = {
        width,
        height,
        orientation,
        dpi,
        remBase
    };
    return resolveNodeStyles(container)(page);
};





 const resolveStyles = (root)=>{
    if (!root.children) return root;
    const children = root.children.map(resolvePageStyles);
    return Object.assign({}, root, {
        children
    });
};
const getTransformStyle = (s)=>(node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(node.style?.[s]) ? '50%' : node.style?.[s] ?? null;





 const getOrigin = (node)=>{
    if (!node.box) return null;
    const { left, top, width, height } = node.box;
    const transformOriginX = getTransformStyle('transformOriginX')(node);
    const transformOriginY = getTransformStyle('transformOriginY')(node);
    const percentX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(transformOriginX);
    const percentY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(transformOriginY);
    const offsetX = percentX ? width * percentX.percent : transformOriginX;
    const offsetY = percentY ? height * percentY.percent : transformOriginY;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(offsetX) || typeof offsetX === 'string') throw new Error(`Invalid origin offsetX: ${offsetX}`);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(offsetY) || typeof offsetY === 'string') throw new Error(`Invalid origin offsetY: ${offsetY}`);
    return {
        left: left + offsetX,
        top: top + offsetY
    };
};





 const resolveNodeOrigin = (node)=>{
    const origin = getOrigin(node);
    const newNode = Object.assign({}, node, {
        origin
    });
    if (!node.children) return newNode;
    const children = node.children.map(resolveNodeOrigin);
    return Object.assign({}, newNode, {
        children
    });
};





 const resolveOrigin = (root)=>{
    if (!root.children) return root;
    const children = root.children.map(resolveNodeOrigin);
    return Object.assign({}, root, {
        children
    });
};
const getBookmarkValue = (bookmark)=>{
    return typeof bookmark === 'string' ? {
        title: bookmark,
        fit: false,
        expanded: false
    } : bookmark;
};
const resolveBookmarks = (node)=>{
    let refs = 0;
    const children = (node.children || []).slice(0);
    const listToExplore = children.map((value)=>({
            value,
            parent: null
        }));
    while(listToExplore.length > 0){
        const element = listToExplore.shift();
        if (!element) break;
        const child = element.value;
        let parent = element.parent;
        if (child.props && 'bookmark' in child.props && child.props.bookmark) {
            const bookmark = getBookmarkValue(child.props.bookmark);
            const ref = refs++;
            const newHierarchy = {
                ref,
                parent: parent?.ref,
                ...bookmark
            };
            child.props.bookmark = newHierarchy;
            parent = newHierarchy;
        }
        if (child.children) {
            child.children.forEach((childNode)=>{
                listToExplore.push({
                    value: childNode,
                    parent
                });
            });
        }
    }
    return node;
};
const VALID_ORIENTATIONS = [
    'portrait',
    'landscape'
];





 const getOrientation = (page)=>{
    const value = page.props?.orientation || 'portrait';
    return VALID_ORIENTATIONS.includes(value) ? value : 'portrait';
};





 const isLandscape = (page)=>getOrientation(page) === 'landscape';

const PAGE_SIZES = {
    '4A0': [
        4767.87,
        6740.79
    ],
    '2A0': [
        3370.39,
        4767.87
    ],
    A0: [
        2383.94,
        3370.39
    ],
    A1: [
        1683.78,
        2383.94
    ],
    A2: [
        1190.55,
        1683.78
    ],
    A3: [
        841.89,
        1190.55
    ],
    A4: [
        595.28,
        841.89
    ],
    A5: [
        419.53,
        595.28
    ],
    A6: [
        297.64,
        419.53
    ],
    A7: [
        209.76,
        297.64
    ],
    A8: [
        147.4,
        209.76
    ],
    A9: [
        104.88,
        147.4
    ],
    A10: [
        73.7,
        104.88
    ],
    B0: [
        2834.65,
        4008.19
    ],
    B1: [
        2004.09,
        2834.65
    ],
    B2: [
        1417.32,
        2004.09
    ],
    B3: [
        1000.63,
        1417.32
    ],
    B4: [
        708.66,
        1000.63
    ],
    B5: [
        498.9,
        708.66
    ],
    B6: [
        354.33,
        498.9
    ],
    B7: [
        249.45,
        354.33
    ],
    B8: [
        175.75,
        249.45
    ],
    B9: [
        124.72,
        175.75
    ],
    B10: [
        87.87,
        124.72
    ],
    C0: [
        2599.37,
        3676.54
    ],
    C1: [
        1836.85,
        2599.37
    ],
    C2: [
        1298.27,
        1836.85
    ],
    C3: [
        918.43,
        1298.27
    ],
    C4: [
        649.13,
        918.43
    ],
    C5: [
        459.21,
        649.13
    ],
    C6: [
        323.15,
        459.21
    ],
    C7: [
        229.61,
        323.15
    ],
    C8: [
        161.57,
        229.61
    ],
    C9: [
        113.39,
        161.57
    ],
    C10: [
        79.37,
        113.39
    ],
    RA0: [
        2437.8,
        3458.27
    ],
    RA1: [
        1729.13,
        2437.8
    ],
    RA2: [
        1218.9,
        1729.13
    ],
    RA3: [
        864.57,
        1218.9
    ],
    RA4: [
        609.45,
        864.57
    ],
    SRA0: [
        2551.18,
        3628.35
    ],
    SRA1: [
        1814.17,
        2551.18
    ],
    SRA2: [
        1275.59,
        1814.17
    ],
    SRA3: [
        907.09,
        1275.59
    ],
    SRA4: [
        637.8,
        907.09
    ],
    EXECUTIVE: [
        521.86,
        756.0
    ],
    FOLIO: [
        612.0,
        936.0
    ],
    LEGAL: [
        612.0,
        1008.0
    ],
    LETTER: [
        612.0,
        792.0
    ],
    TABLOID: [
        792.0,
        1224.0
    ],
    ID1: [
        153,
        243
    ]
};





 const parseValue = (value)=>{
    if (typeof value === 'number') return {
        value,
        unit: undefined
    };
    const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|px)?$/g.exec(value);
    return match ? {
        value: parseFloat(match[1]),
        unit: match[2] || 'pt'
    } : {
        value,
        unit: undefined
    };
};






 const transformUnit = (value, inputDpi)=>{
    if (!value) return 0;
    const scalar = parseValue(value);
    const outputDpi = 72;
    const mmFactor = 1 / 25.4 * outputDpi;
    const cmFactor = 1 / 2.54 * outputDpi;
    if (typeof scalar.value === 'string') throw new Error(`Invalid page size: ${value}`);
    switch(scalar.unit){
        case 'in':
            return scalar.value * outputDpi;
        case 'mm':
            return scalar.value * mmFactor;
        case 'cm':
            return scalar.value * cmFactor;
        case 'px':
            return Math.round(scalar.value * (outputDpi / inputDpi));
        default:
            return scalar.value;
    }
};
const transformUnits = ({ width, height }, dpi)=>({
        width: transformUnit(width, dpi),
        height: transformUnit(height, dpi)
    });





 const toSizeObject = (v)=>({
        width: v[0],
        height: v[1]
    });





 const flipSizeObject = (v)=>({
        width: v.height,
        height: v.width
    });





 const getStringSize = (v)=>{
    return toSizeObject(PAGE_SIZES[v.toUpperCase()]);
};





 const getNumberSize = (n)=>toSizeObject([
        n,
        n
    ]);





 const getSize = (page)=>{
    const value = page.props?.size || 'A4';
    const dpi = page.props?.dpi || 72;
    let size;
    if (typeof value === 'string') {
        size = getStringSize(value);
    } else if (Array.isArray(value)) {
        size = transformUnits(toSizeObject(value), dpi);
    } else if (typeof value === 'number') {
        size = transformUnits(getNumberSize(value), dpi);
    } else {
        size = transformUnits(value, dpi);
    }
    return isLandscape(page) ? flipSizeObject(size) : size;
};





 const resolvePageSize = (page)=>{
    const size = getSize(page);
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$stylesheet$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flatten"])(page.style || {});
    return {
        ...page,
        style: {
            ...style,
            ...size
        }
    };
};





 const resolvePageSizes = (root)=>{
    if (!root.children) return root;
    const children = root.children.map(resolvePageSize);
    return Object.assign({}, root, {
        children
    });
};
const isFixed = (node)=>{
    if (!node.props) return false;
    return 'fixed' in node.props ? node.props.fixed === true : false;
};





 const lineIndexAtHeight = (node, height)=>{
    let y = 0;
    if (!node.lines) return 0;
    for(let i = 0; i < node.lines.length; i += 1){
        const line = node.lines[i];
        if (y + line.box.height > height) return i;
        y += line.box.height;
    }
    return node.lines.length;
};





 const heightAtLineIndex = (node, index)=>{
    let counter = 0;
    if (!node.lines) return counter;
    for(let i = 0; i < index; i += 1){
        const line = node.lines[i];
        if (!line) break;
        counter += line.box.height;
    }
    return counter;
};
const getLineBreak = (node, height)=>{
    const top = node.box?.top || 0;
    const widows = node.props.widows || 2;
    const orphans = node.props.orphans || 2;
    const linesQuantity = node.lines.length;
    const slicedLine = lineIndexAtHeight(node, height - top);
    if (slicedLine === 0) {
        return 0;
    }
    if (linesQuantity < orphans) {
        return linesQuantity;
    }
    if (slicedLine < orphans || linesQuantity < orphans + widows) {
        return 0;
    }
    if (linesQuantity === orphans + widows) {
        return orphans;
    }
    if (linesQuantity - slicedLine < widows) {
        return linesQuantity - widows;
    }
    return slicedLine;
};

const splitText = (node, height)=>{
    const slicedLineIndex = getLineBreak(node, height);
    const currentHeight = heightAtLineIndex(node, slicedLineIndex);
    const nextHeight = node.box.height - currentHeight;
    const current = Object.assign({}, node, {
        box: {
            ...node.box,
            height: currentHeight,
            borderBottomWidth: 0
        },
        style: {
            ...node.style,
            marginBottom: 0,
            paddingBottom: 0,
            borderBottomWidth: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        },
        lines: node.lines.slice(0, slicedLineIndex)
    });
    const next = Object.assign({}, node, {
        box: {
            ...node.box,
            top: 0,
            height: nextHeight,
            borderTopWidth: 0
        },
        style: {
            ...node.style,
            marginTop: 0,
            paddingTop: 0,
            borderTopWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        lines: node.lines.slice(slicedLineIndex)
    });
    return [
        current,
        next
    ];
};
const getTop$1 = (node)=>node.box?.top || 0;
const hasFixedHeight = (node)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(node.style?.height);
const splitNode = (node, height)=>{
    if (!node) return [
        null,
        null
    ];
    const nodeTop = getTop$1(node);
    const current = Object.assign({}, node, {
        box: {
            ...node.box,
            borderBottomWidth: 0
        },
        style: {
            ...node.style,
            marginBottom: 0,
            paddingBottom: 0,
            borderBottomWidth: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }
    });
    current.style.height = height - nodeTop;
    const nextHeight = hasFixedHeight(node) ? node.box.height - (height - nodeTop) : null;
    const next = Object.assign({}, node, {
        box: {
            ...node.box,
            top: 0,
            borderTopWidth: 0
        },
        style: {
            ...node.style,
            marginTop: 0,
            paddingTop: 0,
            borderTopWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        props: {
            ...node.props,
            bookmark: null
        }
    });
    if (nextHeight) {
        next.style.height = nextHeight;
    }
    return [
        current,
        next
    ];
};
const NON_WRAP_TYPES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Svg"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Note"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Canvas"]
];
const getWrap = (node)=>{
    if (NON_WRAP_TYPES.includes(node.type)) return false;
    if (!node.props) return true;
    return 'wrap' in node.props ? node.props.wrap : true;
};
const getComputedPadding = (node, edge)=>{
    const { yogaNode } = node;
    return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};





 const getPadding = (node)=>{
    const { style, box } = node;
    const paddingTop = getComputedPadding(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top) || box?.paddingTop || style?.paddingTop || 0;
    const paddingRight = getComputedPadding(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right) || box?.paddingRight || style?.paddingRight || 0;
    const paddingBottom = getComputedPadding(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom) || box?.paddingBottom || style?.paddingBottom || 0;
    const paddingLeft = getComputedPadding(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left) || box?.paddingLeft || style?.paddingLeft || 0;
    return {
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };
};
const getWrapArea = (page)=>{
    const height = page.style?.height;
    const { paddingBottom } = getPadding(page);
    return height - paddingBottom;
};
const getContentArea = (page)=>{
    const height = page.style?.height;
    const { paddingTop, paddingBottom } = getPadding(page);
    return height - paddingBottom - paddingTop;
};
const isString = (value)=>typeof value === 'string';
const isNumber = (value)=>typeof value === 'number';
const isBoolean = (value)=>typeof value === 'boolean';
const isFragment = (value)=>value && value.type === Symbol.for('react.fragment');







 const createInstances = (element)=>{
    if (!element) return [];
    if (Array.isArray(element)) {
        return element.reduce((acc, el)=>acc.concat(createInstances(el)), []);
    }
    if (isBoolean(element)) {
        return [];
    }
    if (isString(element) || isNumber(element)) {
        return [
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInstance"],
                value: `${element}`
            }
        ];
    }
    if (isFragment(element)) {
        
        return createInstances(element.props.children);
    }
    if (!isString(element.type)) {
        
        return createInstances(element.type(element.props));
    }
    const { type, props: { style = {}, children, ...props } } = element;
    const nextChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["castArray"])(children).reduce((acc, child)=>acc.concat(createInstances(child)), []);
    return [
        {
            type,
            style,
            props,
            children: nextChildren
        }
    ];
};
const getBreak = (node)=>'break' in node.props ? node.props.break : false;
const getMinPresenceAhead = (node)=>'minPresenceAhead' in node.props ? node.props.minPresenceAhead : 0;
const getFurthestEnd = (elements)=>Math.max(...elements.map((node)=>node.box.top + node.box.height));
const getEndOfMinPresenceAhead = (child)=>{
    return child.box.top + child.box.height + child.box.marginBottom + getMinPresenceAhead(child);
};
const getEndOfPresence = (child, futureElements)=>{
    const afterMinPresenceAhead = getEndOfMinPresenceAhead(child);
    const endOfFurthestFutureElement = getFurthestEnd(futureElements.filter((node)=>!('fixed' in node.props)));
    return Math.min(afterMinPresenceAhead, endOfFurthestFutureElement);
};
const shouldBreak = (child, futureElements, height, previousElements)=>{
    if ('fixed' in child.props) return false;
    const shouldSplit = height < child.box.top + child.box.height;
    const canWrap = getWrap(child);
    
    const endOfPresence = getEndOfPresence(child, futureElements);
    
    
    const breakingImprovesPresence = previousElements.filter((node)=>!isFixed(node)).length > 0;
    return getBreak(child) || shouldSplit && !canWrap || !shouldSplit && endOfPresence > height && breakingImprovesPresence;
};
const IGNORABLE_CODEPOINTS = [
    8232,
    8233
];
const buildSubsetForFont = (font)=>IGNORABLE_CODEPOINTS.reduce((acc, codePoint)=>{
        if (font && font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint)) {
            return acc;
        }
        return [
            ...acc,
            String.fromCharCode(codePoint)
        ];
    }, []);
const ignoreChars = (fragments)=>fragments.map((fragment)=>{
        const charSubset = buildSubsetForFont(fragment.attributes.font[0]);
        const subsetRegex = new RegExp(charSubset.join('|'));
        return {
            string: fragment.string.replace(subsetRegex, ''),
            attributes: fragment.attributes
        };
    });
const PREPROCESSORS = [
    ignoreChars,
    embedEmojis
];
const isImage$1 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"];
const isTextInstance$2 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInstance"];








 const getFragments = (fontStore, instance, parentLink = null, level = 0)=>{
    if (!instance) return [
        {
            string: ''
        }
    ];
    let fragments = [];
    const { color = 'black', direction = 'ltr', fontFamily = 'Helvetica', fontWeight, fontStyle, fontSize = 18, textAlign, lineHeight, textDecoration, textDecorationColor, textDecorationStyle, textTransform, letterSpacing, textIndent, opacity, verticalAlign } = instance.style;
    const fontFamilies = typeof fontFamily === 'string' ? [
        fontFamily
    ] : [
        ...fontFamily || []
    ];
    
    fontFamilies.push('Helvetica');
    const font = fontFamilies.map((fontFamilyName)=>{
        const opts = {
            fontFamily: fontFamilyName,
            fontWeight,
            fontStyle
        };
        const obj = fontStore.getFont(opts);
        return obj?.data;
    });
    
    const backgroundColor = level === 0 ? null : instance.style.backgroundColor;
    const attributes = {
        font,
        color,
        opacity,
        fontSize,
        lineHeight,
        direction,
        verticalAlign,
        backgroundColor,
        indent: textIndent,
        characterSpacing: letterSpacing,
        strikeStyle: textDecorationStyle,
        underlineStyle: textDecorationStyle,
        underline: textDecoration === 'underline' || textDecoration === 'underline line-through' || textDecoration === 'line-through underline',
        strike: textDecoration === 'line-through' || textDecoration === 'underline line-through' || textDecoration === 'line-through underline',
        strikeColor: textDecorationColor || color,
        underlineColor: textDecorationColor || color,
        
        link: parentLink || instance.props?.src || instance.props?.href,
        align: textAlign || (direction === 'rtl' ? 'right' : 'left')
    };
    for(let i = 0; i < instance.children.length; i += 1){
        const child = instance.children[i];
        if (isImage$1(child)) {
            fragments.push({
                string: String.fromCharCode(0xfffc),
                attributes: {
                    ...attributes,
                    attachment: {
                        width: child.style.width || fontSize,
                        height: child.style.height || fontSize,
                        image: child.image.data
                    }
                }
            });
        } else if (isTextInstance$2(child)) {
            fragments.push({
                string: transformText(child.value, textTransform),
                attributes
            });
        } else if (child) {
            fragments.push(...getFragments(fontStore, child, attributes.link, level + 1));
        }
    }
    for(let i = 0; i < PREPROCESSORS.length; i += 1){
        const preprocessor = PREPROCESSORS[i];
        fragments = preprocessor(fragments);
    }
    return fragments;
};






 const getAttributedString = (fontStore, instance)=>{
    const fragments = getFragments(fontStore, instance);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromFragments"])(fragments);
};
const engines = {
    bidi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bidi"],
    linebreaker: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linebreaker"],
    justification: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["justification"],
    textDecoration: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textDecoration"],
    scriptItemizer: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scriptItemizer"],
    wordHyphenation: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wordHyphenation"],
    fontSubstitution: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSubstitution"]
};
const engine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$textkit$2f$lib$2f$textkit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(engines);
const getMaxLines = (node)=>node.style?.maxLines;
const getTextOverflow = (node)=>node.style?.textOverflow;







 const getContainer = (width, height, node)=>{
    const maxLines = getMaxLines(node);
    const textOverflow = getTextOverflow(node);
    return {
        x: 0,
        y: 0,
        width,
        maxLines,
        height: height || Infinity,
        truncateMode: textOverflow
    };
};





 const getLayoutOptions = (fontStore, node)=>({
        hyphenationPenalty: node.props.hyphenationPenalty,
        shrinkWhitespaceFactor: {
            before: -0.5,
            after: -0.5
        },
        hyphenationCallback: node.props.hyphenationCallback || fontStore?.getHyphenationCallback() || null
    });








 const layoutText = (node, width, height, fontStore)=>{
    const attributedString = getAttributedString(fontStore, node);
    const container = getContainer(width, height, node);
    const options = getLayoutOptions(fontStore, node);
    const lines = engine(attributedString, container, options);
    return lines.reduce((acc, line)=>[
            ...acc,
            ...line
        ], []);
};
const isSvg$2 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Svg"];
const isText$4 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"];
const shouldIterate = (node)=>!isSvg$2(node) && !isText$4(node);
const shouldLayoutText = (node)=>isText$4(node) && !node.lines;







 const resolveTextLayout = (node, fontStore)=>{
    if (shouldLayoutText(node)) {
        const width = node.box.width - (node.box.paddingRight + node.box.paddingLeft);
        const height = node.box.height - (node.box.paddingTop + node.box.paddingBottom);
        node.lines = layoutText(node, width, height, fontStore);
    }
    if (shouldIterate(node)) {
        if (!node.children) return node;
        const mapChild = (child)=>resolveTextLayout(child, fontStore);
        const children = node.children.map(mapChild);
        return Object.assign({}, node, {
            children
        });
    }
    return node;
};
const BASE_INHERITABLE_PROPERTIES = [
    'color',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'letterSpacing',
    'opacity',
    'textDecoration',
    'textTransform',
    'lineHeight',
    'textAlign',
    'visibility',
    'wordSpacing'
];
const TEXT_INHERITABLE_PROPERTIES = [
    ...BASE_INHERITABLE_PROPERTIES,
    'backgroundColor'
];
const isType$2 = (type)=>(node)=>node.type === type;
const isSvg$1 = isType$2(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Svg"]);
const isText$3 = isType$2(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"]);

const mergeValues = (styleName, value, inheritedValue)=>{
    switch(styleName){
        case 'textDecoration':
            {
                
                return [
                    inheritedValue,
                    value
                ].filter((v)=>v && v !== 'none').join(' ');
            }
        default:
            return value;
    }
};

const merge = (inheritedStyles, style)=>{
    const mergedStyles = {
        ...inheritedStyles
    };
    Object.entries(style).forEach(([styleName, value])=>{
        mergedStyles[styleName] = mergeValues(styleName, value, inheritedStyles[styleName]);
    });
    return mergedStyles;
};





 const mergeStyles = (inheritedStyles)=>(node)=>{
        const style = merge(inheritedStyles, node.style || {});
        return Object.assign({}, node, {
            style
        });
    };






 const resolveInheritance = (node)=>{
    if (isSvg$1(node)) return node;
    if (!('children' in node)) return node;
    const inheritableProperties = isText$3(node) ? TEXT_INHERITABLE_PROPERTIES : BASE_INHERITABLE_PROPERTIES;
    const inheritStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(inheritableProperties, node.style || {});
    const resolveChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(resolveInheritance, mergeStyles(inheritStyles));
    const children = node.children.map(resolveChild);
    return Object.assign({}, node, {
        children
    });
};
const getComputedMargin = (node, edge)=>{
    const { yogaNode } = node;
    return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};





 const getMargin = (node)=>{
    const { style, box } = node;
    const marginTop = getComputedMargin(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top) || box?.marginTop || style?.marginTop || 0;
    const marginRight = getComputedMargin(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right) || box?.marginRight || style?.marginRight || 0;
    const marginBottom = getComputedMargin(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom) || box?.marginBottom || style?.marginBottom || 0;
    const marginLeft = getComputedMargin(node, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left) || box?.marginLeft || style?.marginLeft || 0;
    return {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
    };
};





 const getPosition = (node)=>{
    const { yogaNode } = node;
    return {
        top: yogaNode?.getComputedTop() || 0,
        right: yogaNode?.getComputedRight() || 0,
        bottom: yogaNode?.getComputedBottom() || 0,
        left: yogaNode?.getComputedLeft() || 0
    };
};
const DEFAULT_DIMENSION = {
    width: 0,
    height: 0
};





 const getDimension = (node)=>{
    const { yogaNode } = node;
    if (!yogaNode) return DEFAULT_DIMENSION;
    return {
        width: yogaNode.getComputedWidth(),
        height: yogaNode.getComputedHeight()
    };
};
const getComputedBorder = (yogaNode, edge)=>yogaNode ? yogaNode.getComputedBorder(edge) : 0;





 const getBorderWidth = (node)=>{
    const { yogaNode } = node;
    return {
        borderTopWidth: getComputedBorder(yogaNode, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top),
        borderRightWidth: getComputedBorder(yogaNode, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right),
        borderBottomWidth: getComputedBorder(yogaNode, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom),
        borderLeftWidth: getComputedBorder(yogaNode, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left)
    };
};





 const setDisplay = (value)=>(node)=>{
        const { yogaNode } = node;
        if (yogaNode) {
            yogaNode.setDisplay(value === 'none' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Display"].None : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Display"].Flex);
        }
        return node;
    };
const OVERFLOW = {
    hidden: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overflow"].Hidden,
    scroll: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overflow"].Scroll
};





 const setOverflow = (value)=>(node)=>{
        const { yogaNode } = node;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(value) && yogaNode) {
            const overflow = OVERFLOW[value] || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overflow"].Visible;
            yogaNode.setOverflow(overflow);
        }
        return node;
    };
const FLEX_WRAP = {
    wrap: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wrap"].Wrap,
    'wrap-reverse': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wrap"].WrapReverse
};





 const setFlexWrap = (value)=>(node)=>{
        const { yogaNode } = node;
        if (yogaNode) {
            const flexWrap = FLEX_WRAP[value] || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wrap"].NoWrap;
            yogaNode.setFlexWrap(flexWrap);
        }
        return node;
    };






 const setYogaValue = (attr, edge)=>(value)=>(node)=>{
            const { yogaNode } = node;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(value) && yogaNode) {
                const hasEdge = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(edge);
                const fixedMethod = `set${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["upperFirst"])(attr)}`;
                const autoMethod = `${fixedMethod}Auto`;
                const percentMethod = `${fixedMethod}Percent`;
                const percent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(value);
                if (percent && !yogaNode[percentMethod]) {
                    throw new Error(`You can't pass percentage values to ${attr} property`);
                }
                if (percent) {
                    if (hasEdge) {
                        yogaNode[percentMethod]?.(edge, percent.value);
                    } else {
                        yogaNode[percentMethod]?.(percent.value);
                    }
                } else if (value === 'auto') {
                    if (hasEdge) {
                        yogaNode[autoMethod]?.(edge);
                    } else {
                        yogaNode[autoMethod]?.();
                    }
                } else if (hasEdge) {
                    yogaNode[fixedMethod]?.(edge, value);
                } else {
                    yogaNode[fixedMethod]?.(value);
                }
            }
            return node;
        };





 const setFlexGrow = (value)=>(node)=>{
        return setYogaValue('flexGrow')(value || 0)(node);
    };






 const setFlexBasis = setYogaValue('flexBasis');
const ALIGN = {
    'flex-start': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].FlexStart,
    center: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].Center,
    'flex-end': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].FlexEnd,
    stretch: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].Stretch,
    baseline: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].Baseline,
    'space-between': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].SpaceBetween,
    'space-around': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].SpaceAround,
    'space-evenly': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].SpaceEvenly
};







 const setAlign = (attr)=>(value)=>(node)=>{
            const { yogaNode } = node;
            const defaultValue = attr === 'items' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].Stretch : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Align"].Auto;
            if (yogaNode) {
                const align = ALIGN[value] || defaultValue;
                yogaNode[`setAlign${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["upperFirst"])(attr)}`](align);
            }
            return node;
        };






 const setAlignSelf = setAlign('self');






 const setAlignItems = setAlign('items');





 const setFlexShrink = (value)=>(node)=>{
        return setYogaValue('flexShrink')(value || 1)(node);
    };





 const setAspectRatio = (value)=>(node)=>{
        const { yogaNode } = node;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(value) && yogaNode) {
            yogaNode.setAspectRatio(value);
        }
        return node;
    };






 const setAlignContent = setAlign('content');
const POSITION = {
    absolute: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PositionType"].Absolute,
    relative: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PositionType"].Relative,
    static: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PositionType"].Static
};





 const setPositionType = (value)=>(node)=>{
        const { yogaNode } = node;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(value) && yogaNode) {
            yogaNode.setPositionType(POSITION[value]);
        }
        return node;
    };
const FLEX_DIRECTIONS = {
    row: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlexDirection"].Row,
    'row-reverse': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlexDirection"].RowReverse,
    'column-reverse': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlexDirection"].ColumnReverse
};





 const setFlexDirection = (value)=>(node)=>{
        const { yogaNode } = node;
        if (yogaNode) {
            const flexDirection = FLEX_DIRECTIONS[value] || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlexDirection"].Column;
            yogaNode.setFlexDirection(flexDirection);
        }
        return node;
    };
const JUSTIFY_CONTENT = {
    center: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Justify"].Center,
    'flex-end': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Justify"].FlexEnd,
    'space-between': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Justify"].SpaceBetween,
    'space-around': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Justify"].SpaceAround,
    'space-evenly': __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Justify"].SpaceEvenly
};





 const setJustifyContent = (value)=>(node)=>{
        const { yogaNode } = node;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(value) && yogaNode) {
            const justifyContent = JUSTIFY_CONTENT[value] || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Justify"].FlexStart;
            yogaNode.setJustifyContent(justifyContent);
        }
        return node;
    };






 const setMarginTop = setYogaValue('margin', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top);






 const setMarginRight = setYogaValue('margin', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right);






 const setMarginBottom = setYogaValue('margin', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom);






 const setMarginLeft = setYogaValue('margin', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left);






 const setPaddingTop = setYogaValue('padding', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top);






 const setPaddingRight = setYogaValue('padding', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right);






 const setPaddingBottom = setYogaValue('padding', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom);






 const setPaddingLeft = setYogaValue('padding', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left);






 const setBorderTop = setYogaValue('border', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top);






 const setBorderRight = setYogaValue('border', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right);






 const setBorderBottom = setYogaValue('border', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom);






 const setBorderLeft = setYogaValue('border', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left);






 const setPositionTop = setYogaValue('position', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Top);






 const setPositionRight = setYogaValue('position', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Right);






 const setPositionBottom = setYogaValue('position', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Bottom);






 const setPositionLeft = setYogaValue('position', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge"].Left);






 const setWidth = setYogaValue('width');






 const setMinWidth = setYogaValue('minWidth');






 const setMaxWidth = setYogaValue('maxWidth');






 const setHeight = setYogaValue('height');






 const setMinHeight = setYogaValue('minHeight');






 const setMaxHeight = setYogaValue('maxHeight');





 const setRowGap = setYogaValue('gap', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Gutter"].Row);





 const setColumnGap = setYogaValue('gap', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Gutter"].Column);
const getAspectRatio = (viewbox)=>{
    if (!viewbox) return null;
    if (typeof viewbox === 'string') return null;
    return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};






 const measureCanvas$1 = (page, node)=>(width, widthMode, height, heightMode)=>{
        const aspectRatio = getAspectRatio(node.props.viewBox) || 1;
        if (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Exactly || widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].AtMost) {
            return {
                width,
                height: width / aspectRatio
            };
        }
        if (heightMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Exactly) {
            return {
                width: height * aspectRatio
            };
        }
        return {};
    };





 const linesWidth = (node)=>{
    if (!node.lines) return 0;
    return Math.max(0, ...node.lines.map((line)=>line.xAdvance));
};





 const linesHeight = (node)=>{
    if (!node.lines) return -1;
    return node.lines.reduce((acc, line)=>acc + line.box.height, 0);
};
const ALIGNMENT_FACTORS = {
    center: 0.5,
    right: 1
};







 const measureText = (page, node, fontStore)=>(width, widthMode, height)=>{
        if (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Exactly) {
            if (!node.lines) node.lines = layoutText(node, width, height, fontStore);
            return {
                height: linesHeight(node),
                width
            };
        }
        if (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].AtMost) {
            const alignFactor = ALIGNMENT_FACTORS[node.style?.textAlign] || 0;
            if (!node.lines) {
                node.lines = layoutText(node, width, height, fontStore);
                node.alignOffset = (width - linesWidth(node)) * alignFactor; 
            }
            return {
                height: linesHeight(node),
                width: Math.min(width, linesWidth(node))
            };
        }
        return {};
    };





 const getRatio = (node)=>{
    return node.image?.data ? node.image.width / node.image.height : 1;
};





 const isHeightAuto = (page)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(page.box?.height);
const SAFETY_HEIGHT$1 = 10;






 const measureImage = (page, node)=>(width, widthMode, height, heightMode)=>{
        const imageRatio = getRatio(node);
        const imageMargin = getMargin(node);
        const pagePadding = getPadding(page);
        
        const pageArea = isHeightAuto(page) ? Infinity : (page.box?.height || 0) - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT$1;
        
        if (!node.image) return {
            width: 0,
            height: 0
        };
        if (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Exactly && heightMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Undefined) {
            const scaledHeight = width / imageRatio;
            return {
                height: Math.min(pageArea, scaledHeight)
            };
        }
        if (heightMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Exactly && (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].AtMost || widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Undefined)) {
            return {
                width: Math.min(height * imageRatio, width)
            };
        }
        if (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].Exactly && heightMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].AtMost) {
            const scaledHeight = width / imageRatio;
            return {
                height: Math.min(height, pageArea, scaledHeight)
            };
        }
        if (widthMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].AtMost && heightMode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$yoga$2d$layout$2f$dist$2f$src$2f$generated$2f$YGEnums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureMode"].AtMost) {
            if (imageRatio > 1) {
                return {
                    width,
                    height: Math.min(width / imageRatio, height)
                };
            }
            return {
                height,
                width: Math.min(height * imageRatio, width)
            };
        }
        return {
            height,
            width
        };
    };
const SAFETY_HEIGHT = 10;
const getMax = (values)=>Math.max(-Infinity, ...values);



 const measureCtx = ()=>{
    const ctx = {};
    const points = [];
    const nil = ()=>ctx;
    const addPoint = (x, y)=>points.push([
            x,
            y
        ]);
    const moveTo = (x, y)=>{
        addPoint(x, y);
        return ctx;
    };
    const rect = (x, y, w, h)=>{
        addPoint(x, y);
        addPoint(x + w, y);
        addPoint(x, y + h);
        addPoint(x + w, y + h);
        return ctx;
    };
    const ellipse = (x, y, rx, ry)=>{
        ry = ry || rx;
        addPoint(x - rx, y - ry);
        addPoint(x + rx, y - ry);
        addPoint(x + rx, y + ry);
        addPoint(x - rx, y + ry);
        return ctx;
    };
    const polygon = (...pts)=>{
        points.push(...pts);
        return ctx;
    };
    
    ctx.rect = rect;
    ctx.moveTo = moveTo;
    ctx.lineTo = moveTo;
    ctx.circle = ellipse;
    ctx.polygon = polygon;
    ctx.ellipse = ellipse;
    ctx.roundedRect = rect;
    
    ctx.text = nil;
    ctx.path = nil;
    ctx.lineWidth = nil;
    ctx.bezierCurveTo = nil;
    ctx.quadraticCurveTo = nil;
    ctx.scale = nil;
    ctx.rotate = nil;
    ctx.translate = nil;
    
    ctx.dash = nil;
    ctx.clip = nil;
    ctx.save = nil;
    ctx.fill = nil;
    ctx.font = nil;
    ctx.stroke = nil;
    ctx.lineCap = nil;
    ctx.opacity = nil;
    ctx.restore = nil;
    ctx.lineJoin = nil;
    ctx.fontSize = nil;
    ctx.fillColor = nil;
    ctx.miterLimit = nil;
    ctx.strokeColor = nil;
    ctx.fillOpacity = nil;
    ctx.strokeOpacity = nil;
    ctx.linearGradient = nil;
    ctx.radialGradient = nil;
    ctx.getWidth = ()=>getMax(points.map((p)=>p[0]));
    ctx.getHeight = ()=>getMax(points.map((p)=>p[1]));
    return ctx;
};



 





 const measureCanvas = (page, node)=>()=>{
        const imageMargin = getMargin(node);
        const pagePadding = getPadding(page);
        
        const pageArea = isHeightAuto(page) ? Infinity : (page.box?.height || 0) - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT;
        const ctx = measureCtx();
        node.props.paint(ctx);
        const width = ctx.getWidth();
        const height = Math.min(pageArea, ctx.getHeight());
        return {
            width,
            height
        };
    };
const isType$1 = (type)=>(node)=>node.type === type;
const isSvg = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Svg"]);
const isText$2 = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"]);
const isNote = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Note"]);
const isPage = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Page"]);
const isImage = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"]);
const isCanvas = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Canvas"]);
const isTextInstance$1 = isType$1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInstance"]);
const setNodeHeight = (node)=>{
    const value = isPage(node) ? node.box?.height : node.style?.height;
    return setHeight(value);
};




 const setYogaValues = (node)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(setNodeHeight(node), setWidth(node.style.width), setMinWidth(node.style.minWidth), setMaxWidth(node.style.maxWidth), setMinHeight(node.style.minHeight), setMaxHeight(node.style.maxHeight), setMarginTop(node.style.marginTop), setMarginRight(node.style.marginRight), setMarginBottom(node.style.marginBottom), setMarginLeft(node.style.marginLeft), setPaddingTop(node.style.paddingTop), setPaddingRight(node.style.paddingRight), setPaddingBottom(node.style.paddingBottom), setPaddingLeft(node.style.paddingLeft), setPositionType(node.style.position), setPositionTop(node.style.top), setPositionRight(node.style.right), setPositionBottom(node.style.bottom), setPositionLeft(node.style.left), setBorderTop(node.style.borderTopWidth), setBorderRight(node.style.borderRightWidth), setBorderBottom(node.style.borderBottomWidth), setBorderLeft(node.style.borderLeftWidth), setDisplay(node.style.display), setFlexDirection(node.style.flexDirection), setAlignSelf(node.style.alignSelf), setAlignContent(node.style.alignContent), setAlignItems(node.style.alignItems), setJustifyContent(node.style.justifyContent), setFlexWrap(node.style.flexWrap), setOverflow(node.style.overflow), setAspectRatio(node.style.aspectRatio), setFlexBasis(node.style.flexBasis), setFlexGrow(node.style.flexGrow), setFlexShrink(node.style.flexShrink), setRowGap(node.style.rowGap), setColumnGap(node.style.columnGap))(node);
};





 const insertYogaNodes = (parent)=>(child)=>{
        parent.insertChild(child.yogaNode, parent.getChildCount());
        return child;
    };
const setMeasureFunc = (node, page, fontStore)=>{
    const { yogaNode } = node;
    if (isText$2(node)) {
        yogaNode.setMeasureFunc(measureText(page, node, fontStore));
    }
    if (isImage(node)) {
        yogaNode.setMeasureFunc(measureImage(page, node));
    }
    if (isCanvas(node)) {
        yogaNode.setMeasureFunc(measureCanvas(page, node));
    }
    if (isSvg(node)) {
        yogaNode.setMeasureFunc(measureCanvas$1(page, node));
    }
    return node;
};
const isLayoutElement = (node)=>!isText$2(node) && !isNote(node) && !isSvg(node);




 




 const createYogaNodes = (page, fontStore, yoga)=>(node)=>{
        const yogaNode = yoga.node.create();
        const result = Object.assign({}, node, {
            yogaNode
        });
        setYogaValues(result);
        if (isLayoutElement(node) && node.children) {
            const resolveChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(insertYogaNodes(yogaNode), createYogaNodes(page, fontStore, yoga));
            result.children = node.children.map(resolveChild);
        }
        setMeasureFunc(result, page, fontStore);
        return result;
    };





 const calculateLayout = (page)=>{
    page.yogaNode.calculateLayout();
    return page;
};





 const persistDimensions = (node)=>{
    if (isTextInstance$1(node)) return node;
    const box = Object.assign(getPadding(node), getMargin(node), getBorderWidth(node), getPosition(node), getDimension(node));
    const newNode = Object.assign({}, node, {
        box
    });
    if (!node.children) return newNode;
    const children = node.children.map(persistDimensions);
    return Object.assign({}, newNode, {
        children
    });
};





 const destroyYogaNodes = (node)=>{
    const newNode = Object.assign({}, node);
    delete newNode.yogaNode;
    if (!node.children) return newNode;
    const children = node.children.map(destroyYogaNodes);
    return Object.assign({}, newNode, {
        children
    });
};





 const freeYogaNodes = (node)=>{
    if (node.yogaNode) node.yogaNode.freeRecursive();
    return node;
};







 const resolvePageDimensions = (page, fontStore, yoga)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(page)) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(destroyYogaNodes, freeYogaNodes, persistDimensions, calculateLayout, createYogaNodes(page, fontStore, yoga))(page);
};






 const resolveDimensions = (node, fontStore)=>{
    if (!node.children) return node;
    const resolveChild = (child)=>resolvePageDimensions(child, fontStore, node.yoga);
    const children = node.children.map(resolveChild);
    return Object.assign({}, node, {
        children
    });
};
const isText$1 = (node)=>node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"];

const SAFETY_THRESHOLD = 0.001;
const assingChildren = (children, node)=>Object.assign({}, node, {
        children
    });
const getTop = (node)=>node.box?.top || 0;
const allFixed = (nodes)=>nodes.every(isFixed);
const isDynamic = (node)=>node.props && 'render' in node.props;
const relayoutPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(resolveTextLayout, resolvePageDimensions, resolveInheritance, resolvePageStyles);
const warnUnavailableSpace = (node)=>{
    console.warn(`Node of type ${node.type} can't wrap between pages and it's bigger than available page height`);
};
const splitNodes = (height, contentArea, nodes)=>{
    const currentChildren = [];
    const nextChildren = [];
    for(let i = 0; i < nodes.length; i += 1){
        const child = nodes[i];
        const futureNodes = nodes.slice(i + 1);
        const futureFixedNodes = futureNodes.filter(isFixed);
        const nodeTop = getTop(child);
        const nodeHeight = child.box.height;
        const isOutside = height <= nodeTop;
        const shouldBreak$1 = shouldBreak(child, futureNodes, height, currentChildren);
        const shouldSplit = height + SAFETY_THRESHOLD < nodeTop + nodeHeight;
        const canWrap = getWrap(child);
        const fitsInsidePage = nodeHeight <= contentArea;
        if (isFixed(child)) {
            nextChildren.push(child);
            currentChildren.push(child);
            continue;
        }
        if (isOutside) {
            const box = Object.assign({}, child.box, {
                top: child.box.top - height
            });
            const next = Object.assign({}, child, {
                box
            });
            nextChildren.push(next);
            continue;
        }
        if (!fitsInsidePage && !canWrap) {
            currentChildren.push(child);
            nextChildren.push(...futureNodes);
            warnUnavailableSpace(child);
            break;
        }
        if (shouldBreak$1) {
            const box = Object.assign({}, child.box, {
                top: child.box.top - height
            });
            const props = Object.assign({}, child.props, {
                wrap: true,
                break: false
            });
            const next = Object.assign({}, child, {
                box,
                props
            });
            currentChildren.push(...futureFixedNodes);
            nextChildren.push(next, ...futureNodes);
            break;
        }
        if (shouldSplit) {
            const [currentChild, nextChild] = split(child, height, contentArea);
            
            if (child.children.length > 0 && currentChild.children.length === 0) {
                
                if (currentChildren.length === 0) {
                    currentChildren.push(child, ...futureFixedNodes);
                    nextChildren.push(...futureNodes);
                } else {
                    const box = Object.assign({}, child.box, {
                        top: child.box.top - height
                    });
                    const next = Object.assign({}, child, {
                        box
                    });
                    currentChildren.push(...futureFixedNodes);
                    nextChildren.push(next, ...futureNodes);
                }
                break;
            }
            if (currentChild) currentChildren.push(currentChild);
            if (nextChild) nextChildren.push(nextChild);
            continue;
        }
        currentChildren.push(child);
    }
    return [
        currentChildren,
        nextChildren
    ];
};
const splitChildren = (height, contentArea, node)=>{
    const children = node.children || [];
    const availableHeight = height - getTop(node);
    return splitNodes(availableHeight, contentArea, children);
};
const splitView = (node, height, contentArea)=>{
    const [currentNode, nextNode] = splitNode(node, height);
    const [currentChilds, nextChildren] = splitChildren(height, contentArea, node);
    return [
        assingChildren(currentChilds, currentNode),
        assingChildren(nextChildren, nextNode)
    ];
};
const split = (node, height, contentArea)=>isText$1(node) ? splitText(node, height) : splitView(node, height, contentArea);
const shouldResolveDynamicNodes = (node)=>{
    const children = node.children || [];
    return isDynamic(node) || children.some(shouldResolveDynamicNodes);
};
const resolveDynamicNodes = (props, node)=>{
    const isNodeDynamic = isDynamic(node);
    
    const resolveChildren = (children = [])=>{
        if (isNodeDynamic) {
            const res = node.props.render(props);
            return createInstances(res).filter(Boolean)
            .map((n)=>resolveDynamicNodes(props, n));
        }
        return children.map((c)=>resolveDynamicNodes(props, c));
    };
    
    const resetHeight = isNodeDynamic && isText$1(node);
    const box = resetHeight ? {
        ...node.box,
        height: 0
    } : node.box;
    const children = resolveChildren(node.children);
    
    const lines = isNodeDynamic ? null : node.lines;
    return Object.assign({}, node, {
        box,
        lines,
        children
    });
};
const resolveDynamicPage = (props, page, fontStore, yoga)=>{
    if (shouldResolveDynamicNodes(page)) {
        const resolvedPage = resolveDynamicNodes(props, page);
        return relayoutPage(resolvedPage, fontStore, yoga);
    }
    return page;
};
const splitPage = (page, pageNumber, fontStore, yoga)=>{
    const wrapArea = getWrapArea(page);
    const contentArea = getContentArea(page);
    const dynamicPage = resolveDynamicPage({
        pageNumber
    }, page, fontStore, yoga);
    const height = page.style.height;
    const [currentChilds, nextChilds] = splitNodes(wrapArea, contentArea, dynamicPage.children);
    const relayout = (node)=>
        relayoutPage(node, fontStore, yoga);
    const currentBox = {
        ...page.box,
        height
    };
    const currentPage = relayout(Object.assign({}, page, {
        box: currentBox,
        children: currentChilds
    }));
    if (nextChilds.length === 0 || allFixed(nextChilds)) return [
        currentPage,
        null
    ];
    const nextBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["omit"])('height', page.box);
    const nextProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["omit"])('bookmark', page.props);
    const nextPage = relayout(Object.assign({}, page, {
        props: nextProps,
        box: nextBox,
        children: nextChilds
    }));
    return [
        currentPage,
        nextPage
    ];
};
const resolvePageIndices = (fontStore, yoga, page, pageNumber, pages)=>{
    const totalPages = pages.length;
    const props = {
        totalPages,
        pageNumber: pageNumber + 1,
        subPageNumber: page.subPageNumber + 1,
        subPageTotalPages: page.subPageTotalPages
    };
    return resolveDynamicPage(props, page, fontStore, yoga);
};
const assocSubPageData = (subpages)=>{
    return subpages.map((page, i)=>({
            ...page,
            subPageNumber: i,
            subPageTotalPages: subpages.length
        }));
};
const dissocSubPageData = (page)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["omit"])([
        'subPageNumber',
        'subPageTotalPages'
    ], page);
};
const paginate = (page, pageNumber, fontStore, yoga)=>{
    if (!page) return [];
    if (page.props?.wrap === false) return [
        page
    ];
    let splittedPage = splitPage(page, pageNumber, fontStore, yoga);
    const pages = [
        splittedPage[0]
    ];
    let nextPage = splittedPage[1];
    while(nextPage !== null){
        splittedPage = splitPage(nextPage, pageNumber + pages.length, fontStore, yoga);
        pages.push(splittedPage[0]);
        nextPage = splittedPage[1];
    }
    return pages;
};







 const resolvePagination = (root, fontStore)=>{
    let pages = [];
    let pageNumber = 1;
    for(let i = 0; i < root.children.length; i += 1){
        const page = root.children[i];
        let subpages = paginate(page, pageNumber, fontStore, root.yoga);
        subpages = assocSubPageData(subpages);
        pageNumber += subpages.length;
        pages = pages.concat(subpages);
    }
    pages = pages.map((...args)=>dissocSubPageData(resolvePageIndices(fontStore, root.yoga, ...args)));
    return assingChildren(pages, root);
};





 const resolvePageHorizontalPadding = (container)=>(value)=>{
        const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(value);
        const width = container.width;
        return match ? match.percent * width : value;
    };





 const resolvePageVerticalPadding = (container)=>(value)=>{
        const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(value);
        const height = container.height;
        return match ? match.percent * height : value;
    };





 const resolvePagePaddings = (page)=>{
    const container = page.style;
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evolve"])({
        paddingTop: resolvePageVerticalPadding(container),
        paddingLeft: resolvePageHorizontalPadding(container),
        paddingRight: resolvePageHorizontalPadding(container),
        paddingBottom: resolvePageVerticalPadding(container)
    }, page.style);
    return Object.assign({}, page, {
        style
    });
};







 const resolvePagesPaddings = (root)=>{
    if (!root.children) return root;
    const children = root.children.map(resolvePagePaddings);
    return Object.assign({}, root, {
        children
    });
};
const resolveRadius = (box)=>(value)=>{
        if (!value) return undefined;
        const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(value);
        return match ? match.percent * Math.min(box.width, box.height) : value;
    };





 const resolvePercentRadius = (node)=>{
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evolve"])({
        borderTopLeftRadius: resolveRadius(node.box),
        borderTopRightRadius: resolveRadius(node.box),
        borderBottomRightRadius: resolveRadius(node.box),
        borderBottomLeftRadius: resolveRadius(node.box)
    }, node.style || {});
    const newNode = Object.assign({}, node, {
        style
    });
    if (!node.children) return newNode;
    const children = node.children.map(resolvePercentRadius);
    return Object.assign({}, newNode, {
        children
    });
};





 const transformHeight = (pageArea, height)=>{
    const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPercent"])(height);
    return match ? match.percent * pageArea : height;
};





 const getPageArea = (page)=>{
    const pageHeight = page.style.height;
    const pagePaddingTop = page.style?.paddingTop || 0;
    const pagePaddingBottom = page.style?.paddingBottom || 0;
    return pageHeight - pagePaddingTop - pagePaddingBottom;
};






 const resolveNodePercentHeight = (page, node)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(page.style?.height)) return node;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNil"])(node.style?.height)) return node;
    const pageArea = getPageArea(page);
    const height = transformHeight(pageArea, node.style.height);
    const style = Object.assign({}, node.style, {
        height
    });
    return Object.assign({}, node, {
        style
    });
};





 const resolvePagePercentHeight = (page)=>{
    if (!page.children) return page;
    const resolveChild = (child)=>resolveNodePercentHeight(page, child);
    const children = page.children.map(resolveChild);
    return Object.assign({}, page, {
        children
    });
};






 const resolvePercentHeight = (root)=>{
    if (!root.children) return root;
    const children = root.children.map(resolvePagePercentHeight);
    return Object.assign({}, root, {
        children
    });
};
const isType = (type)=>(node)=>node.type === type;
const isLink = isType(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"]);
const isText = isType(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"]);
const isTextInstance = isType(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInstance"]);





 const hasRenderProp = (node)=>'render' in node.props;





 const isTextType = (node)=>isText(node) || isTextInstance(node);





 const isTextLink = (node)=>{
    const children = node.children || [];
    
    if (children.every(isTextInstance)) return true;
    
    if (children.every(isText)) return false;
    return children.every(isTextType);
};





 const wrapText = (node)=>{
    const textElement = {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"],
        props: {},
        style: {},
        box: {},
        children: node.children
    };
    return Object.assign({}, node, {
        children: [
            textElement
        ]
    });
};
const transformLink = (node)=>{
    if (!isLink(node)) return node;
    
    
    if (hasRenderProp(node)) return Object.assign({}, node, {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"]
    });
    
    
    if (isTextLink(node)) return wrapText(node);
    return node;
};





 const resolveLinkSubstitution = (node)=>{
    if (!node.children) return node;
    const resolveChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compose"])(transformLink, resolveLinkSubstitution);
    const children = node.children.map(resolveChild);
    return Object.assign({}, node, {
        children
    });
};
const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$react$2d$pdf$2f$fns$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asyncCompose"])(resolveZIndex, resolveOrigin, resolveAssets, resolvePagination, resolveTextLayout, resolvePercentRadius, resolveDimensions, resolveSvg, resolveAssets, resolveInheritance, resolvePercentHeight, resolvePagesPaddings, resolveStyles, resolveLinkSubstitution, resolveBookmarks, resolvePageSizes, resolveYoga);
;
}),
]);

