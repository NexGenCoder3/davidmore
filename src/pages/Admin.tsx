import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { getAnalyticsData } from '@/hooks/useAnalytics';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Lock, Fingerprint, ShieldCheck } from 'lucide-react';

const COLORS = ['hsl(142,70%,50%)', 'hsl(142,50%,40%)', 'hsl(142,70%,60%)', 'hsl(142,30%,35%)'];
const ADMIN_PASSWORD = 'admin2024';

function AdminAuth({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Check if WebAuthn is available
    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.()
        .then(available => setBiometricAvailable(available))
        .catch(() => setBiometricAvailable(false));
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      onSuccess();
    } else {
      setError('Access denied. Invalid password.');
      setPassword('');
    }
  };

  const handleBiometric = async () => {
    setChecking(true);
    setError('');
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          timeout: 60000,
          userVerification: 'required',
          rpId: window.location.hostname,
        },
      });

      if (credential) {
        sessionStorage.setItem('admin_auth', 'true');
        onSuccess();
      }
    } catch (err: any) {
      // If user cancelled or no credential, try create flow for first-time
      try {
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
        const userId = new Uint8Array(16);
        crypto.getRandomValues(userId);

        const credential = await navigator.credentials.create({
          publicKey: {
            challenge,
            rp: { name: 'DM Portfolio Admin', id: window.location.hostname },
            user: {
              id: userId,
              name: 'admin',
              displayName: 'Admin',
            },
            pubKeyCredParams: [
              { alg: -7, type: 'public-key' },
              { alg: -257, type: 'public-key' },
            ],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              userVerification: 'required',
            },
            timeout: 60000,
          },
        });

        if (credential) {
          sessionStorage.setItem('admin_auth', 'true');
          onSuccess();
        }
      } catch {
        setError('Biometric authentication failed. Use password instead.');
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md border border-hacker-green/30 rounded-lg p-8 font-mono"
      >
        <div className="text-center mb-8">
          <Lock className="size-10 text-hacker-green mx-auto mb-4" />
          <h1 className="text-xl text-hacker-green-glow font-bold">ADMIN_ACCESS</h1>
          <p className="text-hacker-green/40 text-xs mt-2">Authentication required to proceed</p>
        </div>

        {/* Biometric button */}
        {biometricAvailable && (
          <button
            onClick={handleBiometric}
            disabled={checking}
            className="w-full flex items-center justify-center gap-3 border border-hacker-green/30 rounded-lg p-4 mb-4 text-hacker-green hover:bg-hacker-green/10 hover:border-hacker-green/50 transition-all disabled:opacity-50"
          >
            <Fingerprint className="size-5" />
            <span className="text-sm">{checking ? 'Verifying...' : 'Authenticate with Biometrics'}</span>
          </button>
        )}

        {biometricAvailable && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-hacker-green/20" />
            <span className="text-hacker-green/30 text-xs">OR</span>
            <div className="flex-1 h-px bg-hacker-green/20" />
          </div>
        )}

        {/* Password form */}
        <form onSubmit={handlePasswordSubmit}>
          <label className="block text-hacker-green/50 text-xs mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            className="w-full bg-transparent border border-hacker-green/30 rounded-lg px-4 py-3 text-hacker-green text-sm focus:outline-none focus:border-hacker-green/60 placeholder:text-hacker-green/20"
            placeholder="Enter admin password"
            autoFocus={!biometricAvailable}
          />
          {error && (
            <p className="text-red-400 text-xs mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 bg-hacker-green/10 border border-hacker-green/30 rounded-lg py-3 text-hacker-green text-sm hover:bg-hacker-green/20 hover:border-hacker-green/50 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="size-4" />
            Authenticate
          </button>
        </form>
      </motion.div>
    </div>
  );
}

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
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return (
      <>
        <SEOHead title="Admin Access" description="Authentication required." />
        <AdminAuth onSuccess={() => setAuthenticated(true)} />
      </>
    );
  }

  return (
    <>
      <SEOHead title="Admin Dashboard" description="Visitor analytics dashboard." />
      <AdminDashboard />
    </>
  );
}