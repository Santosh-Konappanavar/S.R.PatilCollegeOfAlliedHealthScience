/* =========================================================
   S R PATIL COLLEGE OF ALLIED HEALTH SCIENCE — site scripts
   ========================================================= */

const COLLEGE_PHONE_DISPLAY = '+91 8217771352';       // TODO: replace with real admissions cell number
const COLLEGE_WHATSAPP_NUMBER = '918217771352';         // digits only, country code first, no + or spaces
const COLLEGE_EMAIL = 'softech2627@gmail.com'; // admissions@srpatilalliedhealth.edu.in

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — replace these placeholders with your own values
// ─────────────────────────────────────────────────────────────────────────────

// URL of the deployed Apps Script web app. After running
// apps-script/README.md → "Part 3 — Deploy the Apps Script", paste the
// web-app URL (looks like https://script.google.com/macros/s/AKfyc.../exec)
// between the quotes below. Leave empty while developing — the form will
// still save locally and the admin dashboard will still work.
const APPS_SCRIPT_WEB_APP_URL = '';

/* ---------------- Course data (matches the 4 programs actually
   listed on the page — this replaces the old mismatched IDs
   that showed the wrong course when clicked) ---------------- */
const courseData = {
    aott: {
        title: 'B.Sc. AOTT — Anaesthesia & Operation Theatre Technology',
        meta: 'Duration: 3 Years &nbsp;•&nbsp; 6 Months Internship &nbsp;•&nbsp; Seats: 20',
        content: `
            <p class="modal-body-top"><strong>Eligibility:</strong> 12th Pass with Physics, Chemistry, Biology</p>
            <div class="course-details">
                <h4>Program Overview</h4>
                <p>A 3-year degree that trains students to assist anaesthetists and surgical teams — covering anaesthesia equipment, sterilisation, and operation theatre protocols, followed by a 6-month clinical internship.</p>
                <h4>Core Subjects</h4>
                <ul>
                    <li>Anaesthesia Technology Fundamentals</li>
                    <li>Operation Theatre Techniques & Sterilisation</li>
                    <li>Applied Anatomy & Physiology</li>
                    <li>Patient Monitoring & Emergency Care</li>
                    <li>Surgical Instrumentation</li>
                </ul>
                <h4>Career Opportunities</h4>
                <ul>
                    <li>Anaesthesia & OT Technician</li>
                    <li>Surgical Assistant</li>
                    <li>Sterile Services Supervisor</li>
                    <li>ICU / Critical Care Support Staff</li>
                </ul>
            </div>
        `
    },
    mlt: {
        title: 'B.Sc. MLT — Medical Laboratory Technology',
        meta: 'Duration: 3 Years &nbsp;•&nbsp; 6 Months Internship &nbsp;•&nbsp; Seats: 20',
        content: `
            <p class="modal-body-top"><strong>Eligibility:</strong> 12th Pass with Physics, Chemistry, Biology</p>
            <div class="course-details">
                <h4>Program Overview</h4>
                <p>A 3-year degree in diagnostic laboratory science — sample analysis, quality control, and laboratory management, preparing graduates for hospital, research, and public-health labs.</p>
                <h4>Core Subjects</h4>
                <ul>
                    <li>Clinical Pathology</li>
                    <li>Biochemistry & Immunology</li>
                    <li>Microbiology</li>
                    <li>Haematology & Blood Banking</li>
                    <li>Laboratory Quality Control</li>
                </ul>
                <h4>Career Opportunities</h4>
                <ul>
                    <li>Medical Laboratory Technologist</li>
                    <li>Diagnostic Centre Technician</li>
                    <li>Quality Control Officer</li>
                    <li>Research Laboratory Assistant</li>
                </ul>
            </div>
        `
    },
    mit: {
        title: 'B.Sc. MIT — Medical Imaging Technology',
        meta: 'Duration: 3 Years &nbsp;•&nbsp; 6 Months Internship &nbsp;•&nbsp; Seats: 20',
        content: `
            <p class="modal-body-top"><strong>Eligibility:</strong> 12th Pass with Physics, Chemistry, Biology</p>
            <div class="course-details">
                <h4>Program Overview</h4>
                <p>A 3-year degree in diagnostic imaging — X-ray, CT, MRI and ultrasound technique — for roles in hospital radiology departments and diagnostic centres.</p>
                <h4>Core Subjects</h4>
                <ul>
                    <li>General Radiography</li>
                    <li>CT & MRI Technology</li>
                    <li>Ultrasound Imaging</li>
                    <li>Radiation Physics & Protection</li>
                    <li>Digital Imaging Systems</li>
                </ul>
                <h4>Career Opportunities</h4>
                <ul>
                    <li>Radiologic Technologist</li>
                    <li>CT / MRI Technologist</li>
                    <li>Ultrasound Technician</li>
                    <li>Diagnostic Imaging Coordinator</li>
                </ul>
            </div>
        `
    },
    optometry: {
        title: 'B.Sc. Optometry',
        meta: 'Duration: 3 Years &nbsp;•&nbsp; 6 Months Internship &nbsp;•&nbsp; Seats: 20',
        content: `
            <p class="modal-body-top"><strong>Eligibility:</strong> 12th Pass with Physics, Chemistry, Biology</p>
            <div class="course-details">
                <h4>Program Overview</h4>
                <p>A 3-year degree in primary eye care — vision assessment, refraction, contact lens practice, binocular vision, and ocular disease screening.</p>
                <h4>Core Subjects</h4>
                <ul>
                    <li>Ocular Anatomy & Physiology</li>
                    <li>Refraction & Vision Assessment</li>
                    <li>Contact Lens Practice</li>
                    <li>Binocular Vision</li>
                    <li>Ocular Disease Screening</li>
                </ul>
                <h4>Career Opportunities</h4>
                <ul>
                    <li>Optometrist</li>
                    <li>Ophthalmology Clinic Associate</li>
                    <li>Optical Industry Specialist</li>
                    <li>Community Eye Care Worker</li>
                </ul>
            </div>
        `
    }
};

