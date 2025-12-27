module.exports = {
  content: [
    '*.html',
    'js/**/*.js'
  ],
  css: ['*.css'],
  output: './purge-output/',
  
  // CRITICAL: Classes used by JavaScript that PurgeCSS can't detect
  safelist: [
    // Navbar mobile menu classes
    'w--open',
    'w-nav',
    'menu-button',
    'w-open',
    'navbar-open',
    
    // Modal and dialog states
    'modal-open',
    'is-open',
    'is-visible',
    'show',
    'active',
    'hidden',
    
    // Aria attributes styling
    /^aria-/,
    
    // Data attributes styling
    /^data-/,
    
    // States added by JavaScript
    /--open$/,
    /--active$/,
    /is-/,
    /has-/,
    /was-/,
    
    // Webflow standard classes
    /^w-/,
    /--active/,
    /--current/,
    /w--/,
  ],
  
  defaultExtractor: (content) => {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  }
};
