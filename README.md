# Misbha tahir iqbal Portfolio
## Full Stack: Node.js + Express (Backend) + HTML/CSS/JS (Frontend)

---

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── routes/
│   │   ├── contact.js        ← POST /api/contact (sends email)
│   │   ├── projects.js       ← GET  /api/projects
│   │   ├── skills.js         ← GET  /api/skills
│   │   └── testimonials.js   ← GET  /api/testimonials
│   ├── .env                  ← Environment variables
│   ├── server.js             ← Main Express server
│   └── package.json
│
└── frontend/
    └── public/
        ├── index.html
        ├── css/style.css
        └── js/app.js
```

---

## 🚀 Quick Start

### Step 1: Install dependencies
```bash
cd portfolio/backend
npm install
```

### Step 2: Configure environment
Edit `backend/.env`:
```env
PORT=5000
MAIL_USER=shawaizkhpal72@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_TO=shawaizkhpal72@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Step 3: Run the server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

### Step 4: Open in browser
Visit: **http://localhost:5000**

---

## 📧 Gmail Setup (for Contact Form)
1. Go to your Google Account → Security
2. Enable 2-Factor Authentication
3. Go to "App Passwords" → Generate a password
4. Paste it in `.env` as `MAIL_PASS`

---

## 🌐 API Endpoints

| Method | Endpoint               | Description           |
|--------|------------------------|-----------------------|
| GET    | /api/health            | Health check          |
| GET    | /api/skills            | Get all skills        |
| GET    | /api/projects          | Get all projects      |
| GET    | /api/projects?cat=react| Filter by category    |
| GET    | /api/testimonials      | Get testimonials      |
| POST   | /api/contact           | Send contact message  |

---

## 🚢 Deploy to Production

### Option 1: Render.com (Free)
1. Push to GitHub
2. Create new Web Service on render.com
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variables

### Option 2: Railway.app (Free)
1. Connect GitHub repo
2. Railway auto-detects Node.js
3. Add env variables in dashboard

---

## ✨ Features
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Loading screen animation
- ✅ Scroll reveal animations
- ✅ Animated skill bars
- ✅ Project filter by category
- ✅ Testimonial auto-slider
- ✅ Contact form with validation
- ✅ Email sending (Nodemailer)
- ✅ Auto-reply to sender
- ✅ Back to top button
- ✅ Sticky navbar with scroll effect
- ✅ Security headers (Helmet)
- ✅ CORS configured
- ✅ Input validation (express-validator)
