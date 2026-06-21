const express = require('express');
const router = express.Router();

const testimonials = [
  { id:1, name:'Liana Marie',  role:'Lead Designer, Ratec',    emoji:'👩', quote:'Muhammad delivered an outstanding website for our business. His attention to detail and ability to translate our ideas into a beautiful, functional site was truly impressive. Highly recommended!' },
  { id:2, name:'Jonathon Doe', role:'CTO & Co-Founder',        emoji:'👨', quote:'Working with Shawaiz was a fantastic experience. He built a fast, responsive Laravel backend that handles our data perfectly. Clean, maintainable code and excellent communication throughout.' },
  { id:3, name:'Sara Ahmed',   role:'Marketing Manager',       emoji:'👩‍💼', quote:'Shawaiz designed and developed our WordPress site from scratch. The final result exceeded our expectations — clean, fast, and exactly what we envisioned. Will definitely work with him again!' },
  { id:4, name:'Ali Hassan',   role:'Product Manager',         emoji:'👨‍💻', quote:'Excellent React developer! Built our dashboard UI with great performance and clean code. Very professional and responsive throughout the entire project. 5 stars!' },
];

// GET /api/testimonials
router.get('/', (req, res) => {
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

module.exports = router;
