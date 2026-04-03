/* ========================================
   command-builder.js - Core Command Generation Logic
   Handles: Building commands from selections, localStorage, copy
   ======================================== */

class CommandBuilder {
    /**
     * Initialize command builder for a specific tool
     * @param {string} toolName - Name of the tool (e.g., 'nmap')
     * @param {object} toolData - Tool options from tools-data.js
     */
    constructor(toolName, toolData) {
        this.toolName = toolName;
        this.toolData = toolData;
        this.selectedOptions = {};
        this.target = '';
        this.outputPath = '/home/kali/scans/';
        this.outputFile = '';
        this.fileType = '.txt';
        this.customFlags = '';
    }

    /**
     * Generate command based on current selections
     * @returns {string} Complete command to execute
     */
    generateCommand() {
        const flags = [];
        
        // Add target if present (will be added at the end)
        const targetValue = this.target;

        // Process all selected options
        for (const [category, options] of Object.entries(this.selectedOptions)) {
            options.forEach(option => {
                if (option.flag && !option.hasValue) {
                    flags.push(option.flag);
                } else if (option.flag && option.hasValue && option.value) {
                    flags.push(`${option.flag} ${option.value}`);
                }
            });
        }

        // Add custom flags
        if (this.customFlags && this.customFlags.trim()) {
            // Split custom flags by space and add each
            const customParts = this.customFlags.trim().split(/\s+/);
            customParts.forEach(flag => flags.push(flag));
        }

        // Add output configuration
        if (this.outputFile && this.outputFile.trim()) {
            const outputFlag = this.getOutputFlag();
            const fullPath = this.outputPath + this.outputFile + this.fileType;
            
            // Handle different output flag formats
            if (outputFlag === '-oA') {
                // -oA expects basename without extension
                const basePath = this.outputPath + this.outputFile;
                flags.push(`${outputFlag} ${basePath}`);
            } else {
                flags.push(`${outputFlag} ${fullPath}`);
            }
        }

        // Add target (usually last for most tools)
        if (targetValue && targetValue.trim()) {
            flags.push(targetValue.trim());
        }

        // Build final command
        let command = `${this.toolName} ${flags.join(' ')}`.trim();
        
        // Clean up extra spaces
        command = command.replace(/\s+/g, ' ');
        
        return command || this.toolName;
    }

    /**
     * Get appropriate output flag based on tool
     * @returns {string} Output flag for the tool
     */
    getOutputFlag() {
        const outputFlags = {
            'nmap': '-oA',
            'nikto': '-o',
            'hydra': '-o',
            'john': '--output',
            'hashcat': '-o',
            'sqlmap': '--output-dir',
            'wpscan': '-o',
            'dirb': '-o',
            'ffuf': '-o',
            'metasploit': '-o',
            'wireshark': '-w',
            'tcpdump': '-w',
            'default': '-o'
        };
        
        return outputFlags[this.toolName.toLowerCase()] || outputFlags.default;
    }

    /**
     * Generate human-readable explanation of the command
     * @returns {string} Explanation text
     */
    generateExplanation() {
        const parts = [];
        
        if (this.target && this.target.trim()) {
            parts.push(`Target: ${this.target}`);
        }
        
        const selectedCount = Object.values(this.selectedOptions).flat().length;
        if (selectedCount > 0) {
            parts.push(`${selectedCount} option${selectedCount > 1 ? 's' : ''} selected`);
        }
        
        if (this.outputFile && this.outputFile.trim()) {
            parts.push(`Output: ${this.outputFile}${this.fileType}`);
        }
        
        if (this.customFlags && this.customFlags.trim()) {
            parts.push('Custom flags included');
        }
        
        return parts.length > 0 
            ? `Command includes: ${parts.join(' • ')}`
            : 'No options selected - will run default command';
    }

