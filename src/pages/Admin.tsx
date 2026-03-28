import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { getAnalyticsData } from '@/hooks/useAnalytics';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(142,70%,50%)', 'hsl(142,50%,40%)', 'hsl(142,70%,60%)', 'hsl(142,30%,35%)'];

function AdminDashboard() {
  const data = getAnalyticsData();

  const pageData = Object.entries(data.pageCounts)
    .map(([page, views]) => ({ page: page === '/' ? 'Home' : page.slice(1), views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  const browserData = Object.entries(data.browsers).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-terminal-bg pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto font-mono">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="text-hacker-green/60 text-sm mb-2">
            <span className="text-hacker-green">$</span> sudo analytics --dashboard
          </div>
          <h1 className="text-2xl md:text-3xl text-hacker-green-glow font-bold">
            ADMIN_DASHBOARD
          </h1>
          <p className="text-hacker-green/40 text-xs mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-hacker-green animate-pulse mr-1" />
            Live Analytics • Client-side tracking
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Views', value: data.totalViews },
            { label: 'Unique Visitors', value: data.uniqueVisitors },
            { label: 'Bounce Rate', value: `${data.bounceRate}%` },
            { label: 'Pages Tracked', value: Object.keys(data.pageCounts).length },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="border border-hacker-green/20 rounded-lg p-4"
            >
              <div className="text-hacker-green/50 text-xs">{stat.label}</div>
              <div className="text-hacker-green-glow text-2xl font-bold mt-1">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="border border-hacker-green/20 rounded-lg p-4">
            <h3 className="text-hacker-green/60 text-sm mb-4">Traffic (7 days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.dailyTraffic}>
                <XAxis dataKey="date" tick={{ fill: 'hsl(142,70%,50%)', fontSize: 10 }} />
                <YAxis tick={{ fill: 'hsl(142,70%,50%)', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: 'hsl(120,15%,4%)', border: '1px solid hsl(142,70%,50%,0.3)', color: 'hsl(142,70%,50%)' }} />
                <Line type="monotone" dataKey="views" stroke="hsl(142,70%,50%)" strokeWidth={2} dot={{ fill: 'hsl(142,90%,60%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="border border-hacker-green/20 rounded-lg p-4">
            <h3 className="text-hacker-green/60 text-sm mb-4">Top Pages</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pageData} layout="vertical">
                <XAxis type="number" tick={{ fill: 'hsl(142,70%,50%)', fontSize: 10 }} />
                <YAxis type="category" dataKey="page" tick={{ fill: 'hsl(142,70%,50%)', fontSize: 10 }} width={80} />
                <Tooltip contentStyle={{ background: 'hsl(120,15%,4%)', border: '1px solid hsl(142,70%,50%,0.3)', color: 'hsl(142,70%,50%)' }} />
                <Bar dataKey="views" fill="hsl(142,70%,50%)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="border border-hacker-green/20 rounded-lg p-4">
            <h3 className="text-hacker-green/60 text-sm mb-4">Browser Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={browserData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {browserData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(120,15%,4%)', border: '1px solid hsl(142,70%,50%,0.3)', color: 'hsl(142,70%,50%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="border border-hacker-green/20 rounded-lg p-4">
            <h3 className="text-hacker-green/60 text-sm mb-4">System Info</h3>
            <div className="space-y-2 text-sm text-hacker-green/70">
              <div>Platform: {navigator.platform}</div>
              <div>Language: {navigator.language}</div>
              <div>Screen: {window.screen.width}x{window.screen.height}</div>
              <div>Online: {navigator.onLine ? 'Yes' : 'No'}</div>
              <div>Cookies: {navigator.cookieEnabled ? 'Enabled' : 'Disabled'}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <>
      <SEOHead title="Demo Analytics" description="Demo visitor analytics dashboard." noindex />
      <AdminDashboard />
    </>
  );
}