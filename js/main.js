// src/js/main.js
// Main JavaScript file - loads and displays faculty data using CONFIG, DataLoader, and Renderers
(function () {
  'use strict';

  const elements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    mainContent: document.getElementById('main-content')
  };

  function showError(message) {
    if (elements.loading) elements.loading.classList.add('hidden');
    if (elements.error) {
      elements.error.textContent = message;
      elements.error.classList.remove('hidden');
    }
  }

  async function init() {
    try {
      const cfg = window.APP_CONFIG || {};

      // Optional artificial loading delay (for testing)
      if (cfg.ui && cfg.ui.loadingDelay) {
        await new Promise(r => setTimeout(r, cfg.ui.loadingDelay));
      }

      // 1) Load profile JSON using DataLoader (reads CONFIG.dataSource.profilePath)
      const profile = await window.DataLoader.loadProfile();

      // 2) Validate profile structure
      if (!window.DataLoader.validateProfileData(profile)) {
        throw new Error('Profile data failed validation.');
      }

      // 3) Render all sections using Renderers module
      window.Renderers.renderAll(profile);

      // 4) Show content, hide loading
      if (elements.loading) elements.loading.classList.add('hidden');
      if (elements.mainContent) elements.mainContent.classList.remove('hidden');

    } catch (error) {
      console.error('Error initializing faculty profile:', error);
      showError('Failed to load faculty profile. Please try again later.');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
