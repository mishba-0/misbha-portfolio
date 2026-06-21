// const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
//   ? `http://localhost:5000/api`
//   : `/api`;

const API = location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://misbha-portfolio-api.onrender.com/api";

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('out');
    document.body.style.overflow = '';
    runReveal();
  }, 2400);
  document.body.style.overflow = 'hidden';
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
  runReveal();
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

function runReveal() {
  const items = document.querySelectorAll('.reveal:not(.in),.reveal-left:not(.in),.reveal-right:not(.in)');
  items.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 55) {
      setTimeout(() => el.classList.add('in'), i * 55);
    }
  });
  animateSkillBars();
}

function animateSkillBars() {
  document.querySelectorAll('.skill-fill[data-pct]').forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && bar.style.width === '') {
      bar.style.width = bar.dataset.pct + '%';
    }
  });
}

// async function loadSkills() {
//   const grid = document.getElementById('skillsGrid');
//   try {
//     const res = await fetch(`${API}/skills`);
//     const json = await res.json();
//     if (!json.success) throw new Error('Failed');

//     grid.innerHTML = '';
//     json.data.forEach((s, i) => {
//       const card = document.createElement('div');
//       card.className = 'skill-card reveal';
//       card.style.transitionDelay = (i * 55) + 'ms';
//       card.innerHTML = `
//         <div class="skill-logo">${s.icon}</div>
//         <div class="skill-name">${s.name}</div>
//         <div class="skill-bar">
//           <div class="skill-fill" data-pct="${s.pct}"
//             style="background:linear-gradient(90deg,${s.color},${s.color}aa)"></div>
//         </div>
//         <div class="skill-pct">${s.pct}%</div>`;
//       grid.appendChild(card);
//     });
//     runReveal();
//   } catch (err) {
//     grid.innerHTML = '<div class="skills-loading" style="color:#ef4444;">⚠️ Could not load skills. Make sure backend is running.</div>';
//   }
// }

function loadSkills() {
  const grid = document.getElementById('skillsGrid');

  const skills = [
    { name:'Tailwind CSS', pct:92, color:'#38bdf8', icon:'🌊' },
    { name:'HTML & CSS', pct:98, color:'#e34f26', icon:'🌐' },
    { name:'JavaScript', pct:87, color:'#f7df1e', icon:'⚡' },
    { name:'Bootstrap', pct:90, color:'#7952b3', icon:'🅱️' },
    { name:'MongoDB', pct:82, color:'#47a248', icon:'🍃' },
    { name:'React', pct:85, color:'#61dafb', icon:'⚛️' },
    { name:'GitHub', pct:75, color:'#171515', icon:'🐙' },
    { name:'Firebase', pct:75, color:'#ffca28', icon:'🔥' }
  ];

  grid.innerHTML = '';

  skills.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal';
    card.style.transitionDelay = (i * 55) + 'ms';

    card.innerHTML = `
      <div class="skill-logo">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar">
        <div class="skill-fill" data-pct="${s.pct}"
          style="background:linear-gradient(90deg,${s.color},${s.color}aa)"></div>
      </div>
      <div class="skill-pct">${s.pct}%</div>
    `;

    grid.appendChild(card);
  });

  runReveal();
}

function setupFilters() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.cat);
    });
  });
}

let testIndex = 0;
let testData = [];

// async function submitContact(e) {
//   e.preventDefault();
//   const name = document.getElementById('fname').value.trim();
//   const email = document.getElementById('femail').value.trim();
//   const message = document.getElementById('fmsg').value.trim();
//   const btn = document.getElementById('submitBtn');

//   ['nameErr', 'emailErr', 'msgErr'].forEach(id => document.getElementById(id).textContent = '');
//   ['fname', 'femail', 'fmsg'].forEach(id => document.getElementById(id).classList.remove('error'));

//   let valid = true;
//   if (!name) { showFieldError('nameErr', 'fname', 'Name is required'); valid = false; }
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError('emailErr', 'femail', 'Valid email is required'); valid = false; }
//   if (!message || message.length < 10) { showFieldError('msgErr', 'fmsg', 'Message must be at least 10 characters'); valid = false; }
//   if (!valid) return;

//   btn.disabled = true;
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

//   try {
//     const res = await fetch(`${API}/contact`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, message })
//     });
//     const json = await res.json();

//     if (json.success) {
//       showToast('✅ ' + json.message, false);
//       document.getElementById('contactForm').reset();
//     } else {
//       const msg = json.errors ? json.errors.map(e => e.msg).join(', ') : json.message;
//       showToast('❌ ' + msg, true);
//     }
//   } catch (err) {
//     showToast('❌ Network error. Please check your connection.', true);
//   } finally {
//     btn.disabled = false;
//     btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
//   }
// }

// function showFieldError(errId, fieldId, msg) {
//   document.getElementById(errId).textContent = msg;
//   document.getElementById(fieldId).classList.add('error');
// }

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmsg').value.trim();
  const btn = document.getElementById('submitBtn');

  // Purani errors saaf karna
  ['nameErr', 'emailErr', 'msgErr'].forEach(id => document.getElementById(id).textContent = '');
  ['fname', 'femail', 'fmsg'].forEach(id => document.getElementById(id).classList.remove('error'));

  // Validation checking
  let valid = true;
  if (!name) { showFieldError('nameErr', 'fname', 'Name is required'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError('emailErr', 'femail', 'Valid email is required'); valid = false; }
  if (!message || message.length < 10) { showFieldError('msgErr', 'fmsg', 'Message must be at least 10 characters'); valid = false; }
  if (!valid) return;

  // Button loading state
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const formData = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      showToast('✅ Message sent successfully!', false);
      form.reset();
    } else {
      showToast('❌ Form submission failed. Please try again.', true);
    }
  } catch (err) {
    showToast('❌ Network error. Please check your internet.', true);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

function showFieldError(errId, fieldId, msg) {
  document.getElementById(errId).textContent = msg;
  document.getElementById(fieldId).classList.add('error');
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('error', isError);
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

loadSkills();
setTimeout(runReveal, 2500);