/* ---------------- Mobile nav ---------------- */
function toggleMenu() {
    document.querySelector('nav').classList.toggle('open');
}
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => document.querySelector('nav').classList.remove('open'));
});

/* ---------------- Course modal ---------------- */
function showCourseDetails(courseId) {
    const course = courseData[courseId];
    if (!course) return;
    document.getElementById('modalTitle').textContent = course.title;
    document.getElementById('modalMeta').innerHTML = course.meta;
    document.getElementById('modalBody').innerHTML = course.content;
    document.getElementById('courseModal').classList.add('active');
    setBodyScroll();
}
function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('active');
    setBodyScroll();
}

/* ---------------- Image lightbox ---------------- */
function openLightbox(src, alt) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxImg').alt = alt || '';
    lb.classList.add('active');
    setBodyScroll();
}
function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('active');
    setBodyScroll();
}

/* Body-scroll coordination: instead of every open/close path
   setting `body.style.overflow` directly (which desyncs when
   multiple modals are open in sequence), this single helper
   inspects whether ANY modal or the admin dashboard is currently
   active and locks the body accordingly. */
function setBodyScroll() {
    const anyActive = document.querySelector('.modal.active, .admin-dashboard.active');
    document.body.classList.toggle('modal-open', !!anyActive);
}


let admissions = JSON.parse(localStorage.getItem('admissions') || '[]');

const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            id: Date.now(),
            name: this.querySelector('input[name="name"]').value.trim(),
            email: this.querySelector('input[name="email"]').value.trim(),
            phone: this.querySelector('input[name="phone"]').value.trim(),
            program: this.querySelector('select[name="program"]').value,
            qualification: this.querySelector('select[name="qualification"]').value,
            message: this.querySelector('textarea[name="message"]').value.trim(),
            status: 'new',
            date: new Date().toLocaleDateString(),
            source: 'website-form'
        };

        // Always keep a local copy so the admin dashboard still works
        // even if the backend is unreachable.
        admissions.push(formData);
        localStorage.setItem('admissions', JSON.stringify(admissions));

        document.getElementById('successMsg').style.display = 'block';
        this.reset();
        setTimeout(() => { document.getElementById('successMsg').style.display = 'none'; }, 4000);

        // Hand the inquiry off to the Apps Script backend, which writes
        // it to the Google Sheet AND triggers an automatic WhatsApp
        // message to the admissions number. No user "Send" tap required.
        // Apps Script web apps don't echo CORS headers, so we use
        // mode: 'no-cors' — the request still arrives, the response is
        // just opaque, which is fine for a fire-and-forget submit.
        if (APPS_SCRIPT_WEB_APP_URL) {
            fetch(APPS_SCRIPT_WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    program: formData.program,
                    qualification: formData.qualification,
                    message: formData.message,
                    source: formData.source
                })
            }).catch(err => console.error('Apps Script submit failed:', err));
        } else {
            console.warn('APPS_SCRIPT_WEB_APP_URL is not configured — inquiry saved locally only. See apps-script/README.md.');
        }
    });
}


