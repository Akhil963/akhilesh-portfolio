# 🎨 Akhilesh's Portfolio

A modern, interactive personal portfolio website showcasing projects, skills, and experience. Features a sleek dark/light theme, smooth animations, and SendGrid email integration.

**Live Demo:** [akhilesh-portfolio.vercel.app](https://akhilesh-portfolio.vercel.app)

---

## ✨ Features

- 🌙 **Dark/Light Theme Toggle** - Smooth theme switching with CSS variables
- 📱 **Fully Responsive** - Mobile-first design for all devices
- ✨ **Scroll Animations** - Intersection Observer-based reveal animations
- 🎯 **Smooth Navigation** - Smart navbar with active link highlighting
- 📧 **Contact Form** - SendGrid integration for email delivery
- 🎨 **Modern UI** - Glassmorphism, gradients, and smooth transitions
- 🎭 **Interactive Elements** - 3D tilt effect on cards, particle animations
- ⚡ **Performance** - Optimized for fast load times and smooth interactions
- 🔍 **SEO Ready** - Semantic HTML with meta tags

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Variables, Grid, Flexbox, Animations
- **Vanilla JavaScript** - No frameworks, pure DOM manipulation
- **Font Awesome 6.5.0** - Icon library
- **Google Fonts** - Inter & Space Grotesk typefaces

### Backend (Optional)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SendGrid** - Email service
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

---

## 📁 Project Structure

```
akhilesh-portfolio/
├── index.html              # Main HTML (665 lines, semantic sections)
├── style.css               # Styles (2052 lines, CSS variables)
├── script.js               # Interactive features (276 lines)
├── README.md               # This file
├── assest/                 # Static assets (note: typo preserved)
│   └── img/
│       ├── logo.png
│       ├── logo.svg
│       ├── 1.jpg
│       └── 2.jpg
└── backend/                # Express.js server (optional)
    ├── server.js           # Main server with SendGrid
    ├── package.json        # Dependencies
    ├── .env.example        # Environment template
    ├── .gitignore          # Git ignore rules
    └── README.md           # Backend setup guide
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** (for backend only)
- **SendGrid Account** (for email feature)

### Frontend Only (Static Site)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/akhilesh-portfolio.git
   cd akhilesh-portfolio
   ```

2. **Open in browser**
   - Use any HTTP server or open `index.html` directly
   - For local testing, use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code

3. **Done!** 🎉
   - Explore the portfolio at `http://localhost:5500`

---

## 📧 Setup Email Feature (Optional)

### 1. Get SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com) → **Free Tier** (100 emails/day)
2. Sign up and verify your email
3. Navigate to **Settings → API Keys**
4. Create a new API Key (keep it secret!)

### 2. Configure Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_ADMIN_EMAIL=your-email@gmail.com
```

**Important:**
- Replace `your_sendgrid_api_key_here` with your actual API key
- Verify `SENDGRID_FROM_EMAIL` in SendGrid settings
- Update `SENDGRID_ADMIN_EMAIL` with your email

### 3. Run Backend Locally

```bash
cd backend
npm run dev
```

Server runs on `http://localhost:5000`

### 4. Test the Contact Form

- Open portfolio at `http://localhost:5500` (or your dev server)
- Fill the contact form
- Click "Send Message"
- Check your email! ✉️

---

## 📋 Configuration

### Theme Colors

Edit CSS variables in `style.css` (lines 1-80):

```css
:root {
  --color-primary: #00D4FF;        /* Teal accent */
  --color-secondary: #8B6B47;      /* Brown accent */
  --color-bg-dark: #0F1118;        /* Dark background */
  --color-text-dark: #E0E0E0;      /* Light text */
}

[data-theme="light"] {
  --color-bg: #F5F1E8;             /* Cream background */
  --color-text: #2A2A2A;           /* Dark text */
}
```

### Add New Project

1. Open `index.html` → Find `<section id="projects">`
2. Copy a `.project-card` block
3. Update:
   - Image URL
   - Project title
   - Description
   - Tech badges
   - Demo/GitHub links
4. JavaScript auto-applies animations

Example:
```html
<div class="project-card glass-card">
  <img src="assest/img/project.jpg" alt="Project Name">
  <h3>Project Name</h3>
  <p>Description...</p>
  <div class="tech-stack">
    <span class="tech-badge">React</span>
    <span class="tech-badge">Node.js</span>
  </div>
  <a href="#" class="btn btn-small">View Project</a>
</div>
```

### Add New Skill

1. Find `.skill-category` in `style.css`
2. Add `.skill-item`:
```html
<div class="skill-item">
  <div class="skill-header">
    <span class="skill-name">New Skill</span>
    <span class="skill-level">90%</span>
  </div>
  <div class="skill-progress" data-progress="90"></div>
</div>
```

---

## 🌐 Deployment

### Option 1: Vercel (Recommended) 

**Frontend:**
```bash
npm install -g vercel
vercel
```

**Backend:**
1. Push backend to GitHub
2. Import repository in Vercel
3. Set environment variables in dashboard
4. Deploy!

**Frontend API URL:** Update in `script.js` (line 195)
```javascript
const API_URL = 'https://your-backend.vercel.app/api/send-email';
```

### Option 2: Netlify

1. Connect GitHub repo to Netlify
2. Deploy frontend
3. Deploy backend separately (Vercel/Heroku)
4. Update API URL in code

### Option 3: GitHub Pages (Frontend Only)

```bash
git push origin main
# Enable GitHub Pages in repo settings
```

---

## 🔧 Customization

### Update Personal Info

**Header & Hero:**
- Line 65-68 in `index.html` - Name, title, tagline
- Line 76-78 - Profile image (`assest/img/1.jpg`)

**Contact Section:**
- Line 459 - Email address
- Line 465 - Location
- Line 484-490 - Social media links (LinkedIn, GitHub)

**Footer:**
- Line 543 - Social links
- Line 552 - Copyright year (auto-updates via JavaScript)

### Modify Animations

**Scroll Reveal Duration:**
- `script.js` line 127: Change `i * 100` to adjust stagger delay

**Counter Animation Speed:**
- `script.js` line 144: Change `target / 60` to adjust speed

**Particle Canvas:**
- `script.js` line 71: Change `80` to adjust particle count

---

## 📊 API Documentation

### POST `/api/send-email`

Send an email through the contact form.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Opportunity",
  "message": "Hi Akhilesh, I'd like to discuss..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "All fields are required"
}
```

**Validation Rules:**
- All fields required
- Email must be valid format
- Message can be multi-line

---

## 🐛 Troubleshooting

### Contact Form Not Sending?

1. **Check backend is running**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"Server is running"}`

