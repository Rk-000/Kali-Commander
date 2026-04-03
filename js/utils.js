/* ========================================
   utils.js - Helper Functions for Kali Commander
   Contains: URL parsing, validation, formatting, notifications
   ======================================== */

const Utils = {
    /**
     * Get query parameter from URL
     * @param {string} param - Parameter name
     * @returns {string|null} Parameter value or null
     */
    getQueryParam: function(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Format timestamp for display
     * @param {string} timestamp - ISO timestamp
     * @returns {string} Formatted date/time
     */
    formatTimestamp: function(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    },

    /**
     * Generate random filename
     * @param {string} tool - Tool name
     * @param {string} target - Target (optional)
     * @returns {string} Generated filename
     */
    generateFileName: function(tool, target = '') {
        const timestamp = new Date().toISOString()
            .replace(/[:.]/g, '-')
            .slice(0, 19);
        
        const safeTarget = target 
            ? target.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20)
            : '';
        
        return safeTarget 
            ? `${tool}_${safeTarget}_${timestamp}`
            : `${tool}_${timestamp}`;
    },

    /**
     * Validate target input
     * @param {string} target - Target to validate
     * @param {string} tool - Tool name for specific validation
     * @returns {object} Validation result
     */
    validateTarget: function(target, tool = 'general') {
        if (!target || target.trim() === '') {
            return { valid: false, message: 'Target is required' };
        }
        
        const trimmed = target.trim();
        
        switch(tool.toLowerCase()) {
            case 'nmap':
            case 'nikto':
            case 'wpscan':
                // IP, domain, or CIDR
                const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:[0-9]|[1-2][0-9]|3[0-2]))?$/;
                const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(?:\.[a-zA-Z]{2,})+$/;
                const urlRegex = /^https?:\/\/.+/;
                
                if (!ipRegex.test(trimmed) && !domainRegex.test(trimmed) && !urlRegex.test(trimmed) && trimmed !== 'localhost') {
                    return { valid: false, message: 'Invalid IP, domain, or URL format' };
                }
                break;
                
            case 'hydra':
                // Check if it looks like an IP or domain
                const hydraIpRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                const hydraDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(?:\.[a-zA-Z]{2,})+$/;
                
                if (!hydraIpRegex.test(trimmed) && !hydraDomainRegex.test(trimmed)) {
                    return { valid: false, message: 'Invalid IP or domain for Hydra' };
                }
                break;
                
            default:
                // General validation - just check not empty
                break;
        }
        
        return { valid: true, message: 'Valid target' };
    },

    /**
     * Show notification
     * @param {string} message - Message to display
     * @param {string} type - Type: 'info', 'success', 'warning', 'error'
     */
    showNotification: function(message, type = 'info') {
        // Check if notification element exists, create if not
        let notif = document.getElementById('notification');
        
        if (!notif) {
            notif = document.createElement('div');
            notif.id = 'notification';
            notif.className = 'notification';
            document.body.appendChild(notif);
        }
        
        // Set message and type
        notif.textContent = message;
        notif.className = `notification ${type}`;
        
        // Show notification
        setTimeout(() => notif.classList.add('show'), 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notif.classList.remove('show');
        }, 3000);
    },

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    copyToClipboard: async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (fallbackErr) {
                console.error('Copy failed:', fallbackErr);
                return false;
            }
        }
    },

    /**
     * Sanitize filename (remove unsafe characters)
     * @param {string} filename - Raw filename
     * @returns {string} Sanitized filename
     */
    sanitizeFilename: function(filename) {
        return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    },

    /**
     * Escape HTML special characters
     * @param {string} text - Raw text
     * @returns {string} Escaped text
     */
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Debounce function for performance
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Get file extension options for a tool
     * @param {string} tool - Tool name
     * @returns {Array} File extension options
     */
    getFileExtensions: function(tool) {
        const extensions = {
            'nmap': [
                { value: '.txt', label: '.txt (Normal)' },
                { value: '.xml', label: '.xml (XML)' },
                { value: '.gnmap', label: '.gnmap (Grepable)' },
                { value: '.nmap', label: '.nmap (Nmap format)' }
            ],
            'nikto': [
                { value: '.txt', label: '.txt (Text)' },
                { value: '.html', label: '.html (HTML)' },
                { value: '.csv', label: '.csv (CSV)' }
            ],
            'hydra': [
                { value: '.txt', label: '.txt (Text)' },
                { value: '.json', label: '.json (JSON)' }
            ],
            'sqlmap': [
                { value: '.txt', label: '.txt (Text)' },
                { value: '.csv', label: '.csv (CSV)' }
            ],
            'default': [
                { value: '.txt', label: '.txt (Text)' },
                { value: '.log', label: '.log (Log)' },
                { value: '.csv', label: '.csv (CSV)' },
                { value: '.json', label: '.json (JSON)' }
            ]
        };
        
        return extensions[tool.toLowerCase()] || extensions.default;
    }
};

// Make Utils globally available
window.Utils = Utils;

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}