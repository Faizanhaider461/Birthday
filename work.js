const poetryAudio = new Audio("birthday_poetry.mp3");


let birthdayWasPausedManually = false;
let birthdayPausedAt = 0;
let lastPausedMusic = null; // 'birthday' | 'poetry' | 'reveal'





function typeWriterText(text, elementId) {
  let i = 0;
  const speed = 40;
  const element = document.getElementById(elementId);
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}




function openGift() {
  document.getElementById('gift-portal').classList.remove('hidden');
}

function revealBox(type) {
  document.getElementById('gift-portal').classList.add('hidden');
  setTimeout(() => {
    Swal.fire({
      title: `🎉 ${type} Unlocked!`,
      html: `
        <img src="https://media.tenor.com/Q0Pk1y6d6PQAAAAC/magic-sparkle.gif" width="180" /><br>
        <div class="typewriter">But Faizan...<br><br>Party do gy to gift milega 😏</div>
      `,
      background: "#111",
      color: "#fff",
      confirmButtonText: "😂 OK BOSS",
      backdrop: `
        rgba(0,0,0,0.8)
        url("https://media.tenor.com/3zDkFBGRgXYAAAAC/confetti-celebrate.gif")
        center no-repeat
      `
    });
  }, 500);
}


function launchFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 4 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 6 + 2,
      alpha: 1
    });
  }

  let animationFrame;
  function drawFireworks() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      const dx = Math.cos(p.angle) * p.speed;
      const dy = Math.sin(p.angle) * p.speed;
      p.x += dx;
      p.y += dy;
      p.alpha -= 0.01;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    if (particles.some(p => p.alpha > 0)) {
      animationFrame = requestAnimationFrame(drawFireworks);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  drawFireworks();

  // 🎉 Show Center Message
  const msg = document.getElementById("birthday-message");
  msg.classList.remove("hidden-message");

  // Hide after 4 seconds
  setTimeout(() => {
    msg.classList.add("hidden-message");
  }, 1700);
}

function showConfetti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 250);
}

function startCountdown() {
  const targetDate = new Date("June 25, 2026 00:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownEl.innerHTML = "🎉 It's your birthday! 🎉";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `⏳ <b>${days}</b>d <b>${hours}</b>h <b>${minutes}</b>m <b>${seconds}</b>s left till Faizan’s next birthday!`;
  }, 1000);
}
startCountdown();

function showImage(src) {
  Swal.fire({
    imageUrl: src,
    imageAlt: 'Faizan Gallery Image',
    showConfirmButton: false,
    background: '#111'
  });
}

particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#ff007f" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: { enable: true, speed: 2 }
  }
});

function playSoftMusic() {
  const softAudio = new Audio("https://www.bensound.com/bensound-music/bensound-sunny.mp3");
  softAudio.volume = 0.4;
  softAudio.play();
}






const birthdaySong = document.getElementById("autoMusic"); // ✅ not "birthdaySong"
const revealMusic = document.getElementById("revealMusic");


// 📌 Global tracker
let lastMusic = 'auto';  // or 'poetry' or 'reveal'

// 🔁 Universal pause for all
function pauseAllMusic() {
  if (!birthdaySong.paused) {
    birthdayPausedAt = birthdaySong.currentTime;
    birthdayWasPausedManually = true;
    lastPausedMusic = 'birthday';
    birthdaySong.pause();
  }

  if (!poetryAudio.paused) {
    poetryAudio.pause();
    poetryAudio.currentTime = 0;
    lastPausedMusic = 'poetry';
  }

  if (!revealMusic.paused) {
    revealMusic.pause();
    revealMusic.currentTime = 0;
    lastPausedMusic = 'reveal';
  }
}





let autoStarted = false;

window.addEventListener('DOMContentLoaded', () => {
  birthdaySong.volume = 0.5;
  birthdaySong.play().catch(() => {
    console.warn("Autoplay blocked by browser.");
  });
});











// ▶️ Play Music Button (Poetry)
let isPoetryPlaying = false;

function togglePoetry() {
  const poetryBtn = document.getElementById("playPoetryBtn");

  if (!isPoetryPlaying) {
    // Pause birthday song and save state
    if (!birthdaySong.paused) {
      birthdayPausedAt = birthdaySong.currentTime;
      birthdaySong.pause();
      birthdayWasPausedManually = true;
    }

    pauseAllMusic(); // pause others (just in case)
    poetryAudio.currentTime = 0;
    poetryAudio.play().then(() => {
      isPoetryPlaying = true;
      poetryBtn.innerText = "Stop Poetry⏹️";
    });

  } else {
    // Stop poetry
    poetryAudio.pause();
    poetryAudio.currentTime = 0;
    isPoetryPlaying = false;
    poetryBtn.innerText = "Start Poetry📯";

    // Resume birthday song if it was paused manually
    if (birthdayWasPausedManually) {
      birthdaySong.currentTime = birthdayPausedAt;
      birthdaySong.play();
      birthdayWasPausedManually = false;
    }
  }
}









