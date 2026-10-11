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
  const flipToggleText = document.getElementById('flipToggleText');
  const avatarTagText = document.getElementById('avatarTagText');
  const cardContainer = document.getElementById('avatarCardContainer');
  const heroAvatar = document.getElementById('heroAvatar');
  const btnStyleBackdrop = document.getElementById('btnStyleBackdrop');
  const btnStyleDark = document.getElementById('btnStyleDark');
  const face3d = avatarCard ? avatarCard.querySelector('.face-3d') : null;
  const faceReal = avatarCard ? avatarCard.querySelector('.face-real') : null;

  function updateCardFlip(shouldFlip) {
    if (!avatarCard) return;
    if (shouldFlip) {
      avatarCard.classList.add('flipped');
      avatarCard.style.transform = 'rotateY(180deg)';
      if (face3d) {
        face3d.style.opacity = '0';
        face3d.style.visibility = 'hidden';
        face3d.style.pointerEvents = 'none';
      }
      if (faceReal) {
        faceReal.style.opacity = '1';
        faceReal.style.visibility = 'visible';
        faceReal.style.pointerEvents = 'auto';
      }
      if (flipToggleText) {
        flipToggleText.textContent = '✨ Switch to 3D Avatar';
      }
      if (avatarTagText) {
        avatarTagText.textContent = 'Reality';
      }
    } else {
      avatarCard.classList.remove('flipped');
      avatarCard.style.transform = 'rotateY(0deg)';
      if (face3d) {
        face3d.style.opacity = '1';
        face3d.style.visibility = 'visible';
        face3d.style.pointerEvents = 'auto';
      }
      if (faceReal) {
        faceReal.style.opacity = '0';
        faceReal.style.visibility = 'hidden';
        faceReal.style.pointerEvents = 'none';
      }
      if (flipToggleText) {
        flipToggleText.textContent = '📸 Switch to Real Photo';
      }
      if (avatarTagText) {
        avatarTagText.textContent = '3D Avatar';
      }
    }
  }

  function toggleFlip() {
    if (!avatarCard) return;
    const isCurrentlyFlipped = avatarCard.classList.contains('flipped');
    updateCardFlip(!isCurrentlyFlipped);
  }

  if (avatarCard) {
    avatarCard.addEventListener('click', (e) => {
      toggleFlip();
    });
  }

  if (flipToggleBtn) {
    flipToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFlip();
    });
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
  // --- 6. LIGHT / DARK MODE TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Load saved preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      if (themeIcon) themeIcon.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    });
  }

  // --- 7. 3D TILT EFFECT ON PROJECT CARDS ---
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Don't tilt card if user is actively interacting with the 3D canvas
      if (e.target.closest('#motrilog3dContainer')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (-y / rect.height) * 10;
      const rotY = (x / rect.width) * 10;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });

  // --- 8. MOTRILOG VIEW MODE SWITCHER ---
  const tab3dModel = document.getElementById('tab3dModel');
  const tab3dHologram = document.getElementById('tab3dHologram');
  const container3d = document.getElementById('motrilog3dContainer');
  const staticRender = document.getElementById('motrilogStaticRender');

  if (tab3dModel && tab3dHologram && container3d && staticRender) {
    tab3dModel.addEventListener('click', (e) => {
      e.stopPropagation();
      tab3dModel.classList.add('active');
      tab3dHologram.classList.remove('active');
      container3d.classList.add('active');
      staticRender.classList.remove('active');
      window.dispatchEvent(new Event('resize'));
    });

    tab3dHologram.addEventListener('click', (e) => {
      e.stopPropagation();
      tab3dHologram.classList.add('active');
      tab3dModel.classList.remove('active');
      staticRender.classList.add('active');
      container3d.classList.remove('active');
    });
  }
});

