/* ==========================================================================
   ✨ MOHAMMED AHMED PORTFOLIO - JAVASCRIPT ✨
   
   Friendly, easy-to-understand interactivity:
   1. Mobile Navigation Menu Toggle
   2. Copy Email to Clipboard with Glass Toast notification
   3. Contact Form Submission simulation
   4. Smooth Scrolling & Active Link Highlighting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. MOBILE MENU TOGGLE ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (mobileToggle) mobileToggle.innerHTML = '☰';
      });
    });
  }

  // --- 2. COPY EMAIL TO CLIPBOARD WITH TOAST ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotice = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (!toastNotice) return;
    if (toastText) toastText.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'abcb1240009m@gmail.com';
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('📋 Email copied: ' + email);
        })
        .catch(() => {
          showToast('✉️ ' + email);
        });
    });
  }

  // --- 3. CONTACT FORM INTERACTION ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const senderName = nameInput ? nameInput.value.trim() : 'Friend';

      showToast(`✨ Thanks ${senderName || 'there'}! Your message was sent.`);
      contactForm.reset();
    });
  }

  // --- 4. HIGHLIGHT NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  });

  // --- 5. 3D & REALITY INTERACTIVE MOTION CARD ---
  const avatarCard = document.getElementById('avatar3dCard');
  const flipToggleBtn = document.getElementById('flipToggleBtn');
  const avatarTagText = document.getElementById('avatarTagText');
  const cardContainer = document.getElementById('avatarCardContainer');

  function toggleFlip() {
    if (!avatarCard) return;
    avatarCard.classList.toggle('flipped');
    const isFlipped = avatarCard.classList.contains('flipped');
    if (avatarTagText) {
      avatarTagText.textContent = isFlipped ? 'Reality' : '3D Avatar';
    }
    if (flipToggleBtn) {
      flipToggleBtn.innerHTML = isFlipped ? '✨ Switch to 3D Avatar' : '📸 Switch to Real Photo';
    }
  }

  if (avatarCard) {
    avatarCard.addEventListener('click', toggleFlip);
  }
  if (flipToggleBtn) {
    flipToggleBtn.addEventListener('click', toggleFlip);
  }

  // 3D Parallax Tilt Effect on Mouse Move
  if (cardContainer && avatarCard) {
    cardContainer.addEventListener('mousemove', (e) => {
      const rect = cardContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 16;
      const rotateY = (x / rect.width) * 16;
      const isFlipped = avatarCard.classList.contains('flipped');
      const baseY = isFlipped ? 180 : 0;
      avatarCard.style.transform = `rotateX(${rotateX}deg) rotateY(${baseY + rotateY}deg)`;
    });

    cardContainer.addEventListener('mouseleave', () => {
      const isFlipped = avatarCard.classList.contains('flipped');
      avatarCard.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    });
  }
});