    /**
     * Save current command to localStorage
     * @param {string} name - Name for the saved command
     */
    saveCommand(name) {
        if (!name || !name.trim()) {
            throw new Error('Command name is required');
        }

        const saved = JSON.parse(localStorage.getItem('savedCommands') || '{}');
        
        if (!saved[this.toolName]) {
            saved[this.toolName] = [];
        }
        
        // Check for duplicate names
        const existingIndex = saved[this.toolName].findIndex(cmd => cmd.name === name);
        if (existingIndex !== -1) {
            if (!confirm(`Command "${name}" already exists. Overwrite?`)) {
                return false;
            }
            saved[this.toolName].splice(existingIndex, 1);
        }
        
        saved[this.toolName].push({
            name: name,
            command: this.generateCommand(),
            target: this.target,
            options: { ...this.selectedOptions },
            customFlags: this.customFlags,
            outputPath: this.outputPath,
            outputFile: this.outputFile,
            fileType: this.fileType,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('savedCommands', JSON.stringify(saved));
        return true;
    }

    /**
     * Load saved commands for this tool
     * @returns {Array} List of saved commands
     */
    loadSavedCommands() {
        const saved = JSON.parse(localStorage.getItem('savedCommands') || '{}');
        return saved[this.toolName] || [];
    }

    /**
     * Delete a saved command
     * @param {number} index - Index of command to delete
     */
    deleteSavedCommand(index) {
        const saved = JSON.parse(localStorage.getItem('savedCommands') || '{}');
        if (saved[this.toolName] && saved[this.toolName][index]) {
            saved[this.toolName].splice(index, 1);
            localStorage.setItem('savedCommands', JSON.stringify(saved));
            return true;
        }
        return false;
    }

    /**
     * Load a saved command into the builder
     * @param {object} savedCommand - The saved command object
     */
    loadCommand(savedCommand) {
        this.target = savedCommand.target || '';
        this.selectedOptions = savedCommand.options || {};
        this.customFlags = savedCommand.customFlags || '';
        this.outputPath = savedCommand.outputPath || '/home/kali/scans/';
        this.outputFile = savedCommand.outputFile || '';
        this.fileType = savedCommand.fileType || '.txt';
    }

    /**
     * Copy command to clipboard
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard() {
        const command = this.generateCommand();
        try {
            await navigator.clipboard.writeText(command);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            
            // Fallback for older browsers
            try {
                const textarea = document.createElement('textarea');
                textarea.value = command;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (fallbackErr) {
                console.error('Fallback copy failed:', fallbackErr);
                return false;
            }
        }
    }

    /**
     * Set target value
     * @param {string} target - Target IP/hostname
     */
    setTarget(target) {
        this.target = target;
    }

    /**
     * Set output configuration
     * @param {string} path - Output directory path
     * @param {string} filename - Output filename
     * @param {string} type - File extension
     */
    setOutput(path, filename, type) {
        this.outputPath = path || '/home/kali/scans/';
        this.outputFile = filename || '';
        this.fileType = type || '.txt';
    }

    /**
     * Toggle option selection
     * @param {string} category - Option category
     * @param {object} option - Option object with flag property
     * @param {string} value - Optional value for flags that need values
     */
    toggleOption(category, option, value = null) {
        if (!this.selectedOptions[category]) {
            this.selectedOptions[category] = [];
        }

        const existingIndex = this.selectedOptions[category]
            .findIndex(opt => opt.flag === option.flag);

        if (existingIndex >= 0) {
            // Remove if exists
            this.selectedOptions[category].splice(existingIndex, 1);
        } else {
            // Add new option
            const newOption = { ...option };
            if (value !== null) {
                newOption.value = value;
            }
            this.selectedOptions[category].push(newOption);
        }
    }

    /**
     * Check if an option is selected
     * @param {string} category - Option category
     * @param {string} flag - Flag to check
     * @returns {boolean} True if selected
     */
    isSelected(category, flag) {
        if (!this.selectedOptions[category]) return false;
        return this.selectedOptions[category].some(opt => opt.flag === flag);
    }

    /**
     * Get value for a selected option
     * @param {string} category - Option category
     * @param {string} flag - Flag to get value for
     * @returns {string|null} Option value or null
     */
    getOptionValue(category, flag) {
        if (!this.selectedOptions[category]) return null;
        const option = this.selectedOptions[category].find(opt => opt.flag === flag);
        return option ? option.value || null : null;
    }

    /**
     * Set custom flags
     * @param {string} flags - Custom flags string
     */
    setCustomFlags(flags) {
        this.customFlags = flags;
    }

    /**
     * Clear all selections
     */
    clearAll() {
        this.selectedOptions = {};
        this.customFlags = '';
        this.target = '';
        this.outputFile = '';
    }

    /**
     * Validate target based on tool type
     * @returns {object} Validation result {valid: boolean, message: string}
     */
    validateTarget() {
        if (!this.target || !this.target.trim()) {
            return { valid: false, message: 'Target is required' };
        }
        
        const target = this.target.trim();
        
        // Basic validation based on tool
        if (this.toolName === 'nmap') {
            // Check for IP, domain, or CIDR
            const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:[0-9]|[1-2][0-9]|3[0-2]))?$/;
            const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(?:\.[a-zA-Z]{2,})+$/;
            
            if (!ipRegex.test(target) && !domainRegex.test(target) && target !== 'localhost' && !target.includes('/')) {
                return { valid: false, message: 'Invalid IP address, domain, or CIDR range' };
            }
        }
        
        return { valid: true, message: 'Valid target' };
    }
}

// Make CommandBuilder globally available
window.CommandBuilder = CommandBuilder;

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommandBuilder;
}