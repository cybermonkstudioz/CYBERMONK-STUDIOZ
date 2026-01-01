// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const body = document.body;

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
  
  // Prevent body scroll when nav is open, but ensure it works properly on mobile
  if (isOpen) {
    const scrollY = window.scrollY;
    body.style.top = `-${scrollY}px`;
    body.classList.add('nav-open');
  } else {
    const scrollY = Math.abs(parseInt(body.style.top || '0'));
    body.style.top = '';
    body.classList.remove('nav-open');
    window.scrollTo(0, scrollY);
    // Ensure body scroll is restored
    body.style.overflow = '';
    body.style.position = '';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Restore scroll position
    const scrollY = Math.abs(parseInt(body.style.top || '0'));
    body.style.top = '';
    body.classList.remove('nav-open');
    window.scrollTo(0, scrollY);
    // Ensure body scroll is restored
    body.style.overflow = '';
    body.style.position = '';
  }
});

// Handle resize to ensure proper scroll behavior
window.addEventListener('resize', () => {
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Restore scroll position
    const scrollY = Math.abs(parseInt(body.style.top || '0'));
    body.style.top = '';
    body.classList.remove('nav-open');
    window.scrollTo(0, scrollY);
    // Ensure body scroll is restored
    body.style.overflow = '';
    body.style.position = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);

    if (!target) return;

    e.preventDefault();

    // Close mobile menu and restore scroll before navigating
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      
      // Restore scroll position
      const scrollY = Math.abs(parseInt(body.style.top || '0'));
      body.style.top = '';
      body.classList.remove('nav-open');
      window.scrollTo(0, scrollY);
      
      // Small delay to ensure menu is closed before scrolling
      setTimeout(() => {
        scrollToTarget(target);
      }, 100);
    } else {
      scrollToTarget(target);
    }
  });
});

function scrollToTarget(target) {
  const offset = 90;
  const y =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  // Use smooth scroll if supported, otherwise fallback
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: y, behavior: 'smooth' });
  } else {
    // Fallback for older browsers
    const startY = window.pageYOffset;
    const distance = y - startY;
    const duration = 800;
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startY, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}

// ===== CHATBOT =====
const chatbot = document.getElementById('chatbot');
const openChat = document.getElementById('openChat');
const closeChat = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendMessage');
const input = document.getElementById('userMessage');
const chatContent = document.getElementById('chatContent');

openChat?.addEventListener('click', () => {
  chatbot.style.display = 'flex';
  input.focus();
});

closeChat?.addEventListener('click', () => {
  chatbot.style.display = 'none';
});

sendBtn?.addEventListener('click', sendMessage);
input?.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendMsg('user-msg', text);
  input.value = '';

  setTimeout(() => {
    appendMsg('bot-msg', 'Thanks! We will respond shortly.');
  }, 500);
}

function appendMsg(cls, text) {
  const div = document.createElement('div');
  div.className = cls;
  div.textContent = text;
  chatContent.appendChild(div);
  chatContent.scrollTop = chatContent.scrollHeight;
}

// ESC to close chatbot
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') chatbot.style.display = 'none';
});
