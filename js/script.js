// js/script.js

// Sticky Header
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

let portfolioData = {
  experience: [
    {
      id: 'exp1',
      title: 'Business Analysis & IT Operations Intern',
      org: 'Wish Fertility Hospital & Research Centre',
      date: 'MAY 2025 – FEB 2026',
      desc: `<div class="subtitle">ERP Systems & IT Operations</div><ul><li>Designed a new patient management system aligned with hospital operational goals by converting current as-is processes into an efficient to-be system.</li><li>Worked closely with doctors, nurses, front-office staff, and management for collaborative requirement gathering and effective system design.</li><li>Documented processes to support structured implementation and communicated with development companies for quotations.</li><li>Managed the hospital’s ERP system using administrator access, ensuring efficient system usage and quality assurance.</li><li>Diagnosed and resolved hospital IT software, network, and hardware issues, ensuring smooth system performance and minimal downtime.</li></ul><div class="subtitle" style="margin-top:20px;">Social Media & Event Management</div><ul><li>Supported hospital marketing initiatives by coordinating with the outsourced social media team, contributing to content planning, section management, and design tasks.</li><li>Engaged in organizing marketing campaigns and events while maintaining consistency across digital platforms to improve engagement and outreach.</li></ul>`
    },
    {
      id: 'exp2',
      title: 'Business Process Development Project',
      org: 'Saman Traders (Part Time)',
      date: 'JAN 2026 – MAR 2026',
      desc: `<ul><li>Conducted preliminary analysis of existing "as-is" business processes.</li><li>Contributed to future "to-be" system design through requirement analysis.</li><li>Assisted in requirement clarification and workflow documentation with a proper gap analysis.</li><li>Supported communication between business stakeholders and development teams.</li></ul>`
    }
  ],
  education: [
    {
      id: 'edu1',
      title: 'Information System Engineering',
      org: 'SLIIT (Undergraduate)',
      date: '2022 – 2026',
      desc: `<p>Currently pursuing a Bachelor's degree in Information System Engineering. Gained comprehensive knowledge and hands-on experience in business analysis, software engineering principles, system analysis and design, database management, and UI/UX design.</p><ul><li><strong>Key Courses:</strong> Enterprise Architecture, ERD Design, Object-Oriented Analysis and Design (OOAD).</li><li><strong>Projects:</strong> Salon Reservation System, Paddy Buying & Selling System.</li></ul>`
    },
    {
      id: 'edu2',
      title: 'G.C.E Advanced Level',
      org: 'College of Fast Track Learning',
      date: '2021',
      desc: `<p>Successfully completed the G.C.E Advanced Level examination.</p>`
    },
    {
      id: 'edu3',
      title: 'G.C.E Ordinary Level',
      org: 'Saranath National College',
      date: '2019',
      desc: `<p>Successfully completed the G.C.E Ordinary Level examination.</p>`
    }
  ]
};

// Intersection Observer for Animations
let observer;

document.addEventListener('DOMContentLoaded', () => {
  // Reveal Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initial Observe for Sections
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('reveal');
    observer.observe(sec);
  });

  const header = document.getElementById('header');
  if (header && window.scrollY > 50) {
    header.classList.add('scrolled');
  }

  // 1. Work Status
  const status = localStorage.getItem('portfolio_work_status') || 'open';
  const badge = document.getElementById('workStatus');
  const badgeText = document.getElementById('workStatusText');
  if (badge && badgeText) {
    if (status === 'open') {
      badge.classList.remove('closed');
      badgeText.innerText = 'Open to Work';
    } else {
      badge.classList.add('closed');
      badgeText.innerText = 'Not looking for work';
    }
  }

  // 2. Profile Image
  const savedImage = localStorage.getItem('portfolio_profile_image');
  if (savedImage) {
    const avatar = document.querySelector('.avatar');
    if (avatar) avatar.src = savedImage;
  }

  // 3. Load timeline details overridden from local storage
  const savedDetails = localStorage.getItem('portfolio_data_v2');
  if (savedDetails) {
    portfolioData = JSON.parse(savedDetails);
  }

  // 4. Render the UI
  renderTimelineUI();
});

function renderTimelineUI() {
  const expContainer = document.getElementById('experience-container');
  const eduContainer = document.getElementById('education-container');

  if (expContainer) {
    expContainer.innerHTML = '';
    portfolioData.experience.forEach((item, index) => {
      expContainer.innerHTML += createCardHTML(item, index);
    });
  }

  if (eduContainer) {
    eduContainer.innerHTML = '';
    portfolioData.education.forEach((item, index) => {
      eduContainer.innerHTML += createCardHTML(item, index);
    });
  }

  // Observe newly added timeline elements
  document.querySelectorAll('.timeline-card').forEach((el) => {
    // Only observe if it's not already active
    if (!el.classList.contains('reveal-active')) {
      observer.observe(el);
    }
  });
}

function createCardHTML(item, index) {
  return '<div id="card-' + item.id + '" class="glass timeline-card reveal-stagger" style="transition-delay: ' + (index * 0.1) + 's" onclick="openModal(\'' + item.id + '\')">' +
    '<div class="timeline-date">' + item.date + '</div>' +
    '<h3 class="timeline-title">' + item.title + '</h3>' +
    '<div class="timeline-org">' + item.org + '</div>' +
    '<span class="click-hint"><i class="fas fa-hand-pointer"></i> Click for details</span>' +
    '</div>';
}

// Modal Functions
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');

function openModal(id) {
  // Find item
  let data = portfolioData.experience.find(x => x.id === id) || portfolioData.education.find(x => x.id === id);
  if (!data) return;

  modalBody.innerHTML = '<div style="font-size: 0.9rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 5px;">' + data.date + '</div>' +
    '<h3>' + data.title + '</h3>' +
    '<div style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 20px;">' + data.org + '</div>' +
    '<div class="modal-desc-content">' + data.desc + '</div>';

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(event, force) {
  if (force === true || event.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}
