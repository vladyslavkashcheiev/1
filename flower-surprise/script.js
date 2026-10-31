// Настрой текст письма в index.html — никаких сборщиков и библиотек не нужно.
const openBtn = document.querySelector('#openBtn');
const againBtn = document.querySelector('#againBtn');
const letter = document.querySelector('#letter');
const petals = document.querySelector('#petals');
const garden = document.querySelector('#garden');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function shower(count = 35) {
  if (reducedMotion.matches) return;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty('--drift', `${(Math.random() - .5) * 230}px`);
    petal.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
    petal.style.animationDelay = `${Math.random() * 1.8}s`;
    petal.style.background = ['#f4a7c8','#ffd5d8','#d4b3f6','#ffe5bc'][Math.floor(Math.random() * 4)];
    petals.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }
}
function replayBloom() {
  garden.querySelectorAll('.bloom').forEach(el => {
    el.style.animation = 'none';
    void el.getBoundingClientRect();
    el.style.animation = '';
  });
  shower(45);
}
openBtn.addEventListener('click', () => {
  letter.hidden = false;
  shower(50);
  requestAnimationFrame(() => letter.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth',block:'start'}));
});
againBtn.addEventListener('click', () => {
  replayBloom();
  garden.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth',block:'center'});
});
window.addEventListener('load', () => { setTimeout(() => shower(20), 900); });