const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('adminLoggedIn', 'true');
            closeAdminLogin();
            showAdminDashboard();
        } else {
            document.getElementById('adminLoginError').style.display = 'block';
        }
    });
}

function openAdminLogin() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showAdminDashboard();
    } else {
        document.getElementById('adminLoginModal').classList.add('active');
        setBodyScroll();
    }
}
function closeAdminLogin() {
    document.getElementById('adminLoginModal').classList.remove('active');
    document.getElementById('adminLoginError').style.display = 'none';
    setBodyScroll();
}
function showAdminDashboard() {
    document.getElementById('adminDashboard').classList.add('active');
    setBodyScroll();
    updateAdminStats();
    renderInquiries();
}

/* ---------------- Close modals on backdrop click / Escape key ---------------- */
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        setBodyScroll();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active, .admin-dashboard.active').forEach(el => {
            el.classList.remove('active');
        });
        setBodyScroll();
    }
});

/* ---------------- Reset admin error when user types again ---------------- */
['adminUsername', 'adminPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
        const err = document.getElementById('adminLoginError');
        if (err) err.style.display = 'none';
    });
});
function logoutAdmin() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminDashboard').classList.remove('active');
    setBodyScroll();
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
}
function updateAdminStats() {
    document.getElementById('totalInquiries').textContent = admissions.length;
    document.getElementById('newInquiries').textContent = admissions.filter(a => a.status === 'new').length;
    document.getElementById('contactedInquiries').textContent = admissions.filter(a => a.status === 'contacted').length;
    document.getElementById('enrolledInquiries').textContent = admissions.filter(a => a.status === 'enrolled').length;
}
function renderInquiries() {
    const body = document.getElementById('inquiriesBody');
    body.innerHTML = '';

    if (admissions.length === 0) {
        body.innerHTML = '<div class="empty-state">No inquiries yet. New admission form submissions will appear here.</div>';
        return;
    }

    admissions.slice().reverse().forEach(inquiry => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div><strong>${escapeHTML(inquiry.name)}</strong></div>
            <div>${escapeHTML(inquiry.email)}</div>
            <div>${escapeHTML(inquiry.phone)}</div>
            <div>${escapeHTML(inquiry.program || '-')}</div>
            <div class="action-buttons">
                <select onchange="updateStatus(${inquiry.id}, this.value)" class="status-badge status-${inquiry.status}" style="border: none; font-weight: 600;">
                    <option value="new" ${inquiry.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="contacted" ${inquiry.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                    <option value="enrolled" ${inquiry.status === 'enrolled' ? 'selected' : ''}>Enrolled</option>
                </select>
                <button class="action-btn delete" onclick="deleteInquiry(${inquiry.id})">Delete</button>
            </div>
        `;
        body.appendChild(row);
    });
}
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}
function updateStatus(id, status) {
    const inquiry = admissions.find(a => a.id === id);
    if (inquiry) {
        inquiry.status = status;
        localStorage.setItem('admissions', JSON.stringify(admissions));
        updateAdminStats();
        renderInquiries();
    }
}
function deleteInquiry(id) {
    if (confirm('Delete this inquiry?')) {
        admissions = admissions.filter(a => a.id !== id);
        localStorage.setItem('admissions', JSON.stringify(admissions));
        updateAdminStats();
        renderInquiries();
    }
}

/* ---------------- WhatsApp ---------------- */
function openWhatsApp() {
    const message = 'Hi! I want to know more about S R Patil College of Allied Health Science programs and admissions.';
    window.open(`https://wa.me/${COLLEGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

/* ---------------- Live chat widget ----------------
   A built-in, no-service chat that:
   • Shows a floating chat bubble in the bottom-right.
   • Lets visitors type a question or tap a quick-reply.
   • Shows an instant FAQ answer for common topics.
   • On "Send" (or after the user picks "Talk to a real person"),
     opens WhatsApp with the full conversation as a pre-filled
     message — so the visitor reaches a real human on WhatsApp
     in one tap. This works without any third-party service or
     signup. */
const liveChatFAQ = [
    { keys: ['course', 'program', 'b.sc', 'bsc'], reply: 'We offer four B.Sc. programs: AOTT (Anaesthesia & OT Technology), MLT (Medical Laboratory Technology), MIT (Medical Imaging Technology) and Optometry — each 3 years plus a 6-month clinical internship. Tap "Courses" in the menu for full details.' },
    { keys: ['fee', 'fees', 'cost', 'price', 'tuition'], reply: 'Fee structures vary by program. Our admissions team can share the exact fee breakdown on WhatsApp — pick "Talk to a real person" below or tap the WhatsApp button.' },
    { keys: ['admission', 'apply', 'eligibility', 'eligib'], reply: 'Admission requires a 12th Pass with Physics, Chemistry and Biology. You can apply right now using the Admission Inquiry form on this page — it takes under a minute.' },
    { keys: ['location', 'address', 'where', 'map'], reply: 'We\'re on NH-218, Hubli–Vijayapur–Gulbarga Road, Badagandi, Bilagi Taluk, Bagalkot District, Karnataka – 587116. Scroll to "Find Us" for the live map and directions.' },
    { keys: ['hostel', 'accommodation', 'stay'], reply: 'Yes, on-campus hostel accommodation is available for students. Our admissions team can share current availability and fees on WhatsApp.' },
    { keys: ['placement', 'job', 'career', 'internship'], reply: 'Every program includes a 6-month clinical internship and placement support through our affiliated hospital network. Ask our team for recent placement details on WhatsApp.' },
    { keys: ['contact', 'phone', 'call', 'number'], reply: `You can reach us on WhatsApp using the green button, or call ${COLLEGE_PHONE_DISPLAY}.` }
];

const liveChatHistory = []; // conversation transcript that ships to WhatsApp

function toggleLiveChat() {
    const win = document.getElementById('liveChatWindow');
    if (!win) return;
    const isOpen = win.classList.toggle('active');
    if (isOpen) {
        // Stop the ping animation once the user has seen the chat
        const ping = document.getElementById('liveChatPing');
        if (ping) ping.style.display = 'none';
        // Focus the input for fast typing
        setTimeout(() => document.getElementById('chatInput').focus(), 200);
    }
}

function appendLiveMessage(text, who) {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;
    const msg = document.createElement('div');
    msg.className = 'message ' + who;
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    liveChatHistory.push({ who, text });
}

function liveChatFAQReply(text) {
    const lower = text.toLowerCase();
    const match = liveChatFAQ.find(f => f.keys.some(k => lower.includes(k)));
    if (match) return match.reply;
    return null;
}

function sendLiveChatMessage(prefill) {
    const input = document.getElementById('chatInput');
    const text = (prefill || input.value).trim();
    if (!text) return;
    appendLiveMessage(text, 'user');
    if (input) input.value = '';

    setTimeout(() => {
        const reply = liveChatFAQReply(text);
        if (reply) {
            appendLiveMessage(reply, 'bot');
        } else {
            // No FAQ match → offer the WhatsApp handoff so the visitor
            // reaches a real person instead of dead-ending.
            appendLiveMessage("I can answer quick FAQs, but for anything specific, our admissions team replies on WhatsApp. Tap below to send your question straight to them 👇", 'bot');
            offerWhatsAppHandoff(text);
        }
    }, 350);
}

function offerWhatsAppHandoff(latestText) {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;
    const wrap = document.createElement('div');
    wrap.className = 'chat-handoff-cta';
    const transcript = liveChatHistory.map(m => `${m.who === 'user' ? 'Visitor' : 'SRP'}: ${m.text}`).join('\n');
    const fullMessage = `Hi! I'm messaging from the S R Patil College website.\n\n${latestText ? `My question: ${latestText}\n\n` : ''}Conversation so far:\n${transcript}`;
    const url = `https://wa.me/${COLLEGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    wrap.innerHTML = `<a class="chat-handoff-btn" href="${url}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Continue on WhatsApp</a>`;
    messagesDiv.appendChild(wrap);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleLiveChatKeypress(event) {
    if (event.key === 'Enter') sendLiveChatMessage();
}

// Wire quick-reply buttons (delegated) + Enter key on input
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.chat-quick-reply').forEach(btn => {
        btn.addEventListener('click', () => sendLiveChatMessage(btn.dataset.q));
    });
    const ci = document.getElementById('chatInput');
    if (ci) ci.addEventListener('keypress', handleLiveChatKeypress);
});
// Also wire directly in case DOMContentLoaded already fired (script is at end of body)
document.querySelectorAll('.chat-quick-reply').forEach(btn => {
    btn.addEventListener('click', () => sendLiveChatMessage(btn.dataset.q));
});
const chatInputEl = document.getElementById('chatInput');
if (chatInputEl) chatInputEl.addEventListener('keypress', handleLiveChatKeypress);


/* ---------------- Brochure download (real PDF) ----------------
   Builds a print-formatted page in an iframe and triggers the
   browser's "Save as PDF" dialog. Works on every modern browser
   with no external dependencies. */
function downloadBrochure() {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(generateBrochureHTML());
    doc.close();

    iframe.onload = function () {
        try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        } catch (e) {
            console.error('Print failed:', e);
        }
        // Remove the iframe after the print dialog opens
        setTimeout(() => document.body.removeChild(iframe), 1000);
    };
}

