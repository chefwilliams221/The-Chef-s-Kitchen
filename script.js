document.addEventListener('DOMContentLoaded', () => {

  // 1. ALTERNATING POP-UP SCROLL ANIMATION (Intersection Observer)
  // This watches for elements sliding in from alternating left and right positions
  const observerOptions = {
    root: null,
    threshold: 0.2 // Triggers when 20% of the element is visible in viewport
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // When a card enters the screen, add the .visible class to animate it in
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Target all elements set to reveal from left, right, or bottom
  const animatedElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  animatedElements.forEach(element => scrollObserver.observe(element));


  // 2. INTERACTIVE CART COUNTER
  let cartCount = 0;
  const cartCountDisplay = document.getElementById('cartCount');
  const acquireBtns = document.querySelectorAll('.acquire-btn');

  acquireBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      cartCount++;
      cartCountDisplay.textContent = cartCount;

      // Provide sleek text feedback on acquisition
      const originalText = e.target.textContent;
      e.target.textContent = 'ADDED TO ORDER';
      e.target.style.backgroundColor = '#333333';
      e.target.style.color = '#ffffff';

      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.color = '#000000';
      }, 1200);
    });
  });
});
