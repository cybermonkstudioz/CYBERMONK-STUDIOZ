// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle?.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isActive);
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = isActive ? 'hidden' : '';
});

// Close menu when clicking on links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);

    if (!target) return;

    e.preventDefault();

    // Dynamic offset based on screen size
    const offset = window.innerWidth <= 880 ? 80 : 90;
    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({ top: y, behavior: 'smooth' });

    // Close mobile menu if open
    nav.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ===== CHATBOT =====
const chatbot = document.getElementById('chatbot');
const openChat = document.getElementById('openChat');
const closeChat = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendMessage');
const input = document.getElementById('userMessage');
const chatContent = document.getElementById('chatContent');

openChat?.addEventListener('click', () => {
  if (chatbot) {
    chatbot.style.display = 'flex';
    chatbot.classList.remove('hidden');
    input?.focus();
    
    // Add slight delay for animation
    setTimeout(() => {
      chatbot.style.transform = 'translateY(0)';
      chatbot.style.opacity = '1';
    }, 10);
  }
});

closeChat?.addEventListener('click', () => {
  if (chatbot) {
    chatbot.style.transform = 'translateY(20px)';
    chatbot.style.opacity = '0';
    
    setTimeout(() => {
      chatbot.style.display = 'none';
      chatbot.classList.add('hidden');
    }, 300);
  }
});

sendBtn?.addEventListener('click', sendMessage);
input?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = input.value.trim();
  if (!text || !chatContent) return;

  appendMsg('user-msg', text);
  input.value = '';

  // Simulate bot response
  setTimeout(() => {
    const responses = [
      'Thanks! We will respond shortly.',
      'Thank you for your message! Our team will get back to you soon.',
      'Message received! We\'ll contact you within 24 hours.',
      'Great to hear from you! Let me connect you with our team.'
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    appendMsg('bot-msg', randomResponse);
  }, 800 + Math.random() * 700); // Variable delay for realism
}

function appendMsg(cls, text) {
  if (!chatContent) return;
  
  const div = document.createElement('div');
  div.className = cls;
  div.textContent = text;
  chatContent.appendChild(div);
  
  // Smooth scroll to bottom
  chatContent.scrollTo({
    top: chatContent.scrollHeight,
    behavior: 'smooth'
  });
}

// ESC to close chatbot
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && chatbot && chatbot.style.display === 'flex') {
    closeChat?.click();
  }
});

// Touch-friendly chatbot positioning for mobile
function adjustChatbotPosition() {
  if (chatbot && window.innerWidth <= 480) {
    const whatsappFAB = document.querySelector('.whatsapp-fab');
    if (whatsappFAB) {
      const fabRect = whatsappFAB.getBoundingClientRect();
      chatbot.style.bottom = `${fabRect.height + 20}px`;
    }
  }
}

window.addEventListener('resize', adjustChatbotPosition);
adjustChatbotPosition();
