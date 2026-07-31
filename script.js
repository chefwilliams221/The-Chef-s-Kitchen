document.addEventListener('DOMContentLoaded', () => {

  // 1. BIDIRECTIONAL SCROLL REVEAL (Fades In & Fades Out)
  // Observer settings: rootMargin adds a cushion so animations feel natural
  const observerOptions = {
    root: null,
    threshold: 0.15 // Triggers when 15% of the element enters/leaves the viewport
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // IF element enters the viewport -> Add .visible to slide/fade it IN
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } 
      // ELSE element leaves the viewport (scrolling up or down) -> Remove .visible to slide/fade it OUT
      else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Attach observer to all reveal elements
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

      // Pulse animation on the cart pill
      const cartPill = document.getElementById('cartBtn');
      cartPill.style.transform = 'scale(1.1)';
      setTimeout(() => cartPill.style.transform = 'scale(1)', 200);

      // Temporary button state update
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
    if (window.scrollY > 80) {
      navbar.style.padding = '0.8rem 2rem';
      navbar.style.background = 'rgba(7, 7, 9, 0.92)';
    } else {
      navbar.style.padding = '1.2rem 2rem';
      navbar.style.background = 'rgba(7, 7, 9, 0.75)';
    }
  });

});
