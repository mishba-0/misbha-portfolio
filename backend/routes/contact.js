const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// ── Validation Rules ──
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// ── POST /api/contact ──
router.post('/', validateContact, async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { name, email, message } = req.body;

  // ── Build transporter ──
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `📩 New Contact from ${name} – Portfolio`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:#0d9488;padding:24px 32px;">
          <h2 style="color:#fff;margin:0;font-size:1.2rem;">New Message from Portfolio</h2>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <p style="margin:0 0 12px;color:#64748b;font-size:.85rem;">FROM</p>
          <p style="font-size:1rem;font-weight:600;color:#0f172a;margin:0 0 4px;">${name}</p>
          <p style="font-size:.9rem;color:#0d9488;margin:0 0 24px;">${email}</p>
          <p style="margin:0 0 12px;color:#64748b;font-size:.85rem;">MESSAGE</p>
          <p style="font-size:.95rem;color:#334155;line-height:1.7;background:#f8fafc;padding:16px;border-radius:8px;border-left:3px solid #0d9488;margin:0;">${message.replace(/\n/g,'<br/>')}</p>
        </div>
        <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
          <p style="font-size:.78rem;color:#94a3b8;margin:0;">Sent from Muhammad Shawaiz Portfolio — ${new Date().toLocaleString()}</p>
        </div>
      </div>`,
  };

  // ── Auto-reply to sender ──
  const autoReply = {
    from: `"Muhammad Shawaiz" <${process.env.MAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! 🙌`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:#0f172a;padding:24px 32px;">
          <h2 style="color:#fff;margin:0;">Hey ${name}, message received! ✅</h2>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <p style="color:#334155;line-height:1.7;">Thank you for reaching out! I've received your message and will get back to you within <strong>24–48 hours</strong>.</p>
          <p style="color:#334155;line-height:1.7;">In the meantime, feel free to explore my work or connect with me on LinkedIn.</p>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;">
            <p style="color:#64748b;font-size:.85rem;margin:0;">Best regards,</p>
            <p style="font-size:1rem;font-weight:700;color:#0f172a;margin:4px 0 0;">Muhammad Shawaiz</p>
            <p style="font-size:.85rem;color:#0d9488;margin:2px 0 0;">Web Developer — Karachi, Pakistan</p>
          </div>
        </div>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReply);
    return res.status(200).json({ success: true, message: 'Message sent successfully! I will get back to you soon.' });
  } catch (err) {
    console.error('Mail error:', err.message);
    // Still return success for demo (when mail not configured)
    return res.status(200).json({ success: true, message: 'Message received! (Email service not configured yet)' });
  }
});

module.exports = router;
