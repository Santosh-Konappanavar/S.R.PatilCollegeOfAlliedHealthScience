/**
 * S R Patil College of Allied Health Science — admission backend
 *
 * Deployed as a Google Apps Script Web App. Receives form submissions
 * from the public website, appends a row to the linked Google Sheet,
 * and sends a WhatsApp notification via the WhatsApp Cloud API.
 *
 * SETUP: see apps-script/README.md in this repo.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — replace these placeholders with your own values
// ─────────────────────────────────────────────────────────────────────────────

// WhatsApp Cloud API credentials.
// Get these from https://developers.facebook.com/apps → your app → WhatsApp → API Setup.
const WHATSAPP_TOKEN    = 'PASTE_YOUR_WHATSAPP_PERMANENT_SYSTEM_USER_TOKEN_HERE';
const PHONE_NUMBER_ID   = 'PASTE_YOUR_WHATSAPP_PHONE_NUMBER_ID_HERE';

// Phone number that should receive admissions notifications.
// Format: country code + number, no + or spaces, e.g. '918217771352'.
const RECIPIENT_PHONE    = '918217771352';

// WhatsApp template name. Must match a template you create in the
// WhatsApp Manager (language: en). The body parameters below must match
// the placeholders in that template, in order.
// See apps-script/README.md → "Create a WhatsApp message template".
const WHATSAPP_TEMPLATE_NAME = 'admission_inquiry';

// Sheet tab name where new rows are appended.
const SHEET_NAME = 'Inquiries';

// ─────────────────────────────────────────────────────────────────────────────
// Web-app entry point — the form POSTs here
// ─────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Append to the sheet
    appendToSheet(data);

    // 2. Send a WhatsApp notification
    sendWhatsAppNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET for a quick health-check from the browser.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'SR Patil admission endpoint live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet
// ─────────────────────────────────────────────────────────────────────────────

function appendToSheet(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

  // Ensure the header row exists exactly once.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Program', 'Qualification', 'Message', 'Source']);
  }

  sheet.appendRow([
    new Date(),
    data.name            || '',
    data.email           || '',
    data.phone           || '',
    data.program         || '',
    data.qualification   || '',
    data.message         || '',
    data.source          || 'website-form'
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp Cloud API
// ─────────────────────────────────────────────────────────────────────────────

function sendWhatsAppNotification(data) {
  const url = `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: RECIPIENT_PHONE,
    type: 'template',
    template: {
      name: WHATSAPP_TEMPLATE_NAME,
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: data.name    || '-' },
            { type: 'text', text: data.phone   || '-' },
            { type: 'text', text: data.program || '-' },
            { type: 'text', text: data.email   || '-' }
          ]
        }
      ]
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(url, options);
}