2. **Verify SendGrid API Key**
   - Check `.env` has correct API key
   - Verify key permissions in SendGrid dashboard

3. **Check CORS settings**
   - Backend `server.js` includes your frontend URL in `origin` array

4. **Check browser console**
   - Open DevTools (F12) → Console
   - Look for error messages

### Emails Going to Spam?

1. **Verify sender email** in SendGrid Settings
2. **Add SPF/DKIM records** if using custom domain
3. **Test with trusted email** (Gmail, Outlook)

### Animations Not Working?

1. Check JavaScript console for errors
2. Ensure `data-progress` attributes exist on skill bars
3. Verify Intersection Observer support (modern browsers only)

---

## 📝 License

MIT License - Feel free to use this template for your portfolio!

---

## 🤝 Contributing

Found a bug? Have a suggestion? Open an issue or submit a PR!

---

## 📞 Contact

- **Email:** akhileshbhandakkar@gmail.com
- **LinkedIn:** [linkedin.com/in/akhilesh-bhandakkar](https://www.linkedin.com/in/akhilesh-bhandakkar-a48479251)
- **GitHub:** [github.com/Akhil963](https://github.com/Akhil963)

---

## 📚 Resources

- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Express.js Guide](https://expressjs.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

**Made with ❤️ by Akhilesh M. Bhandakkar**

Last Updated: May 2026
