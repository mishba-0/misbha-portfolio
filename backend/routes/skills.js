const express = require('express');
const router = express.Router();

const skills = [
  { id:2,  name:'Tailwind CSS', pct:92, color:'#38bdf8', icon:'🌊', category:'frontend' },
  { id:3,  name:'HTML & CSS',   pct:98, color:'#e34f26', icon:'🌐', category:'frontend' },
  { id:4,  name:'JavaScript & ES6',   pct:87, color:'#f7df1e', icon:'⚡', category:'frontend' },
  { id:9,  name:'Bootstrap',    pct:90, color:'#7952b3', icon:'🅱️', category:'frontend' },
  { id:10, name:'MongoDB',      pct:82, color:'#47a248', icon:'🍃', category:'database' },
  { id:11, name:'React',        pct:85, color:'#61dafb', icon:'⚛️', category:'frontend' },
  { id:12, name:'GitHub',       pct:75, color:'#171515', icon:'🐙', category:'tools' },
{ id:13, name:'Firebase', pct:75, color:'#ffca28', icon:'🔥', category:'tools' },];

// GET /api/skills
router.get('/', (req, res) => {
  const { category } = req.query;
  const result = category ? skills.filter(s => s.category === category) : skills;
  res.json({ success: true, count: result.length, data: result });
});

module.exports = router;