function generateBrochureHTML() {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>S R Patil College Of Allied Health Science - Brochure</title>
<style>
    @page { size: A4; margin: 0; }
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #16283D; }
    .header { background: #0A2540; color: white; padding: 2.2rem; text-align: center; }
    .header h1 { margin: 0; font-size: 1.6rem; }
    .header p { color: #E9C083; margin-top: 0.4rem; font-size: 0.95rem; }
    .section { margin: 0; padding: 1.6rem 2.2rem; border-bottom: 1px solid #DCE3EA; }
    h2 { color: #0A2540; margin-top: 0; font-size: 1.2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 0.8rem; }
    td, th { border: 1px solid #DCE3EA; padding: 8px 10px; text-align: left; font-size: 0.88rem; }
    th { background: #F3F6F9; }
    @media print {
        .no-print { display: none; }
    }
</style>
</head>
<body>
    <div class="header">
        <h1>S R Patil College of Allied Health Science</h1>
        <p>Badagandi, Bilagi Taluk, Bagalkot, Karnataka - 587116</p>
    </div>

    <div class="section">
        <h2>About Us</h2>
        <p>S R Patil College of Allied Health Science is dedicated to providing quality healthcare education. We offer four B.Sc. programs in Allied Health Sciences, each combining classroom learning with a 6-month clinical internship.</p>
    </div>

    <div class="section">
        <h2>Our Programs</h2>
        <table>
            <tr><th>Program</th><th>Duration</th><th>Internship</th><th>Seats</th><th>Eligibility</th></tr>
            <tr><td>B.Sc. AOTT - Anaesthesia &amp; OT Technology</td><td>3 Years</td><td>6 Months</td><td>20</td><td>12th Pass (PCB)</td></tr>
            <tr><td>B.Sc. MLT - Medical Laboratory Technology</td><td>3 Years</td><td>6 Months</td><td>20</td><td>12th Pass (PCB)</td></tr>
            <tr><td>B.Sc. MIT - Medical Imaging Technology</td><td>3 Years</td><td>6 Months</td><td>20</td><td>12th Pass (PCB)</td></tr>
            <tr><td>B.Sc. Optometry</td><td>3 Years</td><td>6 Months</td><td>20</td><td>12th Pass (PCB)</td></tr>
        </table>
    </div>

    <div class="section">
        <h2>Infrastructure</h2>
        <ul>
            <li>Modern Laboratories with Latest Equipment</li>
            <li>Digital Library with Online Resources</li>
            <li>Clinical Training Units at Affiliated Hospitals</li>
            <li>Sports Complex</li>
            <li>Hostel Facilities</li>
            <li>Cafeteria &amp; Medical Unit</li>
        </ul>
    </div>

    <div class="section">
        <h2>Contact Us</h2>
        <p><strong>Address:</strong> NH-218, Hubli-Vijayapur-Gulbarga Road, Badagandi, Bilagi Taluk, Bagalkot, Karnataka - 587116</p>
        <p><strong>Phone:</strong> +91 82177 71352</p>
        <p><strong>Email:</strong> ${COLLEGE_EMAIL}</p>
    </div>

    <div class="section no-print" style="background:#F3F6F9; border:none; text-align:center; font-size:0.85rem; color:#5C6B7A;">
        <p>In the print dialog, choose <strong>"Save as PDF"</strong> as the destination to download the brochure.</p>
    </div>
</body>
</html>`;
}

/* ---------------- Scroll reveal (subtle, respects reduced motion) ---------------- */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const cardItems = document.querySelectorAll('.course-card, .infrastructure-item, .testimonial-card, .stat-box, .campus-list-item');
    cardItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const sectionHeads = document.querySelectorAll('.section-head');
    sectionHeads.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    cardItems.forEach(el => io.observe(el));
    sectionHeads.forEach(el => io.observe(el));
}

/* ---------------- Header shadow on scroll ---------------- */
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 12) header.style.boxShadow = '0 6px 20px rgba(10,37,64,0.08)';
    else header.style.boxShadow = 'none';
});