const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

// CLICK EVENT
drumPads.forEach(pad => {
  pad.addEventListener('click', () => {
    const key = pad.textContent.trim();
    const audio = document.getElementById(key);
    
    audio.currentTime = 0; // restart sound
    audio.play();
    
    display.textContent = key;
  });
});

// KEYBOARD EVENT
document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  const audio = document.getElementById(key);

  if (audio) {
    audio.currentTime = 0;
    audio.play();
    display.textContent = key;
  }
});