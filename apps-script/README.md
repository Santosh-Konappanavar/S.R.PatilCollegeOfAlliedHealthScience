# Backend setup — form → Google Sheet + WhatsApp auto-message

The website is static (no server), so we use **Google Apps Script** as a tiny free backend that:

1. Appends each inquiry as a new row to your Google Sheet.
2. Sends a WhatsApp notification to `+91 8217771352` automatically — no manual tap.

You do this once. After that, every form submission writes to the sheet and pings WhatsApp.

---

## Part 1 — Set up WhatsApp Cloud API (one-time, ~10 min)

1. Go to https://developers.facebook.com/apps → **Create App** → type **Business** → name it "SR Patil Admissions".
2. In the app dashboard, click **Add Product** → **WhatsApp** → **Set up**.
3. In WhatsApp → **API Setup**, you'll see a sandbox phone number Meta provides. For production, you'll need to add your own business phone number under WhatsApp → **Phone Numbers** and complete business verification.
4. Copy two values from this page:
   - **Phone number ID** — paste into `Code.gs` → `PHONE_NUMBER_ID`
   - **WhatsApp token** — click "Generate token" if you don't have a permanent one. For production, generate a **System User** token with `whatsapp_business_management` and `whatsapp_business_messaging` permissions. Paste into `Code.gs` → `WHATSAPP_TOKEN`.

> **The token is sensitive** — anyone with it can send messages from your business number. Don't commit it to git or share it publicly. For the SR Patil demo, you can put it directly in `Code.gs` since the file lives only in your Google account.

## Part 2 — Create a WhatsApp message template

WhatsApp requires pre-approved message templates for businesses to message customers.

1. Go to WhatsApp Manager → **Message Templates** → **Create Template**.
2. Fill in:
   - **Name:** `admission_inquiry`
   - **Category:** Utility (or Marketing)
   - **Language:** English
   - **Body:** something like
     > New admission inquiry from {{1}}.
     > Phone: {{2}}.
     > Interested in: {{3}}.
     > Email: {{4}}.
     > Reply directly to this chat to follow up.
3. Submit. Approval usually takes a few minutes to a few hours.
4. Once approved, no more changes needed — `Code.gs` already references this template name.

## Part 3 — Deploy the Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/16Jcte9sG0UqECXa-L_lCWCTPAfEyuVqzglroq4eU4fc/edit
2. **Extensions → Apps Script** → delete the placeholder `Code.gs` content.
3. Open `apps-script/Code.gs` from this repo, copy everything, paste it into the Apps Script editor.
4. Replace the placeholder values at the top:
   - `WHATSAPP_TOKEN`
   - `PHONE_NUMBER_ID`
   - (the others are already correct: `RECIPIENT_PHONE = '918217771352'`, `WHATSAPP_TEMPLATE_NAME = 'admission_inquiry'`, `SHEET_NAME = 'Inquiries'`)
5. Create a tab in your sheet called `Inquiries` (if it doesn't exist). The script will write there. If you'd rather use the default tab, change `SHEET_NAME = 'Sheet1'` in the script.
6. Click **Save** (💾).
7. Click **Deploy → New deployment**.
   - Click the gear icon ⚙️ next to "Select type" → **Web app**.
   - **Description:** "SR Patil admission form"
   - **Execute as:** Me
   - **Who has access:** **Anyone** *(this is required so the public website can POST without auth)*
   - Click **Deploy** → authorize the script → copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfyc.../exec`).

## Part 4 — Wire the URL into the website

1. Open `index.js` in this repo.
2. At the top, find `const APPS_SCRIPT_WEB_APP_URL = '';` (added in this update).
3. Paste the URL from step 3 between the quotes.
4. Save. Re-deploy the site (or just refresh locally — it picks up the change immediately).

That's it — every form submission will now write a row to the sheet and ping your WhatsApp automatically.

---

## Verifying it works

In Apps Script editor, with `Code.gs` open, run the `doGet` function once (Run → doGet). If it returns `{ ok: true, ... }`, the deployment is healthy.

Then submit a test inquiry from the live website. Within ~2 seconds:
- A new row appears in the `Inquiries` tab.
- A WhatsApp message arrives on `+91 8217771352` from your business number.

If WhatsApp doesn't arrive but the sheet row does, the most common cause is an unapproved template name — double-check `WHATSAPP_TEMPLATE_NAME` matches what WhatsApp Manager shows.

---

## Local config (so this stays portable)

`Code.gs` reads its config from constants at the top. If you ever want to keep credentials out of the script, swap them for `PropertiesService.getScriptProperties().getProperty('WHATSAPP_TOKEN')` and set them via **Project Settings → Script Properties**. Not needed for this demo.

## Tawk.to live chat

See `README.md` in the repo root → "Live chat (Tawk.to)" section.