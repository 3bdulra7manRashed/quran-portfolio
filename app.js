/**
 * عبدالرحمن راشد - مونتاج التلاوات القرآنية
 * Application Logic & Conversion Tracking & Anti-Bot Protection Shield
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSecureContact();
  initProjectFiltering();
  initMobileDrawer();
  initHeaderScroll();
  initFooterYear();
  initModalKeyEvents();
  initEventTracking();
});

/* ==========================================================================
   Anti-Bot Cryptographic Obfuscation Shield
   Zero plain text phone or email in HTML source.
   Decoded only in-memory upon human click events.
   ========================================================================== */
const SECURE_VAULT = {
  // XOR key
  _k: 42,
  // Encrypted byte arrays for abdullrahman17rashed@gmail.com and 201013501657
  _e: [75, 72, 78, 95, 70, 70, 88, 75, 66, 71, 75, 68, 27, 29, 88, 75, 89, 66, 79, 78, 106, 77, 71, 75, 67, 70, 4, 73, 69, 71],
  _p: [24, 26, 27, 26, 27, 25, 31, 26, 27, 28, 31, 29],

  decode(arr) {
    return arr.map(c => String.fromCharCode(c ^ this._k)).join('');
  },
  getEmail() {
    return this.decode(this._e);
  },
  getPhone() {
    return this.decode(this._p);
  },
  getFormattedPhone() {
    return '+' + this.decode(this._p);
  }
};

function initSecureContact() {
  // 1. WhatsApp Triggers (General & CTAs)
  const waTriggers = document.querySelectorAll('.secure-wa-trigger');
  waTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = SECURE_VAULT.getPhone();
      const ctaSource = btn.getAttribute('data-cta') || btn.id || 'general';
      const msg = "السلام عليكم ورحمة الله وبركاته، أخي عبدالرحمن، اطلعت على معرض أعمالك وأود الاستفسار عن خدمة مونتاج التلاوات القرآنية.";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      trackEvent('whatsapp_click', { source: ctaSource });
    });
  });

  // 2. WhatsApp Triggers (Specific Packages)
  const pkgTriggers = document.querySelectorAll('.secure-wa-pkg');
  pkgTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = SECURE_VAULT.getPhone();
      const pkgName = btn.getAttribute('data-pkg') || 'باقة شهرية';
      const ctaSource = btn.getAttribute('data-cta') || 'package_btn';
      const msg = `السلام عليكم ورحمة الله وبركاته، أخي عبدالرحمن، أود الاستفسار عن تفاصيل والاشتراك في [${pkgName}].`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      trackEvent('whatsapp_package_click', { package: pkgName, source: ctaSource });
    });
  });

  // 3. Email Triggers (Direct mail client)
  const emailTriggers = document.querySelectorAll('.secure-email-trigger');
  emailTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = SECURE_VAULT.getEmail();
      const ctaSource = btn.getAttribute('data-cta') || 'email_btn';
      const subject = "طلب مونتاج تلاوات قرآنية / استفسار";
      const body = "السلام عليكم ورحمة الله وبركاته أخي عبدالرحمن،\n\nأود التواصل معك بخصوص مونتاج تلاوات قرآنية...\n";
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      trackEvent('email_click', { source: ctaSource });
    });
  });

  // 4. Safe Copy to Clipboard (Phone)
  const copyPhoneBtn = document.getElementById('btn-copy-phone');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const phoneFormatted = SECURE_VAULT.getFormattedPhone();
      try {
        await navigator.clipboard.writeText(phoneFormatted);
        showToast(`تم نسخ رقم الهاتف بنجاح: ${phoneFormatted}`);
        trackEvent('phone_copied', {});
      } catch (err) {
        showToast(`رقم الهاتف: ${phoneFormatted}`);
      }
    });
  }

  // 5. Safe Copy to Clipboard (Email)
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = SECURE_VAULT.getEmail();
      try {
        await navigator.clipboard.writeText(email);
        showToast(`تم نسخ البريد الإلكتروني بنجاح: ${email}`);
        trackEvent('email_copied', {});
      } catch (err) {
        showToast(`البريد الإلكتروني: ${email}`);
      }
    });
  }
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   Theme Toggle (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Default to light theme (Warm Paper & Ivory)
  const savedTheme = localStorage.getItem('abdurrahman_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('abdurrahman_theme', next);
      trackEvent('theme_changed', { theme: next });
    });
  }
}

