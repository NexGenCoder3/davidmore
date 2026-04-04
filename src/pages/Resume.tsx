import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { developerInfo } from '@/data/developer';
import { skills } from '@/data/skills';
import { TypingEffect } from '@/components/effects/TypingEffect';

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <>
      <SEOHead title="Resume" description="David More's resume — Full-Stack Developer & Security Researcher." />

      <div className="min-h-screen bg-terminal-bg pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto font-mono">
          {/* Terminal command */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-hacker-green/60 text-sm mb-4">
            <span className="text-hacker-green">$</span> cat resume.txt
          </motion.div>

          {/* Resume content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-hacker-green/30 rounded-lg p-4 md:p-6 lg:p-8 space-y-6 print:border-none print:p-0 print:text-black"
          >
            {/* Header */}
            <div className="border-b border-hacker-green/20 pb-4 print:border-black/20">
              <h1 className="text-xl md:text-2xl lg:text-3xl text-hacker-green-glow font-bold print:text-black">
                <TypingEffect text={developerInfo.name} speed={50} showCursor={false} />
              </h1>
              <p className="text-hacker-green/70 text-sm md:text-base print:text-gray-600">{developerInfo.tagline}</p>
              <div className="text-hacker-green/50 text-xs md:text-sm mt-2 space-y-1 print:text-gray-500">
                <p className="break-words">📍 {developerInfo.location} • 📧 {developerInfo.email} • 📱 {developerInfo.phone}</p>
                {developerInfo.socialLinks.github && <p className="break-all">GitHub: {developerInfo.socialLinks.github}</p>}
              </div>
            </div>

            {/* Education */}
            <Section title="EDUCATION">
              <p className="text-hacker-green/70 text-sm print:text-gray-700">{developerInfo.education}</p>
            </Section>

            {/* Skills summary */}
            <Section title="SKILLS">
              {(['Frontend', 'Backend', 'Security', 'DevOps'] as const).map(cat => (
                <div key={cat} className="mb-2">
                  <span className="text-hacker-green/50 text-xs print:text-gray-500">{cat}: </span>
                  <span className="text-hacker-green/80 text-sm print:text-gray-700">
                    {skills.filter(s => s.category === cat).map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </Section>

            {/* Experience */}
            <Section title="EXPERIENCE & PROJECTS">
              <div className="space-y-3">
                {[
                  { role: 'Security Researcher', period: '2022 – Present', desc: 'Bug bounty hunting, CTF competitions, and open-source security tool development.' },
                  { role: 'Full-Stack Developer', period: '2021 – Present', desc: 'Building scalable web applications with React, Node.js, and Go. Focus on real-time systems and API architecture.' },
                  { role: 'DevOps Automation', period: '2022 – 2023', desc: 'CI/CD pipeline design, Kubernetes orchestration, and infrastructure-as-code with Terraform.' },
                ].map(exp => (
                  <div key={exp.role}>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-0.5">
                      <span className="text-hacker-green font-bold print:text-black">{exp.role}</span>
                      <span className="text-hacker-green/40 print:text-gray-400">{exp.period}</span>
                    </div>
                    <p className="text-hacker-green/60 text-sm print:text-gray-600">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Awards */}
            <Section title="AWARDS & RECOGNITION">
              {developerInfo.awards.map(a => (
                <div key={a} className="text-hacker-green/70 text-sm print:text-gray-700">• {a}</div>
              ))}
            </Section>

            {/* Download button */}
            <div className="pt-4 print:hidden">
              <button
                onClick={handlePrint}
                className="font-mono text-sm px-4 py-2 border border-hacker-green/30 text-hacker-green hover:bg-hacker-green/10 rounded transition-colors"
              >
                $ print resume &gt; resume.pdf
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          header, footer, nav, .print\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden">
      <h2 className="text-hacker-green-glow text-sm font-bold mb-2 print:text-black truncate">
        ╔══ {title} ══╗
      </h2>
      <div className="pl-2">{children}</div>
    </div>
  );
}
