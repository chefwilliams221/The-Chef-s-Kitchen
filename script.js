document.addEventListener('DOMContentLoaded', () => {

  // 1. BULLETPROOF SCROLL REVEAL OBSERVER
  // Smoothly reveals elements once as they enter the screen so content remains readable and stable
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Triggers slightly before element enters view for a seamless feel
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, unobserve so layout remains stable while scrolling back up
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  revealElements.forEach(el => scrollObserver.observe(el));


  // 2. SHOPPING BAG COUNTER & FEEDBACK
  let cartCount = 0;
  const cartCountDisplay = document.getElementById('cartCount');
  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      cartCount++;
      cartCountDisplay.textContent = cartCount;

      // Pulse feedback
      const cartPill = document.getElementById('cartBtn');
      cartPill.style.transform = 'scale(1.08)';
      setTimeout(() => cartPill.style.transform = 'scale(1)', 180);

      // Temporary button state feedback
      const originalText = e.target.textContent;
      e.target.textContent = '✓ ACQUIRED';
      e.target.style.backgroundColor = 'var(--accent-gold)';
      e.target.style.color = 'var(--bg-dark)';

      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = 'var(--accent-gold)';
      }, 1200);
    });
  });


  // 3. NAVBAR SCROLL RESIZING
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '0.7rem 2rem';
      navbar.style.background = 'rgba(8, 8, 10, 0.95)';
    } else {
      navbar.style.padding = '1.1rem 2rem';
      navbar.style.background = 'rgba(8, 8, 10, 0.85)';
    }
  });

});
