/**
 * Data Loader Module
 * 
 * Handles fetching and loading JSON data from the data source.
 */

const DataLoader = (function() {
    'use strict';
    
    /**
     * Fetch profile data from JSON file
     * @param {string} url - Path to JSON file
     * @returns {Promise<Object>} Profile data
     */
    async function fetchProfileData(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (window.APP_CONFIG.debug) {
                console.log('Profile data loaded:', data);
            }
            
            return data;
            
        } catch (error) {
            console.error('Error fetching profile data:', error);
            throw error;
        }
    }
    
    /**
     * Load profile with fallback support
     * @returns {Promise<Object>} Profile data
     */
    async function loadProfile() {
        const config = window.APP_CONFIG;
        
        try {
            // Try primary data source
            return await fetchProfileData(config.dataSource.profilePath);
            
        } catch (primaryError) {
            console.warn('Primary data source failed, trying fallback...', primaryError);
            
            // Try fallback if configured
            if (config.dataSource.fallbackProfile) {
                try {
                    return await fetchProfileData(config.dataSource.fallbackProfile);
                } catch (fallbackError) {
                    console.error('Fallback data source also failed:', fallbackError);
                    throw new Error('Failed to load profile data from all sources');
                }
            } else {
                throw primaryError;
            }
        }
    }
    
    /**
     * Validate profile data structure
     * @param {Object} data - Profile data to validate
     * @returns {boolean} True if valid
     */
    function validateProfileData(data) {
        const requiredFields = ['name', 'degree', 'title', 'department', 'university'];
        
        for (const field of requiredFields) {
            if (!data[field]) {
                console.warn(`Missing required field: ${field}`);
                return false;
            }
        }
        
        return true;
    }
    
    // Public API
    return {
        loadProfile,
        validateProfileData
    };
})();

// Make DataLoader globally available
window.DataLoader = DataLoader;
