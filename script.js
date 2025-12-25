// 1. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check if user previously selected dark mode
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// 3. Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close menu on click
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// ... existing JavaScript above ...

/* ===========================
   Snow Animation Logic
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('snow-overlay');
    const closeBtn = document.getElementById('close-snow');
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');

    // Set Canvas Dimensions to fill screen
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Snow settings
    const maxFlakes = 150; // Total number of snowflakes
    const flakes = [];

    // Initialize flakes
    for (let i = 0; i < maxFlakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1, // Radius (size) between 1px and 4px
            d: Math.random() * 1 + 0.5 // Density (falling speed relative to size)
        });
    }

    // The animation loop function
    function drawSnow() {
        ctx.clearRect(0, 0, width, height); // Clear canvas for next frame

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Soft white snow
        ctx.beginPath();

        for (let i = 0; i < maxFlakes; i++) {
            const f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true); // Draw circle

            // Update positions for next frame
            f.y += Math.pow(f.d, 2) + 0.5; // Gravity effect
            f.x += Math.sin(f.y * 0.01) * 0.5; // Slight horizontal drift

            // If flake reaches bottom, send it back to top randomly
            if (f.y > height) {
                flakes[i] = {
                    x: Math.random() * width,
                    y: 0,
                    r: f.r,
                    d: f.d
                };
            }
        }
        ctx.fill();
        // Keep animating as long as the overlay is visible
        if (!overlay.classList.contains('hidden')) {
             requestAnimationFrame(drawSnow);
        }
    }

    // Start animation immediately
    drawSnow();

    // Handle Close Button Click
    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        // Optional: Remove from DOM after fade out to stop CPU usage completely
        setTimeout(() => {
             overlay.style.display = 'none';
        }, 500);
    });

    // Handle Window Resize (keeps canvas full screen)
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
});
