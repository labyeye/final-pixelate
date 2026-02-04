module.exports = {
  content: [
    '*.html',
    'js/**/*.js'
  ],
  css: ['*.css'],
  output: './purge-output/',
  
  
  safelist: [
    
    'w--open',
    'w-nav',
    'menu-button',
    'w-open',
    'navbar-open',
    
    
    'modal-open',
    'is-open',
    'is-visible',
    'show',
    'active',
    'hidden',
    
    
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
  ],
  
  defaultExtractor: (content) => {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  }
};
