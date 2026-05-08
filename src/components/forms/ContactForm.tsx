import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

// Mirrors the server-side schema in /api/contact.ts.
// The server is the source of truth — this is a UX optimisation only.
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .refine((v) => !/https?:\/\/|www\.|<|>/i.test(v), { message: 'Name cannot contain links' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  projectType: z.enum(['web-development', 'security', 'consultation'], {
    required_error: 'Please select a project type',
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' })
    .refine((v) => (v.match(/https?:\/\//gi) || []).length <= 2, { message: 'Too many links — please describe in plain text.' }),
  // Honeypot — must remain empty
  website: z.string().max(0, { message: 'Spam detected' }).optional().or(z.literal('')),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Editorial contact form. Submits to the /api/contact serverless route,
 * which handles rate-limiting, Turnstile verification, and EmailJS dispatch.
 * No secrets ever leave the server.
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: undefined,
      message: '',
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Client-side honeypot — silent success so bots learn nothing
    if (data.website && data.website.length > 0) {
      setIsSuccess(true);
      form.reset();
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      form.setError('root', { message: 'Verifying you are human… please wait a moment and try again.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          message: data.message,
          website: data.website ?? '',
          turnstileToken,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      }

      let serverMsg = 'Failed to send message. Please try again.';
      try {
        const data = (await res.json()) as { error?: string };
        if (data.error && res.status === 429) serverMsg = data.error;
      } catch {
        // ignore parse errors
      }
      form.setError('root', { message: serverMsg });
    } catch {
      form.setError('root', { message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
      turnstileRef.current?.reset();
      setTurnstileToken('');
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="bg-accent border border-border rounded-sm p-8 text-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="size-16 mx-auto text-primary" aria-hidden="true" />
        </motion.div>
        <h3 className="text-2xl font-light tracking-wide">Message Sent</h3>
        <p className="text-muted-foreground font-light leading-relaxed">
          {"Thank you for reaching out. I'll get back to you as soon as possible."}
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" className="font-light" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" className="font-light" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">Project Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="font-light">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="web-development" className="font-light">Web Development</SelectItem>
                  <SelectItem value="security" className="font-light">Security Research</SelectItem>
                  <SelectItem value="consultation" className="font-light">Consultation</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project..."
                  className="min-h-32 font-light resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {TURNSTILE_SITE_KEY && (
          <div>
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              options={{ size: 'flexible', theme: 'auto' }}
              onSuccess={setTurnstileToken}
              onError={() => setTurnstileToken('')}
              onExpire={() => setTurnstileToken('')}
            />
          </div>
        )}

        {/* Honeypot field — hidden from users, visible to bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Website (leave blank)
            <input type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
          </label>
        </div>

        {form.formState.errors.root && (
          <div className="text-sm text-destructive font-light" role="alert" aria-live="assertive">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          className="w-full py-6 text-base font-light tracking-wide"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
}
