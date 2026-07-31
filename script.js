document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL REVEAL OBSERVER
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Keeps layout solid and stable once shown
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  revealElements.forEach(el => scrollObserver.observe(el));


  // 2. INTERACTIVE CART COUNTER
  let cartCount = 0;
  const cartCountDisplay = document.getElementById('cartCount');
  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      cartCount++;
      cartCountDisplay.textContent = cartCount;

      const cartPill = document.getElementById('cartBtn');
      cartPill.style.transform = 'scale(1.08)';
      setTimeout(() => cartPill.style.transform = 'scale(1)', 180);

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


  // 3. NAVBAR SCROLL PADDING RESIZE
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '0.3rem 0';
      navbar.style.background = 'rgba(8, 8, 10, 0.95)';
    } else {
      navbar.style.padding = '0';
      navbar.style.background = 'rgba(8, 8, 10, 0.88)';
    }
  });

});
