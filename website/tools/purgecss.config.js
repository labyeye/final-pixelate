module.exports = {
  content: [
    "**/*.html",
    "js/**/*.js",
    "detailed-services/**/*.html",
    "counter-billing-bihar/**/*.html",
    "factory-management-bihar/**/*.html",
    "school-crm-bihar/**/*.html",
    "products/**/*.html",
  ],
  css: ["*.css", "assets/**/*.css"],
  output: "./purge-output/",

  safelist: [
    "w--open",
    "w-nav",
    "menu-button",
    "w-open",
    "navbar-open",

    "modal-open",
    "is-open",
    "is-visible",
    "show",
    "active",
    "hidden",

    /^aria-/,

    /^data-/,

    /--open$/,
    /--active$/,
    /is-/,
    /has-/,
    /was-/,

    /^w-/,
    /--active/,
    /--current/,
    /w--/,

    /^fa-/,
    /^icon-/,
  ],

  defaultExtractor: (content) => {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  },

  keyframes: true,

  variables: true,
};
