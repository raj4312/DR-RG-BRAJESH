/**
 * Configuration File
 * 
 * Central configuration for the faculty profile application.
 * Modify this file to change data sources and application settings.
 */

const CONFIG = {
  // Data source configuration
  dataSource: {
    // Primary profile JSON file
    // Change this to load a different faculty profile
    profilePath: '/DR-RG-BRAJESH/data/profile-dr-brajesh.json',

    // Fallback profile (optional) – disabled (no extra request)
    fallbackProfile: null
  },

  // Image configuration
  images: {
    // Default avatar shown when no profile image is available
    showDefaultAvatar: true,

    // Lazy loading for images
    lazyLoad: true
  },

  // UI configuration
  ui: {
    // Show loading spinner
    showLoadingSpinner: true,

    // Loading delay (milliseconds) - useful for testing loading states
    loadingDelay: 0,

    // Smooth scroll behavior
    smoothScroll: true
  },

  // Debug mode
  debug: false
};

// Make config globally available
window.APP_CONFIG = CONFIG;
