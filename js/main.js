/* ========================================
   main.js - Landing Page Functionality
   Handles: Category loading, dropdown interactions, navigation
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    setupEventListeners();
});

// Global categories data (will be populated from tools-data.js)
let categories = [];

/**
 * Load categories from tools-data.js or use embedded data
 */
function loadCategories() {
    // If categories are defined in tools-data.js, use them
    if (typeof window.categories !== 'undefined' && window.categories.length > 0) {
        categories = window.categories;
    } else {
        console.warn('Categories not found in tools-data.js, using embedded data');
        categories = getEmbeddedCategories();
    }
    
    renderCategories();
}

/**
 * Render category cards to the grid
 */
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) {
        console.error('Categories grid not found');
        return;
    }

    grid.innerHTML = categories.map(cat => {
        const totalTools = cat.tools.length;
        return `
            <div class="category-card" data-category="${cat.id}">
                <!-- Option A: Full-width gradient header -->
                <div class="category-header" style="background: linear-gradient(90deg, ${cat.color || '#0F5FA8'}, #1E88E5, #00CFFF);">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span class="category-icon">${cat.icon || '📁'}</span>
                        <h3>${cat.name}</h3>
                    </div>
                </div>
                
                <!-- Category description -->
                <p class="category-description">${cat.description || 'No description available'}</p>
                
                <!-- Stats bar -->
                <div class="category-stats">
                    <div class="stat-item">
                        <span>🛠️</span>
                        <span class="stat-value">${totalTools} tools</span>
                    </div>
                    <div class="stat-item">
                        <span>⚡</span>
                        <span class="stat-value">Ready</span>
                    </div>
                </div>
                
                <!-- Dropdown with tools -->
                <div class="category-dropdown">
                    <button class="dropdown-btn" data-category="${cat.id}">
                        VIEW ${totalTools} TOOLS
                    </button>
                    <div class="dropdown-content" id="dropdown-${cat.id}">
                        ${cat.tools.map(tool => `
                            <div class="tool-item" data-tool="${tool.page ? tool.page.replace('.html', '') : tool.name.toLowerCase()}">
                                <span class="tool-icon">${tool.icon || '🔧'}</span>
                                <span class="tool-name">${tool.name}</span>
                                <span class="tool-badge">${getPopularityBadge(tool.name)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Initialize dropdown functionality
    initDropdowns();
}

/**
 * Initialize dropdown hover functionality
 */
function initDropdowns() {
    document.querySelectorAll('.category-card').forEach(card => {
        const dropdown = card.querySelector('.dropdown-content');
        const btn = card.querySelector('.dropdown-btn');
        
        // Show dropdown on card hover
        card.addEventListener('mouseenter', () => {
            dropdown.classList.add('show');
            btn.classList.add('active');
            card.style.zIndex = '100';
        });
        
        // Handle mouse leaving card
        card.addEventListener('mouseleave', (e) => {
            const relatedTarget = e.relatedTarget;
            if (dropdown.contains(relatedTarget)) {
                return;
            }
            
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    dropdown.classList.remove('show');
                    btn.classList.remove('active');
                    card.style.zIndex = '';
                }
            }, 100);
        });
        
        // Keep dropdown open when hovering over it
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('show');
            card.style.zIndex = '100';
        });
        
        // Hide dropdown when mouse leaves it
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('show');
            btn.classList.remove('active');
            card.style.zIndex = '';
        });
    });

    // Tool click navigation
    document.querySelectorAll('.tool-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const tool = item.dataset.tool;
            if (tool) {
                navigateToTool(tool);
            }
        });
    });
}

/**
 * Navigate to tool page
 */
function navigateToTool(toolName) {
    const toolPage = `pages/${toolName}.html`;
    
    // Check if page exists (try to fetch)
    fetch(toolPage, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = toolPage;
            } else {
                showNotification(`⚠️ Tool page for ${toolName} not yet created`, 'warning');
            }
        })
        .catch(() => {
            showNotification(`⚠️ Tool page for ${toolName} not yet created`, 'warning');
        });
}

/**
 * Get popularity badge for tool
 */
function getPopularityBadge(toolName) {
    const popularTools = [
        'Nmap', 'Metasploit', 'Burp Suite', 'Wireshark', 
        'Hydra', 'John the Ripper', 'SQLmap', 'Aircrack-ng'
    ];
    return popularTools.includes(toolName) ? '🔥 POPULAR' : '✓ READY';
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notif = document.getElementById('notification');
    if (!notif) return;
    
    notif.textContent = message;
    notif.className = `notification ${type}`;
    notif.classList.add('show');
    
    setTimeout(() => {
        notif.classList.remove('show');
    }, 3000);
}

/**
 * Setup global event listeners
 */
function setupEventListeners() {
    // Add any global event listeners here
}

/**
 * Embedded categories data (fallback if tools-data.js not loaded)
 */
function getEmbeddedCategories() {
    return [
        {
            id: 'information-gathering',
            name: 'INFORMATION GATHERING',
            icon: '🔍',
            description: 'Collect intelligence about targets using OSINT and reconnaissance techniques',
            color: '#0F5FA8',
            tools: [
                { name: 'Nmap', icon: '🌐', desc: 'Network discovery', page: 'nmap.html' },
                { name: 'theHarvester', icon: '📧', desc: 'Email harvester', page: 'theharvester.html' },
                { name: 'Dmitry', icon: '🕵️', desc: 'Deepmagic tool', page: 'dmitry.html' }
            ]
        }
    ];
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadCategories,
        showNotification,
        navigateToTool
    };
}