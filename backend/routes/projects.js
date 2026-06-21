const express = require('express');
const router = express.Router();

const projects = [
  { id:1, tag:'Frontend', title:'Coffee Website',         emoji:'☕', cat:'frontend',  desc:'A modern coffee shop landing page with animations and menu showcase.' },
  { id:2, tag:'Frontend', title:'Northern Area Website',  emoji:'🏔️', cat:'frontend',  desc:'Tourism website for Northern Pakistan with image galleries.' },
  { id:3, tag:'Frontend', title:'National Park Website',  emoji:'🌿', cat:'frontend',  desc:'Clean, responsive website for a national park with booking features.' },
  { id:4, tag:'React',    title:'Beef-Hub',               emoji:'🥩', cat:'react',     desc:'Food ordering platform built with React and context API.' },
  { id:5, tag:'React',    title:'Cafe-Aura',              emoji:'☕', cat:'react',     desc:'Elegant cafe website built with React and Tailwind CSS.' },
  { id:6, tag:'Laravel',  title:'Elite Solutions',        emoji:'💼', cat:'laravel',   desc:'Corporate website with Laravel backend, admin panel, and CRM.' },
  { id:7, tag:'Laravel',  title:'Aptech Garden Center',   emoji:'🎓', cat:'laravel',   desc:'Education institute website with course management system.' },
  { id:8, tag:'WordPress',title:'Elba Tech',              emoji:'💻', cat:'wordpress', desc:'Tech company WordPress site with custom theme and plugins.' },
  { id:9, tag:'WordPress',title:'Serv Energy',            emoji:'⚡', cat:'wordpress', desc:'Energy company website with service listings and contact forms.' },
];

// GET /api/projects
router.get('/', (req, res) => {
  const { cat } = req.query;
  const result = cat ? projects.filter(p => p.cat === cat.toLowerCase()) : projects;
  res.json({ success: true, count: result.length, data: result });
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
});

// GET /api/projects/categories/list
router.get('/categories/list', (req, res) => {
  const cats = ['all', ...new Set(projects.map(p => p.cat))];
  res.json({ success: true, data: cats });
});

module.exports = router;
