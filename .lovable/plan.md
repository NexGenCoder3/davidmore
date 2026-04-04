

# Integrate EmailJS into Contact Forms

## Credentials
- **Service ID:** `service_sbquij3`
- **Template ID:** `template_utkw7p8`
- **Public Key:** `YiDqeN2Xbo5hv9gMv`

These are public/client-side keys, safe to store in code.

## Steps

### 1. Install EmailJS SDK
Add `@emailjs/browser` package.

### 2. Update TerminalContactForm.tsx
Replace the Formspree fetch block (lines 107-125) with `emailjs.send()` using the credentials above. Map form fields to template variables: `from_name`, `from_email`, `project_type`, `message`.

### 3. Update ContactForm.tsx
Same replacement — swap Formspree fetch (lines 71-93) with `emailjs.send()`.

### 4. Remove Formspree references
No more dependency on `VITE_FORMSPREE_ID`.

## Files Changed

| Action | File |
|--------|------|
| Install | `@emailjs/browser` |
| Update | `src/components/forms/TerminalContactForm.tsx` |
| Update | `src/components/forms/ContactForm.tsx` |

