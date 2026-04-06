import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { TerminalContactForm } from '@/components/forms/TerminalContactForm';
import { GlassCard } from '@/components/ui/GlassCard';
import { TypingEffect } from '@/components/effects/TypingEffect';
import { NetworkGrid } from '@/components/effects/NetworkGrid';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description={`Get in touch with ${developerInfo.name} for development projects, security consulting, and collaborations. ${developerInfo.availability}`}
      />
      
      <div className="min-h-screen relative">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <NetworkGrid />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-wide mb-3 md:mb-4">
                <TypingEffect text="Get in Touch" speed={50} showCursor={false} />
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-light tracking-wide">
                Let's discuss your next project
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-10 py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Terminal Contact Form */}
              <motion.div
                className="space-y-4 md:space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                    Send a Message
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground font-light">
                    Type your details into the terminal below. {developerInfo.availability}
                  </p>
                </div>

                <TerminalContactForm />
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-6 md:space-y-8"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp} className="space-y-2 md:space-y-3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                    Contact Information
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground font-light">
                    Prefer to reach out directly? Here's how you can contact me.
                  </p>
                </motion.div>

                <Separator />

                <div className="space-y-4">
                  <motion.div variants={fadeUp}>
                    <GlassCard className="p-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="p-2.5 md:p-3 rounded-sm bg-primary/10">
                          <Mail className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-light tracking-wide text-muted-foreground">Email</p>
                          <a href={`mailto:${developerInfo.email}`} className="text-sm md:text-base font-light hover:text-muted-foreground transition-colors break-all">
                            {developerInfo.email}
                          </a>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <GlassCard className="p-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="p-2.5 md:p-3 rounded-sm bg-primary/10">
                          <Phone className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-light tracking-wide text-muted-foreground">Phone</p>
                          <a href={`tel:${developerInfo.phone}`} className="text-sm md:text-base font-light hover:text-muted-foreground transition-colors">
                            {developerInfo.phone}
                          </a>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <GlassCard className="p-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="p-2.5 md:p-3 rounded-sm bg-primary/10">
                          <MapPin className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-light tracking-wide text-muted-foreground">Location</p>
                          <p className="text-sm md:text-base font-light">{developerInfo.location}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}
