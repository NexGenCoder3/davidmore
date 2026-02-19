import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'securing-jwt-authentication',
    title: 'Securing JWT Authentication: Common Pitfalls',
    category: 'Security',
    date: '2024-11-15',
    readingTime: 8,
    excerpt: 'A deep dive into JWT security vulnerabilities and how to prevent token hijacking, replay attacks, and improper validation.',
    tags: ['JWT', 'Authentication', 'Node.js'],
    content: `## The Problem with JWTs

JSON Web Tokens are everywhere. They power authentication in countless web applications. But most implementations have critical flaws.

### 1. Never Store JWTs in localStorage

\`\`\`javascript
// ❌ BAD - vulnerable to XSS
localStorage.setItem('token', jwt);

// ✅ GOOD - HttpOnly cookie
res.cookie('token', jwt, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000 // 15 minutes
});
\`\`\`

### 2. Always Validate the Algorithm

Attackers can change the algorithm header to "none" to bypass verification:

\`\`\`javascript
// ✅ Always specify allowed algorithms
jwt.verify(token, secret, { algorithms: ['HS256'] });
\`\`\`

### 3. Implement Token Rotation

Short-lived access tokens + refresh tokens = better security. Rotate refresh tokens on every use and maintain a deny list for compromised tokens.

### Key Takeaways

- Use HttpOnly cookies, not localStorage
- Validate algorithm headers explicitly
- Keep access tokens short-lived (15 min max)
- Implement refresh token rotation
- Monitor for anomalous token usage patterns`,
  },
  {
    slug: 'building-scalable-api-gateways',
    title: 'Building Scalable API Gateways with Go',
    category: 'Web Dev',
    date: '2024-10-02',
    readingTime: 12,
    excerpt: 'How I architected an API gateway handling millions of requests per day using Go, Redis, and rate limiting strategies.',
    tags: ['Go', 'API', 'Architecture', 'Redis'],
    content: `## Why Build a Custom API Gateway?

Off-the-shelf solutions like Kong or AWS API Gateway work great, but sometimes you need fine-grained control over routing, rate limiting, and request transformation.

### Architecture Overview

\`\`\`
Client → Load Balancer → API Gateway → Service Discovery → Microservices
                            ↓
                    Rate Limiter (Redis)
                    Auth Middleware
                    Request Logger
\`\`\`

### Rate Limiting with Sliding Window

\`\`\`go
func (rl *RateLimiter) Allow(key string) bool {
    now := time.Now().UnixNano()
    windowStart := now - rl.window.Nanoseconds()
    
    pipe := rl.redis.Pipeline()
    pipe.ZRemRangeByScore(ctx, key, "0", strconv.FormatInt(windowStart, 10))
    pipe.ZAdd(ctx, key, &redis.Z{Score: float64(now), Member: now})
    pipe.ZCard(ctx, key)
    pipe.Expire(ctx, key, rl.window)
    
    results, _ := pipe.Exec(ctx)
    count := results[2].(*redis.IntCmd).Val()
    return count <= rl.maxRequests
}
\`\`\`

### Results

- 50,000 requests/second throughput
- P99 latency under 5ms
- Zero downtime deployments with graceful shutdown`,
  },
  {
    slug: 'docker-security-hardening',
    title: 'Docker Security: Hardening Your Containers',
    category: 'DevOps',
    date: '2024-08-20',
    readingTime: 10,
    excerpt: 'Essential security practices for Docker containers including image scanning, rootless containers, and secrets management.',
    tags: ['Docker', 'Security', 'DevOps', 'Containers'],
    content: `## Container Security is Not Optional

Running \`docker run\` with default settings is a security risk. Here's how to lock it down.

### 1. Use Multi-stage Builds

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### 2. Scan Images Regularly

\`\`\`bash
# Using Trivy for vulnerability scanning
trivy image myapp:latest --severity HIGH,CRITICAL
\`\`\`

### 3. Never Run as Root

Always create a non-root user and switch to it. The \`USER\` directive in Dockerfile is your friend.

### 4. Read-only Filesystem

\`\`\`bash
docker run --read-only --tmpfs /tmp myapp:latest
\`\`\`

### Checklist

- [ ] Multi-stage builds to minimize attack surface
- [ ] Non-root user in all containers
- [ ] Regular vulnerability scanning
- [ ] Read-only filesystems where possible
- [ ] No secrets in environment variables or images`,
  },
  {
    slug: 'react-performance-patterns',
    title: 'React Performance Patterns That Actually Matter',
    category: 'Tutorials',
    date: '2024-07-05',
    readingTime: 7,
    excerpt: 'Forget premature optimization. These are the React patterns that make a measurable difference in real applications.',
    tags: ['React', 'Performance', 'TypeScript'],
    content: `## Stop Optimizing the Wrong Things

Not every component needs \`React.memo\`. Here's what actually matters.

### 1. Virtualize Long Lists

\`\`\`tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(vi => (
          <div key={vi.key} style={{
            position: 'absolute',
            top: vi.start,
            height: vi.size,
          }}>
            {items[vi.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### 2. Code Split at Route Level

\`\`\`tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
\`\`\`

### 3. Debounce Expensive Operations

\`\`\`tsx
const debouncedSearch = useMemo(
  () => debounce((term: string) => fetchResults(term), 300),
  []
);
\`\`\`

### The Golden Rule

Measure first, optimize second. Use React DevTools Profiler before adding \`useMemo\` everywhere.`,
  },
  {
    slug: 'setting-up-kubernetes-from-scratch',
    title: 'Setting Up Kubernetes from Scratch',
    category: 'DevOps',
    date: '2024-12-10',
    readingTime: 15,
    excerpt: 'A hands-on guide to deploying a production-ready Kubernetes cluster from the ground up, covering kubeadm, networking, ingress, and monitoring.',
    tags: ['Kubernetes', 'Docker', 'DevOps', 'Infrastructure'],
    content: `## Why Learn Kubernetes the Hard Way?

Managed K8s services like EKS and GKE are great, but understanding the internals makes you a better engineer. Here's how to build a cluster from scratch.

### Prerequisites

\`\`\`bash
# All nodes need these
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
\`\`\`

### Initialize the Control Plane

\`\`\`bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=<MASTER_IP>

# Set up kubeconfig
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
\`\`\`

### Install a CNI Plugin (Calico)

\`\`\`bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml

# Verify nodes are Ready
kubectl get nodes
\`\`\`

### Deploy Your First App

\`\`\`yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25-alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
\`\`\`

### Setting Up Ingress with NGINX

\`\`\`bash
# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.5/deploy/static/provider/baremetal/deploy.yaml
\`\`\`

\`\`\`yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
\`\`\`

### Monitoring with Prometheus

\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
\`\`\`

### Key Takeaways

- Always set resource requests and limits on pods
- Use namespaces to isolate workloads
- Enable RBAC from day one
- Set up monitoring before you need it
- Use \`kubectl describe\` and \`kubectl logs\` religiously for debugging
- Practice \`kubectl rollout undo\` — you will need it`,
  },
  {
    slug: 'waf-bypass-techniques',
    title: 'Web Application Firewall Bypass Techniques',
    category: 'Security',
    date: '2025-01-08',
    readingTime: 14,
    excerpt: 'Understanding how attackers bypass WAFs helps you build better defenses. A responsible disclosure perspective on common WAF evasion methods.',
    tags: ['WAF', 'Security', 'Pentesting', 'Defense'],
    content: `## Know Your Enemy

Understanding WAF bypass techniques isn't about attacking — it's about building defenses that actually work. This article covers common evasion methods from a defensive perspective.

### 1. Case Manipulation & Encoding

WAFs that use simple pattern matching fail against encoding tricks:

\`\`\`
# Basic SQLi blocked by WAF
' OR 1=1 --

# URL-encoded bypass
%27%20OR%201%3D1%20--

# Double URL encoding
%2527%2520OR%25201%253D1%2520--

# Mixed case (for case-sensitive WAFs)
' oR 1=1 --
\`\`\`

**Defense:** Normalize and decode all input BEFORE rule matching. Apply recursive decoding.

### 2. Chunked Transfer Encoding

Some WAFs only inspect complete request bodies:

\`\`\`http
POST /api/login HTTP/1.1
Transfer-Encoding: chunked

7\\r\\n
user=ad\\r\\n
5\\r\\n
min'--\\r\\n
0\\r\\n
\`\`\`

**Defense:** Reassemble chunked requests before inspection. Modern WAFs like ModSecurity handle this natively.

### 3. HTTP Parameter Pollution

Sending duplicate parameters can confuse WAFs that only check one instance:

\`\`\`
# WAF checks first 'id' parameter
/api/user?id=1&id=1 OR 1=1

# Backend may use the second one depending on framework:
# PHP: uses last
# ASP.NET: concatenates
# Node/Express: uses first
\`\`\`

**Defense:** Be aware of your framework's parameter parsing behavior. Validate at the application layer too.

### 4. Comment Injection in SQL

\`\`\`sql
-- Standard (blocked)
UNION SELECT * FROM users

-- With inline comments (may bypass)
UN/**/ION SEL/**/ECT * FR/**/OM users

-- MySQL version comments
/*!50000 UNION*/ SELECT * FROM users
\`\`\`

**Defense:** Use parameterized queries. No amount of WAF tuning replaces proper query construction.

### 5. JSON/XML Content-Type Switching

WAFs often have different rules for different content types:

\`\`\`
# Standard form POST (WAF inspects)
Content-Type: application/x-www-form-urlencoded
username=admin' OR 1=1--

# JSON POST (WAF might skip)
Content-Type: application/json
{"username": "admin' OR 1=1--"}
\`\`\`

**Defense:** Apply the same security rules regardless of Content-Type.

### Building Better Defenses

\`\`\`python
# Example: Multi-layer input validation
def sanitize_input(value: str) -> str:
    # Layer 1: Recursive URL decoding
    decoded = recursive_decode(value)
    
    # Layer 2: Normalize unicode
    normalized = unicodedata.normalize('NFKC', decoded)
    
    # Layer 3: Remove null bytes
    clean = normalized.replace('\\x00', '')
    
    # Layer 4: Validate against whitelist
    if not re.match(r'^[a-zA-Z0-9@._\\-]+$', clean):
        raise ValidationError("Invalid characters")
    
    return clean
\`\`\`

### The Golden Rules of WAF Defense

- WAFs are a **layer**, not a solution — always validate at the application level
- Use parameterized queries (prepared statements) — no exceptions
- Normalize input before rule matching
- Log and alert on bypass attempts
- Regularly update WAF rulesets
- Test your own WAF with tools like \`sqlmap --tamper\` and \`wafW00f\``,
  },
  {
    slug: 'building-realtime-apps-websockets',
    title: 'Building Real-time Apps with WebSockets',
    category: 'Web Dev',
    date: '2025-02-01',
    readingTime: 11,
    excerpt: 'A practical guide to building real-time features with WebSockets, covering connection management, scaling strategies, and fallback handling.',
    tags: ['WebSockets', 'Node.js', 'Real-time', 'Architecture'],
    content: `## Beyond HTTP: Why WebSockets?

HTTP is request-response. WebSockets give you a persistent, bidirectional channel. Perfect for chat, live dashboards, multiplayer games, and collaboration tools.

### Setting Up a WebSocket Server

\`\`\`typescript
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocketServer({ server });

// Connection tracking
const clients = new Map<string, WebSocket>();

wss.on('connection', (ws, req) => {
  const clientId = crypto.randomUUID();
  clients.set(clientId, ws);
  
  console.log(\`Client connected: \${clientId}\`);
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    clientId,
    timestamp: Date.now()
  }));
  
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    handleMessage(clientId, message);
  });
  
  ws.on('close', () => {
    clients.delete(clientId);
    broadcast({ type: 'user_left', clientId });
  });
  
  ws.on('error', (err) => {
    console.error(\`Client \${clientId} error:\`, err);
    clients.delete(clientId);
  });
});

function broadcast(data: object, exclude?: string) {
  const payload = JSON.stringify(data);
  clients.forEach((ws, id) => {
    if (id !== exclude && ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  });
}

server.listen(8080);
\`\`\`

### Client-Side with Auto-Reconnect

\`\`\`typescript
class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  
  constructor(private url: string) {
    this.connect();
  }
  
  private connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
    };
    
    this.ws.onclose = (event) => {
      if (!event.wasClean) {
        this.attemptReconnect();
      }
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
  }
  
  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    this.reconnectDelay *= 2; // Exponential backoff
    
    setTimeout(() => {
      console.log(\`Reconnecting... attempt \${this.reconnectAttempts}\`);
      this.connect();
    }, this.reconnectDelay);
  }
  
  send(data: object) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  
  private handleMessage(data: any) {
    // Handle incoming messages
    console.log('Received:', data);
  }
}
\`\`\`

### Scaling WebSockets with Redis Pub/Sub

Single servers can't handle all connections. Use Redis to broadcast across instances:

\`\`\`typescript
import Redis from 'ioredis';

const pub = new Redis();
const sub = new Redis();

// Subscribe to channels
sub.subscribe('chat', 'notifications');

sub.on('message', (channel, message) => {
  // Broadcast to all local WebSocket clients
  const data = JSON.parse(message);
  broadcast(data);
});

function handleMessage(clientId: string, message: any) {
  switch (message.type) {
    case 'chat_message':
      // Publish to Redis — all server instances receive it
      pub.publish('chat', JSON.stringify({
        type: 'chat_message',
        from: clientId,
        text: message.text,
        timestamp: Date.now()
      }));
      break;
  }
}
\`\`\`

### Heartbeat / Ping-Pong

Detect dead connections and prevent timeouts:

\`\`\`typescript
// Server-side heartbeat
const HEARTBEAT_INTERVAL = 30000;

wss.on('connection', (ws) => {
  let isAlive = true;
  
  ws.on('pong', () => { isAlive = true; });
  
  const interval = setInterval(() => {
    if (!isAlive) {
      ws.terminate();
      clearInterval(interval);
      return;
    }
    isAlive = false;
    ws.ping();
  }, HEARTBEAT_INTERVAL);
  
  ws.on('close', () => clearInterval(interval));
});
\`\`\`

### Key Takeaways

- Use WebSockets for true real-time needs; SSE for server-push only
- Always implement reconnection with exponential backoff
- Scale horizontally with Redis Pub/Sub or similar message broker
- Heartbeat/ping-pong keeps connections alive and detects zombies
- Consider Socket.IO if you need automatic fallback to long-polling
- Rate limit WebSocket messages to prevent abuse
- Authenticate on the initial HTTP upgrade request, not after connection`,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(p => p.category === category);
};