// ▶️ Reveal Message
function revealWish() {
  pauseAllMusic();

  revealMusic.currentTime = 0;
  revealMusic.play();
  lastMusic = 'reveal';

  showConfetti();

  Swal.fire({
    title: '💌 A Message Just for You',
    html: `<div id="typewriterWish"></div>`,
    background: '#000',
    color: '#fff',
    confirmButtonText: '❤️ Thank You',
    confirmButtonColor: '#ff007f',
    didOpen: () => {
      typeWriterText(`
✨ Today is not just a date… 
It’s a reminder of the joy you bring to everyone’s life.  
Your kindness, your smile, your strength — they light up the world. 🌟

On this special day, I hope your heart is full of love,  
your mind is full of dreams,  
and your soul is full of peace. 💖

May this year be the chapter where everything you’ve wished for begins to unfold.  
Happy Birthday, King. You truly deserve the best. 🎂🎁🎈
`, "typewriterWish");

    },
    willClose: () => {
      revealMusic.pause();
      revealMusic.currentTime = 0;

      if (birthdayWasPausedManually) {
        birthdaySong.currentTime = birthdayPausedAt;
        birthdaySong.play();
        birthdayWasPausedManually = false;
        lastPausedMusic = null;
      }
    }
  });
}




// Typing Effect
function typeWriterText(text, elementId) {
  let i = 0;
  const speed = 40;
  const element = document.getElementById(elementId);
  element.innerHTML = ""; // clear before start
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Put this at bottom in your script
function startBirthdaySong(e) {
  const target = e.target;

  // Prevent if clicked on any button that starts other audio
  const blocked = target.closest("button");
  const blockedIds = ["playPoetryBtn", "revealBtn"];

  if (blocked && blockedIds.includes(blocked.id)) return;

  const birthdaySong = document.getElementById("autoMusic");
  birthdaySong.volume = 0.5;
  birthdaySong.play().catch(() => {
    console.warn("Autoplay blocked, wait for interaction.");
  });

  // Remove listener after first success
  document.removeEventListener("click", startBirthdaySong);
  document.removeEventListener("touchstart", startBirthdaySong);
}
document.addEventListener("click", startBirthdaySong);
document.addEventListener("touchstart", startBirthdaySong);


poetryAudio.addEventListener("ended", () => {
  if (
    lastPausedMusic === 'birthday' &&
    birthdayWasPausedManually
  ) {
    birthdaySong.currentTime = birthdayPausedAt;
    birthdaySong.play();
    birthdayWasPausedManually = false;
    lastPausedMusic = null;
  }
});



const galleryImages = document.querySelectorAll('.gallery img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.3
});

galleryImages.forEach(img => {
  observer.observe(img);
});


function animateGallery() {
  const images = document.querySelectorAll('#animatedGallery img');
  let index = 0;

  function showNext() {
    // Remove previous
    images.forEach((img, i) => {
      img.classList.remove('active', 'fade-out');
      if (i < index) img.classList.add('fade-out');
    });

    if (index < images.length) {
      images[index].classList.add('active');
      setTimeout(() => {
        index++;
        showNext();
      }, 1800); // Delay before next zoom
    }
  }

  showNext();
}

// Trigger it when gallery enters viewport:
const galleryObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateGallery();
      observer.disconnect(); // Run only once
    }
  });
}, { threshold: 0.3 });

galleryObserver.observe(document.getElementById("animatedGallery"));


function loopGalleryAnimation() {
  const images = document.querySelectorAll('#animatedGallery img');
  let index = 0;

  function animateNext() {
    // Remove "active" from all
    images.forEach(img => img.classList.remove('active'));

    // Add "active" to current
    images[index].classList.add('active');

    // Store current index for closure
    const current = index;

    // Schedule remove after animation duration
    setTimeout(() => {
      images[current].classList.remove('active');
      
      // Move to next only after current finishes
      index = (index + 1) % images.length;
      setTimeout(animateNext, 100); // Small gap between animations
    }, 1000); // Match your CSS animation duration
  }

  animateNext();
}

window.addEventListener('load', loopGalleryAnimation);
