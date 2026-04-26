(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react-day-picker/dist/index.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "Caption",
    ()=>Caption,
    "CaptionDropdowns",
    ()=>CaptionDropdowns,
    "CaptionLabel",
    ()=>CaptionLabel,
    "CaptionNavigation",
    ()=>CaptionNavigation,
    "Day",
    ()=>Day,
    "DayContent",
    ()=>DayContent,
    "DayPicker",
    ()=>DayPicker,
    "DayPickerContext",
    ()=>DayPickerContext,
    "DayPickerProvider",
    ()=>DayPickerProvider,
    "Dropdown",
    ()=>Dropdown,
    "FocusContext",
    ()=>FocusContext,
    "FocusProvider",
    ()=>FocusProvider,
    "Footer",
    ()=>Footer,
    "Head",
    ()=>Head,
    "HeadRow",
    ()=>HeadRow,
    "IconDropdown",
    ()=>IconDropdown,
    "IconLeft",
    ()=>IconLeft,
    "IconRight",
    ()=>IconRight,
    "InternalModifier",
    ()=>InternalModifier,
    "Months",
    ()=>Months,
    "NavigationContext",
    ()=>NavigationContext,
    "NavigationProvider",
    ()=>NavigationProvider,
    "RootProvider",
    ()=>RootProvider,
    "Row",
    ()=>Row,
    "SelectMultipleContext",
    ()=>SelectMultipleContext,
    "SelectMultipleProvider",
    ()=>SelectMultipleProvider,
    "SelectMultipleProviderInternal",
    ()=>SelectMultipleProviderInternal,
    "SelectRangeContext",
    ()=>SelectRangeContext,
    "SelectRangeProvider",
    ()=>SelectRangeProvider,
    "SelectRangeProviderInternal",
    ()=>SelectRangeProviderInternal,
    "SelectSingleContext",
    ()=>SelectSingleContext,
    "SelectSingleProvider",
    ()=>SelectSingleProvider,
    "SelectSingleProviderInternal",
    ()=>SelectSingleProviderInternal,
    "WeekNumber",
    ()=>WeekNumber,
    "addToRange",
    ()=>addToRange,
    "isDateAfterType",
    ()=>isDateAfterType,
    "isDateBeforeType",
    ()=>isDateBeforeType,
    "isDateInterval",
    ()=>isDateInterval,
    "isDateRange",
    ()=>isDateRange,
    "isDayOfWeekType",
    ()=>isDayOfWeekType,
    "isDayPickerDefault",
    ()=>isDayPickerDefault,
    "isDayPickerMultiple",
    ()=>isDayPickerMultiple,
    "isDayPickerRange",
    ()=>isDayPickerRange,
    "isDayPickerSingle",
    ()=>isDayPickerSingle,
    "isMatch",
    ()=>isMatch,
    "useActiveModifiers",
    ()=>useActiveModifiers,
    "useDayPicker",
    ()=>useDayPicker,
    "useDayRender",
    ()=>useDayRender,
    "useFocusContext",
    ()=>useFocusContext,
    "useInput",
    ()=>useInput,
    "useNavigation",
    ()=>useNavigation,
    "useSelectMultiple",
    ()=>useSelectMultiple,
    "useSelectRange",
    ()=>useSelectRange,
    "useSelectSingle",
    ()=>useSelectSingle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfMonth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/endOfMonth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfDay.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isSameYear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/setMonth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/setYear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfYear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/differenceInCalendarMonths.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/addMonths.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isSameMonth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isBefore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isBefore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeek.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeek.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/addDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isSameDay.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isAfter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/subDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/differenceInCalendarDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isDate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isDate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$max$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/max.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$min$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/min.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addWeeks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/addWeeks.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/addYears.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/endOfISOWeek.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/endOfWeek.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getUnixTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getUnixTime.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getISOWeek.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeek.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeeksInMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeeksInMonth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$parse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/parse.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US.mjs [app-client] (ecmascript)");
;
;
;
;













  var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
 function isDayPickerMultiple(props) {
    return props.mode === 'multiple';
}
 function isDayPickerRange(props) {
    return props.mode === 'range';
}
 function isDayPickerSingle(props) {
    return props.mode === 'single';
}


 var defaultClassNames = {
    root: 'rdp',
    multiple_months: 'rdp-multiple_months',
    with_weeknumber: 'rdp-with_weeknumber',
    vhidden: 'rdp-vhidden',
    button_reset: 'rdp-button_reset',
    button: 'rdp-button',
    caption: 'rdp-caption',
    caption_start: 'rdp-caption_start',
    caption_end: 'rdp-caption_end',
    caption_between: 'rdp-caption_between',
    caption_label: 'rdp-caption_label',
    caption_dropdowns: 'rdp-caption_dropdowns',
    dropdown: 'rdp-dropdown',
    dropdown_month: 'rdp-dropdown_month',
    dropdown_year: 'rdp-dropdown_year',
    dropdown_icon: 'rdp-dropdown_icon',
    months: 'rdp-months',
    month: 'rdp-month',
    table: 'rdp-table',
    tbody: 'rdp-tbody',
    tfoot: 'rdp-tfoot',
    head: 'rdp-head',
    head_row: 'rdp-head_row',
    head_cell: 'rdp-head_cell',
    nav: 'rdp-nav',
    nav_button: 'rdp-nav_button',
    nav_button_previous: 'rdp-nav_button_previous',
    nav_button_next: 'rdp-nav_button_next',
    nav_icon: 'rdp-nav_icon',
    row: 'rdp-row',
    weeknumber: 'rdp-weeknumber',
    cell: 'rdp-cell',
    day: 'rdp-day',
    day_today: 'rdp-day_today',
    day_outside: 'rdp-day_outside',
    day_selected: 'rdp-day_selected',
    day_disabled: 'rdp-day_disabled',
    day_hidden: 'rdp-day_hidden',
    day_range_start: 'rdp-day_range_start',
    day_range_end: 'rdp-day_range_end',
    day_range_middle: 'rdp-day_range_middle'
};


 function formatCaption(month, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(month, 'LLLL y', options);
}


 function formatDay(day, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, 'd', options);
}


 function formatMonthCaption(month, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(month, 'LLLL', options);
}


 function formatWeekNumber(weekNumber) {
    return "".concat(weekNumber);
}


 function formatWeekdayName(weekday, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(weekday, 'cccccc', options);
}


 function formatYearCaption(year, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(year, 'yyyy', options);
}
var formatters =  Object.freeze({
    __proto__: null,
    formatCaption: formatCaption,
    formatDay: formatDay,
    formatMonthCaption: formatMonthCaption,
    formatWeekNumber: formatWeekNumber,
    formatWeekdayName: formatWeekdayName,
    formatYearCaption: formatYearCaption
});


 var labelDay = function(day, activeModifiers, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, 'do MMMM (EEEE)', options);
};


 var labelMonthDropdown = function() {
    return 'Month: ';
};


 var labelNext = function() {
    return 'Go to next month';
};


 var labelPrevious = function() {
    return 'Go to previous month';
};


 var labelWeekday = function(day, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, 'cccc', options);
};


 var labelWeekNumber = function(n) {
    return "Week n. ".concat(n);
};


 var labelYearDropdown = function() {
    return 'Year: ';
};
var labels =  Object.freeze({
    __proto__: null,
    labelDay: labelDay,
    labelMonthDropdown: labelMonthDropdown,
    labelNext: labelNext,
    labelPrevious: labelPrevious,
    labelWeekNumber: labelWeekNumber,
    labelWeekday: labelWeekday,
    labelYearDropdown: labelYearDropdown
});



 function getDefaultContextValues() {
    var captionLayout = 'buttons';
    var classNames = defaultClassNames;
    var locale = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enUS"];
    var modifiersClassNames = {};
    var modifiers = {};
    var numberOfMonths = 1;
    var styles = {};
    var today = new Date();
    return {
        captionLayout: captionLayout,
        classNames: classNames,
        formatters: formatters,
        labels: labels,
        locale: locale,
        modifiersClassNames: modifiersClassNames,
        modifiers: modifiers,
        numberOfMonths: numberOfMonths,
        styles: styles,
        today: today,
        mode: 'default'
    };
}
 function parseFromToProps(props) {
    var fromYear = props.fromYear, toYear = props.toYear, fromMonth = props.fromMonth, toMonth = props.toMonth;
    var fromDate = props.fromDate, toDate = props.toDate;
    if (fromMonth) {
        fromDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(fromMonth);
    } else if (fromYear) {
        fromDate = new Date(fromYear, 0, 1);
    }
    if (toMonth) {
        toDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfMonth"])(toMonth);
    } else if (toYear) {
        toDate = new Date(toYear, 11, 31);
    }
    return {
        fromDate: fromDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(fromDate) : undefined,
        toDate: toDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(toDate) : undefined
    };
}






 var DayPickerContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);



 function DayPickerProvider(props) {
    var _a;
    var initialProps = props.initialProps;
    var defaultContextValues = getDefaultContextValues();
    var _b = parseFromToProps(initialProps), fromDate = _b.fromDate, toDate = _b.toDate;
    var captionLayout = (_a = initialProps.captionLayout) !== null && _a !== void 0 ? _a : defaultContextValues.captionLayout;
    if (captionLayout !== 'buttons' && (!fromDate || !toDate)) {
        
        captionLayout = 'buttons';
    }
    var onSelect;
    if (isDayPickerSingle(initialProps) || isDayPickerMultiple(initialProps) || isDayPickerRange(initialProps)) {
        onSelect = initialProps.onSelect;
    }
    var value = __assign(__assign(__assign({}, defaultContextValues), initialProps), {
        captionLayout: captionLayout,
        classNames: __assign(__assign({}, defaultContextValues.classNames), initialProps.classNames),
        components: __assign({}, initialProps.components),
        formatters: __assign(__assign({}, defaultContextValues.formatters), initialProps.formatters),
        fromDate: fromDate,
        labels: __assign(__assign({}, defaultContextValues.labels), initialProps.labels),
        mode: initialProps.mode || defaultContextValues.mode,
        modifiers: __assign(__assign({}, defaultContextValues.modifiers), initialProps.modifiers),
        modifiersClassNames: __assign(__assign({}, defaultContextValues.modifiersClassNames), initialProps.modifiersClassNames),
        onSelect: onSelect,
        styles: __assign(__assign({}, defaultContextValues.styles), initialProps.styles),
        toDate: toDate
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DayPickerContext.Provider, {
        value: value,
        children: props.children
    });
}





 function useDayPicker() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DayPickerContext);
    if (!context) {
        throw new Error("useDayPicker must be used within a DayPickerProvider.");
    }
    return context;
}
 function CaptionLabel(props) {
    var _a = useDayPicker(), locale = _a.locale, classNames = _a.classNames, styles = _a.styles, formatCaption = _a.formatters.formatCaption;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: classNames.caption_label,
        style: styles.caption_label,
        "aria-live": "polite",
        role: "presentation",
        id: props.id,
        children: formatCaption(props.displayMonth, {
            locale: locale
        })
    });
}


 function IconDropdown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", __assign({
        width: "8px",
        height: "8px",
        viewBox: "0 0 120 120",
        "data-testid": "iconDropdown"
    }, props, {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M4.22182541,48.2218254 C8.44222828,44.0014225 15.2388494,43.9273804 19.5496459,47.9996989 L19.7781746,48.2218254 L60,88.443 L100.221825,48.2218254 C104.442228,44.0014225 111.238849,43.9273804 115.549646,47.9996989 L115.778175,48.2218254 C119.998577,52.4422283 120.07262,59.2388494 116.000301,63.5496459 L115.778175,63.7781746 L67.7781746,111.778175 C63.5577717,115.998577 56.7611506,116.07262 52.4503541,112.000301 L52.2218254,111.778175 L4.22182541,63.7781746 C-0.0739418023,59.4824074 -0.0739418023,52.5175926 4.22182541,48.2218254 Z",
            fill: "currentColor",
            fillRule: "nonzero"
        })
    }));
}



 function Dropdown(props) {
    var _a, _b;
    var onChange = props.onChange, value = props.value, children = props.children, caption = props.caption, className = props.className, style = props.style;
    var dayPicker = useDayPicker();
    var IconDropdownComponent = (_b = (_a = dayPicker.components) === null || _a === void 0 ? void 0 : _a.IconDropdown) !== null && _b !== void 0 ? _b : IconDropdown;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: className,
        style: style,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                className: dayPicker.classNames.vhidden,
                children: props['aria-label']
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("select", {
                name: props.name,
                "aria-label": props['aria-label'],
                className: dayPicker.classNames.dropdown,
                style: dayPicker.styles.dropdown,
                value: value,
                onChange: onChange,
                children: children
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: dayPicker.classNames.caption_label,
                style: dayPicker.styles.caption_label,
                "aria-hidden": "true",
                children: [
                    caption,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconDropdownComponent, {
                        className: dayPicker.classNames.dropdown_icon,
                        style: dayPicker.styles.dropdown_icon
                    })
                ]
            })
        ]
    });
}
 function MonthsDropdown(props) {
    var _a;
    var _b = useDayPicker(), fromDate = _b.fromDate, toDate = _b.toDate, styles = _b.styles, locale = _b.locale, formatMonthCaption = _b.formatters.formatMonthCaption, classNames = _b.classNames, components = _b.components, labelMonthDropdown = _b.labels.labelMonthDropdown;
    
    if (!fromDate) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {});
    if (!toDate) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {});
    var dropdownMonths = [];
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameYear"])(fromDate, toDate)) {
        
        var date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(fromDate);
        for(var month = fromDate.getMonth(); month <= toDate.getMonth(); month++){
            dropdownMonths.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMonth"])(date, month));
        }
    } else {
        
        var date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(new Date()); 
        for(var month = 0; month <= 11; month++){
            dropdownMonths.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMonth"])(date, month));
        }
    }
    var handleChange = function(e) {
        var selectedMonth = Number(e.target.value);
        var newMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMonth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(props.displayMonth), selectedMonth);
        props.onChange(newMonth);
    };
    var DropdownComponent = (_a = components === null || components === void 0 ? void 0 : components.Dropdown) !== null && _a !== void 0 ? _a : Dropdown;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DropdownComponent, {
        name: "months",
        "aria-label": labelMonthDropdown(),
        className: classNames.dropdown_month,
        style: styles.dropdown_month,
        onChange: handleChange,
        value: props.displayMonth.getMonth(),
        caption: formatMonthCaption(props.displayMonth, {
            locale: locale
        }),
        children: dropdownMonths.map(function(m) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("option", {
                value: m.getMonth(),
                children: formatMonthCaption(m, {
                    locale: locale
                })
            }, m.getMonth());
        })
    });
}



 function YearsDropdown(props) {
    var _a;
    var displayMonth = props.displayMonth;
    var _b = useDayPicker(), fromDate = _b.fromDate, toDate = _b.toDate, locale = _b.locale, styles = _b.styles, classNames = _b.classNames, components = _b.components, formatYearCaption = _b.formatters.formatYearCaption, labelYearDropdown = _b.labels.labelYearDropdown;
    var years = [];
    
    if (!fromDate) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {});
    if (!toDate) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {});
    var fromYear = fromDate.getFullYear();
    var toYear = toDate.getFullYear();
    for(var year = fromYear; year <= toYear; year++){
        years.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setYear"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfYear"])(new Date()), year));
    }
    var handleChange = function(e) {
        var newMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$setYear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setYear"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(displayMonth), Number(e.target.value));
        props.onChange(newMonth);
    };
    var DropdownComponent = (_a = components === null || components === void 0 ? void 0 : components.Dropdown) !== null && _a !== void 0 ? _a : Dropdown;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DropdownComponent, {
        name: "years",
        "aria-label": labelYearDropdown(),
        className: classNames.dropdown_year,
        style: styles.dropdown_year,
        onChange: handleChange,
        value: displayMonth.getFullYear(),
        caption: formatYearCaption(displayMonth, {
            locale: locale
        }),
        children: years.map(function(year) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("option", {
                value: year.getFullYear(),
                children: formatYearCaption(year, {
                    locale: locale
                })
            }, year.getFullYear());
        })
    });
}








 function useControlledValue(defaultValue, controlledValue) {
    var _a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue), uncontrolledValue = _a[0], setValue = _a[1];
    var value = controlledValue === undefined ? uncontrolledValue : controlledValue;
    return [
        value,
        setValue
    ];
}
 function getInitialMonth(context) {
    var month = context.month, defaultMonth = context.defaultMonth, today = context.today;
    var initialMonth = month || defaultMonth || today || new Date();
    var toDate = context.toDate, fromDate = context.fromDate, _a = context.numberOfMonths, numberOfMonths = _a === void 0 ? 1 : _a;
    
    if (toDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarMonths"])(toDate, initialMonth) < 0) {
        var offset = -1 * (numberOfMonths - 1);
        initialMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(toDate, offset);
    }
    
    if (fromDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarMonths"])(initialMonth, fromDate) < 0) {
        initialMonth = fromDate;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(initialMonth);
}
 function useNavigationState() {
    var context = useDayPicker();
    var initialMonth = getInitialMonth(context);
    var _a = useControlledValue(initialMonth, context.month), month = _a[0], setMonth = _a[1];
    var goToMonth = function(date) {
        var _a;
        if (context.disableNavigation) return;
        var month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(date);
        setMonth(month);
        (_a = context.onMonthChange) === null || _a === void 0 ? void 0 : _a.call(context, month);
    };
    return [
        month,
        goToMonth
    ];
}



 function getDisplayMonths(month, _a) {
    var reverseMonths = _a.reverseMonths, numberOfMonths = _a.numberOfMonths;
    var start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(month);
    var end = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(start, numberOfMonths));
    var monthsDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarMonths"])(end, start);
    var months = [];
    for(var i = 0; i < monthsDiff; i++){
        var nextMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(start, i);
        months.push(nextMonth);
    }
    if (reverseMonths) months = months.reverse();
    return months;
}









 function getNextMonth(startingMonth, options) {
    if (options.disableNavigation) {
        return undefined;
    }
    var toDate = options.toDate, pagedNavigation = options.pagedNavigation, _a = options.numberOfMonths, numberOfMonths = _a === void 0 ? 1 : _a;
    var offset = pagedNavigation ? numberOfMonths : 1;
    var month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(startingMonth);
    if (!toDate) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(month, offset);
    }
    var monthsDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarMonths"])(toDate, startingMonth);
    if (monthsDiff < numberOfMonths) {
        return undefined;
    }
    
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(month, offset);
}










 function getPreviousMonth(startingMonth, options) {
    if (options.disableNavigation) {
        return undefined;
    }
    var fromDate = options.fromDate, pagedNavigation = options.pagedNavigation, _a = options.numberOfMonths, numberOfMonths = _a === void 0 ? 1 : _a;
    var offset = pagedNavigation ? numberOfMonths : 1;
    var month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(startingMonth);
    if (!fromDate) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(month, -offset);
    }
    var monthsDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarMonths"])(month, fromDate);
    if (monthsDiff <= 0) {
        return undefined;
    }
    
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(month, -offset);
}



 var NavigationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
 function NavigationProvider(props) {
    var dayPicker = useDayPicker();
    var _a = useNavigationState(), currentMonth = _a[0], goToMonth = _a[1];
    var displayMonths = getDisplayMonths(currentMonth, dayPicker);
    var nextMonth = getNextMonth(currentMonth, dayPicker);
    var previousMonth = getPreviousMonth(currentMonth, dayPicker);
    var isDateDisplayed = function(date) {
        return displayMonths.some(function(displayMonth) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameMonth"])(date, displayMonth);
        });
    };
    var goToDate = function(date, refDate) {
        if (isDateDisplayed(date)) {
            return;
        }
        if (refDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isBefore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBefore"])(date, refDate)) {
            goToMonth((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(date, 1 + dayPicker.numberOfMonths * -1));
        } else {
            goToMonth(date);
        }
    };
    var value = {
        currentMonth: currentMonth,
        displayMonths: displayMonths,
        goToMonth: goToMonth,
        goToDate: goToDate,
        previousMonth: previousMonth,
        nextMonth: nextMonth,
        isDateDisplayed: isDateDisplayed
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(NavigationContext.Provider, {
        value: value,
        children: props.children
    });
}





 function useNavigation() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}


 function CaptionDropdowns(props) {
    var _a;
    var _b = useDayPicker(), classNames = _b.classNames, styles = _b.styles, components = _b.components;
    var goToMonth = useNavigation().goToMonth;
    var handleMonthChange = function(newMonth) {
        goToMonth((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(newMonth, props.displayIndex ? -props.displayIndex : 0));
    };
    var CaptionLabelComponent = (_a = components === null || components === void 0 ? void 0 : components.CaptionLabel) !== null && _a !== void 0 ? _a : CaptionLabel;
    var captionLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionLabelComponent, {
        id: props.id,
        displayMonth: props.displayMonth
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: classNames.caption_dropdowns,
        style: styles.caption_dropdowns,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: classNames.vhidden,
                children: captionLabel
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MonthsDropdown, {
                onChange: handleMonthChange,
                displayMonth: props.displayMonth
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(YearsDropdown, {
                onChange: handleMonthChange,
                displayMonth: props.displayMonth
            })
        ]
    });
}


 function IconLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", __assign({
        width: "16px",
        height: "16px",
        viewBox: "0 0 120 120"
    }, props, {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M69.490332,3.34314575 C72.6145263,0.218951416 77.6798462,0.218951416 80.8040405,3.34314575 C83.8617626,6.40086786 83.9268205,11.3179931 80.9992143,14.4548388 L80.8040405,14.6568542 L35.461,60 L80.8040405,105.343146 C83.8617626,108.400868 83.9268205,113.317993 80.9992143,116.454839 L80.8040405,116.656854 C77.7463184,119.714576 72.8291931,119.779634 69.6923475,116.852028 L69.490332,116.656854 L18.490332,65.6568542 C15.4326099,62.5991321 15.367552,57.6820069 18.2951583,54.5451612 L18.490332,54.3431458 L69.490332,3.34314575 Z",
            fill: "currentColor",
            fillRule: "nonzero"
        })
    }));
}


 function IconRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", __assign({
        width: "16px",
        height: "16px",
        viewBox: "0 0 120 120"
    }, props, {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M49.8040405,3.34314575 C46.6798462,0.218951416 41.6145263,0.218951416 38.490332,3.34314575 C35.4326099,6.40086786 35.367552,11.3179931 38.2951583,14.4548388 L38.490332,14.6568542 L83.8333725,60 L38.490332,105.343146 C35.4326099,108.400868 35.367552,113.317993 38.2951583,116.454839 L38.490332,116.656854 C41.5480541,119.714576 46.4651794,119.779634 49.602025,116.852028 L49.8040405,116.656854 L100.804041,65.6568542 C103.861763,62.5991321 103.926821,57.6820069 100.999214,54.5451612 L100.804041,54.3431458 L49.8040405,3.34314575 Z",
            fill: "currentColor"
        })
    }));
}
 var Button = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(function(props, ref) {
    var _a = useDayPicker(), classNames = _a.classNames, styles = _a.styles;
    var classNamesArr = [
        classNames.button_reset,
        classNames.button
    ];
    if (props.className) {
        classNamesArr.push(props.className);
    }
    var className = classNamesArr.join(' ');
    var style = __assign(__assign({}, styles.button_reset), styles.button);
    if (props.style) {
        Object.assign(style, props.style);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", __assign({}, props, {
        ref: ref,
        type: "button",
        className: className,
        style: style
    }));
});
 function Navigation(props) {
    var _a, _b;
    var _c = useDayPicker(), dir = _c.dir, locale = _c.locale, classNames = _c.classNames, styles = _c.styles, _d = _c.labels, labelPrevious = _d.labelPrevious, labelNext = _d.labelNext, components = _c.components;
    if (!props.nextMonth && !props.previousMonth) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {});
    }
    var previousLabel = labelPrevious(props.previousMonth, {
        locale: locale
    });
    var previousClassName = [
        classNames.nav_button,
        classNames.nav_button_previous
    ].join(' ');
    var nextLabel = labelNext(props.nextMonth, {
        locale: locale
    });
    var nextClassName = [
        classNames.nav_button,
        classNames.nav_button_next
    ].join(' ');
    var IconRightComponent = (_a = components === null || components === void 0 ? void 0 : components.IconRight) !== null && _a !== void 0 ? _a : IconRight;
    var IconLeftComponent = (_b = components === null || components === void 0 ? void 0 : components.IconLeft) !== null && _b !== void 0 ? _b : IconLeft;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: classNames.nav,
        style: styles.nav,
        children: [
            !props.hidePrevious && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Button, {
                name: "previous-month",
                "aria-label": previousLabel,
                className: previousClassName,
                style: styles.nav_button_previous,
                disabled: !props.previousMonth,
                onClick: props.onPreviousClick,
                children: dir === 'rtl' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconRightComponent, {
                    className: classNames.nav_icon,
                    style: styles.nav_icon
                }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconLeftComponent, {
                    className: classNames.nav_icon,
                    style: styles.nav_icon
                })
            }),
            !props.hideNext && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Button, {
                name: "next-month",
                "aria-label": nextLabel,
                className: nextClassName,
                style: styles.nav_button_next,
                disabled: !props.nextMonth,
                onClick: props.onNextClick,
                children: dir === 'rtl' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconLeftComponent, {
                    className: classNames.nav_icon,
                    style: styles.nav_icon
                }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconRightComponent, {
                    className: classNames.nav_icon,
                    style: styles.nav_icon
                })
            })
        ]
    });
}


 function CaptionNavigation(props) {
    var numberOfMonths = useDayPicker().numberOfMonths;
    var _a = useNavigation(), previousMonth = _a.previousMonth, nextMonth = _a.nextMonth, goToMonth = _a.goToMonth, displayMonths = _a.displayMonths;
    var displayIndex = displayMonths.findIndex(function(month) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameMonth"])(props.displayMonth, month);
    });
    var isFirst = displayIndex === 0;
    var isLast = displayIndex === displayMonths.length - 1;
    var hideNext = numberOfMonths > 1 && (isFirst || !isLast);
    var hidePrevious = numberOfMonths > 1 && (isLast || !isFirst);
    var handlePreviousClick = function() {
        if (!previousMonth) return;
        goToMonth(previousMonth);
    };
    var handleNextClick = function() {
        if (!nextMonth) return;
        goToMonth(nextMonth);
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Navigation, {
        displayMonth: props.displayMonth,
        hideNext: hideNext,
        hidePrevious: hidePrevious,
        nextMonth: nextMonth,
        previousMonth: previousMonth,
        onPreviousClick: handlePreviousClick,
        onNextClick: handleNextClick
    });
}



 function Caption(props) {
    var _a;
    var _b = useDayPicker(), classNames = _b.classNames, disableNavigation = _b.disableNavigation, styles = _b.styles, captionLayout = _b.captionLayout, components = _b.components;
    var CaptionLabelComponent = (_a = components === null || components === void 0 ? void 0 : components.CaptionLabel) !== null && _a !== void 0 ? _a : CaptionLabel;
    var caption;
    if (disableNavigation) {
        caption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionLabelComponent, {
            id: props.id,
            displayMonth: props.displayMonth
        });
    } else if (captionLayout === 'dropdown') {
        caption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionDropdowns, {
            displayMonth: props.displayMonth,
            id: props.id
        });
    } else if (captionLayout === 'dropdown-buttons') {
        caption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionDropdowns, {
                    displayMonth: props.displayMonth,
                    displayIndex: props.displayIndex,
                    id: props.id
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionNavigation, {
                    displayMonth: props.displayMonth,
                    displayIndex: props.displayIndex,
                    id: props.id
                })
            ]
        });
    } else {
        caption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionLabelComponent, {
                    id: props.id,
                    displayMonth: props.displayMonth,
                    displayIndex: props.displayIndex
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionNavigation, {
                    displayMonth: props.displayMonth,
                    id: props.id
                })
            ]
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: classNames.caption,
        style: styles.caption,
        children: caption
    });
}
 
