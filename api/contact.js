const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_EMAIL || 'your.email@example.com';

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Parse body - Vercel parses JSON automatically
  const { name, email, message } = req.body || {};

  // Validation
  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  if (!message || message.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters' });
  }

  // Sanitize inputs
  const safeName = String(name).slice(0, 200).replace(/[<>]/g, '');
  const safeEmail = String(email).slice(0, 300).replace(/[<>]/g, '');
  const safeMessage = String(message).slice(0, 2000).replace(/[<>]/g, '');

  try {
    // Use native fetch (Node 18+)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: recipientEmail,
        subject: `Contact Form: Message from ${safeName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: safeEmail
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    console.log('Email sent:', data.id);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};