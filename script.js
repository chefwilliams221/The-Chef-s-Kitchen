document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL REVEAL ANIMATION (Intersection Observer API)
  // This detects when elements enter the user's screen as they scroll down
  const observerOptions = {
    root: null,
    threshold: 0.15 // Section reveals when 15% of it becomes visible
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If section scrolls into view, add the .visible class
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Attach the observer to all elements with class 'scroll-reveal'
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(element => revealOnScroll.observe(element));


  // 2. NAVBAR BACKGROUND FADE ON SCROLL
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // Adds a darker, solid background to navbar once scrolled past 50px
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // 3. INTERACTIVE CART COUNTER
  let cartCount = 0;
  const cartCountDisplay = document.getElementById('cartCount');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

  addToCartBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      cartCount++;
      cartCountDisplay.textContent = cartCount;

      // Temporary visual feedback on button press
      const productName = e.target.getAttribute('data-product');
      const originalText = e.target.textContent;

      e.target.textContent = '✓ Added to Order!';
      e.target.style.backgroundColor = '#d4af37';
      e.target.style.color = '#0b0b0b';

      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#fff';
      }, 1500);
    });
  });
});