function Footer(props) {
    var _a = useDayPicker(), footer = _a.footer, styles = _a.styles, tfoot = _a.classNames.tfoot;
    if (!footer) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {});
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tfoot", {
        className: tfoot,
        style: styles.tfoot,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tr", {
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                colSpan: 8,
                children: footer
            })
        })
    });
}



 function getWeekdays(locale,  weekStartsOn,  ISOWeek) {
    var start = ISOWeek ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfISOWeek"])(new Date()) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(new Date(), {
        locale: locale,
        weekStartsOn: weekStartsOn
    });
    var days = [];
    for(var i = 0; i < 7; i++){
        var day = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(start, i);
        days.push(day);
    }
    return days;
}


 function HeadRow() {
    var _a = useDayPicker(), classNames = _a.classNames, styles = _a.styles, showWeekNumber = _a.showWeekNumber, locale = _a.locale, weekStartsOn = _a.weekStartsOn, ISOWeek = _a.ISOWeek, formatWeekdayName = _a.formatters.formatWeekdayName, labelWeekday = _a.labels.labelWeekday;
    var weekdays = getWeekdays(locale, weekStartsOn, ISOWeek);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
        style: styles.head_row,
        className: classNames.head_row,
        children: [
            showWeekNumber && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                style: styles.head_cell,
                className: classNames.head_cell
            }),
            weekdays.map(function(weekday, i) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                    scope: "col",
                    className: classNames.head_cell,
                    style: styles.head_cell,
                    "aria-label": labelWeekday(weekday, {
                        locale: locale
                    }),
                    children: formatWeekdayName(weekday, {
                        locale: locale
                    })
                }, i);
            })
        ]
    });
}
 function Head() {
    var _a;
    var _b = useDayPicker(), classNames = _b.classNames, styles = _b.styles, components = _b.components;
    var HeadRowComponent = (_a = components === null || components === void 0 ? void 0 : components.HeadRow) !== null && _a !== void 0 ? _a : HeadRow;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("thead", {
        style: styles.head,
        className: classNames.head,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HeadRowComponent, {})
    });
}
 function DayContent(props) {
    var _a = useDayPicker(), locale = _a.locale, formatDay = _a.formatters.formatDay;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: formatDay(props.date, {
            locale: locale
        })
    });
}





 var SelectMultipleContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
 function SelectMultipleProvider(props) {
    if (!isDayPickerMultiple(props.initialProps)) {
        var emptyContextValue = {
            selected: undefined,
            modifiers: {
                disabled: []
            }
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectMultipleContext.Provider, {
            value: emptyContextValue,
            children: props.children
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectMultipleProviderInternal, {
        initialProps: props.initialProps,
        children: props.children
    });
}
function SelectMultipleProviderInternal(_a) {
    var initialProps = _a.initialProps, children = _a.children;
    var selected = initialProps.selected, min = initialProps.min, max = initialProps.max;
    var onDayClick = function(day, activeModifiers, e) {
        var _a, _b;
        (_a = initialProps.onDayClick) === null || _a === void 0 ? void 0 : _a.call(initialProps, day, activeModifiers, e);
        var isMinSelected = Boolean(activeModifiers.selected && min && (selected === null || selected === void 0 ? void 0 : selected.length) === min);
        if (isMinSelected) {
            return;
        }
        var isMaxSelected = Boolean(!activeModifiers.selected && max && (selected === null || selected === void 0 ? void 0 : selected.length) === max);
        if (isMaxSelected) {
            return;
        }
        var selectedDays = selected ? __spreadArray([], selected, true) : [];
        if (activeModifiers.selected) {
            var index = selectedDays.findIndex(function(selectedDay) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, selectedDay);
            });
            selectedDays.splice(index, 1);
        } else {
            selectedDays.push(day);
        }
        (_b = initialProps.onSelect) === null || _b === void 0 ? void 0 : _b.call(initialProps, selectedDays, day, activeModifiers, e);
    };
    var modifiers = {
        disabled: []
    };
    if (selected) {
        modifiers.disabled.push(function(day) {
            var isMaxSelected = max && selected.length > max - 1;
            var isSelected = selected.some(function(selectedDay) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(selectedDay, day);
            });
            return Boolean(isMaxSelected && !isSelected);
        });
    }
    var contextValue = {
        selected: selected,
        onDayClick: onDayClick,
        modifiers: modifiers
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectMultipleContext.Provider, {
        value: contextValue,
        children: children
    });
}




 function useSelectMultiple() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SelectMultipleContext);
    if (!context) {
        throw new Error('useSelectMultiple must be used within a SelectMultipleProvider');
    }
    return context;
}





 function addToRange(day, range) {
    var _a = range || {}, from = _a.from, to = _a.to;
    if (from && to) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(to, day) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(from, day)) {
            return undefined;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(to, day)) {
            return {
                from: to,
                to: undefined
            };
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(from, day)) {
            return undefined;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAfter"])(from, day)) {
            return {
                from: day,
                to: to
            };
        }
        return {
            from: from,
            to: day
        };
    }
    if (to) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAfter"])(day, to)) {
            return {
                from: to,
                to: day
            };
        }
        return {
            from: day,
            to: to
        };
    }
    if (from) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isBefore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBefore"])(day, from)) {
            return {
                from: day,
                to: from
            };
        }
        return {
            from: from,
            to: day
        };
    }
    return {
        from: day,
        to: undefined
    };
}





 var SelectRangeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
 function SelectRangeProvider(props) {
    if (!isDayPickerRange(props.initialProps)) {
        var emptyContextValue = {
            selected: undefined,
            modifiers: {
                range_start: [],
                range_end: [],
                range_middle: [],
                disabled: []
            }
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectRangeContext.Provider, {
            value: emptyContextValue,
            children: props.children
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectRangeProviderInternal, {
        initialProps: props.initialProps,
        children: props.children
    });
}
function SelectRangeProviderInternal(_a) {
    var initialProps = _a.initialProps, children = _a.children;
    var selected = initialProps.selected;
    var _b = selected || {}, selectedFrom = _b.from, selectedTo = _b.to;
    var min = initialProps.min;
    var max = initialProps.max;
    var onDayClick = function(day, activeModifiers, e) {
        var _a, _b;
        (_a = initialProps.onDayClick) === null || _a === void 0 ? void 0 : _a.call(initialProps, day, activeModifiers, e);
        var newRange = addToRange(day, selected);
        (_b = initialProps.onSelect) === null || _b === void 0 ? void 0 : _b.call(initialProps, newRange, day, activeModifiers, e);
    };
    var modifiers = {
        range_start: [],
        range_end: [],
        range_middle: [],
        disabled: []
    };
    if (selectedFrom) {
        modifiers.range_start = [
            selectedFrom
        ];
        if (!selectedTo) {
            modifiers.range_end = [
                selectedFrom
            ];
        } else {
            modifiers.range_end = [
                selectedTo
            ];
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(selectedFrom, selectedTo)) {
                modifiers.range_middle = [
                    {
                        after: selectedFrom,
                        before: selectedTo
                    }
                ];
            }
        }
    } else if (selectedTo) {
        modifiers.range_start = [
            selectedTo
        ];
        modifiers.range_end = [
            selectedTo
        ];
    }
    if (min) {
        if (selectedFrom && !selectedTo) {
            modifiers.disabled.push({
                after: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(selectedFrom, min - 1),
                before: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedFrom, min - 1)
            });
        }
        if (selectedFrom && selectedTo) {
            modifiers.disabled.push({
                after: selectedFrom,
                before: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedFrom, min - 1)
            });
        }
        if (!selectedFrom && selectedTo) {
            modifiers.disabled.push({
                after: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(selectedTo, min - 1),
                before: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedTo, min - 1)
            });
        }
    }
    if (max) {
        if (selectedFrom && !selectedTo) {
            modifiers.disabled.push({
                before: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedFrom, -max + 1)
            });
            modifiers.disabled.push({
                after: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedFrom, max - 1)
            });
        }
        if (selectedFrom && selectedTo) {
            var selectedCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(selectedTo, selectedFrom) + 1;
            var offset = max - selectedCount;
            modifiers.disabled.push({
                before: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(selectedFrom, offset)
            });
            modifiers.disabled.push({
                after: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedTo, offset)
            });
        }
        if (!selectedFrom && selectedTo) {
            modifiers.disabled.push({
                before: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedTo, -max + 1)
            });
            modifiers.disabled.push({
                after: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(selectedTo, max - 1)
            });
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectRangeContext.Provider, {
        value: {
            selected: selected,
            onDayClick: onDayClick,
            modifiers: modifiers
        },
        children: children
    });
}




 function useSelectRange() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SelectRangeContext);
    if (!context) {
        throw new Error('useSelectRange must be used within a SelectRangeProvider');
    }
    return context;
}
 function matcherToArray(matcher) {
    if (Array.isArray(matcher)) {
        return __spreadArray([], matcher, true);
    } else if (matcher !== undefined) {
        return [
            matcher
        ];
    } else {
        return [];
    }
}
 function getCustomModifiers(dayModifiers) {
    var customModifiers = {};
    Object.entries(dayModifiers).forEach(function(_a) {
        var modifier = _a[0], matcher = _a[1];
        customModifiers[modifier] = matcherToArray(matcher);
    });
    return customModifiers;
}
 var InternalModifier;
