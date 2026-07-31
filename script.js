document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL OBSERVER FOR ALTERNATING REVEALS
  // Uses browser IntersectionObserver API to detect when cards scroll into view
  const observerOptions = {
    root: null,
    threshold: 0.15 // Triggers animation when 15% of the element is in view
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add 'visible' class when card enters viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Target all elements set to animate from left, right, or up
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  revealElements.forEach(el => scrollObserver.observe(el));


  // 2. INTERACTIVE SHOPPING BAG COUNTER
  let cartCount = 0;
  const cartCountDisplay = document.getElementById('cartCount');
  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      cartCount++;
      cartCountDisplay.textContent = cartCount;

      // Subtle pulse animation on cart icon when item added
      const cartPill = document.getElementById('cartBtn');
      cartPill.style.transform = 'scale(1.1)';
      setTimeout(() => cartPill.style.transform = 'scale(1)', 200);

      // Temporary button state change feedback
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


  // 3. NAVBAR SCROLL INTENSITY SHIFT
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.padding = '0.8rem 2rem';
      navbar.style.background = 'rgba(7, 7, 9, 0.92)';
    } else {
      navbar.style.padding = '1.2rem 2rem';
      navbar.style.background = 'rgba(7, 7, 9, 0.75)';
    }
  });

});