/* ==========================================================================
   Project Filtering (Tabs supporting space-separated multi-categories)
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      trackEvent('portfolio_filter_click', { filter });

      projectCards.forEach(card => {
        const rawCats = card.getAttribute('data-categories') || card.getAttribute('data-category') || '';
        const cats = rawCats.split(/\s+/).filter(Boolean);

        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Video Modal Player
   ========================================================================== */
window.openVideoModal = function(videoId, title, type = 'long') {
  const modal = document.getElementById('video-modal');
  const modalDialog = document.getElementById('modal-dialog');
  const titleEl = document.getElementById('modal-video-title');
  const container = document.getElementById('modal-video-container');

  if (!modal || !container) return;

  titleEl.textContent = title;

  if (type === 'short') {
    modalDialog.classList.add('short-dialog');
  } else {
    modalDialog.classList.remove('short-dialog');
  }

  container.innerHTML = `
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
      title="${title}" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  trackEvent('video_view', { videoId, title, type });
};

window.closeVideoModal = function() {
  const modal = document.getElementById('video-modal');
  const container = document.getElementById('modal-video-container');

  if (!modal) return;

  if (container) {
    container.innerHTML = '';
  }

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

function initModalKeyEvents() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });
}

/* ==========================================================================
   Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!drawer) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   Header Scroll State
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   Footer Current Year & Back to Top
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('footer-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      trackEvent('back_to_top_click', {});
    });
  }
}

/* ==========================================================================
   Analytics & Conversion Tracking
   ========================================================================== */
function initEventTracking() {
  // Track Page View
  trackEvent('page_view', {
    url: window.location.href,
    referrer: document.referrer || 'direct',
    screen: `${window.innerWidth}x${window.innerHeight}`
  });

  // Track Hero Primary CTA
  const heroWorkBtn = document.getElementById('hero-btn-work');
  if (heroWorkBtn) {
    heroWorkBtn.addEventListener('click', () => {
      trackEvent('hero_work_click', {});
    });
  }

  // Track Khamsat Clicks
  const khamsatBtns = document.querySelectorAll('a[href*="khamsat.com"]');
  khamsatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('khamsat_link_click', { location: btn.id || 'body' });
    });
  });

  // Track Equran external channel clicks
  const equranLinks = document.querySelectorAll('a[href*="youtube.com/@equranme"], a[href*="equran.me"]');
  equranLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('equran_case_study_external_click', { url: link.href });
    });
  });
}

function trackEvent(name, data = {}) {
  const eventLog = {
    event: name,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  // 1. In-memory & Console log
  console.log('[Analytics]:', eventLog);

  // 2. DataLayer integration (Google Tag Manager / Analytics if present)
  if (window.dataLayer) {
    window.dataLayer.push(eventLog);
  }

  // 3. Persist recent events in localStorage for audit
  try {
    const stored = JSON.parse(localStorage.getItem('quran_portfolio_events') || '[]');
    stored.push(eventLog);
    if (stored.length > 100) stored.shift();
    localStorage.setItem('quran_portfolio_events', JSON.stringify(stored));
  } catch (err) {
    // ignore quota error
  }
}

// Global helper for DevTools conversion inspection
window.getConversionReport = function() {
  try {
    const events = JSON.parse(localStorage.getItem('quran_portfolio_events') || '[]');
    const summary = {};
    events.forEach(e => {
      summary[e.event] = (summary[e.event] || 0) + 1;
    });
    console.table(summary);
    return summary;
  } catch (e) {
    return {};
  }
};