(function(InternalModifier) {
    InternalModifier["Outside"] = "outside";
     InternalModifier["Disabled"] = "disabled";
     InternalModifier["Selected"] = "selected";
     InternalModifier["Hidden"] = "hidden";
     InternalModifier["Today"] = "today";
     InternalModifier["RangeStart"] = "range_start";
     InternalModifier["RangeEnd"] = "range_end";
     InternalModifier["RangeMiddle"] = "range_middle";
})(InternalModifier || (InternalModifier = {}));
var Selected = InternalModifier.Selected, Disabled = InternalModifier.Disabled, Hidden = InternalModifier.Hidden, Today = InternalModifier.Today, RangeEnd = InternalModifier.RangeEnd, RangeMiddle = InternalModifier.RangeMiddle, RangeStart = InternalModifier.RangeStart, Outside = InternalModifier.Outside;
 function getInternalModifiers(dayPicker, selectMultiple, selectRange) {
    var _a;
    var internalModifiers = (_a = {}, _a[Selected] = matcherToArray(dayPicker.selected), _a[Disabled] = matcherToArray(dayPicker.disabled), _a[Hidden] = matcherToArray(dayPicker.hidden), _a[Today] = [
        dayPicker.today
    ], _a[RangeEnd] = [], _a[RangeMiddle] = [], _a[RangeStart] = [], _a[Outside] = [], _a);
    if (dayPicker.fromDate) {
        internalModifiers[Disabled].push({
            before: dayPicker.fromDate
        });
    }
    if (dayPicker.toDate) {
        internalModifiers[Disabled].push({
            after: dayPicker.toDate
        });
    }
    if (isDayPickerMultiple(dayPicker)) {
        internalModifiers[Disabled] = internalModifiers[Disabled].concat(selectMultiple.modifiers[Disabled]);
    } else if (isDayPickerRange(dayPicker)) {
        internalModifiers[Disabled] = internalModifiers[Disabled].concat(selectRange.modifiers[Disabled]);
        internalModifiers[RangeStart] = selectRange.modifiers[RangeStart];
        internalModifiers[RangeMiddle] = selectRange.modifiers[RangeMiddle];
        internalModifiers[RangeEnd] = selectRange.modifiers[RangeEnd];
    }
    return internalModifiers;
}
 var ModifiersContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
 function ModifiersProvider(props) {
    var dayPicker = useDayPicker();
    var selectMultiple = useSelectMultiple();
    var selectRange = useSelectRange();
    var internalModifiers = getInternalModifiers(dayPicker, selectMultiple, selectRange);
    var customModifiers = getCustomModifiers(dayPicker.modifiers);
    var modifiers = __assign(__assign({}, internalModifiers), customModifiers);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ModifiersContext.Provider, {
        value: modifiers,
        children: props.children
    });
}






 function useModifiers() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ModifiersContext);
    if (!context) {
        throw new Error('useModifiers must be used within a ModifiersProvider');
    }
    return context;
}
 function isDateInterval(matcher) {
    return Boolean(matcher && typeof matcher === 'object' && 'before' in matcher && 'after' in matcher);
}
 function isDateRange(value) {
    return Boolean(value && typeof value === 'object' && 'from' in value);
}
 function isDateAfterType(value) {
    return Boolean(value && typeof value === 'object' && 'after' in value);
}
 function isDateBeforeType(value) {
    return Boolean(value && typeof value === 'object' && 'before' in value);
}
 function isDayOfWeekType(value) {
    return Boolean(value && typeof value === 'object' && 'dayOfWeek' in value);
}
 function isDateInRange(date, range) {
    var _a;
    var from = range.from, to = range.to;
    if (from && to) {
        var isRangeInverted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(to, from) < 0;
        if (isRangeInverted) {
            _a = [
                to,
                from
            ], from = _a[0], to = _a[1];
        }
        var isInRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(date, from) >= 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(to, date) >= 0;
        return isInRange;
    }
    if (to) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(to, date);
    }
    if (from) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(from, date);
    }
    return false;
}
 function isDateType(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isDate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDate"])(value);
}
 function isArrayOfDates(value) {
    return Array.isArray(value) && value.every(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isDate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDate"]);
}
















 function isMatch(day, matchers) {
    return matchers.some(function(matcher) {
        if (typeof matcher === 'boolean') {
            return matcher;
        }
        if (isDateType(matcher)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, matcher);
        }
        if (isArrayOfDates(matcher)) {
            return matcher.includes(day);
        }
        if (isDateRange(matcher)) {
            return isDateInRange(day, matcher);
        }
        if (isDayOfWeekType(matcher)) {
            return matcher.dayOfWeek.includes(day.getDay());
        }
        if (isDateInterval(matcher)) {
            var diffBefore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(matcher.before, day);
            var diffAfter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(matcher.after, day);
            var isDayBefore = diffBefore > 0;
            var isDayAfter = diffAfter < 0;
            var isClosedInterval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAfter"])(matcher.before, matcher.after);
            if (isClosedInterval) {
                return isDayAfter && isDayBefore;
            } else {
                return isDayBefore || isDayAfter;
            }
        }
        if (isDateAfterType(matcher)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(day, matcher.after) > 0;
        }
        if (isDateBeforeType(matcher)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(matcher.before, day) > 0;
        }
        if (typeof matcher === 'function') {
            return matcher(day);
        }
        return false;
    });
}
 function getActiveModifiers(day,  modifiers,  displayMonth) {
    var matchedModifiers = Object.keys(modifiers).reduce(function(result, key) {
        var modifier = modifiers[key];
        if (isMatch(day, modifier)) {
            result.push(key);
        }
        return result;
    }, []);
    var activeModifiers = {};
    matchedModifiers.forEach(function(modifier) {
        return activeModifiers[modifier] = true;
    });
    if (displayMonth && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameMonth"])(day, displayMonth)) {
        activeModifiers.outside = true;
    }
    return activeModifiers;
}







 function getInitialFocusTarget(displayMonths, modifiers) {
    var firstDayInMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(displayMonths[0]);
    var lastDayInMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfMonth"])(displayMonths[displayMonths.length - 1]);
    
    var firstFocusableDay;
    var today;
    var date = firstDayInMonth;
    while(date <= lastDayInMonth){
        var activeModifiers = getActiveModifiers(date, modifiers);
        var isFocusable = !activeModifiers.disabled && !activeModifiers.hidden;
        if (!isFocusable) {
            date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(date, 1);
            continue;
        }
        if (activeModifiers.selected) {
            return date;
        }
        if (activeModifiers.today && !today) {
            today = date;
        }
        if (!firstFocusableDay) {
            firstFocusableDay = date;
        }
        date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(date, 1);
    }
    if (today) {
        return today;
    } else {
        return firstFocusableDay;
    }
}
var MAX_RETRY = 365;
 function getNextFocus(focusedDay, options) {
    var moveBy = options.moveBy, direction = options.direction, context = options.context, modifiers = options.modifiers, _a = options.retry, retry = _a === void 0 ? {
        count: 0,
        lastFocused: focusedDay
    } : _a;
    var weekStartsOn = context.weekStartsOn, fromDate = context.fromDate, toDate = context.toDate, locale = context.locale;
    var moveFns = {
        day: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"],
        week: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addWeeks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addWeeks"],
        month: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"],
        year: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"],
        startOfWeek: function(date) {
            return context.ISOWeek ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfISOWeek"])(date) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(date, {
                locale: locale,
                weekStartsOn: weekStartsOn
            });
        },
        endOfWeek: function(date) {
            return context.ISOWeek ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfISOWeek"])(date) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfWeek"])(date, {
                locale: locale,
                weekStartsOn: weekStartsOn
            });
        }
    };
    var newFocusedDay = moveFns[moveBy](focusedDay, direction === 'after' ? 1 : -1);
    if (direction === 'before' && fromDate) {
        newFocusedDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$max$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])([
            fromDate,
            newFocusedDay
        ]);
    } else if (direction === 'after' && toDate) {
        newFocusedDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$min$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])([
            toDate,
            newFocusedDay
        ]);
    }
    var isFocusable = true;
    if (modifiers) {
        var activeModifiers = getActiveModifiers(newFocusedDay, modifiers);
        isFocusable = !activeModifiers.disabled && !activeModifiers.hidden;
    }
    if (isFocusable) {
        return newFocusedDay;
    } else {
        if (retry.count > MAX_RETRY) {
            return retry.lastFocused;
        }
        return getNextFocus(newFocusedDay, {
            moveBy: moveBy,
            direction: direction,
            context: context,
            modifiers: modifiers,
            retry: __assign(__assign({}, retry), {
                count: retry.count + 1
            })
        });
    }
}




 var FocusContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
 function FocusProvider(props) {
    var navigation = useNavigation();
    var modifiers = useModifiers();
    var _a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(), focusedDay = _a[0], setFocusedDay = _a[1];
    var _b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(), lastFocused = _b[0], setLastFocused = _b[1];
    var initialFocusTarget = getInitialFocusTarget(navigation.displayMonths, modifiers);
    
    var focusTarget = (focusedDay !== null && focusedDay !== void 0 ? focusedDay : lastFocused && navigation.isDateDisplayed(lastFocused)) ? lastFocused : initialFocusTarget;
    var blur = function() {
        setLastFocused(focusedDay);
        setFocusedDay(undefined);
    };
    var focus = function(date) {
        setFocusedDay(date);
    };
    var context = useDayPicker();
    var moveFocus = function(moveBy, direction) {
        if (!focusedDay) return;
        var nextFocused = getNextFocus(focusedDay, {
            moveBy: moveBy,
            direction: direction,
            context: context,
            modifiers: modifiers
        });
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(focusedDay, nextFocused)) return undefined;
        navigation.goToDate(nextFocused, focusedDay);
        focus(nextFocused);
    };
    var value = {
        focusedDay: focusedDay,
        focusTarget: focusTarget,
        blur: blur,
        focus: focus,
        focusDayAfter: function() {
            return moveFocus('day', 'after');
        },
        focusDayBefore: function() {
            return moveFocus('day', 'before');
        },
        focusWeekAfter: function() {
            return moveFocus('week', 'after');
        },
        focusWeekBefore: function() {
            return moveFocus('week', 'before');
        },
        focusMonthBefore: function() {
            return moveFocus('month', 'before');
        },
        focusMonthAfter: function() {
            return moveFocus('month', 'after');
        },
        focusYearBefore: function() {
            return moveFocus('year', 'before');
        },
        focusYearAfter: function() {
            return moveFocus('year', 'after');
        },
        focusStartOfWeek: function() {
            return moveFocus('startOfWeek', 'before');
        },
        focusEndOfWeek: function() {
            return moveFocus('endOfWeek', 'after');
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FocusContext.Provider, {
        value: value,
        children: props.children
    });
}





 function useFocusContext() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(FocusContext);
    if (!context) {
        throw new Error('useFocusContext must be used within a FocusProvider');
    }
    return context;
}







 function useActiveModifiers(day, 


 displayMonth) {
    var modifiers = useModifiers();
    var activeModifiers = getActiveModifiers(day, modifiers, displayMonth);
    return activeModifiers;
}





 var SelectSingleContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
 function SelectSingleProvider(props) {
    if (!isDayPickerSingle(props.initialProps)) {
        var emptyContextValue = {
            selected: undefined
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectSingleContext.Provider, {
            value: emptyContextValue,
            children: props.children
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectSingleProviderInternal, {
        initialProps: props.initialProps,
        children: props.children
    });
}
function SelectSingleProviderInternal(_a) {
    var initialProps = _a.initialProps, children = _a.children;
    var onDayClick = function(day, activeModifiers, e) {
        var _a, _b, _c;
        (_a = initialProps.onDayClick) === null || _a === void 0 ? void 0 : _a.call(initialProps, day, activeModifiers, e);
        if (activeModifiers.selected && !initialProps.required) {
            (_b = initialProps.onSelect) === null || _b === void 0 ? void 0 : _b.call(initialProps, undefined, day, activeModifiers, e);
            return;
        }
        (_c = initialProps.onSelect) === null || _c === void 0 ? void 0 : _c.call(initialProps, day, day, activeModifiers, e);
    };
    var contextValue = {
        selected: initialProps.selected,
        onDayClick: onDayClick
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectSingleContext.Provider, {
        value: contextValue,
        children: children
    });
}




 function useSelectSingle() {
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SelectSingleContext);
    if (!context) {
        throw new Error('useSelectSingle must be used within a SelectSingleProvider');
    }
    return context;
}



















 function useDayEventHandlers(date, activeModifiers) {
    var dayPicker = useDayPicker();
    var single = useSelectSingle();
    var multiple = useSelectMultiple();
    var range = useSelectRange();
    var _a = useFocusContext(), focusDayAfter = _a.focusDayAfter, focusDayBefore = _a.focusDayBefore, focusWeekAfter = _a.focusWeekAfter, focusWeekBefore = _a.focusWeekBefore, blur = _a.blur, focus = _a.focus, focusMonthBefore = _a.focusMonthBefore, focusMonthAfter = _a.focusMonthAfter, focusYearBefore = _a.focusYearBefore, focusYearAfter = _a.focusYearAfter, focusStartOfWeek = _a.focusStartOfWeek, focusEndOfWeek = _a.focusEndOfWeek;
    var onClick = function(e) {
        var _a, _b, _c, _d;
        if (isDayPickerSingle(dayPicker)) {
            (_a = single.onDayClick) === null || _a === void 0 ? void 0 : _a.call(single, date, activeModifiers, e);
        } else if (isDayPickerMultiple(dayPicker)) {
            (_b = multiple.onDayClick) === null || _b === void 0 ? void 0 : _b.call(multiple, date, activeModifiers, e);
        } else if (isDayPickerRange(dayPicker)) {
            (_c = range.onDayClick) === null || _c === void 0 ? void 0 : _c.call(range, date, activeModifiers, e);
        } else {
            (_d = dayPicker.onDayClick) === null || _d === void 0 ? void 0 : _d.call(dayPicker, date, activeModifiers, e);
        }
    };
    var onFocus = function(e) {
        var _a;
        focus(date);
        (_a = dayPicker.onDayFocus) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onBlur = function(e) {
        var _a;
        blur();
        (_a = dayPicker.onDayBlur) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onMouseEnter = function(e) {
        var _a;
        (_a = dayPicker.onDayMouseEnter) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onMouseLeave = function(e) {
        var _a;
        (_a = dayPicker.onDayMouseLeave) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onPointerEnter = function(e) {
        var _a;
        (_a = dayPicker.onDayPointerEnter) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onPointerLeave = function(e) {
        var _a;
        (_a = dayPicker.onDayPointerLeave) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onTouchCancel = function(e) {
        var _a;
        (_a = dayPicker.onDayTouchCancel) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onTouchEnd = function(e) {
        var _a;
        (_a = dayPicker.onDayTouchEnd) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onTouchMove = function(e) {
        var _a;
        (_a = dayPicker.onDayTouchMove) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onTouchStart = function(e) {
        var _a;
        (_a = dayPicker.onDayTouchStart) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onKeyUp = function(e) {
        var _a;
        (_a = dayPicker.onDayKeyUp) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var onKeyDown = function(e) {
        var _a;
        switch(e.key){
            case 'ArrowLeft':
                e.preventDefault();
                e.stopPropagation();
                dayPicker.dir === 'rtl' ? focusDayAfter() : focusDayBefore();
                break;
            case 'ArrowRight':
                e.preventDefault();
                e.stopPropagation();
                dayPicker.dir === 'rtl' ? focusDayBefore() : focusDayAfter();
                break;
            case 'ArrowDown':
                e.preventDefault();
                e.stopPropagation();
                focusWeekAfter();
                break;
            case 'ArrowUp':
                e.preventDefault();
                e.stopPropagation();
                focusWeekBefore();
                break;
            case 'PageUp':
                e.preventDefault();
                e.stopPropagation();
                e.shiftKey ? focusYearBefore() : focusMonthBefore();
                break;
            case 'PageDown':
                e.preventDefault();
                e.stopPropagation();
                e.shiftKey ? focusYearAfter() : focusMonthAfter();
                break;
            case 'Home':
                e.preventDefault();
                e.stopPropagation();
                focusStartOfWeek();
                break;
            case 'End':
                e.preventDefault();
                e.stopPropagation();
                focusEndOfWeek();
                break;
        }
        (_a = dayPicker.onDayKeyDown) === null || _a === void 0 ? void 0 : _a.call(dayPicker, date, activeModifiers, e);
    };
    var eventHandlers = {
        onClick: onClick,
        onFocus: onFocus,
        onBlur: onBlur,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onPointerEnter: onPointerEnter,
        onPointerLeave: onPointerLeave,
        onTouchCancel: onTouchCancel,
        onTouchEnd: onTouchEnd,
        onTouchMove: onTouchMove,
        onTouchStart: onTouchStart
    };
    return eventHandlers;
}






 function useSelectedDays() {
    var dayPicker = useDayPicker();
    var single = useSelectSingle();
    var multiple = useSelectMultiple();
    var range = useSelectRange();
    var selectedDays = isDayPickerSingle(dayPicker) ? single.selected : isDayPickerMultiple(dayPicker) ? multiple.selected : isDayPickerRange(dayPicker) ? range.selected : undefined;
    return selectedDays;
}
function isInternalModifier(modifier) {
    return Object.values(InternalModifier).includes(modifier);
}






 function getDayClassNames(dayPicker, activeModifiers) {
    var classNames = [
        dayPicker.classNames.day
    ];
    Object.keys(activeModifiers).forEach(function(modifier) {
        var customClassName = dayPicker.modifiersClassNames[modifier];
        if (customClassName) {
            classNames.push(customClassName);
        } else if (isInternalModifier(modifier)) {
            var internalClassName = dayPicker.classNames["day_".concat(modifier)];
            if (internalClassName) {
                classNames.push(internalClassName);
            }
        }
    });
    return classNames;
}
 function getDayStyle(dayPicker, activeModifiers) {
    var style = __assign({}, dayPicker.styles.day);
    Object.keys(activeModifiers).forEach(function(modifier) {
        var _a;
        style = __assign(__assign({}, style), (_a = dayPicker.modifiersStyles) === null || _a === void 0 ? void 0 : _a[modifier]);
    });
    return style;
}





 function useDayRender( day,  displayMonth,  buttonRef) {
    var _a;
    var _b, _c;
    var dayPicker = useDayPicker();
    var focusContext = useFocusContext();
    var activeModifiers = useActiveModifiers(day, displayMonth);
    var eventHandlers = useDayEventHandlers(day, activeModifiers);
    var selectedDays = useSelectedDays();
    var isButton = Boolean(dayPicker.onDayClick || dayPicker.mode !== 'default');
    
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDayRender.useEffect": function() {
            var _a;
            if (activeModifiers.outside) return;
            if (!focusContext.focusedDay) return;
            if (!isButton) return;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(focusContext.focusedDay, day)) {
                (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
    }["useDayRender.useEffect"], [
        focusContext.focusedDay,
        day,
        buttonRef,
        isButton,
        activeModifiers.outside
    ]);
    var className = getDayClassNames(dayPicker, activeModifiers).join(' ');
    var style = getDayStyle(dayPicker, activeModifiers);
    var isHidden = Boolean(activeModifiers.outside && !dayPicker.showOutsideDays || activeModifiers.hidden);
    var DayContentComponent = (_c = (_b = dayPicker.components) === null || _b === void 0 ? void 0 : _b.DayContent) !== null && _c !== void 0 ? _c : DayContent;
    var children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DayContentComponent, {
        date: day,
        displayMonth: displayMonth,
        activeModifiers: activeModifiers
    });
    var divProps = {
        style: style,
        className: className,
        children: children,
        role: 'gridcell'
    };
    var isFocusTarget = focusContext.focusTarget && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(focusContext.focusTarget, day) && !activeModifiers.outside;
    var isFocused = focusContext.focusedDay && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(focusContext.focusedDay, day);
    var buttonProps = __assign(__assign(__assign({}, divProps), (_a = {
        disabled: activeModifiers.disabled,
        role: 'gridcell'
    }, _a['aria-selected'] = activeModifiers.selected, _a.tabIndex = isFocused || isFocusTarget ? 0 : -1, _a)), eventHandlers);
    var dayRender = {
        isButton: isButton,
        isHidden: isHidden,
        activeModifiers: activeModifiers,
        selectedDays: selectedDays,
        buttonProps: buttonProps,
        divProps: divProps
    };
    return dayRender;
}



 function Day(props) {
    var buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
    if (dayRender.isHidden) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            role: "gridcell"
        });
    }
    if (!dayRender.isButton) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", __assign({}, dayRender.divProps));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Button, __assign({
        name: "day",
        ref: buttonRef
    }, dayRender.buttonProps));
}



 function WeekNumber(props) {
    var weekNumber = props.number, dates = props.dates;
    var _a = useDayPicker(), onWeekNumberClick = _a.onWeekNumberClick, styles = _a.styles, classNames = _a.classNames, locale = _a.locale, labelWeekNumber = _a.labels.labelWeekNumber, formatWeekNumber = _a.formatters.formatWeekNumber;
    var content = formatWeekNumber(Number(weekNumber), {
        locale: locale
    });
    if (!onWeekNumberClick) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
            className: classNames.weeknumber,
            style: styles.weeknumber,
            children: content
        });
    }
    var label = labelWeekNumber(Number(weekNumber), {
        locale: locale
    });
    var handleClick = function(e) {
        onWeekNumberClick(weekNumber, dates, e);
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Button, {
        name: "week-number",
        "aria-label": label,
        className: classNames.weeknumber,
        style: styles.weeknumber,
        onClick: handleClick,
        children: content
    });
}
 function Row(props) {
    var _a, _b;
    var _c = useDayPicker(), styles = _c.styles, classNames = _c.classNames, showWeekNumber = _c.showWeekNumber, components = _c.components;
    var DayComponent = (_a = components === null || components === void 0 ? void 0 : components.Day) !== null && _a !== void 0 ? _a : Day;
    var WeeknumberComponent = (_b = components === null || components === void 0 ? void 0 : components.WeekNumber) !== null && _b !== void 0 ? _b : WeekNumber;
    var weekNumberCell;
    if (showWeekNumber) {
        weekNumberCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
            className: classNames.cell,
            style: styles.cell,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(WeeknumberComponent, {
                number: props.weekNumber,
                dates: props.dates
            })
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
        className: classNames.row,
        style: styles.row,
        children: [
            weekNumberCell,
            props.dates.map(function(date) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                    className: classNames.cell,
                    style: styles.cell,
                    role: "presentation",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DayComponent, {
                        displayMonth: props.displayMonth,
                        date: date
                    })
                }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getUnixTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUnixTime"])(date));
            })
        ]
    });
}
 function daysToMonthWeeks(fromDate, toDate, options) {
    var toWeek = (options === null || options === void 0 ? void 0 : options.ISOWeek) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfISOWeek"])(toDate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfWeek"])(toDate, options);
    var fromWeek = (options === null || options === void 0 ? void 0 : options.ISOWeek) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfISOWeek"])(fromDate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(fromDate, options);
    var nOfDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(toWeek, fromWeek);
    var days = [];
    for(var i = 0; i <= nOfDays; i++){
        days.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(fromWeek, i));
    }
    var weeksInMonth = days.reduce(function(result, date) {
        var weekNumber = (options === null || options === void 0 ? void 0 : options.ISOWeek) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getISOWeek"])(date) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeek$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeek"])(date, options);
        var existingWeek = result.find(function(value) {
            return value.weekNumber === weekNumber;
        });
        if (existingWeek) {
            existingWeek.dates.push(date);
            return result;
        }
        result.push({
            weekNumber: weekNumber,
            dates: [
                date
            ]
        });
        return result;
    }, []);
    return weeksInMonth;
}



 function getMonthWeeks(month, options) {
    var weeksInMonth = daysToMonthWeeks((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(month), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfMonth"])(month), options);
    if (options === null || options === void 0 ? void 0 : options.useFixedWeeks) {
        
        var nrOfMonthWeeks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeeksInMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeeksInMonth"])(month, options);
        if (nrOfMonthWeeks < 6) {
            var lastWeek = weeksInMonth[weeksInMonth.length - 1];
            var lastDate = lastWeek.dates[lastWeek.dates.length - 1];
            var toDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addWeeks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addWeeks"])(lastDate, 6 - nrOfMonthWeeks);
            var extraWeeks = daysToMonthWeeks((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$addWeeks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addWeeks"])(lastDate, 1), toDate, options);
            weeksInMonth.push.apply(weeksInMonth, extraWeeks);
        }
    }
    return weeksInMonth;
}
 function Table(props) {
    var _a, _b, _c;
    var _d = useDayPicker(), locale = _d.locale, classNames = _d.classNames, styles = _d.styles, hideHead = _d.hideHead, fixedWeeks = _d.fixedWeeks, components = _d.components, weekStartsOn = _d.weekStartsOn, firstWeekContainsDate = _d.firstWeekContainsDate, ISOWeek = _d.ISOWeek;
    var weeks = getMonthWeeks(props.displayMonth, {
        useFixedWeeks: Boolean(fixedWeeks),
        ISOWeek: ISOWeek,
        locale: locale,
        weekStartsOn: weekStartsOn,
        firstWeekContainsDate: firstWeekContainsDate
    });
    var HeadComponent = (_a = components === null || components === void 0 ? void 0 : components.Head) !== null && _a !== void 0 ? _a : Head;
    var RowComponent = (_b = components === null || components === void 0 ? void 0 : components.Row) !== null && _b !== void 0 ? _b : Row;
    var FooterComponent = (_c = components === null || components === void 0 ? void 0 : components.Footer) !== null && _c !== void 0 ? _c : Footer;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("table", {
        id: props.id,
        className: classNames.table,
        style: styles.table,
        role: "grid",
        "aria-labelledby": props['aria-labelledby'],
        children: [
            !hideHead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HeadComponent, {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
                className: classNames.tbody,
                style: styles.tbody,
                children: weeks.map(function(week) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RowComponent, {
                        displayMonth: props.displayMonth,
                        dates: week.dates,
                        weekNumber: week.weekNumber
                    }, week.weekNumber);
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FooterComponent, {
                displayMonth: props.displayMonth
            })
        ]
    });
}










   




















































 function canUseDOM() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}























 var useIsomorphicLayoutEffect = canUseDOM() ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
var serverHandoffComplete = false;
var id = 0;
function genId() {
    return "react-day-picker-".concat(++id);
}
function useId(providedId) {
    
    
    var _a;
    
    
    var initialId = providedId !== null && providedId !== void 0 ? providedId : serverHandoffComplete ? genId() : null;
    var _b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialId), id = _b[0], setId = _b[1];
    useIsomorphicLayoutEffect({
        "useId.useIsomorphicLayoutEffect": function() {
            if (id === null) {
                
                
                
                
                setId(genId());
            }
        
        }
    }["useId.useIsomorphicLayoutEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useId.useEffect": function() {
            if (serverHandoffComplete === false) {
                
                
                
                serverHandoffComplete = true;
            }
        }
    }["useId.useEffect"], []);
    return (_a = providedId !== null && providedId !== void 0 ? providedId : id) !== null && _a !== void 0 ? _a : undefined;
}
 function Month(props) {
    var _a;
    var _b;
    var dayPicker = useDayPicker();
    var dir = dayPicker.dir, classNames = dayPicker.classNames, styles = dayPicker.styles, components = dayPicker.components;
    var displayMonths = useNavigation().displayMonths;
    var captionId = useId(dayPicker.id ? "".concat(dayPicker.id, "-").concat(props.displayIndex) : undefined);
    var tableId = dayPicker.id ? "".concat(dayPicker.id, "-grid-").concat(props.displayIndex) : undefined;
    var className = [
        classNames.month
    ];
    var style = styles.month;
    var isStart = props.displayIndex === 0;
    var isEnd = props.displayIndex === displayMonths.length - 1;
    var isCenter = !isStart && !isEnd;
    if (dir === 'rtl') {
        _a = [
            isStart,
            isEnd
        ], isEnd = _a[0], isStart = _a[1];
    }
    if (isStart) {
        className.push(classNames.caption_start);
        style = __assign(__assign({}, style), styles.caption_start);
    }
    if (isEnd) {
        className.push(classNames.caption_end);
        style = __assign(__assign({}, style), styles.caption_end);
    }
    if (isCenter) {
        className.push(classNames.caption_between);
        style = __assign(__assign({}, style), styles.caption_between);
    }
    var CaptionComponent = (_b = components === null || components === void 0 ? void 0 : components.Caption) !== null && _b !== void 0 ? _b : Caption;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: className.join(' '),
        style: style,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CaptionComponent, {
                id: captionId,
                displayMonth: props.displayMonth,
                displayIndex: props.displayIndex
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Table, {
                id: tableId,
                "aria-labelledby": captionId,
                displayMonth: props.displayMonth
            })
        ]
    }, props.displayIndex);
}


 function Months(props) {
    var _a = useDayPicker(), classNames = _a.classNames, styles = _a.styles;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: classNames.months,
        style: styles.months,
        children: props.children
    });
}
 function Root(_a) {
    var _b, _c;
    var initialProps = _a.initialProps;
    var dayPicker = useDayPicker();
    var focusContext = useFocusContext();
    var navigation = useNavigation();
    var _d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), hasInitialFocus = _d[0], setHasInitialFocus = _d[1];
    
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Root.useEffect": function() {
            if (!dayPicker.initialFocus) return;
            if (!focusContext.focusTarget) return;
            if (hasInitialFocus) return;
            focusContext.focus(focusContext.focusTarget);
            setHasInitialFocus(true);
        }
    }["Root.useEffect"], [
        dayPicker.initialFocus,
        hasInitialFocus,
        focusContext.focus,
        focusContext.focusTarget,
        focusContext
    ]);
    
    var classNames = [
        dayPicker.classNames.root,
        dayPicker.className
    ];
    if (dayPicker.numberOfMonths > 1) {
        classNames.push(dayPicker.classNames.multiple_months);
    }
    if (dayPicker.showWeekNumber) {
        classNames.push(dayPicker.classNames.with_weeknumber);
    }
    var style = __assign(__assign({}, dayPicker.styles.root), dayPicker.style);
    var dataAttributes = Object.keys(initialProps).filter(function(key) {
        return key.startsWith('data-');
    }).reduce(function(attrs, key) {
        var _a;
        return __assign(__assign({}, attrs), (_a = {}, _a[key] = initialProps[key], _a));
    }, {});
    var MonthsComponent = (_c = (_b = initialProps.components) === null || _b === void 0 ? void 0 : _b.Months) !== null && _c !== void 0 ? _c : Months;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", __assign({
        className: classNames.join(' '),
        style: style,
        dir: dayPicker.dir,
        id: dayPicker.id,
        nonce: initialProps.nonce,
        title: initialProps.title,
        lang: initialProps.lang
    }, dataAttributes, {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MonthsComponent, {
            children: navigation.displayMonths.map(function(month, i) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Month, {
                    displayIndex: i,
                    displayMonth: month
                }, i);
            })
        })
    }));
}
 function RootProvider(props) {
    var children = props.children, initialProps = __rest(props, [
        "children"
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DayPickerProvider, {
        initialProps: initialProps,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(NavigationProvider, {
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectSingleProvider, {
                initialProps: initialProps,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectMultipleProvider, {
                    initialProps: initialProps,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectRangeProvider, {
                        initialProps: initialProps,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ModifiersProvider, {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FocusProvider, {
                                children: children
                            })
                        })
                    })
                })
            })
        })
    });
}






















































































 function DayPicker(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RootProvider, __assign({}, props, {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Root, {
            initialProps: props
        })
    }));
}
 function isValidDate(day) {
    return !isNaN(day.getTime());
}
 function useInput(options) {
    if (options === void 0) {
        options = {};
    }
    var _a = options.locale, locale = _a === void 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enUS"] : _a, required = options.required, _b = options.format, format$1 = _b === void 0 ? 'PP' : _b, defaultSelected = options.defaultSelected, _c = options.today, today = _c === void 0 ? new Date() : _c;
    var _d = parseFromToProps(options), fromDate = _d.fromDate, toDate = _d.toDate;
    
    var parseValue = function(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$parse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(value, format$1, today, {
            locale: locale
        });
    };
    
    var _e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSelected !== null && defaultSelected !== void 0 ? defaultSelected : today), month = _e[0], setMonth = _e[1];
    var _f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSelected), selectedDay = _f[0], setSelectedDay = _f[1];
    var defaultInputValue = defaultSelected ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(defaultSelected, format$1, {
        locale: locale
    }) : '';
    var _g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultInputValue), inputValue = _g[0], setInputValue = _g[1];
    var reset = function() {
        setSelectedDay(defaultSelected);
        setMonth(defaultSelected !== null && defaultSelected !== void 0 ? defaultSelected : today);
        setInputValue(defaultInputValue !== null && defaultInputValue !== void 0 ? defaultInputValue : '');
    };
    var setSelected = function(date) {
        setSelectedDay(date);
        setMonth(date !== null && date !== void 0 ? date : today);
        setInputValue(date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, format$1, {
            locale: locale
        }) : '');
    };
    var handleDayClick = function(day, _a) {
        var selected = _a.selected;
        if (!required && selected) {
            setSelectedDay(undefined);
            setInputValue('');
            return;
        }
        setSelectedDay(day);
        setInputValue(day ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, format$1, {
            locale: locale
        }) : '');
    };
    var handleMonthChange = function(month) {
        setMonth(month);
    };
    
    
    
    var handleChange = function(e) {
        setInputValue(e.target.value);
        var day = parseValue(e.target.value);
        var isBefore = fromDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(fromDate, day) > 0;
        var isAfter = toDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(day, toDate) > 0;
        if (!isValidDate(day) || isBefore || isAfter) {
            setSelectedDay(undefined);
            return;
        }
        setSelectedDay(day);
        setMonth(day);
    };
    
    
    var handleBlur = function(e) {
        var day = parseValue(e.target.value);
        if (!isValidDate(day)) {
            reset();
        }
    };
    
    
    var handleFocus = function(e) {
        if (!e.target.value) {
            reset();
            return;
        }
        var day = parseValue(e.target.value);
        if (isValidDate(day)) {
            setMonth(day);
        }
    };
    var dayPickerProps = {
        month: month,
        onDayClick: handleDayClick,
        onMonthChange: handleMonthChange,
        selected: selectedDay,
        locale: locale,
        fromDate: fromDate,
        toDate: toDate,
        today: today
    };
    var inputProps = {
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        value: inputValue,
        placeholder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), format$1, {
            locale: locale
        })
    };
    return {
        dayPickerProps: dayPickerProps,
        inputProps: inputProps,
        reset: reset,
        setSelected: setSelected
    };
}
 function isDayPickerDefault(props) {
    return props.mode === undefined || props.mode === 'default';
}
;
 
}),
]);

