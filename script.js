document.addEventListener('DOMContentLoaded', () => {

  // 1. Intersection Observer for Scroll Reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-up');
  revealElements.forEach(el => scrollObserver.observe(el));


  // 2. Interactive Cart Counter
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
      }, 1400);
    });
  });

});
