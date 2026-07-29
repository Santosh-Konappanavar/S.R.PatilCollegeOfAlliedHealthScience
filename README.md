# S R Patil College of Allied Health Science — website

Static website for the college, hosted as plain HTML/CSS/JS.

## File layout

- `index.html` — main page
- `style.css` — site styles
- `index.js` — site scripts (form, modal, admin dashboard, brochure PDF)
- `images/` — college and founder photos, logo
- `apps-script/` — Google Apps Script backend for the admission form
- `robots.txt` — search-engine crawl rules
- `sitemap.xml` — sitemap for Google Search Console
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

## Admin dashboard

Click the **Admin** button in the nav, log in with `admin / admin123`. Inquiries stored in your browser's localStorage are listed; you can update status or delete. (Replace with a real backend before relying on this for actual applicant data — see `apps-script/README.md`.)

## Getting the site to appear in Google Search

The site ships with `robots.txt` and `sitemap.xml` so Google can crawl it efficiently. To make it appear faster for searches like "SR Patil College of Allied Health Science":

1. Open https://search.google.com/search-console/ and sign in with any Google account.
2. Click **Add property** → **URL prefix** → enter `https://srpatilalliedhealthsciences.netlify.app/`.
3. Verify ownership — the **HTML tag** method is the fastest. GSC gives you a `<meta name="google-site-verification" content="...">` tag. Add that exact meta tag to the `<head>` of `index.html` (alongside the existing `<meta name="description">`). Click **Verify** in GSC.
4. Once verified, go to **Sitemaps** in the left sidebar → enter `sitemap.xml` → click **Submit**.
5. Go to **URL Inspection** → paste the homepage URL → click **Request Indexing**.

Indexing usually appears within 3–7 days for small sites. If you have an older non-Netlify domain, also set up a 301 redirect from the old domain to the Netlify URL.

### SEO meta already in place

The site ships with everything Google needs to understand it: a precise `<title>`, a real `description`, Open Graph / Twitter preview tags, a `canonical` URL, and a `CollegeOrUniversity` JSON-LD structured-data block. No further changes required for Google to render the listing — only the steps above make Google actually look at it.
