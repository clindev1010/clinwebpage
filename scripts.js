const overlay = document.getElementById("overlay");
const arrowTip = document.getElementById("arrowTip");

function closeOverlay() {
  overlay.classList.add("closed");
}

/* Click arrow tip */
arrowTip.addEventListener("click", closeOverlay);

/* Scroll up */
window.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    closeOverlay();
  }
});

/* Mobile swipe up */
let startY = 0;

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  if (startY - e.touches[0].clientY > 50) {
    closeOverlay();
  }
});

// snow flakes

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
const snowflakeCount = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createSnowflakes() {
  snowflakes = [];
  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random()
    });
  }
}
createSnowflakes();

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.beginPath();

  for (let flake of snowflakes) {
    ctx.globalAlpha = flake.opacity;
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  }

  ctx.fill();
  updateSnow();
}

function updateSnow() {
  for (let flake of snowflakes) {
    flake.y += flake.speed;

    if (flake.y > canvas.height) {
      flake.y = -flake.r;
      flake.x = Math.random() * canvas.width;
    }
  }
}

function animateSnow() {
  drawSnow();
  requestAnimationFrame(animateSnow);
}

animateSnow();
