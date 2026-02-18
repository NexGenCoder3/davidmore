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
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(p => p.category === category);
};
