// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.setAttribute(
    'aria-expanded',
    nav.classList.contains('active')
  );
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);

    if (!target) return;

    e.preventDefault();

    const offset = 90;
    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({ top: y, behavior: 'smooth' });

    nav.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
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
