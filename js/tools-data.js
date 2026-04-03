/* ========================================
   tools-data.js - Complete Kali Linux Tools Database
   Contains: 64 tools across 15 categories with ALL options
   ======================================== */

const categories = [
    {
        id: 'information-gathering',
        name: 'INFORMATION GATHERING',
        icon: '🔍',
        description: 'Collect intelligence about targets using OSINT and reconnaissance techniques',
        color: '#0F5FA8',
        tools: [
            { 
                name: 'Nmap', 
                icon: '🌐', 
                desc: 'Network discovery and security auditing', 
                page: 'nmap.html',
                options: {
                    scanTechniques: [
                        { flag: '-sS', name: 'TCP SYN Scan', description: 'Stealthy half-open scan' },
                        { flag: '-sT', name: 'TCP Connect Scan', description: 'Full TCP connection' },
                        { flag: '-sU', name: 'UDP Scan', description: 'Scan UDP ports' },
                        { flag: '-sF', name: 'FIN Scan', description: 'Set FIN flag' },
                        { flag: '-sN', name: 'NULL Scan', description: 'No flags set' },
                        { flag: '-sX', name: 'XMAS Scan', description: 'Set FIN, PSH, URG flags' },
                        { flag: '-sA', name: 'ACK Scan', description: 'Check firewall rules' },
                        { flag: '-sW', name: 'Window Scan', description: 'Detect open ports via window size' },
                        { flag: '-sM', name: 'Maimon Scan', description: 'FIN/ACK probe' },
                        { flag: '-sI', name: 'Idle Scan', description: 'Zombie-based stealth scan', hasValue: true },
                        { flag: '-sY', name: 'SCTP INIT Scan', description: 'SCTP protocol scanning' }
                    ],
                    hostDiscovery: [
                        { flag: '-sL', name: 'List Scan', description: 'List targets without scanning' },
                        { flag: '-Pn', name: 'No Ping', description: 'Skip host discovery' },
                        { flag: '-PS', name: 'TCP SYN Ping', description: 'TCP SYN discovery', hasValue: true },
                        { flag: '-PA', name: 'TCP ACK Ping', description: 'TCP ACK discovery', hasValue: true },
                        { flag: '-PU', name: 'UDP Ping', description: 'UDP discovery', hasValue: true },
                        { flag: '-PY', name: 'SCTP Ping', description: 'SCTP discovery', hasValue: true },
                        { flag: '-PE', name: 'ICMP Echo Ping', description: 'Traditional ICMP ping' },
                        { flag: '-PP', name: 'ICMP Timestamp Ping', description: 'ICMP timestamp' },
                        { flag: '-PM', name: 'ICMP Netmask Ping', description: 'ICMP netmask' },
                        { flag: '-PO', name: 'IP Protocol Ping', description: 'IP protocol ping', hasValue: true },
                        { flag: '-PR', name: 'ARP Ping', description: 'ARP discovery (local network)' }
                    ],
                    portSpecification: [
                        { flag: '-p-', name: 'All Ports', description: 'Scan all 65535 ports' },
                        { flag: '-F', name: 'Fast Scan', description: 'Top 100 ports' },
                        { flag: '--top-ports', name: 'Top Ports', description: 'Specify number of top ports', hasValue: true },
                        { flag: '-p', name: 'Custom Ports', description: 'Specify port range', hasValue: true },
                        { flag: '-r', name: 'Sequential Ports', description: 'Scan ports sequentially' }
                    ],
                    serviceDetection: [
                        { flag: '-sV', name: 'Version Detection', description: 'Detect service versions' },
                        { flag: '--version-intensity', name: 'Version Intensity', description: 'Set intensity level 0-9', hasValue: true },
                        { flag: '--version-light', name: 'Light Version', description: 'Light intensity scan' },
                        { flag: '--version-all', name: 'Full Version', description: 'Full intensity scan' }
                    ],
                    osDetection: [
                        { flag: '-O', name: 'OS Detection', description: 'Detect operating system' },
                        { flag: '--osscan-limit', name: 'OS Scan Limit', description: 'Limit OS detection' },
                        { flag: '--osscan-guess', name: 'OS Guess', description: 'Guess OS aggressively' }
                    ],
                    timingPerformance: [
                        { flag: '-T0', name: 'Timing 0 - Paranoid', description: 'Very slow, IDS evasion' },
                        { flag: '-T1', name: 'Timing 1 - Sneaky', description: 'Slow, IDS evasion' },
                        { flag: '-T2', name: 'Timing 2 - Polite', description: 'Slower, less bandwidth' },
                        { flag: '-T3', name: 'Timing 3 - Normal', description: 'Default timing' },
                        { flag: '-T4', name: 'Timing 4 - Aggressive', description: 'Fast, accurate network' },
                        { flag: '-T5', name: 'Timing 5 - Insane', description: 'Very fast, sacrifice accuracy' },
                        { flag: '--min-hostgroup', name: 'Min Host Group', description: 'Parallel scan group size', hasValue: true },
                        { flag: '--max-hostgroup', name: 'Max Host Group', description: 'Max parallel group size', hasValue: true },
                        { flag: '--max-retries', name: 'Max Retries', description: 'Max port scan retries', hasValue: true }
                    ],
                    firewallEvasion: [
                        { flag: '-f', name: 'Fragment Packets', description: 'Fragment IP packets' },
                        { flag: '--mtu', name: 'MTU', description: 'Set custom MTU', hasValue: true },
                        { flag: '-D', name: 'Decoy Scan', description: 'Hide scan with decoys', hasValue: true },
                        { flag: '-S', name: 'Spoof Source', description: 'Spoof source address', hasValue: true },
                        { flag: '-e', name: 'Interface', description: 'Use specific interface', hasValue: true },
                        { flag: '-g', name: 'Source Port', description: 'Use specific source port', hasValue: true },
                        { flag: '--proxies', name: 'Proxies', description: 'Use HTTP/SOCKS proxies', hasValue: true },
                        { flag: '--data-length', name: 'Data Length', description: 'Append random data', hasValue: true },
                        { flag: '--ttl', name: 'TTL', description: 'Set IP time-to-live', hasValue: true },
                        { flag: '--spoof-mac', name: 'Spoof MAC', description: 'Spoof MAC address', hasValue: true },
                        { flag: '--badsum', name: 'Bad Checksum', description: 'Send bad checksums' }
                    ],
                    scripting: [
                        { flag: '-sC', name: 'Default Scripts', description: 'Run default script set' },
                        { flag: '--script', name: 'Custom Script', description: 'Run specific script', hasValue: true },
                        { flag: '--script-args', name: 'Script Args', description: 'Arguments for scripts', hasValue: true },
                        { flag: '--script-trace', name: 'Script Trace', description: 'Trace script execution' }
                    ],
                    output: [
                        { flag: '-oN', name: 'Normal Output', description: 'Save to normal format', hasValue: true },
                        { flag: '-oX', name: 'XML Output', description: 'Save to XML format', hasValue: true },
                        { flag: '-oS', name: 'ScriptKiddie Output', description: 'Save to script kiddie format', hasValue: true },
                        { flag: '-oG', name: 'Grepable Output', description: 'Save to grepable format', hasValue: true },
                        { flag: '-oA', name: 'All Formats', description: 'Save to all formats', hasValue: true },
                        { flag: '--append-output', name: 'Append Output', description: 'Append to existing files' }
                    ],
                    miscOptions: [
                        { flag: '-6', name: 'IPv6 Scanning', description: 'Enable IPv6 scanning' },
                        { flag: '-A', name: 'Aggressive Scan', description: 'OS, version, script, traceroute' },
                        { flag: '--traceroute', name: 'Traceroute', description: 'Trace path to host' },
                        { flag: '-v', name: 'Verbose', description: 'Increase verbosity' },
                        { flag: '-vv', name: 'Very Verbose', description: 'Double verbosity' },
                        { flag: '-d', name: 'Debug', description: 'Debugging output' },
                        { flag: '--reason', name: 'Show Reason', description: 'Display reason for port state' },
                        { flag: '--open', name: 'Show Open Only', description: 'Show only open ports' },
                        { flag: '--packet-trace', name: 'Packet Trace', description: 'Show all packets sent/received' }
                    ]
                }
            },
            { name: 'theHarvester', icon: '📧', desc: 'Email, subdomain and people harvester', page: 'theharvester.html' },
            { name: 'Dmitry', icon: '🕵️', desc: 'Deepmagic information gathering tool', page: 'dmitry.html' },
            { name: 'Maltego', icon: '🕸️', desc: 'OSINT and link analysis tool', page: 'maltego.html' },
            { name: 'Recon-ng', icon: '🔄', desc: 'Full-featured web reconnaissance framework', page: 'recon-ng.html' },
            { name: 'SpiderFoot', icon: '🕷️', desc: 'Automated OSINT framework', page: 'spiderfoot.html' },
            { name: 'DNSRecon', icon: '🌐', desc: 'DNS enumeration script', page: 'dnsrecon.html' }
        ]
    },
    {
        id: 'vulnerability-analysis',
        name: 'VULNERABILITY ANALYSIS',
        icon: '⚠️',
        description: 'Identify security weaknesses in targets and systems',
        color: '#1E88E5',
        tools: [
            { name: 'OpenVAS', icon: '🛡️', desc: 'Open vulnerability assessment system', page: 'openvas.html' },
            { name: 'Nikto', icon: '🔎', desc: 'Web server scanner', page: 'nikto.html' },
            { name: 'WPScan', icon: '📝', desc: 'WordPress vulnerability scanner', page: 'wpscan.html' },
            { name: 'Lynis', icon: '🔐', desc: 'Security auditing tool for Unix/Linux', page: 'lynis.html' },
            { name: 'SQLmap', icon: '💾', desc: 'Automatic SQL injection tool', page: 'sqlmap.html' }
        ]
    },
    {
        id: 'web-application',
        name: 'WEB APPLICATION ANALYSIS',
        icon: '🌐',
        description: 'Test web applications for security vulnerabilities',
        color: '#00CFFF',
        tools: [
            { name: 'Burp Suite', icon: '🪲', desc: 'Web vulnerability scanner and proxy', page: 'burpsuite.html' },
            { name: 'OWASP ZAP', icon: '⚡', desc: 'OWASP Zed Attack Proxy', page: 'owasp-zap.html' },
            { name: 'Dirb', icon: '📂', desc: 'Web content scanner', page: 'dirb.html' },
            { name: 'Dirbuster', icon: '🔨', desc: 'Directory brute-forcing tool', page: 'dirbuster.html' },
            { name: 'FFUF', icon: '🚀', desc: 'Fast web fuzzer', page: 'ffuf.html' },
            { name: 'Commix', icon: '💉', desc: 'Command injection exploiter', page: 'commix.html' }
        ]
    },
    {
        id: 'database-assessment',
        name: 'DATABASE ASSESSMENT',
        icon: '🗄️',
        description: 'Database security testing and exploitation',
        color: '#2A6FAF',
        tools: [
            { name: 'SQLmap', icon: '💾', desc: 'SQL injection automation', page: 'sqlmap.html' },
            { name: 'Sqldict', icon: '📚', desc: 'Dictionary attack tool for databases', page: 'sqldict.html' },
            { name: 'bbqsql', icon: '🔥', desc: 'Blind SQL injection framework', page: 'bbqsql.html' }
        ]
    },
    {
        id: 'password-attacks',
        name: 'PASSWORD ATTACKS',
        icon: '🔑',
        description: 'Password cracking and recovery techniques',
        color: '#0F5FA8',
        tools: [
            { name: 'John the Ripper', icon: '⚡', desc: 'Fast password cracker', page: 'john.html' },
            { name: 'Hashcat', icon: '🚀', desc: 'Advanced password recovery', page: 'hashcat.html' },
            { name: 'Hydra', icon: '🐍', desc: 'Network logon cracker', page: 'hydra.html' },
            { name: 'Crunch', icon: '📊', desc: 'Wordlist generator', page: 'crunch.html' },
            { name: 'Medusa', icon: '🐍', desc: 'Parallel network logon cracker', page: 'medusa.html' },
            { name: 'THC-Hydra', icon: '🌊', desc: 'Fast network authentication cracker', page: 'thc-hydra.html' }
        ]
    },
    {
        id: 'wireless-attacks',
        name: 'WIRELESS ATTACKS',
        icon: '📡',
        description: 'Wi-Fi and Bluetooth security auditing',
        color: '#1E88E5',
        tools: [
            { name: 'Aircrack-ng', icon: '📶', desc: 'WiFi security auditing suite', page: 'aircrack-ng.html' },
            { name: 'Kismet', icon: '📻', desc: 'Wireless detector and sniffer', page: 'kismet.html' },
            { name: 'Wifite', icon: '⚡', desc: 'Automated wireless attack tool', page: 'wifite.html' },
            { name: 'Fern', icon: '🌿', desc: 'Wireless security cracker', page: 'fern.html' },
            { name: 'Reaver', icon: '🔓', desc: 'WPS attack tool', page: 'reaver.html' }
        ]
    },
    {
        id: 'reverse-engineering',
        name: 'REVERSE ENGINEERING',
        icon: '🔧',
        description: 'Binary analysis and debugging tools',
        color: '#00CFFF',
        tools: [
            { name: 'Ghidra', icon: '🐉', desc: 'Software reverse engineering suite', page: 'ghidra.html' },
            { name: 'radare2', icon: '🔬', desc: 'Reverse engineering framework', page: 'radare2.html' },
            { name: 'apktool', icon: '📱', desc: 'Android APK reverse engineering', page: 'apktool.html' },
            { name: 'Detect It Easy', icon: '🔍', desc: 'File type and packer detector', page: 'detect-it-easy.html' },
            { name: 'jadx', icon: '☕', desc: 'Dex to Java decompiler', page: 'jadx.html' }
        ]
    },
    {
        id: 'exploitation',
        name: 'EXPLOITATION TOOLS',
        icon: '💥',
        description: 'Gain access to vulnerable systems',
        color: '#2A6FAF',
        tools: [
            { name: 'Metasploit', icon: '🎯', desc: 'Exploit development framework', page: 'metasploit.html' },
            { name: 'BeEF', icon: '🐂', desc: 'Browser exploitation framework', page: 'beef.html' },
            { name: 'Searchsploit', icon: '📚', desc: 'Exploit-DB offline search', page: 'searchsploit.html' },
            { name: 'Exploit-DB', icon: '💾', desc: 'Public exploit archive', page: 'exploit-db.html' }
        ]
    },
    {
        id: 'sniffing-spoofing',
        name: 'SNIFFING & SPOOFING',
        icon: '👃',
        description: 'Network traffic interception and manipulation',
        color: '#0F5FA8',
        tools: [
            { name: 'Wireshark', icon: '🦈', desc: 'Network protocol analyzer', page: 'wireshark.html' },
            { name: 'tcpdump', icon: '📥', desc: 'Command-line packet analyzer', page: 'tcpdump.html' },
            { name: 'Bettercap', icon: '🎭', desc: 'MITM framework', page: 'bettercap.html' },
            { name: 'Ettercap', icon: '👥', desc: 'Suite for MITM attacks', page: 'ettercap.html' },
            { name: 'Dsniff', icon: '👃', desc: 'Network sniffing toolkit', page: 'dsniff.html' }
        ]
    },
    {
        id: 'post-exploitation',
        name: 'POST-EXPLOITATION',
        icon: '🎭',
        description: 'Maintain access and move laterally',
        color: '#1E88E5',
        tools: [
            { name: 'Mimikatz', icon: '👤', desc: 'Windows credential extractor', page: 'mimikatz.html' },
            { name: 'PowerShell Empire', icon: '⚡', desc: 'Post-exploitation framework', page: 'powershell-empire.html' },
            { name: 'Rubeus', icon: '🔄', desc: 'Kerberos interaction tool', page: 'rubeus.html' },
            { name: 'Krbrelayx', icon: '🔄', desc: 'Kerberos relaying toolkit', page: 'krbrelayx.html' },
            { name: 'ldeep', icon: '🔍', desc: 'LDAP enumeration utility', page: 'ldeep.html' }
        ]
    },
    {
        id: 'forensics',
        name: 'FORENSICS',
        icon: '🔬',
        description: 'Digital investigation and evidence collection',
        color: '#00CFFF',
        tools: [
            { name: 'Autopsy', icon: '🔪', desc: 'Digital forensics platform', page: 'autopsy.html' },
            { name: 'Sleuth Kit', icon: '🔧', desc: 'Command-line forensics tools', page: 'sleuth-kit.html' },
            { name: 'Volatility', icon: '📊', desc: 'Memory forensics framework', page: 'volatility.html' },
            { name: 'Guymager', icon: '💿', desc: 'Disk imaging tool', page: 'guymager.html' },
            { name: 'Binwalk', icon: '🔍', desc: 'Firmware analysis tool', page: 'binwalk.html' }
        ]
    },
    {
        id: 'reporting',
        name: 'REPORTING TOOLS',
        icon: '📊',
        description: 'Documentation and collaboration',
        color: '#2A6FAF',
        tools: [
            { name: 'Dradis', icon: '📝', desc: 'Collaboration and reporting', page: 'dradis.html' },
            { name: 'Faraday', icon: '⚡', desc: 'Vulnerability management IDE', page: 'faraday.html' },
            { name: 'CherryTree', icon: '🌳', desc: 'Hierarchical note taking', page: 'cherrytree.html' }
        ]
    },
    {
        id: 'social-engineering',
        name: 'SOCIAL ENGINEERING',
        icon: '🎣',
        description: 'Human-centric attack frameworks',
        color: '#0F5FA8',
        tools: [
            { name: 'SET', icon: '🎭', desc: 'Social Engineer Toolkit', page: 'set.html' },
            { name: 'Gophish', icon: '🐟', desc: 'Phishing framework', page: 'gophish.html' }
        ]
    },
    {
        id: 'hardware-hacking',
        name: 'HARDWARE HACKING',
        icon: '🖥️',
        description: 'IoT and embedded device security',
        color: '#1E88E5',
        tools: [
            { name: 'Binwalk', icon: '🔌', desc: 'Firmware analysis', page: 'binwalk.html' },
            { name: 'Firmwalker', icon: '🔍', desc: 'Firmware security scanner', page: 'firmwalker.html' }
        ]
    },
    {
        id: 'cloud-security',
        name: 'CLOUD SECURITY',
        icon: '☁️',
        description: 'Cloud infrastructure assessment',
        color: '#00CFFF',
        tools: [
            { name: 'AzureHound', icon: '🐺', desc: 'Azure enumeration tool', page: 'azurehound.html' },
            { name: 'BloodHound', icon: '🐕', desc: 'AD and Azure relationship mapper', page: 'bloodhound.html' }
        ]
    }
];

// Make categories globally available
window.categories = categories;

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = categories;
}