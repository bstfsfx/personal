// Contact Form Handler
// Handles secure message submission

const rateLimitMap = new Map();

// Rate limit: 3 messages per minute per session
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

// Honeypot field name - change periodically
const HONEYPOT_NAME = 'website_url';

// API endpoint - Vercel serverless function
const API_ENDPOINT = '/api/contact';

function checkRateLimit() {
    const now = Date.now();
    const sessionId = getSessionId();
    const userData = rateLimitMap.get(sessionId) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    if (now > userData.resetTime) {
        userData.count = 0;
        userData.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    userData.count++;
    rateLimitMap.set(sessionId, userData);
    
    return userData.count <= RATE_LIMIT_MAX;
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('contact_session');
    if (!sessionId) {
        sessionId = 's_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('contact_session', sessionId);
    }
    return sessionId;
}

function sanitizeInput(str) {
    if (!str) return '';
    return str
        .replace(/[<>]/g, '')
        .trim()
        .slice(0, 2000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, isError) {
    const messageBox = document.getElementById('form-message');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.className = isError ? 'form-message error' : 'form-message success';
        messageBox.style.display = 'block';
    }
}

function resetForm() {
    const form = document.getElementById('contact-form');
    if (form) form.reset();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Honeypot check - if filled, it's a bot
        const honeypot = form.querySelector(`[name="${HONEYPOT_NAME}"]`);
        if (honeypot && honeypot.value) {
            showMessage('Submission blocked.', true);
            return;
        }

        // Rate limit check
        if (!checkRateLimit()) {
            showMessage('Too many requests. Please wait a minute.', true);
            return;
        }

        const name = sanitizeInput(document.getElementById('visitor-name')?.value || '');
        const email = sanitizeInput(document.getElementById('visitor-email')?.value || '');
        const message = sanitizeInput(document.getElementById('visitor-message')?.value || '');

        // Validation
        if (!name || name.length < 2) {
            showMessage('Please enter a valid name.', true);
            return;
        }

        if (!email || !validateEmail(email)) {
            showMessage('Please enter a valid email address.', true);
            return;
        }

        if (!message || message.length < 10) {
            showMessage('Message must be at least 10 characters.', true);
            return;
        }

        // Disable form
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn?.textContent || 'Send';
        submitBtn.disabled = true;
        if (submitBtn) submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Thank you! Your message has been sent successfully.', false);
                resetForm();
            } else {
                showMessage(data.error || 'Failed to send message. Please try again.', true);
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showMessage('Failed to send message. Please try again later.', true);
        } finally {
            submitBtn.disabled = false;
            if (submitBtn) submitBtn.textContent = originalText;
        }
    });
});