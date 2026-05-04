module.exports = [
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["formatDistance", () => formatDistance]);
    const formatDistanceLocale = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds",
      },
      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds",
      },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes",
      },
      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes",
      },
      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours",
      },
      xHours: {
        one: "1 hour",
        other: "{{count}} hours",
      },
      xDays: {
        one: "1 day",
        other: "{{count}} days",
      },
      aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks",
      },
      xWeeks: {
        one: "1 week",
        other: "{{count}} weeks",
      },
      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months",
      },
      xMonths: {
        one: "1 month",
        other: "{{count}} months",
      },
      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years",
      },
      xYears: {
        one: "1 year",
        other: "{{count}} years",
      },
      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years",
      },
      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years",
      },
    };
    const formatDistance = (token, count, options) => {
      let result;
      const tokenValue = formatDistanceLocale[token];
      if (typeof tokenValue === "string") {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace("{{count}}", count.toString());
      }
      if (options?.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return "in " + result;
        } else {
          return result + " ago";
        }
      }
      return result;
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["buildFormatLongFn", () => buildFormatLongFn]);
    function buildFormatLongFn(args) {
      return (options = {}) => {
        const width = options.width ? String(options.width) : args.defaultWidth;
        const format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/formatLong.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["formatLong", () => formatLong]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildFormatLongFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs [app-ssr] (ecmascript)",
      );
    const dateFormats = {
      full: "EEEE, MMMM do, y",
      long: "MMMM do, y",
      medium: "MMM d, y",
      short: "MM/dd/yyyy",
    };
    const timeFormats = {
      full: "h:mm:ss a zzzz",
      long: "h:mm:ss a z",
      medium: "h:mm:ss a",
      short: "h:mm a",
    };
    const dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: "{{date}}, {{time}}",
      short: "{{date}}, {{time}}",
    };
    const formatLong = {
      date: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildFormatLongFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildFormatLongFn"
      ])({
        formats: dateFormats,
        defaultWidth: "full",
      }),
      time: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildFormatLongFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildFormatLongFn"
      ])({
        formats: timeFormats,
        defaultWidth: "full",
      }),
      dateTime: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildFormatLongFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildFormatLongFn"
      ])({
        formats: dateTimeFormats,
        defaultWidth: "full",
      }),
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["formatRelative", () => formatRelative]);
    const formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
    const formatRelative = (token, _date, _baseDate, _options) =>
      formatRelativeLocale[token];
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["buildLocalizeFn", () => buildLocalizeFn]);
    function buildLocalizeFn(args) {
      return (value, options) => {
        const context = options?.context
          ? String(options.context)
          : "standalone";
        let valuesArray;
        if (context === "formatting" && args.formattingValues) {
          const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          const width = options?.width ? String(options.width) : defaultWidth;
          valuesArray =
            args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          const defaultWidth = args.defaultWidth;
          const width = options?.width
            ? String(options.width)
            : args.defaultWidth;
          valuesArray = args.values[width] || args.values[defaultWidth];
        }
        const index = args.argumentCallback
          ? args.argumentCallback(value)
          : value;

        return valuesArray[index];
      };
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/localize.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["localize", () => localize]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildLocalizeFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs [app-ssr] (ecmascript)",
      );
    const eraValues = {
      narrow: ["B", "A"],
      abbreviated: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    };
    const quarterValues = {
      narrow: ["1", "2", "3", "4"],
      abbreviated: ["Q1", "Q2", "Q3", "Q4"],
      wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
    };

    const monthValues = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
    const dayValues = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
    const dayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
    };
    const formattingDayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
    };
    const ordinalNumber = (dirtyNumber, _options) => {
      const number = Number(dirtyNumber);

      const rem100 = number % 100;
      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "rd";
        }
      }
      return number + "th";
    };
    const localize = {
      ordinalNumber,
      era: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildLocalizeFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildLocalizeFn"
      ])({
        values: eraValues,
        defaultWidth: "wide",
      }),
      quarter: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildLocalizeFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildLocalizeFn"
      ])({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: (quarter) => quarter - 1,
      }),
      month: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildLocalizeFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildLocalizeFn"
      ])({
        values: monthValues,
        defaultWidth: "wide",
      }),
      day: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildLocalizeFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildLocalizeFn"
      ])({
        values: dayValues,
        defaultWidth: "wide",
      }),
      dayPeriod: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildLocalizeFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildLocalizeFn"
      ])({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide",
      }),
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildMatchFn.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["buildMatchFn", () => buildMatchFn]);
    function buildMatchFn(args) {
      return (string, options = {}) => {
        const width = options.width;
        const matchPattern =
          (width && args.matchPatterns[width]) ||
          args.matchPatterns[args.defaultMatchWidth];
        const matchResult = string.match(matchPattern);
        if (!matchResult) {
          return null;
        }
        const matchedString = matchResult[0];
        const parsePatterns =
          (width && args.parsePatterns[width]) ||
          args.parsePatterns[args.defaultParseWidth];
        const key = Array.isArray(parsePatterns)
          ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
          : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
        let value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        const rest = string.slice(matchedString.length);
        return {
          value,
          rest,
        };
      };
    }
    function findKey(object, predicate) {
      for (const key in object) {
        if (
          Object.prototype.hasOwnProperty.call(object, key) &&
          predicate(object[key])
        ) {
          return key;
        }
      }
      return undefined;
    }
    function findIndex(array, predicate) {
      for (let key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }
      return undefined;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["buildMatchPatternFn", () => buildMatchPatternFn]);
    function buildMatchPatternFn(args) {
      return (string, options = {}) => {
        const matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        const matchedString = matchResult[0];
        const parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        let value = args.valueCallback
          ? args.valueCallback(parseResult[0])
          : parseResult[0];

        value = options.valueCallback ? options.valueCallback(value) : value;
        const rest = string.slice(matchedString.length);
        return {
          value,
          rest,
        };
      };
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/match.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["match", () => match]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildMatchFn.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchPatternFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs [app-ssr] (ecmascript)",
      );
    const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    const parseOrdinalNumberPattern = /\d+/i;
    const matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i,
    };
    const parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i],
    };
    const matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i,
    };
    const parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i],
    };
    const matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
    };
    const parseMonthPatterns = {
      narrow: [
        /^j/i,
        /^f/i,
        /^m/i,
        /^a/i,
        /^m/i,
        /^j/i,
        /^j/i,
        /^a/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i,
      ],
      any: [
        /^ja/i,
        /^f/i,
        /^mar/i,
        /^ap/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^au/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i,
      ],
    };
    const matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
    };
    const parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
    };
    const matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
    };
    const parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i,
      },
    };
    const match = {
      ordinalNumber: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchPatternFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildMatchPatternFn"
      ])({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: (value) => parseInt(value, 10),
      }),
      era: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildMatchFn"
      ])({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any",
      }),
      quarter: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildMatchFn"
      ])({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: (index) => index + 1,
      }),
      month: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildMatchFn"
      ])({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any",
      }),
      day: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildMatchFn"
      ])({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any",
      }),
      dayPeriod: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$_lib$2f$buildMatchFn$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "buildMatchFn"
      ])({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any",
      }),
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "enUS",
      () => enUS,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$formatDistance$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$formatLong$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/formatLong.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$formatRelative$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$localize$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/localize.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$match$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US/_lib/match.mjs [app-ssr] (ecmascript)",
      );
    const enUS = {
      code: "en-US",
      formatDistance:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$formatDistance$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "formatDistance"
        ],
      formatLong:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$formatLong$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "formatLong"
        ],
      formatRelative:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$formatRelative$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "formatRelative"
        ],
      localize:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$localize$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "localize"
        ],
      match:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2f$_lib$2f$match$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "match"
        ],
      options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1,
      },
    };
    const __TURBOPACK__default__export__ = enUS;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US.mjs [app-ssr] (ecmascript) <export enUS as defaultLocale>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "defaultLocale",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "enUS"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US.mjs [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/defaultOptions.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "getDefaultOptions",
      () => getDefaultOptions,
      "setDefaultOptions",
      () => setDefaultOptions,
    ]);
    let defaultOptions = {};
    function getDefaultOptions() {
      return defaultOptions;
    }
    function setDefaultOptions(newOptions) {
      defaultOptions = newOptions;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constants.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "daysInWeek",
      () => daysInWeek,
      "daysInYear",
      () => daysInYear,
      "maxTime",
      () => maxTime,
      "millisecondsInDay",
      () => millisecondsInDay,
      "millisecondsInHour",
      () => millisecondsInHour,
      "millisecondsInMinute",
      () => millisecondsInMinute,
      "millisecondsInSecond",
      () => millisecondsInSecond,
      "millisecondsInWeek",
      () => millisecondsInWeek,
      "minTime",
      () => minTime,
      "minutesInDay",
      () => minutesInDay,
      "minutesInHour",
      () => minutesInHour,
      "minutesInMonth",
      () => minutesInMonth,
      "minutesInYear",
      () => minutesInYear,
      "monthsInQuarter",
      () => monthsInQuarter,
      "monthsInYear",
      () => monthsInYear,
      "quartersInYear",
      () => quartersInYear,
      "secondsInDay",
      () => secondsInDay,
      "secondsInHour",
      () => secondsInHour,
      "secondsInMinute",
      () => secondsInMinute,
      "secondsInMonth",
      () => secondsInMonth,
      "secondsInQuarter",
      () => secondsInQuarter,
      "secondsInWeek",
      () => secondsInWeek,
      "secondsInYear",
      () => secondsInYear,
    ]);
    const daysInWeek = 7;
    const daysInYear = 365.2425;
    const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;
    const minTime = -maxTime;
    const millisecondsInWeek = 604800000;
    const millisecondsInDay = 86400000;
    const millisecondsInMinute = 60000;
    const millisecondsInHour = 3600000;
    const millisecondsInSecond = 1000;
    const minutesInYear = 525600;
    const minutesInMonth = 43200;
    const minutesInDay = 1440;
    const minutesInHour = 60;
    const monthsInQuarter = 3;
    const monthsInYear = 12;
    const quartersInYear = 4;
    const secondsInHour = 3600;
    const secondsInMinute = 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInWeek = secondsInDay * 7;
    const secondsInYear = secondsInDay * daysInYear;
    const secondsInMonth = secondsInYear / 12;
    const secondsInQuarter = secondsInMonth * 3;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "toDate",
      () => toDate,
    ]);
    function toDate(argument) {
      const argStr = Object.prototype.toString.call(argument);

      if (
        argument instanceof Date ||
        (typeof argument === "object" && argStr === "[object Date]")
      ) {
        return new argument.constructor(+argument);
      } else if (
        typeof argument === "number" ||
        argStr === "[object Number]" ||
        typeof argument === "string" ||
        argStr === "[object String]"
      ) {
        return new Date(argument);
      } else {
        return new Date(NaN);
      }
    }
    const __TURBOPACK__default__export__ = toDate;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfDay.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "startOfDay",
      () => startOfDay,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function startOfDay(date) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }
    const __TURBOPACK__default__export__ = startOfDay;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "getTimezoneOffsetInMilliseconds",
      () => getTimezoneOffsetInMilliseconds,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function getTimezoneOffsetInMilliseconds(date) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const utcDate = new Date(
        Date.UTC(
          _date.getFullYear(),
          _date.getMonth(),
          _date.getDate(),
          _date.getHours(),
          _date.getMinutes(),
          _date.getSeconds(),
          _date.getMilliseconds(),
        ),
      );
      utcDate.setUTCFullYear(_date.getFullYear());
      return +date - +utcDate;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/differenceInCalendarDays.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "differenceInCalendarDays",
      () => differenceInCalendarDays,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constants.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfDay.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$getTimezoneOffsetInMilliseconds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs [app-ssr] (ecmascript)",
      );
    function differenceInCalendarDays(dateLeft, dateRight) {
      const startOfDayLeft = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfDay"
      ])(dateLeft);
      const startOfDayRight = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfDay"
      ])(dateRight);
      const timestampLeft =
        +startOfDayLeft -
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$getTimezoneOffsetInMilliseconds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getTimezoneOffsetInMilliseconds"
        ])(startOfDayLeft);
      const timestampRight =
        +startOfDayRight -
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$getTimezoneOffsetInMilliseconds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getTimezoneOffsetInMilliseconds"
        ])(startOfDayRight);

      return Math.round(
        (timestampLeft - timestampRight) /
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "millisecondsInDay"
          ],
      );
    }
    const __TURBOPACK__default__export__ = differenceInCalendarDays;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constructFrom.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "constructFrom",
      () => constructFrom,
      "default",
      () => __TURBOPACK__default__export__,
    ]);
    function constructFrom(date, value) {
      if (date instanceof Date) {
        return new date.constructor(value);
      } else {
        return new Date(value);
      }
    }
    const __TURBOPACK__default__export__ = constructFrom;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfYear.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "startOfYear",
      () => startOfYear,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constructFrom.mjs [app-ssr] (ecmascript)",
      );
    function startOfYear(date) {
      const cleanDate = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      _date.setFullYear(cleanDate.getFullYear(), 0, 1);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }
    const __TURBOPACK__default__export__ = startOfYear;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getDayOfYear.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "getDayOfYear",
      () => getDayOfYear,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/differenceInCalendarDays.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function getDayOfYear(date) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const diff = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "differenceInCalendarDays"
      ])(
        _date,
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "startOfYear"
        ])(_date),
      );
      const dayOfYear = diff + 1;
      return dayOfYear;
    }
    const __TURBOPACK__default__export__ = getDayOfYear;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeek.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "startOfWeek",
      () => startOfWeek,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/defaultOptions.mjs [app-ssr] (ecmascript)",
      );
    function startOfWeek(date, options) {
      const defaultOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDefaultOptions"
      ])();
      const weekStartsOn =
        options?.weekStartsOn ??
        options?.locale?.options?.weekStartsOn ??
        defaultOptions.weekStartsOn ??
        defaultOptions.locale?.options?.weekStartsOn ??
        0;
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const day = _date.getDay();
      const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      _date.setDate(_date.getDate() - diff);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }
    const __TURBOPACK__default__export__ = startOfWeek;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeek.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "startOfISOWeek",
      () => startOfISOWeek,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeek.mjs [app-ssr] (ecmascript)",
      );
    function startOfISOWeek(date) {
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfWeek"
      ])(date, {
        weekStartsOn: 1,
      });
    }
    const __TURBOPACK__default__export__ = startOfISOWeek;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getISOWeekYear.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "getISOWeekYear",
      () => getISOWeekYear,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constructFrom.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function getISOWeekYear(date) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const year = _date.getFullYear();
      const fourthOfJanuaryOfNextYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
      const startOfNextYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfISOWeek"
      ])(fourthOfJanuaryOfNextYear);
      const fourthOfJanuaryOfThisYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
      const startOfThisYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfISOWeek"
      ])(fourthOfJanuaryOfThisYear);
      if (_date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (_date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }
    const __TURBOPACK__default__export__ = getISOWeekYear;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeekYear.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "startOfISOWeekYear",
      () => startOfISOWeekYear,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getISOWeekYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constructFrom.mjs [app-ssr] (ecmascript)",
      );
    function startOfISOWeekYear(date) {
      const year = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getISOWeekYear"
      ])(date);
      const fourthOfJanuary = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      fourthOfJanuary.setFullYear(year, 0, 4);
      fourthOfJanuary.setHours(0, 0, 0, 0);
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfISOWeek"
      ])(fourthOfJanuary);
    }
    const __TURBOPACK__default__export__ = startOfISOWeekYear;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getISOWeek.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "getISOWeek",
      () => getISOWeek,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constants.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfISOWeekYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function getISOWeek(date) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const diff =
        +(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "startOfISOWeek"
        ])(_date) -
        +(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfISOWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "startOfISOWeekYear"
        ])(_date);

      return (
        Math.round(
          diff /
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "millisecondsInWeek"
            ],
        ) + 1
      );
    }
    const __TURBOPACK__default__export__ = getISOWeek;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeekYear.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "getWeekYear",
      () => getWeekYear,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constructFrom.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/defaultOptions.mjs [app-ssr] (ecmascript)",
      );
    function getWeekYear(date, options) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const year = _date.getFullYear();
      const defaultOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDefaultOptions"
      ])();
      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;
      const firstWeekOfNextYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setHours(0, 0, 0, 0);
      const startOfNextYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfWeek"
      ])(firstWeekOfNextYear, options);
      const firstWeekOfThisYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setHours(0, 0, 0, 0);
      const startOfThisYear = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfWeek"
      ])(firstWeekOfThisYear, options);
      if (_date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (_date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }
    const __TURBOPACK__default__export__ = getWeekYear;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeekYear.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "startOfWeekYear",
      () => startOfWeekYear,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constructFrom.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeekYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/defaultOptions.mjs [app-ssr] (ecmascript)",
      );
    function startOfWeekYear(date, options) {
      const defaultOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDefaultOptions"
      ])();
      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;
      const year = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getWeekYear"
      ])(date, options);
      const firstWeek = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constructFrom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "constructFrom"
      ])(date, 0);
      firstWeek.setFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setHours(0, 0, 0, 0);
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "startOfWeek"
      ])(firstWeek, options);
      return _date;
    }
    const __TURBOPACK__default__export__ = startOfWeekYear;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeek.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "getWeek",
      () => getWeek,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/constants.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/startOfWeekYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function getWeek(date, options) {
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      const diff =
        +(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "startOfWeek"
        ])(_date, options) -
        +(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$startOfWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "startOfWeekYear"
        ])(_date, options);

      return (
        Math.round(
          diff /
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "millisecondsInWeek"
            ],
        ) + 1
      );
    }
    const __TURBOPACK__default__export__ = getWeek;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/addLeadingZeros.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["addLeadingZeros", () => addLeadingZeros]);
    function addLeadingZeros(number, targetLength) {
      const sign = number < 0 ? "-" : "";
      const output = Math.abs(number).toString().padStart(targetLength, "0");
      return sign + output;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/format/lightFormatters.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["lightFormatters", () => lightFormatters]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/addLeadingZeros.mjs [app-ssr] (ecmascript)",
      );
    const lightFormatters = {
      y(date, token) {
        const signedYear = date.getFullYear();

        const year = signedYear > 0 ? signedYear : 1 - signedYear;
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(token === "yy" ? year % 100 : year, token.length);
      },

      M(date, token) {
        const month = date.getMonth();
        return token === "M"
          ? String(month + 1)
          : (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(month + 1, 2);
      },

      d(date, token) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(date.getDate(), token.length);
      },

      a(date, token) {
        const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
        switch (token) {
          case "a":
          case "aa":
            return dayPeriodEnumValue.toUpperCase();
          case "aaa":
            return dayPeriodEnumValue;
          case "aaaaa":
            return dayPeriodEnumValue[0];
          case "aaaa":
          default:
            return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
        }
      },

      h(date, token) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(date.getHours() % 12 || 12, token.length);
      },

      H(date, token) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(date.getHours(), token.length);
      },

      m(date, token) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(date.getMinutes(), token.length);
      },

      s(date, token) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(date.getSeconds(), token.length);
      },

      S(date, token) {
        const numberOfDigits = token.length;
        const milliseconds = date.getMilliseconds();
        const fractionalSeconds = Math.trunc(
          milliseconds * Math.pow(10, numberOfDigits - 3),
        );
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(fractionalSeconds, token.length);
      },
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/format/formatters.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["formatters", () => formatters]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getDayOfYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getDayOfYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getISOWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getISOWeekYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeek.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/getWeekYear.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/addLeadingZeros.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/format/lightFormatters.mjs [app-ssr] (ecmascript)",
      );
    const dayPeriodEnum = {
      am: "am",
      pm: "pm",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    };
    const formatters = {
      G: function (date, token, localize) {
        const era = date.getFullYear() > 0 ? 1 : 0;
        switch (token) {
          case "G":
          case "GG":
          case "GGG":
            return localize.era(era, {
              width: "abbreviated",
            });

          case "GGGGG":
            return localize.era(era, {
              width: "narrow",
            });

          case "GGGG":
          default:
            return localize.era(era, {
              width: "wide",
            });
        }
      },

      y: function (date, token, localize) {
        if (token === "yo") {
          const signedYear = date.getFullYear();

          const year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: "year",
          });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].y(date, token);
      },

      Y: function (date, token, localize, options) {
        const signedWeekYear = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getWeekYear"
        ])(date, options);

        const weekYear =
          signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

        if (token === "YY") {
          const twoDigitYear = weekYear % 100;
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "addLeadingZeros"
          ])(twoDigitYear, 2);
        }

        if (token === "Yo") {
          return localize.ordinalNumber(weekYear, {
            unit: "year",
          });
        }

        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(weekYear, token.length);
      },

      R: function (date, token) {
        const isoWeekYear = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeekYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getISOWeekYear"
        ])(date);

        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(isoWeekYear, token.length);
      },

      u: function (date, token) {
        const year = date.getFullYear();
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(year, token.length);
      },

      Q: function (date, token, localize) {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        switch (token) {
          case "Q":
            return String(quarter);

          case "QQ":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(quarter, 2);

          case "Qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter",
            });

          case "QQQ":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "formatting",
            });

          case "QQQQQ":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "formatting",
            });

          case "QQQQ":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      q: function (date, token, localize) {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        switch (token) {
          case "q":
            return String(quarter);

          case "qq":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(quarter, 2);

          case "qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter",
            });

          case "qqq":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "standalone",
            });

          case "qqqqq":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "standalone",
            });

          case "qqqq":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "standalone",
            });
        }
      },

      M: function (date, token, localize) {
        const month = date.getMonth();
        switch (token) {
          case "M":
          case "MM":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "lightFormatters"
            ].M(date, token);

          case "Mo":
            return localize.ordinalNumber(month + 1, {
              unit: "month",
            });

          case "MMM":
            return localize.month(month, {
              width: "abbreviated",
              context: "formatting",
            });

          case "MMMMM":
            return localize.month(month, {
              width: "narrow",
              context: "formatting",
            });

          case "MMMM":
          default:
            return localize.month(month, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      L: function (date, token, localize) {
        const month = date.getMonth();
        switch (token) {
          case "L":
            return String(month + 1);

          case "LL":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(month + 1, 2);

          case "Lo":
            return localize.ordinalNumber(month + 1, {
              unit: "month",
            });

          case "LLL":
            return localize.month(month, {
              width: "abbreviated",
              context: "standalone",
            });

          case "LLLLL":
            return localize.month(month, {
              width: "narrow",
              context: "standalone",
            });

          case "LLLL":
          default:
            return localize.month(month, {
              width: "wide",
              context: "standalone",
            });
        }
      },

      w: function (date, token, localize, options) {
        const week = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getWeek"
        ])(date, options);
        if (token === "wo") {
          return localize.ordinalNumber(week, {
            unit: "week",
          });
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(week, token.length);
      },

      I: function (date, token, localize) {
        const isoWeek = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getISOWeek$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getISOWeek"
        ])(date);
        if (token === "Io") {
          return localize.ordinalNumber(isoWeek, {
            unit: "week",
          });
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(isoWeek, token.length);
      },

      d: function (date, token, localize) {
        if (token === "do") {
          return localize.ordinalNumber(date.getDate(), {
            unit: "date",
          });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].d(date, token);
      },

      D: function (date, token, localize) {
        const dayOfYear = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$getDayOfYear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getDayOfYear"
        ])(date);
        if (token === "Do") {
          return localize.ordinalNumber(dayOfYear, {
            unit: "dayOfYear",
          });
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(dayOfYear, token.length);
      },

      E: function (date, token, localize) {
        const dayOfWeek = date.getDay();
        switch (token) {
          case "E":
          case "EE":
          case "EEE":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });

          case "EEEEE":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });

          case "EEEEEE":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });

          case "EEEE":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      e: function (date, token, localize, options) {
        const dayOfWeek = date.getDay();
        const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          case "e":
            return String(localDayOfWeek);

          case "ee":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(localDayOfWeek, 2);

          case "eo":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day",
            });
          case "eee":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });

          case "eeeee":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });

          case "eeeeee":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });

          case "eeee":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      c: function (date, token, localize, options) {
        const dayOfWeek = date.getDay();
        const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          case "c":
            return String(localDayOfWeek);

          case "cc":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(localDayOfWeek, token.length);

          case "co":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day",
            });
          case "ccc":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "standalone",
            });

          case "ccccc":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "standalone",
            });

          case "cccccc":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "standalone",
            });

          case "cccc":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "standalone",
            });
        }
      },

      i: function (date, token, localize) {
        const dayOfWeek = date.getDay();
        const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch (token) {
          case "i":
            return String(isoDayOfWeek);

          case "ii":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "addLeadingZeros"
            ])(isoDayOfWeek, token.length);

          case "io":
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: "day",
            });

          case "iii":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });

          case "iiiii":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });

          case "iiiiii":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });

          case "iiii":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      a: function (date, token, localize) {
        const hours = date.getHours();
        const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        switch (token) {
          case "a":
          case "aa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });
          case "aaa":
            return localize
              .dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              })
              .toLowerCase();
          case "aaaaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });
          case "aaaa":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      b: function (date, token, localize) {
        const hours = date.getHours();
        let dayPeriodEnumValue;
        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        }
        switch (token) {
          case "b":
          case "bb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });
          case "bbb":
            return localize
              .dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              })
              .toLowerCase();
          case "bbbbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });
          case "bbbb":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      B: function (date, token, localize) {
        const hours = date.getHours();
        let dayPeriodEnumValue;
        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }
        switch (token) {
          case "B":
          case "BB":
          case "BBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });
          case "BBBBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });
          case "BBBB":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      h: function (date, token, localize) {
        if (token === "ho") {
          let hours = date.getHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, {
            unit: "hour",
          });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].h(date, token);
      },

      H: function (date, token, localize) {
        if (token === "Ho") {
          return localize.ordinalNumber(date.getHours(), {
            unit: "hour",
          });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].H(date, token);
      },

      K: function (date, token, localize) {
        const hours = date.getHours() % 12;
        if (token === "Ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour",
          });
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(hours, token.length);
      },

      k: function (date, token, localize) {
        let hours = date.getHours();
        if (hours === 0) hours = 24;
        if (token === "ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour",
          });
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(hours, token.length);
      },

      m: function (date, token, localize) {
        if (token === "mo") {
          return localize.ordinalNumber(date.getMinutes(), {
            unit: "minute",
          });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].m(date, token);
      },

      s: function (date, token, localize) {
        if (token === "so") {
          return localize.ordinalNumber(date.getSeconds(), {
            unit: "second",
          });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].s(date, token);
      },

      S: function (date, token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$lightFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "lightFormatters"
        ].S(date, token);
      },

      X: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();
        if (timezoneOffset === 0) {
          return "Z";
        }
        switch (token) {
          case "X":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          case "XXXX":
          case "XX":
            return formatTimezone(timezoneOffset);

          case "XXXXX":
          case "XXX":
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },

      x: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();
        switch (token) {
          case "x":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          case "xxxx":
          case "xx":
            return formatTimezone(timezoneOffset);

          case "xxxxx":
          case "xxx":
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },

      O: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();
        switch (token) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");

          case "OOOO":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },

      z: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();
        switch (token) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");

          case "zzzz":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },

      t: function (date, token, _localize) {
        const timestamp = Math.trunc(date.getTime() / 1000);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(timestamp, token.length);
      },

      T: function (date, token, _localize) {
        const timestamp = date.getTime();
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(timestamp, token.length);
      },
    };
    function formatTimezoneShort(offset, delimiter = "") {
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = Math.trunc(absOffset / 60);
      const minutes = absOffset % 60;
      if (minutes === 0) {
        return sign + String(hours);
      }
      return (
        sign +
        String(hours) +
        delimiter +
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "addLeadingZeros"
        ])(minutes, 2)
      );
    }
    function formatTimezoneWithOptionalMinutes(offset, delimiter) {
      if (offset % 60 === 0) {
        const sign = offset > 0 ? "-" : "+";
        return (
          sign +
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "addLeadingZeros"
          ])(Math.abs(offset) / 60, 2)
        );
      }
      return formatTimezone(offset, delimiter);
    }
    function formatTimezone(offset, delimiter = "") {
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "addLeadingZeros"
      ])(Math.trunc(absOffset / 60), 2);
      const minutes = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$addLeadingZeros$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "addLeadingZeros"
      ])(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/format/longFormatters.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["longFormatters", () => longFormatters]);
    const dateLongFormatter = (pattern, formatLong) => {
      switch (pattern) {
        case "P":
          return formatLong.date({
            width: "short",
          });
        case "PP":
          return formatLong.date({
            width: "medium",
          });
        case "PPP":
          return formatLong.date({
            width: "long",
          });
        case "PPPP":
        default:
          return formatLong.date({
            width: "full",
          });
      }
    };
    const timeLongFormatter = (pattern, formatLong) => {
      switch (pattern) {
        case "p":
          return formatLong.time({
            width: "short",
          });
        case "pp":
          return formatLong.time({
            width: "medium",
          });
        case "ppp":
          return formatLong.time({
            width: "long",
          });
        case "pppp":
        default:
          return formatLong.time({
            width: "full",
          });
      }
    };
    const dateTimeLongFormatter = (pattern, formatLong) => {
      const matchResult = pattern.match(/(P+)(p+)?/) || [];
      const datePattern = matchResult[1];
      const timePattern = matchResult[2];
      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }
      let dateTimeFormat;
      switch (datePattern) {
        case "P":
          dateTimeFormat = formatLong.dateTime({
            width: "short",
          });
          break;
        case "PP":
          dateTimeFormat = formatLong.dateTime({
            width: "medium",
          });
          break;
        case "PPP":
          dateTimeFormat = formatLong.dateTime({
            width: "long",
          });
          break;
        case "PPPP":
        default:
          dateTimeFormat = formatLong.dateTime({
            width: "full",
          });
          break;
      }
      return dateTimeFormat
        .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
        .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
    };
    const longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter,
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/protectedTokens.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "isProtectedDayOfYearToken",
      () => isProtectedDayOfYearToken,
      "isProtectedWeekYearToken",
      () => isProtectedWeekYearToken,
      "warnOrThrowProtectedError",
      () => warnOrThrowProtectedError,
    ]);
    const dayOfYearTokenRE = /^D+$/;
    const weekYearTokenRE = /^Y+$/;
    const throwTokens = ["D", "DD", "YY", "YYYY"];
    function isProtectedDayOfYearToken(token) {
      return dayOfYearTokenRE.test(token);
    }
    function isProtectedWeekYearToken(token) {
      return weekYearTokenRE.test(token);
    }
    function warnOrThrowProtectedError(token, format, input) {
      const _message = message(token, format, input);
      console.warn(_message);
      if (throwTokens.includes(token)) throw new RangeError(_message);
    }
    function message(token, format, input) {
      const subject = token[0] === "Y" ? "years" : "days of the month";
      return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isDate.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "isDate",
      () => isDate,
    ]);
    function isDate(value) {
      return (
        value instanceof Date ||
        (typeof value === "object" &&
          Object.prototype.toString.call(value) === "[object Date]")
      );
    }
    const __TURBOPACK__default__export__ = isDate;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isValid.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "isValid",
      () => isValid,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isDate.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    function isValid(date) {
      if (
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isDate"
        ])(date) &&
        typeof date !== "number"
      ) {
        return false;
      }
      const _date = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      return !isNaN(Number(_date));
    }
    const __TURBOPACK__default__export__ = isValid;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "format",
      () => format,
      "formatDate",
      () => format,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__enUS__as__defaultLocale$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/locale/en-US.mjs [app-ssr] (ecmascript) <export enUS as defaultLocale>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/defaultOptions.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/format/formatters.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$longFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/format/longFormatters.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$protectedTokens$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/_lib/protectedTokens.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/isValid.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/toDate.mjs [app-ssr] (ecmascript)",
      );
    const formattingTokensRegExp =
      /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    function format(date, formatStr, options) {
      const defaultOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$defaultOptions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDefaultOptions"
      ])();
      const locale =
        options?.locale ??
        defaultOptions.locale ??
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__enUS__as__defaultLocale$3e$__[
          "defaultLocale"
        ];
      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;
      const weekStartsOn =
        options?.weekStartsOn ??
        options?.locale?.options?.weekStartsOn ??
        defaultOptions.weekStartsOn ??
        defaultOptions.locale?.options?.weekStartsOn ??
        0;
      const originalDate = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$toDate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDate"
      ])(date);
      if (
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isValid"
        ])(originalDate)
      ) {
        throw new RangeError("Invalid time value");
      }
      let parts = formatStr
        .match(longFormattingTokensRegExp)
        .map((substring) => {
          const firstCharacter = substring[0];
          if (firstCharacter === "p" || firstCharacter === "P") {
            const longFormatter =
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$longFormatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "longFormatters"
              ][firstCharacter];
            return longFormatter(substring, locale.formatLong);
          }
          return substring;
        })
        .join("")
        .match(formattingTokensRegExp)
        .map((substring) => {
          if (substring === "''") {
            return {
              isToken: false,
              value: "'",
            };
          }
          const firstCharacter = substring[0];
          if (firstCharacter === "'") {
            return {
              isToken: false,
              value: cleanEscapedString(substring),
            };
          }
          if (
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "formatters"
            ][firstCharacter]
          ) {
            return {
              isToken: true,
              value: substring,
            };
          }
          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError(
              "Format string contains an unescaped latin alphabet character `" +
                firstCharacter +
                "`",
            );
          }
          return {
            isToken: false,
            value: substring,
          };
        });

      if (locale.localize.preprocessor) {
        parts = locale.localize.preprocessor(originalDate, parts);
      }
      const formatterOptions = {
        firstWeekContainsDate,
        weekStartsOn,
        locale,
      };
      return parts
        .map((part) => {
          if (!part.isToken) return part.value;
          const token = part.value;
          if (
            (!options?.useAdditionalWeekYearTokens &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$protectedTokens$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "isProtectedWeekYearToken"
              ])(token)) ||
            (!options?.useAdditionalDayOfYearTokens &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$protectedTokens$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "isProtectedDayOfYearToken"
              ])(token))
          ) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$protectedTokens$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "warnOrThrowProtectedError"
            ])(token, formatStr, String(date));
          }
          const formatter =
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$_lib$2f$format$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "formatters"
            ][token[0]];
          return formatter(
            originalDate,
            token,
            locale.localize,
            formatterOptions,
          );
        })
        .join("");
    }
    function cleanEscapedString(input) {
      const matched = input.match(escapedStringRegExp);
      if (!matched) {
        return input;
      }
      return matched[1].replace(doubleQuoteRegExp, "'");
    }
    const __TURBOPACK__default__export__ = format;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => LoaderCircle,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "M21 12a9 9 0 1 1-6.219-8.56",
          key: "13zald",
        },
      ],
    ];
    const LoaderCircle = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("LoaderCircle", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Loader2",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => Download,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
          key: "ih7n3h",
        },
      ],
      [
        "polyline",
        {
          points: "7 10 12 15 17 10",
          key: "2ggqvy",
        },
      ],
      [
        "line",
        {
          x1: "12",
          x2: "12",
          y1: "15",
          y2: "3",
          key: "1vk2je",
        },
      ],
    ];
    const Download = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("Download", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Download",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => Printer,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
          key: "143wyd",
        },
      ],
      [
        "path",
        {
          d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
          key: "1itne7",
        },
      ],
      [
        "rect",
        {
          x: "6",
          y: "14",
          width: "12",
          height: "8",
          rx: "1",
          key: "1ue0tg",
        },
      ],
    ];
    const Printer = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("Printer", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Printer",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/number/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["clamp", () => clamp]);
    function clamp(value, [min, max]) {
      return Math.min(max, Math.max(min, value));
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-direction/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "DirectionProvider",
      () => DirectionProvider,
      "Provider",
      () => Provider,
      "useDirection",
      () => useDirection,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)",
      );
    var DirectionContext =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "createContext"
      ](void 0);
    var DirectionProvider = (props) => {
      const { dir, children } = props;
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsx"
      ])(DirectionContext.Provider, {
        value: dir,
        children,
      });
    };
    function useDirection(localDir) {
      const globalDir =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useContext"
        ](DirectionContext);
      return localDir || globalDir || "ltr";
    }
    var Provider = DirectionProvider;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "alignments",
      () => alignments,
      "clamp",
      () => clamp,
      "createCoords",
      () => createCoords,
      "evaluate",
      () => evaluate,
      "expandPaddingObject",
      () => expandPaddingObject,
      "floor",
      () => floor,
      "getAlignment",
      () => getAlignment,
      "getAlignmentAxis",
      () => getAlignmentAxis,
      "getAlignmentSides",
      () => getAlignmentSides,
      "getAxisLength",
      () => getAxisLength,
      "getExpandedPlacements",
      () => getExpandedPlacements,
      "getOppositeAlignmentPlacement",
      () => getOppositeAlignmentPlacement,
      "getOppositeAxis",
      () => getOppositeAxis,
      "getOppositeAxisPlacements",
      () => getOppositeAxisPlacements,
      "getOppositePlacement",
      () => getOppositePlacement,
      "getPaddingObject",
      () => getPaddingObject,
      "getSide",
      () => getSide,
      "getSideAxis",
      () => getSideAxis,
      "max",
      () => max,
      "min",
      () => min,
      "placements",
      () => placements,
      "rectToClientRect",
      () => rectToClientRect,
      "round",
      () => round,
      "sides",
      () => sides,
    ]);
    const sides = ["top", "right", "bottom", "left"];
    const alignments = ["start", "end"];
    const placements = sides.reduce(
      (acc, side) =>
        acc.concat(
          side,
          side + "-" + alignments[0],
          side + "-" + alignments[1],
        ),
      [],
    );
    const min = Math.min;
    const max = Math.max;
    const round = Math.round;
    const floor = Math.floor;
    const createCoords = (v) => ({
      x: v,
      y: v,
    });
    const oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom",
    };
    const oppositeAlignmentMap = {
      start: "end",
      end: "start",
    };
    function clamp(start, value, end) {
      return max(start, min(value, end));
    }
    function evaluate(value, param) {
      return typeof value === "function" ? value(param) : value;
    }
    function getSide(placement) {
      return placement.split("-")[0];
    }
    function getAlignment(placement) {
      return placement.split("-")[1];
    }
    function getOppositeAxis(axis) {
      return axis === "x" ? "y" : "x";
    }
    function getAxisLength(axis) {
      return axis === "y" ? "height" : "width";
    }
    const yAxisSides = new Set(["top", "bottom"]);
    function getSideAxis(placement) {
      return yAxisSides.has(getSide(placement)) ? "y" : "x";
    }
    function getAlignmentAxis(placement) {
      return getOppositeAxis(getSideAxis(placement));
    }
    function getAlignmentSides(placement, rects, rtl) {
      if (rtl === void 0) {
        rtl = false;
      }
      const alignment = getAlignment(placement);
      const alignmentAxis = getAlignmentAxis(placement);
      const length = getAxisLength(alignmentAxis);
      let mainAlignmentSide =
        alignmentAxis === "x"
          ? alignment === (rtl ? "end" : "start")
            ? "right"
            : "left"
          : alignment === "start"
            ? "bottom"
            : "top";
      if (rects.reference[length] > rects.floating[length]) {
        mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
      }
      return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
    }
    function getExpandedPlacements(placement) {
      const oppositePlacement = getOppositePlacement(placement);
      return [
        getOppositeAlignmentPlacement(placement),
        oppositePlacement,
        getOppositeAlignmentPlacement(oppositePlacement),
      ];
    }
    function getOppositeAlignmentPlacement(placement) {
      return placement.replace(
        /start|end/g,
        (alignment) => oppositeAlignmentMap[alignment],
      );
    }
    const lrPlacement = ["left", "right"];
    const rlPlacement = ["right", "left"];
    const tbPlacement = ["top", "bottom"];
    const btPlacement = ["bottom", "top"];
    function getSideList(side, isStart, rtl) {
      switch (side) {
        case "top":
        case "bottom":
          if (rtl) return isStart ? rlPlacement : lrPlacement;
          return isStart ? lrPlacement : rlPlacement;
        case "left":
        case "right":
          return isStart ? tbPlacement : btPlacement;
        default:
          return [];
      }
    }
    function getOppositeAxisPlacements(
      placement,
      flipAlignment,
      direction,
      rtl,
    ) {
      const alignment = getAlignment(placement);
      let list = getSideList(getSide(placement), direction === "start", rtl);
      if (alignment) {
        list = list.map((side) => side + "-" + alignment);
        if (flipAlignment) {
          list = list.concat(list.map(getOppositeAlignmentPlacement));
        }
      }
      return list;
    }
    function getOppositePlacement(placement) {
      return placement.replace(
        /left|right|bottom|top/g,
        (side) => oppositeSideMap[side],
      );
    }
    function expandPaddingObject(padding) {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...padding,
      };
    }
    function getPaddingObject(padding) {
      return typeof padding !== "number"
        ? expandPaddingObject(padding)
        : {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding,
          };
    }
    function rectToClientRect(rect) {
      const { x, y, width, height } = rect;
      return {
        width,
        height,
        top: y,
        left: x,
        right: x + width,
        bottom: y + height,
        x,
        y,
      };
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/core/dist/floating-ui.core.mjs [app-ssr] (ecmascript) <locals>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "arrow",
      () => arrow,
      "autoPlacement",
      () => autoPlacement,
      "computePosition",
      () => computePosition,
      "detectOverflow",
      () => detectOverflow,
      "flip",
      () => flip,
      "hide",
      () => hide,
      "inline",
      () => inline,
      "limitShift",
      () => limitShift,
      "offset",
      () => offset,
      "shift",
      () => shift,
      "size",
      () => size,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)",
      );
    function computeCoordsFromPlacement(_ref, placement, rtl) {
      let { reference, floating } = _ref;
      const sideAxis = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getSideAxis"
      ])(placement);
      const alignmentAxis = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getAlignmentAxis"
      ])(placement);
      const alignLength = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getAxisLength"
      ])(alignmentAxis);
      const side = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getSide"
      ])(placement);
      const isVertical = sideAxis === "y";
      const commonX = reference.x + reference.width / 2 - floating.width / 2;
      const commonY = reference.y + reference.height / 2 - floating.height / 2;
      const commonAlign =
        reference[alignLength] / 2 - floating[alignLength] / 2;
      let coords;
      switch (side) {
        case "top":
          coords = {
            x: commonX,
            y: reference.y - floating.height,
          };
          break;
        case "bottom":
          coords = {
            x: commonX,
            y: reference.y + reference.height,
          };
          break;
        case "right":
          coords = {
            x: reference.x + reference.width,
            y: commonY,
          };
          break;
        case "left":
          coords = {
            x: reference.x - floating.width,
            y: commonY,
          };
          break;
        default:
          coords = {
            x: reference.x,
            y: reference.y,
          };
      }
      switch (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getAlignment"
        ])(placement)
      ) {
        case "start":
          coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
          break;
        case "end":
          coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
          break;
      }
      return coords;
    }

    const computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform,
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform.isRTL == null
        ? void 0
        : platform.isRTL(floating));
      let rects = await platform.getElementRects({
        reference,
        floating,
        strategy,
      });
      let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i = 0; i < validMiddleware.length; i++) {
        const { name, fn } = validMiddleware[i];
        const {
          x: nextX,
          y: nextY,
          data,
          reset,
        } = await fn({
          x,
          y,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform,
          elements: {
            reference,
            floating,
          },
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data,
          },
        };
        if (reset && resetCount <= 50) {
          resetCount++;
          if (typeof reset === "object") {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects =
                reset.rects === true
                  ? await platform.getElementRects({
                      reference,
                      floating,
                      strategy,
                    })
                  : reset.rects;
            }
            ({ x, y } = computeCoordsFromPlacement(
              rects,
              statefulPlacement,
              rtl,
            ));
          }
          i = -1;
        }
      }
      return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData,
      };
    };

    async function detectOverflow(state, options) {
      var _await$platform$isEle;
      if (options === void 0) {
        options = {};
      }
      const { x, y, platform, rects, elements, strategy } = state;
      const {
        boundary = "clippingAncestors",
        rootBoundary = "viewport",
        elementContext = "floating",
        altBoundary = false,
        padding = 0,
      } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "evaluate"
      ])(options, state);
      const paddingObject = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getPaddingObject"
      ])(padding);
      const altContext =
        elementContext === "floating" ? "reference" : "floating";
      const element = elements[altBoundary ? altContext : elementContext];
      const clippingClientRect = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "rectToClientRect"
      ])(
        await platform.getClippingRect({
          element: (
            (_await$platform$isEle = await (platform.isElement == null
              ? void 0
              : platform.isElement(element))) != null
              ? _await$platform$isEle
              : true
          )
            ? element
            : element.contextElement ||
              (await (platform.getDocumentElement == null
                ? void 0
                : platform.getDocumentElement(elements.floating))),
          boundary,
          rootBoundary,
          strategy,
        }),
      );
      const rect =
        elementContext === "floating"
          ? {
              x,
              y,
              width: rects.floating.width,
              height: rects.floating.height,
            }
          : rects.reference;
      const offsetParent = await (platform.getOffsetParent == null
        ? void 0
        : platform.getOffsetParent(elements.floating));
      const offsetScale = (await (platform.isElement == null
        ? void 0
        : platform.isElement(offsetParent)))
        ? (await (platform.getScale == null
            ? void 0
            : platform.getScale(offsetParent))) || {
            x: 1,
            y: 1,
          }
        : {
            x: 1,
            y: 1,
          };
      const elementClientRect = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "rectToClientRect"
      ])(
        platform.convertOffsetParentRelativeRectToViewportRelativeRect
          ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect(
              {
                elements,
                rect,
                offsetParent,
                strategy,
              },
            )
          : rect,
      );
      return {
        top:
          (clippingClientRect.top - elementClientRect.top + paddingObject.top) /
          offsetScale.y,
        bottom:
          (elementClientRect.bottom -
            clippingClientRect.bottom +
            paddingObject.bottom) /
          offsetScale.y,
        left:
          (clippingClientRect.left -
            elementClientRect.left +
            paddingObject.left) /
          offsetScale.x,
        right:
          (elementClientRect.right -
            clippingClientRect.right +
            paddingObject.right) /
          offsetScale.x,
      };
    }

    const arrow = (options) => ({
      name: "arrow",
      options,
      async fn(state) {
        const { x, y, placement, rects, platform, elements, middlewareData } =
          state;

        const { element, padding = 0 } =
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state) || {};
        if (element == null) {
          return {};
        }
        const paddingObject = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getPaddingObject"
        ])(padding);
        const coords = {
          x,
          y,
        };
        const axis = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getAlignmentAxis"
        ])(placement);
        const length = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getAxisLength"
        ])(axis);
        const arrowDimensions = await platform.getDimensions(element);
        const isYAxis = axis === "y";
        const minProp = isYAxis ? "top" : "left";
        const maxProp = isYAxis ? "bottom" : "right";
        const clientProp = isYAxis ? "clientHeight" : "clientWidth";
        const endDiff =
          rects.reference[length] +
          rects.reference[axis] -
          coords[axis] -
          rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform.getOffsetParent == null
          ? void 0
          : platform.getOffsetParent(element));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

        if (
          !clientSize ||
          !(await (platform.isElement == null
            ? void 0
            : platform.isElement(arrowOffsetParent)))
        ) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;

        const largestPossiblePadding =
          clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "min"
        ])(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "min"
        ])(paddingObject[maxProp], largestPossiblePadding);

        const min$1 = minPadding;
        const max = clientSize - arrowDimensions[length] - maxPadding;
        const center =
          clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "clamp"
        ])(min$1, center, max);

        const shouldAddOffset =
          !middlewareData.arrow &&
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getAlignment"
          ])(placement) != null &&
          center !== offset &&
          rects.reference[length] / 2 -
            (center < min$1 ? minPadding : maxPadding) -
            arrowDimensions[length] / 2 <
            0;
        const alignmentOffset = shouldAddOffset
          ? center < min$1
            ? center - min$1
            : center - max
          : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset,
            centerOffset: center - offset - alignmentOffset,
            ...(shouldAddOffset && {
              alignmentOffset,
            }),
          },
          reset: shouldAddOffset,
        };
      },
    });
    function getPlacementList(alignment, autoAlignment, allowedPlacements) {
      const allowedPlacementsSortedByAlignment = alignment
        ? [
            ...allowedPlacements.filter(
              (placement) =>
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "getAlignment"
                ])(placement) === alignment,
            ),
            ...allowedPlacements.filter(
              (placement) =>
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "getAlignment"
                ])(placement) !== alignment,
            ),
          ]
        : allowedPlacements.filter(
            (placement) =>
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getSide"
              ])(placement) === placement,
          );
      return allowedPlacementsSortedByAlignment.filter((placement) => {
        if (alignment) {
          return (
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getAlignment"
            ])(placement) === alignment ||
            (autoAlignment
              ? (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "getOppositeAlignmentPlacement"
                ])(placement) !== placement
              : false)
          );
        }
        return true;
      });
    }

    const autoPlacement = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "autoPlacement",
        options,
        async fn(state) {
          var _middlewareData$autoP,
            _middlewareData$autoP2,
            _placementsThatFitOnE;
          const { rects, middlewareData, placement, platform, elements } =
            state;
          const {
            crossAxis = false,
            alignment,
            allowedPlacements = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "placements"
            ],
            autoAlignment = true,
            ...detectOverflowOptions
          } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);
          const placements$1 =
            alignment !== undefined ||
            allowedPlacements ===
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "placements"
              ]
              ? getPlacementList(
                  alignment || null,
                  autoAlignment,
                  allowedPlacements,
                )
              : allowedPlacements;
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const currentIndex =
            ((_middlewareData$autoP = middlewareData.autoPlacement) == null
              ? void 0
              : _middlewareData$autoP.index) || 0;
          const currentPlacement = placements$1[currentIndex];
          if (currentPlacement == null) {
            return {};
          }
          const alignmentSides = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getAlignmentSides"
          ])(
            currentPlacement,
            rects,
            await (platform.isRTL == null
              ? void 0
              : platform.isRTL(elements.floating)),
          );

          if (placement !== currentPlacement) {
            return {
              reset: {
                placement: placements$1[0],
              },
            };
          }
          const currentOverflows = [
            overflow[
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getSide"
              ])(currentPlacement)
            ],
            overflow[alignmentSides[0]],
            overflow[alignmentSides[1]],
          ];
          const allOverflows = [
            ...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null
              ? void 0
              : _middlewareData$autoP2.overflows) || []),
            {
              placement: currentPlacement,
              overflows: currentOverflows,
            },
          ];
          const nextPlacement = placements$1[currentIndex + 1];

          if (nextPlacement) {
            return {
              data: {
                index: currentIndex + 1,
                overflows: allOverflows,
              },
              reset: {
                placement: nextPlacement,
              },
            };
          }
          const placementsSortedByMostSpace = allOverflows
            .map((d) => {
              const alignment = (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getAlignment"
              ])(d.placement);
              return [
                d.placement,
                alignment && crossAxis
                  ? d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
                  : d.overflows[0],
                d.overflows,
              ];
            })
            .sort((a, b) => a[1] - b[1]);
          const placementsThatFitOnEachSide =
            placementsSortedByMostSpace.filter((d) =>
              d[2]
                .slice(
                  0,

                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "getAlignment"
                  ])(d[0])
                    ? 2
                    : 3,
                )
                .every((v) => v <= 0),
            );
          const resetPlacement =
            ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null
              ? void 0
              : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
          if (resetPlacement !== placement) {
            return {
              data: {
                index: currentIndex + 1,
                overflows: allOverflows,
              },
              reset: {
                placement: resetPlacement,
              },
            };
          }
          return {};
        },
      };
    };

    const flip = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform,
            elements,
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);

          if (
            (_middlewareData$arrow = middlewareData.arrow) != null &&
            _middlewareData$arrow.alignmentOffset
          ) {
            return {};
          }
          const side = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getSide"
          ])(placement);
          const initialSideAxis = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getSideAxis"
          ])(initialPlacement);
          const isBasePlacement =
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getSide"
            ])(initialPlacement) === initialPlacement;
          const rtl = await (platform.isRTL == null
            ? void 0
            : platform.isRTL(elements.floating));
          const fallbackPlacements =
            specifiedFallbackPlacements ||
            (isBasePlacement || !flipAlignment
              ? [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "getOppositePlacement"
                  ])(initialPlacement),
                ]
              : (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "getExpandedPlacements"
                ])(initialPlacement));
          const hasFallbackAxisSideDirection =
            fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(
              ...(0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getOppositeAxisPlacements"
              ])(
                initialPlacement,
                flipAlignment,
                fallbackAxisSideDirection,
                rtl,
              ),
            );
          }
          const placements = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData =
            ((_middlewareData$flip = middlewareData.flip) == null
              ? void 0
              : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getAlignmentSides"
            ])(placement, rects, rtl);
            overflows.push(overflow[sides[0]], overflow[sides[1]]);
          }
          overflowsData = [
            ...overflowsData,
            {
              placement,
              overflows,
            },
          ];

          if (!overflows.every((side) => side <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex =
              (((_middlewareData$flip2 = middlewareData.flip) == null
                ? void 0
                : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements[nextIndex];
            if (nextPlacement) {
              const ignoreCrossAxisOverflow =
                checkCrossAxis === "alignment"
                  ? initialSideAxis !==
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "getSideAxis"
                    ])(nextPlacement)
                  : false;
              if (
                !ignoreCrossAxisOverflow ||
                overflowsData.every((d) =>
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "getSideAxis"
                  ])(d.placement) === initialSideAxis
                    ? d.overflows[0] > 0
                    : true,
                )
              ) {
                return {
                  data: {
                    index: nextIndex,
                    overflows: overflowsData,
                  },
                  reset: {
                    placement: nextPlacement,
                  },
                };
              }
            }

            let resetPlacement =
              (_overflowsData$filter = overflowsData
                .filter((d) => d.overflows[0] <= 0)
                .sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
                ? void 0
                : _overflowsData$filter.placement;

            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement =
                    (_overflowsData$filter2 = overflowsData
                      .filter((d) => {
                        if (hasFallbackAxisSideDirection) {
                          const currentSideAxis = (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "getSideAxis"
                          ])(d.placement);
                          return (
                            currentSideAxis === initialSideAxis ||
                            currentSideAxis === "y"
                          );
                        }
                        return true;
                      })
                      .map((d) => [
                        d.placement,
                        d.overflows
                          .filter((overflow) => overflow > 0)
                          .reduce((acc, overflow) => acc + overflow, 0),
                      ])
                      .sort((a, b) => a[1] - b[1])[0]) == null
                      ? void 0
                      : _overflowsData$filter2[0];
                  if (placement) {
                    resetPlacement = placement;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement,
                },
              };
            }
          }
          return {};
        },
      };
    };
    function getSideOffsets(overflow, rect) {
      return {
        top: overflow.top - rect.height,
        right: overflow.right - rect.width,
        bottom: overflow.bottom - rect.height,
        left: overflow.left - rect.width,
      };
    }
    function isAnySideFullyClipped(overflow) {
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "sides"
      ].some((side) => overflow[side] >= 0);
    }

    const hide = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "hide",
        options,
        async fn(state) {
          const { rects } = state;
          const { strategy = "referenceHidden", ...detectOverflowOptions } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);
          switch (strategy) {
            case "referenceHidden": {
              const overflow = await detectOverflow(state, {
                ...detectOverflowOptions,
                elementContext: "reference",
              });
              const offsets = getSideOffsets(overflow, rects.reference);
              return {
                data: {
                  referenceHiddenOffsets: offsets,
                  referenceHidden: isAnySideFullyClipped(offsets),
                },
              };
            }
            case "escaped": {
              const overflow = await detectOverflow(state, {
                ...detectOverflowOptions,
                altBoundary: true,
              });
              const offsets = getSideOffsets(overflow, rects.floating);
              return {
                data: {
                  escapedOffsets: offsets,
                  escaped: isAnySideFullyClipped(offsets),
                },
              };
            }
            default: {
              return {};
            }
          }
        },
      };
    };
    function getBoundingRect(rects) {
      const minX = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "min"
      ])(...rects.map((rect) => rect.left));
      const minY = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "min"
      ])(...rects.map((rect) => rect.top));
      const maxX = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "max"
      ])(...rects.map((rect) => rect.right));
      const maxY = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "max"
      ])(...rects.map((rect) => rect.bottom));
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }
    function getRectsByLine(rects) {
      const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
      const groups = [];
      let prevRect = null;
      for (let i = 0; i < sortedRects.length; i++) {
        const rect = sortedRects[i];
        if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
          groups.push([rect]);
        } else {
          groups[groups.length - 1].push(rect);
        }
        prevRect = rect;
      }
      return groups.map((rect) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "rectToClientRect"
        ])(getBoundingRect(rect)),
      );
    }

    const inline = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "inline",
        options,
        async fn(state) {
          const { placement, elements, rects, platform, strategy } = state;

          const {
            padding = 2,
            x,
            y,
          } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);
          const nativeClientRects = Array.from(
            (await (platform.getClientRects == null
              ? void 0
              : platform.getClientRects(elements.reference))) || [],
          );
          const clientRects = getRectsByLine(nativeClientRects);
          const fallback = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "rectToClientRect"
          ])(getBoundingRect(nativeClientRects));
          const paddingObject = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getPaddingObject"
          ])(padding);
          function getBoundingClientRect() {
            if (
              clientRects.length === 2 &&
              clientRects[0].left > clientRects[1].right &&
              x != null &&
              y != null
            ) {
              return (
                clientRects.find(
                  (rect) =>
                    x > rect.left - paddingObject.left &&
                    x < rect.right + paddingObject.right &&
                    y > rect.top - paddingObject.top &&
                    y < rect.bottom + paddingObject.bottom,
                ) || fallback
              );
            }

            if (clientRects.length >= 2) {
              if (
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "getSideAxis"
                ])(placement) === "y"
              ) {
                const firstRect = clientRects[0];
                const lastRect = clientRects[clientRects.length - 1];
                const isTop =
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "getSide"
                  ])(placement) === "top";
                const top = firstRect.top;
                const bottom = lastRect.bottom;
                const left = isTop ? firstRect.left : lastRect.left;
                const right = isTop ? firstRect.right : lastRect.right;
                const width = right - left;
                const height = bottom - top;
                return {
                  top,
                  bottom,
                  left,
                  right,
                  width,
                  height,
                  x: left,
                  y: top,
                };
              }
              const isLeftSide =
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "getSide"
                ])(placement) === "left";
              const maxRight = (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "max"
              ])(...clientRects.map((rect) => rect.right));
              const minLeft = (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "min"
              ])(...clientRects.map((rect) => rect.left));
              const measureRects = clientRects.filter((rect) =>
                isLeftSide ? rect.left === minLeft : rect.right === maxRight,
              );
              const top = measureRects[0].top;
              const bottom = measureRects[measureRects.length - 1].bottom;
              const left = minLeft;
              const right = maxRight;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top,
              };
            }
            return fallback;
          }
          const resetRects = await platform.getElementRects({
            reference: {
              getBoundingClientRect,
            },
            floating: elements.floating,
            strategy,
          });
          if (
            rects.reference.x !== resetRects.reference.x ||
            rects.reference.y !== resetRects.reference.y ||
            rects.reference.width !== resetRects.reference.width ||
            rects.reference.height !== resetRects.reference.height
          ) {
            return {
              reset: {
                rects: resetRects,
              },
            };
          }
          return {};
        },
      };
    };
    const originSides = new Set(["left", "top"]);

    async function convertValueToCoords(state, options) {
      const { placement, platform, elements } = state;
      const rtl = await (platform.isRTL == null
        ? void 0
        : platform.isRTL(elements.floating));
      const side = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getSide"
      ])(placement);
      const alignment = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getAlignment"
      ])(placement);
      const isVertical =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getSideAxis"
        ])(placement) === "y";
      const mainAxisMulti = originSides.has(side) ? -1 : 1;
      const crossAxisMulti = rtl && isVertical ? -1 : 1;
      const rawValue = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "evaluate"
      ])(options, state);

      let { mainAxis, crossAxis, alignmentAxis } =
        typeof rawValue === "number"
          ? {
              mainAxis: rawValue,
              crossAxis: 0,
              alignmentAxis: null,
            }
          : {
              mainAxis: rawValue.mainAxis || 0,
              crossAxis: rawValue.crossAxis || 0,
              alignmentAxis: rawValue.alignmentAxis,
            };
      if (alignment && typeof alignmentAxis === "number") {
        crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
      }
      return isVertical
        ? {
            x: crossAxis * crossAxisMulti,
            y: mainAxis * mainAxisMulti,
          }
        : {
            x: mainAxis * mainAxisMulti,
            y: crossAxis * crossAxisMulti,
          };
    }

    const offset = function (options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: "offset",
        options,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const { x, y, placement, middlewareData } = state;
          const diffCoords = await convertValueToCoords(state, options);

          if (
            placement ===
              ((_middlewareData$offse = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse.placement) &&
            (_middlewareData$arrow = middlewareData.arrow) != null &&
            _middlewareData$arrow.alignmentOffset
          ) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: {
              ...diffCoords,
              placement,
            },
          };
        },
      };
    };

    const shift = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const { x, y, placement } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let { x, y } = _ref;
                return {
                  x,
                  y,
                };
              },
            },
            ...detectOverflowOptions
          } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);
          const coords = {
            x,
            y,
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getSideAxis"
          ])(
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getSide"
            ])(placement),
          );
          const mainAxis = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getOppositeAxis"
          ])(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min = mainAxisCoord + overflow[minSide];
            const max = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "clamp"
            ])(min, mainAxisCoord, max);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min = crossAxisCoord + overflow[minSide];
            const max = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "clamp"
            ])(min, crossAxisCoord, max);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord,
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis,
              },
            },
          };
        },
      };
    };

    const limitShift = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        options,
        fn(state) {
          const { x, y, placement, rects, middlewareData } = state;
          const {
            offset = 0,
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
          } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);
          const coords = {
            x,
            y,
          };
          const crossAxis = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getSideAxis"
          ])(placement);
          const mainAxis = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getOppositeAxis"
          ])(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          const rawOffset = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(offset, state);
          const computedOffset =
            typeof rawOffset === "number"
              ? {
                  mainAxis: rawOffset,
                  crossAxis: 0,
                }
              : {
                  mainAxis: 0,
                  crossAxis: 0,
                  ...rawOffset,
                };
          if (checkMainAxis) {
            const len = mainAxis === "y" ? "height" : "width";
            const limitMin =
              rects.reference[mainAxis] -
              rects.floating[len] +
              computedOffset.mainAxis;
            const limitMax =
              rects.reference[mainAxis] +
              rects.reference[len] -
              computedOffset.mainAxis;
            if (mainAxisCoord < limitMin) {
              mainAxisCoord = limitMin;
            } else if (mainAxisCoord > limitMax) {
              mainAxisCoord = limitMax;
            }
          }
          if (checkCrossAxis) {
            var _middlewareData$offse, _middlewareData$offse2;
            const len = mainAxis === "y" ? "width" : "height";
            const isOriginSide = originSides.has(
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getSide"
              ])(placement),
            );
            const limitMin =
              rects.reference[crossAxis] -
              rects.floating[len] +
              (isOriginSide
                ? ((_middlewareData$offse = middlewareData.offset) == null
                    ? void 0
                    : _middlewareData$offse[crossAxis]) || 0
                : 0) +
              (isOriginSide ? 0 : computedOffset.crossAxis);
            const limitMax =
              rects.reference[crossAxis] +
              rects.reference[len] +
              (isOriginSide
                ? 0
                : ((_middlewareData$offse2 = middlewareData.offset) == null
                    ? void 0
                    : _middlewareData$offse2[crossAxis]) || 0) -
              (isOriginSide ? computedOffset.crossAxis : 0);
            if (crossAxisCoord < limitMin) {
              crossAxisCoord = limitMin;
            } else if (crossAxisCoord > limitMax) {
              crossAxisCoord = limitMax;
            }
          }
          return {
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord,
          };
        },
      };
    };

    const size = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "size",
        options,
        async fn(state) {
          var _state$middlewareData, _state$middlewareData2;
          const { placement, rects, platform, elements } = state;
          const { apply = () => {}, ...detectOverflowOptions } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "evaluate"
          ])(options, state);
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const side = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getSide"
          ])(placement);
          const alignment = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getAlignment"
          ])(placement);
          const isYAxis =
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getSideAxis"
            ])(placement) === "y";
          const { width, height } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === "top" || side === "bottom") {
            heightSide = side;
            widthSide =
              alignment ===
              ((await (platform.isRTL == null
                ? void 0
                : platform.isRTL(elements.floating)))
                ? "start"
                : "end")
                ? "left"
                : "right";
          } else {
            widthSide = side;
            heightSide = alignment === "end" ? "top" : "bottom";
          }
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          const maximumClippingWidth = width - overflow.left - overflow.right;
          const overflowAvailableHeight = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "min"
          ])(height - overflow[heightSide], maximumClippingHeight);
          const overflowAvailableWidth = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "min"
          ])(width - overflow[widthSide], maximumClippingWidth);
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if (
            (_state$middlewareData = state.middlewareData.shift) != null &&
            _state$middlewareData.enabled.x
          ) {
            availableWidth = maximumClippingWidth;
          }
          if (
            (_state$middlewareData2 = state.middlewareData.shift) != null &&
            _state$middlewareData2.enabled.y
          ) {
            availableHeight = maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "max"
            ])(overflow.left, 0);
            const xMax = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "max"
            ])(overflow.right, 0);
            const yMin = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "max"
            ])(overflow.top, 0);
            const yMax = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "max"
            ])(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth =
                width -
                2 *
                  (xMin !== 0 || xMax !== 0
                    ? xMin + xMax
                    : (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "max"
                      ])(overflow.left, overflow.right));
            } else {
              availableHeight =
                height -
                2 *
                  (yMin !== 0 || yMax !== 0
                    ? yMin + yMax
                    : (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "max"
                      ])(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight,
          });
          const nextDimensions = await platform.getDimensions(
            elements.floating,
          );
          if (
            width !== nextDimensions.width ||
            height !== nextDimensions.height
          ) {
            return {
              reset: {
                rects: true,
              },
            };
          }
          return {};
        },
      };
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "getComputedStyle",
      () => getComputedStyle,
      "getContainingBlock",
      () => getContainingBlock,
      "getDocumentElement",
      () => getDocumentElement,
      "getFrameElement",
      () => getFrameElement,
      "getNearestOverflowAncestor",
      () => getNearestOverflowAncestor,
      "getNodeName",
      () => getNodeName,
      "getNodeScroll",
      () => getNodeScroll,
      "getOverflowAncestors",
      () => getOverflowAncestors,
      "getParentNode",
      () => getParentNode,
      "getWindow",
      () => getWindow,
      "isContainingBlock",
      () => isContainingBlock,
      "isElement",
      () => isElement,
      "isHTMLElement",
      () => isHTMLElement,
      "isLastTraversableNode",
      () => isLastTraversableNode,
      "isNode",
      () => isNode,
      "isOverflowElement",
      () => isOverflowElement,
      "isShadowRoot",
      () => isShadowRoot,
      "isTableElement",
      () => isTableElement,
      "isTopLayer",
      () => isTopLayer,
      "isWebKit",
      () => isWebKit,
    ]);
    function hasWindow() {
      return ("TURBOPACK compile-time value", "undefined") !== "undefined";
    }
    function getNodeName(node) {
      if (isNode(node)) {
        return (node.nodeName || "").toLowerCase();
      }

      return "#document";
    }
    function getWindow(node) {
      var _node$ownerDocument;
      return (
        (node == null || (_node$ownerDocument = node.ownerDocument) == null
          ? void 0
          : _node$ownerDocument.defaultView) || window
      );
    }
    function getDocumentElement(node) {
      var _ref;
      return (_ref =
        (isNode(node) ? node.ownerDocument : node.document) ||
        window.document) == null
        ? void 0
        : _ref.documentElement;
    }
    function isNode(value) {
      if (!hasWindow()) {
        return false;
      }
    }
    function isElement(value) {
      if (!hasWindow()) {
        return false;
      }
    }
    function isHTMLElement(value) {
      if (!hasWindow()) {
        return false;
      }
    }
    function isShadowRoot(value) {
      if (!hasWindow() || typeof ShadowRoot === "undefined") {
        return false;
      }
    }
    const invalidOverflowDisplayValues = new Set(["inline", "contents"]);
    function isOverflowElement(element) {
      const { overflow, overflowX, overflowY, display } =
        getComputedStyle(element);
      return (
        /auto|scroll|overlay|hidden|clip/.test(
          overflow + overflowY + overflowX,
        ) && !invalidOverflowDisplayValues.has(display)
      );
    }
    const tableElements = new Set(["table", "td", "th"]);
    function isTableElement(element) {
      return tableElements.has(getNodeName(element));
    }
    const topLayerSelectors = [":popover-open", ":modal"];
    function isTopLayer(element) {
      return topLayerSelectors.some((selector) => {
        try {
          return element.matches(selector);
        } catch (_e) {
          return false;
        }
      });
    }
    const transformProperties = [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective",
    ];
    const willChangeValues = [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective",
      "filter",
    ];
    const containValues = ["paint", "layout", "strict", "content"];
    function isContainingBlock(elementOrCss) {
      const webkit = isWebKit();
      const css = isElement(elementOrCss)
        ? getComputedStyle(elementOrCss)
        : elementOrCss;

      return (
        transformProperties.some((value) =>
          css[value] ? css[value] !== "none" : false,
        ) ||
        (css.containerType ? css.containerType !== "normal" : false) ||
        (!webkit &&
          (css.backdropFilter ? css.backdropFilter !== "none" : false)) ||
        (!webkit && (css.filter ? css.filter !== "none" : false)) ||
        willChangeValues.some((value) =>
          (css.willChange || "").includes(value),
        ) ||
        containValues.some((value) => (css.contain || "").includes(value))
      );
    }
    function getContainingBlock(element) {
      let currentNode = getParentNode(element);
      while (
        isHTMLElement(currentNode) &&
        !isLastTraversableNode(currentNode)
      ) {
        if (isContainingBlock(currentNode)) {
          return currentNode;
        } else if (isTopLayer(currentNode)) {
          return null;
        }
        currentNode = getParentNode(currentNode);
      }
      return null;
    }
    function isWebKit() {
      if (typeof CSS === "undefined" || !CSS.supports) return false;
      return CSS.supports("-webkit-backdrop-filter", "none");
    }
    const lastTraversableNodeNames = new Set(["html", "body", "#document"]);
    function isLastTraversableNode(node) {
      return lastTraversableNodeNames.has(getNodeName(node));
    }
    function getComputedStyle(element) {
      return getWindow(element).getComputedStyle(element);
    }
    function getNodeScroll(element) {
      if (isElement(element)) {
        return {
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop,
        };
      }
      return {
        scrollLeft: element.scrollX,
        scrollTop: element.scrollY,
      };
    }
    function getParentNode(node) {
      if (getNodeName(node) === "html") {
        return node;
      }
      const result =
        node.assignedSlot ||
        node.parentNode ||
        (isShadowRoot(node) && node.host) ||
        getDocumentElement(node);
      return isShadowRoot(result) ? result.host : result;
    }
    function getNearestOverflowAncestor(node) {
      const parentNode = getParentNode(node);
      if (isLastTraversableNode(parentNode)) {
        return node.ownerDocument ? node.ownerDocument.body : node.body;
      }
      if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
        return parentNode;
      }
      return getNearestOverflowAncestor(parentNode);
    }
    function getOverflowAncestors(node, list, traverseIframes) {
      var _node$ownerDocument2;
      if (list === void 0) {
        list = [];
      }
      if (traverseIframes === void 0) {
        traverseIframes = true;
      }
      const scrollableAncestor = getNearestOverflowAncestor(node);
      const isBody =
        scrollableAncestor ===
        ((_node$ownerDocument2 = node.ownerDocument) == null
          ? void 0
          : _node$ownerDocument2.body);
      const win = getWindow(scrollableAncestor);
      if (isBody) {
        const frameElement = getFrameElement(win);
        return list.concat(
          win,
          win.visualViewport || [],
          isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
          frameElement && traverseIframes
            ? getOverflowAncestors(frameElement)
            : [],
        );
      }
      return list.concat(
        scrollableAncestor,
        getOverflowAncestors(scrollableAncestor, [], traverseIframes),
      );
    }
    function getFrameElement(win) {
      return win.parent && Object.getPrototypeOf(win.parent)
        ? win.frameElement
        : null;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-ssr] (ecmascript) <locals>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "arrow",
      () => arrow,
      "autoPlacement",
      () => autoPlacement,
      "autoUpdate",
      () => autoUpdate,
      "computePosition",
      () => computePosition,
      "detectOverflow",
      () => detectOverflow,
      "flip",
      () => flip,
      "hide",
      () => hide,
      "inline",
      () => inline,
      "limitShift",
      () => limitShift,
      "offset",
      () => offset,
      "platform",
      () => platform,
      "shift",
      () => shift,
      "size",
      () => size,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/core/dist/floating-ui.core.mjs [app-ssr] (ecmascript) <locals>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)",
      );
    function getCssDimensions(element) {
      const css = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getComputedStyle"
      ])(element);

      let width = parseFloat(css.width) || 0;
      let height = parseFloat(css.height) || 0;
      const hasOffset = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "isHTMLElement"
      ])(element);
      const offsetWidth = hasOffset ? element.offsetWidth : width;
      const offsetHeight = hasOffset ? element.offsetHeight : height;
      const shouldFallback =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "round"
        ])(width) !== offsetWidth ||
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "round"
        ])(height) !== offsetHeight;
      if (shouldFallback) {
        width = offsetWidth;
        height = offsetHeight;
      }
      return {
        width,
        height,
        $: shouldFallback,
      };
    }
    function unwrapElement(element) {
      return !(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "isElement"
      ])(element)
        ? element.contextElement
        : element;
    }
    function getScale(element) {
      const domElement = unwrapElement(element);
      if (
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isHTMLElement"
        ])(domElement)
      ) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "createCoords"
        ])(1);
      }
      const rect = domElement.getBoundingClientRect();
      const { width, height, $ } = getCssDimensions(domElement);
      let x =
        ($
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "round"
            ])(rect.width)
          : rect.width) / width;
      let y =
        ($
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "round"
            ])(rect.height)
          : rect.height) / height;

      if (!x || !Number.isFinite(x)) {
        x = 1;
      }
      if (!y || !Number.isFinite(y)) {
        y = 1;
      }
      return {
        x,
        y,
      };
    }
    const noOffsets = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createCoords"
    ])(0);
    function getVisualOffsets(element) {
      const win = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getWindow"
      ])(element);
      if (
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isWebKit"
        ])() ||
        !win.visualViewport
      ) {
        return noOffsets;
      }
      return {
        x: win.visualViewport.offsetLeft,
        y: win.visualViewport.offsetTop,
      };
    }
    function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
      if (isFixed === void 0) {
        isFixed = false;
      }
      if (
        !floatingOffsetParent ||
        (isFixed &&
          floatingOffsetParent !==
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getWindow"
            ])(element))
      ) {
        return false;
      }
      return isFixed;
    }
    function getBoundingClientRect(
      element,
      includeScale,
      isFixedStrategy,
      offsetParent,
    ) {
      if (includeScale === void 0) {
        includeScale = false;
      }
      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }
      const clientRect = element.getBoundingClientRect();
      const domElement = unwrapElement(element);
      let scale = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "createCoords"
      ])(1);
      if (includeScale) {
        if (offsetParent) {
          if (
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "isElement"
            ])(offsetParent)
          ) {
            scale = getScale(offsetParent);
          }
        } else {
          scale = getScale(element);
        }
      }
      const visualOffsets = shouldAddVisualOffsets(
        domElement,
        isFixedStrategy,
        offsetParent,
      )
        ? getVisualOffsets(domElement)
        : (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "createCoords"
          ])(0);
      let x = (clientRect.left + visualOffsets.x) / scale.x;
      let y = (clientRect.top + visualOffsets.y) / scale.y;
      let width = clientRect.width / scale.x;
      let height = clientRect.height / scale.y;
      if (domElement) {
        const win = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getWindow"
        ])(domElement);
        const offsetWin =
          offsetParent &&
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isElement"
          ])(offsetParent)
            ? (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getWindow"
              ])(offsetParent)
            : offsetParent;
        let currentWin = win;
        let currentIFrame = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getFrameElement"
        ])(currentWin);
        while (currentIFrame && offsetParent && offsetWin !== currentWin) {
          const iframeScale = getScale(currentIFrame);
          const iframeRect = currentIFrame.getBoundingClientRect();
          const css = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getComputedStyle"
          ])(currentIFrame);
          const left =
            iframeRect.left +
            (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) *
              iframeScale.x;
          const top =
            iframeRect.top +
            (currentIFrame.clientTop + parseFloat(css.paddingTop)) *
              iframeScale.y;
          x *= iframeScale.x;
          y *= iframeScale.y;
          width *= iframeScale.x;
          height *= iframeScale.y;
          x += left;
          y += top;
          currentWin = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getWindow"
          ])(currentIFrame);
          currentIFrame = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getFrameElement"
          ])(currentWin);
        }
      }
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "rectToClientRect"
      ])({
        width,
        height,
        x,
        y,
      });
    }

    function getWindowScrollBarX(element, rect) {
      const leftScroll = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getNodeScroll"
      ])(element).scrollLeft;
      if (!rect) {
        return (
          getBoundingClientRect(
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "getDocumentElement"
            ])(element),
          ).left + leftScroll
        );
      }
      return rect.left + leftScroll;
    }
    function getHTMLOffset(documentElement, scroll) {
      const htmlRect = documentElement.getBoundingClientRect();
      const x =
        htmlRect.left +
        scroll.scrollLeft -
        getWindowScrollBarX(documentElement, htmlRect);
      const y = htmlRect.top + scroll.scrollTop;
      return {
        x,
        y,
      };
    }
    function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
      let { elements, rect, offsetParent, strategy } = _ref;
      const isFixed = strategy === "fixed";
      const documentElement = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDocumentElement"
      ])(offsetParent);
      const topLayer = elements
        ? (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isTopLayer"
          ])(elements.floating)
        : false;
      if (offsetParent === documentElement || (topLayer && isFixed)) {
        return rect;
      }
      let scroll = {
        scrollLeft: 0,
        scrollTop: 0,
      };
      let scale = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "createCoords"
      ])(1);
      const offsets = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "createCoords"
      ])(0);
      const isOffsetParentAnElement = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "isHTMLElement"
      ])(offsetParent);
      if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getNodeName"
          ])(offsetParent) !== "body" ||
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isOverflowElement"
          ])(documentElement)
        ) {
          scroll = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getNodeScroll"
          ])(offsetParent);
        }
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isHTMLElement"
          ])(offsetParent)
        ) {
          const offsetRect = getBoundingClientRect(offsetParent);
          scale = getScale(offsetParent);
          offsets.x = offsetRect.x + offsetParent.clientLeft;
          offsets.y = offsetRect.y + offsetParent.clientTop;
        }
      }
      const htmlOffset =
        documentElement && !isOffsetParentAnElement && !isFixed
          ? getHTMLOffset(documentElement, scroll)
          : (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "createCoords"
            ])(0);
      return {
        width: rect.width * scale.x,
        height: rect.height * scale.y,
        x:
          rect.x * scale.x -
          scroll.scrollLeft * scale.x +
          offsets.x +
          htmlOffset.x,
        y:
          rect.y * scale.y -
          scroll.scrollTop * scale.y +
          offsets.y +
          htmlOffset.y,
      };
    }
    function getClientRects(element) {
      return Array.from(element.getClientRects());
    }

    function getDocumentRect(element) {
      const html = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDocumentElement"
      ])(element);
      const scroll = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getNodeScroll"
      ])(element);
      const body = element.ownerDocument.body;
      const width = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "max"
      ])(
        html.scrollWidth,
        html.clientWidth,
        body.scrollWidth,
        body.clientWidth,
      );
      const height = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "max"
      ])(
        html.scrollHeight,
        html.clientHeight,
        body.scrollHeight,
        body.clientHeight,
      );
      let x = -scroll.scrollLeft + getWindowScrollBarX(element);
      const y = -scroll.scrollTop;
      if (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(body).direction === "rtl"
      ) {
        x +=
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "max"
          ])(html.clientWidth, body.clientWidth) - width;
      }
      return {
        width,
        height,
        x,
        y,
      };
    }

    const SCROLLBAR_MAX = 25;
    function getViewportRect(element, strategy) {
      const win = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getWindow"
      ])(element);
      const html = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDocumentElement"
      ])(element);
      const visualViewport = win.visualViewport;
      let width = html.clientWidth;
      let height = html.clientHeight;
      let x = 0;
      let y = 0;
      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        const visualViewportBased = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isWebKit"
        ])();
        if (
          !visualViewportBased ||
          (visualViewportBased && strategy === "fixed")
        ) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
      const windowScrollbarX = getWindowScrollBarX(html);

      if (windowScrollbarX <= 0) {
        const doc = html.ownerDocument;
        const body = doc.body;
        const bodyStyles = getComputedStyle(body);
        const bodyMarginInline =
          doc.compatMode === "CSS1Compat"
            ? parseFloat(bodyStyles.marginLeft) +
                parseFloat(bodyStyles.marginRight) || 0
            : 0;
        const clippingStableScrollbarWidth = Math.abs(
          html.clientWidth - body.clientWidth - bodyMarginInline,
        );
        if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
          width -= clippingStableScrollbarWidth;
        }
      } else if (windowScrollbarX <= SCROLLBAR_MAX) {
        width += windowScrollbarX;
      }
      return {
        width,
        height,
        x,
        y,
      };
    }
    const absoluteOrFixed = new Set(["absolute", "fixed"]);

    function getInnerBoundingClientRect(element, strategy) {
      const clientRect = getBoundingClientRect(
        element,
        true,
        strategy === "fixed",
      );
      const top = clientRect.top + element.clientTop;
      const left = clientRect.left + element.clientLeft;
      const scale = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "isHTMLElement"
      ])(element)
        ? getScale(element)
        : (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "createCoords"
          ])(1);
      const width = element.clientWidth * scale.x;
      const height = element.clientHeight * scale.y;
      const x = left * scale.x;
      const y = top * scale.y;
      return {
        width,
        height,
        x,
        y,
      };
    }
    function getClientRectFromClippingAncestor(
      element,
      clippingAncestor,
      strategy,
    ) {
      let rect;
      if (clippingAncestor === "viewport") {
        rect = getViewportRect(element, strategy);
      } else if (clippingAncestor === "document") {
        rect = getDocumentRect(
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getDocumentElement"
          ])(element),
        );
      } else if (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isElement"
        ])(clippingAncestor)
      ) {
        rect = getInnerBoundingClientRect(clippingAncestor, strategy);
      } else {
        const visualOffsets = getVisualOffsets(element);
        rect = {
          x: clippingAncestor.x - visualOffsets.x,
          y: clippingAncestor.y - visualOffsets.y,
          width: clippingAncestor.width,
          height: clippingAncestor.height,
        };
      }
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "rectToClientRect"
      ])(rect);
    }
    function hasFixedPositionAncestor(element, stopNode) {
      const parentNode = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getParentNode"
      ])(element);
      if (
        parentNode === stopNode ||
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isElement"
        ])(parentNode) ||
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isLastTraversableNode"
        ])(parentNode)
      ) {
        return false;
      }
      return (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(parentNode).position === "fixed" ||
        hasFixedPositionAncestor(parentNode, stopNode)
      );
    }

    function getClippingElementAncestors(element, cache) {
      const cachedResult = cache.get(element);
      if (cachedResult) {
        return cachedResult;
      }
      let result = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getOverflowAncestors"
      ])(element, [], false).filter(
        (el) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isElement"
          ])(el) &&
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getNodeName"
          ])(el) !== "body",
      );
      let currentContainingBlockComputedStyle = null;
      const elementIsFixed =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(element).position === "fixed";
      let currentNode = elementIsFixed
        ? (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getParentNode"
          ])(element)
        : element;

      while (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isElement"
        ])(currentNode) &&
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isLastTraversableNode"
        ])(currentNode)
      ) {
        const computedStyle = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(currentNode);
        const currentNodeIsContaining = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isContainingBlock"
        ])(currentNode);
        if (!currentNodeIsContaining && computedStyle.position === "fixed") {
          currentContainingBlockComputedStyle = null;
        }
        const shouldDropCurrentNode = elementIsFixed
          ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
          : (!currentNodeIsContaining &&
              computedStyle.position === "static" &&
              !!currentContainingBlockComputedStyle &&
              absoluteOrFixed.has(
                currentContainingBlockComputedStyle.position,
              )) ||
            ((0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "isOverflowElement"
            ])(currentNode) &&
              !currentNodeIsContaining &&
              hasFixedPositionAncestor(element, currentNode));
        if (shouldDropCurrentNode) {
          result = result.filter((ancestor) => ancestor !== currentNode);
        } else {
          currentContainingBlockComputedStyle = computedStyle;
        }
        currentNode = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getParentNode"
        ])(currentNode);
      }
      cache.set(element, result);
      return result;
    }

    function getClippingRect(_ref) {
      let { element, boundary, rootBoundary, strategy } = _ref;
      const elementClippingAncestors =
        boundary === "clippingAncestors"
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "isTopLayer"
            ])(element)
            ? []
            : getClippingElementAncestors(element, this._c)
          : [].concat(boundary);
      const clippingAncestors = [...elementClippingAncestors, rootBoundary];
      const firstClippingAncestor = clippingAncestors[0];
      const clippingRect = clippingAncestors.reduce(
        (accRect, clippingAncestor) => {
          const rect = getClientRectFromClippingAncestor(
            element,
            clippingAncestor,
            strategy,
          );
          accRect.top = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "max"
          ])(rect.top, accRect.top);
          accRect.right = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "min"
          ])(rect.right, accRect.right);
          accRect.bottom = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "min"
          ])(rect.bottom, accRect.bottom);
          accRect.left = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "max"
          ])(rect.left, accRect.left);
          return accRect;
        },
        getClientRectFromClippingAncestor(
          element,
          firstClippingAncestor,
          strategy,
        ),
      );
      return {
        width: clippingRect.right - clippingRect.left,
        height: clippingRect.bottom - clippingRect.top,
        x: clippingRect.left,
        y: clippingRect.top,
      };
    }
    function getDimensions(element) {
      const { width, height } = getCssDimensions(element);
      return {
        width,
        height,
      };
    }
    function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
      const isOffsetParentAnElement = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "isHTMLElement"
      ])(offsetParent);
      const documentElement = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDocumentElement"
      ])(offsetParent);
      const isFixed = strategy === "fixed";
      const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
      let scroll = {
        scrollLeft: 0,
        scrollTop: 0,
      };
      const offsets = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "createCoords"
      ])(0);

      function setLeftRTLScrollbarOffset() {
        offsets.x = getWindowScrollBarX(documentElement);
      }
      if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getNodeName"
          ])(offsetParent) !== "body" ||
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isOverflowElement"
          ])(documentElement)
        ) {
          scroll = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getNodeScroll"
          ])(offsetParent);
        }
        if (isOffsetParentAnElement) {
          const offsetRect = getBoundingClientRect(
            offsetParent,
            true,
            isFixed,
            offsetParent,
          );
          offsets.x = offsetRect.x + offsetParent.clientLeft;
          offsets.y = offsetRect.y + offsetParent.clientTop;
        } else if (documentElement) {
          setLeftRTLScrollbarOffset();
        }
      }
      if (isFixed && !isOffsetParentAnElement && documentElement) {
        setLeftRTLScrollbarOffset();
      }
      const htmlOffset =
        documentElement && !isOffsetParentAnElement && !isFixed
          ? getHTMLOffset(documentElement, scroll)
          : (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "createCoords"
            ])(0);
      const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
      const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
      return {
        x,
        y,
        width: rect.width,
        height: rect.height,
      };
    }
    function isStaticPositioned(element) {
      return (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(element).position === "static"
      );
    }
    function getTrueOffsetParent(element, polyfill) {
      if (
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isHTMLElement"
        ])(element) ||
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(element).position === "fixed"
      ) {
        return null;
      }
      if (polyfill) {
        return polyfill(element);
      }
      let rawOffsetParent = element.offsetParent;

      if (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getDocumentElement"
        ])(element) === rawOffsetParent
      ) {
        rawOffsetParent = rawOffsetParent.ownerDocument.body;
      }
      return rawOffsetParent;
    }

    function getOffsetParent(element, polyfill) {
      const win = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getWindow"
      ])(element);
      if (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isTopLayer"
        ])(element)
      ) {
        return win;
      }
      if (
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isHTMLElement"
        ])(element)
      ) {
        let svgOffsetParent = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getParentNode"
        ])(element);
        while (
          svgOffsetParent &&
          !(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "isLastTraversableNode"
          ])(svgOffsetParent)
        ) {
          if (
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "isElement"
            ])(svgOffsetParent) &&
            !isStaticPositioned(svgOffsetParent)
          ) {
            return svgOffsetParent;
          }
          svgOffsetParent = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "getParentNode"
          ])(svgOffsetParent);
        }
        return win;
      }
      let offsetParent = getTrueOffsetParent(element, polyfill);
      while (
        offsetParent &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isTableElement"
        ])(offsetParent) &&
        isStaticPositioned(offsetParent)
      ) {
        offsetParent = getTrueOffsetParent(offsetParent, polyfill);
      }
      if (
        offsetParent &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isLastTraversableNode"
        ])(offsetParent) &&
        isStaticPositioned(offsetParent) &&
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isContainingBlock"
        ])(offsetParent)
      ) {
        return win;
      }
      return (
        offsetParent ||
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getContainingBlock"
        ])(element) ||
        win
      );
    }
    const getElementRects = async function (data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(
          data.reference,
          await getOffsetParentFn(data.floating),
          data.strategy,
        ),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height,
        },
      };
    };
    function isRTL(element) {
      return (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getComputedStyle"
        ])(element).direction === "rtl"
      );
    }
    const platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "getDocumentElement"
        ],
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isElement"
        ],
      isRTL,
    };
    function rectsAreEqual(a, b) {
      return (
        a.x === b.x &&
        a.y === b.y &&
        a.width === b.width &&
        a.height === b.height
      );
    }

    function observeMove(element, onMove) {
      let io = null;
      let timeoutId;
      const root = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "getDocumentElement"
      ])(element);
      function cleanup() {
        var _io;
        clearTimeout(timeoutId);
        (_io = io) == null || _io.disconnect();
        io = null;
      }
      function refresh(skip, threshold) {
        if (skip === void 0) {
          skip = false;
        }
        if (threshold === void 0) {
          threshold = 1;
        }
        cleanup();
        const elementRectForRootMargin = element.getBoundingClientRect();
        const { left, top, width, height } = elementRectForRootMargin;
        if (!skip) {
          onMove();
        }
        if (!width || !height) {
          return;
        }
        const insetTop = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "floor"
        ])(top);
        const insetRight = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "floor"
        ])(root.clientWidth - (left + width));
        const insetBottom = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "floor"
        ])(root.clientHeight - (top + height));
        const insetLeft = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "floor"
        ])(left);
        const rootMargin =
          -insetTop +
          "px " +
          -insetRight +
          "px " +
          -insetBottom +
          "px " +
          -insetLeft +
          "px";
        const options = {
          rootMargin,
          threshold:
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "max"
            ])(
              0,
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "min"
              ])(1, threshold),
            ) || 1,
        };
        let isFirstUpdate = true;
        function handleObserve(entries) {
          const ratio = entries[0].intersectionRatio;
          if (ratio !== threshold) {
            if (!isFirstUpdate) {
              return refresh();
            }
            if (!ratio) {
              timeoutId = setTimeout(() => {
                refresh(false, 1e-7);
              }, 1000);
            } else {
              refresh(false, ratio);
            }
          }
          if (
            ratio === 1 &&
            !rectsAreEqual(
              elementRectForRootMargin,
              element.getBoundingClientRect(),
            )
          ) {
            refresh();
          }
          isFirstUpdate = false;
        }

        try {
          io = new IntersectionObserver(handleObserve, {
            ...options,

            root: root.ownerDocument,
          });
        } catch (_e) {
          io = new IntersectionObserver(handleObserve, options);
        }
        io.observe(element);
      }
      refresh(true);
      return cleanup;
    }

    function autoUpdate(reference, floating, update, options) {
      if (options === void 0) {
        options = {};
      }
      const {
        ancestorScroll = true,
        ancestorResize = true,
        elementResize = typeof ResizeObserver === "function",
        layoutShift = typeof IntersectionObserver === "function",
        animationFrame = false,
      } = options;
      const referenceEl = unwrapElement(reference);
      const ancestors =
        ancestorScroll || ancestorResize
          ? [
              ...(referenceEl
                ? (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "getOverflowAncestors"
                  ])(referenceEl)
                : []),
              ...(0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "getOverflowAncestors"
              ])(floating),
            ]
          : [];
      ancestors.forEach((ancestor) => {
        ancestorScroll &&
          ancestor.addEventListener("scroll", update, {
            passive: true,
          });
        ancestorResize && ancestor.addEventListener("resize", update);
      });
      const cleanupIo =
        referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
      let reobserveFrame = -1;
      let resizeObserver = null;
      if (elementResize) {
        resizeObserver = new ResizeObserver((_ref) => {
          let [firstEntry] = _ref;
          if (
            firstEntry &&
            firstEntry.target === referenceEl &&
            resizeObserver
          ) {
            resizeObserver.unobserve(floating);
            cancelAnimationFrame(reobserveFrame);
            reobserveFrame = requestAnimationFrame(() => {
              var _resizeObserver;
              (_resizeObserver = resizeObserver) == null ||
                _resizeObserver.observe(floating);
            });
          }
          update();
        });
        if (referenceEl && !animationFrame) {
          resizeObserver.observe(referenceEl);
        }
        resizeObserver.observe(floating);
      }
      let frameId;
      let prevRefRect = animationFrame
        ? getBoundingClientRect(reference)
        : null;
      if (animationFrame) {
        frameLoop();
      }
      function frameLoop() {
        const nextRefRect = getBoundingClientRect(reference);
        if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
          update();
        }
        prevRefRect = nextRefRect;
        frameId = requestAnimationFrame(frameLoop);
      }
      update();
      return () => {
        var _resizeObserver2;
        ancestors.forEach((ancestor) => {
          ancestorScroll && ancestor.removeEventListener("scroll", update);
          ancestorResize && ancestor.removeEventListener("resize", update);
        });
        cleanupIo == null || cleanupIo();
        (_resizeObserver2 = resizeObserver) == null ||
          _resizeObserver2.disconnect();
        resizeObserver = null;
        if (animationFrame) {
          cancelAnimationFrame(frameId);
        }
      };
    }

    const detectOverflow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "detectOverflow"
      ];

    const offset =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "offset"
      ];

    const autoPlacement =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "autoPlacement"
      ];

    const shift =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "shift"
      ];

    const flip =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "flip"
      ];

    const size =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "size"
      ];

    const hide =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "hide"
      ];

    const arrow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "arrow"
      ];

    const inline =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "inline"
      ];

    const limitShift =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "limitShift"
      ];

    const computePosition = (reference, floating, options) => {
      const cache = new Map();
      const mergedOptions = {
        platform,
        ...options,
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache,
      };
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "computePosition"
      ])(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache,
      });
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "arrow",
      () => arrow,
      "autoPlacement",
      () => autoPlacement,
      "flip",
      () => flip,
      "hide",
      () => hide,
      "inline",
      () => inline,
      "limitShift",
      () => limitShift,
      "offset",
      () => offset,
      "shift",
      () => shift,
      "size",
      () => size,
      "useFloating",
      () => useFloating,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-ssr] (ecmascript) <locals>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)",
      );
    var isClient = typeof document !== "undefined";
    var noop = function noop() {};
    var index = isClient
      ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ]
      : noop;

    function deepEqual(a, b) {
      if (a === b) {
        return true;
      }
      if (typeof a !== typeof b) {
        return false;
      }
      if (typeof a === "function" && a.toString() === b.toString()) {
        return true;
      }
      let length;
      let i;
      let keys;
      if (a && b && typeof a === "object") {
        if (Array.isArray(a)) {
          length = a.length;
          if (length !== b.length) return false;
          for (i = length; i-- !== 0; ) {
            if (!deepEqual(a[i], b[i])) {
              return false;
            }
          }
          return true;
        }
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
          return false;
        }
        for (i = length; i-- !== 0; ) {
          if (!{}.hasOwnProperty.call(b, keys[i])) {
            return false;
          }
        }
        for (i = length; i-- !== 0; ) {
          const key = keys[i];
          if (key === "_owner" && a.$$typeof) {
            continue;
          }
          if (!deepEqual(a[key], b[key])) {
            return false;
          }
        }
        return true;
      }
      return a !== a && b !== b;
    }
    function getDPR(element) {
      if (("TURBOPACK compile-time truthy", 1)) {
        return 1;
      }

      const win = undefined;
    }
    function roundByDPR(element, value) {
      const dpr = getDPR(element);
      return Math.round(value * dpr) / dpr;
    }
    function useLatestRef(value) {
      const ref =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](value);
      index(() => {
        ref.current = value;
      });
      return ref;
    }

    function useFloating(options) {
      if (options === void 0) {
        options = {};
      }
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform,
        elements: {
          reference: externalReference,
          floating: externalFloating,
        } = {},
        transform = true,
        whileElementsMounted,
        open,
      } = options;
      const [data, setData] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ]({
          x: 0,
          y: 0,
          strategy,
          placement,
          middlewareData: {},
          isPositioned: false,
        });
      const [latestMiddleware, setLatestMiddleware] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](middleware);
      if (!deepEqual(latestMiddleware, middleware)) {
        setLatestMiddleware(middleware);
      }
      const [_reference, _setReference] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](null);
      const [_floating, _setFloating] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](null);
      const setReference =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useCallback"
        ]((node) => {
          if (node !== referenceRef.current) {
            referenceRef.current = node;
            _setReference(node);
          }
        }, []);
      const setFloating =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useCallback"
        ]((node) => {
          if (node !== floatingRef.current) {
            floatingRef.current = node;
            _setFloating(node);
          }
        }, []);
      const referenceEl = externalReference || _reference;
      const floatingEl = externalFloating || _floating;
      const referenceRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](null);
      const floatingRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](null);
      const dataRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](data);
      const hasWhileElementsMounted = whileElementsMounted != null;
      const whileElementsMountedRef = useLatestRef(whileElementsMounted);
      const platformRef = useLatestRef(platform);
      const openRef = useLatestRef(open);
      const update =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useCallback"
        ](() => {
          if (!referenceRef.current || !floatingRef.current) {
            return;
          }
          const config = {
            placement,
            strategy,
            middleware: latestMiddleware,
          };
          if (platformRef.current) {
            config.platform = platformRef.current;
          }
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
            "computePosition"
          ])(referenceRef.current, floatingRef.current, config).then((data) => {
            const fullData = {
              ...data,

              isPositioned: openRef.current !== false,
            };
            if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
              dataRef.current = fullData;
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "flushSync"
              ](() => {
                setData(fullData);
              });
            }
          });
        }, [latestMiddleware, placement, strategy, platformRef, openRef]);
      index(() => {
        if (open === false && dataRef.current.isPositioned) {
          dataRef.current.isPositioned = false;
          setData((data) => ({
            ...data,
            isPositioned: false,
          }));
        }
      }, [open]);
      const isMountedRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](false);
      index(() => {
        isMountedRef.current = true;
        return () => {
          isMountedRef.current = false;
        };
      }, []);
      index(() => {
        if (referenceEl) referenceRef.current = referenceEl;
        if (floatingEl) floatingRef.current = floatingEl;
        if (referenceEl && floatingEl) {
          if (whileElementsMountedRef.current) {
            return whileElementsMountedRef.current(
              referenceEl,
              floatingEl,
              update,
            );
          }
          update();
        }
      }, [
        referenceEl,
        floatingEl,
        update,
        whileElementsMountedRef,
        hasWhileElementsMounted,
      ]);
      const refs =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useMemo"
        ](
          () => ({
            reference: referenceRef,
            floating: floatingRef,
            setReference,
            setFloating,
          }),
          [setReference, setFloating],
        );
      const elements =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useMemo"
        ](
          () => ({
            reference: referenceEl,
            floating: floatingEl,
          }),
          [referenceEl, floatingEl],
        );
      const floatingStyles =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useMemo"
        ](() => {
          const initialStyles = {
            position: strategy,
            left: 0,
            top: 0,
          };
          if (!elements.floating) {
            return initialStyles;
          }
          const x = roundByDPR(elements.floating, data.x);
          const y = roundByDPR(elements.floating, data.y);
          if (transform) {
            return {
              ...initialStyles,
              transform: "translate(" + x + "px, " + y + "px)",
              ...(getDPR(elements.floating) >= 1.5 && {
                willChange: "transform",
              }),
            };
          }
          return {
            position: strategy,
            left: x,
            top: y,
          };
        }, [strategy, transform, elements.floating, data.x, data.y]);
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useMemo"
      ](
        () => ({
          ...data,
          update,
          refs,
          elements,
          floatingStyles,
        }),
        [data, update, refs, elements, floatingStyles],
      );
    }

    const arrow$1 = (options) => {
      function isRef(value) {
        return {}.hasOwnProperty.call(value, "current");
      }
      return {
        name: "arrow",
        options,
        fn(state) {
          const { element, padding } =
            typeof options === "function" ? options(state) : options;
          if (element && isRef(element)) {
            if (element.current != null) {
              return (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                "arrow"
              ])({
                element: element.current,
                padding,
              }).fn(state);
            }
            return {};
          }
          if (element) {
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
              "arrow"
            ])({
              element,
              padding,
            }).fn(state);
          }
          return {};
        },
      };
    };

    const offset = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "offset"
      ])(options),
      options: [options, deps],
    });

    const shift = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "shift"
      ])(options),
      options: [options, deps],
    });

    const limitShift = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "limitShift"
      ])(options),
      options: [options, deps],
    });

    const flip = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "flip"
      ])(options),
      options: [options, deps],
    });

    const size = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "size"
      ])(options),
      options: [options, deps],
    });

    const autoPlacement = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "autoPlacement"
      ])(options),
      options: [options, deps],
    });

    const hide = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "hide"
      ])(options),
      options: [options, deps],
    });

    const inline = (options, deps) => ({
      ...(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
        "inline"
      ])(options),
      options: [options, deps],
    });

    const arrow = (options, deps) => ({
      ...arrow$1(options),
      options: [options, deps],
    });
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-arrow/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Arrow", () => Arrow, "Root", () => Root]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)",
      );
    var NAME = "Arrow";
    var Arrow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { children, width = 10, height = 5, ...arrowProps } = props;
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].svg,
          {
            ...arrowProps,
            ref: forwardedRef,
            width,
            height,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: props.asChild
              ? children
              : (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsx"
                ])("polygon", {
                  points: "0,0 30,0 15,10",
                }),
          },
        );
      });
    Arrow.displayName = NAME;
    var Root = Arrow;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-size/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["useSize", () => useSize]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)",
      );
    function useSize(element) {
      const [size, setSize] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](void 0);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useLayoutEffect"
      ])(() => {
        if (element) {
          setSize({
            width: element.offsetWidth,
            height: element.offsetHeight,
          });
          const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries)) {
              return;
            }
            if (!entries.length) {
              return;
            }
            const entry = entries[0];
            let width;
            let height;
            if ("borderBoxSize" in entry) {
              const borderSizeEntry = entry["borderBoxSize"];
              const borderSize = Array.isArray(borderSizeEntry)
                ? borderSizeEntry[0]
                : borderSizeEntry;
              width = borderSize["inlineSize"];
              height = borderSize["blockSize"];
            } else {
              width = element.offsetWidth;
              height = element.offsetHeight;
            }
            setSize({
              width,
              height,
            });
          });
          resizeObserver.observe(element, {
            box: "border-box",
          });
          return () => resizeObserver.unobserve(element);
        } else {
          setSize(void 0);
        }
      }, [element]);
      return size;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-popper/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "ALIGN_OPTIONS",
      () => ALIGN_OPTIONS,
      "Anchor",
      () => Anchor,
      "Arrow",
      () => Arrow,
      "Content",
      () => Content,
      "Popper",
      () => Popper,
      "PopperAnchor",
      () => PopperAnchor,
      "PopperArrow",
      () => PopperArrow,
      "PopperContent",
      () => PopperContent,
      "Root",
      () => Root2,
      "SIDE_OPTIONS",
      () => SIDE_OPTIONS,
      "createPopperScope",
      () => createPopperScope,
    ]);

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-ssr] (ecmascript) <locals>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$arrow$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-arrow/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$callback$2d$ref$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-size/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)",
      );
    ("use client");
    var SIDE_OPTIONS = ["top", "right", "bottom", "left"];
    var ALIGN_OPTIONS = ["start", "center", "end"];
    var POPPER_NAME = "Popper";
    var [createPopperContext, createPopperScope] = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createContextScope"
    ])(POPPER_NAME);
    var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
    var Popper = (props) => {
      const { __scopePopper, children } = props;
      const [anchor, setAnchor] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](null);
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsx"
      ])(PopperProvider, {
        scope: __scopePopper,
        anchor,
        onAnchorChange: setAnchor,
        children,
      });
    };
    Popper.displayName = POPPER_NAME;
    var ANCHOR_NAME = "PopperAnchor";
    var PopperAnchor =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopePopper, virtualRef, ...anchorProps } = props;
        const context = usePopperContext(ANCHOR_NAME, __scopePopper);
        const ref =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](null);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, ref);
        const anchorRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](null);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          const previousAnchor = anchorRef.current;
          anchorRef.current = virtualRef?.current || ref.current;
          if (previousAnchor !== anchorRef.current) {
            context.onAnchorChange(anchorRef.current);
          }
        });
        return virtualRef
          ? null
          : (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Primitive"
              ].div,
              {
                ...anchorProps,
                ref: composedRefs,
              },
            );
      });
    PopperAnchor.displayName = ANCHOR_NAME;
    var CONTENT_NAME = "PopperContent";
    var [PopperContentProvider, useContentContext] =
      createPopperContext(CONTENT_NAME);
    var PopperContent =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const {
          __scopePopper,
          side = "bottom",
          sideOffset = 0,
          align = "center",
          alignOffset = 0,
          arrowPadding = 0,
          avoidCollisions = true,
          collisionBoundary = [],
          collisionPadding: collisionPaddingProp = 0,
          sticky = "partial",
          hideWhenDetached = false,
          updatePositionStrategy = "optimized",
          onPlaced,
          ...contentProps
        } = props;
        const context = usePopperContext(CONTENT_NAME, __scopePopper);
        const [content, setContent] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, (node) => setContent(node));
        const [arrow, setArrow] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const arrowSize = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useSize"
        ])(arrow);
        const arrowWidth = arrowSize?.width ?? 0;
        const arrowHeight = arrowSize?.height ?? 0;
        const desiredPlacement = side + (align !== "center" ? "-" + align : "");
        const collisionPadding =
          typeof collisionPaddingProp === "number"
            ? collisionPaddingProp
            : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                ...collisionPaddingProp,
              };
        const boundary = Array.isArray(collisionBoundary)
          ? collisionBoundary
          : [collisionBoundary];
        const hasExplicitBoundaries = boundary.length > 0;
        const detectOverflowOptions = {
          padding: collisionPadding,
          boundary: boundary.filter(isNotNull),

          altBoundary: hasExplicitBoundaries,
        };
        const {
          refs,
          floatingStyles,
          placement,
          isPositioned,
          middlewareData,
        } = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
          "useFloating"
        ])({
          strategy: "fixed",
          placement: desiredPlacement,
          whileElementsMounted: (...args) => {
            const cleanup = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
              "autoUpdate"
            ])(...args, {
              animationFrame: updatePositionStrategy === "always",
            });
            return cleanup;
          },
          elements: {
            reference: context.anchor,
          },
          middleware: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
              "offset"
            ])({
              mainAxis: sideOffset + arrowHeight,
              alignmentAxis: alignOffset,
            }),
            avoidCollisions &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                "shift"
              ])({
                mainAxis: true,
                crossAxis: false,
                limiter:
                  sticky === "partial"
                    ? (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                        "limitShift"
                      ])()
                    : void 0,
                ...detectOverflowOptions,
              }),
            avoidCollisions &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                "flip"
              ])({
                ...detectOverflowOptions,
              }),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
              "size"
            ])({
              ...detectOverflowOptions,
              apply: ({ elements, rects, availableWidth, availableHeight }) => {
                const { width: anchorWidth, height: anchorHeight } =
                  rects.reference;
                const contentStyle = elements.floating.style;
                contentStyle.setProperty(
                  "--radix-popper-available-width",
                  `${availableWidth}px`,
                );
                contentStyle.setProperty(
                  "--radix-popper-available-height",
                  `${availableHeight}px`,
                );
                contentStyle.setProperty(
                  "--radix-popper-anchor-width",
                  `${anchorWidth}px`,
                );
                contentStyle.setProperty(
                  "--radix-popper-anchor-height",
                  `${anchorHeight}px`,
                );
              },
            }),
            arrow &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                "arrow"
              ])({
                element: arrow,
                padding: arrowPadding,
              }),
            transformOrigin({
              arrowWidth,
              arrowHeight,
            }),
            hideWhenDetached &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                "hide"
              ])({
                strategy: "referenceHidden",
                ...detectOverflowOptions,
              }),
          ],
        });
        const [placedSide, placedAlign] =
          getSideAndAlignFromPlacement(placement);
        const handlePlaced = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$callback$2d$ref$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useCallbackRef"
        ])(onPlaced);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          if (isPositioned) {
            handlePlaced?.();
          }
        }, [isPositioned, handlePlaced]);
        const arrowX = middlewareData.arrow?.x;
        const arrowY = middlewareData.arrow?.y;
        const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
        const [contentZIndex, setContentZIndex] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ]();
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          if (content)
            setContentZIndex(window.getComputedStyle(content).zIndex);
        }, [content]);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])("div", {
          ref: refs.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...floatingStyles,
            transform: isPositioned
              ? floatingStyles.transform
              : "translate(0, -200%)",

            minWidth: "max-content",
            zIndex: contentZIndex,
            ["--radix-popper-transform-origin"]: [
              middlewareData.transformOrigin?.x,
              middlewareData.transformOrigin?.y,
            ].join(" "),

            ...(middlewareData.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none",
            }),
          },
          dir: props.dir,
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])(PopperContentProvider, {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Primitive"
              ].div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,

                  animation: !isPositioned ? "none" : void 0,
                },
              },
            ),
          }),
        });
      });
    PopperContent.displayName = CONTENT_NAME;
    var ARROW_NAME = "PopperArrow";
    var OPPOSITE_SIDE = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    };
    var PopperArrow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](function PopperArrow2(props, forwardedRef) {
        const { __scopePopper, ...arrowProps } = props;
        const contentContext = useContentContext(ARROW_NAME, __scopePopper);
        const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])("span", {
          ref: contentContext.onArrowChange,
          style: {
            position: "absolute",
            left: contentContext.arrowX,
            top: contentContext.arrowY,
            [baseSide]: 0,
            transformOrigin: {
              top: "",
              right: "0 0",
              bottom: "center 0",
              left: "100% 0",
            }[contentContext.placedSide],
            transform: {
              top: "translateY(100%)",
              right: "translateY(50%) rotate(90deg) translateX(-50%)",
              bottom: `rotate(180deg)`,
              left: "translateY(50%) rotate(-90deg) translateX(50%)",
            }[contentContext.placedSide],
            visibility: contentContext.shouldHideArrow ? "hidden" : void 0,
          },
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$arrow$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "Root"
            ],
            {
              ...arrowProps,
              ref: forwardedRef,
              style: {
                ...arrowProps.style,

                display: "block",
              },
            },
          ),
        });
      });
    PopperArrow.displayName = ARROW_NAME;
    function isNotNull(value) {
      return value !== null;
    }
    var transformOrigin = (options) => ({
      name: "transformOrigin",
      options,
      fn(data) {
        const { placement, rects, middlewareData } = data;
        const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
        const isArrowHidden = cannotCenterArrow;
        const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
        const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
        const [placedSide, placedAlign] =
          getSideAndAlignFromPlacement(placement);
        const noArrowAlign = {
          start: "0%",
          center: "50%",
          end: "100%",
        }[placedAlign];
        const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
        const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
        let x = "";
        let y = "";
        if (placedSide === "bottom") {
          x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
          y = `${-arrowHeight}px`;
        } else if (placedSide === "top") {
          x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
          y = `${rects.floating.height + arrowHeight}px`;
        } else if (placedSide === "right") {
          x = `${-arrowHeight}px`;
          y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
        } else if (placedSide === "left") {
          x = `${rects.floating.width + arrowHeight}px`;
          y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
        }
        return {
          data: {
            x,
            y,
          },
        };
      },
    });
    function getSideAndAlignFromPlacement(placement) {
      const [side, align = "center"] = placement.split("-");
      return [side, align];
    }
    var Root2 = Popper;
    var Anchor = PopperAnchor;
    var Content = PopperContent;
    var Arrow = PopperArrow;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Root",
      () => Slot,
      "Slot",
      () => Slot,
      "Slottable",
      () => Slottable,
      "createSlot",
      () => createSlot,
      "createSlottable",
      () => createSlottable,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)",
      );
    function createSlot(ownerName) {
      const SlotClone = createSlotClone(ownerName);
      const Slot2 =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "forwardRef"
        ]((props, forwardedRef) => {
          const { children, ...slotProps } = props;
          const childrenArray =
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "Children"
            ].toArray(children);
          const slottable = childrenArray.find(isSlottable);
          if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child) => {
              if (child === slottable) {
                if (
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Children"
                  ].count(newElement) > 1
                )
                  return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Children"
                  ].only(null);
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "isValidElement"
                ](newElement)
                  ? newElement.props.children
                  : null;
              } else {
                return child;
              }
            });
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(SlotClone, {
              ...slotProps,
              ref: forwardedRef,
              children:
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "isValidElement"
                ](newElement)
                  ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "cloneElement"
                    ](newElement, void 0, newChildren)
                  : null,
            });
          }
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children,
          });
        });
      Slot2.displayName = `${ownerName}.Slot`;
      return Slot2;
    }
    var Slot = createSlot("Slot");

    function createSlotClone(ownerName) {
      const SlotClone =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "forwardRef"
        ]((props, forwardedRef) => {
          const { children, ...slotProps } = props;
          if (
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "isValidElement"
            ](children)
          ) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (
              children.type !==
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Fragment"
              ]
            ) {
              props2.ref = forwardedRef
                ? (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "composeRefs"
                  ])(forwardedRef, childrenRef)
                : childrenRef;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cloneElement"
            ](children, props2);
          }
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Children"
          ].count(children) > 1
            ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Children"
              ].only(null)
            : null;
        });
      SlotClone.displayName = `${ownerName}.SlotClone`;
      return SlotClone;
    }
    var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");

    function createSlottable(ownerName) {
      const Slottable2 = ({ children }) => {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Fragment"
          ],
          {
            children,
          },
        );
      };
      Slottable2.displayName = `${ownerName}.Slottable`;
      Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
      return Slottable2;
    }
    var Slottable = createSlottable("Slottable");
    function isSlottable(child) {
      return (
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "isValidElement"
        ](child) &&
        typeof child.type === "function" &&
        "__radixId" in child.type &&
        child.type.__radixId === SLOTTABLE_IDENTIFIER
      );
    }
    function mergeProps(slotProps, childProps) {
      const overrideProps = {
        ...childProps,
      };
      for (const propName in childProps) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
          if (slotPropValue && childPropValue) {
            overrideProps[propName] = (...args) => {
              const result = childPropValue(...args);
              slotPropValue(...args);
              return result;
            };
          } else if (slotPropValue) {
            overrideProps[propName] = slotPropValue;
          }
        } else if (propName === "style") {
          overrideProps[propName] = {
            ...slotPropValue,
            ...childPropValue,
          };
        } else if (propName === "className") {
          overrideProps[propName] = [slotPropValue, childPropValue]
            .filter(Boolean)
            .join(" ");
        }
      }
      return {
        ...slotProps,
        ...overrideProps,
      };
    }
    function getElementRef(element) {
      let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
      let mayWarn =
        getter && "isReactWarning" in getter && getter.isReactWarning;
      if (mayWarn) {
        return element.ref;
      }
      getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
      mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
      if (mayWarn) {
        return element.props.ref;
      }
      return element.props.ref || element.ref;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["usePrevious", () => usePrevious]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    function usePrevious(value) {
      const ref =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ]({
          value,
          previous: value,
        });
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useMemo"
      ](() => {
        if (ref.current.value !== value) {
          ref.current.previous = ref.current.value;
          ref.current.value = value;
        }
        return ref.current.previous;
      }, [value]);
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Arrow",
      () => Arrow2,
      "Content",
      () => Content2,
      "Group",
      () => Group,
      "Icon",
      () => Icon,
      "Item",
      () => Item,
      "ItemIndicator",
      () => ItemIndicator,
      "ItemText",
      () => ItemText,
      "Label",
      () => Label,
      "Portal",
      () => Portal,
      "Root",
      () => Root2,
      "ScrollDownButton",
      () => ScrollDownButton,
      "ScrollUpButton",
      () => ScrollUpButton,
      "Select",
      () => Select,
      "SelectArrow",
      () => SelectArrow,
      "SelectContent",
      () => SelectContent,
      "SelectGroup",
      () => SelectGroup,
      "SelectIcon",
      () => SelectIcon,
      "SelectItem",
      () => SelectItem,
      "SelectItemIndicator",
      () => SelectItemIndicator,
      "SelectItemText",
      () => SelectItemText,
      "SelectLabel",
      () => SelectLabel,
      "SelectPortal",
      () => SelectPortal,
      "SelectScrollDownButton",
      () => SelectScrollDownButton,
      "SelectScrollUpButton",
      () => SelectScrollUpButton,
      "SelectSeparator",
      () => SelectSeparator,
      "SelectTrigger",
      () => SelectTrigger,
      "SelectValue",
      () => SelectValue,
      "SelectViewport",
      () => SelectViewport,
      "Separator",
      () => Separator,
      "Trigger",
      () => Trigger,
      "Value",
      () => Value,
      "Viewport",
      () => Viewport,
      "createSelectScope",
      () => createSelectScope,
    ]);

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$number$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/number/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/primitive/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collection$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-collection/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$direction$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-direction/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dismissable$2d$layer$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$focus$2d$guards$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-focus-guards/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$focus$2d$scope$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-focus-scope/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-id/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-popper/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$portal$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-portal/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$callback$2d$ref$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$visually$2d$hidden$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$aria$2d$hidden$2f$dist$2f$es2015$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/aria-hidden/dist/es2015/index.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$react$2d$remove$2d$scroll$2f$dist$2f$es2015$2f$Combination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RemoveScroll$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react-remove-scroll/dist/es2015/Combination.js [app-ssr] (ecmascript) <export default as RemoveScroll>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)",
      );
    ("use client");
    var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
    var SELECTION_KEYS = [" ", "Enter"];
    var SELECT_NAME = "Select";
    var [Collection, useCollection, createCollectionScope] = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collection$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createCollection"
    ])(SELECT_NAME);
    var [createSelectContext, createSelectScope] = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createContextScope"
    ])(SELECT_NAME, [
      createCollectionScope,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "createPopperScope"
      ],
    ]);
    var usePopperScope = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createPopperScope"
    ])();
    var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
    var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] =
      createSelectContext(SELECT_NAME);
    var Select = (props) => {
      const {
        __scopeSelect,
        children,
        open: openProp,
        defaultOpen,
        onOpenChange,
        value: valueProp,
        defaultValue,
        onValueChange,
        dir,
        name,
        autoComplete,
        disabled,
        required,
        form,
      } = props;
      const popperScope = usePopperScope(__scopeSelect);
      const [trigger, setTrigger] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](null);
      const [valueNode, setValueNode] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](null);
      const [valueNodeHasChildren, setValueNodeHasChildren] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](false);
      const direction = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$direction$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useDirection"
      ])(dir);
      const [open, setOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useControllableState"
      ])({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: SELECT_NAME,
      });
      const [value, setValue] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useControllableState"
      ])({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange,
        caller: SELECT_NAME,
      });
      const triggerPointerDownPosRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](null);
      const isFormControl = trigger ? form || !!trigger.closest("form") : true;
      const [nativeOptionsSet, setNativeOptionsSet] =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ](new Set());
      const nativeSelectKey = Array.from(nativeOptionsSet)
        .map((option) => option.props.value)
        .join(";");
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsx"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "Root"
        ],
        {
          ...popperScope,
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxs"
          ])(SelectProvider, {
            required,
            scope: __scopeSelect,
            trigger,
            onTriggerChange: setTrigger,
            valueNode,
            onValueNodeChange: setValueNode,
            valueNodeHasChildren,
            onValueNodeHasChildrenChange: setValueNodeHasChildren,
            contentId: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "useId"
            ])(),
            value,
            onValueChange: setValue,
            open,
            onOpenChange: setOpen,
            dir: direction,
            triggerPointerDownPosRef,
            disabled,
            children: [
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsx"
              ])(Collection.Provider, {
                scope: __scopeSelect,
                children: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsx"
                ])(SelectNativeOptionsProvider, {
                  scope: props.__scopeSelect,
                  onNativeOptionAdd:
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "useCallback"
                    ]((option) => {
                      setNativeOptionsSet((prev) => new Set(prev).add(option));
                    }, []),
                  onNativeOptionRemove:
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "useCallback"
                    ]((option) => {
                      setNativeOptionsSet((prev) => {
                        const optionsSet = new Set(prev);
                        optionsSet.delete(option);
                        return optionsSet;
                      });
                    }, []),
                  children,
                }),
              }),
              isFormControl
                ? (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxs"
                  ])(
                    SelectBubbleInput,
                    {
                      "aria-hidden": true,
                      required,
                      tabIndex: -1,
                      name,
                      autoComplete,
                      value,
                      onChange: (event) => setValue(event.target.value),
                      disabled,
                      form,
                      children: [
                        value === void 0
                          ? (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsx"
                            ])("option", {
                              value: "",
                            })
                          : null,
                        Array.from(nativeOptionsSet),
                      ],
                    },
                    nativeSelectKey,
                  )
                : null,
            ],
          }),
        },
      );
    };
    Select.displayName = SELECT_NAME;
    var TRIGGER_NAME = "SelectTrigger";
    var SelectTrigger =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, disabled = false, ...triggerProps } = props;
        const popperScope = usePopperScope(__scopeSelect);
        const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
        const isDisabled = context.disabled || disabled;
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, context.onTriggerChange);
        const getItems = useCollection(__scopeSelect);
        const pointerTypeRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ]("touch");
        const [searchRef, handleTypeaheadSearch, resetTypeahead] =
          useTypeaheadSearch((search) => {
            const enabledItems = getItems().filter((item) => !item.disabled);
            const currentItem = enabledItems.find(
              (item) => item.value === context.value,
            );
            const nextItem = findNextItem(enabledItems, search, currentItem);
            if (nextItem !== void 0) {
              context.onValueChange(nextItem.value);
            }
          });
        const handleOpen = (pointerEvent) => {
          if (!isDisabled) {
            context.onOpenChange(true);
            resetTypeahead();
          }
          if (pointerEvent) {
            context.triggerPointerDownPosRef.current = {
              x: Math.round(pointerEvent.pageX),
              y: Math.round(pointerEvent.pageY),
            };
          }
        };
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Anchor"
          ],
          {
            asChild: true,
            ...popperScope,
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Primitive"
              ].button,
              {
                type: "button",
                role: "combobox",
                "aria-controls": context.contentId,
                "aria-expanded": context.open,
                "aria-required": context.required,
                "aria-autocomplete": "none",
                dir: context.dir,
                "data-state": context.open ? "open" : "closed",
                disabled: isDisabled,
                "data-disabled": isDisabled ? "" : void 0,
                "data-placeholder": shouldShowPlaceholder(context.value)
                  ? ""
                  : void 0,
                ...triggerProps,
                ref: composedRefs,
                onClick: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(triggerProps.onClick, (event) => {
                  event.currentTarget.focus();
                  if (pointerTypeRef.current !== "mouse") {
                    handleOpen(event);
                  }
                }),
                onPointerDown: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(triggerProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                  const target = event.target;
                  if (target.hasPointerCapture(event.pointerId)) {
                    target.releasePointerCapture(event.pointerId);
                  }
                  if (
                    event.button === 0 &&
                    event.ctrlKey === false &&
                    event.pointerType === "mouse"
                  ) {
                    handleOpen(event);
                    event.preventDefault();
                  }
                }),
                onKeyDown: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(triggerProps.onKeyDown, (event) => {
                  const isTypingAhead = searchRef.current !== "";
                  const isModifierKey =
                    event.ctrlKey || event.altKey || event.metaKey;
                  if (!isModifierKey && event.key.length === 1)
                    handleTypeaheadSearch(event.key);
                  if (isTypingAhead && event.key === " ") return;
                  if (OPEN_KEYS.includes(event.key)) {
                    handleOpen();
                    event.preventDefault();
                  }
                }),
              },
            ),
          },
        );
      });
    SelectTrigger.displayName = TRIGGER_NAME;
    var VALUE_NAME = "SelectValue";
    var SelectValue =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const {
          __scopeSelect,
          className,
          style,
          children,
          placeholder = "",
          ...valueProps
        } = props;
        const context = useSelectContext(VALUE_NAME, __scopeSelect);
        const { onValueNodeHasChildrenChange } = context;
        const hasChildren = children !== void 0;
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, context.onValueNodeChange);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          onValueNodeHasChildrenChange(hasChildren);
        }, [onValueNodeHasChildrenChange, hasChildren]);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].span,
          {
            ...valueProps,
            ref: composedRefs,
            style: {
              pointerEvents: "none",
            },
            children: shouldShowPlaceholder(context.value)
              ? (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsx"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Fragment"
                  ],
                  {
                    children: placeholder,
                  },
                )
              : children,
          },
        );
      });
    SelectValue.displayName = VALUE_NAME;
    var ICON_NAME = "SelectIcon";
    var SelectIcon =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, children, ...iconProps } = props;
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].span,
          {
            "aria-hidden": true,
            ...iconProps,
            ref: forwardedRef,
            children: children || "\u25BC",
          },
        );
      });
    SelectIcon.displayName = ICON_NAME;
    var PORTAL_NAME = "SelectPortal";
    var SelectPortal = (props) => {
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsx"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$portal$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "Portal"
        ],
        {
          asChild: true,
          ...props,
        },
      );
    };
    SelectPortal.displayName = PORTAL_NAME;
    var CONTENT_NAME = "SelectContent";
    var SelectContent =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
        const [fragment, setFragment] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ]();
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          setFragment(new DocumentFragment());
        }, []);
        if (!context.open) {
          const frag = fragment;
          return frag
            ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "createPortal"
              ](
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsx"
                ])(SelectContentProvider, {
                  scope: props.__scopeSelect,
                  children: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsx"
                  ])(Collection.Slot, {
                    scope: props.__scopeSelect,
                    children: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsx"
                    ])("div", {
                      children: props.children,
                    }),
                  }),
                }),
                frag,
              )
            : null;
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(SelectContentImpl, {
          ...props,
          ref: forwardedRef,
        });
      });
    SelectContent.displayName = CONTENT_NAME;
    var CONTENT_MARGIN = 10;
    var [SelectContentProvider, useSelectContentContext] =
      createSelectContext(CONTENT_NAME);
    var CONTENT_IMPL_NAME = "SelectContentImpl";
    var Slot = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createSlot"
    ])("SelectContent.RemoveScroll");
    var SelectContentImpl =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const {
          __scopeSelect,
          position = "item-aligned",
          onCloseAutoFocus,
          onEscapeKeyDown,
          onPointerDownOutside,

          side,
          sideOffset,
          align,
          alignOffset,
          arrowPadding,
          collisionBoundary,
          collisionPadding,
          sticky,
          hideWhenDetached,
          avoidCollisions,
          ...contentProps
        } = props;
        const context = useSelectContext(CONTENT_NAME, __scopeSelect);
        const [content, setContent] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const [viewport, setViewport] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, (node) => setContent(node));
        const [selectedItem, setSelectedItem] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const [selectedItemText, setSelectedItemText] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const getItems = useCollection(__scopeSelect);
        const [isPositioned, setIsPositioned] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](false);
        const firstValidItemFoundRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          if (content)
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$aria$2d$hidden$2f$dist$2f$es2015$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "hideOthers"
            ])(content);
        }, [content]);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$focus$2d$guards$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useFocusGuards"
        ])();
        const focusFirst =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](
            (candidates) => {
              const [firstItem, ...restItems] = getItems().map(
                (item) => item.ref.current,
              );
              const [lastItem] = restItems.slice(-1);
              const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
              for (const candidate of candidates) {
                if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
                candidate?.scrollIntoView({
                  block: "nearest",
                });
                if (candidate === firstItem && viewport) viewport.scrollTop = 0;
                if (candidate === lastItem && viewport)
                  viewport.scrollTop = viewport.scrollHeight;
                candidate?.focus();
                if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
                  return;
              }
            },
            [getItems, viewport],
          );
        const focusSelectedItem =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](
            () => focusFirst([selectedItem, content]),
            [focusFirst, selectedItem, content],
          );
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          if (isPositioned) {
            focusSelectedItem();
          }
        }, [isPositioned, focusSelectedItem]);
        const { onOpenChange, triggerPointerDownPosRef } = context;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          if (content) {
            let pointerMoveDelta = {
              x: 0,
              y: 0,
            };
            const handlePointerMove = (event) => {
              pointerMoveDelta = {
                x: Math.abs(
                  Math.round(event.pageX) -
                    (triggerPointerDownPosRef.current?.x ?? 0),
                ),
                y: Math.abs(
                  Math.round(event.pageY) -
                    (triggerPointerDownPosRef.current?.y ?? 0),
                ),
              };
            };
            const handlePointerUp = (event) => {
              if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
                event.preventDefault();
              } else {
                if (!content.contains(event.target)) {
                  onOpenChange(false);
                }
              }
              document.removeEventListener("pointermove", handlePointerMove);
              triggerPointerDownPosRef.current = null;
            };
            if (triggerPointerDownPosRef.current !== null) {
              document.addEventListener("pointermove", handlePointerMove);
              document.addEventListener("pointerup", handlePointerUp, {
                capture: true,
                once: true,
              });
            }
            return () => {
              document.removeEventListener("pointermove", handlePointerMove);
              document.removeEventListener("pointerup", handlePointerUp, {
                capture: true,
              });
            };
          }
        }, [content, onOpenChange, triggerPointerDownPosRef]);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          const close = () => onOpenChange(false);
          window.addEventListener("blur", close);
          window.addEventListener("resize", close);
          return () => {
            window.removeEventListener("blur", close);
            window.removeEventListener("resize", close);
          };
        }, [onOpenChange]);
        const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch(
          (search) => {
            const enabledItems = getItems().filter((item) => !item.disabled);
            const currentItem = enabledItems.find(
              (item) => item.ref.current === document.activeElement,
            );
            const nextItem = findNextItem(enabledItems, search, currentItem);
            if (nextItem) {
              setTimeout(() => nextItem.ref.current.focus());
            }
          },
        );
        const itemRefCallback =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](
            (node, value, disabled) => {
              const isFirstValidItem =
                !firstValidItemFoundRef.current && !disabled;
              const isSelectedItem =
                context.value !== void 0 && context.value === value;
              if (isSelectedItem || isFirstValidItem) {
                setSelectedItem(node);
                if (isFirstValidItem) firstValidItemFoundRef.current = true;
              }
            },
            [context.value],
          );
        const handleItemLeave =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](() => content?.focus(), [content]);
        const itemTextRefCallback =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](
            (node, value, disabled) => {
              const isFirstValidItem =
                !firstValidItemFoundRef.current && !disabled;
              const isSelectedItem =
                context.value !== void 0 && context.value === value;
              if (isSelectedItem || isFirstValidItem) {
                setSelectedItemText(node);
              }
            },
            [context.value],
          );
        const SelectPosition =
          position === "popper"
            ? SelectPopperPosition
            : SelectItemAlignedPosition;
        const popperContentProps =
          SelectPosition === SelectPopperPosition
            ? {
                side,
                sideOffset,
                align,
                alignOffset,
                arrowPadding,
                collisionBoundary,
                collisionPadding,
                sticky,
                hideWhenDetached,
                avoidCollisions,
              }
            : {};
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(SelectContentProvider, {
          scope: __scopeSelect,
          content,
          viewport,
          onViewportChange: setViewport,
          itemRefCallback,
          selectedItem,
          onItemLeave: handleItemLeave,
          itemTextRefCallback,
          focusSelectedItem,
          selectedItemText,
          position,
          isPositioned,
          searchRef,
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$react$2d$remove$2d$scroll$2f$dist$2f$es2015$2f$Combination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RemoveScroll$3e$__[
              "RemoveScroll"
            ],
            {
              as: Slot,
              allowPinchZoom: true,
              children: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsx"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$focus$2d$scope$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "FocusScope"
                ],
                {
                  asChild: true,
                  trapped: context.open,
                  onMountAutoFocus: (event) => {
                    event.preventDefault();
                  },
                  onUnmountAutoFocus: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "composeEventHandlers"
                  ])(onCloseAutoFocus, (event) => {
                    context.trigger?.focus({
                      preventScroll: true,
                    });
                    event.preventDefault();
                  }),
                  children: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsx"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dismissable$2d$layer$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "DismissableLayer"
                    ],
                    {
                      asChild: true,
                      disableOutsidePointerEvents: true,
                      onEscapeKeyDown,
                      onPointerDownOutside,
                      onFocusOutside: (event) => event.preventDefault(),
                      onDismiss: () => context.onOpenChange(false),
                      children: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsx"
                      ])(SelectPosition, {
                        role: "listbox",
                        id: context.contentId,
                        "data-state": context.open ? "open" : "closed",
                        dir: context.dir,
                        onContextMenu: (event) => event.preventDefault(),
                        ...contentProps,
                        ...popperContentProps,
                        onPlaced: () => setIsPositioned(true),
                        ref: composedRefs,
                        style: {
                          display: "flex",
                          flexDirection: "column",

                          outline: "none",
                          ...contentProps.style,
                        },
                        onKeyDown: (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "composeEventHandlers"
                        ])(contentProps.onKeyDown, (event) => {
                          const isModifierKey =
                            event.ctrlKey || event.altKey || event.metaKey;
                          if (event.key === "Tab") event.preventDefault();
                          if (!isModifierKey && event.key.length === 1)
                            handleTypeaheadSearch(event.key);
                          if (
                            ["ArrowUp", "ArrowDown", "Home", "End"].includes(
                              event.key,
                            )
                          ) {
                            const items = getItems().filter(
                              (item) => !item.disabled,
                            );
                            let candidateNodes = items.map(
                              (item) => item.ref.current,
                            );
                            if (["ArrowUp", "End"].includes(event.key)) {
                              candidateNodes = candidateNodes.slice().reverse();
                            }
                            if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                              const currentElement = event.target;
                              const currentIndex =
                                candidateNodes.indexOf(currentElement);
                              candidateNodes = candidateNodes.slice(
                                currentIndex + 1,
                              );
                            }
                            setTimeout(() => focusFirst(candidateNodes));
                            event.preventDefault();
                          }
                        }),
                      }),
                    },
                  ),
                },
              ),
            },
          ),
        });
      });
    SelectContentImpl.displayName = CONTENT_IMPL_NAME;
    var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
    var SelectItemAlignedPosition =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, onPlaced, ...popperProps } = props;
        const context = useSelectContext(CONTENT_NAME, __scopeSelect);
        const contentContext = useSelectContentContext(
          CONTENT_NAME,
          __scopeSelect,
        );
        const [contentWrapper, setContentWrapper] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const [content, setContent] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, (node) => setContent(node));
        const getItems = useCollection(__scopeSelect);
        const shouldExpandOnScrollRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](false);
        const shouldRepositionRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](true);
        const { viewport, selectedItem, selectedItemText, focusSelectedItem } =
          contentContext;
        const position =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](() => {
            if (
              context.trigger &&
              context.valueNode &&
              contentWrapper &&
              content &&
              viewport &&
              selectedItem &&
              selectedItemText
            ) {
              const triggerRect = context.trigger.getBoundingClientRect();
              const contentRect = content.getBoundingClientRect();
              const valueNodeRect = context.valueNode.getBoundingClientRect();
              const itemTextRect = selectedItemText.getBoundingClientRect();
              if (context.dir !== "rtl") {
                const itemTextOffset = itemTextRect.left - contentRect.left;
                const left = valueNodeRect.left - itemTextOffset;
                const leftDelta = triggerRect.left - left;
                const minContentWidth = triggerRect.width + leftDelta;
                const contentWidth = Math.max(
                  minContentWidth,
                  contentRect.width,
                );
                const rightEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedLeft = (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$number$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "clamp"
                ])(left, [
                  CONTENT_MARGIN,

                  Math.max(CONTENT_MARGIN, rightEdge - contentWidth),
                ]);
                contentWrapper.style.minWidth = minContentWidth + "px";
                contentWrapper.style.left = clampedLeft + "px";
              } else {
                const itemTextOffset = contentRect.right - itemTextRect.right;
                const right =
                  window.innerWidth - valueNodeRect.right - itemTextOffset;
                const rightDelta =
                  window.innerWidth - triggerRect.right - right;
                const minContentWidth = triggerRect.width + rightDelta;
                const contentWidth = Math.max(
                  minContentWidth,
                  contentRect.width,
                );
                const leftEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedRight = (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$number$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "clamp"
                ])(right, [
                  CONTENT_MARGIN,
                  Math.max(CONTENT_MARGIN, leftEdge - contentWidth),
                ]);
                contentWrapper.style.minWidth = minContentWidth + "px";
                contentWrapper.style.right = clampedRight + "px";
              }
              const items = getItems();
              const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
              const itemsHeight = viewport.scrollHeight;
              const contentStyles = window.getComputedStyle(content);
              const contentBorderTopWidth = parseInt(
                contentStyles.borderTopWidth,
                10,
              );
              const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
              const contentBorderBottomWidth = parseInt(
                contentStyles.borderBottomWidth,
                10,
              );
              const contentPaddingBottom = parseInt(
                contentStyles.paddingBottom,
                10,
              );
              const fullContentHeight =
                contentBorderTopWidth +
                contentPaddingTop +
                itemsHeight +
                contentPaddingBottom +
                contentBorderBottomWidth;
              const minContentHeight = Math.min(
                selectedItem.offsetHeight * 5,
                fullContentHeight,
              );
              const viewportStyles = window.getComputedStyle(viewport);
              const viewportPaddingTop = parseInt(
                viewportStyles.paddingTop,
                10,
              );
              const viewportPaddingBottom = parseInt(
                viewportStyles.paddingBottom,
                10,
              );
              const topEdgeToTriggerMiddle =
                triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
              const triggerMiddleToBottomEdge =
                availableHeight - topEdgeToTriggerMiddle;
              const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
              const itemOffsetMiddle =
                selectedItem.offsetTop + selectedItemHalfHeight;
              const contentTopToItemMiddle =
                contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
              const itemMiddleToContentBottom =
                fullContentHeight - contentTopToItemMiddle;
              const willAlignWithoutTopOverflow =
                contentTopToItemMiddle <= topEdgeToTriggerMiddle;
              if (willAlignWithoutTopOverflow) {
                const isLastItem =
                  items.length > 0 &&
                  selectedItem === items[items.length - 1].ref.current;
                contentWrapper.style.bottom = "0px";
                const viewportOffsetBottom =
                  content.clientHeight -
                  viewport.offsetTop -
                  viewport.offsetHeight;
                const clampedTriggerMiddleToBottomEdge = Math.max(
                  triggerMiddleToBottomEdge,
                  selectedItemHalfHeight +
                    (isLastItem ? viewportPaddingBottom : 0) +
                    viewportOffsetBottom +
                    contentBorderBottomWidth,
                );
                const height =
                  contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
                contentWrapper.style.height = height + "px";
              } else {
                const isFirstItem =
                  items.length > 0 && selectedItem === items[0].ref.current;
                contentWrapper.style.top = "0px";
                const clampedTopEdgeToTriggerMiddle = Math.max(
                  topEdgeToTriggerMiddle,
                  contentBorderTopWidth +
                    viewport.offsetTop +
                    (isFirstItem ? viewportPaddingTop : 0) +
                    selectedItemHalfHeight,
                );
                const height =
                  clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
                contentWrapper.style.height = height + "px";
                viewport.scrollTop =
                  contentTopToItemMiddle -
                  topEdgeToTriggerMiddle +
                  viewport.offsetTop;
              }
              contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
              contentWrapper.style.minHeight = minContentHeight + "px";
              contentWrapper.style.maxHeight = availableHeight + "px";
              onPlaced?.();
              requestAnimationFrame(
                () => (shouldExpandOnScrollRef.current = true),
              );
            }
          }, [
            getItems,
            context.trigger,
            context.valueNode,
            contentWrapper,
            content,
            viewport,
            selectedItem,
            selectedItemText,
            context.dir,
            onPlaced,
          ]);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => position(), [position]);
        const [contentZIndex, setContentZIndex] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ]();
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          if (content)
            setContentZIndex(window.getComputedStyle(content).zIndex);
        }, [content]);
        const handleScrollButtonChange =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](
            (node) => {
              if (node && shouldRepositionRef.current === true) {
                position();
                focusSelectedItem?.();
                shouldRepositionRef.current = false;
              }
            },
            [position, focusSelectedItem],
          );
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(SelectViewportProvider, {
          scope: __scopeSelect,
          contentWrapper,
          shouldExpandOnScrollRef,
          onScrollButtonChange: handleScrollButtonChange,
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])("div", {
            ref: setContentWrapper,
            style: {
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              zIndex: contentZIndex,
            },
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Primitive"
              ].div,
              {
                ...popperProps,
                ref: composedRefs,
                style: {
                  boxSizing: "border-box",

                  maxHeight: "100%",
                  ...popperProps.style,
                },
              },
            ),
          }),
        });
      });
    SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
    var POPPER_POSITION_NAME = "SelectPopperPosition";
    var SelectPopperPosition =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const {
          __scopeSelect,
          align = "start",
          collisionPadding = CONTENT_MARGIN,
          ...popperProps
        } = props;
        const popperScope = usePopperScope(__scopeSelect);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Content"
          ],
          {
            ...popperScope,
            ...popperProps,
            ref: forwardedRef,
            align,
            collisionPadding,
            style: {
              boxSizing: "border-box",
              ...popperProps.style,

              ...{
                "--radix-select-content-transform-origin":
                  "var(--radix-popper-transform-origin)",
                "--radix-select-content-available-width":
                  "var(--radix-popper-available-width)",
                "--radix-select-content-available-height":
                  "var(--radix-popper-available-height)",
                "--radix-select-trigger-width":
                  "var(--radix-popper-anchor-width)",
                "--radix-select-trigger-height":
                  "var(--radix-popper-anchor-height)",
              },
            },
          },
        );
      });
    SelectPopperPosition.displayName = POPPER_POSITION_NAME;
    var [SelectViewportProvider, useSelectViewportContext] =
      createSelectContext(CONTENT_NAME, {});
    var VIEWPORT_NAME = "SelectViewport";
    var SelectViewport =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, nonce, ...viewportProps } = props;
        const contentContext = useSelectContentContext(
          VIEWPORT_NAME,
          __scopeSelect,
        );
        const viewportContext = useSelectViewportContext(
          VIEWPORT_NAME,
          __scopeSelect,
        );
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, contentContext.onViewportChange);
        const prevScrollTopRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](0);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxs"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Fragment"
          ],
          {
            children: [
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsx"
              ])("style", {
                dangerouslySetInnerHTML: {
                  __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`,
                },
                nonce,
              }),
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsx"
              ])(Collection.Slot, {
                scope: __scopeSelect,
                children: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsx"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Primitive"
                  ].div,
                  {
                    "data-radix-select-viewport": "",
                    role: "presentation",
                    ...viewportProps,
                    ref: composedRefs,
                    style: {
                      position: "relative",
                      flex: 1,

                      overflow: "hidden auto",
                      ...viewportProps.style,
                    },
                    onScroll: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "composeEventHandlers"
                    ])(viewportProps.onScroll, (event) => {
                      const viewport = event.currentTarget;
                      const { contentWrapper, shouldExpandOnScrollRef } =
                        viewportContext;
                      if (shouldExpandOnScrollRef?.current && contentWrapper) {
                        const scrolledBy = Math.abs(
                          prevScrollTopRef.current - viewport.scrollTop,
                        );
                        if (scrolledBy > 0) {
                          const availableHeight =
                            window.innerHeight - CONTENT_MARGIN * 2;
                          const cssMinHeight = parseFloat(
                            contentWrapper.style.minHeight,
                          );
                          const cssHeight = parseFloat(
                            contentWrapper.style.height,
                          );
                          const prevHeight = Math.max(cssMinHeight, cssHeight);
                          if (prevHeight < availableHeight) {
                            const nextHeight = prevHeight + scrolledBy;
                            const clampedNextHeight = Math.min(
                              availableHeight,
                              nextHeight,
                            );
                            const heightDiff = nextHeight - clampedNextHeight;
                            contentWrapper.style.height =
                              clampedNextHeight + "px";
                            if (contentWrapper.style.bottom === "0px") {
                              viewport.scrollTop =
                                heightDiff > 0 ? heightDiff : 0;
                              contentWrapper.style.justifyContent = "flex-end";
                            }
                          }
                        }
                      }
                      prevScrollTopRef.current = viewport.scrollTop;
                    }),
                  },
                ),
              }),
            ],
          },
        );
      });
    SelectViewport.displayName = VIEWPORT_NAME;
    var GROUP_NAME = "SelectGroup";
    var [SelectGroupContextProvider, useSelectGroupContext] =
      createSelectContext(GROUP_NAME);
    var SelectGroup =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, ...groupProps } = props;
        const groupId = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useId"
        ])();
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(SelectGroupContextProvider, {
          scope: __scopeSelect,
          id: groupId,
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "Primitive"
            ].div,
            {
              role: "group",
              "aria-labelledby": groupId,
              ...groupProps,
              ref: forwardedRef,
            },
          ),
        });
      });
    SelectGroup.displayName = GROUP_NAME;
    var LABEL_NAME = "SelectLabel";
    var SelectLabel =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, ...labelProps } = props;
        const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].div,
          {
            id: groupContext.id,
            ...labelProps,
            ref: forwardedRef,
          },
        );
      });
    SelectLabel.displayName = LABEL_NAME;
    var ITEM_NAME = "SelectItem";
    var [SelectItemContextProvider, useSelectItemContext] =
      createSelectContext(ITEM_NAME);
    var SelectItem =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const {
          __scopeSelect,
          value,
          disabled = false,
          textValue: textValueProp,
          ...itemProps
        } = props;
        const context = useSelectContext(ITEM_NAME, __scopeSelect);
        const contentContext = useSelectContentContext(
          ITEM_NAME,
          __scopeSelect,
        );
        const isSelected = context.value === value;
        const [textValue, setTextValue] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](textValueProp ?? "");
        const [isFocused, setIsFocused] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](false);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, (node) =>
          contentContext.itemRefCallback?.(node, value, disabled),
        );
        const textId = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useId"
        ])();
        const pointerTypeRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ]("touch");
        const handleSelect = () => {
          if (!disabled) {
            context.onValueChange(value);
            context.onOpenChange(false);
          }
        };
        if (value === "") {
          throw new Error(
            "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
          );
        }
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(SelectItemContextProvider, {
          scope: __scopeSelect,
          value,
          disabled,
          textId,
          isSelected,
          onItemTextChange:
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "useCallback"
            ]((node) => {
              setTextValue(
                (prevTextValue) =>
                  prevTextValue || (node?.textContent ?? "").trim(),
              );
            }, []),
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsx"
          ])(Collection.ItemSlot, {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Primitive"
              ].div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onBlur, () => setIsFocused(false)),
                onClick: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onPointerMove, (event) => {
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    contentContext.onItemLeave?.();
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({
                      preventScroll: true,
                    });
                  }
                }),
                onPointerLeave: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onPointerLeave, (event) => {
                  if (event.currentTarget === document.activeElement) {
                    contentContext.onItemLeave?.();
                  }
                }),
                onKeyDown: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "composeEventHandlers"
                ])(itemProps.onKeyDown, (event) => {
                  const isTypingAhead =
                    contentContext.searchRef?.current !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                }),
              },
            ),
          }),
        });
      });
    SelectItem.displayName = ITEM_NAME;
    var ITEM_TEXT_NAME = "SelectItemText";
    var SelectItemText =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, className, style, ...itemTextProps } = props;
        const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
        const contentContext = useSelectContentContext(
          ITEM_TEXT_NAME,
          __scopeSelect,
        );
        const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
        const nativeOptionsContext = useSelectNativeOptionsContext(
          ITEM_TEXT_NAME,
          __scopeSelect,
        );
        const [itemTextNode, setItemTextNode] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](null);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(
          forwardedRef,
          (node) => setItemTextNode(node),
          itemContext.onItemTextChange,
          (node) =>
            contentContext.itemTextRefCallback?.(
              node,
              itemContext.value,
              itemContext.disabled,
            ),
        );
        const textContent = itemTextNode?.textContent;
        const nativeOption =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useMemo"
          ](
            () =>
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsx"
              ])(
                "option",
                {
                  value: itemContext.value,
                  disabled: itemContext.disabled,
                  children: textContent,
                },
                itemContext.value,
              ),
            [itemContext.disabled, itemContext.value, textContent],
          );
        const { onNativeOptionAdd, onNativeOptionRemove } =
          nativeOptionsContext;
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          onNativeOptionAdd(nativeOption);
          return () => onNativeOptionRemove(nativeOption);
        }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxs"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Fragment"
          ],
          {
            children: [
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsx"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "Primitive"
                ].span,
                {
                  id: itemContext.textId,
                  ...itemTextProps,
                  ref: composedRefs,
                },
              ),
              itemContext.isSelected &&
              context.valueNode &&
              !context.valueNodeHasChildren
                ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "createPortal"
                  ](itemTextProps.children, context.valueNode)
                : null,
            ],
          },
        );
      });
    SelectItemText.displayName = ITEM_TEXT_NAME;
    var ITEM_INDICATOR_NAME = "SelectItemIndicator";
    var SelectItemIndicator =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, ...itemIndicatorProps } = props;
        const itemContext = useSelectItemContext(
          ITEM_INDICATOR_NAME,
          __scopeSelect,
        );
        return itemContext.isSelected
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Primitive"
              ].span,
              {
                "aria-hidden": true,
                ...itemIndicatorProps,
                ref: forwardedRef,
              },
            )
          : null;
      });
    SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
    var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
    var SelectScrollUpButton =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const contentContext = useSelectContentContext(
          SCROLL_UP_BUTTON_NAME,
          props.__scopeSelect,
        );
        const viewportContext = useSelectViewportContext(
          SCROLL_UP_BUTTON_NAME,
          props.__scopeSelect,
        );
        const [canScrollUp, setCanScrollUp] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](false);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, viewportContext.onScrollButtonChange);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          if (contentContext.viewport && contentContext.isPositioned) {
            let handleScroll2 = function () {
              const canScrollUp2 = viewport.scrollTop > 0;
              setCanScrollUp(canScrollUp2);
            };
            var handleScroll = handleScroll2;
            const viewport = contentContext.viewport;
            handleScroll2();
            viewport.addEventListener("scroll", handleScroll2);
            return () => viewport.removeEventListener("scroll", handleScroll2);
          }
        }, [contentContext.viewport, contentContext.isPositioned]);
        return canScrollUp
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(SelectScrollButtonImpl, {
              ...props,
              ref: composedRefs,
              onAutoScroll: () => {
                const { viewport, selectedItem } = contentContext;
                if (viewport && selectedItem) {
                  viewport.scrollTop =
                    viewport.scrollTop - selectedItem.offsetHeight;
                }
              },
            })
          : null;
      });
    SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
    var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
    var SelectScrollDownButton =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const contentContext = useSelectContentContext(
          SCROLL_DOWN_BUTTON_NAME,
          props.__scopeSelect,
        );
        const viewportContext = useSelectViewportContext(
          SCROLL_DOWN_BUTTON_NAME,
          props.__scopeSelect,
        );
        const [canScrollDown, setCanScrollDown] =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useState"
          ](false);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, viewportContext.onScrollButtonChange);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          if (contentContext.viewport && contentContext.isPositioned) {
            let handleScroll2 = function () {
              const maxScroll = viewport.scrollHeight - viewport.clientHeight;
              const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
              setCanScrollDown(canScrollDown2);
            };
            var handleScroll = handleScroll2;
            const viewport = contentContext.viewport;
            handleScroll2();
            viewport.addEventListener("scroll", handleScroll2);
            return () => viewport.removeEventListener("scroll", handleScroll2);
          }
        }, [contentContext.viewport, contentContext.isPositioned]);
        return canScrollDown
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(SelectScrollButtonImpl, {
              ...props,
              ref: composedRefs,
              onAutoScroll: () => {
                const { viewport, selectedItem } = contentContext;
                if (viewport && selectedItem) {
                  viewport.scrollTop =
                    viewport.scrollTop + selectedItem.offsetHeight;
                }
              },
            })
          : null;
      });
    SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
    var SelectScrollButtonImpl =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
        const contentContext = useSelectContentContext(
          "SelectScrollButton",
          __scopeSelect,
        );
        const autoScrollTimerRef =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](null);
        const getItems = useCollection(__scopeSelect);
        const clearAutoScrollTimer =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useCallback"
          ](() => {
            if (autoScrollTimerRef.current !== null) {
              window.clearInterval(autoScrollTimerRef.current);
              autoScrollTimerRef.current = null;
            }
          }, []);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          return () => clearAutoScrollTimer();
        }, [clearAutoScrollTimer]);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useLayoutEffect"
        ])(() => {
          const activeItem = getItems().find(
            (item) => item.ref.current === document.activeElement,
          );
          activeItem?.ref.current?.scrollIntoView({
            block: "nearest",
          });
        }, [getItems]);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].div,
          {
            "aria-hidden": true,
            ...scrollIndicatorProps,
            ref: forwardedRef,
            style: {
              flexShrink: 0,
              ...scrollIndicatorProps.style,
            },
            onPointerDown: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "composeEventHandlers"
            ])(scrollIndicatorProps.onPointerDown, () => {
              if (autoScrollTimerRef.current === null) {
                autoScrollTimerRef.current = window.setInterval(
                  onAutoScroll,
                  50,
                );
              }
            }),
            onPointerMove: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "composeEventHandlers"
            ])(scrollIndicatorProps.onPointerMove, () => {
              contentContext.onItemLeave?.();
              if (autoScrollTimerRef.current === null) {
                autoScrollTimerRef.current = window.setInterval(
                  onAutoScroll,
                  50,
                );
              }
            }),
            onPointerLeave: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "composeEventHandlers"
            ])(scrollIndicatorProps.onPointerLeave, () => {
              clearAutoScrollTimer();
            }),
          },
        );
      });
    var SEPARATOR_NAME = "SelectSeparator";
    var SelectSeparator =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, ...separatorProps } = props;
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].div,
          {
            "aria-hidden": true,
            ...separatorProps,
            ref: forwardedRef,
          },
        );
      });
    SelectSeparator.displayName = SEPARATOR_NAME;
    var ARROW_NAME = "SelectArrow";
    var SelectArrow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ]((props, forwardedRef) => {
        const { __scopeSelect, ...arrowProps } = props;
        const popperScope = usePopperScope(__scopeSelect);
        const context = useSelectContext(ARROW_NAME, __scopeSelect);
        const contentContext = useSelectContentContext(
          ARROW_NAME,
          __scopeSelect,
        );
        return context.open && contentContext.position === "popper"
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsx"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popper$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Arrow"
              ],
              {
                ...popperScope,
                ...arrowProps,
                ref: forwardedRef,
              },
            )
          : null;
      });
    SelectArrow.displayName = ARROW_NAME;
    var BUBBLE_INPUT_NAME = "SelectBubbleInput";
    var SelectBubbleInput =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ __scopeSelect, value, ...props }, forwardedRef) => {
        const ref =
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "useRef"
          ](null);
        const composedRefs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useComposedRefs"
        ])(forwardedRef, ref);
        const prevValue = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "usePrevious"
        ])(value);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ](() => {
          const select = ref.current;
          if (!select) return;
          const selectProto = window.HTMLSelectElement.prototype;
          const descriptor = Object.getOwnPropertyDescriptor(
            selectProto,
            "value",
          );
          const setValue = descriptor.set;
          if (prevValue !== value && setValue) {
            const event = new Event("change", {
              bubbles: true,
            });
            setValue.call(select, value);
            select.dispatchEvent(event);
          }
        }, [prevValue, value]);
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsx"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Primitive"
          ].select,
          {
            ...props,
            style: {
              ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$visually$2d$hidden$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "VISUALLY_HIDDEN_STYLES"
              ],
              ...props.style,
            },
            ref: composedRefs,
            defaultValue: value,
          },
        );
      });
    SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
    function shouldShowPlaceholder(value) {
      return value === "" || value === void 0;
    }
    function useTypeaheadSearch(onSearchChange) {
      const handleSearchChange = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$callback$2d$ref$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useCallbackRef"
      ])(onSearchChange);
      const searchRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ]("");
      const timerRef =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useRef"
        ](0);
      const handleTypeaheadSearch =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useCallback"
        ](
          (key) => {
            const search = searchRef.current + key;
            handleSearchChange(search);
            (function updateSearch(value) {
              searchRef.current = value;
              window.clearTimeout(timerRef.current);
              if (value !== "")
                timerRef.current = window.setTimeout(
                  () => updateSearch(""),
                  1e3,
                );
            })(search);
          },
          [handleSearchChange],
        );
      const resetTypeahead =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useCallback"
        ](() => {
          searchRef.current = "";
          window.clearTimeout(timerRef.current);
        }, []);
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ](() => {
        return () => window.clearTimeout(timerRef.current);
      }, []);
      return [searchRef, handleTypeaheadSearch, resetTypeahead];
    }
    function findNextItem(items, search, currentItem) {
      const isRepeated =
        search.length > 1 &&
        Array.from(search).every((char) => char === search[0]);
      const normalizedSearch = isRepeated ? search[0] : search;
      const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
      let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
      const excludeCurrentItem = normalizedSearch.length === 1;
      if (excludeCurrentItem)
        wrappedItems = wrappedItems.filter((v) => v !== currentItem);
      const nextItem = wrappedItems.find((item) =>
        item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()),
      );
      return nextItem !== currentItem ? nextItem : void 0;
    }
    function wrapArray(array, startIndex) {
      return array.map(
        (_, index) => array[(startIndex + index) % array.length],
      );
    }
    var Root2 = Select;
    var Trigger = SelectTrigger;
    var Value = SelectValue;
    var Icon = SelectIcon;
    var Portal = SelectPortal;
    var Content2 = SelectContent;
    var Viewport = SelectViewport;
    var Group = SelectGroup;
    var Label = SelectLabel;
    var Item = SelectItem;
    var ItemText = SelectItemText;
    var ItemIndicator = SelectItemIndicator;
    var ScrollUpButton = SelectScrollUpButton;
    var ScrollDownButton = SelectScrollDownButton;
    var Separator = SelectSeparator;
    var Arrow2 = SelectArrow;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => Check,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "M20 6 9 17l-5-5",
          key: "1gmf2c",
        },
      ],
    ];
    const Check = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("Check", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Check",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => ChevronDown,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "m6 9 6 6 6-6",
          key: "qrunsl",
        },
      ],
    ];
    const ChevronDown = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("ChevronDown", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "ChevronDown",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => ChevronUp,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "m18 15-6-6-6 6",
          key: "153udz",
        },
      ],
    ];
    const ChevronUp = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("ChevronUp", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "ChevronUp",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)",
      );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({
          __proto__: [],
        } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null",
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    }
    var __assign = function () {
      __assign =
        Object.assign ||
        function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
      return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value);
            });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g;
      return (
        (g = {
          next: verb(0),
          throw: verb(1),
          return: verb(2),
        }),
        typeof Symbol === "function" &&
          (g[Symbol.iterator] = function () {
            return this;
          }),
        g
      );

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y["return"]
                    : op[0]
                      ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                      : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t;
            if (((y = 0), t)) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false,
                };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true,
        };
      }
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || from);
    }
    var Bounds = (function () {
      function Bounds(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
      }
      Bounds.prototype.add = function (x, y, w, h) {
        return new Bounds(
          this.left + x,
          this.top + y,
          this.width + w,
          this.height + h,
        );
      };
      Bounds.fromClientRect = function (context, clientRect) {
        return new Bounds(
          clientRect.left + context.windowBounds.left,
          clientRect.top + context.windowBounds.top,
          clientRect.width,
          clientRect.height,
        );
      };
      Bounds.fromDOMRectList = function (context, domRectList) {
        var domRect = Array.from(domRectList).find(function (rect) {
          return rect.width !== 0;
        });
        return domRect
          ? new Bounds(
              domRect.left + context.windowBounds.left,
              domRect.top + context.windowBounds.top,
              domRect.width,
              domRect.height,
            )
          : Bounds.EMPTY;
      };
      Bounds.EMPTY = new Bounds(0, 0, 0, 0);
      return Bounds;
    })();
    var parseBounds = function (context, node) {
      return Bounds.fromClientRect(context, node.getBoundingClientRect());
    };
    var parseDocumentSize = function (document1) {
      var body = document1.body;
      var documentElement = document1.documentElement;
      if (!body || !documentElement) {
        throw new Error("Unable to get document size");
      }
      var width = Math.max(
        Math.max(body.scrollWidth, documentElement.scrollWidth),
        Math.max(body.offsetWidth, documentElement.offsetWidth),
        Math.max(body.clientWidth, documentElement.clientWidth),
      );
      var height = Math.max(
        Math.max(body.scrollHeight, documentElement.scrollHeight),
        Math.max(body.offsetHeight, documentElement.offsetHeight),
        Math.max(body.clientHeight, documentElement.clientHeight),
      );
      return new Bounds(0, 0, width, height);
    };

    var toCodePoints$1 = function (str) {
      var codePoints = [];
      var i = 0;
      var length = str.length;
      while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
          var extra = str.charCodeAt(i++);
          if ((extra & 0xfc00) === 0xdc00) {
            codePoints.push(
              ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000,
            );
          } else {
            codePoints.push(value);
            i--;
          }
        } else {
          codePoints.push(value);
        }
      }
      return codePoints;
    };
    var fromCodePoint$1 = function () {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
      }
      if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, codePoints);
      }
      var length = codePoints.length;
      if (!length) {
        return "";
      }
      var codeUnits = [];
      var index = -1;
      var result = "";
      while (++index < length) {
        var codePoint = codePoints[index];
        if (codePoint <= 0xffff) {
          codeUnits.push(codePoint);
        } else {
          codePoint -= 0x10000;
          codeUnits.push(
            (codePoint >> 10) + 0xd800,
            (codePoint % 0x400) + 0xdc00,
          );
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
          result += String.fromCharCode.apply(String, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    var chars$2 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var lookup$2 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
    for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
      lookup$2[chars$2.charCodeAt(i$2)] = i$2;
    }

    var chars$1$1 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var lookup$1$1 =
      typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
    for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
      lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
    }
    var decode$1 = function (base64) {
      var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;
      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      var buffer =
        typeof ArrayBuffer !== "undefined" &&
        typeof Uint8Array !== "undefined" &&
        typeof Uint8Array.prototype.slice !== "undefined"
          ? new ArrayBuffer(bufferLength)
          : new Array(bufferLength);
      var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
      for (i = 0; i < len; i += 4) {
        encoded1 = lookup$1$1[base64.charCodeAt(i)];
        encoded2 = lookup$1$1[base64.charCodeAt(i + 1)];
        encoded3 = lookup$1$1[base64.charCodeAt(i + 2)];
        encoded4 = lookup$1$1[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return buffer;
    };
    var polyUint16Array$1 = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 2) {
        bytes.push((buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
    };
    var polyUint32Array$1 = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 4) {
        bytes.push(
          (buffer[i + 3] << 24) |
            (buffer[i + 2] << 16) |
            (buffer[i + 1] << 8) |
            buffer[i],
        );
      }
      return bytes;
    };
    var UTRIE2_SHIFT_2$1 = 5;
    var UTRIE2_SHIFT_1$1 = 6 + 5;

    var UTRIE2_INDEX_SHIFT$1 = 2;

    var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;

    var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 0x10000 >> UTRIE2_SHIFT_2$1;
    var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
    var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
    var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 0x400 >> UTRIE2_SHIFT_2$1;
    var UTRIE2_INDEX_2_BMP_LENGTH$1 =
      UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;

    var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
    var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 0x800 >> 6;

    var UTRIE2_INDEX_1_OFFSET$1 =
      UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;

    var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 0x10000 >> UTRIE2_SHIFT_1$1;
    var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
    var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
    var slice16$1 = function (view, start, end) {
      if (view.slice) {
        return view.slice(start, end);
      }
      return new Uint16Array(Array.prototype.slice.call(view, start, end));
    };
    var slice32$1 = function (view, start, end) {
      if (view.slice) {
        return view.slice(start, end);
      }
      return new Uint32Array(Array.prototype.slice.call(view, start, end));
    };
    var createTrieFromBase64$1 = function (base64, _byteLength) {
      var buffer = decode$1(base64);
      var view32 = Array.isArray(buffer)
        ? polyUint32Array$1(buffer)
        : new Uint32Array(buffer);
      var view16 = Array.isArray(buffer)
        ? polyUint16Array$1(buffer)
        : new Uint16Array(buffer);
      var headerLength = 24;
      var index = slice16$1(view16, headerLength / 2, view32[4] / 2);
      var data =
        view32[5] === 2
          ? slice16$1(view16, (headerLength + view32[4]) / 2)
          : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
      return new Trie$1(
        view32[0],
        view32[1],
        view32[2],
        view32[3],
        index,
        data,
      );
    };
    var Trie$1 = (function () {
      function Trie(
        initialValue,
        errorValue,
        highStart,
        highValueIndex,
        index,
        data,
      ) {
        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
      }

      Trie.prototype.get = function (codePoint) {
        var ix;
        if (codePoint >= 0) {
          if (
            codePoint < 0x0d800 ||
            (codePoint > 0x0dbff && codePoint <= 0x0ffff)
          ) {
            ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
            ix =
              (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
            return this.data[ix];
          }
          if (codePoint <= 0xffff) {
            ix =
              this.index[
                UTRIE2_LSCP_INDEX_2_OFFSET$1 +
                  ((codePoint - 0xd800) >> UTRIE2_SHIFT_2$1)
              ];
            ix =
              (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
            return this.data[ix];
          }
          if (codePoint < this.highStart) {
            ix =
              UTRIE2_INDEX_1_OFFSET$1 -
              UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 +
              (codePoint >> UTRIE2_SHIFT_1$1);
            ix = this.index[ix];
            ix += (codePoint >> UTRIE2_SHIFT_2$1) & UTRIE2_INDEX_2_MASK$1;
            ix = this.index[ix];
            ix =
              (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
            return this.data[ix];
          }
          if (codePoint <= 0x10ffff) {
            return this.data[this.highValueIndex];
          }
        }

        return this.errorValue;
      };
      return Trie;
    })();

    var chars$3 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var lookup$3 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
    for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
      lookup$3[chars$3.charCodeAt(i$3)] = i$3;
    }
    var base64$1 =
      "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==";
    var LETTER_NUMBER_MODIFIER = 50;

    var BK = 1;
    var CR$1 = 2;
    var LF$1 = 3;
    var CM = 4;
    var NL = 5;
    var WJ = 7;
    var ZW = 8;
    var GL = 9;
    var SP = 10;
    var ZWJ$1 = 11;

    var B2 = 12;
    var BA = 13;
    var BB = 14;
    var HY = 15;
    var CB = 16;

    var CL = 17;
    var CP = 18;
    var EX = 19;
    var IN = 20;
    var NS = 21;
    var OP = 22;
    var QU = 23;

    var IS = 24;
    var NU = 25;
    var PO = 26;
    var PR = 27;
    var SY = 28;

    var AI = 29;
    var AL = 30;
    var CJ = 31;
    var EB = 32;
    var EM = 33;
    var H2 = 34;
    var H3 = 35;
    var HL = 36;
    var ID = 37;
    var JL = 38;
    var JV = 39;
    var JT = 40;
    var RI$1 = 41;
    var SA = 42;
    var XX = 43;
    var ea_OP = [0x2329, 0xff08];
    var BREAK_MANDATORY = "!";
    var BREAK_NOT_ALLOWED$1 = "×";
    var BREAK_ALLOWED$1 = "÷";
    var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
    var ALPHABETICS = [AL, HL];
    var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
    var SPACE$1 = [SP, ZW];
    var PREFIX_POSTFIX = [PR, PO];
    var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
    var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
    var HYPHEN = [HY, BA];
    var codePointsToCharacterClasses = function (codePoints, lineBreak) {
      if (lineBreak === void 0) {
        lineBreak = "strict";
      }
      var types = [];
      var indices = [];
      var categories = [];
      codePoints.forEach(function (codePoint, index) {
        var classType = UnicodeTrie$1.get(codePoint);
        if (classType > LETTER_NUMBER_MODIFIER) {
          categories.push(true);
          classType -= LETTER_NUMBER_MODIFIER;
        } else {
          categories.push(false);
        }
        if (["normal", "auto", "loose"].indexOf(lineBreak) !== -1) {
          if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
            indices.push(index);
            return types.push(CB);
          }
        }
        if (classType === CM || classType === ZWJ$1) {
          if (index === 0) {
            indices.push(index);
            return types.push(AL);
          }

          var prev = types[index - 1];
          if (LINE_BREAKS.indexOf(prev) === -1) {
            indices.push(indices[index - 1]);
            return types.push(prev);
          }
          indices.push(index);
          return types.push(AL);
        }
        indices.push(index);
        if (classType === CJ) {
          return types.push(lineBreak === "strict" ? NS : ID);
        }
        if (classType === SA) {
          return types.push(AL);
        }
        if (classType === AI) {
          return types.push(AL);
        }

        if (classType === XX) {
          if (
            (codePoint >= 0x20000 && codePoint <= 0x2fffd) ||
            (codePoint >= 0x30000 && codePoint <= 0x3fffd)
          ) {
            return types.push(ID);
          } else {
            return types.push(AL);
          }
        }
        types.push(classType);
      });
      return [indices, types, categories];
    };
    var isAdjacentWithSpaceIgnored = function (a, b, currentIndex, classTypes) {
      var current = classTypes[currentIndex];
      if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
        var i = currentIndex;
        while (i <= classTypes.length) {
          i++;
          var next = classTypes[i];
          if (next === b) {
            return true;
          }
          if (next !== SP) {
            break;
          }
        }
      }
      if (current === SP) {
        var i = currentIndex;
        while (i > 0) {
          i--;
          var prev = classTypes[i];
          if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
            var n = currentIndex;
            while (n <= classTypes.length) {
              n++;
              var next = classTypes[n];
              if (next === b) {
                return true;
              }
              if (next !== SP) {
                break;
              }
            }
          }
          if (prev !== SP) {
            break;
          }
        }
      }
      return false;
    };
    var previousNonSpaceClassType = function (currentIndex, classTypes) {
      var i = currentIndex;
      while (i >= 0) {
        var type = classTypes[i];
        if (type === SP) {
          i--;
        } else {
          return type;
        }
      }
      return 0;
    };
    var _lineBreakAtIndex = function (
      codePoints,
      classTypes,
      indicies,
      index,
      forbiddenBreaks,
    ) {
      if (indicies[index] === 0) {
        return BREAK_NOT_ALLOWED$1;
      }
      var currentIndex = index - 1;
      if (
        Array.isArray(forbiddenBreaks) &&
        forbiddenBreaks[currentIndex] === true
      ) {
        return BREAK_NOT_ALLOWED$1;
      }
      var beforeIndex = currentIndex - 1;
      var afterIndex = currentIndex + 1;
      var current = classTypes[currentIndex];

      var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
      var next = classTypes[afterIndex];
      if (current === CR$1 && next === LF$1) {
        return BREAK_NOT_ALLOWED$1;
      }
      if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
        return BREAK_MANDATORY;
      }

      if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (SPACE$1.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
        return BREAK_ALLOWED$1;
      }

      if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        (current === EB || current === EM) &&
        UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (current === WJ || next === WJ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (current === GL) {
        return BREAK_NOT_ALLOWED$1;
      }

      if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
        return BREAK_NOT_ALLOWED$1;
      }

      if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (current === SP) {
        return BREAK_ALLOWED$1;
      }

      if (current === QU || next === QU) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (next === CB || current === CB) {
        return BREAK_ALLOWED$1;
      }

      if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (before === HL && HYPHEN.indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (current === SY && next === HL) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (next === IN) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        (ALPHABETICS.indexOf(next) !== -1 && current === NU) ||
        (ALPHABETICS.indexOf(current) !== -1 && next === NU)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        (current === PR && [ID, EB, EM].indexOf(next) !== -1) ||
        ([ID, EB, EM].indexOf(current) !== -1 && next === PO)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        (ALPHABETICS.indexOf(current) !== -1 &&
          PREFIX_POSTFIX.indexOf(next) !== -1) ||
        (PREFIX_POSTFIX.indexOf(current) !== -1 &&
          ALPHABETICS.indexOf(next) !== -1)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        ([PR, PO].indexOf(current) !== -1 &&
          (next === NU ||
            ([OP, HY].indexOf(next) !== -1 &&
              classTypes[afterIndex + 1] === NU))) ||
        ([OP, HY].indexOf(current) !== -1 && next === NU) ||
        (current === NU && [NU, SY, IS].indexOf(next) !== -1)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
        var prevIndex = currentIndex;
        while (prevIndex >= 0) {
          var type = classTypes[prevIndex];
          if (type === NU) {
            return BREAK_NOT_ALLOWED$1;
          } else if ([SY, IS].indexOf(type) !== -1) {
            prevIndex--;
          } else {
            break;
          }
        }
      }

      if ([PR, PO].indexOf(next) !== -1) {
        var prevIndex =
          [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
        while (prevIndex >= 0) {
          var type = classTypes[prevIndex];
          if (type === NU) {
            return BREAK_NOT_ALLOWED$1;
          } else if ([SY, IS].indexOf(type) !== -1) {
            prevIndex--;
          } else {
            break;
          }
        }
      }

      if (
        (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1) ||
        ([JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1) ||
        ([JT, H3].indexOf(current) !== -1 && next === JT)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 &&
          [IN, PO].indexOf(next) !== -1) ||
        (KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        ALPHABETICS.indexOf(current) !== -1 &&
        ALPHABETICS.indexOf(next) !== -1
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (
        (ALPHABETICS.concat(NU).indexOf(current) !== -1 &&
          next === OP &&
          ea_OP.indexOf(codePoints[afterIndex]) === -1) ||
        (ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP)
      ) {
        return BREAK_NOT_ALLOWED$1;
      }

      if (current === RI$1 && next === RI$1) {
        var i = indicies[currentIndex];
        var count = 1;
        while (i > 0) {
          i--;
          if (classTypes[i] === RI$1) {
            count++;
          } else {
            break;
          }
        }
        if (count % 2 !== 0) {
          return BREAK_NOT_ALLOWED$1;
        }
      }

      if (current === EB && next === EM) {
        return BREAK_NOT_ALLOWED$1;
      }
      return BREAK_ALLOWED$1;
    };
    var cssFormattedClasses = function (codePoints, options) {
      if (!options) {
        options = {
          lineBreak: "normal",
          wordBreak: "normal",
        };
      }
      var _a = codePointsToCharacterClasses(codePoints, options.lineBreak),
        indicies = _a[0],
        classTypes = _a[1],
        isLetterNumber = _a[2];
      if (
        options.wordBreak === "break-all" ||
        options.wordBreak === "break-word"
      ) {
        classTypes = classTypes.map(function (type) {
          return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
        });
      }
      var forbiddenBreakpoints =
        options.wordBreak === "keep-all"
          ? isLetterNumber.map(function (letterNumber, i) {
              return (
                letterNumber &&
                codePoints[i] >= 0x4e00 &&
                codePoints[i] <= 0x9fff
              );
            })
          : undefined;
      return [indicies, classTypes, forbiddenBreakpoints];
    };
    var Break = (function () {
      function Break(codePoints, lineBreak, start, end) {
        this.codePoints = codePoints;
        this.required = lineBreak === BREAK_MANDATORY;
        this.start = start;
        this.end = end;
      }
      Break.prototype.slice = function () {
        return fromCodePoint$1.apply(
          void 0,
          this.codePoints.slice(this.start, this.end),
        );
      };
      return Break;
    })();
    var LineBreaker = function (str, options) {
      var codePoints = toCodePoints$1(str);
      var _a = cssFormattedClasses(codePoints, options),
        indicies = _a[0],
        classTypes = _a[1],
        forbiddenBreakpoints = _a[2];
      var length = codePoints.length;
      var lastEnd = 0;
      var nextIndex = 0;
      return {
        next: function () {
          if (nextIndex >= length) {
            return {
              done: true,
              value: null,
            };
          }
          var lineBreak = BREAK_NOT_ALLOWED$1;
          while (
            nextIndex < length &&
            (lineBreak = _lineBreakAtIndex(
              codePoints,
              classTypes,
              indicies,
              ++nextIndex,
              forbiddenBreakpoints,
            )) === BREAK_NOT_ALLOWED$1
          ) {}
          if (lineBreak !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
            var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
            lastEnd = nextIndex;
            return {
              value: value,
              done: false,
            };
          }
          return {
            done: true,
            value: null,
          };
        },
      };
    };

    var FLAG_UNRESTRICTED = 1 << 0;
    var FLAG_ID = 1 << 1;
    var FLAG_INTEGER = 1 << 2;
    var FLAG_NUMBER = 1 << 3;
    var LINE_FEED = 0x000a;
    var SOLIDUS = 0x002f;
    var REVERSE_SOLIDUS = 0x005c;
    var CHARACTER_TABULATION = 0x0009;
    var SPACE = 0x0020;
    var QUOTATION_MARK = 0x0022;
    var EQUALS_SIGN = 0x003d;
    var NUMBER_SIGN = 0x0023;
    var DOLLAR_SIGN = 0x0024;
    var PERCENTAGE_SIGN = 0x0025;
    var APOSTROPHE = 0x0027;
    var LEFT_PARENTHESIS = 0x0028;
    var RIGHT_PARENTHESIS = 0x0029;
    var LOW_LINE = 0x005f;
    var HYPHEN_MINUS = 0x002d;
    var EXCLAMATION_MARK = 0x0021;
    var LESS_THAN_SIGN = 0x003c;
    var GREATER_THAN_SIGN = 0x003e;
    var COMMERCIAL_AT = 0x0040;
    var LEFT_SQUARE_BRACKET = 0x005b;
    var RIGHT_SQUARE_BRACKET = 0x005d;
    var CIRCUMFLEX_ACCENT = 0x003d;
    var LEFT_CURLY_BRACKET = 0x007b;
    var QUESTION_MARK = 0x003f;
    var RIGHT_CURLY_BRACKET = 0x007d;
    var VERTICAL_LINE = 0x007c;
    var TILDE = 0x007e;
    var CONTROL = 0x0080;
    var REPLACEMENT_CHARACTER = 0xfffd;
    var ASTERISK = 0x002a;
    var PLUS_SIGN = 0x002b;
    var COMMA = 0x002c;
    var COLON = 0x003a;
    var SEMICOLON = 0x003b;
    var FULL_STOP = 0x002e;
    var NULL = 0x0000;
    var BACKSPACE = 0x0008;
    var LINE_TABULATION = 0x000b;
    var SHIFT_OUT = 0x000e;
    var INFORMATION_SEPARATOR_ONE = 0x001f;
    var DELETE = 0x007f;
    var EOF = -1;
    var ZERO = 0x0030;
    var a = 0x0061;
    var e = 0x0065;
    var f = 0x0066;
    var u = 0x0075;
    var z = 0x007a;
    var A = 0x0041;
    var E = 0x0045;
    var F = 0x0046;
    var U = 0x0055;
    var Z = 0x005a;
    var isDigit = function (codePoint) {
      return codePoint >= ZERO && codePoint <= 0x0039;
    };
    var isSurrogateCodePoint = function (codePoint) {
      return codePoint >= 0xd800 && codePoint <= 0xdfff;
    };
    var isHex = function (codePoint) {
      return (
        isDigit(codePoint) ||
        (codePoint >= A && codePoint <= F) ||
        (codePoint >= a && codePoint <= f)
      );
    };
    var isLowerCaseLetter = function (codePoint) {
      return codePoint >= a && codePoint <= z;
    };
    var isUpperCaseLetter = function (codePoint) {
      return codePoint >= A && codePoint <= Z;
    };
    var isLetter = function (codePoint) {
      return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint);
    };
    var isNonASCIICodePoint = function (codePoint) {
      return codePoint >= CONTROL;
    };
    var isWhiteSpace = function (codePoint) {
      return (
        codePoint === LINE_FEED ||
        codePoint === CHARACTER_TABULATION ||
        codePoint === SPACE
      );
    };
    var isNameStartCodePoint = function (codePoint) {
      return (
        isLetter(codePoint) ||
        isNonASCIICodePoint(codePoint) ||
        codePoint === LOW_LINE
      );
    };
    var isNameCodePoint = function (codePoint) {
      return (
        isNameStartCodePoint(codePoint) ||
        isDigit(codePoint) ||
        codePoint === HYPHEN_MINUS
      );
    };
    var isNonPrintableCodePoint = function (codePoint) {
      return (
        (codePoint >= NULL && codePoint <= BACKSPACE) ||
        codePoint === LINE_TABULATION ||
        (codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE) ||
        codePoint === DELETE
      );
    };
    var isValidEscape = function (c1, c2) {
      if (c1 !== REVERSE_SOLIDUS) {
        return false;
      }
      return c2 !== LINE_FEED;
    };
    var isIdentifierStart = function (c1, c2, c3) {
      if (c1 === HYPHEN_MINUS) {
        return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
      } else if (isNameStartCodePoint(c1)) {
        return true;
      } else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
        return true;
      }
      return false;
    };
    var isNumberStart = function (c1, c2, c3) {
      if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
        if (isDigit(c2)) {
          return true;
        }
        return c2 === FULL_STOP && isDigit(c3);
      }
      if (c1 === FULL_STOP) {
        return isDigit(c2);
      }
      return isDigit(c1);
    };
    var stringToNumber = function (codePoints) {
      var c = 0;
      var sign = 1;
      if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
        if (codePoints[c] === HYPHEN_MINUS) {
          sign = -1;
        }
        c++;
      }
      var integers = [];
      while (isDigit(codePoints[c])) {
        integers.push(codePoints[c++]);
      }
      var int = integers.length
        ? parseInt(fromCodePoint$1.apply(void 0, integers), 10)
        : 0;
      if (codePoints[c] === FULL_STOP) {
        c++;
      }
      var fraction = [];
      while (isDigit(codePoints[c])) {
        fraction.push(codePoints[c++]);
      }
      var fracd = fraction.length;
      var frac = fracd
        ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10)
        : 0;
      if (codePoints[c] === E || codePoints[c] === e) {
        c++;
      }
      var expsign = 1;
      if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
        if (codePoints[c] === HYPHEN_MINUS) {
          expsign = -1;
        }
        c++;
      }
      var exponent = [];
      while (isDigit(codePoints[c])) {
        exponent.push(codePoints[c++]);
      }
      var exp = exponent.length
        ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10)
        : 0;
      return (
        sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp)
      );
    };
    var LEFT_PARENTHESIS_TOKEN = {
      type: 2,
    };
    var RIGHT_PARENTHESIS_TOKEN = {
      type: 3,
    };
    var COMMA_TOKEN = {
      type: 4,
    };
    var SUFFIX_MATCH_TOKEN = {
      type: 13,
    };
    var PREFIX_MATCH_TOKEN = {
      type: 8,
    };
    var COLUMN_TOKEN = {
      type: 21,
    };
    var DASH_MATCH_TOKEN = {
      type: 9,
    };
    var INCLUDE_MATCH_TOKEN = {
      type: 10,
    };
    var LEFT_CURLY_BRACKET_TOKEN = {
      type: 11,
    };
    var RIGHT_CURLY_BRACKET_TOKEN = {
      type: 12,
    };
    var SUBSTRING_MATCH_TOKEN = {
      type: 14,
    };
    var BAD_URL_TOKEN = {
      type: 23,
    };
    var BAD_STRING_TOKEN = {
      type: 1,
    };
    var CDO_TOKEN = {
      type: 25,
    };
    var CDC_TOKEN = {
      type: 24,
    };
    var COLON_TOKEN = {
      type: 26,
    };
    var SEMICOLON_TOKEN = {
      type: 27,
    };
    var LEFT_SQUARE_BRACKET_TOKEN = {
      type: 28,
    };
    var RIGHT_SQUARE_BRACKET_TOKEN = {
      type: 29,
    };
    var WHITESPACE_TOKEN = {
      type: 31,
    };
    var EOF_TOKEN = {
      type: 32,
    };
    var Tokenizer = (function () {
      function Tokenizer() {
        this._value = [];
      }
      Tokenizer.prototype.write = function (chunk) {
        this._value = this._value.concat(toCodePoints$1(chunk));
      };
      Tokenizer.prototype.read = function () {
        var tokens = [];
        var token = this.consumeToken();
        while (token !== EOF_TOKEN) {
          tokens.push(token);
          token = this.consumeToken();
        }
        return tokens;
      };
      Tokenizer.prototype.consumeToken = function () {
        var codePoint = this.consumeCodePoint();
        switch (codePoint) {
          case QUOTATION_MARK:
            return this.consumeStringToken(QUOTATION_MARK);
          case NUMBER_SIGN:
            var c1 = this.peekCodePoint(0);
            var c2 = this.peekCodePoint(1);
            var c3 = this.peekCodePoint(2);
            if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
              var flags = isIdentifierStart(c1, c2, c3)
                ? FLAG_ID
                : FLAG_UNRESTRICTED;
              var value = this.consumeName();
              return {
                type: 5,
                value: value,
                flags: flags,
              };
            }
            break;
          case DOLLAR_SIGN:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return SUFFIX_MATCH_TOKEN;
            }
            break;
          case APOSTROPHE:
            return this.consumeStringToken(APOSTROPHE);
          case LEFT_PARENTHESIS:
            return LEFT_PARENTHESIS_TOKEN;
          case RIGHT_PARENTHESIS:
            return RIGHT_PARENTHESIS_TOKEN;
          case ASTERISK:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return SUBSTRING_MATCH_TOKEN;
            }
            break;
          case PLUS_SIGN:
            if (
              isNumberStart(
                codePoint,
                this.peekCodePoint(0),
                this.peekCodePoint(1),
              )
            ) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
            }
            break;
          case COMMA:
            return COMMA_TOKEN;
          case HYPHEN_MINUS:
            var e1 = codePoint;
            var e2 = this.peekCodePoint(0);
            var e3 = this.peekCodePoint(1);
            if (isNumberStart(e1, e2, e3)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
            }
            if (isIdentifierStart(e1, e2, e3)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeIdentLikeToken();
            }
            if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
              this.consumeCodePoint();
              this.consumeCodePoint();
              return CDC_TOKEN;
            }
            break;
          case FULL_STOP:
            if (
              isNumberStart(
                codePoint,
                this.peekCodePoint(0),
                this.peekCodePoint(1),
              )
            ) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
            }
            break;
          case SOLIDUS:
            if (this.peekCodePoint(0) === ASTERISK) {
              this.consumeCodePoint();
              while (true) {
                var c = this.consumeCodePoint();
                if (c === ASTERISK) {
                  c = this.consumeCodePoint();
                  if (c === SOLIDUS) {
                    return this.consumeToken();
                  }
                }
                if (c === EOF) {
                  return this.consumeToken();
                }
              }
            }
            break;
          case COLON:
            return COLON_TOKEN;
          case SEMICOLON:
            return SEMICOLON_TOKEN;
          case LESS_THAN_SIGN:
            if (
              this.peekCodePoint(0) === EXCLAMATION_MARK &&
              this.peekCodePoint(1) === HYPHEN_MINUS &&
              this.peekCodePoint(2) === HYPHEN_MINUS
            ) {
              this.consumeCodePoint();
              this.consumeCodePoint();
              return CDO_TOKEN;
            }
            break;
          case COMMERCIAL_AT:
            var a1 = this.peekCodePoint(0);
            var a2 = this.peekCodePoint(1);
            var a3 = this.peekCodePoint(2);
            if (isIdentifierStart(a1, a2, a3)) {
              var value = this.consumeName();
              return {
                type: 7,
                value: value,
              };
            }
            break;
          case LEFT_SQUARE_BRACKET:
            return LEFT_SQUARE_BRACKET_TOKEN;
          case REVERSE_SOLIDUS:
            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeIdentLikeToken();
            }
            break;
          case RIGHT_SQUARE_BRACKET:
            return RIGHT_SQUARE_BRACKET_TOKEN;
          case CIRCUMFLEX_ACCENT:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return PREFIX_MATCH_TOKEN;
            }
            break;
          case LEFT_CURLY_BRACKET:
            return LEFT_CURLY_BRACKET_TOKEN;
          case RIGHT_CURLY_BRACKET:
            return RIGHT_CURLY_BRACKET_TOKEN;
          case u:
          case U:
            var u1 = this.peekCodePoint(0);
            var u2 = this.peekCodePoint(1);
            if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
              this.consumeCodePoint();
              this.consumeUnicodeRangeToken();
            }
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
          case VERTICAL_LINE:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return DASH_MATCH_TOKEN;
            }
            if (this.peekCodePoint(0) === VERTICAL_LINE) {
              this.consumeCodePoint();
              return COLUMN_TOKEN;
            }
            break;
          case TILDE:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return INCLUDE_MATCH_TOKEN;
            }
            break;
          case EOF:
            return EOF_TOKEN;
        }
        if (isWhiteSpace(codePoint)) {
          this.consumeWhiteSpace();
          return WHITESPACE_TOKEN;
        }
        if (isDigit(codePoint)) {
          this.reconsumeCodePoint(codePoint);
          return this.consumeNumericToken();
        }
        if (isNameStartCodePoint(codePoint)) {
          this.reconsumeCodePoint(codePoint);
          return this.consumeIdentLikeToken();
        }
        return {
          type: 6,
          value: fromCodePoint$1(codePoint),
        };
      };
      Tokenizer.prototype.consumeCodePoint = function () {
        var value = this._value.shift();
        return typeof value === "undefined" ? -1 : value;
      };
      Tokenizer.prototype.reconsumeCodePoint = function (codePoint) {
        this._value.unshift(codePoint);
      };
      Tokenizer.prototype.peekCodePoint = function (delta) {
        if (delta >= this._value.length) {
          return -1;
        }
        return this._value[delta];
      };
      Tokenizer.prototype.consumeUnicodeRangeToken = function () {
        var digits = [];
        var codePoint = this.consumeCodePoint();
        while (isHex(codePoint) && digits.length < 6) {
          digits.push(codePoint);
          codePoint = this.consumeCodePoint();
        }
        var questionMarks = false;
        while (codePoint === QUESTION_MARK && digits.length < 6) {
          digits.push(codePoint);
          codePoint = this.consumeCodePoint();
          questionMarks = true;
        }
        if (questionMarks) {
          var start_1 = parseInt(
            fromCodePoint$1.apply(
              void 0,
              digits.map(function (digit) {
                return digit === QUESTION_MARK ? ZERO : digit;
              }),
            ),
            16,
          );
          var end = parseInt(
            fromCodePoint$1.apply(
              void 0,
              digits.map(function (digit) {
                return digit === QUESTION_MARK ? F : digit;
              }),
            ),
            16,
          );
          return {
            type: 30,
            start: start_1,
            end: end,
          };
        }
        var start = parseInt(fromCodePoint$1.apply(void 0, digits), 16);
        if (
          this.peekCodePoint(0) === HYPHEN_MINUS &&
          isHex(this.peekCodePoint(1))
        ) {
          this.consumeCodePoint();
          codePoint = this.consumeCodePoint();
          var endDigits = [];
          while (isHex(codePoint) && endDigits.length < 6) {
            endDigits.push(codePoint);
            codePoint = this.consumeCodePoint();
          }
          var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
          return {
            type: 30,
            start: start,
            end: end,
          };
        } else {
          return {
            type: 30,
            start: start,
            end: start,
          };
        }
      };
      Tokenizer.prototype.consumeIdentLikeToken = function () {
        var value = this.consumeName();
        if (
          value.toLowerCase() === "url" &&
          this.peekCodePoint(0) === LEFT_PARENTHESIS
        ) {
          this.consumeCodePoint();
          return this.consumeUrlToken();
        } else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
          this.consumeCodePoint();
          return {
            type: 19,
            value: value,
          };
        }
        return {
          type: 20,
          value: value,
        };
      };
      Tokenizer.prototype.consumeUrlToken = function () {
        var value = [];
        this.consumeWhiteSpace();
        if (this.peekCodePoint(0) === EOF) {
          return {
            type: 22,
            value: "",
          };
        }
        var next = this.peekCodePoint(0);
        if (next === APOSTROPHE || next === QUOTATION_MARK) {
          var stringToken = this.consumeStringToken(this.consumeCodePoint());
          if (stringToken.type === 0) {
            this.consumeWhiteSpace();
            if (
              this.peekCodePoint(0) === EOF ||
              this.peekCodePoint(0) === RIGHT_PARENTHESIS
            ) {
              this.consumeCodePoint();
              return {
                type: 22,
                value: stringToken.value,
              };
            }
          }
          this.consumeBadUrlRemnants();
          return BAD_URL_TOKEN;
        }
        while (true) {
          var codePoint = this.consumeCodePoint();
          if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
            return {
              type: 22,
              value: fromCodePoint$1.apply(void 0, value),
            };
          } else if (isWhiteSpace(codePoint)) {
            this.consumeWhiteSpace();
            if (
              this.peekCodePoint(0) === EOF ||
              this.peekCodePoint(0) === RIGHT_PARENTHESIS
            ) {
              this.consumeCodePoint();
              return {
                type: 22,
                value: fromCodePoint$1.apply(void 0, value),
              };
            }
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
          } else if (
            codePoint === QUOTATION_MARK ||
            codePoint === APOSTROPHE ||
            codePoint === LEFT_PARENTHESIS ||
            isNonPrintableCodePoint(codePoint)
          ) {
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
          } else if (codePoint === REVERSE_SOLIDUS) {
            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
              value.push(this.consumeEscapedCodePoint());
            } else {
              this.consumeBadUrlRemnants();
              return BAD_URL_TOKEN;
            }
          } else {
            value.push(codePoint);
          }
        }
      };
      Tokenizer.prototype.consumeWhiteSpace = function () {
        while (isWhiteSpace(this.peekCodePoint(0))) {
          this.consumeCodePoint();
        }
      };
      Tokenizer.prototype.consumeBadUrlRemnants = function () {
        while (true) {
          var codePoint = this.consumeCodePoint();
          if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
            return;
          }
          if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            this.consumeEscapedCodePoint();
          }
        }
      };
      Tokenizer.prototype.consumeStringSlice = function (count) {
        var SLICE_STACK_SIZE = 50000;
        var value = "";
        while (count > 0) {
          var amount = Math.min(SLICE_STACK_SIZE, count);
          value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount));
          count -= amount;
        }
        this._value.shift();
        return value;
      };
      Tokenizer.prototype.consumeStringToken = function (endingCodePoint) {
        var value = "";
        var i = 0;
        do {
          var codePoint = this._value[i];
          if (
            codePoint === EOF ||
            codePoint === undefined ||
            codePoint === endingCodePoint
          ) {
            value += this.consumeStringSlice(i);
            return {
              type: 0,
              value: value,
            };
          }
          if (codePoint === LINE_FEED) {
            this._value.splice(0, i);
            return BAD_STRING_TOKEN;
          }
          if (codePoint === REVERSE_SOLIDUS) {
            var next = this._value[i + 1];
            if (next !== EOF && next !== undefined) {
              if (next === LINE_FEED) {
                value += this.consumeStringSlice(i);
                i = -1;
                this._value.shift();
              } else if (isValidEscape(codePoint, next)) {
                value += this.consumeStringSlice(i);
                value += fromCodePoint$1(this.consumeEscapedCodePoint());
                i = -1;
              }
            }
          }
          i++;
        } while (true);
      };
      Tokenizer.prototype.consumeNumber = function () {
        var repr = [];
        var type = FLAG_INTEGER;
        var c1 = this.peekCodePoint(0);
        if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
          repr.push(this.consumeCodePoint());
        }
        while (isDigit(this.peekCodePoint(0))) {
          repr.push(this.consumeCodePoint());
        }
        c1 = this.peekCodePoint(0);
        var c2 = this.peekCodePoint(1);
        if (c1 === FULL_STOP && isDigit(c2)) {
          repr.push(this.consumeCodePoint(), this.consumeCodePoint());
          type = FLAG_NUMBER;
          while (isDigit(this.peekCodePoint(0))) {
            repr.push(this.consumeCodePoint());
          }
        }
        c1 = this.peekCodePoint(0);
        c2 = this.peekCodePoint(1);
        var c3 = this.peekCodePoint(2);
        if (
          (c1 === E || c1 === e) &&
          (((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3)) ||
            isDigit(c2))
        ) {
          repr.push(this.consumeCodePoint(), this.consumeCodePoint());
          type = FLAG_NUMBER;
          while (isDigit(this.peekCodePoint(0))) {
            repr.push(this.consumeCodePoint());
          }
        }
        return [stringToNumber(repr), type];
      };
      Tokenizer.prototype.consumeNumericToken = function () {
        var _a = this.consumeNumber(),
          number = _a[0],
          flags = _a[1];
        var c1 = this.peekCodePoint(0);
        var c2 = this.peekCodePoint(1);
        var c3 = this.peekCodePoint(2);
        if (isIdentifierStart(c1, c2, c3)) {
          var unit = this.consumeName();
          return {
            type: 15,
            number: number,
            flags: flags,
            unit: unit,
          };
        }
        if (c1 === PERCENTAGE_SIGN) {
          this.consumeCodePoint();
          return {
            type: 16,
            number: number,
            flags: flags,
          };
        }
        return {
          type: 17,
          number: number,
          flags: flags,
        };
      };
      Tokenizer.prototype.consumeEscapedCodePoint = function () {
        var codePoint = this.consumeCodePoint();
        if (isHex(codePoint)) {
          var hex = fromCodePoint$1(codePoint);
          while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
            hex += fromCodePoint$1(this.consumeCodePoint());
          }
          if (isWhiteSpace(this.peekCodePoint(0))) {
            this.consumeCodePoint();
          }
          var hexCodePoint = parseInt(hex, 16);
          if (
            hexCodePoint === 0 ||
            isSurrogateCodePoint(hexCodePoint) ||
            hexCodePoint > 0x10ffff
          ) {
            return REPLACEMENT_CHARACTER;
          }
          return hexCodePoint;
        }
        if (codePoint === EOF) {
          return REPLACEMENT_CHARACTER;
        }
        return codePoint;
      };
      Tokenizer.prototype.consumeName = function () {
        var result = "";
        while (true) {
          var codePoint = this.consumeCodePoint();
          if (isNameCodePoint(codePoint)) {
            result += fromCodePoint$1(codePoint);
          } else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            result += fromCodePoint$1(this.consumeEscapedCodePoint());
          } else {
            this.reconsumeCodePoint(codePoint);
            return result;
          }
        }
      };
      return Tokenizer;
    })();
    var Parser = (function () {
      function Parser(tokens) {
        this._tokens = tokens;
      }
      Parser.create = function (value) {
        var tokenizer = new Tokenizer();
        tokenizer.write(value);
        return new Parser(tokenizer.read());
      };
      Parser.parseValue = function (value) {
        return Parser.create(value).parseComponentValue();
      };
      Parser.parseValues = function (value) {
        return Parser.create(value).parseComponentValues();
      };
      Parser.prototype.parseComponentValue = function () {
        var token = this.consumeToken();
        while (token.type === 31) {
          token = this.consumeToken();
        }
        if (token.type === 32) {
          throw new SyntaxError(
            "Error parsing CSS component value, unexpected EOF",
          );
        }
        this.reconsumeToken(token);
        var value = this.consumeComponentValue();
        do {
          token = this.consumeToken();
        } while (token.type === 31);
        if (token.type === 32) {
          return value;
        }
        throw new SyntaxError(
          "Error parsing CSS component value, multiple values found when expecting only one",
        );
      };
      Parser.prototype.parseComponentValues = function () {
        var values = [];
        while (true) {
          var value = this.consumeComponentValue();
          if (value.type === 32) {
            return values;
          }
          values.push(value);
          values.push();
        }
      };
      Parser.prototype.consumeComponentValue = function () {
        var token = this.consumeToken();
        switch (token.type) {
          case 11:
          case 28:
          case 2:
            return this.consumeSimpleBlock(token.type);
          case 19:
            return this.consumeFunction(token);
        }
        return token;
      };
      Parser.prototype.consumeSimpleBlock = function (type) {
        var block = {
          type: type,
          values: [],
        };
        var token = this.consumeToken();
        while (true) {
          if (token.type === 32 || isEndingTokenFor(token, type)) {
            return block;
          }
          this.reconsumeToken(token);
          block.values.push(this.consumeComponentValue());
          token = this.consumeToken();
        }
      };
      Parser.prototype.consumeFunction = function (functionToken) {
        var cssFunction = {
          name: functionToken.value,
          values: [],
          type: 18,
        };
        while (true) {
          var token = this.consumeToken();
          if (token.type === 32 || token.type === 3) {
            return cssFunction;
          }
          this.reconsumeToken(token);
          cssFunction.values.push(this.consumeComponentValue());
        }
      };
      Parser.prototype.consumeToken = function () {
        var token = this._tokens.shift();
        return typeof token === "undefined" ? EOF_TOKEN : token;
      };
      Parser.prototype.reconsumeToken = function (token) {
        this._tokens.unshift(token);
      };
      return Parser;
    })();
    var isDimensionToken = function (token) {
      return token.type === 15;
    };
    var isNumberToken = function (token) {
      return token.type === 17;
    };
    var isIdentToken = function (token) {
      return token.type === 20;
    };
    var isStringToken = function (token) {
      return token.type === 0;
    };
    var isIdentWithValue = function (token, value) {
      return isIdentToken(token) && token.value === value;
    };
    var nonWhiteSpace = function (token) {
      return token.type !== 31;
    };
    var nonFunctionArgSeparator = function (token) {
      return token.type !== 31 && token.type !== 4;
    };
    var parseFunctionArgs = function (tokens) {
      var args = [];
      var arg = [];
      tokens.forEach(function (token) {
        if (token.type === 4) {
          if (arg.length === 0) {
            throw new Error("Error parsing function args, zero tokens for arg");
          }
          args.push(arg);
          arg = [];
          return;
        }
        if (token.type !== 31) {
          arg.push(token);
        }
      });
      if (arg.length) {
        args.push(arg);
      }
      return args;
    };
    var isEndingTokenFor = function (token, type) {
      if (type === 11 && token.type === 12) {
        return true;
      }
      if (type === 28 && token.type === 29) {
        return true;
      }
      return type === 2 && token.type === 3;
    };
    var isLength = function (token) {
      return token.type === 17 || token.type === 15;
    };
    var isLengthPercentage = function (token) {
      return token.type === 16 || isLength(token);
    };
    var parseLengthPercentageTuple = function (tokens) {
      return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
    };
    var ZERO_LENGTH = {
      type: 17,
      number: 0,
      flags: FLAG_INTEGER,
    };
    var FIFTY_PERCENT = {
      type: 16,
      number: 50,
      flags: FLAG_INTEGER,
    };
    var HUNDRED_PERCENT = {
      type: 16,
      number: 100,
      flags: FLAG_INTEGER,
    };
    var getAbsoluteValueForTuple = function (tuple, width, height) {
      var x = tuple[0],
        y = tuple[1];
      return [
        getAbsoluteValue(x, width),
        getAbsoluteValue(typeof y !== "undefined" ? y : x, height),
      ];
    };
    var getAbsoluteValue = function (token, parent) {
      if (token.type === 16) {
        return (token.number / 100) * parent;
      }
      if (isDimensionToken(token)) {
        switch (token.unit) {
          case "rem":
          case "em":
            return 16 * token.number;
          case "px":
          default:
            return token.number;
        }
      }
      return token.number;
    };
    var DEG = "deg";
    var GRAD = "grad";
    var RAD = "rad";
    var TURN = "turn";
    var angle = {
      name: "angle",
      parse: function (_context, value) {
        if (value.type === 15) {
          switch (value.unit) {
            case DEG:
              return (Math.PI * value.number) / 180;
            case GRAD:
              return (Math.PI / 200) * value.number;
            case RAD:
              return value.number;
            case TURN:
              return Math.PI * 2 * value.number;
          }
        }
        throw new Error("Unsupported angle type");
      },
    };
    var isAngle = function (value) {
      if (value.type === 15) {
        if (
          value.unit === DEG ||
          value.unit === GRAD ||
          value.unit === RAD ||
          value.unit === TURN
        ) {
          return true;
        }
      }
      return false;
    };
    var parseNamedSide = function (tokens) {
      var sideOrCorner = tokens
        .filter(isIdentToken)
        .map(function (ident) {
          return ident.value;
        })
        .join(" ");
      switch (sideOrCorner) {
        case "to bottom right":
        case "to right bottom":
        case "left top":
        case "top left":
          return [ZERO_LENGTH, ZERO_LENGTH];
        case "to top":
        case "bottom":
          return deg(0);
        case "to bottom left":
        case "to left bottom":
        case "right top":
        case "top right":
          return [ZERO_LENGTH, HUNDRED_PERCENT];
        case "to right":
        case "left":
          return deg(90);
        case "to top left":
        case "to left top":
        case "right bottom":
        case "bottom right":
          return [HUNDRED_PERCENT, HUNDRED_PERCENT];
        case "to bottom":
        case "top":
          return deg(180);
        case "to top right":
        case "to right top":
        case "left bottom":
        case "bottom left":
          return [HUNDRED_PERCENT, ZERO_LENGTH];
        case "to left":
        case "right":
          return deg(270);
      }
      return 0;
    };
    var deg = function (deg) {
      return (Math.PI * deg) / 180;
    };
    var color$1 = {
      name: "color",
      parse: function (context, value) {
        if (value.type === 18) {
          var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
          if (typeof colorFunction === "undefined") {
            throw new Error(
              'Attempting to parse an unsupported color function "' +
                value.name +
                '"',
            );
          }
          return colorFunction(context, value.values);
        }
        if (value.type === 5) {
          if (value.value.length === 3) {
            var r = value.value.substring(0, 1);
            var g = value.value.substring(1, 2);
            var b = value.value.substring(2, 3);
            return pack(
              parseInt(r + r, 16),
              parseInt(g + g, 16),
              parseInt(b + b, 16),
              1,
            );
          }
          if (value.value.length === 4) {
            var r = value.value.substring(0, 1);
            var g = value.value.substring(1, 2);
            var b = value.value.substring(2, 3);
            var a = value.value.substring(3, 4);
            return pack(
              parseInt(r + r, 16),
              parseInt(g + g, 16),
              parseInt(b + b, 16),
              parseInt(a + a, 16) / 255,
            );
          }
          if (value.value.length === 6) {
            var r = value.value.substring(0, 2);
            var g = value.value.substring(2, 4);
            var b = value.value.substring(4, 6);
            return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
          }
          if (value.value.length === 8) {
            var r = value.value.substring(0, 2);
            var g = value.value.substring(2, 4);
            var b = value.value.substring(4, 6);
            var a = value.value.substring(6, 8);
            return pack(
              parseInt(r, 16),
              parseInt(g, 16),
              parseInt(b, 16),
              parseInt(a, 16) / 255,
            );
          }
        }
        if (value.type === 20) {
          var namedColor = COLORS[value.value.toUpperCase()];
          if (typeof namedColor !== "undefined") {
            return namedColor;
          }
        }
        return COLORS.TRANSPARENT;
      },
    };
    var isTransparent = function (color) {
      return (0xff & color) === 0;
    };
    var asString = function (color) {
      var alpha = 0xff & color;
      var blue = 0xff & (color >> 8);
      var green = 0xff & (color >> 16);
      var red = 0xff & (color >> 24);
      return alpha < 255
        ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")"
        : "rgb(" + red + "," + green + "," + blue + ")";
    };
    var pack = function (r, g, b, a) {
      return (
        ((r << 24) | (g << 16) | (b << 8) | (Math.round(a * 255) << 0)) >>> 0
      );
    };
    var getTokenColorValue = function (token, i) {
      if (token.type === 17) {
        return token.number;
      }
      if (token.type === 16) {
        var max = i === 3 ? 1 : 255;
        return i === 3
          ? (token.number / 100) * max
          : Math.round((token.number / 100) * max);
      }
      return 0;
    };
    var rgb = function (_context, args) {
      var tokens = args.filter(nonFunctionArgSeparator);
      if (tokens.length === 3) {
        var _a = tokens.map(getTokenColorValue),
          r = _a[0],
          g = _a[1],
          b = _a[2];
        return pack(r, g, b, 1);
      }
      if (tokens.length === 4) {
        var _b = tokens.map(getTokenColorValue),
          r = _b[0],
          g = _b[1],
          b = _b[2],
          a = _b[3];
        return pack(r, g, b, a);
      }
      return 0;
    };
    function hue2rgb(t1, t2, hue) {
      if (hue < 0) {
        hue += 1;
      }
      if (hue >= 1) {
        hue -= 1;
      }
      if (hue < 1 / 6) {
        return (t2 - t1) * hue * 6 + t1;
      } else if (hue < 1 / 2) {
        return t2;
      } else if (hue < 2 / 3) {
        return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
      } else {
        return t1;
      }
    }
    var hsl = function (context, args) {
      var tokens = args.filter(nonFunctionArgSeparator);
      var hue = tokens[0],
        saturation = tokens[1],
        lightness = tokens[2],
        alpha = tokens[3];
      var h =
        (hue.type === 17 ? deg(hue.number) : angle.parse(context, hue)) /
        (Math.PI * 2);
      var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
      var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
      var a =
        typeof alpha !== "undefined" && isLengthPercentage(alpha)
          ? getAbsoluteValue(alpha, 1)
          : 1;
      if (s === 0) {
        return pack(l * 255, l * 255, l * 255, 1);
      }
      var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      var t1 = l * 2 - t2;
      var r = hue2rgb(t1, t2, h + 1 / 3);
      var g = hue2rgb(t1, t2, h);
      var b = hue2rgb(t1, t2, h - 1 / 3);
      return pack(r * 255, g * 255, b * 255, a);
    };
    var SUPPORTED_COLOR_FUNCTIONS = {
      hsl: hsl,
      hsla: hsl,
      rgb: rgb,
      rgba: rgb,
    };
    var parseColor = function (context, value) {
      return color$1.parse(context, Parser.create(value).parseComponentValue());
    };
    var COLORS = {
      ALICEBLUE: 0xf0f8ffff,
      ANTIQUEWHITE: 0xfaebd7ff,
      AQUA: 0x00ffffff,
      AQUAMARINE: 0x7fffd4ff,
      AZURE: 0xf0ffffff,
      BEIGE: 0xf5f5dcff,
      BISQUE: 0xffe4c4ff,
      BLACK: 0x000000ff,
      BLANCHEDALMOND: 0xffebcdff,
      BLUE: 0x0000ffff,
      BLUEVIOLET: 0x8a2be2ff,
      BROWN: 0xa52a2aff,
      BURLYWOOD: 0xdeb887ff,
      CADETBLUE: 0x5f9ea0ff,
      CHARTREUSE: 0x7fff00ff,
      CHOCOLATE: 0xd2691eff,
      CORAL: 0xff7f50ff,
      CORNFLOWERBLUE: 0x6495edff,
      CORNSILK: 0xfff8dcff,
      CRIMSON: 0xdc143cff,
      CYAN: 0x00ffffff,
      DARKBLUE: 0x00008bff,
      DARKCYAN: 0x008b8bff,
      DARKGOLDENROD: 0xb886bbff,
      DARKGRAY: 0xa9a9a9ff,
      DARKGREEN: 0x006400ff,
      DARKGREY: 0xa9a9a9ff,
      DARKKHAKI: 0xbdb76bff,
      DARKMAGENTA: 0x8b008bff,
      DARKOLIVEGREEN: 0x556b2fff,
      DARKORANGE: 0xff8c00ff,
      DARKORCHID: 0x9932ccff,
      DARKRED: 0x8b0000ff,
      DARKSALMON: 0xe9967aff,
      DARKSEAGREEN: 0x8fbc8fff,
      DARKSLATEBLUE: 0x483d8bff,
      DARKSLATEGRAY: 0x2f4f4fff,
      DARKSLATEGREY: 0x2f4f4fff,
      DARKTURQUOISE: 0x00ced1ff,
      DARKVIOLET: 0x9400d3ff,
      DEEPPINK: 0xff1493ff,
      DEEPSKYBLUE: 0x00bfffff,
      DIMGRAY: 0x696969ff,
      DIMGREY: 0x696969ff,
      DODGERBLUE: 0x1e90ffff,
      FIREBRICK: 0xb22222ff,
      FLORALWHITE: 0xfffaf0ff,
      FORESTGREEN: 0x228b22ff,
      FUCHSIA: 0xff00ffff,
      GAINSBORO: 0xdcdcdcff,
      GHOSTWHITE: 0xf8f8ffff,
      GOLD: 0xffd700ff,
      GOLDENROD: 0xdaa520ff,
      GRAY: 0x808080ff,
      GREEN: 0x008000ff,
      GREENYELLOW: 0xadff2fff,
      GREY: 0x808080ff,
      HONEYDEW: 0xf0fff0ff,
      HOTPINK: 0xff69b4ff,
      INDIANRED: 0xcd5c5cff,
      INDIGO: 0x4b0082ff,
      IVORY: 0xfffff0ff,
      KHAKI: 0xf0e68cff,
      LAVENDER: 0xe6e6faff,
      LAVENDERBLUSH: 0xfff0f5ff,
      LAWNGREEN: 0x7cfc00ff,
      LEMONCHIFFON: 0xfffacdff,
      LIGHTBLUE: 0xadd8e6ff,
      LIGHTCORAL: 0xf08080ff,
      LIGHTCYAN: 0xe0ffffff,
      LIGHTGOLDENRODYELLOW: 0xfafad2ff,
      LIGHTGRAY: 0xd3d3d3ff,
      LIGHTGREEN: 0x90ee90ff,
      LIGHTGREY: 0xd3d3d3ff,
      LIGHTPINK: 0xffb6c1ff,
      LIGHTSALMON: 0xffa07aff,
      LIGHTSEAGREEN: 0x20b2aaff,
      LIGHTSKYBLUE: 0x87cefaff,
      LIGHTSLATEGRAY: 0x778899ff,
      LIGHTSLATEGREY: 0x778899ff,
      LIGHTSTEELBLUE: 0xb0c4deff,
      LIGHTYELLOW: 0xffffe0ff,
      LIME: 0x00ff00ff,
      LIMEGREEN: 0x32cd32ff,
      LINEN: 0xfaf0e6ff,
      MAGENTA: 0xff00ffff,
      MAROON: 0x800000ff,
      MEDIUMAQUAMARINE: 0x66cdaaff,
      MEDIUMBLUE: 0x0000cdff,
      MEDIUMORCHID: 0xba55d3ff,
      MEDIUMPURPLE: 0x9370dbff,
      MEDIUMSEAGREEN: 0x3cb371ff,
      MEDIUMSLATEBLUE: 0x7b68eeff,
      MEDIUMSPRINGGREEN: 0x00fa9aff,
      MEDIUMTURQUOISE: 0x48d1ccff,
      MEDIUMVIOLETRED: 0xc71585ff,
      MIDNIGHTBLUE: 0x191970ff,
      MINTCREAM: 0xf5fffaff,
      MISTYROSE: 0xffe4e1ff,
      MOCCASIN: 0xffe4b5ff,
      NAVAJOWHITE: 0xffdeadff,
      NAVY: 0x000080ff,
      OLDLACE: 0xfdf5e6ff,
      OLIVE: 0x808000ff,
      OLIVEDRAB: 0x6b8e23ff,
      ORANGE: 0xffa500ff,
      ORANGERED: 0xff4500ff,
      ORCHID: 0xda70d6ff,
      PALEGOLDENROD: 0xeee8aaff,
      PALEGREEN: 0x98fb98ff,
      PALETURQUOISE: 0xafeeeeff,
      PALEVIOLETRED: 0xdb7093ff,
      PAPAYAWHIP: 0xffefd5ff,
      PEACHPUFF: 0xffdab9ff,
      PERU: 0xcd853fff,
      PINK: 0xffc0cbff,
      PLUM: 0xdda0ddff,
      POWDERBLUE: 0xb0e0e6ff,
      PURPLE: 0x800080ff,
      REBECCAPURPLE: 0x663399ff,
      RED: 0xff0000ff,
      ROSYBROWN: 0xbc8f8fff,
      ROYALBLUE: 0x4169e1ff,
      SADDLEBROWN: 0x8b4513ff,
      SALMON: 0xfa8072ff,
      SANDYBROWN: 0xf4a460ff,
      SEAGREEN: 0x2e8b57ff,
      SEASHELL: 0xfff5eeff,
      SIENNA: 0xa0522dff,
      SILVER: 0xc0c0c0ff,
      SKYBLUE: 0x87ceebff,
      SLATEBLUE: 0x6a5acdff,
      SLATEGRAY: 0x708090ff,
      SLATEGREY: 0x708090ff,
      SNOW: 0xfffafaff,
      SPRINGGREEN: 0x00ff7fff,
      STEELBLUE: 0x4682b4ff,
      TAN: 0xd2b48cff,
      TEAL: 0x008080ff,
      THISTLE: 0xd8bfd8ff,
      TOMATO: 0xff6347ff,
      TRANSPARENT: 0x00000000,
      TURQUOISE: 0x40e0d0ff,
      VIOLET: 0xee82eeff,
      WHEAT: 0xf5deb3ff,
      WHITE: 0xffffffff,
      WHITESMOKE: 0xf5f5f5ff,
      YELLOW: 0xffff00ff,
      YELLOWGREEN: 0x9acd32ff,
    };
    var backgroundClip = {
      name: "background-clip",
      initialValue: "border-box",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return tokens.map(function (token) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case "padding-box":
                return 1;
              case "content-box":
                return 2;
            }
          }
          return 0;
        });
      },
    };
    var backgroundColor = {
      name: "background-color",
      initialValue: "transparent",
      prefix: false,
      type: 3,
      format: "color",
    };
    var parseColorStop = function (context, args) {
      var color = color$1.parse(context, args[0]);
      var stop = args[1];
      return stop && isLengthPercentage(stop)
        ? {
            color: color,
            stop: stop,
          }
        : {
            color: color,
            stop: null,
          };
    };
    var processColorStops = function (stops, lineLength) {
      var first = stops[0];
      var last = stops[stops.length - 1];
      if (first.stop === null) {
        first.stop = ZERO_LENGTH;
      }
      if (last.stop === null) {
        last.stop = HUNDRED_PERCENT;
      }
      var processStops = [];
      var previous = 0;
      for (var i = 0; i < stops.length; i++) {
        var stop_1 = stops[i].stop;
        if (stop_1 !== null) {
          var absoluteValue = getAbsoluteValue(stop_1, lineLength);
          if (absoluteValue > previous) {
            processStops.push(absoluteValue);
          } else {
            processStops.push(previous);
          }
          previous = absoluteValue;
        } else {
          processStops.push(null);
        }
      }
      var gapBegin = null;
      for (var i = 0; i < processStops.length; i++) {
        var stop_2 = processStops[i];
        if (stop_2 === null) {
          if (gapBegin === null) {
            gapBegin = i;
          }
        } else if (gapBegin !== null) {
          var gapLength = i - gapBegin;
          var beforeGap = processStops[gapBegin - 1];
          var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
          for (var g = 1; g <= gapLength; g++) {
            processStops[gapBegin + g - 1] = gapValue * g;
          }
          gapBegin = null;
        }
      }
      return stops.map(function (_a, i) {
        var color = _a.color;
        return {
          color: color,
          stop: Math.max(Math.min(1, processStops[i] / lineLength), 0),
        };
      });
    };
    var getAngleFromCorner = function (corner, width, height) {
      var centerX = width / 2;
      var centerY = height / 2;
      var x = getAbsoluteValue(corner[0], width) - centerX;
      var y = centerY - getAbsoluteValue(corner[1], height);
      return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
    };
    var calculateGradientDirection = function (angle, width, height) {
      var radian =
        typeof angle === "number"
          ? angle
          : getAngleFromCorner(angle, width, height);
      var lineLength =
        Math.abs(width * Math.sin(radian)) +
        Math.abs(height * Math.cos(radian));
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var halfLineLength = lineLength / 2;
      var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
      var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
      return [
        lineLength,
        halfWidth - xDiff,
        halfWidth + xDiff,
        halfHeight - yDiff,
        halfHeight + yDiff,
      ];
    };
    var distance = function (a, b) {
      return Math.sqrt(a * a + b * b);
    };
    var findCorner = function (width, height, x, y, closest) {
      var corners = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height],
      ];
      return corners.reduce(
        function (stat, corner) {
          var cx = corner[0],
            cy = corner[1];
          var d = distance(x - cx, y - cy);
          if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
            return {
              optimumCorner: corner,
              optimumDistance: d,
            };
          }
          return stat;
        },
        {
          optimumDistance: closest ? Infinity : -Infinity,
          optimumCorner: null,
        },
      ).optimumCorner;
    };
    var calculateRadius = function (gradient, x, y, width, height) {
      var rx = 0;
      var ry = 0;
      switch (gradient.size) {
        case 0:
          if (gradient.shape === 0) {
            rx = ry = Math.min(
              Math.abs(x),
              Math.abs(x - width),
              Math.abs(y),
              Math.abs(y - height),
            );
          } else if (gradient.shape === 1) {
            rx = Math.min(Math.abs(x), Math.abs(x - width));
            ry = Math.min(Math.abs(y), Math.abs(y - height));
          }
          break;
        case 2:
          if (gradient.shape === 0) {
            rx = ry = Math.min(
              distance(x, y),
              distance(x, y - height),
              distance(x - width, y),
              distance(x - width, y - height),
            );
          } else if (gradient.shape === 1) {
            var c =
              Math.min(Math.abs(y), Math.abs(y - height)) /
              Math.min(Math.abs(x), Math.abs(x - width));
            var _a = findCorner(width, height, x, y, true),
              cx = _a[0],
              cy = _a[1];
            rx = distance(cx - x, (cy - y) / c);
            ry = c * rx;
          }
          break;
        case 1:
          if (gradient.shape === 0) {
            rx = ry = Math.max(
              Math.abs(x),
              Math.abs(x - width),
              Math.abs(y),
              Math.abs(y - height),
            );
          } else if (gradient.shape === 1) {
            rx = Math.max(Math.abs(x), Math.abs(x - width));
            ry = Math.max(Math.abs(y), Math.abs(y - height));
          }
          break;
        case 3:
          if (gradient.shape === 0) {
            rx = ry = Math.max(
              distance(x, y),
              distance(x, y - height),
              distance(x - width, y),
              distance(x - width, y - height),
            );
          } else if (gradient.shape === 1) {
            var c =
              Math.max(Math.abs(y), Math.abs(y - height)) /
              Math.max(Math.abs(x), Math.abs(x - width));
            var _b = findCorner(width, height, x, y, false),
              cx = _b[0],
              cy = _b[1];
            rx = distance(cx - x, (cy - y) / c);
            ry = c * rx;
          }
          break;
      }
      if (Array.isArray(gradient.size)) {
        rx = getAbsoluteValue(gradient.size[0], width);
        ry =
          gradient.size.length === 2
            ? getAbsoluteValue(gradient.size[1], height)
            : rx;
      }
      return [rx, ry];
    };
    var linearGradient = function (context, tokens) {
      var angle$1 = deg(180);
      var stops = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
        if (i === 0) {
          var firstToken = arg[0];
          if (firstToken.type === 20 && firstToken.value === "to") {
            angle$1 = parseNamedSide(arg);
            return;
          } else if (isAngle(firstToken)) {
            angle$1 = angle.parse(context, firstToken);
            return;
          }
        }
        var colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
      });
      return {
        angle: angle$1,
        stops: stops,
        type: 1,
      };
    };
    var prefixLinearGradient = function (context, tokens) {
      var angle$1 = deg(180);
      var stops = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
        if (i === 0) {
          var firstToken = arg[0];
          if (
            firstToken.type === 20 &&
            ["top", "left", "right", "bottom"].indexOf(firstToken.value) !== -1
          ) {
            angle$1 = parseNamedSide(arg);
            return;
          } else if (isAngle(firstToken)) {
            angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
            return;
          }
        }
        var colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
      });
      return {
        angle: angle$1,
        stops: stops,
        type: 1,
      };
    };
    var webkitGradient = function (context, tokens) {
      var angle = deg(180);
      var stops = [];
      var type = 1;
      var shape = 0;
      var size = 3;
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
        var firstToken = arg[0];
        if (i === 0) {
          if (isIdentToken(firstToken) && firstToken.value === "linear") {
            type = 1;
            return;
          } else if (
            isIdentToken(firstToken) &&
            firstToken.value === "radial"
          ) {
            type = 2;
            return;
          }
        }
        if (firstToken.type === 18) {
          if (firstToken.name === "from") {
            var color = color$1.parse(context, firstToken.values[0]);
            stops.push({
              stop: ZERO_LENGTH,
              color: color,
            });
          } else if (firstToken.name === "to") {
            var color = color$1.parse(context, firstToken.values[0]);
            stops.push({
              stop: HUNDRED_PERCENT,
              color: color,
            });
          } else if (firstToken.name === "color-stop") {
            var values = firstToken.values.filter(nonFunctionArgSeparator);
            if (values.length === 2) {
              var color = color$1.parse(context, values[1]);
              var stop_1 = values[0];
              if (isNumberToken(stop_1)) {
                stops.push({
                  stop: {
                    type: 16,
                    number: stop_1.number * 100,
                    flags: stop_1.flags,
                  },
                  color: color,
                });
              }
            }
          }
        }
      });
      return type === 1
        ? {
            angle: (angle + deg(180)) % deg(360),
            stops: stops,
            type: type,
          }
        : {
            size: size,
            shape: shape,
            stops: stops,
            position: position,
            type: type,
          };
    };
    var CLOSEST_SIDE = "closest-side";
    var FARTHEST_SIDE = "farthest-side";
    var CLOSEST_CORNER = "closest-corner";
    var FARTHEST_CORNER = "farthest-corner";
    var CIRCLE = "circle";
    var ELLIPSE = "ellipse";
    var COVER = "cover";
    var CONTAIN = "contain";
    var radialGradient = function (context, tokens) {
      var shape = 0;
      var size = 3;
      var stops = [];
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
        var isColorStop = true;
        if (i === 0) {
          var isAtPosition_1 = false;
          isColorStop = arg.reduce(function (acc, token) {
            if (isAtPosition_1) {
              if (isIdentToken(token)) {
                switch (token.value) {
                  case "center":
                    position.push(FIFTY_PERCENT);
                    return acc;
                  case "top":
                  case "left":
                    position.push(ZERO_LENGTH);
                    return acc;
                  case "right":
                  case "bottom":
                    position.push(HUNDRED_PERCENT);
                    return acc;
                }
              } else if (isLengthPercentage(token) || isLength(token)) {
                position.push(token);
              }
            } else if (isIdentToken(token)) {
              switch (token.value) {
                case CIRCLE:
                  shape = 0;
                  return false;
                case ELLIPSE:
                  shape = 1;
                  return false;
                case "at":
                  isAtPosition_1 = true;
                  return false;
                case CLOSEST_SIDE:
                  size = 0;
                  return false;
                case COVER:
                case FARTHEST_SIDE:
                  size = 1;
                  return false;
                case CONTAIN:
                case CLOSEST_CORNER:
                  size = 2;
                  return false;
                case FARTHEST_CORNER:
                  size = 3;
                  return false;
              }
            } else if (isLength(token) || isLengthPercentage(token)) {
              if (!Array.isArray(size)) {
                size = [];
              }
              size.push(token);
              return false;
            }
            return acc;
          }, isColorStop);
        }
        if (isColorStop) {
          var colorStop = parseColorStop(context, arg);
          stops.push(colorStop);
        }
      });
      return {
        size: size,
        shape: shape,
        stops: stops,
        position: position,
        type: 2,
      };
    };
    var prefixRadialGradient = function (context, tokens) {
      var shape = 0;
      var size = 3;
      var stops = [];
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
        var isColorStop = true;
        if (i === 0) {
          isColorStop = arg.reduce(function (acc, token) {
            if (isIdentToken(token)) {
              switch (token.value) {
                case "center":
                  position.push(FIFTY_PERCENT);
                  return false;
                case "top":
                case "left":
                  position.push(ZERO_LENGTH);
                  return false;
                case "right":
                case "bottom":
                  position.push(HUNDRED_PERCENT);
                  return false;
              }
            } else if (isLengthPercentage(token) || isLength(token)) {
              position.push(token);
              return false;
            }
            return acc;
          }, isColorStop);
        } else if (i === 1) {
          isColorStop = arg.reduce(function (acc, token) {
            if (isIdentToken(token)) {
              switch (token.value) {
                case CIRCLE:
                  shape = 0;
                  return false;
                case ELLIPSE:
                  shape = 1;
                  return false;
                case CONTAIN:
                case CLOSEST_SIDE:
                  size = 0;
                  return false;
                case FARTHEST_SIDE:
                  size = 1;
                  return false;
                case CLOSEST_CORNER:
                  size = 2;
                  return false;
                case COVER:
                case FARTHEST_CORNER:
                  size = 3;
                  return false;
              }
            } else if (isLength(token) || isLengthPercentage(token)) {
              if (!Array.isArray(size)) {
                size = [];
              }
              size.push(token);
              return false;
            }
            return acc;
          }, isColorStop);
        }
        if (isColorStop) {
          var colorStop = parseColorStop(context, arg);
          stops.push(colorStop);
        }
      });
      return {
        size: size,
        shape: shape,
        stops: stops,
        position: position,
        type: 2,
      };
    };
    var isLinearGradient = function (background) {
      return background.type === 1;
    };
    var isRadialGradient = function (background) {
      return background.type === 2;
    };
    var image = {
      name: "image",
      parse: function (context, value) {
        if (value.type === 22) {
          var image_1 = {
            url: value.value,
            type: 0,
          };
          context.cache.addImage(value.value);
          return image_1;
        }
        if (value.type === 18) {
          var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
          if (typeof imageFunction === "undefined") {
            throw new Error(
              'Attempting to parse an unsupported image function "' +
                value.name +
                '"',
            );
          }
          return imageFunction(context, value.values);
        }
        throw new Error("Unsupported image type " + value.type);
      },
    };
    function isSupportedImage(value) {
      return (
        !(value.type === 20 && value.value === "none") &&
        (value.type !== 18 || !!SUPPORTED_IMAGE_FUNCTIONS[value.name])
      );
    }
    var SUPPORTED_IMAGE_FUNCTIONS = {
      "linear-gradient": linearGradient,
      "-moz-linear-gradient": prefixLinearGradient,
      "-ms-linear-gradient": prefixLinearGradient,
      "-o-linear-gradient": prefixLinearGradient,
      "-webkit-linear-gradient": prefixLinearGradient,
      "radial-gradient": radialGradient,
      "-moz-radial-gradient": prefixRadialGradient,
      "-ms-radial-gradient": prefixRadialGradient,
      "-o-radial-gradient": prefixRadialGradient,
      "-webkit-radial-gradient": prefixRadialGradient,
      "-webkit-gradient": webkitGradient,
    };
    var backgroundImage = {
      name: "background-image",
      initialValue: "none",
      type: 1,
      prefix: false,
      parse: function (context, tokens) {
        if (tokens.length === 0) {
          return [];
        }
        var first = tokens[0];
        if (first.type === 20 && first.value === "none") {
          return [];
        }
        return tokens
          .filter(function (value) {
            return nonFunctionArgSeparator(value) && isSupportedImage(value);
          })
          .map(function (value) {
            return image.parse(context, value);
          });
      },
    };
    var backgroundOrigin = {
      name: "background-origin",
      initialValue: "border-box",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return tokens.map(function (token) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case "padding-box":
                return 1;
              case "content-box":
                return 2;
            }
          }
          return 0;
        });
      },
    };
    var backgroundPosition = {
      name: "background-position",
      initialValue: "0% 0%",
      type: 1,
      prefix: false,
      parse: function (_context, tokens) {
        return parseFunctionArgs(tokens)
          .map(function (values) {
            return values.filter(isLengthPercentage);
          })
          .map(parseLengthPercentageTuple);
      },
    };
    var backgroundRepeat = {
      name: "background-repeat",
      initialValue: "repeat",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return parseFunctionArgs(tokens)
          .map(function (values) {
            return values
              .filter(isIdentToken)
              .map(function (token) {
                return token.value;
              })
              .join(" ");
          })
          .map(parseBackgroundRepeat);
      },
    };
    var parseBackgroundRepeat = function (value) {
      switch (value) {
        case "no-repeat":
          return 1;
        case "repeat-x":
        case "repeat no-repeat":
          return 2;
        case "repeat-y":
        case "no-repeat repeat":
          return 3;
        case "repeat":
        default:
          return 0;
      }
    };
    var BACKGROUND_SIZE;
    (function (BACKGROUND_SIZE) {
      BACKGROUND_SIZE["AUTO"] = "auto";
      BACKGROUND_SIZE["CONTAIN"] = "contain";
      BACKGROUND_SIZE["COVER"] = "cover";
    })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
    var backgroundSize = {
      name: "background-size",
      initialValue: "0",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return parseFunctionArgs(tokens).map(function (values) {
          return values.filter(isBackgroundSizeInfoToken);
        });
      },
    };
    var isBackgroundSizeInfoToken = function (value) {
      return isIdentToken(value) || isLengthPercentage(value);
    };
    var borderColorForSide = function (side) {
      return {
        name: "border-" + side + "-color",
        initialValue: "transparent",
        prefix: false,
        type: 3,
        format: "color",
      };
    };
    var borderTopColor = borderColorForSide("top");
    var borderRightColor = borderColorForSide("right");
    var borderBottomColor = borderColorForSide("bottom");
    var borderLeftColor = borderColorForSide("left");
    var borderRadiusForSide = function (side) {
      return {
        name: "border-radius-" + side,
        initialValue: "0 0",
        prefix: false,
        type: 1,
        parse: function (_context, tokens) {
          return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
        },
      };
    };
    var borderTopLeftRadius = borderRadiusForSide("top-left");
    var borderTopRightRadius = borderRadiusForSide("top-right");
    var borderBottomRightRadius = borderRadiusForSide("bottom-right");
    var borderBottomLeftRadius = borderRadiusForSide("bottom-left");
    var borderStyleForSide = function (side) {
      return {
        name: "border-" + side + "-style",
        initialValue: "solid",
        prefix: false,
        type: 2,
        parse: function (_context, style) {
          switch (style) {
            case "none":
              return 0;
            case "dashed":
              return 2;
            case "dotted":
              return 3;
            case "double":
              return 4;
          }
          return 1;
        },
      };
    };
    var borderTopStyle = borderStyleForSide("top");
    var borderRightStyle = borderStyleForSide("right");
    var borderBottomStyle = borderStyleForSide("bottom");
    var borderLeftStyle = borderStyleForSide("left");
    var borderWidthForSide = function (side) {
      return {
        name: "border-" + side + "-width",
        initialValue: "0",
        type: 0,
        prefix: false,
        parse: function (_context, token) {
          if (isDimensionToken(token)) {
            return token.number;
          }
          return 0;
        },
      };
    };
    var borderTopWidth = borderWidthForSide("top");
    var borderRightWidth = borderWidthForSide("right");
    var borderBottomWidth = borderWidthForSide("bottom");
    var borderLeftWidth = borderWidthForSide("left");
    var color = {
      name: "color",
      initialValue: "transparent",
      prefix: false,
      type: 3,
      format: "color",
    };
    var direction = {
      name: "direction",
      initialValue: "ltr",
      prefix: false,
      type: 2,
      parse: function (_context, direction) {
        switch (direction) {
          case "rtl":
            return 1;
          case "ltr":
          default:
            return 0;
        }
      },
    };
    var display = {
      name: "display",
      initialValue: "inline-block",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return tokens.filter(isIdentToken).reduce(function (bit, token) {
          return bit | parseDisplayValue(token.value);
        }, 0);
      },
    };
    var parseDisplayValue = function (display) {
      switch (display) {
        case "block":
        case "-webkit-box":
          return 2;
        case "inline":
          return 4;
        case "run-in":
          return 8;
        case "flow":
          return 16;
        case "flow-root":
          return 32;
        case "table":
          return 64;
        case "flex":
        case "-webkit-flex":
          return 128;
        case "grid":
        case "-ms-grid":
          return 256;
        case "ruby":
          return 512;
        case "subgrid":
          return 1024;
        case "list-item":
          return 2048;
        case "table-row-group":
          return 4096;
        case "table-header-group":
          return 8192;
        case "table-footer-group":
          return 16384;
        case "table-row":
          return 32768;
        case "table-cell":
          return 65536;
        case "table-column-group":
          return 131072;
        case "table-column":
          return 262144;
        case "table-caption":
          return 524288;
        case "ruby-base":
          return 1048576;
        case "ruby-text":
          return 2097152;
        case "ruby-base-container":
          return 4194304;
        case "ruby-text-container":
          return 8388608;
        case "contents":
          return 16777216;
        case "inline-block":
          return 33554432;
        case "inline-list-item":
          return 67108864;
        case "inline-table":
          return 134217728;
        case "inline-flex":
          return 268435456;
        case "inline-grid":
          return 536870912;
      }
      return 0;
    };
    var float = {
      name: "float",
      initialValue: "none",
      prefix: false,
      type: 2,
      parse: function (_context, float) {
        switch (float) {
          case "left":
            return 1;
          case "right":
            return 2;
          case "inline-start":
            return 3;
          case "inline-end":
            return 4;
        }
        return 0;
      },
    };
    var letterSpacing = {
      name: "letter-spacing",
      initialValue: "0",
      prefix: false,
      type: 0,
      parse: function (_context, token) {
        if (token.type === 20 && token.value === "normal") {
          return 0;
        }
        if (token.type === 17) {
          return token.number;
        }
        if (token.type === 15) {
          return token.number;
        }
        return 0;
      },
    };
    var LINE_BREAK;
    (function (LINE_BREAK) {
      LINE_BREAK["NORMAL"] = "normal";
      LINE_BREAK["STRICT"] = "strict";
    })(LINE_BREAK || (LINE_BREAK = {}));
    var lineBreak = {
      name: "line-break",
      initialValue: "normal",
      prefix: false,
      type: 2,
      parse: function (_context, lineBreak) {
        switch (lineBreak) {
          case "strict":
            return LINE_BREAK.STRICT;
          case "normal":
          default:
            return LINE_BREAK.NORMAL;
        }
      },
    };
    var lineHeight = {
      name: "line-height",
      initialValue: "normal",
      prefix: false,
      type: 4,
    };
    var computeLineHeight = function (token, fontSize) {
      if (isIdentToken(token) && token.value === "normal") {
        return 1.2 * fontSize;
      } else if (token.type === 17) {
        return fontSize * token.number;
      } else if (isLengthPercentage(token)) {
        return getAbsoluteValue(token, fontSize);
      }
      return fontSize;
    };
    var listStyleImage = {
      name: "list-style-image",
      initialValue: "none",
      type: 0,
      prefix: false,
      parse: function (context, token) {
        if (token.type === 20 && token.value === "none") {
          return null;
        }
        return image.parse(context, token);
      },
    };
    var listStylePosition = {
      name: "list-style-position",
      initialValue: "outside",
      prefix: false,
      type: 2,
      parse: function (_context, position) {
        switch (position) {
          case "inside":
            return 0;
          case "outside":
          default:
            return 1;
        }
      },
    };
    var listStyleType = {
      name: "list-style-type",
      initialValue: "none",
      prefix: false,
      type: 2,
      parse: function (_context, type) {
        switch (type) {
          case "disc":
            return 0;
          case "circle":
            return 1;
          case "square":
            return 2;
          case "decimal":
            return 3;
          case "cjk-decimal":
            return 4;
          case "decimal-leading-zero":
            return 5;
          case "lower-roman":
            return 6;
          case "upper-roman":
            return 7;
          case "lower-greek":
            return 8;
          case "lower-alpha":
            return 9;
          case "upper-alpha":
            return 10;
          case "arabic-indic":
            return 11;
          case "armenian":
            return 12;
          case "bengali":
            return 13;
          case "cambodian":
            return 14;
          case "cjk-earthly-branch":
            return 15;
          case "cjk-heavenly-stem":
            return 16;
          case "cjk-ideographic":
            return 17;
          case "devanagari":
            return 18;
          case "ethiopic-numeric":
            return 19;
          case "georgian":
            return 20;
          case "gujarati":
            return 21;
          case "gurmukhi":
            return 22;
          case "hebrew":
            return 22;
          case "hiragana":
            return 23;
          case "hiragana-iroha":
            return 24;
          case "japanese-formal":
            return 25;
          case "japanese-informal":
            return 26;
          case "kannada":
            return 27;
          case "katakana":
            return 28;
          case "katakana-iroha":
            return 29;
          case "khmer":
            return 30;
          case "korean-hangul-formal":
            return 31;
          case "korean-hanja-formal":
            return 32;
          case "korean-hanja-informal":
            return 33;
          case "lao":
            return 34;
          case "lower-armenian":
            return 35;
          case "malayalam":
            return 36;
          case "mongolian":
            return 37;
          case "myanmar":
            return 38;
          case "oriya":
            return 39;
          case "persian":
            return 40;
          case "simp-chinese-formal":
            return 41;
          case "simp-chinese-informal":
            return 42;
          case "tamil":
            return 43;
          case "telugu":
            return 44;
          case "thai":
            return 45;
          case "tibetan":
            return 46;
          case "trad-chinese-formal":
            return 47;
          case "trad-chinese-informal":
            return 48;
          case "upper-armenian":
            return 49;
          case "disclosure-open":
            return 50;
          case "disclosure-closed":
            return 51;
          case "none":
          default:
            return -1;
        }
      },
    };
    var marginForSide = function (side) {
      return {
        name: "margin-" + side,
        initialValue: "0",
        prefix: false,
        type: 4,
      };
    };
    var marginTop = marginForSide("top");
    var marginRight = marginForSide("right");
    var marginBottom = marginForSide("bottom");
    var marginLeft = marginForSide("left");
    var overflow = {
      name: "overflow",
      initialValue: "visible",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return tokens.filter(isIdentToken).map(function (overflow) {
          switch (overflow.value) {
            case "hidden":
              return 1;
            case "scroll":
              return 2;
            case "clip":
              return 3;
            case "auto":
              return 4;
            case "visible":
            default:
              return 0;
          }
        });
      },
    };
    var overflowWrap = {
      name: "overflow-wrap",
      initialValue: "normal",
      prefix: false,
      type: 2,
      parse: function (_context, overflow) {
        switch (overflow) {
          case "break-word":
            return "break-word";
          case "normal":
          default:
            return "normal";
        }
      },
    };
    var paddingForSide = function (side) {
      return {
        name: "padding-" + side,
        initialValue: "0",
        prefix: false,
        type: 3,
        format: "length-percentage",
      };
    };
    var paddingTop = paddingForSide("top");
    var paddingRight = paddingForSide("right");
    var paddingBottom = paddingForSide("bottom");
    var paddingLeft = paddingForSide("left");
    var textAlign = {
      name: "text-align",
      initialValue: "left",
      prefix: false,
      type: 2,
      parse: function (_context, textAlign) {
        switch (textAlign) {
          case "right":
            return 2;
          case "center":
          case "justify":
            return 1;
          case "left":
          default:
            return 0;
        }
      },
    };
    var position = {
      name: "position",
      initialValue: "static",
      prefix: false,
      type: 2,
      parse: function (_context, position) {
        switch (position) {
          case "relative":
            return 1;
          case "absolute":
            return 2;
          case "fixed":
            return 3;
          case "sticky":
            return 4;
        }
        return 0;
      },
    };
    var textShadow = {
      name: "text-shadow",
      initialValue: "none",
      type: 1,
      prefix: false,
      parse: function (context, tokens) {
        if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
          return [];
        }
        return parseFunctionArgs(tokens).map(function (values) {
          var shadow = {
            color: COLORS.TRANSPARENT,
            offsetX: ZERO_LENGTH,
            offsetY: ZERO_LENGTH,
            blur: ZERO_LENGTH,
          };
          var c = 0;
          for (var i = 0; i < values.length; i++) {
            var token = values[i];
            if (isLength(token)) {
              if (c === 0) {
                shadow.offsetX = token;
              } else if (c === 1) {
                shadow.offsetY = token;
              } else {
                shadow.blur = token;
              }
              c++;
            } else {
              shadow.color = color$1.parse(context, token);
            }
          }
          return shadow;
        });
      },
    };
    var textTransform = {
      name: "text-transform",
      initialValue: "none",
      prefix: false,
      type: 2,
      parse: function (_context, textTransform) {
        switch (textTransform) {
          case "uppercase":
            return 2;
          case "lowercase":
            return 1;
          case "capitalize":
            return 3;
        }
        return 0;
      },
    };
    var transform$1 = {
      name: "transform",
      initialValue: "none",
      prefix: true,
      type: 0,
      parse: function (_context, token) {
        if (token.type === 20 && token.value === "none") {
          return null;
        }
        if (token.type === 18) {
          var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
          if (typeof transformFunction === "undefined") {
            throw new Error(
              'Attempting to parse an unsupported transform function "' +
                token.name +
                '"',
            );
          }
          return transformFunction(token.values);
        }
        return null;
      },
    };
    var matrix = function (args) {
      var values = args
        .filter(function (arg) {
          return arg.type === 17;
        })
        .map(function (arg) {
          return arg.number;
        });
      return values.length === 6 ? values : null;
    };

    var matrix3d = function (args) {
      var values = args
        .filter(function (arg) {
          return arg.type === 17;
        })
        .map(function (arg) {
          return arg.number;
        });
      var a1 = values[0],
        b1 = values[1];
      values[2];
      values[3];
      var a2 = values[4],
        b2 = values[5];
      values[6];
      values[7];
      values[8];
      values[9];
      values[10];
      values[11];
      var a4 = values[12],
        b4 = values[13];
      values[14];
      values[15];
      return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
    };
    var SUPPORTED_TRANSFORM_FUNCTIONS = {
      matrix: matrix,
      matrix3d: matrix3d,
    };
    var DEFAULT_VALUE = {
      type: 16,
      number: 50,
      flags: FLAG_INTEGER,
    };
    var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
    var transformOrigin = {
      name: "transform-origin",
      initialValue: "50% 50%",
      prefix: true,
      type: 1,
      parse: function (_context, tokens) {
        var origins = tokens.filter(isLengthPercentage);
        if (origins.length !== 2) {
          return DEFAULT;
        }
        return [origins[0], origins[1]];
      },
    };
    var visibility = {
      name: "visible",
      initialValue: "none",
      prefix: false,
      type: 2,
      parse: function (_context, visibility) {
        switch (visibility) {
          case "hidden":
            return 1;
          case "collapse":
            return 2;
          case "visible":
          default:
            return 0;
        }
      },
    };
    var WORD_BREAK;
    (function (WORD_BREAK) {
      WORD_BREAK["NORMAL"] = "normal";
      WORD_BREAK["BREAK_ALL"] = "break-all";
      WORD_BREAK["KEEP_ALL"] = "keep-all";
    })(WORD_BREAK || (WORD_BREAK = {}));
    var wordBreak = {
      name: "word-break",
      initialValue: "normal",
      prefix: false,
      type: 2,
      parse: function (_context, wordBreak) {
        switch (wordBreak) {
          case "break-all":
            return WORD_BREAK.BREAK_ALL;
          case "keep-all":
            return WORD_BREAK.KEEP_ALL;
          case "normal":
          default:
            return WORD_BREAK.NORMAL;
        }
      },
    };
    var zIndex = {
      name: "z-index",
      initialValue: "auto",
      prefix: false,
      type: 0,
      parse: function (_context, token) {
        if (token.type === 20) {
          return {
            auto: true,
            order: 0,
          };
        }
        if (isNumberToken(token)) {
          return {
            auto: false,
            order: token.number,
          };
        }
        throw new Error("Invalid z-index number parsed");
      },
    };
    var time = {
      name: "time",
      parse: function (_context, value) {
        if (value.type === 15) {
          switch (value.unit.toLowerCase()) {
            case "s":
              return 1000 * value.number;
            case "ms":
              return value.number;
          }
        }
        throw new Error("Unsupported time type");
      },
    };
    var opacity = {
      name: "opacity",
      initialValue: "1",
      type: 0,
      prefix: false,
      parse: function (_context, token) {
        if (isNumberToken(token)) {
          return token.number;
        }
        return 1;
      },
    };
    var textDecorationColor = {
      name: "text-decoration-color",
      initialValue: "transparent",
      prefix: false,
      type: 3,
      format: "color",
    };
    var textDecorationLine = {
      name: "text-decoration-line",
      initialValue: "none",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        return tokens
          .filter(isIdentToken)
          .map(function (token) {
            switch (token.value) {
              case "underline":
                return 1;
              case "overline":
                return 2;
              case "line-through":
                return 3;
              case "none":
                return 4;
            }
            return 0;
          })
          .filter(function (line) {
            return line !== 0;
          });
      },
    };
    var fontFamily = {
      name: "font-family",
      initialValue: "",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        var accumulator = [];
        var results = [];
        tokens.forEach(function (token) {
          switch (token.type) {
            case 20:
            case 0:
              accumulator.push(token.value);
              break;
            case 17:
              accumulator.push(token.number.toString());
              break;
            case 4:
              results.push(accumulator.join(" "));
              accumulator.length = 0;
              break;
          }
        });
        if (accumulator.length) {
          results.push(accumulator.join(" "));
        }
        return results.map(function (result) {
          return result.indexOf(" ") === -1 ? result : "'" + result + "'";
        });
      },
    };
    var fontSize = {
      name: "font-size",
      initialValue: "0",
      prefix: false,
      type: 3,
      format: "length",
    };
    var fontWeight = {
      name: "font-weight",
      initialValue: "normal",
      type: 0,
      prefix: false,
      parse: function (_context, token) {
        if (isNumberToken(token)) {
          return token.number;
        }
        if (isIdentToken(token)) {
          switch (token.value) {
            case "bold":
              return 700;
            case "normal":
            default:
              return 400;
          }
        }
        return 400;
      },
    };
    var fontVariant = {
      name: "font-variant",
      initialValue: "none",
      type: 1,
      prefix: false,
      parse: function (_context, tokens) {
        return tokens.filter(isIdentToken).map(function (token) {
          return token.value;
        });
      },
    };
    var fontStyle = {
      name: "font-style",
      initialValue: "normal",
      prefix: false,
      type: 2,
      parse: function (_context, overflow) {
        switch (overflow) {
          case "oblique":
            return "oblique";
          case "italic":
            return "italic";
          case "normal":
          default:
            return "normal";
        }
      },
    };
    var contains = function (bit, value) {
      return (bit & value) !== 0;
    };
    var content = {
      name: "content",
      initialValue: "none",
      type: 1,
      prefix: false,
      parse: function (_context, tokens) {
        if (tokens.length === 0) {
          return [];
        }
        var first = tokens[0];
        if (first.type === 20 && first.value === "none") {
          return [];
        }
        return tokens;
      },
    };
    var counterIncrement = {
      name: "counter-increment",
      initialValue: "none",
      prefix: true,
      type: 1,
      parse: function (_context, tokens) {
        if (tokens.length === 0) {
          return null;
        }
        var first = tokens[0];
        if (first.type === 20 && first.value === "none") {
          return null;
        }
        var increments = [];
        var filtered = tokens.filter(nonWhiteSpace);
        for (var i = 0; i < filtered.length; i++) {
          var counter = filtered[i];
          var next = filtered[i + 1];
          if (counter.type === 20) {
            var increment = next && isNumberToken(next) ? next.number : 1;
            increments.push({
              counter: counter.value,
              increment: increment,
            });
          }
        }
        return increments;
      },
    };
    var counterReset = {
      name: "counter-reset",
      initialValue: "none",
      prefix: true,
      type: 1,
      parse: function (_context, tokens) {
        if (tokens.length === 0) {
          return [];
        }
        var resets = [];
        var filtered = tokens.filter(nonWhiteSpace);
        for (var i = 0; i < filtered.length; i++) {
          var counter = filtered[i];
          var next = filtered[i + 1];
          if (isIdentToken(counter) && counter.value !== "none") {
            var reset = next && isNumberToken(next) ? next.number : 0;
            resets.push({
              counter: counter.value,
              reset: reset,
            });
          }
        }
        return resets;
      },
    };
    var duration = {
      name: "duration",
      initialValue: "0s",
      prefix: false,
      type: 1,
      parse: function (context, tokens) {
        return tokens.filter(isDimensionToken).map(function (token) {
          return time.parse(context, token);
        });
      },
    };
    var quotes = {
      name: "quotes",
      initialValue: "none",
      prefix: true,
      type: 1,
      parse: function (_context, tokens) {
        if (tokens.length === 0) {
          return null;
        }
        var first = tokens[0];
        if (first.type === 20 && first.value === "none") {
          return null;
        }
        var quotes = [];
        var filtered = tokens.filter(isStringToken);
        if (filtered.length % 2 !== 0) {
          return null;
        }
        for (var i = 0; i < filtered.length; i += 2) {
          var open_1 = filtered[i].value;
          var close_1 = filtered[i + 1].value;
          quotes.push({
            open: open_1,
            close: close_1,
          });
        }
        return quotes;
      },
    };
    var getQuote = function (quotes, depth, open) {
      if (!quotes) {
        return "";
      }
      var quote = quotes[Math.min(depth, quotes.length - 1)];
      if (!quote) {
        return "";
      }
      return open ? quote.open : quote.close;
    };
    var boxShadow = {
      name: "box-shadow",
      initialValue: "none",
      type: 1,
      prefix: false,
      parse: function (context, tokens) {
        if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
          return [];
        }
        return parseFunctionArgs(tokens).map(function (values) {
          var shadow = {
            color: 0x000000ff,
            offsetX: ZERO_LENGTH,
            offsetY: ZERO_LENGTH,
            blur: ZERO_LENGTH,
            spread: ZERO_LENGTH,
            inset: false,
          };
          var c = 0;
          for (var i = 0; i < values.length; i++) {
            var token = values[i];
            if (isIdentWithValue(token, "inset")) {
              shadow.inset = true;
            } else if (isLength(token)) {
              if (c === 0) {
                shadow.offsetX = token;
              } else if (c === 1) {
                shadow.offsetY = token;
              } else if (c === 2) {
                shadow.blur = token;
              } else {
                shadow.spread = token;
              }
              c++;
            } else {
              shadow.color = color$1.parse(context, token);
            }
          }
          return shadow;
        });
      },
    };
    var paintOrder = {
      name: "paint-order",
      initialValue: "normal",
      prefix: false,
      type: 1,
      parse: function (_context, tokens) {
        var DEFAULT_VALUE = [0, 1, 2];
        var layers = [];
        tokens.filter(isIdentToken).forEach(function (token) {
          switch (token.value) {
            case "stroke":
              layers.push(1);
              break;
            case "fill":
              layers.push(0);
              break;
            case "markers":
              layers.push(2);
              break;
          }
        });
        DEFAULT_VALUE.forEach(function (value) {
          if (layers.indexOf(value) === -1) {
            layers.push(value);
          }
        });
        return layers;
      },
    };
    var webkitTextStrokeColor = {
      name: "-webkit-text-stroke-color",
      initialValue: "currentcolor",
      prefix: false,
      type: 3,
      format: "color",
    };
    var webkitTextStrokeWidth = {
      name: "-webkit-text-stroke-width",
      initialValue: "0",
      type: 0,
      prefix: false,
      parse: function (_context, token) {
        if (isDimensionToken(token)) {
          return token.number;
        }
        return 0;
      },
    };
    var CSSParsedDeclaration = (function () {
      function CSSParsedDeclaration(context, declaration) {
        var _a, _b;
        this.animationDuration = parse(
          context,
          duration,
          declaration.animationDuration,
        );
        this.backgroundClip = parse(
          context,
          backgroundClip,
          declaration.backgroundClip,
        );
        this.backgroundColor = parse(
          context,
          backgroundColor,
          declaration.backgroundColor,
        );
        this.backgroundImage = parse(
          context,
          backgroundImage,
          declaration.backgroundImage,
        );
        this.backgroundOrigin = parse(
          context,
          backgroundOrigin,
          declaration.backgroundOrigin,
        );
        this.backgroundPosition = parse(
          context,
          backgroundPosition,
          declaration.backgroundPosition,
        );
        this.backgroundRepeat = parse(
          context,
          backgroundRepeat,
          declaration.backgroundRepeat,
        );
        this.backgroundSize = parse(
          context,
          backgroundSize,
          declaration.backgroundSize,
        );
        this.borderTopColor = parse(
          context,
          borderTopColor,
          declaration.borderTopColor,
        );
        this.borderRightColor = parse(
          context,
          borderRightColor,
          declaration.borderRightColor,
        );
        this.borderBottomColor = parse(
          context,
          borderBottomColor,
          declaration.borderBottomColor,
        );
        this.borderLeftColor = parse(
          context,
          borderLeftColor,
          declaration.borderLeftColor,
        );
        this.borderTopLeftRadius = parse(
          context,
          borderTopLeftRadius,
          declaration.borderTopLeftRadius,
        );
        this.borderTopRightRadius = parse(
          context,
          borderTopRightRadius,
          declaration.borderTopRightRadius,
        );
        this.borderBottomRightRadius = parse(
          context,
          borderBottomRightRadius,
          declaration.borderBottomRightRadius,
        );
        this.borderBottomLeftRadius = parse(
          context,
          borderBottomLeftRadius,
          declaration.borderBottomLeftRadius,
        );
        this.borderTopStyle = parse(
          context,
          borderTopStyle,
          declaration.borderTopStyle,
        );
        this.borderRightStyle = parse(
          context,
          borderRightStyle,
          declaration.borderRightStyle,
        );
        this.borderBottomStyle = parse(
          context,
          borderBottomStyle,
          declaration.borderBottomStyle,
        );
        this.borderLeftStyle = parse(
          context,
          borderLeftStyle,
          declaration.borderLeftStyle,
        );
        this.borderTopWidth = parse(
          context,
          borderTopWidth,
          declaration.borderTopWidth,
        );
        this.borderRightWidth = parse(
          context,
          borderRightWidth,
          declaration.borderRightWidth,
        );
        this.borderBottomWidth = parse(
          context,
          borderBottomWidth,
          declaration.borderBottomWidth,
        );
        this.borderLeftWidth = parse(
          context,
          borderLeftWidth,
          declaration.borderLeftWidth,
        );
        this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
        this.color = parse(context, color, declaration.color);
        this.direction = parse(context, direction, declaration.direction);
        this.display = parse(context, display, declaration.display);
        this.float = parse(context, float, declaration.cssFloat);
        this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
        this.fontSize = parse(context, fontSize, declaration.fontSize);
        this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
        this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
        this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
        this.letterSpacing = parse(
          context,
          letterSpacing,
          declaration.letterSpacing,
        );
        this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
        this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
        this.listStyleImage = parse(
          context,
          listStyleImage,
          declaration.listStyleImage,
        );
        this.listStylePosition = parse(
          context,
          listStylePosition,
          declaration.listStylePosition,
        );
        this.listStyleType = parse(
          context,
          listStyleType,
          declaration.listStyleType,
        );
        this.marginTop = parse(context, marginTop, declaration.marginTop);
        this.marginRight = parse(context, marginRight, declaration.marginRight);
        this.marginBottom = parse(
          context,
          marginBottom,
          declaration.marginBottom,
        );
        this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
        this.opacity = parse(context, opacity, declaration.opacity);
        var overflowTuple = parse(context, overflow, declaration.overflow);
        this.overflowX = overflowTuple[0];
        this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
        this.overflowWrap = parse(
          context,
          overflowWrap,
          declaration.overflowWrap,
        );
        this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
        this.paddingRight = parse(
          context,
          paddingRight,
          declaration.paddingRight,
        );
        this.paddingBottom = parse(
          context,
          paddingBottom,
          declaration.paddingBottom,
        );
        this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
        this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
        this.position = parse(context, position, declaration.position);
        this.textAlign = parse(context, textAlign, declaration.textAlign);
        this.textDecorationColor = parse(
          context,
          textDecorationColor,
          (_a = declaration.textDecorationColor) !== null && _a !== void 0
            ? _a
            : declaration.color,
        );
        this.textDecorationLine = parse(
          context,
          textDecorationLine,
          (_b = declaration.textDecorationLine) !== null && _b !== void 0
            ? _b
            : declaration.textDecoration,
        );
        this.textShadow = parse(context, textShadow, declaration.textShadow);
        this.textTransform = parse(
          context,
          textTransform,
          declaration.textTransform,
        );
        this.transform = parse(context, transform$1, declaration.transform);
        this.transformOrigin = parse(
          context,
          transformOrigin,
          declaration.transformOrigin,
        );
        this.visibility = parse(context, visibility, declaration.visibility);
        this.webkitTextStrokeColor = parse(
          context,
          webkitTextStrokeColor,
          declaration.webkitTextStrokeColor,
        );
        this.webkitTextStrokeWidth = parse(
          context,
          webkitTextStrokeWidth,
          declaration.webkitTextStrokeWidth,
        );
        this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
        this.zIndex = parse(context, zIndex, declaration.zIndex);
      }
      CSSParsedDeclaration.prototype.isVisible = function () {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0;
      };
      CSSParsedDeclaration.prototype.isTransparent = function () {
        return isTransparent(this.backgroundColor);
      };
      CSSParsedDeclaration.prototype.isTransformed = function () {
        return this.transform !== null;
      };
      CSSParsedDeclaration.prototype.isPositioned = function () {
        return this.position !== 0;
      };
      CSSParsedDeclaration.prototype.isPositionedWithZIndex = function () {
        return this.isPositioned() && !this.zIndex.auto;
      };
      CSSParsedDeclaration.prototype.isFloating = function () {
        return this.float !== 0;
      };
      CSSParsedDeclaration.prototype.isInlineLevel = function () {
        return (
          contains(this.display, 4) ||
          contains(this.display, 33554432) ||
          contains(this.display, 268435456) ||
          contains(this.display, 536870912) ||
          contains(this.display, 67108864) ||
          contains(this.display, 134217728)
        );
      };
      return CSSParsedDeclaration;
    })();
    var CSSParsedPseudoDeclaration = (function () {
      function CSSParsedPseudoDeclaration(context, declaration) {
        this.content = parse(context, content, declaration.content);
        this.quotes = parse(context, quotes, declaration.quotes);
      }
      return CSSParsedPseudoDeclaration;
    })();
    var CSSParsedCounterDeclaration = (function () {
      function CSSParsedCounterDeclaration(context, declaration) {
        this.counterIncrement = parse(
          context,
          counterIncrement,
          declaration.counterIncrement,
        );
        this.counterReset = parse(
          context,
          counterReset,
          declaration.counterReset,
        );
      }
      return CSSParsedCounterDeclaration;
    })();

    var parse = function (context, descriptor, style) {
      var tokenizer = new Tokenizer();
      var value =
        style !== null && typeof style !== "undefined"
          ? style.toString()
          : descriptor.initialValue;
      tokenizer.write(value);
      var parser = new Parser(tokenizer.read());
      switch (descriptor.type) {
        case 2:
          var token = parser.parseComponentValue();
          return descriptor.parse(
            context,
            isIdentToken(token) ? token.value : descriptor.initialValue,
          );
        case 0:
          return descriptor.parse(context, parser.parseComponentValue());
        case 1:
          return descriptor.parse(context, parser.parseComponentValues());
        case 4:
          return parser.parseComponentValue();
        case 3:
          switch (descriptor.format) {
            case "angle":
              return angle.parse(context, parser.parseComponentValue());
            case "color":
              return color$1.parse(context, parser.parseComponentValue());
            case "image":
              return image.parse(context, parser.parseComponentValue());
            case "length":
              var length_1 = parser.parseComponentValue();
              return isLength(length_1) ? length_1 : ZERO_LENGTH;
            case "length-percentage":
              var value_1 = parser.parseComponentValue();
              return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
            case "time":
              return time.parse(context, parser.parseComponentValue());
          }
          break;
      }
    };
    var elementDebuggerAttribute = "data-html2canvas-debug";
    var getElementDebugType = function (element) {
      var attribute = element.getAttribute(elementDebuggerAttribute);
      switch (attribute) {
        case "all":
          return 1;
        case "clone":
          return 2;
        case "parse":
          return 3;
        case "render":
          return 4;
        default:
          return 0;
      }
    };
    var isDebugging = function (element, type) {
      var elementType = getElementDebugType(element);
      return elementType === 1 || type === elementType;
    };
    var ElementContainer = (function () {
      function ElementContainer(context, element) {
        this.context = context;
        this.textNodes = [];
        this.elements = [];
        this.flags = 0;
        if (isDebugging(element, 3)) {
          debugger;
        }
        this.styles = new CSSParsedDeclaration(
          context,
          window.getComputedStyle(element, null),
        );
        if (isHTMLElementNode(element)) {
          if (
            this.styles.animationDuration.some(function (duration) {
              return duration > 0;
            })
          ) {
            element.style.animationDuration = "0s";
          }
          if (this.styles.transform !== null) {
            element.style.transform = "none";
          }
        }
        this.bounds = parseBounds(this.context, element);
        if (isDebugging(element, 4)) {
          this.flags |= 16;
        }
      }
      return ElementContainer;
    })();

    var base64 =
      "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=";

    var chars$1 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
    for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
      lookup$1[chars$1.charCodeAt(i$1)] = i$1;
    }
    var decode = function (base64) {
      var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;
      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      var buffer =
        typeof ArrayBuffer !== "undefined" &&
        typeof Uint8Array !== "undefined" &&
        typeof Uint8Array.prototype.slice !== "undefined"
          ? new ArrayBuffer(bufferLength)
          : new Array(bufferLength);
      var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
      for (i = 0; i < len; i += 4) {
        encoded1 = lookup$1[base64.charCodeAt(i)];
        encoded2 = lookup$1[base64.charCodeAt(i + 1)];
        encoded3 = lookup$1[base64.charCodeAt(i + 2)];
        encoded4 = lookup$1[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return buffer;
    };
    var polyUint16Array = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 2) {
        bytes.push((buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
    };
    var polyUint32Array = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 4) {
        bytes.push(
          (buffer[i + 3] << 24) |
            (buffer[i + 2] << 16) |
            (buffer[i + 1] << 8) |
            buffer[i],
        );
      }
      return bytes;
    };
    var UTRIE2_SHIFT_2 = 5;
    var UTRIE2_SHIFT_1 = 6 + 5;

    var UTRIE2_INDEX_SHIFT = 2;

    var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;

    var UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;
    var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
    var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
    var UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
    var UTRIE2_INDEX_2_BMP_LENGTH =
      UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;

    var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
    var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6;

    var UTRIE2_INDEX_1_OFFSET =
      UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;

    var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;
    var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
    var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
    var slice16 = function (view, start, end) {
      if (view.slice) {
        return view.slice(start, end);
      }
      return new Uint16Array(Array.prototype.slice.call(view, start, end));
    };
    var slice32 = function (view, start, end) {
      if (view.slice) {
        return view.slice(start, end);
      }
      return new Uint32Array(Array.prototype.slice.call(view, start, end));
    };
    var createTrieFromBase64 = function (base64, _byteLength) {
      var buffer = decode(base64);
      var view32 = Array.isArray(buffer)
        ? polyUint32Array(buffer)
        : new Uint32Array(buffer);
      var view16 = Array.isArray(buffer)
        ? polyUint16Array(buffer)
        : new Uint16Array(buffer);
      var headerLength = 24;
      var index = slice16(view16, headerLength / 2, view32[4] / 2);
      var data =
        view32[5] === 2
          ? slice16(view16, (headerLength + view32[4]) / 2)
          : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
      return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
    };
    var Trie = (function () {
      function Trie(
        initialValue,
        errorValue,
        highStart,
        highValueIndex,
        index,
        data,
      ) {
        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
      }

      Trie.prototype.get = function (codePoint) {
        var ix;
        if (codePoint >= 0) {
          if (
            codePoint < 0x0d800 ||
            (codePoint > 0x0dbff && codePoint <= 0x0ffff)
          ) {
            ix = this.index[codePoint >> UTRIE2_SHIFT_2];
            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
            return this.data[ix];
          }
          if (codePoint <= 0xffff) {
            ix =
              this.index[
                UTRIE2_LSCP_INDEX_2_OFFSET +
                  ((codePoint - 0xd800) >> UTRIE2_SHIFT_2)
              ];
            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
            return this.data[ix];
          }
          if (codePoint < this.highStart) {
            ix =
              UTRIE2_INDEX_1_OFFSET -
              UTRIE2_OMITTED_BMP_INDEX_1_LENGTH +
              (codePoint >> UTRIE2_SHIFT_1);
            ix = this.index[ix];
            ix += (codePoint >> UTRIE2_SHIFT_2) & UTRIE2_INDEX_2_MASK;
            ix = this.index[ix];
            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
            return this.data[ix];
          }
          if (codePoint <= 0x10ffff) {
            return this.data[this.highValueIndex];
          }
        }

        return this.errorValue;
      };
      return Trie;
    })();

    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }
    var Prepend = 1;
    var CR = 2;
    var LF = 3;
    var Control = 4;
    var Extend = 5;
    var SpacingMark = 7;
    var L = 8;
    var V = 9;
    var T = 10;
    var LV = 11;
    var LVT = 12;
    var ZWJ = 13;
    var Extended_Pictographic = 14;
    var RI = 15;
    var toCodePoints = function (str) {
      var codePoints = [];
      var i = 0;
      var length = str.length;
      while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
          var extra = str.charCodeAt(i++);
          if ((extra & 0xfc00) === 0xdc00) {
            codePoints.push(
              ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000,
            );
          } else {
            codePoints.push(value);
            i--;
          }
        } else {
          codePoints.push(value);
        }
      }
      return codePoints;
    };
    var fromCodePoint = function () {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
      }
      if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, codePoints);
      }
      var length = codePoints.length;
      if (!length) {
        return "";
      }
      var codeUnits = [];
      var index = -1;
      var result = "";
      while (++index < length) {
        var codePoint = codePoints[index];
        if (codePoint <= 0xffff) {
          codeUnits.push(codePoint);
        } else {
          codePoint -= 0x10000;
          codeUnits.push(
            (codePoint >> 10) + 0xd800,
            (codePoint % 0x400) + 0xdc00,
          );
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
          result += String.fromCharCode.apply(String, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    var UnicodeTrie = createTrieFromBase64(base64);
    var BREAK_NOT_ALLOWED = "×";
    var BREAK_ALLOWED = "÷";
    var codePointToClass = function (codePoint) {
      return UnicodeTrie.get(codePoint);
    };
    var _graphemeBreakAtIndex = function (_codePoints, classTypes, index) {
      var prevIndex = index - 2;
      var prev = classTypes[prevIndex];
      var current = classTypes[index - 1];
      var next = classTypes[index];

      if (current === CR && next === LF) {
        return BREAK_NOT_ALLOWED;
      }

      if (current === CR || current === LF || current === Control) {
        return BREAK_ALLOWED;
      }

      if (next === CR || next === LF || next === Control) {
        return BREAK_ALLOWED;
      }

      if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
      }

      if ((current === LV || current === V) && (next === V || next === T)) {
        return BREAK_NOT_ALLOWED;
      }

      if ((current === LVT || current === T) && next === T) {
        return BREAK_NOT_ALLOWED;
      }

      if (next === ZWJ || next === Extend) {
        return BREAK_NOT_ALLOWED;
      }

      if (next === SpacingMark) {
        return BREAK_NOT_ALLOWED;
      }

      if (current === Prepend) {
        return BREAK_NOT_ALLOWED;
      }

      if (current === ZWJ && next === Extended_Pictographic) {
        while (prev === Extend) {
          prev = classTypes[--prevIndex];
        }
        if (prev === Extended_Pictographic) {
          return BREAK_NOT_ALLOWED;
        }
      }

      if (current === RI && next === RI) {
        var countRI = 0;
        while (prev === RI) {
          countRI++;
          prev = classTypes[--prevIndex];
        }
        if (countRI % 2 === 0) {
          return BREAK_NOT_ALLOWED;
        }
      }
      return BREAK_ALLOWED;
    };
    var GraphemeBreaker = function (str) {
      var codePoints = toCodePoints(str);
      var length = codePoints.length;
      var index = 0;
      var lastEnd = 0;
      var classTypes = codePoints.map(codePointToClass);
      return {
        next: function () {
          if (index >= length) {
            return {
              done: true,
              value: null,
            };
          }
          var graphemeBreak = BREAK_NOT_ALLOWED;
          while (
            index < length &&
            (graphemeBreak = _graphemeBreakAtIndex(
              codePoints,
              classTypes,
              ++index,
            )) === BREAK_NOT_ALLOWED
          ) {}
          if (graphemeBreak !== BREAK_NOT_ALLOWED || index === length) {
            var value = fromCodePoint.apply(
              null,
              codePoints.slice(lastEnd, index),
            );
            lastEnd = index;
            return {
              value: value,
              done: false,
            };
          }
          return {
            done: true,
            value: null,
          };
        },
      };
    };
    var splitGraphemes = function (str) {
      var breaker = GraphemeBreaker(str);
      var graphemes = [];
      var bk;
      while (!(bk = breaker.next()).done) {
        if (bk.value) {
          graphemes.push(bk.value.slice());
        }
      }
      return graphemes;
    };
    var testRangeBounds = function (document1) {
      var TEST_HEIGHT = 123;
      if (document1.createRange) {
        var range = document1.createRange();
        if (range.getBoundingClientRect) {
          var testElement = document1.createElement("boundtest");
          testElement.style.height = TEST_HEIGHT + "px";
          testElement.style.display = "block";
          document1.body.appendChild(testElement);
          range.selectNode(testElement);
          var rangeBounds = range.getBoundingClientRect();
          var rangeHeight = Math.round(rangeBounds.height);
          document1.body.removeChild(testElement);
          if (rangeHeight === TEST_HEIGHT) {
            return true;
          }
        }
      }
      return false;
    };
    var testIOSLineBreak = function (document1) {
      var testElement = document1.createElement("boundtest");
      testElement.style.width = "50px";
      testElement.style.display = "block";
      testElement.style.fontSize = "12px";
      testElement.style.letterSpacing = "0px";
      testElement.style.wordSpacing = "0px";
      document1.body.appendChild(testElement);
      var range = document1.createRange();
      testElement.innerHTML =
        typeof "".repeat === "function" ? "&#128104;".repeat(10) : "";
      var node = testElement.firstChild;
      var textList = toCodePoints$1(node.data).map(function (i) {
        return fromCodePoint$1(i);
      });
      var offset = 0;
      var prev = {};

      var supports = textList.every(function (text, i) {
        range.setStart(node, offset);
        range.setEnd(node, offset + text.length);
        var rect = range.getBoundingClientRect();
        offset += text.length;
        var boundAhead = rect.x > prev.x || rect.y > prev.y;
        prev = rect;
        if (i === 0) {
          return true;
        }
        return boundAhead;
      });
      document1.body.removeChild(testElement);
      return supports;
    };
    var testCORS = function () {
      return typeof new Image().crossOrigin !== "undefined";
    };
    var testResponseType = function () {
      return typeof new XMLHttpRequest().responseType === "string";
    };
    var testSVG = function (document1) {
      var img = new Image();
      var canvas = document1.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (!ctx) {
        return false;
      }
      img.src =
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
      try {
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL();
      } catch (e) {
        return false;
      }
      return true;
    };
    var isGreenPixel = function (data) {
      return (
        data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255
      );
    };
    var testForeignObject = function (document1) {
      var canvas = document1.createElement("canvas");
      var size = 100;
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext("2d");
      if (!ctx) {
        return Promise.reject(false);
      }
      ctx.fillStyle = "rgb(0, 255, 0)";
      ctx.fillRect(0, 0, size, size);
      var img = new Image();
      var greenImageSrc = canvas.toDataURL();
      img.src = greenImageSrc;
      var svg = createForeignObjectSVG(size, size, 0, 0, img);
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, size, size);
      return loadSerializedSVG$1(svg)
        .then(function (img) {
          ctx.drawImage(img, 0, 0);
          var data = ctx.getImageData(0, 0, size, size).data;
          ctx.fillStyle = "red";
          ctx.fillRect(0, 0, size, size);
          var node = document1.createElement("div");
          node.style.backgroundImage = "url(" + greenImageSrc + ")";
          node.style.height = size + "px";

          return isGreenPixel(data)
            ? loadSerializedSVG$1(
                createForeignObjectSVG(size, size, 0, 0, node),
              )
            : Promise.reject(false);
        })
        .then(function (img) {
          ctx.drawImage(img, 0, 0);

          return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
        })
        .catch(function () {
          return false;
        });
    };
    var createForeignObjectSVG = function (width, height, x, y, node) {
      var xmlns = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(xmlns, "svg");
      var foreignObject = document.createElementNS(xmlns, "foreignObject");
      svg.setAttributeNS(null, "width", width.toString());
      svg.setAttributeNS(null, "height", height.toString());
      foreignObject.setAttributeNS(null, "width", "100%");
      foreignObject.setAttributeNS(null, "height", "100%");
      foreignObject.setAttributeNS(null, "x", x.toString());
      foreignObject.setAttributeNS(null, "y", y.toString());
      foreignObject.setAttributeNS(null, "externalResourcesRequired", "true");
      svg.appendChild(foreignObject);
      foreignObject.appendChild(node);
      return svg;
    };
    var loadSerializedSVG$1 = function (svg) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          return resolve(img);
        };
        img.onerror = reject;
        img.src =
          "data:image/svg+xml;charset=utf-8," +
          encodeURIComponent(new XMLSerializer().serializeToString(svg));
      });
    };
    var FEATURES = {
      get SUPPORT_RANGE_BOUNDS() {
        var value = testRangeBounds(document);
        Object.defineProperty(FEATURES, "SUPPORT_RANGE_BOUNDS", {
          value: value,
        });
        return value;
      },
      get SUPPORT_WORD_BREAKING() {
        var value1 =
          FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
        Object.defineProperty(FEATURES, "SUPPORT_WORD_BREAKING", {
          value: value1,
        });
        return value1;
      },
      get SUPPORT_SVG_DRAWING() {
        var value2 = testSVG(document);
        Object.defineProperty(FEATURES, "SUPPORT_SVG_DRAWING", {
          value: value2,
        });
        return value2;
      },
      get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var value3 =
          typeof Array.from === "function" && typeof window.fetch === "function"
            ? testForeignObject(document)
            : Promise.resolve(false);
        Object.defineProperty(FEATURES, "SUPPORT_FOREIGNOBJECT_DRAWING", {
          value: value3,
        });
        return value3;
      },
      get SUPPORT_CORS_IMAGES() {
        var value4 = testCORS();
        Object.defineProperty(FEATURES, "SUPPORT_CORS_IMAGES", {
          value: value4,
        });
        return value4;
      },
      get SUPPORT_RESPONSE_TYPE() {
        var value5 = testResponseType();
        Object.defineProperty(FEATURES, "SUPPORT_RESPONSE_TYPE", {
          value: value5,
        });
        return value5;
      },
      get SUPPORT_CORS_XHR() {
        var value6 = "withCredentials" in new XMLHttpRequest();
        Object.defineProperty(FEATURES, "SUPPORT_CORS_XHR", {
          value: value6,
        });
        return value6;
      },
      get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
        var value7 = !!(typeof Intl !== "undefined" && Intl.Segmenter);
        Object.defineProperty(FEATURES, "SUPPORT_NATIVE_TEXT_SEGMENTATION", {
          value: value7,
        });
        return value7;
      },
    };
    var TextBounds = (function () {
      function TextBounds(text, bounds) {
        this.text = text;
        this.bounds = bounds;
      }
      return TextBounds;
    })();
    var parseTextBounds = function (context, value, styles, node) {
      var textList = breakText(value, styles);
      var textBounds = [];
      var offset = 0;
      textList.forEach(function (text) {
        if (styles.textDecorationLine.length || text.trim().length > 0) {
          if (FEATURES.SUPPORT_RANGE_BOUNDS) {
            var clientRects = createRange(
              node,
              offset,
              text.length,
            ).getClientRects();
            if (clientRects.length > 1) {
              var subSegments = segmentGraphemes(text);
              var subOffset_1 = 0;
              subSegments.forEach(function (subSegment) {
                textBounds.push(
                  new TextBounds(
                    subSegment,
                    Bounds.fromDOMRectList(
                      context,
                      createRange(
                        node,
                        subOffset_1 + offset,
                        subSegment.length,
                      ).getClientRects(),
                    ),
                  ),
                );
                subOffset_1 += subSegment.length;
              });
            } else {
              textBounds.push(
                new TextBounds(
                  text,
                  Bounds.fromDOMRectList(context, clientRects),
                ),
              );
            }
          } else {
            var replacementNode = node.splitText(text.length);
            textBounds.push(
              new TextBounds(text, getWrapperBounds(context, node)),
            );
            node = replacementNode;
          }
        } else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
          node = node.splitText(text.length);
        }
        offset += text.length;
      });
      return textBounds;
    };
    var getWrapperBounds = function (context, node) {
      var ownerDocument = node.ownerDocument;
      if (ownerDocument) {
        var wrapper = ownerDocument.createElement("html2canvaswrapper");
        wrapper.appendChild(node.cloneNode(true));
        var parentNode = node.parentNode;
        if (parentNode) {
          parentNode.replaceChild(wrapper, node);
          var bounds = parseBounds(context, wrapper);
          if (wrapper.firstChild) {
            parentNode.replaceChild(wrapper.firstChild, wrapper);
          }
          return bounds;
        }
      }
      return Bounds.EMPTY;
    };
    var createRange = function (node, offset, length) {
      var ownerDocument = node.ownerDocument;
      if (!ownerDocument) {
        throw new Error("Node has no owner document");
      }
      var range = ownerDocument.createRange();
      range.setStart(node, offset);
      range.setEnd(node, offset + length);
      return range;
    };
    var segmentGraphemes = function (value) {
      if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var segmenter = new Intl.Segmenter(void 0, {
          granularity: "grapheme",
        });

        return Array.from(segmenter.segment(value)).map(function (segment) {
          return segment.segment;
        });
      }
      return splitGraphemes(value);
    };
    var segmentWords = function (value, styles) {
      if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var segmenter = new Intl.Segmenter(void 0, {
          granularity: "word",
        });

        return Array.from(segmenter.segment(value)).map(function (segment) {
          return segment.segment;
        });
      }
      return breakWords(value, styles);
    };
    var breakText = function (value, styles) {
      return styles.letterSpacing !== 0
        ? segmentGraphemes(value)
        : segmentWords(value, styles);
    };

    var wordSeparators = [
      0x0020, 0x00a0, 0x1361, 0x10100, 0x10101, 0x1039, 0x1091,
    ];
    var breakWords = function (str, styles) {
      var breaker = LineBreaker(str, {
        lineBreak: styles.lineBreak,
        wordBreak:
          styles.overflowWrap === "break-word"
            ? "break-word"
            : styles.wordBreak,
      });
      var words = [];
      var bk;
      var _loop_1 = function () {
        if (bk.value) {
          var value = bk.value.slice();
          var codePoints = toCodePoints$1(value);
          var word_1 = "";
          codePoints.forEach(function (codePoint) {
            if (wordSeparators.indexOf(codePoint) === -1) {
              word_1 += fromCodePoint$1(codePoint);
            } else {
              if (word_1.length) {
                words.push(word_1);
              }
              words.push(fromCodePoint$1(codePoint));
              word_1 = "";
            }
          });
          if (word_1.length) {
            words.push(word_1);
          }
        }
      };
      while (!(bk = breaker.next()).done) {
        _loop_1();
      }
      return words;
    };
    var TextContainer = (function () {
      function TextContainer(context, node, styles) {
        this.text = transform(node.data, styles.textTransform);
        this.textBounds = parseTextBounds(context, this.text, styles, node);
      }
      return TextContainer;
    })();
    var transform = function (text, transform) {
      switch (transform) {
        case 1:
          return text.toLowerCase();
        case 3:
          return text.replace(CAPITALIZE, capitalize);
        case 2:
          return text.toUpperCase();
        default:
          return text;
      }
    };
    var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
    var capitalize = function (m, p1, p2) {
      if (m.length > 0) {
        return p1 + p2.toUpperCase();
      }
      return m;
    };
    var ImageElementContainer = (function (_super) {
      __extends(ImageElementContainer, _super);
      function ImageElementContainer(context, img) {
        var _this = _super.call(this, context, img) || this;
        _this.src = img.currentSrc || img.src;
        _this.intrinsicWidth = img.naturalWidth;
        _this.intrinsicHeight = img.naturalHeight;
        _this.context.cache.addImage(_this.src);
        return _this;
      }
      return ImageElementContainer;
    })(ElementContainer);
    var CanvasElementContainer = (function (_super) {
      __extends(CanvasElementContainer, _super);
      function CanvasElementContainer(context, canvas) {
        var _this = _super.call(this, context, canvas) || this;
        _this.canvas = canvas;
        _this.intrinsicWidth = canvas.width;
        _this.intrinsicHeight = canvas.height;
        return _this;
      }
      return CanvasElementContainer;
    })(ElementContainer);
    var SVGElementContainer = (function (_super) {
      __extends(SVGElementContainer, _super);
      function SVGElementContainer(context, img) {
        var _this = _super.call(this, context, img) || this;
        var s = new XMLSerializer();
        var bounds = parseBounds(context, img);
        img.setAttribute("width", bounds.width + "px");
        img.setAttribute("height", bounds.height + "px");
        _this.svg =
          "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
        _this.intrinsicWidth = img.width.baseVal.value;
        _this.intrinsicHeight = img.height.baseVal.value;
        _this.context.cache.addImage(_this.svg);
        return _this;
      }
      return SVGElementContainer;
    })(ElementContainer);
    var LIElementContainer = (function (_super) {
      __extends(LIElementContainer, _super);
      function LIElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.value = element.value;
        return _this;
      }
      return LIElementContainer;
    })(ElementContainer);
    var OLElementContainer = (function (_super) {
      __extends(OLElementContainer, _super);
      function OLElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.start = element.start;
        _this.reversed =
          typeof element.reversed === "boolean" && element.reversed === true;
        return _this;
      }
      return OLElementContainer;
    })(ElementContainer);
    var CHECKBOX_BORDER_RADIUS = [
      {
        type: 15,
        flags: 0,
        unit: "px",
        number: 3,
      },
    ];
    var RADIO_BORDER_RADIUS = [
      {
        type: 16,
        flags: 0,
        number: 50,
      },
    ];
    var reformatInputBounds = function (bounds) {
      if (bounds.width > bounds.height) {
        return new Bounds(
          bounds.left + (bounds.width - bounds.height) / 2,
          bounds.top,
          bounds.height,
          bounds.height,
        );
      } else if (bounds.width < bounds.height) {
        return new Bounds(
          bounds.left,
          bounds.top + (bounds.height - bounds.width) / 2,
          bounds.width,
          bounds.width,
        );
      }
      return bounds;
    };
    var getInputValue = function (node) {
      var value =
        node.type === PASSWORD
          ? new Array(node.value.length + 1).join("\u2022")
          : node.value;
      return value.length === 0 ? node.placeholder || "" : value;
    };
    var CHECKBOX = "checkbox";
    var RADIO = "radio";
    var PASSWORD = "password";
    var INPUT_COLOR = 0x2a2a2aff;
    var InputElementContainer = (function (_super) {
      __extends(InputElementContainer, _super);
      function InputElementContainer(context, input) {
        var _this = _super.call(this, context, input) || this;
        _this.type = input.type.toLowerCase();
        _this.checked = input.checked;
        _this.value = getInputValue(input);
        if (_this.type === CHECKBOX || _this.type === RADIO) {
          _this.styles.backgroundColor = 0xdededeff;
          _this.styles.borderTopColor =
            _this.styles.borderRightColor =
            _this.styles.borderBottomColor =
            _this.styles.borderLeftColor =
              0xa5a5a5ff;
          _this.styles.borderTopWidth =
            _this.styles.borderRightWidth =
            _this.styles.borderBottomWidth =
            _this.styles.borderLeftWidth =
              1;
          _this.styles.borderTopStyle =
            _this.styles.borderRightStyle =
            _this.styles.borderBottomStyle =
            _this.styles.borderLeftStyle =
              1;
          _this.styles.backgroundClip = [0];
          _this.styles.backgroundOrigin = [0];
          _this.bounds = reformatInputBounds(_this.bounds);
        }
        switch (_this.type) {
          case CHECKBOX:
            _this.styles.borderTopRightRadius =
              _this.styles.borderTopLeftRadius =
              _this.styles.borderBottomRightRadius =
              _this.styles.borderBottomLeftRadius =
                CHECKBOX_BORDER_RADIUS;
            break;
          case RADIO:
            _this.styles.borderTopRightRadius =
              _this.styles.borderTopLeftRadius =
              _this.styles.borderBottomRightRadius =
              _this.styles.borderBottomLeftRadius =
                RADIO_BORDER_RADIUS;
            break;
        }
        return _this;
      }
      return InputElementContainer;
    })(ElementContainer);
    var SelectElementContainer = (function (_super) {
      __extends(SelectElementContainer, _super);
      function SelectElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        var option = element.options[element.selectedIndex || 0];
        _this.value = option ? option.text || "" : "";
        return _this;
      }
      return SelectElementContainer;
    })(ElementContainer);
    var TextareaElementContainer = (function (_super) {
      __extends(TextareaElementContainer, _super);
      function TextareaElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.value = element.value;
        return _this;
      }
      return TextareaElementContainer;
    })(ElementContainer);
    var IFrameElementContainer = (function (_super) {
      __extends(IFrameElementContainer, _super);
      function IFrameElementContainer(context, iframe) {
        var _this = _super.call(this, context, iframe) || this;
        _this.src = iframe.src;
        _this.width = parseInt(iframe.width, 10) || 0;
        _this.height = parseInt(iframe.height, 10) || 0;
        _this.backgroundColor = _this.styles.backgroundColor;
        try {
          if (
            iframe.contentWindow &&
            iframe.contentWindow.document &&
            iframe.contentWindow.document.documentElement
          ) {
            _this.tree = parseTree(
              context,
              iframe.contentWindow.document.documentElement,
            );

            var documentBackgroundColor = iframe.contentWindow.document
              .documentElement
              ? parseColor(
                  context,
                  getComputedStyle(
                    iframe.contentWindow.document.documentElement,
                  ).backgroundColor,
                )
              : COLORS.TRANSPARENT;
            var bodyBackgroundColor = iframe.contentWindow.document.body
              ? parseColor(
                  context,
                  getComputedStyle(iframe.contentWindow.document.body)
                    .backgroundColor,
                )
              : COLORS.TRANSPARENT;
            _this.backgroundColor = isTransparent(documentBackgroundColor)
              ? isTransparent(bodyBackgroundColor)
                ? _this.styles.backgroundColor
                : bodyBackgroundColor
              : documentBackgroundColor;
          }
        } catch (e) {}
        return _this;
      }
      return IFrameElementContainer;
    })(ElementContainer);
    var LIST_OWNERS = ["OL", "UL", "MENU"];
    var parseNodeTree = function (context, node, parent, root) {
      for (
        var childNode = node.firstChild, nextNode = void 0;
        childNode;
        childNode = nextNode
      ) {
        nextNode = childNode.nextSibling;
        if (isTextNode(childNode) && childNode.data.trim().length > 0) {
          parent.textNodes.push(
            new TextContainer(context, childNode, parent.styles),
          );
        } else if (isElementNode(childNode)) {
          if (isSlotElement(childNode) && childNode.assignedNodes) {
            childNode.assignedNodes().forEach(function (childNode) {
              return parseNodeTree(context, childNode, parent, root);
            });
          } else {
            var container = createContainer(context, childNode);
            if (container.styles.isVisible()) {
              if (createsRealStackingContext(childNode, container, root)) {
                container.flags |= 4;
              } else if (createsStackingContext(container.styles)) {
                container.flags |= 2;
              }
              if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                container.flags |= 8;
              }
              parent.elements.push(container);
              childNode.slot;
              if (childNode.shadowRoot) {
                parseNodeTree(context, childNode.shadowRoot, container, root);
              } else if (
                !isTextareaElement(childNode) &&
                !isSVGElement(childNode) &&
                !isSelectElement(childNode)
              ) {
                parseNodeTree(context, childNode, container, root);
              }
            }
          }
        }
      }
    };
    var createContainer = function (context, element) {
      if (isImageElement(element)) {
        return new ImageElementContainer(context, element);
      }
      if (isCanvasElement(element)) {
        return new CanvasElementContainer(context, element);
      }
      if (isSVGElement(element)) {
        return new SVGElementContainer(context, element);
      }
      if (isLIElement(element)) {
        return new LIElementContainer(context, element);
      }
      if (isOLElement(element)) {
        return new OLElementContainer(context, element);
      }
      if (isInputElement(element)) {
        return new InputElementContainer(context, element);
      }
      if (isSelectElement(element)) {
        return new SelectElementContainer(context, element);
      }
      if (isTextareaElement(element)) {
        return new TextareaElementContainer(context, element);
      }
      if (isIFrameElement(element)) {
        return new IFrameElementContainer(context, element);
      }
      return new ElementContainer(context, element);
    };
    var parseTree = function (context, element) {
      var container = createContainer(context, element);
      container.flags |= 4;
      parseNodeTree(context, element, container, container);
      return container;
    };
    var createsRealStackingContext = function (node, container, root) {
      return (
        container.styles.isPositionedWithZIndex() ||
        container.styles.opacity < 1 ||
        container.styles.isTransformed() ||
        (isBodyElement(node) && root.styles.isTransparent())
      );
    };
    var createsStackingContext = function (styles) {
      return styles.isPositioned() || styles.isFloating();
    };
    var isTextNode = function (node) {
      return node.nodeType === Node.TEXT_NODE;
    };
    var isElementNode = function (node) {
      return node.nodeType === Node.ELEMENT_NODE;
    };
    var isHTMLElementNode = function (node) {
      return (
        isElementNode(node) &&
        typeof node.style !== "undefined" &&
        !isSVGElementNode(node)
      );
    };
    var isSVGElementNode = function (element) {
      return typeof element.className === "object";
    };
    var isLIElement = function (node) {
      return node.tagName === "LI";
    };
    var isOLElement = function (node) {
      return node.tagName === "OL";
    };
    var isInputElement = function (node) {
      return node.tagName === "INPUT";
    };
    var isHTMLElement = function (node) {
      return node.tagName === "HTML";
    };
    var isSVGElement = function (node) {
      return node.tagName === "svg";
    };
    var isBodyElement = function (node) {
      return node.tagName === "BODY";
    };
    var isCanvasElement = function (node) {
      return node.tagName === "CANVAS";
    };
    var isVideoElement = function (node) {
      return node.tagName === "VIDEO";
    };
    var isImageElement = function (node) {
      return node.tagName === "IMG";
    };
    var isIFrameElement = function (node) {
      return node.tagName === "IFRAME";
    };
    var isStyleElement = function (node) {
      return node.tagName === "STYLE";
    };
    var isScriptElement = function (node) {
      return node.tagName === "SCRIPT";
    };
    var isTextareaElement = function (node) {
      return node.tagName === "TEXTAREA";
    };
    var isSelectElement = function (node) {
      return node.tagName === "SELECT";
    };
    var isSlotElement = function (node) {
      return node.tagName === "SLOT";
    };

    var isCustomElement = function (node) {
      return node.tagName.indexOf("-") > 0;
    };
    var CounterState = (function () {
      function CounterState() {
        this.counters = {};
      }
      CounterState.prototype.getCounterValue = function (name) {
        var counter = this.counters[name];
        if (counter && counter.length) {
          return counter[counter.length - 1];
        }
        return 1;
      };
      CounterState.prototype.getCounterValues = function (name) {
        var counter = this.counters[name];
        return counter ? counter : [];
      };
      CounterState.prototype.pop = function (counters) {
        var _this = this;
        counters.forEach(function (counter) {
          return _this.counters[counter].pop();
        });
      };
      CounterState.prototype.parse = function (style) {
        var _this = this;
        var counterIncrement = style.counterIncrement;
        var counterReset = style.counterReset;
        var canReset = true;
        if (counterIncrement !== null) {
          counterIncrement.forEach(function (entry) {
            var counter = _this.counters[entry.counter];
            if (counter && entry.increment !== 0) {
              canReset = false;
              if (!counter.length) {
                counter.push(1);
              }
              counter[Math.max(0, counter.length - 1)] += entry.increment;
            }
          });
        }
        var counterNames = [];
        if (canReset) {
          counterReset.forEach(function (entry) {
            var counter = _this.counters[entry.counter];
            counterNames.push(entry.counter);
            if (!counter) {
              counter = _this.counters[entry.counter] = [];
            }
            counter.push(entry.reset);
          });
        }
        return counterNames;
      };
      return CounterState;
    })();
    var ROMAN_UPPER = {
      integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
      values: [
        "M",
        "CM",
        "D",
        "CD",
        "C",
        "XC",
        "L",
        "XL",
        "X",
        "IX",
        "V",
        "IV",
        "I",
      ],
    };
    var ARMENIAN = {
      integers: [
        9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700,
        600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8,
        7, 6, 5, 4, 3, 2, 1,
      ],
      values: [
        "Ք",
        "Փ",
        "Ւ",
        "Ց",
        "Ր",
        "Տ",
        "Վ",
        "Ս",
        "Ռ",
        "Ջ",
        "Պ",
        "Չ",
        "Ո",
        "Շ",
        "Ն",
        "Յ",
        "Մ",
        "Ճ",
        "Ղ",
        "Ձ",
        "Հ",
        "Կ",
        "Ծ",
        "Խ",
        "Լ",
        "Ի",
        "Ժ",
        "Թ",
        "Ը",
        "Է",
        "Զ",
        "Ե",
        "Դ",
        "Գ",
        "Բ",
        "Ա",
      ],
    };
    var HEBREW = {
      integers: [
        10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 400, 300,
        200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8,
        7, 6, 5, 4, 3, 2, 1,
      ],
      values: [
        "י׳",
        "ט׳",
        "ח׳",
        "ז׳",
        "ו׳",
        "ה׳",
        "ד׳",
        "ג׳",
        "ב׳",
        "א׳",
        "ת",
        "ש",
        "ר",
        "ק",
        "צ",
        "פ",
        "ע",
        "ס",
        "נ",
        "מ",
        "ל",
        "כ",
        "יט",
        "יח",
        "יז",
        "טז",
        "טו",
        "י",
        "ט",
        "ח",
        "ז",
        "ו",
        "ה",
        "ד",
        "ג",
        "ב",
        "א",
      ],
    };
    var GEORGIAN = {
      integers: [
        10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800,
        700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10,
        9, 8, 7, 6, 5, 4, 3, 2, 1,
      ],
      values: [
        "ჵ",
        "ჰ",
        "ჯ",
        "ჴ",
        "ხ",
        "ჭ",
        "წ",
        "ძ",
        "ც",
        "ჩ",
        "შ",
        "ყ",
        "ღ",
        "ქ",
        "ფ",
        "ჳ",
        "ტ",
        "ს",
        "რ",
        "ჟ",
        "პ",
        "ო",
        "ჲ",
        "ნ",
        "მ",
        "ლ",
        "კ",
        "ი",
        "თ",
        "ჱ",
        "ზ",
        "ვ",
        "ე",
        "დ",
        "გ",
        "ბ",
        "ა",
      ],
    };
    var createAdditiveCounter = function (
      value,
      min,
      max,
      symbols,
      fallback,
      suffix,
    ) {
      if (value < min || value > max) {
        return createCounterText(value, fallback, suffix.length > 0);
      }
      return (
        symbols.integers.reduce(function (string, integer, index) {
          while (value >= integer) {
            value -= integer;
            string += symbols.values[index];
          }
          return string;
        }, "") + suffix
      );
    };
    var createCounterStyleWithSymbolResolver = function (
      value,
      codePointRangeLength,
      isNumeric,
      resolver,
    ) {
      var string = "";
      do {
        if (!isNumeric) {
          value--;
        }
        string = resolver(value) + string;
        value /= codePointRangeLength;
      } while (value * codePointRangeLength >= codePointRangeLength);
      return string;
    };
    var createCounterStyleFromRange = function (
      value,
      codePointRangeStart,
      codePointRangeEnd,
      isNumeric,
      suffix,
    ) {
      var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
      return (
        (value < 0 ? "-" : "") +
        (createCounterStyleWithSymbolResolver(
          Math.abs(value),
          codePointRangeLength,
          isNumeric,
          function (codePoint) {
            return fromCodePoint$1(
              Math.floor(codePoint % codePointRangeLength) +
                codePointRangeStart,
            );
          },
        ) +
          suffix)
      );
    };
    var createCounterStyleFromSymbols = function (value, symbols, suffix) {
      if (suffix === void 0) {
        suffix = ". ";
      }
      var codePointRangeLength = symbols.length;
      return (
        createCounterStyleWithSymbolResolver(
          Math.abs(value),
          codePointRangeLength,
          false,
          function (codePoint) {
            return symbols[Math.floor(codePoint % codePointRangeLength)];
          },
        ) + suffix
      );
    };
    var CJK_ZEROS = 1 << 0;
    var CJK_TEN_COEFFICIENTS = 1 << 1;
    var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
    var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
    var createCJKCounter = function (
      value,
      numbers,
      multipliers,
      negativeSign,
      suffix,
      flags,
    ) {
      if (value < -9999 || value > 9999) {
        return createCounterText(value, 4, suffix.length > 0);
      }
      var tmp = Math.abs(value);
      var string = suffix;
      if (tmp === 0) {
        return numbers[0] + string;
      }
      for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
        var coefficient = tmp % 10;
        if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== "") {
          string = numbers[coefficient] + string;
        } else if (
          coefficient > 1 ||
          (coefficient === 1 && digit === 0) ||
          (coefficient === 1 &&
            digit === 1 &&
            contains(flags, CJK_TEN_COEFFICIENTS)) ||
          (coefficient === 1 &&
            digit === 1 &&
            contains(flags, CJK_TEN_HIGH_COEFFICIENTS) &&
            value > 100) ||
          (coefficient === 1 &&
            digit > 1 &&
            contains(flags, CJK_HUNDRED_COEFFICIENTS))
        ) {
          string =
            numbers[coefficient] +
            (digit > 0 ? multipliers[digit - 1] : "") +
            string;
        } else if (coefficient === 1 && digit > 0) {
          string = multipliers[digit - 1] + string;
        }
        tmp = Math.floor(tmp / 10);
      }
      return (value < 0 ? negativeSign : "") + string;
    };
    var CHINESE_INFORMAL_MULTIPLIERS = "十百千萬";
    var CHINESE_FORMAL_MULTIPLIERS = "拾佰仟萬";
    var JAPANESE_NEGATIVE = "マイナス";
    var KOREAN_NEGATIVE = "마이너스";
    var createCounterText = function (value, type, appendSuffix) {
      var defaultSuffix = appendSuffix ? ". " : "";
      var cjkSuffix = appendSuffix ? "、" : "";
      var koreanSuffix = appendSuffix ? ", " : "";
      var spaceSuffix = appendSuffix ? " " : "";
      switch (type) {
        case 0:
          return "•" + spaceSuffix;
        case 1:
          return "◦" + spaceSuffix;
        case 2:
          return "◾" + spaceSuffix;
        case 5:
          var string = createCounterStyleFromRange(
            value,
            48,
            57,
            true,
            defaultSuffix,
          );
          return string.length < 4 ? "0" + string : string;
        case 4:
          return createCounterStyleFromSymbols(
            value,
            "〇一二三四五六七八九",
            cjkSuffix,
          );
        case 6:
          return createAdditiveCounter(
            value,
            1,
            3999,
            ROMAN_UPPER,
            3,
            defaultSuffix,
          ).toLowerCase();
        case 7:
          return createAdditiveCounter(
            value,
            1,
            3999,
            ROMAN_UPPER,
            3,
            defaultSuffix,
          );
        case 8:
          return createCounterStyleFromRange(
            value,
            945,
            969,
            false,
            defaultSuffix,
          );
        case 9:
          return createCounterStyleFromRange(
            value,
            97,
            122,
            false,
            defaultSuffix,
          );
        case 10:
          return createCounterStyleFromRange(
            value,
            65,
            90,
            false,
            defaultSuffix,
          );
        case 11:
          return createCounterStyleFromRange(
            value,
            1632,
            1641,
            true,
            defaultSuffix,
          );
        case 12:
        case 49:
          return createAdditiveCounter(
            value,
            1,
            9999,
            ARMENIAN,
            3,
            defaultSuffix,
          );
        case 35:
          return createAdditiveCounter(
            value,
            1,
            9999,
            ARMENIAN,
            3,
            defaultSuffix,
          ).toLowerCase();
        case 13:
          return createCounterStyleFromRange(
            value,
            2534,
            2543,
            true,
            defaultSuffix,
          );
        case 14:
        case 30:
          return createCounterStyleFromRange(
            value,
            6112,
            6121,
            true,
            defaultSuffix,
          );
        case 15:
          return createCounterStyleFromSymbols(
            value,
            "子丑寅卯辰巳午未申酉戌亥",
            cjkSuffix,
          );
        case 16:
          return createCounterStyleFromSymbols(
            value,
            "甲乙丙丁戊己庚辛壬癸",
            cjkSuffix,
          );
        case 17:
        case 48:
          return createCJKCounter(
            value,
            "零一二三四五六七八九",
            CHINESE_INFORMAL_MULTIPLIERS,
            "負",
            cjkSuffix,
            CJK_TEN_COEFFICIENTS |
              CJK_TEN_HIGH_COEFFICIENTS |
              CJK_HUNDRED_COEFFICIENTS,
          );
        case 47:
          return createCJKCounter(
            value,
            "零壹貳參肆伍陸柒捌玖",
            CHINESE_FORMAL_MULTIPLIERS,
            "負",
            cjkSuffix,
            CJK_ZEROS |
              CJK_TEN_COEFFICIENTS |
              CJK_TEN_HIGH_COEFFICIENTS |
              CJK_HUNDRED_COEFFICIENTS,
          );
        case 42:
          return createCJKCounter(
            value,
            "零一二三四五六七八九",
            CHINESE_INFORMAL_MULTIPLIERS,
            "负",
            cjkSuffix,
            CJK_TEN_COEFFICIENTS |
              CJK_TEN_HIGH_COEFFICIENTS |
              CJK_HUNDRED_COEFFICIENTS,
          );
        case 41:
          return createCJKCounter(
            value,
            "零壹贰叁肆伍陆柒捌玖",
            CHINESE_FORMAL_MULTIPLIERS,
            "负",
            cjkSuffix,
            CJK_ZEROS |
              CJK_TEN_COEFFICIENTS |
              CJK_TEN_HIGH_COEFFICIENTS |
              CJK_HUNDRED_COEFFICIENTS,
          );
        case 26:
          return createCJKCounter(
            value,
            "〇一二三四五六七八九",
            "十百千万",
            JAPANESE_NEGATIVE,
            cjkSuffix,
            0,
          );
        case 25:
          return createCJKCounter(
            value,
            "零壱弐参四伍六七八九",
            "拾百千万",
            JAPANESE_NEGATIVE,
            cjkSuffix,
            CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS,
          );
        case 31:
          return createCJKCounter(
            value,
            "영일이삼사오육칠팔구",
            "십백천만",
            KOREAN_NEGATIVE,
            koreanSuffix,
            CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS,
          );
        case 33:
          return createCJKCounter(
            value,
            "零一二三四五六七八九",
            "十百千萬",
            KOREAN_NEGATIVE,
            koreanSuffix,
            0,
          );
        case 32:
          return createCJKCounter(
            value,
            "零壹貳參四五六七八九",
            "拾百千",
            KOREAN_NEGATIVE,
            koreanSuffix,
            CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS,
          );
        case 18:
          return createCounterStyleFromRange(
            value,
            0x966,
            0x96f,
            true,
            defaultSuffix,
          );
        case 20:
          return createAdditiveCounter(
            value,
            1,
            19999,
            GEORGIAN,
            3,
            defaultSuffix,
          );
        case 21:
          return createCounterStyleFromRange(
            value,
            0xae6,
            0xaef,
            true,
            defaultSuffix,
          );
        case 22:
          return createCounterStyleFromRange(
            value,
            0xa66,
            0xa6f,
            true,
            defaultSuffix,
          );
        case 22:
          return createAdditiveCounter(
            value,
            1,
            10999,
            HEBREW,
            3,
            defaultSuffix,
          );
        case 23:
          return createCounterStyleFromSymbols(
            value,
            "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん",
          );
        case 24:
          return createCounterStyleFromSymbols(
            value,
            "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす",
          );
        case 27:
          return createCounterStyleFromRange(
            value,
            0xce6,
            0xcef,
            true,
            defaultSuffix,
          );
        case 28:
          return createCounterStyleFromSymbols(
            value,
            "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",
            cjkSuffix,
          );
        case 29:
          return createCounterStyleFromSymbols(
            value,
            "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",
            cjkSuffix,
          );
        case 34:
          return createCounterStyleFromRange(
            value,
            0xed0,
            0xed9,
            true,
            defaultSuffix,
          );
        case 37:
          return createCounterStyleFromRange(
            value,
            0x1810,
            0x1819,
            true,
            defaultSuffix,
          );
        case 38:
          return createCounterStyleFromRange(
            value,
            0x1040,
            0x1049,
            true,
            defaultSuffix,
          );
        case 39:
          return createCounterStyleFromRange(
            value,
            0xb66,
            0xb6f,
            true,
            defaultSuffix,
          );
        case 40:
          return createCounterStyleFromRange(
            value,
            0x6f0,
            0x6f9,
            true,
            defaultSuffix,
          );
        case 43:
          return createCounterStyleFromRange(
            value,
            0xbe6,
            0xbef,
            true,
            defaultSuffix,
          );
        case 44:
          return createCounterStyleFromRange(
            value,
            0xc66,
            0xc6f,
            true,
            defaultSuffix,
          );
        case 45:
          return createCounterStyleFromRange(
            value,
            0xe50,
            0xe59,
            true,
            defaultSuffix,
          );
        case 46:
          return createCounterStyleFromRange(
            value,
            0xf20,
            0xf29,
            true,
            defaultSuffix,
          );
        case 3:
        default:
          return createCounterStyleFromRange(
            value,
            48,
            57,
            true,
            defaultSuffix,
          );
      }
    };
    var IGNORE_ATTRIBUTE = "data-html2canvas-ignore";
    var DocumentCloner = (function () {
      function DocumentCloner(context, element, options) {
        this.context = context;
        this.options = options;
        this.scrolledElements = [];
        this.referenceElement = element;
        this.counters = new CounterState();
        this.quoteDepth = 0;
        if (!element.ownerDocument) {
          throw new Error("Cloned element does not have an owner document");
        }
        this.documentElement = this.cloneNode(
          element.ownerDocument.documentElement,
          false,
        );
      }
      DocumentCloner.prototype.toIFrame = function (ownerDocument, windowSize) {
        var _this = this;
        var iframe = createIFrameContainer(ownerDocument, windowSize);
        if (!iframe.contentWindow) {
          return Promise.reject("Unable to find iframe window");
        }
        var scrollX = ownerDocument.defaultView.pageXOffset;
        var scrollY = ownerDocument.defaultView.pageYOffset;
        var cloneWindow = iframe.contentWindow;
        var documentClone = cloneWindow.document;

        var iframeLoad = iframeLoader(iframe).then(function () {
          return __awaiter(_this, void 0, void 0, function () {
            var onclone, referenceElement;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  this.scrolledElements.forEach(restoreNodeScroll);
                  if (cloneWindow) {
                    cloneWindow.scrollTo(windowSize.left, windowSize.top);
                    if (
                      /(iPad|iPhone|iPod)/g.test(navigator.userAgent) &&
                      (cloneWindow.scrollY !== windowSize.top ||
                        cloneWindow.scrollX !== windowSize.left)
                    ) {
                      this.context.logger.warn(
                        "Unable to restore scroll position for cloned document",
                      );
                      this.context.windowBounds = this.context.windowBounds.add(
                        cloneWindow.scrollX - windowSize.left,
                        cloneWindow.scrollY - windowSize.top,
                        0,
                        0,
                      );
                    }
                  }
                  onclone = this.options.onclone;
                  referenceElement = this.clonedReferenceElement;
                  if (typeof referenceElement === "undefined") {
                    return [
                      2,
                      Promise.reject(
                        "Error finding the " +
                          this.referenceElement.nodeName +
                          " in the cloned document",
                      ),
                    ];
                  }
                  if (!(documentClone.fonts && documentClone.fonts.ready))
                    return [3, 2];
                  return [4, documentClone.fonts.ready];
                case 1:
                  _a.sent();
                  _a.label = 2;
                case 2:
                  if (!/(AppleWebKit)/g.test(navigator.userAgent))
                    return [3, 4];
                  return [4, imagesReady(documentClone)];
                case 3:
                  _a.sent();
                  _a.label = 4;
                case 4:
                  if (typeof onclone === "function") {
                    return [
                      2,
                      Promise.resolve()
                        .then(function () {
                          return onclone(documentClone, referenceElement);
                        })
                        .then(function () {
                          return iframe;
                        }),
                    ];
                  }
                  return [2, iframe];
              }
            });
          });
        });
        documentClone.open();
        documentClone.write(
          serializeDoctype(document.doctype) + "<html></html>",
        );

        restoreOwnerScroll(
          this.referenceElement.ownerDocument,
          scrollX,
          scrollY,
        );
        documentClone.replaceChild(
          documentClone.adoptNode(this.documentElement),
          documentClone.documentElement,
        );
        documentClone.close();
        return iframeLoad;
      };
      DocumentCloner.prototype.createElementClone = function (node) {
        if (isDebugging(node, 2)) {
          debugger;
        }
        if (isCanvasElement(node)) {
          return this.createCanvasClone(node);
        }
        if (isVideoElement(node)) {
          return this.createVideoClone(node);
        }
        if (isStyleElement(node)) {
          return this.createStyleClone(node);
        }
        var clone = node.cloneNode(false);
        if (isImageElement(clone)) {
          if (
            isImageElement(node) &&
            node.currentSrc &&
            node.currentSrc !== node.src
          ) {
            clone.src = node.currentSrc;
            clone.srcset = "";
          }
          if (clone.loading === "lazy") {
            clone.loading = "eager";
          }
        }
        if (isCustomElement(clone)) {
          return this.createCustomElementClone(clone);
        }
        return clone;
      };
      DocumentCloner.prototype.createCustomElementClone = function (node) {
        var clone = document.createElement("html2canvascustomelement");
        copyCSSStyles(node.style, clone);
        return clone;
      };
      DocumentCloner.prototype.createStyleClone = function (node) {
        try {
          var sheet = node.sheet;
          if (sheet && sheet.cssRules) {
            var css = [].slice.call(sheet.cssRules, 0).reduce(function (
              css,
              rule,
            ) {
              if (rule && typeof rule.cssText === "string") {
                return css + rule.cssText;
              }
              return css;
            }, "");
            var style = node.cloneNode(false);
            style.textContent = css;
            return style;
          }
        } catch (e) {
          this.context.logger.error("Unable to access cssRules property", e);
          if (e.name !== "SecurityError") {
            throw e;
          }
        }
        return node.cloneNode(false);
      };
      DocumentCloner.prototype.createCanvasClone = function (canvas) {
        var _a;
        if (this.options.inlineImages && canvas.ownerDocument) {
          var img = canvas.ownerDocument.createElement("img");
          try {
            img.src = canvas.toDataURL();
            return img;
          } catch (e) {
            this.context.logger.info(
              "Unable to inline canvas contents, canvas is tainted",
              canvas,
            );
          }
        }
        var clonedCanvas = canvas.cloneNode(false);
        try {
          clonedCanvas.width = canvas.width;
          clonedCanvas.height = canvas.height;
          var ctx = canvas.getContext("2d");
          var clonedCtx = clonedCanvas.getContext("2d");
          if (clonedCtx) {
            if (!this.options.allowTaint && ctx) {
              clonedCtx.putImageData(
                ctx.getImageData(0, 0, canvas.width, canvas.height),
                0,
                0,
              );
            } else {
              var gl =
                (_a = canvas.getContext("webgl2")) !== null && _a !== void 0
                  ? _a
                  : canvas.getContext("webgl");
              if (gl) {
                var attribs = gl.getContextAttributes();
                if (
                  (attribs === null || attribs === void 0
                    ? void 0
                    : attribs.preserveDrawingBuffer) === false
                ) {
                  this.context.logger.warn(
                    "Unable to clone WebGL context as it has preserveDrawingBuffer=false",
                    canvas,
                  );
                }
              }
              clonedCtx.drawImage(canvas, 0, 0);
            }
          }
          return clonedCanvas;
        } catch (e) {
          this.context.logger.info(
            "Unable to clone canvas as it is tainted",
            canvas,
          );
        }
        return clonedCanvas;
      };
      DocumentCloner.prototype.createVideoClone = function (video) {
        var canvas = video.ownerDocument.createElement("canvas");
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;
        var ctx = canvas.getContext("2d");
        try {
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            if (!this.options.allowTaint) {
              ctx.getImageData(0, 0, canvas.width, canvas.height);
            }
          }
          return canvas;
        } catch (e) {
          this.context.logger.info(
            "Unable to clone video as it is tainted",
            video,
          );
        }
        var blankCanvas = video.ownerDocument.createElement("canvas");
        blankCanvas.width = video.offsetWidth;
        blankCanvas.height = video.offsetHeight;
        return blankCanvas;
      };
      DocumentCloner.prototype.appendChildNode = function (
        clone,
        child,
        copyStyles,
      ) {
        if (
          !isElementNode(child) ||
          (!isScriptElement(child) &&
            !child.hasAttribute(IGNORE_ATTRIBUTE) &&
            (typeof this.options.ignoreElements !== "function" ||
              !this.options.ignoreElements(child)))
        ) {
          if (
            !this.options.copyStyles ||
            !isElementNode(child) ||
            !isStyleElement(child)
          ) {
            clone.appendChild(this.cloneNode(child, copyStyles));
          }
        }
      };
      DocumentCloner.prototype.cloneChildNodes = function (
        node,
        clone,
        copyStyles,
      ) {
        var _this = this;
        for (
          var child = node.shadowRoot
            ? node.shadowRoot.firstChild
            : node.firstChild;
          child;
          child = child.nextSibling
        ) {
          if (
            isElementNode(child) &&
            isSlotElement(child) &&
            typeof child.assignedNodes === "function"
          ) {
            var assignedNodes = child.assignedNodes();
            if (assignedNodes.length) {
              assignedNodes.forEach(function (assignedNode) {
                return _this.appendChildNode(clone, assignedNode, copyStyles);
              });
            }
          } else {
            this.appendChildNode(clone, child, copyStyles);
          }
        }
      };
      DocumentCloner.prototype.cloneNode = function (node, copyStyles) {
        if (isTextNode(node)) {
          return document.createTextNode(node.data);
        }
        if (!node.ownerDocument) {
          return node.cloneNode(false);
        }
        var window1 = node.ownerDocument.defaultView;
        if (
          window1 &&
          isElementNode(node) &&
          (isHTMLElementNode(node) || isSVGElementNode(node))
        ) {
          var clone = this.createElementClone(node);
          clone.style.transitionProperty = "none";
          var style = window1.getComputedStyle(node);
          var styleBefore = window1.getComputedStyle(node, ":before");
          var styleAfter = window1.getComputedStyle(node, ":after");
          if (this.referenceElement === node && isHTMLElementNode(clone)) {
            this.clonedReferenceElement = clone;
          }
          if (isBodyElement(clone)) {
            createPseudoHideStyles(clone);
          }
          var counters = this.counters.parse(
            new CSSParsedCounterDeclaration(this.context, style),
          );
          var before = this.resolvePseudoContent(
            node,
            clone,
            styleBefore,
            PseudoElementType.BEFORE,
          );
          if (isCustomElement(node)) {
            copyStyles = true;
          }
          if (!isVideoElement(node)) {
            this.cloneChildNodes(node, clone, copyStyles);
          }
          if (before) {
            clone.insertBefore(before, clone.firstChild);
          }
          var after = this.resolvePseudoContent(
            node,
            clone,
            styleAfter,
            PseudoElementType.AFTER,
          );
          if (after) {
            clone.appendChild(after);
          }
          this.counters.pop(counters);
          if (
            (style &&
              (this.options.copyStyles || isSVGElementNode(node)) &&
              !isIFrameElement(node)) ||
            copyStyles
          ) {
            copyCSSStyles(style, clone);
          }
          if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
            this.scrolledElements.push([
              clone,
              node.scrollLeft,
              node.scrollTop,
            ]);
          }
          if (
            (isTextareaElement(node) || isSelectElement(node)) &&
            (isTextareaElement(clone) || isSelectElement(clone))
          ) {
            clone.value = node.value;
          }
          return clone;
        }
        return node.cloneNode(false);
      };
      DocumentCloner.prototype.resolvePseudoContent = function (
        node,
        clone,
        style,
        pseudoElt,
      ) {
        var _this = this;
        if (!style) {
          return;
        }
        var value = style.content;
        var document1 = clone.ownerDocument;
        if (
          !document1 ||
          !value ||
          value === "none" ||
          value === "-moz-alt-content" ||
          style.display === "none"
        ) {
          return;
        }
        this.counters.parse(
          new CSSParsedCounterDeclaration(this.context, style),
        );
        var declaration = new CSSParsedPseudoDeclaration(this.context, style);
        var anonymousReplacedElement = document1.createElement(
          "html2canvaspseudoelement",
        );
        copyCSSStyles(style, anonymousReplacedElement);
        declaration.content.forEach(function (token) {
          if (token.type === 0) {
            anonymousReplacedElement.appendChild(
              document1.createTextNode(token.value),
            );
          } else if (token.type === 22) {
            var img = document1.createElement("img");
            img.src = token.value;
            img.style.opacity = "1";
            anonymousReplacedElement.appendChild(img);
          } else if (token.type === 18) {
            if (token.name === "attr") {
              var attr = token.values.filter(isIdentToken);
              if (attr.length) {
                anonymousReplacedElement.appendChild(
                  document1.createTextNode(
                    node.getAttribute(attr[0].value) || "",
                  ),
                );
              }
            } else if (token.name === "counter") {
              var _a = token.values.filter(nonFunctionArgSeparator),
                counter = _a[0],
                counterStyle = _a[1];
              if (counter && isIdentToken(counter)) {
                var counterState = _this.counters.getCounterValue(
                  counter.value,
                );
                var counterType =
                  counterStyle && isIdentToken(counterStyle)
                    ? listStyleType.parse(_this.context, counterStyle.value)
                    : 3;
                anonymousReplacedElement.appendChild(
                  document1.createTextNode(
                    createCounterText(counterState, counterType, false),
                  ),
                );
              }
            } else if (token.name === "counters") {
              var _b = token.values.filter(nonFunctionArgSeparator),
                counter = _b[0],
                delim = _b[1],
                counterStyle = _b[2];
              if (counter && isIdentToken(counter)) {
                var counterStates = _this.counters.getCounterValues(
                  counter.value,
                );
                var counterType_1 =
                  counterStyle && isIdentToken(counterStyle)
                    ? listStyleType.parse(_this.context, counterStyle.value)
                    : 3;
                var separator = delim && delim.type === 0 ? delim.value : "";
                var text = counterStates
                  .map(function (value) {
                    return createCounterText(value, counterType_1, false);
                  })
                  .join(separator);
                anonymousReplacedElement.appendChild(
                  document1.createTextNode(text),
                );
              }
            } else;
          } else if (token.type === 20) {
            switch (token.value) {
              case "open-quote":
                anonymousReplacedElement.appendChild(
                  document1.createTextNode(
                    getQuote(declaration.quotes, _this.quoteDepth++, true),
                  ),
                );
                break;
              case "close-quote":
                anonymousReplacedElement.appendChild(
                  document1.createTextNode(
                    getQuote(declaration.quotes, --_this.quoteDepth, false),
                  ),
                );
                break;
              default:
                anonymousReplacedElement.appendChild(
                  document1.createTextNode(token.value),
                );
            }
          }
        });
        anonymousReplacedElement.className =
          PSEUDO_HIDE_ELEMENT_CLASS_BEFORE +
          " " +
          PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
        var newClassName =
          pseudoElt === PseudoElementType.BEFORE
            ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE
            : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
        if (isSVGElementNode(clone)) {
          clone.className.baseValue += newClassName;
        } else {
          clone.className += newClassName;
        }
        return anonymousReplacedElement;
      };
      DocumentCloner.destroy = function (container) {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
          return true;
        }
        return false;
      };
      return DocumentCloner;
    })();
    var PseudoElementType;
    (function (PseudoElementType) {
      PseudoElementType[(PseudoElementType["BEFORE"] = 0)] = "BEFORE";
      PseudoElementType[(PseudoElementType["AFTER"] = 1)] = "AFTER";
    })(PseudoElementType || (PseudoElementType = {}));
    var createIFrameContainer = function (ownerDocument, bounds) {
      var cloneIframeContainer = ownerDocument.createElement("iframe");
      cloneIframeContainer.className = "html2canvas-container";
      cloneIframeContainer.style.visibility = "hidden";
      cloneIframeContainer.style.position = "fixed";
      cloneIframeContainer.style.left = "-10000px";
      cloneIframeContainer.style.top = "0px";
      cloneIframeContainer.style.border = "0";
      cloneIframeContainer.width = bounds.width.toString();
      cloneIframeContainer.height = bounds.height.toString();
      cloneIframeContainer.scrolling = "no";
      cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, "true");
      ownerDocument.body.appendChild(cloneIframeContainer);
      return cloneIframeContainer;
    };
    var imageReady = function (img) {
      return new Promise(function (resolve) {
        if (img.complete) {
          resolve();
          return;
        }
        if (!img.src) {
          resolve();
          return;
        }
        img.onload = resolve;
        img.onerror = resolve;
      });
    };
    var imagesReady = function (document1) {
      return Promise.all([].slice.call(document1.images, 0).map(imageReady));
    };
    var iframeLoader = function (iframe) {
      return new Promise(function (resolve, reject) {
        var cloneWindow = iframe.contentWindow;
        if (!cloneWindow) {
          return reject("No window assigned for iframe");
        }
        var documentClone = cloneWindow.document;
        cloneWindow.onload = iframe.onload = function () {
          cloneWindow.onload = iframe.onload = null;
          var interval = setInterval(function () {
            if (
              documentClone.body.childNodes.length > 0 &&
              documentClone.readyState === "complete"
            ) {
              clearInterval(interval);
              resolve(iframe);
            }
          }, 50);
        };
      });
    };
    var ignoredStyleProperties = ["all", "d", "content"];
    var copyCSSStyles = function (style, target) {
      for (var i = style.length - 1; i >= 0; i--) {
        var property = style.item(i);
        if (ignoredStyleProperties.indexOf(property) === -1) {
          target.style.setProperty(property, style.getPropertyValue(property));
        }
      }
      return target;
    };
    var serializeDoctype = function (doctype) {
      var str = "";
      if (doctype) {
        str += "<!DOCTYPE ";
        if (doctype.name) {
          str += doctype.name;
        }
        if (doctype.internalSubset) {
          str += doctype.internalSubset;
        }
        if (doctype.publicId) {
          str += '"' + doctype.publicId + '"';
        }
        if (doctype.systemId) {
          str += '"' + doctype.systemId + '"';
        }
        str += ">";
      }
      return str;
    };
    var restoreOwnerScroll = function (ownerDocument, x, y) {
      if (
        ownerDocument &&
        ownerDocument.defaultView &&
        (x !== ownerDocument.defaultView.pageXOffset ||
          y !== ownerDocument.defaultView.pageYOffset)
      ) {
        ownerDocument.defaultView.scrollTo(x, y);
      }
    };
    var restoreNodeScroll = function (_a) {
      var element = _a[0],
        x = _a[1],
        y = _a[2];
      element.scrollLeft = x;
      element.scrollTop = y;
    };
    var PSEUDO_BEFORE = ":before";
    var PSEUDO_AFTER = ":after";
    var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE =
      "___html2canvas___pseudoelement_before";
    var PSEUDO_HIDE_ELEMENT_CLASS_AFTER =
      "___html2canvas___pseudoelement_after";
    var PSEUDO_HIDE_ELEMENT_STYLE =
      '{\n    content: "" !important;\n    display: none !important;\n}';
    var createPseudoHideStyles = function (body) {
      createStyles(
        body,
        "." +
          PSEUDO_HIDE_ELEMENT_CLASS_BEFORE +
          PSEUDO_BEFORE +
          PSEUDO_HIDE_ELEMENT_STYLE +
          "\n         ." +
          PSEUDO_HIDE_ELEMENT_CLASS_AFTER +
          PSEUDO_AFTER +
          PSEUDO_HIDE_ELEMENT_STYLE,
      );
    };
    var createStyles = function (body, styles) {
      var document1 = body.ownerDocument;
      if (document1) {
        var style = document1.createElement("style");
        style.textContent = styles;
        body.appendChild(style);
      }
    };
    var CacheStorage = (function () {
      function CacheStorage() {}
      CacheStorage.getOrigin = function (url) {
        var link = CacheStorage._link;
        if (!link) {
          return "about:blank";
        }
        link.href = url;
        link.href = link.href;
        return link.protocol + link.hostname + link.port;
      };
      CacheStorage.isSameOrigin = function (src) {
        return CacheStorage.getOrigin(src) === CacheStorage._origin;
      };
      CacheStorage.setContext = function (window1) {
        CacheStorage._link = window1.document.createElement("a");
        CacheStorage._origin = CacheStorage.getOrigin(window1.location.href);
      };
      CacheStorage._origin = "about:blank";
      return CacheStorage;
    })();
    var Cache = (function () {
      function Cache(context, _options) {
        this.context = context;
        this._options = _options;

        this._cache = {};
      }
      Cache.prototype.addImage = function (src) {
        var result = Promise.resolve();
        if (this.has(src)) {
          return result;
        }
        if (isBlobImage(src) || isRenderable(src)) {
          (this._cache[src] = this.loadImage(src)).catch(function () {});
          return result;
        }
        return result;
      };

      Cache.prototype.match = function (src) {
        return this._cache[src];
      };
      Cache.prototype.loadImage = function (key) {
        return __awaiter(this, void 0, void 0, function () {
          var isSameOrigin, useCORS, useProxy, src;
          var _this = this;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                isSameOrigin = CacheStorage.isSameOrigin(key);
                useCORS =
                  !isInlineImage(key) &&
                  this._options.useCORS === true &&
                  FEATURES.SUPPORT_CORS_IMAGES &&
                  !isSameOrigin;
                useProxy =
                  !isInlineImage(key) &&
                  !isSameOrigin &&
                  !isBlobImage(key) &&
                  typeof this._options.proxy === "string" &&
                  FEATURES.SUPPORT_CORS_XHR &&
                  !useCORS;
                if (
                  !isSameOrigin &&
                  this._options.allowTaint === false &&
                  !isInlineImage(key) &&
                  !isBlobImage(key) &&
                  !useProxy &&
                  !useCORS
                ) {
                  return [2];
                }
                src = key;
                if (!useProxy) return [3, 2];
                return [4, this.proxy(src)];
              case 1:
                src = _a.sent();
                _a.label = 2;
              case 2:
                this.context.logger.debug(
                  "Added image " + key.substring(0, 256),
                );
                return [
                  4,
                  new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.onload = function () {
                      return resolve(img);
                    };
                    img.onerror = reject;

                    if (isInlineBase64Image(src) || useCORS) {
                      img.crossOrigin = "anonymous";
                    }
                    img.src = src;
                    if (img.complete === true) {
                      setTimeout(function () {
                        return resolve(img);
                      }, 500);
                    }
                    if (_this._options.imageTimeout > 0) {
                      setTimeout(function () {
                        return reject(
                          "Timed out (" +
                            _this._options.imageTimeout +
                            "ms) loading image",
                        );
                      }, _this._options.imageTimeout);
                    }
                  }),
                ];
              case 3:
                return [2, _a.sent()];
            }
          });
        });
      };
      Cache.prototype.has = function (key) {
        return typeof this._cache[key] !== "undefined";
      };
      Cache.prototype.keys = function () {
        return Promise.resolve(Object.keys(this._cache));
      };
      Cache.prototype.proxy = function (src) {
        var _this = this;
        var proxy = this._options.proxy;
        if (!proxy) {
          throw new Error("No proxy defined");
        }
        var key = src.substring(0, 256);
        return new Promise(function (resolve, reject) {
          var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? "blob" : "text";
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              if (responseType === "text") {
                resolve(xhr.response);
              } else {
                var reader_1 = new FileReader();
                reader_1.addEventListener(
                  "load",
                  function () {
                    return resolve(reader_1.result);
                  },
                  false,
                );
                reader_1.addEventListener(
                  "error",
                  function (e) {
                    return reject(e);
                  },
                  false,
                );
                reader_1.readAsDataURL(xhr.response);
              }
            } else {
              reject(
                "Failed to proxy resource " +
                  key +
                  " with status code " +
                  xhr.status,
              );
            }
          };
          xhr.onerror = reject;
          var queryString = proxy.indexOf("?") > -1 ? "&" : "?";
          xhr.open(
            "GET",
            "" +
              proxy +
              queryString +
              "url=" +
              encodeURIComponent(src) +
              "&responseType=" +
              responseType,
          );
          if (responseType !== "text" && xhr instanceof XMLHttpRequest) {
            xhr.responseType = responseType;
          }
          if (_this._options.imageTimeout) {
            var timeout_1 = _this._options.imageTimeout;
            xhr.timeout = timeout_1;
            xhr.ontimeout = function () {
              return reject("Timed out (" + timeout_1 + "ms) proxying " + key);
            };
          }
          xhr.send();
        });
      };
      return Cache;
    })();
    var INLINE_SVG = /^data:image\/svg\+xml/i;
    var INLINE_BASE64 = /^data:image\/.*;base64,/i;
    var INLINE_IMG = /^data:image\/.*/i;
    var isRenderable = function (src) {
      return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src);
    };
    var isInlineImage = function (src) {
      return INLINE_IMG.test(src);
    };
    var isInlineBase64Image = function (src) {
      return INLINE_BASE64.test(src);
    };
    var isBlobImage = function (src) {
      return src.substr(0, 4) === "blob";
    };
    var isSVG = function (src) {
      return src.substr(-3).toLowerCase() === "svg" || INLINE_SVG.test(src);
    };
    var Vector = (function () {
      function Vector(x, y) {
        this.type = 0;
        this.x = x;
        this.y = y;
      }
      Vector.prototype.add = function (deltaX, deltaY) {
        return new Vector(this.x + deltaX, this.y + deltaY);
      };
      return Vector;
    })();
    var lerp = function (a, b, t) {
      return new Vector(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    };
    var BezierCurve = (function () {
      function BezierCurve(start, startControl, endControl, end) {
        this.type = 1;
        this.start = start;
        this.startControl = startControl;
        this.endControl = endControl;
        this.end = end;
      }
      BezierCurve.prototype.subdivide = function (t, firstHalf) {
        var ab = lerp(this.start, this.startControl, t);
        var bc = lerp(this.startControl, this.endControl, t);
        var cd = lerp(this.endControl, this.end, t);
        var abbc = lerp(ab, bc, t);
        var bccd = lerp(bc, cd, t);
        var dest = lerp(abbc, bccd, t);
        return firstHalf
          ? new BezierCurve(this.start, ab, abbc, dest)
          : new BezierCurve(dest, bccd, cd, this.end);
      };
      BezierCurve.prototype.add = function (deltaX, deltaY) {
        return new BezierCurve(
          this.start.add(deltaX, deltaY),
          this.startControl.add(deltaX, deltaY),
          this.endControl.add(deltaX, deltaY),
          this.end.add(deltaX, deltaY),
        );
      };
      BezierCurve.prototype.reverse = function () {
        return new BezierCurve(
          this.end,
          this.endControl,
          this.startControl,
          this.start,
        );
      };
      return BezierCurve;
    })();
    var isBezierCurve = function (path) {
      return path.type === 1;
    };
    var BoundCurves = (function () {
      function BoundCurves(element) {
        var styles = element.styles;
        var bounds = element.bounds;
        var _a = getAbsoluteValueForTuple(
            styles.borderTopLeftRadius,
            bounds.width,
            bounds.height,
          ),
          tlh = _a[0],
          tlv = _a[1];
        var _b = getAbsoluteValueForTuple(
            styles.borderTopRightRadius,
            bounds.width,
            bounds.height,
          ),
          trh = _b[0],
          trv = _b[1];
        var _c = getAbsoluteValueForTuple(
            styles.borderBottomRightRadius,
            bounds.width,
            bounds.height,
          ),
          brh = _c[0],
          brv = _c[1];
        var _d = getAbsoluteValueForTuple(
            styles.borderBottomLeftRadius,
            bounds.width,
            bounds.height,
          ),
          blh = _d[0],
          blv = _d[1];
        var factors = [];
        factors.push((tlh + trh) / bounds.width);
        factors.push((blh + brh) / bounds.width);
        factors.push((tlv + blv) / bounds.height);
        factors.push((trv + brv) / bounds.height);
        var maxFactor = Math.max.apply(Math, factors);
        if (maxFactor > 1) {
          tlh /= maxFactor;
          tlv /= maxFactor;
          trh /= maxFactor;
          trv /= maxFactor;
          brh /= maxFactor;
          brv /= maxFactor;
          blh /= maxFactor;
          blv /= maxFactor;
        }
        var topWidth = bounds.width - trh;
        var rightHeight = bounds.height - brv;
        var bottomWidth = bounds.width - brh;
        var leftHeight = bounds.height - blv;
        var borderTopWidth = styles.borderTopWidth;
        var borderRightWidth = styles.borderRightWidth;
        var borderBottomWidth = styles.borderBottomWidth;
        var borderLeftWidth = styles.borderLeftWidth;
        var paddingTop = getAbsoluteValue(
          styles.paddingTop,
          element.bounds.width,
        );
        var paddingRight = getAbsoluteValue(
          styles.paddingRight,
          element.bounds.width,
        );
        var paddingBottom = getAbsoluteValue(
          styles.paddingBottom,
          element.bounds.width,
        );
        var paddingLeft = getAbsoluteValue(
          styles.paddingLeft,
          element.bounds.width,
        );
        this.topLeftBorderDoubleOuterBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth / 3,
                bounds.top + borderTopWidth / 3,
                tlh - borderLeftWidth / 3,
                tlv - borderTopWidth / 3,
                CORNER.TOP_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth / 3,
                bounds.top + borderTopWidth / 3,
              );
        this.topRightBorderDoubleOuterBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + topWidth,
                bounds.top + borderTopWidth / 3,
                trh - borderRightWidth / 3,
                trv - borderTopWidth / 3,
                CORNER.TOP_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - borderRightWidth / 3,
                bounds.top + borderTopWidth / 3,
              );
        this.bottomRightBorderDoubleOuterBox =
          brh > 0 || brv > 0
            ? getCurvePoints(
                bounds.left + bottomWidth,
                bounds.top + rightHeight,
                brh - borderRightWidth / 3,
                brv - borderBottomWidth / 3,
                CORNER.BOTTOM_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - borderRightWidth / 3,
                bounds.top + bounds.height - borderBottomWidth / 3,
              );
        this.bottomLeftBorderDoubleOuterBox =
          blh > 0 || blv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth / 3,
                bounds.top + leftHeight,
                blh - borderLeftWidth / 3,
                blv - borderBottomWidth / 3,
                CORNER.BOTTOM_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth / 3,
                bounds.top + bounds.height - borderBottomWidth / 3,
              );
        this.topLeftBorderDoubleInnerBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + (borderLeftWidth * 2) / 3,
                bounds.top + (borderTopWidth * 2) / 3,
                tlh - (borderLeftWidth * 2) / 3,
                tlv - (borderTopWidth * 2) / 3,
                CORNER.TOP_LEFT,
              )
            : new Vector(
                bounds.left + (borderLeftWidth * 2) / 3,
                bounds.top + (borderTopWidth * 2) / 3,
              );
        this.topRightBorderDoubleInnerBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + topWidth,
                bounds.top + (borderTopWidth * 2) / 3,
                trh - (borderRightWidth * 2) / 3,
                trv - (borderTopWidth * 2) / 3,
                CORNER.TOP_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - (borderRightWidth * 2) / 3,
                bounds.top + (borderTopWidth * 2) / 3,
              );
        this.bottomRightBorderDoubleInnerBox =
          brh > 0 || brv > 0
            ? getCurvePoints(
                bounds.left + bottomWidth,
                bounds.top + rightHeight,
                brh - (borderRightWidth * 2) / 3,
                brv - (borderBottomWidth * 2) / 3,
                CORNER.BOTTOM_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - (borderRightWidth * 2) / 3,
                bounds.top + bounds.height - (borderBottomWidth * 2) / 3,
              );
        this.bottomLeftBorderDoubleInnerBox =
          blh > 0 || blv > 0
            ? getCurvePoints(
                bounds.left + (borderLeftWidth * 2) / 3,
                bounds.top + leftHeight,
                blh - (borderLeftWidth * 2) / 3,
                blv - (borderBottomWidth * 2) / 3,
                CORNER.BOTTOM_LEFT,
              )
            : new Vector(
                bounds.left + (borderLeftWidth * 2) / 3,
                bounds.top + bounds.height - (borderBottomWidth * 2) / 3,
              );
        this.topLeftBorderStroke =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth / 2,
                bounds.top + borderTopWidth / 2,
                tlh - borderLeftWidth / 2,
                tlv - borderTopWidth / 2,
                CORNER.TOP_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth / 2,
                bounds.top + borderTopWidth / 2,
              );
        this.topRightBorderStroke =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + topWidth,
                bounds.top + borderTopWidth / 2,
                trh - borderRightWidth / 2,
                trv - borderTopWidth / 2,
                CORNER.TOP_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - borderRightWidth / 2,
                bounds.top + borderTopWidth / 2,
              );
        this.bottomRightBorderStroke =
          brh > 0 || brv > 0
            ? getCurvePoints(
                bounds.left + bottomWidth,
                bounds.top + rightHeight,
                brh - borderRightWidth / 2,
                brv - borderBottomWidth / 2,
                CORNER.BOTTOM_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - borderRightWidth / 2,
                bounds.top + bounds.height - borderBottomWidth / 2,
              );
        this.bottomLeftBorderStroke =
          blh > 0 || blv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth / 2,
                bounds.top + leftHeight,
                blh - borderLeftWidth / 2,
                blv - borderBottomWidth / 2,
                CORNER.BOTTOM_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth / 2,
                bounds.top + bounds.height - borderBottomWidth / 2,
              );
        this.topLeftBorderBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT)
            : new Vector(bounds.left, bounds.top);
        this.topRightBorderBox =
          trh > 0 || trv > 0
            ? getCurvePoints(
                bounds.left + topWidth,
                bounds.top,
                trh,
                trv,
                CORNER.TOP_RIGHT,
              )
            : new Vector(bounds.left + bounds.width, bounds.top);
        this.bottomRightBorderBox =
          brh > 0 || brv > 0
            ? getCurvePoints(
                bounds.left + bottomWidth,
                bounds.top + rightHeight,
                brh,
                brv,
                CORNER.BOTTOM_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width,
                bounds.top + bounds.height,
              );
        this.bottomLeftBorderBox =
          blh > 0 || blv > 0
            ? getCurvePoints(
                bounds.left,
                bounds.top + leftHeight,
                blh,
                blv,
                CORNER.BOTTOM_LEFT,
              )
            : new Vector(bounds.left, bounds.top + bounds.height);
        this.topLeftPaddingBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth,
                bounds.top + borderTopWidth,
                Math.max(0, tlh - borderLeftWidth),
                Math.max(0, tlv - borderTopWidth),
                CORNER.TOP_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth,
                bounds.top + borderTopWidth,
              );
        this.topRightPaddingBox =
          trh > 0 || trv > 0
            ? getCurvePoints(
                bounds.left +
                  Math.min(topWidth, bounds.width - borderRightWidth),
                bounds.top + borderTopWidth,
                topWidth > bounds.width + borderRightWidth
                  ? 0
                  : Math.max(0, trh - borderRightWidth),
                Math.max(0, trv - borderTopWidth),
                CORNER.TOP_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - borderRightWidth,
                bounds.top + borderTopWidth,
              );
        this.bottomRightPaddingBox =
          brh > 0 || brv > 0
            ? getCurvePoints(
                bounds.left +
                  Math.min(bottomWidth, bounds.width - borderLeftWidth),
                bounds.top +
                  Math.min(rightHeight, bounds.height - borderBottomWidth),
                Math.max(0, brh - borderRightWidth),
                Math.max(0, brv - borderBottomWidth),
                CORNER.BOTTOM_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - borderRightWidth,
                bounds.top + bounds.height - borderBottomWidth,
              );
        this.bottomLeftPaddingBox =
          blh > 0 || blv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth,
                bounds.top +
                  Math.min(leftHeight, bounds.height - borderBottomWidth),
                Math.max(0, blh - borderLeftWidth),
                Math.max(0, blv - borderBottomWidth),
                CORNER.BOTTOM_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth,
                bounds.top + bounds.height - borderBottomWidth,
              );
        this.topLeftContentBox =
          tlh > 0 || tlv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth + paddingLeft,
                bounds.top + borderTopWidth + paddingTop,
                Math.max(0, tlh - (borderLeftWidth + paddingLeft)),
                Math.max(0, tlv - (borderTopWidth + paddingTop)),
                CORNER.TOP_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth + paddingLeft,
                bounds.top + borderTopWidth + paddingTop,
              );
        this.topRightContentBox =
          trh > 0 || trv > 0
            ? getCurvePoints(
                bounds.left +
                  Math.min(
                    topWidth,
                    bounds.width + borderLeftWidth + paddingLeft,
                  ),
                bounds.top + borderTopWidth + paddingTop,
                topWidth > bounds.width + borderLeftWidth + paddingLeft
                  ? 0
                  : trh - borderLeftWidth + paddingLeft,
                trv - (borderTopWidth + paddingTop),
                CORNER.TOP_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - (borderRightWidth + paddingRight),
                bounds.top + borderTopWidth + paddingTop,
              );
        this.bottomRightContentBox =
          brh > 0 || brv > 0
            ? getCurvePoints(
                bounds.left +
                  Math.min(
                    bottomWidth,
                    bounds.width - (borderLeftWidth + paddingLeft),
                  ),
                bounds.top +
                  Math.min(
                    rightHeight,
                    bounds.height + borderTopWidth + paddingTop,
                  ),
                Math.max(0, brh - (borderRightWidth + paddingRight)),
                brv - (borderBottomWidth + paddingBottom),
                CORNER.BOTTOM_RIGHT,
              )
            : new Vector(
                bounds.left + bounds.width - (borderRightWidth + paddingRight),
                bounds.top +
                  bounds.height -
                  (borderBottomWidth + paddingBottom),
              );
        this.bottomLeftContentBox =
          blh > 0 || blv > 0
            ? getCurvePoints(
                bounds.left + borderLeftWidth + paddingLeft,
                bounds.top + leftHeight,
                Math.max(0, blh - (borderLeftWidth + paddingLeft)),
                blv - (borderBottomWidth + paddingBottom),
                CORNER.BOTTOM_LEFT,
              )
            : new Vector(
                bounds.left + borderLeftWidth + paddingLeft,
                bounds.top +
                  bounds.height -
                  (borderBottomWidth + paddingBottom),
              );
      }
      return BoundCurves;
    })();
    var CORNER;
    (function (CORNER) {
      CORNER[(CORNER["TOP_LEFT"] = 0)] = "TOP_LEFT";
      CORNER[(CORNER["TOP_RIGHT"] = 1)] = "TOP_RIGHT";
      CORNER[(CORNER["BOTTOM_RIGHT"] = 2)] = "BOTTOM_RIGHT";
      CORNER[(CORNER["BOTTOM_LEFT"] = 3)] = "BOTTOM_LEFT";
    })(CORNER || (CORNER = {}));
    var getCurvePoints = function (x, y, r1, r2, position) {
      var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
      var ox = r1 * kappa;
      var oy = r2 * kappa;
      var xm = x + r1;
      var ym = y + r2;
      switch (position) {
        case CORNER.TOP_LEFT:
          return new BezierCurve(
            new Vector(x, ym),
            new Vector(x, ym - oy),
            new Vector(xm - ox, y),
            new Vector(xm, y),
          );
        case CORNER.TOP_RIGHT:
          return new BezierCurve(
            new Vector(x, y),
            new Vector(x + ox, y),
            new Vector(xm, ym - oy),
            new Vector(xm, ym),
          );
        case CORNER.BOTTOM_RIGHT:
          return new BezierCurve(
            new Vector(xm, y),
            new Vector(xm, y + oy),
            new Vector(x + ox, ym),
            new Vector(x, ym),
          );
        case CORNER.BOTTOM_LEFT:
        default:
          return new BezierCurve(
            new Vector(xm, ym),
            new Vector(xm - ox, ym),
            new Vector(x, y + oy),
            new Vector(x, y),
          );
      }
    };
    var calculateBorderBoxPath = function (curves) {
      return [
        curves.topLeftBorderBox,
        curves.topRightBorderBox,
        curves.bottomRightBorderBox,
        curves.bottomLeftBorderBox,
      ];
    };
    var calculateContentBoxPath = function (curves) {
      return [
        curves.topLeftContentBox,
        curves.topRightContentBox,
        curves.bottomRightContentBox,
        curves.bottomLeftContentBox,
      ];
    };
    var calculatePaddingBoxPath = function (curves) {
      return [
        curves.topLeftPaddingBox,
        curves.topRightPaddingBox,
        curves.bottomRightPaddingBox,
        curves.bottomLeftPaddingBox,
      ];
    };
    var TransformEffect = (function () {
      function TransformEffect(offsetX, offsetY, matrix) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.matrix = matrix;
        this.type = 0;
        this.target = 2 | 4;
      }
      return TransformEffect;
    })();
    var ClipEffect = (function () {
      function ClipEffect(path, target) {
        this.path = path;
        this.target = target;
        this.type = 1;
      }
      return ClipEffect;
    })();
    var OpacityEffect = (function () {
      function OpacityEffect(opacity) {
        this.opacity = opacity;
        this.type = 2;
        this.target = 2 | 4;
      }
      return OpacityEffect;
    })();
    var isTransformEffect = function (effect) {
      return effect.type === 0;
    };
    var isClipEffect = function (effect) {
      return effect.type === 1;
    };
    var isOpacityEffect = function (effect) {
      return effect.type === 2;
    };
    var equalPath = function (a, b) {
      if (a.length === b.length) {
        return a.some(function (v, i) {
          return v === b[i];
        });
      }
      return false;
    };
    var transformPath = function (path, deltaX, deltaY, deltaW, deltaH) {
      return path.map(function (point, index) {
        switch (index) {
          case 0:
            return point.add(deltaX, deltaY);
          case 1:
            return point.add(deltaX + deltaW, deltaY);
          case 2:
            return point.add(deltaX + deltaW, deltaY + deltaH);
          case 3:
            return point.add(deltaX, deltaY + deltaH);
        }
        return point;
      });
    };
    var StackingContext = (function () {
      function StackingContext(container) {
        this.element = container;
        this.inlineLevel = [];
        this.nonInlineLevel = [];
        this.negativeZIndex = [];
        this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
        this.positiveZIndex = [];
        this.nonPositionedFloats = [];
        this.nonPositionedInlineLevel = [];
      }
      return StackingContext;
    })();
    var ElementPaint = (function () {
      function ElementPaint(container, parent) {
        this.container = container;
        this.parent = parent;
        this.effects = [];
        this.curves = new BoundCurves(this.container);
        if (this.container.styles.opacity < 1) {
          this.effects.push(new OpacityEffect(this.container.styles.opacity));
        }
        if (this.container.styles.transform !== null) {
          var offsetX =
            this.container.bounds.left +
            this.container.styles.transformOrigin[0].number;
          var offsetY =
            this.container.bounds.top +
            this.container.styles.transformOrigin[1].number;
          var matrix = this.container.styles.transform;
          this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
        }
        if (this.container.styles.overflowX !== 0) {
          var borderBox = calculateBorderBoxPath(this.curves);
          var paddingBox = calculatePaddingBoxPath(this.curves);
          if (equalPath(borderBox, paddingBox)) {
            this.effects.push(new ClipEffect(borderBox, 2 | 4));
          } else {
            this.effects.push(new ClipEffect(borderBox, 2));
            this.effects.push(new ClipEffect(paddingBox, 4));
          }
        }
      }
      ElementPaint.prototype.getEffects = function (target) {
        var inFlow = [2, 3].indexOf(this.container.styles.position) === -1;
        var parent = this.parent;
        var effects = this.effects.slice(0);
        while (parent) {
          var croplessEffects = parent.effects.filter(function (effect) {
            return !isClipEffect(effect);
          });
          if (
            inFlow ||
            parent.container.styles.position !== 0 ||
            !parent.parent
          ) {
            effects.unshift.apply(effects, croplessEffects);
            inFlow = [2, 3].indexOf(parent.container.styles.position) === -1;
            if (parent.container.styles.overflowX !== 0) {
              var borderBox = calculateBorderBoxPath(parent.curves);
              var paddingBox = calculatePaddingBoxPath(parent.curves);
              if (!equalPath(borderBox, paddingBox)) {
                effects.unshift(new ClipEffect(paddingBox, 2 | 4));
              }
            }
          } else {
            effects.unshift.apply(effects, croplessEffects);
          }
          parent = parent.parent;
        }
        return effects.filter(function (effect) {
          return contains(effect.target, target);
        });
      };
      return ElementPaint;
    })();
    var parseStackTree = function (
      parent,
      stackingContext,
      realStackingContext,
      listItems,
    ) {
      parent.container.elements.forEach(function (child) {
        var treatAsRealStackingContext = contains(child.flags, 4);
        var createsStackingContext = contains(child.flags, 2);
        var paintContainer = new ElementPaint(child, parent);
        if (contains(child.styles.display, 2048)) {
          listItems.push(paintContainer);
        }
        var listOwnerItems = contains(child.flags, 8) ? [] : listItems;
        if (treatAsRealStackingContext || createsStackingContext) {
          var parentStack =
            treatAsRealStackingContext || child.styles.isPositioned()
              ? realStackingContext
              : stackingContext;
          var stack = new StackingContext(paintContainer);
          if (
            child.styles.isPositioned() ||
            child.styles.opacity < 1 ||
            child.styles.isTransformed()
          ) {
            var order_1 = child.styles.zIndex.order;
            if (order_1 < 0) {
              var index_1 = 0;
              parentStack.negativeZIndex.some(function (current, i) {
                if (order_1 > current.element.container.styles.zIndex.order) {
                  index_1 = i;
                  return false;
                } else if (index_1 > 0) {
                  return true;
                }
                return false;
              });
              parentStack.negativeZIndex.splice(index_1, 0, stack);
            } else if (order_1 > 0) {
              var index_2 = 0;
              parentStack.positiveZIndex.some(function (current, i) {
                if (order_1 >= current.element.container.styles.zIndex.order) {
                  index_2 = i + 1;
                  return false;
                } else if (index_2 > 0) {
                  return true;
                }
                return false;
              });
              parentStack.positiveZIndex.splice(index_2, 0, stack);
            } else {
              parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
            }
          } else {
            if (child.styles.isFloating()) {
              parentStack.nonPositionedFloats.push(stack);
            } else {
              parentStack.nonPositionedInlineLevel.push(stack);
            }
          }
          parseStackTree(
            paintContainer,
            stack,
            treatAsRealStackingContext ? stack : realStackingContext,
            listOwnerItems,
          );
        } else {
          if (child.styles.isInlineLevel()) {
            stackingContext.inlineLevel.push(paintContainer);
          } else {
            stackingContext.nonInlineLevel.push(paintContainer);
          }
          parseStackTree(
            paintContainer,
            stackingContext,
            realStackingContext,
            listOwnerItems,
          );
        }
        if (contains(child.flags, 8)) {
          processListItems(child, listOwnerItems);
        }
      });
    };
    var processListItems = function (owner, elements) {
      var numbering = owner instanceof OLElementContainer ? owner.start : 1;
      var reversed =
        owner instanceof OLElementContainer ? owner.reversed : false;
      for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        if (
          item.container instanceof LIElementContainer &&
          typeof item.container.value === "number" &&
          item.container.value !== 0
        ) {
          numbering = item.container.value;
        }
        item.listValue = createCounterText(
          numbering,
          item.container.styles.listStyleType,
          true,
        );
        numbering += reversed ? -1 : 1;
      }
    };
    var parseStackingContexts = function (container) {
      var paintContainer = new ElementPaint(container, null);
      var root = new StackingContext(paintContainer);
      var listItems = [];
      parseStackTree(paintContainer, root, root, listItems);
      processListItems(paintContainer.container, listItems);
      return root;
    };
    var parsePathForBorder = function (curves, borderSide) {
      switch (borderSide) {
        case 0:
          return createPathFromCurves(
            curves.topLeftBorderBox,
            curves.topLeftPaddingBox,
            curves.topRightBorderBox,
            curves.topRightPaddingBox,
          );
        case 1:
          return createPathFromCurves(
            curves.topRightBorderBox,
            curves.topRightPaddingBox,
            curves.bottomRightBorderBox,
            curves.bottomRightPaddingBox,
          );
        case 2:
          return createPathFromCurves(
            curves.bottomRightBorderBox,
            curves.bottomRightPaddingBox,
            curves.bottomLeftBorderBox,
            curves.bottomLeftPaddingBox,
          );
        case 3:
        default:
          return createPathFromCurves(
            curves.bottomLeftBorderBox,
            curves.bottomLeftPaddingBox,
            curves.topLeftBorderBox,
            curves.topLeftPaddingBox,
          );
      }
    };
    var parsePathForBorderDoubleOuter = function (curves, borderSide) {
      switch (borderSide) {
        case 0:
          return createPathFromCurves(
            curves.topLeftBorderBox,
            curves.topLeftBorderDoubleOuterBox,
            curves.topRightBorderBox,
            curves.topRightBorderDoubleOuterBox,
          );
        case 1:
          return createPathFromCurves(
            curves.topRightBorderBox,
            curves.topRightBorderDoubleOuterBox,
            curves.bottomRightBorderBox,
            curves.bottomRightBorderDoubleOuterBox,
          );
        case 2:
          return createPathFromCurves(
            curves.bottomRightBorderBox,
            curves.bottomRightBorderDoubleOuterBox,
            curves.bottomLeftBorderBox,
            curves.bottomLeftBorderDoubleOuterBox,
          );
        case 3:
        default:
          return createPathFromCurves(
            curves.bottomLeftBorderBox,
            curves.bottomLeftBorderDoubleOuterBox,
            curves.topLeftBorderBox,
            curves.topLeftBorderDoubleOuterBox,
          );
      }
    };
    var parsePathForBorderDoubleInner = function (curves, borderSide) {
      switch (borderSide) {
        case 0:
          return createPathFromCurves(
            curves.topLeftBorderDoubleInnerBox,
            curves.topLeftPaddingBox,
            curves.topRightBorderDoubleInnerBox,
            curves.topRightPaddingBox,
          );
        case 1:
          return createPathFromCurves(
            curves.topRightBorderDoubleInnerBox,
            curves.topRightPaddingBox,
            curves.bottomRightBorderDoubleInnerBox,
            curves.bottomRightPaddingBox,
          );
        case 2:
          return createPathFromCurves(
            curves.bottomRightBorderDoubleInnerBox,
            curves.bottomRightPaddingBox,
            curves.bottomLeftBorderDoubleInnerBox,
            curves.bottomLeftPaddingBox,
          );
        case 3:
        default:
          return createPathFromCurves(
            curves.bottomLeftBorderDoubleInnerBox,
            curves.bottomLeftPaddingBox,
            curves.topLeftBorderDoubleInnerBox,
            curves.topLeftPaddingBox,
          );
      }
    };
    var parsePathForBorderStroke = function (curves, borderSide) {
      switch (borderSide) {
        case 0:
          return createStrokePathFromCurves(
            curves.topLeftBorderStroke,
            curves.topRightBorderStroke,
          );
        case 1:
          return createStrokePathFromCurves(
            curves.topRightBorderStroke,
            curves.bottomRightBorderStroke,
          );
        case 2:
          return createStrokePathFromCurves(
            curves.bottomRightBorderStroke,
            curves.bottomLeftBorderStroke,
          );
        case 3:
        default:
          return createStrokePathFromCurves(
            curves.bottomLeftBorderStroke,
            curves.topLeftBorderStroke,
          );
      }
    };
    var createStrokePathFromCurves = function (outer1, outer2) {
      var path = [];
      if (isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
      } else {
        path.push(outer1);
      }
      if (isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
      } else {
        path.push(outer2);
      }
      return path;
    };
    var createPathFromCurves = function (outer1, inner1, outer2, inner2) {
      var path = [];
      if (isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
      } else {
        path.push(outer1);
      }
      if (isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
      } else {
        path.push(outer2);
      }
      if (isBezierCurve(inner2)) {
        path.push(inner2.subdivide(0.5, true).reverse());
      } else {
        path.push(inner2);
      }
      if (isBezierCurve(inner1)) {
        path.push(inner1.subdivide(0.5, false).reverse());
      } else {
        path.push(inner1);
      }
      return path;
    };
    var paddingBox = function (element) {
      var bounds = element.bounds;
      var styles = element.styles;
      return bounds.add(
        styles.borderLeftWidth,
        styles.borderTopWidth,
        -(styles.borderRightWidth + styles.borderLeftWidth),
        -(styles.borderTopWidth + styles.borderBottomWidth),
      );
    };
    var contentBox = function (element) {
      var styles = element.styles;
      var bounds = element.bounds;
      var paddingLeft = getAbsoluteValue(styles.paddingLeft, bounds.width);
      var paddingRight = getAbsoluteValue(styles.paddingRight, bounds.width);
      var paddingTop = getAbsoluteValue(styles.paddingTop, bounds.width);
      var paddingBottom = getAbsoluteValue(styles.paddingBottom, bounds.width);
      return bounds.add(
        paddingLeft + styles.borderLeftWidth,
        paddingTop + styles.borderTopWidth,
        -(
          styles.borderRightWidth +
          styles.borderLeftWidth +
          paddingLeft +
          paddingRight
        ),
        -(
          styles.borderTopWidth +
          styles.borderBottomWidth +
          paddingTop +
          paddingBottom
        ),
      );
    };
    var calculateBackgroundPositioningArea = function (
      backgroundOrigin,
      element,
    ) {
      if (backgroundOrigin === 0) {
        return element.bounds;
      }
      if (backgroundOrigin === 2) {
        return contentBox(element);
      }
      return paddingBox(element);
    };
    var calculateBackgroundPaintingArea = function (backgroundClip, element) {
      if (backgroundClip === 0) {
        return element.bounds;
      }
      if (backgroundClip === 2) {
        return contentBox(element);
      }
      return paddingBox(element);
    };
    var calculateBackgroundRendering = function (
      container,
      index,
      intrinsicSize,
    ) {
      var backgroundPositioningArea = calculateBackgroundPositioningArea(
        getBackgroundValueForIndex(container.styles.backgroundOrigin, index),
        container,
      );
      var backgroundPaintingArea = calculateBackgroundPaintingArea(
        getBackgroundValueForIndex(container.styles.backgroundClip, index),
        container,
      );
      var backgroundImageSize = calculateBackgroundSize(
        getBackgroundValueForIndex(container.styles.backgroundSize, index),
        intrinsicSize,
        backgroundPositioningArea,
      );
      var sizeWidth = backgroundImageSize[0],
        sizeHeight = backgroundImageSize[1];
      var position = getAbsoluteValueForTuple(
        getBackgroundValueForIndex(container.styles.backgroundPosition, index),
        backgroundPositioningArea.width - sizeWidth,
        backgroundPositioningArea.height - sizeHeight,
      );
      var path = calculateBackgroundRepeatPath(
        getBackgroundValueForIndex(container.styles.backgroundRepeat, index),
        position,
        backgroundImageSize,
        backgroundPositioningArea,
        backgroundPaintingArea,
      );
      var offsetX = Math.round(backgroundPositioningArea.left + position[0]);
      var offsetY = Math.round(backgroundPositioningArea.top + position[1]);
      return [path, offsetX, offsetY, sizeWidth, sizeHeight];
    };
    var isAuto = function (token) {
      return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO;
    };
    var hasIntrinsicValue = function (value) {
      return typeof value === "number";
    };
    var calculateBackgroundSize = function (size, _a, bounds) {
      var intrinsicWidth = _a[0],
        intrinsicHeight = _a[1],
        intrinsicProportion = _a[2];
      var first = size[0],
        second = size[1];
      if (!first) {
        return [0, 0];
      }
      if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
        return [
          getAbsoluteValue(first, bounds.width),
          getAbsoluteValue(second, bounds.height),
        ];
      }
      var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
      if (
        isIdentToken(first) &&
        (first.value === BACKGROUND_SIZE.CONTAIN ||
          first.value === BACKGROUND_SIZE.COVER)
      ) {
        if (hasIntrinsicValue(intrinsicProportion)) {
          var targetRatio = bounds.width / bounds.height;
          return targetRatio < intrinsicProportion !==
            (first.value === BACKGROUND_SIZE.COVER)
            ? [bounds.width, bounds.width / intrinsicProportion]
            : [bounds.height * intrinsicProportion, bounds.height];
        }
        return [bounds.width, bounds.height];
      }
      var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
      var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
      var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;

      if (isAuto(first) && (!second || isAuto(second))) {
        if (hasIntrinsicWidth && hasIntrinsicHeight) {
          return [intrinsicWidth, intrinsicHeight];
        }

        if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
          return [bounds.width, bounds.height];
        }

        if (hasIntrinsicDimensions && hasIntrinsicProportion) {
          var width_1 = hasIntrinsicWidth
            ? intrinsicWidth
            : intrinsicHeight * intrinsicProportion;
          var height_1 = hasIntrinsicHeight
            ? intrinsicHeight
            : intrinsicWidth / intrinsicProportion;
          return [width_1, height_1];
        }

        var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
        var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
        return [width_2, height_2];
      }

      if (hasIntrinsicProportion) {
        var width_3 = 0;
        var height_3 = 0;
        if (isLengthPercentage(first)) {
          width_3 = getAbsoluteValue(first, bounds.width);
        } else if (isLengthPercentage(second)) {
          height_3 = getAbsoluteValue(second, bounds.height);
        }
        if (isAuto(first)) {
          width_3 = height_3 * intrinsicProportion;
        } else if (!second || isAuto(second)) {
          height_3 = width_3 / intrinsicProportion;
        }
        return [width_3, height_3];
      }

      var width = null;
      var height = null;
      if (isLengthPercentage(first)) {
        width = getAbsoluteValue(first, bounds.width);
      } else if (second && isLengthPercentage(second)) {
        height = getAbsoluteValue(second, bounds.height);
      }
      if (width !== null && (!second || isAuto(second))) {
        height =
          hasIntrinsicWidth && hasIntrinsicHeight
            ? (width / intrinsicWidth) * intrinsicHeight
            : bounds.height;
      }
      if (height !== null && isAuto(first)) {
        width =
          hasIntrinsicWidth && hasIntrinsicHeight
            ? (height / intrinsicHeight) * intrinsicWidth
            : bounds.width;
      }
      if (width !== null && height !== null) {
        return [width, height];
      }
      throw new Error("Unable to calculate background-size for element");
    };
    var getBackgroundValueForIndex = function (values, index) {
      var value = values[index];
      if (typeof value === "undefined") {
        return values[0];
      }
      return value;
    };
    var calculateBackgroundRepeatPath = function (
      repeat,
      _a,
      _b,
      backgroundPositioningArea,
      backgroundPaintingArea,
    ) {
      var x = _a[0],
        y = _a[1];
      var width = _b[0],
        height = _b[1];
      switch (repeat) {
        case 2:
          return [
            new Vector(
              Math.round(backgroundPositioningArea.left),
              Math.round(backgroundPositioningArea.top + y),
            ),
            new Vector(
              Math.round(
                backgroundPositioningArea.left +
                  backgroundPositioningArea.width,
              ),
              Math.round(backgroundPositioningArea.top + y),
            ),
            new Vector(
              Math.round(
                backgroundPositioningArea.left +
                  backgroundPositioningArea.width,
              ),
              Math.round(height + backgroundPositioningArea.top + y),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left),
              Math.round(height + backgroundPositioningArea.top + y),
            ),
          ];
        case 3:
          return [
            new Vector(
              Math.round(backgroundPositioningArea.left + x),
              Math.round(backgroundPositioningArea.top),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left + x + width),
              Math.round(backgroundPositioningArea.top),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left + x + width),
              Math.round(
                backgroundPositioningArea.height +
                  backgroundPositioningArea.top,
              ),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left + x),
              Math.round(
                backgroundPositioningArea.height +
                  backgroundPositioningArea.top,
              ),
            ),
          ];
        case 1:
          return [
            new Vector(
              Math.round(backgroundPositioningArea.left + x),
              Math.round(backgroundPositioningArea.top + y),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left + x + width),
              Math.round(backgroundPositioningArea.top + y),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left + x + width),
              Math.round(backgroundPositioningArea.top + y + height),
            ),
            new Vector(
              Math.round(backgroundPositioningArea.left + x),
              Math.round(backgroundPositioningArea.top + y + height),
            ),
          ];
        default:
          return [
            new Vector(
              Math.round(backgroundPaintingArea.left),
              Math.round(backgroundPaintingArea.top),
            ),
            new Vector(
              Math.round(
                backgroundPaintingArea.left + backgroundPaintingArea.width,
              ),
              Math.round(backgroundPaintingArea.top),
            ),
            new Vector(
              Math.round(
                backgroundPaintingArea.left + backgroundPaintingArea.width,
              ),
              Math.round(
                backgroundPaintingArea.height + backgroundPaintingArea.top,
              ),
            ),
            new Vector(
              Math.round(backgroundPaintingArea.left),
              Math.round(
                backgroundPaintingArea.height + backgroundPaintingArea.top,
              ),
            ),
          ];
      }
    };
    var SMALL_IMAGE =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    var SAMPLE_TEXT = "Hidden Text";
    var FontMetrics = (function () {
      function FontMetrics(document1) {
        this._data = {};
        this._document = document1;
      }
      FontMetrics.prototype.parseMetrics = function (fontFamily, fontSize) {
        var container = this._document.createElement("div");
        var img = this._document.createElement("img");
        var span = this._document.createElement("span");
        var body = this._document.body;
        container.style.visibility = "hidden";
        container.style.fontFamily = fontFamily;
        container.style.fontSize = fontSize;
        container.style.margin = "0";
        container.style.padding = "0";
        container.style.whiteSpace = "nowrap";
        body.appendChild(container);
        img.src = SMALL_IMAGE;
        img.width = 1;
        img.height = 1;
        img.style.margin = "0";
        img.style.padding = "0";
        img.style.verticalAlign = "baseline";
        span.style.fontFamily = fontFamily;
        span.style.fontSize = fontSize;
        span.style.margin = "0";
        span.style.padding = "0";
        span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
        container.appendChild(span);
        container.appendChild(img);
        var baseline = img.offsetTop - span.offsetTop + 2;
        container.removeChild(span);
        container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
        container.style.lineHeight = "normal";
        img.style.verticalAlign = "super";
        var middle = img.offsetTop - container.offsetTop + 2;
        body.removeChild(container);
        return {
          baseline: baseline,
          middle: middle,
        };
      };
      FontMetrics.prototype.getMetrics = function (fontFamily, fontSize) {
        var key = fontFamily + " " + fontSize;
        if (typeof this._data[key] === "undefined") {
          this._data[key] = this.parseMetrics(fontFamily, fontSize);
        }
        return this._data[key];
      };
      return FontMetrics;
    })();
    var Renderer = (function () {
      function Renderer(context, options) {
        this.context = context;
        this.options = options;
      }
      return Renderer;
    })();
    var MASK_OFFSET = 10000;
    var CanvasRenderer = (function (_super) {
      __extends(CanvasRenderer, _super);
      function CanvasRenderer(context, options) {
        var _this = _super.call(this, context, options) || this;
        _this._activeEffects = [];
        _this.canvas = options.canvas
          ? options.canvas
          : document.createElement("canvas");
        _this.ctx = _this.canvas.getContext("2d");
        if (!options.canvas) {
          _this.canvas.width = Math.floor(options.width * options.scale);
          _this.canvas.height = Math.floor(options.height * options.scale);
          _this.canvas.style.width = options.width + "px";
          _this.canvas.style.height = options.height + "px";
        }
        _this.fontMetrics = new FontMetrics(document);
        _this.ctx.scale(_this.options.scale, _this.options.scale);
        _this.ctx.translate(-options.x, -options.y);
        _this.ctx.textBaseline = "bottom";
        _this._activeEffects = [];
        _this.context.logger.debug(
          "Canvas renderer initialized (" +
            options.width +
            "x" +
            options.height +
            ") with scale " +
            options.scale,
        );
        return _this;
      }
      CanvasRenderer.prototype.applyEffects = function (effects) {
        var _this = this;
        while (this._activeEffects.length) {
          this.popEffect();
        }
        effects.forEach(function (effect) {
          return _this.applyEffect(effect);
        });
      };
      CanvasRenderer.prototype.applyEffect = function (effect) {
        this.ctx.save();
        if (isOpacityEffect(effect)) {
          this.ctx.globalAlpha = effect.opacity;
        }
        if (isTransformEffect(effect)) {
          this.ctx.translate(effect.offsetX, effect.offsetY);
          this.ctx.transform(
            effect.matrix[0],
            effect.matrix[1],
            effect.matrix[2],
            effect.matrix[3],
            effect.matrix[4],
            effect.matrix[5],
          );
          this.ctx.translate(-effect.offsetX, -effect.offsetY);
        }
        if (isClipEffect(effect)) {
          this.path(effect.path);
          this.ctx.clip();
        }
        this._activeEffects.push(effect);
      };
      CanvasRenderer.prototype.popEffect = function () {
        this._activeEffects.pop();
        this.ctx.restore();
      };
      CanvasRenderer.prototype.renderStack = function (stack) {
        return __awaiter(this, void 0, void 0, function () {
          var styles;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                styles = stack.element.container.styles;
                if (!styles.isVisible()) return [3, 2];
                return [4, this.renderStackContent(stack)];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.renderNode = function (paint) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (contains(paint.container.flags, 16)) {
                  debugger;
                }
                if (!paint.container.styles.isVisible()) return [3, 3];
                return [4, this.renderNodeBackgroundAndBorders(paint)];
              case 1:
                _a.sent();
                return [4, this.renderNodeContent(paint)];
              case 2:
                _a.sent();
                _a.label = 3;
              case 3:
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.renderTextWithLetterSpacing = function (
        text,
        letterSpacing,
        baseline,
      ) {
        var _this = this;
        if (letterSpacing === 0) {
          this.ctx.fillText(
            text.text,
            text.bounds.left,
            text.bounds.top + baseline,
          );
        } else {
          var letters = segmentGraphemes(text.text);
          letters.reduce(function (left, letter) {
            _this.ctx.fillText(letter, left, text.bounds.top + baseline);
            return left + _this.ctx.measureText(letter).width;
          }, text.bounds.left);
        }
      };
      CanvasRenderer.prototype.createFontStyle = function (styles) {
        var fontVariant = styles.fontVariant
          .filter(function (variant) {
            return variant === "normal" || variant === "small-caps";
          })
          .join("");
        var fontFamily = fixIOSSystemFonts(styles.fontFamily).join(", ");
        var fontSize = isDimensionToken(styles.fontSize)
          ? "" + styles.fontSize.number + styles.fontSize.unit
          : styles.fontSize.number + "px";
        return [
          [
            styles.fontStyle,
            fontVariant,
            styles.fontWeight,
            fontSize,
            fontFamily,
          ].join(" "),
          fontFamily,
          fontSize,
        ];
      };
      CanvasRenderer.prototype.renderTextNode = function (text, styles) {
        return __awaiter(this, void 0, void 0, function () {
          var _a, font, fontFamily, fontSize, _b, baseline, middle, paintOrder;
          var _this = this;
          return __generator(this, function (_c) {
            ((_a = this.createFontStyle(styles)),
              (font = _a[0]),
              (fontFamily = _a[1]),
              (fontSize = _a[2]));
            this.ctx.font = font;
            this.ctx.direction = styles.direction === 1 ? "rtl" : "ltr";
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "alphabetic";
            ((_b = this.fontMetrics.getMetrics(fontFamily, fontSize)),
              (baseline = _b.baseline),
              (middle = _b.middle));
            paintOrder = styles.paintOrder;
            text.textBounds.forEach(function (text) {
              paintOrder.forEach(function (paintOrderLayer) {
                switch (paintOrderLayer) {
                  case 0:
                    _this.ctx.fillStyle = asString(styles.color);
                    _this.renderTextWithLetterSpacing(
                      text,
                      styles.letterSpacing,
                      baseline,
                    );
                    var textShadows = styles.textShadow;
                    if (textShadows.length && text.text.trim().length) {
                      textShadows
                        .slice(0)
                        .reverse()
                        .forEach(function (textShadow) {
                          _this.ctx.shadowColor = asString(textShadow.color);
                          _this.ctx.shadowOffsetX =
                            textShadow.offsetX.number * _this.options.scale;
                          _this.ctx.shadowOffsetY =
                            textShadow.offsetY.number * _this.options.scale;
                          _this.ctx.shadowBlur = textShadow.blur.number;
                          _this.renderTextWithLetterSpacing(
                            text,
                            styles.letterSpacing,
                            baseline,
                          );
                        });
                      _this.ctx.shadowColor = "";
                      _this.ctx.shadowOffsetX = 0;
                      _this.ctx.shadowOffsetY = 0;
                      _this.ctx.shadowBlur = 0;
                    }
                    if (styles.textDecorationLine.length) {
                      _this.ctx.fillStyle = asString(
                        styles.textDecorationColor || styles.color,
                      );
                      styles.textDecorationLine.forEach(
                        function (textDecorationLine) {
                          switch (textDecorationLine) {
                            case 1:
                              _this.ctx.fillRect(
                                text.bounds.left,
                                Math.round(text.bounds.top + baseline),
                                text.bounds.width,
                                1,
                              );
                              break;
                            case 2:
                              _this.ctx.fillRect(
                                text.bounds.left,
                                Math.round(text.bounds.top),
                                text.bounds.width,
                                1,
                              );
                              break;
                            case 3:
                              _this.ctx.fillRect(
                                text.bounds.left,
                                Math.ceil(text.bounds.top + middle),
                                text.bounds.width,
                                1,
                              );
                              break;
                          }
                        },
                      );
                    }
                    break;
                  case 1:
                    if (
                      styles.webkitTextStrokeWidth &&
                      text.text.trim().length
                    ) {
                      _this.ctx.strokeStyle = asString(
                        styles.webkitTextStrokeColor,
                      );
                      _this.ctx.lineWidth = styles.webkitTextStrokeWidth;

                      _this.ctx.lineJoin = !!window.chrome ? "miter" : "round";
                      _this.ctx.strokeText(
                        text.text,
                        text.bounds.left,
                        text.bounds.top + baseline,
                      );
                    }
                    _this.ctx.strokeStyle = "";
                    _this.ctx.lineWidth = 0;
                    _this.ctx.lineJoin = "miter";
                    break;
                }
              });
            });
            return [2];
          });
        });
      };
      CanvasRenderer.prototype.renderReplacedElement = function (
        container,
        curves,
        image,
      ) {
        if (
          image &&
          container.intrinsicWidth > 0 &&
          container.intrinsicHeight > 0
        ) {
          var box = contentBox(container);
          var path = calculatePaddingBoxPath(curves);
          this.path(path);
          this.ctx.save();
          this.ctx.clip();
          this.ctx.drawImage(
            image,
            0,
            0,
            container.intrinsicWidth,
            container.intrinsicHeight,
            box.left,
            box.top,
            box.width,
            box.height,
          );
          this.ctx.restore();
        }
      };
      CanvasRenderer.prototype.renderNodeContent = function (paint) {
        return __awaiter(this, void 0, void 0, function () {
          var container,
            curves,
            styles,
            _i,
            _a,
            child,
            image,
            image,
            iframeRenderer,
            canvas,
            size,
            _b,
            fontFamily,
            fontSize,
            baseline,
            bounds,
            x,
            textBounds,
            img,
            image,
            url,
            fontFamily,
            bounds;
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                this.applyEffects(paint.getEffects(4));
                container = paint.container;
                curves = paint.curves;
                styles = container.styles;
                ((_i = 0), (_a = container.textNodes));
                _c.label = 1;
              case 1:
                if (!(_i < _a.length)) return [3, 4];
                child = _a[_i];
                return [4, this.renderTextNode(child, styles)];
              case 2:
                _c.sent();
                _c.label = 3;
              case 3:
                _i++;
                return [3, 1];
              case 4:
                if (!(container instanceof ImageElementContainer))
                  return [3, 8];
                _c.label = 5;
              case 5:
                _c.trys.push([5, 7, , 8]);
                return [4, this.context.cache.match(container.src)];
              case 6:
                image = _c.sent();
                this.renderReplacedElement(container, curves, image);
                return [3, 8];
              case 7:
                _c.sent();
                this.context.logger.error(
                  "Error loading image " + container.src,
                );
                return [3, 8];
              case 8:
                if (container instanceof CanvasElementContainer) {
                  this.renderReplacedElement(
                    container,
                    curves,
                    container.canvas,
                  );
                }
                if (!(container instanceof SVGElementContainer)) return [3, 12];
                _c.label = 9;
              case 9:
                _c.trys.push([9, 11, , 12]);
                return [4, this.context.cache.match(container.svg)];
              case 10:
                image = _c.sent();
                this.renderReplacedElement(container, curves, image);
                return [3, 12];
              case 11:
                _c.sent();
                this.context.logger.error(
                  "Error loading svg " + container.svg.substring(0, 255),
                );
                return [3, 12];
              case 12:
                if (
                  !(
                    container instanceof IFrameElementContainer &&
                    container.tree
                  )
                )
                  return [3, 14];
                iframeRenderer = new CanvasRenderer(this.context, {
                  scale: this.options.scale,
                  backgroundColor: container.backgroundColor,
                  x: 0,
                  y: 0,
                  width: container.width,
                  height: container.height,
                });
                return [4, iframeRenderer.render(container.tree)];
              case 13:
                canvas = _c.sent();
                if (container.width && container.height) {
                  this.ctx.drawImage(
                    canvas,
                    0,
                    0,
                    container.width,
                    container.height,
                    container.bounds.left,
                    container.bounds.top,
                    container.bounds.width,
                    container.bounds.height,
                  );
                }
                _c.label = 14;
              case 14:
                if (container instanceof InputElementContainer) {
                  size = Math.min(
                    container.bounds.width,
                    container.bounds.height,
                  );
                  if (container.type === CHECKBOX) {
                    if (container.checked) {
                      this.ctx.save();
                      this.path([
                        new Vector(
                          container.bounds.left + size * 0.39363,
                          container.bounds.top + size * 0.79,
                        ),
                        new Vector(
                          container.bounds.left + size * 0.16,
                          container.bounds.top + size * 0.5549,
                        ),
                        new Vector(
                          container.bounds.left + size * 0.27347,
                          container.bounds.top + size * 0.44071,
                        ),
                        new Vector(
                          container.bounds.left + size * 0.39694,
                          container.bounds.top + size * 0.5649,
                        ),
                        new Vector(
                          container.bounds.left + size * 0.72983,
                          container.bounds.top + size * 0.23,
                        ),
                        new Vector(
                          container.bounds.left + size * 0.84,
                          container.bounds.top + size * 0.34085,
                        ),
                        new Vector(
                          container.bounds.left + size * 0.39363,
                          container.bounds.top + size * 0.79,
                        ),
                      ]);
                      this.ctx.fillStyle = asString(INPUT_COLOR);
                      this.ctx.fill();
                      this.ctx.restore();
                    }
                  } else if (container.type === RADIO) {
                    if (container.checked) {
                      this.ctx.save();
                      this.ctx.beginPath();
                      this.ctx.arc(
                        container.bounds.left + size / 2,
                        container.bounds.top + size / 2,
                        size / 4,
                        0,
                        Math.PI * 2,
                        true,
                      );
                      this.ctx.fillStyle = asString(INPUT_COLOR);
                      this.ctx.fill();
                      this.ctx.restore();
                    }
                  }
                }
                if (isTextInputElement(container) && container.value.length) {
                  ((_b = this.createFontStyle(styles)),
                    (fontFamily = _b[0]),
                    (fontSize = _b[1]));
                  baseline = this.fontMetrics.getMetrics(
                    fontFamily,
                    fontSize,
                  ).baseline;
                  this.ctx.font = fontFamily;
                  this.ctx.fillStyle = asString(styles.color);
                  this.ctx.textBaseline = "alphabetic";
                  this.ctx.textAlign = canvasTextAlign(
                    container.styles.textAlign,
                  );
                  bounds = contentBox(container);
                  x = 0;
                  switch (container.styles.textAlign) {
                    case 1:
                      x += bounds.width / 2;
                      break;
                    case 2:
                      x += bounds.width;
                      break;
                  }
                  textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                  this.ctx.save();
                  this.path([
                    new Vector(bounds.left, bounds.top),
                    new Vector(bounds.left + bounds.width, bounds.top),
                    new Vector(
                      bounds.left + bounds.width,
                      bounds.top + bounds.height,
                    ),
                    new Vector(bounds.left, bounds.top + bounds.height),
                  ]);
                  this.ctx.clip();
                  this.renderTextWithLetterSpacing(
                    new TextBounds(container.value, textBounds),
                    styles.letterSpacing,
                    baseline,
                  );
                  this.ctx.restore();
                  this.ctx.textBaseline = "alphabetic";
                  this.ctx.textAlign = "left";
                }
                if (!contains(container.styles.display, 2048)) return [3, 20];
                if (!(container.styles.listStyleImage !== null)) return [3, 19];
                img = container.styles.listStyleImage;
                if (!(img.type === 0)) return [3, 18];
                image = void 0;
                url = img.url;
                _c.label = 15;
              case 15:
                _c.trys.push([15, 17, , 18]);
                return [4, this.context.cache.match(url)];
              case 16:
                image = _c.sent();
                this.ctx.drawImage(
                  image,
                  container.bounds.left - (image.width + 10),
                  container.bounds.top,
                );
                return [3, 18];
              case 17:
                _c.sent();
                this.context.logger.error(
                  "Error loading list-style-image " + url,
                );
                return [3, 18];
              case 18:
                return [3, 20];
              case 19:
                if (paint.listValue && container.styles.listStyleType !== -1) {
                  fontFamily = this.createFontStyle(styles)[0];
                  this.ctx.font = fontFamily;
                  this.ctx.fillStyle = asString(styles.color);
                  this.ctx.textBaseline = "middle";
                  this.ctx.textAlign = "right";
                  bounds = new Bounds(
                    container.bounds.left,
                    container.bounds.top +
                      getAbsoluteValue(
                        container.styles.paddingTop,
                        container.bounds.width,
                      ),
                    container.bounds.width,
                    computeLineHeight(
                      styles.lineHeight,
                      styles.fontSize.number,
                    ) /
                      2 +
                      1,
                  );
                  this.renderTextWithLetterSpacing(
                    new TextBounds(paint.listValue, bounds),
                    styles.letterSpacing,
                    computeLineHeight(
                      styles.lineHeight,
                      styles.fontSize.number,
                    ) /
                      2 +
                      2,
                  );
                  this.ctx.textBaseline = "bottom";
                  this.ctx.textAlign = "left";
                }
                _c.label = 20;
              case 20:
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.renderStackContent = function (stack) {
        return __awaiter(this, void 0, void 0, function () {
          var _i,
            _a,
            child,
            _b,
            _c,
            child,
            _d,
            _e,
            child,
            _f,
            _g,
            child,
            _h,
            _j,
            child,
            _k,
            _l,
            child,
            _m,
            _o,
            child;
          return __generator(this, function (_p) {
            switch (_p.label) {
              case 0:
                if (contains(stack.element.container.flags, 16)) {
                  debugger;
                }

                return [4, this.renderNodeBackgroundAndBorders(stack.element)];
              case 1:
                _p.sent();
                ((_i = 0), (_a = stack.negativeZIndex));
                _p.label = 2;
              case 2:
                if (!(_i < _a.length)) return [3, 5];
                child = _a[_i];
                return [4, this.renderStack(child)];
              case 3:
                _p.sent();
                _p.label = 4;
              case 4:
                _i++;
                return [3, 2];
              case 5:
                return [4, this.renderNodeContent(stack.element)];
              case 6:
                _p.sent();
                ((_b = 0), (_c = stack.nonInlineLevel));
                _p.label = 7;
              case 7:
                if (!(_b < _c.length)) return [3, 10];
                child = _c[_b];
                return [4, this.renderNode(child)];
              case 8:
                _p.sent();
                _p.label = 9;
              case 9:
                _b++;
                return [3, 7];
              case 10:
                ((_d = 0), (_e = stack.nonPositionedFloats));
                _p.label = 11;
              case 11:
                if (!(_d < _e.length)) return [3, 14];
                child = _e[_d];
                return [4, this.renderStack(child)];
              case 12:
                _p.sent();
                _p.label = 13;
              case 13:
                _d++;
                return [3, 11];
              case 14:
                ((_f = 0), (_g = stack.nonPositionedInlineLevel));
                _p.label = 15;
              case 15:
                if (!(_f < _g.length)) return [3, 18];
                child = _g[_f];
                return [4, this.renderStack(child)];
              case 16:
                _p.sent();
                _p.label = 17;
              case 17:
                _f++;
                return [3, 15];
              case 18:
                ((_h = 0), (_j = stack.inlineLevel));
                _p.label = 19;
              case 19:
                if (!(_h < _j.length)) return [3, 22];
                child = _j[_h];
                return [4, this.renderNode(child)];
              case 20:
                _p.sent();
                _p.label = 21;
              case 21:
                _h++;
                return [3, 19];
              case 22:
                ((_k = 0), (_l = stack.zeroOrAutoZIndexOrTransformedOrOpacity));
                _p.label = 23;
              case 23:
                if (!(_k < _l.length)) return [3, 26];
                child = _l[_k];
                return [4, this.renderStack(child)];
              case 24:
                _p.sent();
                _p.label = 25;
              case 25:
                _k++;
                return [3, 23];
              case 26:
                ((_m = 0), (_o = stack.positiveZIndex));
                _p.label = 27;
              case 27:
                if (!(_m < _o.length)) return [3, 30];
                child = _o[_m];
                return [4, this.renderStack(child)];
              case 28:
                _p.sent();
                _p.label = 29;
              case 29:
                _m++;
                return [3, 27];
              case 30:
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.mask = function (paths) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.canvas.width, 0);
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.lineTo(0, 0);
        this.formatPath(paths.slice(0).reverse());
        this.ctx.closePath();
      };
      CanvasRenderer.prototype.path = function (paths) {
        this.ctx.beginPath();
        this.formatPath(paths);
        this.ctx.closePath();
      };
      CanvasRenderer.prototype.formatPath = function (paths) {
        var _this = this;
        paths.forEach(function (point, index) {
          var start = isBezierCurve(point) ? point.start : point;
          if (index === 0) {
            _this.ctx.moveTo(start.x, start.y);
          } else {
            _this.ctx.lineTo(start.x, start.y);
          }
          if (isBezierCurve(point)) {
            _this.ctx.bezierCurveTo(
              point.startControl.x,
              point.startControl.y,
              point.endControl.x,
              point.endControl.y,
              point.end.x,
              point.end.y,
            );
          }
        });
      };
      CanvasRenderer.prototype.renderRepeat = function (
        path,
        pattern,
        offsetX,
        offsetY,
      ) {
        this.path(path);
        this.ctx.fillStyle = pattern;
        this.ctx.translate(offsetX, offsetY);
        this.ctx.fill();
        this.ctx.translate(-offsetX, -offsetY);
      };
      CanvasRenderer.prototype.resizeImage = function (image, width, height) {
        var _a;
        if (image.width === width && image.height === height) {
          return image;
        }
        var ownerDocument =
          (_a = this.canvas.ownerDocument) !== null && _a !== void 0
            ? _a
            : document;
        var canvas = ownerDocument.createElement("canvas");
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        var ctx = canvas.getContext("2d");
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          width,
          height,
        );
        return canvas;
      };
      CanvasRenderer.prototype.renderBackgroundImage = function (container) {
        return __awaiter(this, void 0, void 0, function () {
          var index, _loop_1, this_1, _i, _a, backgroundImage;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                index = container.styles.backgroundImage.length - 1;
                _loop_1 = function (backgroundImage) {
                  var image,
                    url,
                    _c,
                    path,
                    x,
                    y,
                    width,
                    height,
                    pattern,
                    _d,
                    path,
                    x,
                    y,
                    width,
                    height,
                    _e,
                    lineLength,
                    x0,
                    x1,
                    y0,
                    y1,
                    canvas,
                    ctx,
                    gradient_1,
                    pattern,
                    _f,
                    path,
                    left,
                    top_1,
                    width,
                    height,
                    position,
                    x,
                    y,
                    _g,
                    rx,
                    ry,
                    radialGradient_1,
                    midX,
                    midY,
                    f,
                    invF;
                  return __generator(this, function (_h) {
                    switch (_h.label) {
                      case 0:
                        if (!(backgroundImage.type === 0)) return [3, 5];
                        image = void 0;
                        url = backgroundImage.url;
                        _h.label = 1;
                      case 1:
                        _h.trys.push([1, 3, , 4]);
                        return [4, this_1.context.cache.match(url)];
                      case 2:
                        image = _h.sent();
                        return [3, 4];
                      case 3:
                        _h.sent();
                        this_1.context.logger.error(
                          "Error loading background-image " + url,
                        );
                        return [3, 4];
                      case 4:
                        if (image) {
                          ((_c = calculateBackgroundRendering(
                            container,
                            index,
                            [
                              image.width,
                              image.height,
                              image.width / image.height,
                            ],
                          )),
                            (path = _c[0]),
                            (x = _c[1]),
                            (y = _c[2]),
                            (width = _c[3]),
                            (height = _c[4]));
                          pattern = this_1.ctx.createPattern(
                            this_1.resizeImage(image, width, height),
                            "repeat",
                          );
                          this_1.renderRepeat(path, pattern, x, y);
                        }
                        return [3, 6];
                      case 5:
                        if (isLinearGradient(backgroundImage)) {
                          ((_d = calculateBackgroundRendering(
                            container,
                            index,
                            [null, null, null],
                          )),
                            (path = _d[0]),
                            (x = _d[1]),
                            (y = _d[2]),
                            (width = _d[3]),
                            (height = _d[4]));
                          ((_e = calculateGradientDirection(
                            backgroundImage.angle,
                            width,
                            height,
                          )),
                            (lineLength = _e[0]),
                            (x0 = _e[1]),
                            (x1 = _e[2]),
                            (y0 = _e[3]),
                            (y1 = _e[4]));
                          canvas = document.createElement("canvas");
                          canvas.width = width;
                          canvas.height = height;
                          ctx = canvas.getContext("2d");
                          gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                          processColorStops(
                            backgroundImage.stops,
                            lineLength,
                          ).forEach(function (colorStop) {
                            return gradient_1.addColorStop(
                              colorStop.stop,
                              asString(colorStop.color),
                            );
                          });
                          ctx.fillStyle = gradient_1;
                          ctx.fillRect(0, 0, width, height);
                          if (width > 0 && height > 0) {
                            pattern = this_1.ctx.createPattern(
                              canvas,
                              "repeat",
                            );
                            this_1.renderRepeat(path, pattern, x, y);
                          }
                        } else if (isRadialGradient(backgroundImage)) {
                          ((_f = calculateBackgroundRendering(
                            container,
                            index,
                            [null, null, null],
                          )),
                            (path = _f[0]),
                            (left = _f[1]),
                            (top_1 = _f[2]),
                            (width = _f[3]),
                            (height = _f[4]));
                          position =
                            backgroundImage.position.length === 0
                              ? [FIFTY_PERCENT]
                              : backgroundImage.position;
                          x = getAbsoluteValue(position[0], width);
                          y = getAbsoluteValue(
                            position[position.length - 1],
                            height,
                          );
                          ((_g = calculateRadius(
                            backgroundImage,
                            x,
                            y,
                            width,
                            height,
                          )),
                            (rx = _g[0]),
                            (ry = _g[1]));
                          if (rx > 0 && ry > 0) {
                            radialGradient_1 = this_1.ctx.createRadialGradient(
                              left + x,
                              top_1 + y,
                              0,
                              left + x,
                              top_1 + y,
                              rx,
                            );
                            processColorStops(
                              backgroundImage.stops,
                              rx * 2,
                            ).forEach(function (colorStop) {
                              return radialGradient_1.addColorStop(
                                colorStop.stop,
                                asString(colorStop.color),
                              );
                            });
                            this_1.path(path);
                            this_1.ctx.fillStyle = radialGradient_1;
                            if (rx !== ry) {
                              midX =
                                container.bounds.left +
                                0.5 * container.bounds.width;
                              midY =
                                container.bounds.top +
                                0.5 * container.bounds.height;
                              f = ry / rx;
                              invF = 1 / f;
                              this_1.ctx.save();
                              this_1.ctx.translate(midX, midY);
                              this_1.ctx.transform(1, 0, 0, f, 0, 0);
                              this_1.ctx.translate(-midX, -midY);
                              this_1.ctx.fillRect(
                                left,
                                invF * (top_1 - midY) + midY,
                                width,
                                height * invF,
                              );
                              this_1.ctx.restore();
                            } else {
                              this_1.ctx.fill();
                            }
                          }
                        }
                        _h.label = 6;
                      case 6:
                        index--;
                        return [2];
                    }
                  });
                };
                this_1 = this;
                ((_i = 0),
                  (_a = container.styles.backgroundImage.slice(0).reverse()));
                _b.label = 1;
              case 1:
                if (!(_i < _a.length)) return [3, 4];
                backgroundImage = _a[_i];
                return [5, _loop_1(backgroundImage)];
              case 2:
                _b.sent();
                _b.label = 3;
              case 3:
                _i++;
                return [3, 1];
              case 4:
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.renderSolidBorder = function (
        color,
        side,
        curvePoints,
      ) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            this.path(parsePathForBorder(curvePoints, side));
            this.ctx.fillStyle = asString(color);
            this.ctx.fill();
            return [2];
          });
        });
      };
      CanvasRenderer.prototype.renderDoubleBorder = function (
        color,
        width,
        side,
        curvePoints,
      ) {
        return __awaiter(this, void 0, void 0, function () {
          var outerPaths, innerPaths;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!(width < 3)) return [3, 2];
                return [4, this.renderSolidBorder(color, side, curvePoints)];
              case 1:
                _a.sent();
                return [2];
              case 2:
                outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
                this.path(outerPaths);
                this.ctx.fillStyle = asString(color);
                this.ctx.fill();
                innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
                this.path(innerPaths);
                this.ctx.fill();
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function (
        paint,
      ) {
        return __awaiter(this, void 0, void 0, function () {
          var styles,
            hasBackground,
            borders,
            backgroundPaintingArea,
            side,
            _i,
            borders_1,
            border;
          var _this = this;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                this.applyEffects(paint.getEffects(2));
                styles = paint.container.styles;
                hasBackground =
                  !isTransparent(styles.backgroundColor) ||
                  styles.backgroundImage.length;
                borders = [
                  {
                    style: styles.borderTopStyle,
                    color: styles.borderTopColor,
                    width: styles.borderTopWidth,
                  },
                  {
                    style: styles.borderRightStyle,
                    color: styles.borderRightColor,
                    width: styles.borderRightWidth,
                  },
                  {
                    style: styles.borderBottomStyle,
                    color: styles.borderBottomColor,
                    width: styles.borderBottomWidth,
                  },
                  {
                    style: styles.borderLeftStyle,
                    color: styles.borderLeftColor,
                    width: styles.borderLeftWidth,
                  },
                ];
                backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(
                  getBackgroundValueForIndex(styles.backgroundClip, 0),
                  paint.curves,
                );
                if (!(hasBackground || styles.boxShadow.length)) return [3, 2];
                this.ctx.save();
                this.path(backgroundPaintingArea);
                this.ctx.clip();
                if (!isTransparent(styles.backgroundColor)) {
                  this.ctx.fillStyle = asString(styles.backgroundColor);
                  this.ctx.fill();
                }
                return [4, this.renderBackgroundImage(paint.container)];
              case 1:
                _a.sent();
                this.ctx.restore();
                styles.boxShadow
                  .slice(0)
                  .reverse()
                  .forEach(function (shadow) {
                    _this.ctx.save();
                    var borderBoxArea = calculateBorderBoxPath(paint.curves);
                    var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                    var shadowPaintingArea = transformPath(
                      borderBoxArea,
                      -maskOffset +
                        (shadow.inset ? 1 : -1) * shadow.spread.number,
                      (shadow.inset ? 1 : -1) * shadow.spread.number,
                      shadow.spread.number * (shadow.inset ? -2 : 2),
                      shadow.spread.number * (shadow.inset ? -2 : 2),
                    );
                    if (shadow.inset) {
                      _this.path(borderBoxArea);
                      _this.ctx.clip();
                      _this.mask(shadowPaintingArea);
                    } else {
                      _this.mask(borderBoxArea);
                      _this.ctx.clip();
                      _this.path(shadowPaintingArea);
                    }
                    _this.ctx.shadowOffsetX =
                      shadow.offsetX.number + maskOffset;
                    _this.ctx.shadowOffsetY = shadow.offsetY.number;
                    _this.ctx.shadowColor = asString(shadow.color);
                    _this.ctx.shadowBlur = shadow.blur.number;
                    _this.ctx.fillStyle = shadow.inset
                      ? asString(shadow.color)
                      : "rgba(0,0,0,1)";
                    _this.ctx.fill();
                    _this.ctx.restore();
                  });
                _a.label = 2;
              case 2:
                side = 0;
                ((_i = 0), (borders_1 = borders));
                _a.label = 3;
              case 3:
                if (!(_i < borders_1.length)) return [3, 13];
                border = borders_1[_i];
                if (
                  !(
                    border.style !== 0 &&
                    !isTransparent(border.color) &&
                    border.width > 0
                  )
                )
                  return [3, 11];
                if (!(border.style === 2)) return [3, 5];
                return [
                  4,
                  this.renderDashedDottedBorder(
                    border.color,
                    border.width,
                    side,
                    paint.curves,
                    2,
                  ),
                ];
              case 4:
                _a.sent();
                return [3, 11];
              case 5:
                if (!(border.style === 3)) return [3, 7];
                return [
                  4,
                  this.renderDashedDottedBorder(
                    border.color,
                    border.width,
                    side,
                    paint.curves,
                    3,
                  ),
                ];
              case 6:
                _a.sent();
                return [3, 11];
              case 7:
                if (!(border.style === 4)) return [3, 9];
                return [
                  4,
                  this.renderDoubleBorder(
                    border.color,
                    border.width,
                    side,
                    paint.curves,
                  ),
                ];
              case 8:
                _a.sent();
                return [3, 11];
              case 9:
                return [
                  4,
                  this.renderSolidBorder(border.color, side, paint.curves),
                ];
              case 10:
                _a.sent();
                _a.label = 11;
              case 11:
                side++;
                _a.label = 12;
              case 12:
                _i++;
                return [3, 3];
              case 13:
                return [2];
            }
          });
        });
      };
      CanvasRenderer.prototype.renderDashedDottedBorder = function (
        color,
        width,
        side,
        curvePoints,
        style,
      ) {
        return __awaiter(this, void 0, void 0, function () {
          var strokePaths,
            boxPaths,
            startX,
            startY,
            endX,
            endY,
            length,
            dashLength,
            spaceLength,
            useLineDash,
            multiplier,
            numberOfDashes,
            minSpace,
            maxSpace,
            path1,
            path2,
            path1,
            path2;
          return __generator(this, function (_a) {
            this.ctx.save();
            strokePaths = parsePathForBorderStroke(curvePoints, side);
            boxPaths = parsePathForBorder(curvePoints, side);
            if (style === 2) {
              this.path(boxPaths);
              this.ctx.clip();
            }
            if (isBezierCurve(boxPaths[0])) {
              startX = boxPaths[0].start.x;
              startY = boxPaths[0].start.y;
            } else {
              startX = boxPaths[0].x;
              startY = boxPaths[0].y;
            }
            if (isBezierCurve(boxPaths[1])) {
              endX = boxPaths[1].end.x;
              endY = boxPaths[1].end.y;
            } else {
              endX = boxPaths[1].x;
              endY = boxPaths[1].y;
            }
            if (side === 0 || side === 2) {
              length = Math.abs(startX - endX);
            } else {
              length = Math.abs(startY - endY);
            }
            this.ctx.beginPath();
            if (style === 3) {
              this.formatPath(strokePaths);
            } else {
              this.formatPath(boxPaths.slice(0, 2));
            }
            dashLength = width < 3 ? width * 3 : width * 2;
            spaceLength = width < 3 ? width * 2 : width;
            if (style === 3) {
              dashLength = width;
              spaceLength = width;
            }
            useLineDash = true;
            if (length <= dashLength * 2) {
              useLineDash = false;
            } else if (length <= dashLength * 2 + spaceLength) {
              multiplier = length / (2 * dashLength + spaceLength);
              dashLength *= multiplier;
              spaceLength *= multiplier;
            } else {
              numberOfDashes = Math.floor(
                (length + spaceLength) / (dashLength + spaceLength),
              );
              minSpace =
                (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
              maxSpace =
                (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
              spaceLength =
                maxSpace <= 0 ||
                Math.abs(spaceLength - minSpace) <
                  Math.abs(spaceLength - maxSpace)
                  ? minSpace
                  : maxSpace;
            }
            if (useLineDash) {
              if (style === 3) {
                this.ctx.setLineDash([0, dashLength + spaceLength]);
              } else {
                this.ctx.setLineDash([dashLength, spaceLength]);
              }
            }
            if (style === 3) {
              this.ctx.lineCap = "round";
              this.ctx.lineWidth = width;
            } else {
              this.ctx.lineWidth = width * 2 + 1.1;
            }
            this.ctx.strokeStyle = asString(color);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            if (style === 2) {
              if (isBezierCurve(boxPaths[0])) {
                path1 = boxPaths[3];
                path2 = boxPaths[0];
                this.ctx.beginPath();
                this.formatPath([
                  new Vector(path1.end.x, path1.end.y),
                  new Vector(path2.start.x, path2.start.y),
                ]);
                this.ctx.stroke();
              }
              if (isBezierCurve(boxPaths[1])) {
                path1 = boxPaths[1];
                path2 = boxPaths[2];
                this.ctx.beginPath();
                this.formatPath([
                  new Vector(path1.end.x, path1.end.y),
                  new Vector(path2.start.x, path2.start.y),
                ]);
                this.ctx.stroke();
              }
            }
            this.ctx.restore();
            return [2];
          });
        });
      };
      CanvasRenderer.prototype.render = function (element) {
        return __awaiter(this, void 0, void 0, function () {
          var stack;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (this.options.backgroundColor) {
                  this.ctx.fillStyle = asString(this.options.backgroundColor);
                  this.ctx.fillRect(
                    this.options.x,
                    this.options.y,
                    this.options.width,
                    this.options.height,
                  );
                }
                stack = parseStackingContexts(element);
                return [4, this.renderStack(stack)];
              case 1:
                _a.sent();
                this.applyEffects([]);
                return [2, this.canvas];
            }
          });
        });
      };
      return CanvasRenderer;
    })(Renderer);
    var isTextInputElement = function (container) {
      if (container instanceof TextareaElementContainer) {
        return true;
      } else if (container instanceof SelectElementContainer) {
        return true;
      } else if (
        container instanceof InputElementContainer &&
        container.type !== RADIO &&
        container.type !== CHECKBOX
      ) {
        return true;
      }
      return false;
    };
    var calculateBackgroundCurvedPaintingArea = function (clip, curves) {
      switch (clip) {
        case 0:
          return calculateBorderBoxPath(curves);
        case 2:
          return calculateContentBoxPath(curves);
        case 1:
        default:
          return calculatePaddingBoxPath(curves);
      }
    };
    var canvasTextAlign = function (textAlign) {
      switch (textAlign) {
        case 1:
          return "center";
        case 2:
          return "right";
        case 0:
        default:
          return "left";
      }
    };

    var iOSBrokenFonts = ["-apple-system", "system-ui"];
    var fixIOSSystemFonts = function (fontFamilies) {
      return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
        ? fontFamilies.filter(function (fontFamily) {
            return iOSBrokenFonts.indexOf(fontFamily) === -1;
          })
        : fontFamilies;
    };
    var ForeignObjectRenderer = (function (_super) {
      __extends(ForeignObjectRenderer, _super);
      function ForeignObjectRenderer(context, options) {
        var _this = _super.call(this, context, options) || this;
        _this.canvas = options.canvas
          ? options.canvas
          : document.createElement("canvas");
        _this.ctx = _this.canvas.getContext("2d");
        _this.options = options;
        _this.canvas.width = Math.floor(options.width * options.scale);
        _this.canvas.height = Math.floor(options.height * options.scale);
        _this.canvas.style.width = options.width + "px";
        _this.canvas.style.height = options.height + "px";
        _this.ctx.scale(_this.options.scale, _this.options.scale);
        _this.ctx.translate(-options.x, -options.y);
        _this.context.logger.debug(
          "EXPERIMENTAL ForeignObject renderer initialized (" +
            options.width +
            "x" +
            options.height +
            " at " +
            options.x +
            "," +
            options.y +
            ") with scale " +
            options.scale,
        );
        return _this;
      }
      ForeignObjectRenderer.prototype.render = function (element) {
        return __awaiter(this, void 0, void 0, function () {
          var svg, img;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                svg = createForeignObjectSVG(
                  this.options.width * this.options.scale,
                  this.options.height * this.options.scale,
                  this.options.scale,
                  this.options.scale,
                  element,
                );
                return [4, loadSerializedSVG(svg)];
              case 1:
                img = _a.sent();
                if (this.options.backgroundColor) {
                  this.ctx.fillStyle = asString(this.options.backgroundColor);
                  this.ctx.fillRect(
                    0,
                    0,
                    this.options.width * this.options.scale,
                    this.options.height * this.options.scale,
                  );
                }
                this.ctx.drawImage(
                  img,
                  -this.options.x * this.options.scale,
                  -this.options.y * this.options.scale,
                );
                return [2, this.canvas];
            }
          });
        });
      };
      return ForeignObjectRenderer;
    })(Renderer);
    var loadSerializedSVG = function (svg) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          resolve(img);
        };
        img.onerror = reject;
        img.src =
          "data:image/svg+xml;charset=utf-8," +
          encodeURIComponent(new XMLSerializer().serializeToString(svg));
      });
    };
    var Logger = (function () {
      function Logger(_a) {
        var id = _a.id,
          enabled = _a.enabled;
        this.id = id;
        this.enabled = enabled;
        this.start = Date.now();
      }

      Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (this.enabled) {
          if (("TURBOPACK compile-time falsy", 0));
          else {
            this.info.apply(this, args);
          }
        }
      };
      Logger.prototype.getTime = function () {
        return Date.now() - this.start;
      };

      Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (this.enabled) {
          if (("TURBOPACK compile-time falsy", 0));
        }
      };

      Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (this.enabled) {
          if (("TURBOPACK compile-time falsy", 0));
          else {
            this.info.apply(this, args);
          }
        }
      };

      Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (this.enabled) {
          if (("TURBOPACK compile-time falsy", 0));
          else {
            this.info.apply(this, args);
          }
        }
      };
      Logger.instances = {};
      return Logger;
    })();
    var Context = (function () {
      function Context(options, windowBounds) {
        var _a;
        this.windowBounds = windowBounds;
        this.instanceName = "#" + Context.instanceCount++;
        this.logger = new Logger({
          id: this.instanceName,
          enabled: options.logging,
        });
        this.cache =
          (_a = options.cache) !== null && _a !== void 0
            ? _a
            : new Cache(this, options);
      }
      Context.instanceCount = 1;
      return Context;
    })();
    var html2canvas = function (element, options) {
      if (options === void 0) {
        options = {};
      }
      return renderElement(element, options);
    };
    if (("TURBOPACK compile-time falsy", 0));
    var renderElement = function (element, opts) {
      return __awaiter(void 0, void 0, void 0, function () {
        var ownerDocument,
          defaultView,
          resourceOptions,
          contextOptions,
          windowOptions,
          windowBounds,
          context,
          foreignObjectRendering,
          cloneOptions,
          documentCloner,
          clonedElement,
          container,
          _a,
          width,
          height,
          left,
          top,
          backgroundColor,
          renderOptions,
          canvas,
          renderer,
          root,
          renderer;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __generator(this, function (_u) {
          switch (_u.label) {
            case 0:
              if (!element || typeof element !== "object") {
                return [
                  2,
                  Promise.reject("Invalid element provided as first argument"),
                ];
              }
              ownerDocument = element.ownerDocument;
              if (!ownerDocument) {
                throw new Error("Element is not attached to a Document");
              }
              defaultView = ownerDocument.defaultView;
              if (!defaultView) {
                throw new Error("Document is not attached to a Window");
              }
              resourceOptions = {
                allowTaint:
                  (_b = opts.allowTaint) !== null && _b !== void 0 ? _b : false,
                imageTimeout:
                  (_c = opts.imageTimeout) !== null && _c !== void 0
                    ? _c
                    : 15000,
                proxy: opts.proxy,
                useCORS:
                  (_d = opts.useCORS) !== null && _d !== void 0 ? _d : false,
              };
              contextOptions = __assign(
                {
                  logging:
                    (_e = opts.logging) !== null && _e !== void 0 ? _e : true,
                  cache: opts.cache,
                },
                resourceOptions,
              );
              windowOptions = {
                windowWidth:
                  (_f = opts.windowWidth) !== null && _f !== void 0
                    ? _f
                    : defaultView.innerWidth,
                windowHeight:
                  (_g = opts.windowHeight) !== null && _g !== void 0
                    ? _g
                    : defaultView.innerHeight,
                scrollX:
                  (_h = opts.scrollX) !== null && _h !== void 0
                    ? _h
                    : defaultView.pageXOffset,
                scrollY:
                  (_j = opts.scrollY) !== null && _j !== void 0
                    ? _j
                    : defaultView.pageYOffset,
              };
              windowBounds = new Bounds(
                windowOptions.scrollX,
                windowOptions.scrollY,
                windowOptions.windowWidth,
                windowOptions.windowHeight,
              );
              context = new Context(contextOptions, windowBounds);
              foreignObjectRendering =
                (_k = opts.foreignObjectRendering) !== null && _k !== void 0
                  ? _k
                  : false;
              cloneOptions = {
                allowTaint:
                  (_l = opts.allowTaint) !== null && _l !== void 0 ? _l : false,
                onclone: opts.onclone,
                ignoreElements: opts.ignoreElements,
                inlineImages: foreignObjectRendering,
                copyStyles: foreignObjectRendering,
              };
              context.logger.debug(
                "Starting document clone with size " +
                  windowBounds.width +
                  "x" +
                  windowBounds.height +
                  " scrolled to " +
                  -windowBounds.left +
                  "," +
                  -windowBounds.top,
              );
              documentCloner = new DocumentCloner(
                context,
                element,
                cloneOptions,
              );
              clonedElement = documentCloner.clonedReferenceElement;
              if (!clonedElement) {
                return [
                  2,
                  Promise.reject("Unable to find element in cloned iframe"),
                ];
              }
              return [4, documentCloner.toIFrame(ownerDocument, windowBounds)];
            case 1:
              container = _u.sent();
              ((_a =
                isBodyElement(clonedElement) || isHTMLElement(clonedElement)
                  ? parseDocumentSize(clonedElement.ownerDocument)
                  : parseBounds(context, clonedElement)),
                (width = _a.width),
                (height = _a.height),
                (left = _a.left),
                (top = _a.top));
              backgroundColor = parseBackgroundColor(
                context,
                clonedElement,
                opts.backgroundColor,
              );
              renderOptions = {
                canvas: opts.canvas,
                backgroundColor: backgroundColor,
                scale:
                  (_o =
                    (_m = opts.scale) !== null && _m !== void 0
                      ? _m
                      : defaultView.devicePixelRatio) !== null && _o !== void 0
                    ? _o
                    : 1,
                x: ((_p = opts.x) !== null && _p !== void 0 ? _p : 0) + left,
                y: ((_q = opts.y) !== null && _q !== void 0 ? _q : 0) + top,
                width:
                  (_r = opts.width) !== null && _r !== void 0
                    ? _r
                    : Math.ceil(width),
                height:
                  (_s = opts.height) !== null && _s !== void 0
                    ? _s
                    : Math.ceil(height),
              };
              if (!foreignObjectRendering) return [3, 3];
              context.logger.debug(
                "Document cloned, using foreign object rendering",
              );
              renderer = new ForeignObjectRenderer(context, renderOptions);
              return [4, renderer.render(clonedElement)];
            case 2:
              canvas = _u.sent();
              return [3, 5];
            case 3:
              context.logger.debug(
                "Document cloned, element located at " +
                  left +
                  "," +
                  top +
                  " with size " +
                  width +
                  "x" +
                  height +
                  " using computed rendering",
              );
              context.logger.debug("Starting DOM parsing");
              root = parseTree(context, clonedElement);
              if (backgroundColor === root.styles.backgroundColor) {
                root.styles.backgroundColor = COLORS.TRANSPARENT;
              }
              context.logger.debug(
                "Starting renderer for element at " +
                  renderOptions.x +
                  "," +
                  renderOptions.y +
                  " with size " +
                  renderOptions.width +
                  "x" +
                  renderOptions.height,
              );
              renderer = new CanvasRenderer(context, renderOptions);
              return [4, renderer.render(root)];
            case 4:
              canvas = _u.sent();
              _u.label = 5;
            case 5:
              if (
                (_t = opts.removeContainer) !== null && _t !== void 0
                  ? _t
                  : true
              ) {
                if (!DocumentCloner.destroy(container)) {
                  context.logger.error(
                    "Cannot detach cloned iframe as it is not in the DOM anymore",
                  );
                }
              }
              context.logger.debug("Finished rendering");
              return [2, canvas];
          }
        });
      });
    };
    var parseBackgroundColor = function (
      context,
      element,
      backgroundColorOverride,
    ) {
      var ownerDocument = element.ownerDocument;

      var documentBackgroundColor = ownerDocument.documentElement
        ? parseColor(
            context,
            getComputedStyle(ownerDocument.documentElement).backgroundColor,
          )
        : COLORS.TRANSPARENT;
      var bodyBackgroundColor = ownerDocument.body
        ? parseColor(
            context,
            getComputedStyle(ownerDocument.body).backgroundColor,
          )
        : COLORS.TRANSPARENT;
      var defaultBackgroundColor =
        typeof backgroundColorOverride === "string"
          ? parseColor(context, backgroundColorOverride)
          : backgroundColorOverride === null
            ? COLORS.TRANSPARENT
            : 0xffffffff;
      return element === ownerDocument.documentElement
        ? isTransparent(documentBackgroundColor)
          ? isTransparent(bodyBackgroundColor)
            ? defaultBackgroundColor
            : bodyBackgroundColor
          : documentBackgroundColor
        : defaultBackgroundColor;
    };
    const __TURBOPACK__default__export__ = html2canvas;
  },
];
