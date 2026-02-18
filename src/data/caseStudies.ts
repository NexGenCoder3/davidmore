import type { CaseStudy } from '@/types';

export const caseStudies: Record<string, CaseStudy> = {
  'secure-auth-framework': {
    challenge: 'Modern web applications need robust authentication, but most implementations suffer from token theft, replay attacks, and brute-force vulnerabilities. Existing solutions were either too rigid or lacked security depth.',
    approach: 'Built a modular authentication framework from scratch using Node.js and TypeScript. Implemented JWT with short-lived access tokens, refresh token rotation, and Redis-backed session management. Added rate limiting and IP-based brute force protection.',
    features: [
      'JWT access + refresh token rotation',
      'OAuth2 integration (Google, GitHub)',
      'Redis-backed session store',
      'Rate limiting with sliding window algorithm',
      'Brute force protection with exponential backoff',
      'CSRF and XSS protection middleware',
    ],
    results: [
      'Zero authentication-related security incidents post-deployment',
      'Sub-50ms token validation latency',
      '200+ GitHub stars on the open-source release',
      'Adopted by 3 production applications',
    ],
    codeSnippet: {
      language: 'typescript',
      caption: 'Refresh token rotation with Redis',
      code: `async function rotateRefreshToken(oldToken: string) {
  const payload = jwt.verify(oldToken, REFRESH_SECRET);
  
  // Invalidate old token
  await redis.del(\`refresh:\${oldToken}\`);
  
  // Generate new pair
  const accessToken = jwt.sign(
    { userId: payload.userId },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId: payload.userId },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  await redis.set(\`refresh:\${refreshToken}\`, payload.userId, 'EX', 604800);
  return { accessToken, refreshToken };
}`,
    },
    lessons: [
      'Security should be the default, not an afterthought',
      'Short-lived tokens significantly reduce the blast radius of compromises',
      'Redis is excellent for session management at scale',
    ],
  },
  'netscanner-pro': {
    challenge: 'Security teams needed a unified tool for network reconnaissance that could combine port scanning, service detection, and vulnerability assessment into a single workflow with real-time reporting.',
    approach: 'Developed in Python using Scapy for packet crafting and the Nmap API for service detection. Built a modular plugin architecture allowing custom scan profiles and automated report generation.',
    features: [
      'Multi-threaded port scanning (SYN, TCP, UDP)',
      'Service version detection and OS fingerprinting',
      'CVE database integration for vulnerability mapping',
      'Real-time scan progress with WebSocket updates',
      'PDF report generation with risk scoring',
      'Custom scan profile configuration',
    ],
    results: [
      'Reduced security audit time by 60%',
      'Used by 5 security firms for client assessments',
      'Identified 150+ vulnerabilities across client networks',
      'Featured in cybersecurity newsletter',
    ],
    codeSnippet: {
      language: 'python',
      caption: 'SYN scan implementation with Scapy',
      code: `def syn_scan(target, ports):
    results = []
    for port in ports:
        pkt = IP(dst=target) / TCP(dport=port, flags="S")
        resp = sr1(pkt, timeout=2, verbose=0)
        
        if resp and resp.haslayer(TCP):
            if resp[TCP].flags == 0x12:  # SYN-ACK
                results.append({
                    'port': port,
                    'state': 'open',
                    'service': get_service(port)
                })
                # Send RST to close
                sr1(IP(dst=target) / TCP(dport=port, flags="R"), timeout=1, verbose=0)
    return results`,
    },
    lessons: [
      'Always respect rate limits and get proper authorization before scanning',
      'Modular plugin architecture makes tools extensible and maintainable',
      'Real-time feedback dramatically improves user experience for long-running scans',
    ],
  },
  'clouddeploy-cli': {
    challenge: 'Deploying to multiple cloud providers required switching between different CLI tools and configurations. Teams wasted hours on repetitive deployment tasks that could be automated.',
    approach: 'Built a unified CLI in Go with a plugin system for AWS, GCP, and Azure. Integrated Terraform for infrastructure-as-code and Docker for containerized deployments. Added rollback capabilities with version tracking.',
    features: [
      'Multi-cloud support (AWS, GCP, Azure)',
      'Infrastructure-as-code with Terraform integration',
      'Docker container build and push',
      'Blue-green deployment strategy',
      'Automatic rollback on health check failure',
      'Configuration management with encrypted secrets',
    ],
    results: [
      'Deployment time reduced from 45 minutes to 5 minutes',
      'Zero-downtime deployments across 3 cloud providers',
      'Adopted by 2 enterprise teams',
      '95% reduction in deployment-related incidents',
    ],
    lessons: [
      'Go\'s single binary distribution makes CLI tools incredibly portable',
      'Always implement rollback — deployments will fail',
      'User experience matters even in CLI tools (progress bars, colors, clear errors)',
    ],
  },
  'reactflow-dashboard': {
    challenge: 'SaaS startups needed customizable analytics dashboards but existing solutions were either too expensive or too rigid. They needed a self-hostable, real-time dashboard framework.',
    approach: 'Built with React and TypeScript using D3.js for custom visualizations. Implemented a widget-based architecture where users can drag-and-drop chart components and configure data sources.',
    features: [
      'Drag-and-drop widget layout',
      'Real-time data streaming via WebSocket',
      'Custom chart components (line, bar, pie, heatmap)',
      'Dark mode with system preference detection',
      'Export to PNG/PDF',
      'Responsive design for mobile monitoring',
    ],
    results: [
      'Renders 10,000+ data points at 60fps',
      'Used by 4 SaaS startups for internal analytics',
      'Reduced dashboard development time by 70%',
    ],
    lessons: [
      'D3.js + React requires careful DOM management — let React handle the DOM',
      'WebSocket reconnection logic is critical for real-time dashboards',
      'Users want simple defaults with power-user customization options',
    ],
  },
  'cryptovault': {
    challenge: 'Most password managers require trusting a third party with your encrypted data. Users needed a zero-knowledge solution where the server never sees plaintext passwords.',
    approach: 'Built the encryption layer in Rust compiled to WebAssembly for browser-side performance. Used AES-256-GCM for encryption with Argon2id for key derivation. The server only stores encrypted blobs.',
    features: [
      'Zero-knowledge architecture',
      'AES-256-GCM encryption',
      'Argon2id key derivation',
      'WebAuthn biometric authentication',
      'Secure password sharing with expiry',
      'Breach detection via HaveIBeenPwned API',
    ],
    results: [
      'Encryption/decryption in under 5ms via WASM',
      'Passed independent security audit',
      'Zero data breaches since launch',
    ],
    codeSnippet: {
      language: 'rust',
      caption: 'AES-256-GCM encryption in Rust/WASM',
      code: `pub fn encrypt(plaintext: &[u8], key: &[u8; 32]) -> Result<Vec<u8>> {
    let cipher = Aes256Gcm::new(Key::from_slice(key));
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
    
    let ciphertext = cipher
        .encrypt(&nonce, plaintext)
        .map_err(|_| Error::EncryptionFailed)?;
    
    // Prepend nonce to ciphertext
    let mut result = nonce.to_vec();
    result.extend_from_slice(&ciphertext);
    Ok(result)
}`,
    },
    lessons: [
      'Rust + WASM delivers near-native performance in the browser',
      'Zero-knowledge architectures are complex but worth the trust they build',
      'Always use authenticated encryption (GCM) — never just AES-CBC',
    ],
  },
  'api-gateway': {
    challenge: 'Microservices architecture created an explosion of API endpoints that needed unified rate limiting, authentication, and monitoring without adding latency.',
    approach: 'Built in Go for maximum throughput with Redis for distributed rate limiting. Implemented a plugin middleware chain for flexible request processing.',
    features: [
      'Reverse proxy with health-aware load balancing',
      'Sliding window rate limiting',
      'JWT validation middleware',
      'Request/response transformation',
      'Distributed tracing with OpenTelemetry',
      'Admin dashboard for real-time metrics',
    ],
    results: [
      '50,000 requests/second throughput',
      'P99 latency under 5ms',
      'Handles 2M+ daily requests in production',
      'Zero downtime over 6 months',
    ],
    lessons: [
      'Go\'s goroutines make concurrent request handling trivial',
      'Redis pipeline operations dramatically reduce latency for rate limiting',
      'Graceful shutdown is essential for zero-downtime deployments',
    ],
  },
  'devops-toolkit': {
    challenge: 'Startups were spending too much time on manual DevOps tasks — setting up CI/CD, configuring monitoring, and managing infrastructure. They needed reusable automation.',
    approach: 'Created a collection of battle-tested scripts and configurations in Bash and Python. Bundled with Kubernetes manifests, Prometheus/Grafana dashboards, and GitHub Actions workflows.',
    features: [
      'One-command Kubernetes cluster setup',
      'Pre-configured CI/CD pipeline templates',
      'Prometheus + Grafana monitoring stack',
      'Automated SSL certificate management',
      'Log aggregation with ELK stack',
      'Infrastructure cost optimization scripts',
    ],
    results: [
      'Used by 10+ startup teams',
      'Reduced initial DevOps setup from 2 weeks to 2 hours',
      'Saved an average of $500/month in cloud costs per client',
    ],
    lessons: [
      'Documentation is as important as the code itself',
      'Sensible defaults with override options satisfy both beginners and experts',
      'Automation ROI compounds — invest early',
    ],
  },
  'realtime-chat': {
    challenge: 'Enterprise teams needed a self-hosted chat solution with end-to-end encryption, file sharing, and multi-room support that could integrate with existing authentication systems.',
    approach: 'Built with Node.js and Socket.io for real-time messaging, MongoDB for persistence, and a React frontend. Implemented message encryption at the application layer with per-room key management.',
    features: [
      'Real-time messaging with Socket.io',
      'End-to-end message encryption',
      'Multi-room with role-based access',
      'File sharing with virus scanning',
      'Message search and pinning',
      'Typing indicators and read receipts',
    ],
    results: [
      'Supports 10,000 concurrent connections',
      'Message delivery latency under 50ms',
      'Deployed across 3 enterprise clients',
      '99.99% uptime over 12 months',
    ],
    lessons: [
      'Socket.io\'s room abstraction simplifies multi-channel architecture',
      'Message ordering in distributed systems is harder than it looks',
      'File uploads need rate limiting and size checks to prevent abuse',
    ],
  },
};
