let currentScene = 1;
const totalScenes = 6;

function nextScene() {
  const current = document.getElementById(`scene${currentScene}`);
  if (current) current.classList.remove('active');

  currentScene++;
  if (currentScene > totalScenes) return;

  const next = document.getElementById(`scene${currentScene}`);
  if (next) next.classList.add('active');
}

// Music play once on click
let started = false;
document.addEventListener('click', () => {
  if (!started) {
    const audio = new Audio('https://www.bensound.com/bensound-music/bensound-love.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    started = true;
  }
}, { once: true });
