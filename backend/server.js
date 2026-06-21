require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');

const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const testimonialsRouter = require('./routes/testimonials');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security & Performance Middleware ──
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── CORS ──
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ── Body Parsing ──
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Serve Frontend Static Files ──
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ── API Routes ──
app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/testimonials', testimonialsRouter);

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Muhammad Shawaiz Portfolio API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ── Catch-all: serve frontend ──
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// ── 404 JSON ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler ──
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from ../frontend/public`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
