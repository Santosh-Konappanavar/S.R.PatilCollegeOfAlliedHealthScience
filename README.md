# S R Patil College of Allied Health Science — website

Static website for the college, hosted as plain HTML/CSS/JS.

## File layout

- `index.html` — main page
- `style.css` — site styles
- `index.js` — site scripts (form, modal, admin dashboard, brochure PDF)
- `images/` — college and founder photos, logo
- `apps-script/` — Google Apps Script backend for the admission form
- `LICENSE` — MIT

## After cloning — one-time setup

See **`apps-script/README.md`** for the step-by-step on:

1. Setting up WhatsApp Cloud API → so student inquiries auto-message your WhatsApp
2. Deploying the Apps Script → so submissions land in your Google Sheet
3. Wiring the deployed URL into `index.js` (`APPS_SCRIPT_WEB_APP_URL`)
4. Setting up the Tawk.to live chat → so visitors can chat live with your admissions team

Without these, the admission form still saves locally (admin dashboard works) but doesn't reach you.

## Local preview

Open `index.html` in any browser. No build step.
