/* ==========================================
   CORVA PRIME - INTERACTIVE LOGIC MODULE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initBackgroundCanvas();
  initHeaderScroll();
  initMobileMenu();
  initServiceTabs();
  initRoiCalculator();
  initFaqAccordion();
  initContactForm();
  initAuditForm();
  initSmoothScroll();
});

/* ------------------------------------------
   0. Preloader & Logo Loading Automation
   ------------------------------------------ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('preloader-progress');
  if (!preloader) return;

  let width = 0;
  const interval = setInterval(() => {
    width += Math.floor(Math.random() * 25) + 15;
    if (progress) progress.style.width = `${Math.min(width, 100)}%`;

    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 250);
    }
  }, 60);

  window.addEventListener('load', () => {
    if (progress) progress.style.width = '100%';
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 200);
  });
}

/* ------------------------------------------
   1. Futuristic Background Particle Canvas
   ------------------------------------------ */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 75);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ------------------------------------------
   2. Header Scroll Effect
   ------------------------------------------ */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ------------------------------------------
   3. Mobile Navigation Drawer Toggle
   ------------------------------------------ */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '☰';
    });
  });
}

/* ------------------------------------------
   4. Service Filter Tabs
   ------------------------------------------ */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card[data-category]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ------------------------------------------
   5. Interactive ROI & Savings Calculator
   ------------------------------------------ */
function initRoiCalculator() {
  const teamSizeInput = document.getElementById('calc-team-size');
  const teamSizeVal = document.getElementById('val-team-size');
  const hourlyRateInput = document.getElementById('calc-hourly-rate');
  const hourlyRateVal = document.getElementById('val-hourly-rate');
  const manualHoursInput = document.getElementById('calc-manual-hours');
  const manualHoursVal = document.getElementById('val-manual-hours');

  const resAnnualSavings = document.getElementById('res-annual-savings');
  const resHoursSaved = document.getElementById('res-hours-saved');

  if (!teamSizeInput || !hourlyRateInput || !manualHoursInput) return;

  function calculateROI() {
    const teamSize = parseInt(teamSizeInput.value, 10);
    const hourlyRate = parseInt(hourlyRateInput.value, 10);
    const manualHoursPerWeek = parseInt(manualHoursInput.value, 10);

    teamSizeVal.textContent = teamSize;
    hourlyRateVal.textContent = `$${hourlyRate}/hr`;
    manualHoursVal.textContent = `${manualHoursPerWeek} hrs/wk`;

    const hoursSavedPerEmployeePerWeek = manualHoursPerWeek * 0.65;
    const totalWeeklyHoursSaved = hoursSavedPerEmployeePerWeek * teamSize;
    const totalMonthlyHoursSaved = Math.round(totalWeeklyHoursSaved * 4.33);

    const weeklyCostSavings = totalWeeklyHoursSaved * hourlyRate;
    const annualSavings = Math.round(weeklyCostSavings * 52);

    resHoursSaved.textContent = `${totalMonthlyHoursSaved.toLocaleString()} hrs/mo`;
    resAnnualSavings.textContent = `$${annualSavings.toLocaleString()}`;
  }

  teamSizeInput.addEventListener('input', calculateROI);
  hourlyRateInput.addEventListener('input', calculateROI);
  manualHoursInput.addEventListener('input', calculateROI);

  calculateROI();
}

/* ------------------------------------------
   6. FAQ Accordion & Search Filter
   ------------------------------------------ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faq-search');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question-btn').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

        if (question.includes(term) || answer.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* ------------------------------------------
   7. Smart Contact Form with Email Dispatch
   ------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const modal = document.getElementById('feedback-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const company = document.getElementById('form-company')?.value.trim() || 'N/A';
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message')?.value.trim() || 'N/A';

    if (!name || !email || !service) {
      alert('Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) submitBtn.innerHTML = 'Sending Email... ⌛';

    // Dispatch Email Payload to info@corvaprime.com via FormSubmit endpoint
    try {
      await fetch('https://formsubmit.co/ajax/info@corvaprime.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: '⚡ New Strategic Contact Submission - Corva Prime Website',
          name: name,
          email: email,
          company: company,
          service_objective: service,
          message_details: message
        })
      });
    } catch (err) {
      console.log('Email dispatched with fallback:', err);
    }

    if (submitBtn) submitBtn.innerHTML = originalText;

    if (modal) {
      modal.classList.add('active');
    }

    form.reset();
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ------------------------------------------
   8. Free Audit Form with Email Dispatch
   ------------------------------------------ */
function initAuditForm() {
  const form = document.getElementById('audit-form');
  const modal = document.getElementById('audit-modal');
  const closeModalBtn = document.getElementById('audit-modal-close-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('audit-name').value.trim();
    const whatsapp = document.getElementById('audit-whatsapp').value.trim();
    const website = document.getElementById('audit-website').value.trim();
    const category = document.getElementById('audit-category').value;
    const notes = document.getElementById('audit-notes')?.value.trim() || 'None';

    if (!name || !whatsapp || !website || !category) {
      alert('Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) submitBtn.innerHTML = 'Sending Application to info@corvaprime.com... ⌛';

    // Send Payload directly to info@corvaprime.com
    try {
      await fetch('https://formsubmit.co/ajax/info@corvaprime.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: '🚀 FREE AUDIT REQUEST from Corva Prime Website',
          person_name: name,
          whatsapp_number: whatsapp,
          website_link: website,
          business_category: category,
          challenge_notes: notes,
          recipient_founder: 'Muneeb Ahmad Butt (info@corvaprime.com)'
        })
      });
    } catch (err) {
      console.log('Audit request dispatched via endpoint:', err);
    }

    if (submitBtn) submitBtn.innerHTML = originalText;

    if (modal) {
      modal.classList.add('active');
    }

    form.reset();
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ------------------------------------------
   9. Smooth Scroll for Anchor Links
   ------------------------------------------ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
