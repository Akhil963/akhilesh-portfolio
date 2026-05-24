import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5501',
  'http://127.0.0.1:5501',
  'http://127.0.0.1:3000',
  'https://akhilesh-portfolio.vercel.app',
];

// Add Render domains dynamically
if (process.env.RENDER_EXTERNAL_URL) {
  allowedOrigins.push(process.env.RENDER_EXTERNAL_URL);
}

// Add frontend URL if provided
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Create email content
    const userEmail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: process.env.SENDGRID_ADMIN_EMAIL,
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 24px;">Thank You!</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="margin-top: 0; font-size: 16px;">Hi <strong>${name}</strong>,</p>
            
            <p style="font-size: 14px; line-height: 1.6;">Thank you for reaching out! I've received your message and will review it shortly. I'll get back to you within 24-48 hours.</p>
            
            <div style="background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary:</p>
              <p style="margin: 0 0 8px 0;"><strong style="color: #667eea;">Subject:</strong> ${subject}</p>
              <p style="margin: 0; white-space: pre-wrap; font-size: 13px; color: #555;">${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; margin: 20px 0;">Best regards,<br><strong style="color: #667eea;">Akhilesh M. Bhandakkar</strong><br><span style="font-size: 12px; color: #999;">Full-Stack Developer</span></p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 11px; color: #999; margin: 0; text-align: center;">This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    // Admin notification email
    const adminEmail = {
      to: process.env.SENDGRID_ADMIN_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: email,
      subject: `📬 New Contact: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 24px;">🎉 New Message Received!</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 15px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Sender Details:</p>
              <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Subject:</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #333;">${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Message:</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</p>
            </div>
            
            <p style="font-size: 12px; color: #999; margin: 20px 0 0 0; text-align: center;">
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await sgMail.send(userEmail);
    await sgMail.send(adminEmail);

    res.json({
      success: true,
      message: 'Email sent successfully!',
    });
  } catch (error) {
    console.error('SendGrid Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📧 SendGrid API Key configured: ${process.env.SENDGRID_API_KEY ? 'Yes' : 'No'}`);
});
