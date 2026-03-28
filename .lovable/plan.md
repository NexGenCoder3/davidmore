

# Set Up Contact Form Email Delivery via Lovable Cloud

## Current Problem

The terminal contact form at `src/components/forms/TerminalContactForm.tsx` tries to send via Formspree (`VITE_FORMSPREE_ID`), which is not configured. This causes every submission to fail with "ERROR: Failed to transmit."

## What's Needed

Lovable Cloud must be enabled first — it provides the backend infrastructure for sending transactional emails. Currently, this project has no backend (no Supabase, no Cloud).

## Plan

### Step 1: Enable Lovable Cloud
- Enable Cloud on this project (prerequisite for email sending)

### Step 2: Set up email domain
- Configure an email domain so messages come from a professional sender address
- This requires you to own a domain and have access to DNS settings
- If you don't have a custom domain yet, we can still proceed — emails will send from Lovable's default domain

### Step 3: Set up email infrastructure
- Create the database tables and queue system for reliable email delivery
- Deploy the `send-transactional-email` Edge Function

### Step 4: Create a contact form notification template
- Build a React Email template that formats the contact form data (name, email, project type, message) into a professional notification email
- The email will be sent **to your Gmail** (`ekeledavid39@gmail.com`) whenever someone submits the form

### Step 5: Update the Terminal Contact Form
- Replace the Formspree fetch call in `TerminalContactForm.tsx` with `supabase.functions.invoke('send-transactional-email', ...)`
- Pass the form data as template data
- Set recipient to your Gmail address
- Also update `ContactForm.tsx` (the standard form) to use the same system
- Add Supabase client integration to the project

### Step 6: Create an unsubscribe page
- Required by the transactional email system for compliance

## Files to Create/Update

| Action | File |
|--------|------|
| Create | `src/integrations/supabase/client.ts` (Supabase client setup) |
| Create | `supabase/functions/send-transactional-email/index.ts` |
| Create | `supabase/functions/_shared/transactional-email-templates/contact-notification.tsx` |
| Create | Unsubscribe page (route TBD) |
| Update | `src/components/forms/TerminalContactForm.tsx` (replace Formspree with Supabase invoke) |
| Update | `src/components/forms/ContactForm.tsx` (same) |

## What I Need From You

**Do you own a custom domain?** If yes, I'll walk you through the email domain setup. If not, we can still proceed with Lovable's default sending domain.

