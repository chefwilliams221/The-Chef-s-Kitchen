document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Scroll Reveal Animations
  // ==========================================
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


  // ==========================================
  // 2. Shopping Bag & Checkout State Management
  // ==========================================
  let cart = []; // Stores { id, name, price, qty }

  const TAX_RATE = 0.085; // 8.5% sales tax

  // Elements
  const cartBtn = document.getElementById('cartBtn');
  const cartCountDisplay = document.getElementById('cartCount');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const closeCartBtn = document.getElementById('closeCartBtn');
  
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartActiveContent = document.getElementById('cartActiveContent');
  const paymentSuccessState = document.getElementById('paymentSuccessState');
  const cartItemsContainer = document.getElementById('cartItemsContainer');

  const subtotalAmount = document.getElementById('subtotalAmount');
  const taxAmount = document.getElementById('taxAmount');
  const totalAmount = document.getElementById('totalAmount');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  const orderRefNum = document.getElementById('orderRefNum');

  // Open & Close Drawer Handlers
  const openCart = () => {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
  };

  const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
  };

  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  // Esc Key to Close Drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer.classList.contains('open')) {
      closeCart();
    }
  });


  // ==========================================
  // 3. Add to Bag Logic
  // ==========================================
  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const itemName = e.target.getAttribute('data-item');
      const itemPrice = parseFloat(e.target.getAttribute('data-price'));

      addToCart(itemName, itemPrice);

      // Button Feedback UI
      const originalText = e.target.textContent;
      e.target.textContent = '✓ ACQUIRED';
      e.target.style.backgroundColor = 'var(--accent-gold)';
      e.target.style.color = 'var(--bg-dark)';

      // Animate Cart Pill
      cartBtn.style.transform = 'scale(1.1)';
      setTimeout(() => cartBtn.style.transform = 'scale(1)', 180);

      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = 'var(--accent-gold)';
      }, 1200);
    });
  });

  const addToCart = (name, price) => {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: Date.now().toString(),
        name: name,
        price: price,
        qty: 1
      });
    }

    // Reset Success View if user adds item after purchase
    if (!paymentSuccessState.classList.contains('hidden')) {
      paymentSuccessState.classList.add('hidden');
    }

    renderCart();
  };


  // ==========================================
  // 4. Render Cart & Calculate Cost Outline
  // ==========================================
  const renderCart = () => {
    // 1. Update Badge Count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountDisplay.textContent = totalQty;

    // 2. Toggle Empty / Active States
    if (cart.length === 0) {
      cartEmptyState.classList.remove('hidden');
      cartActiveContent.classList.add('hidden');
      return;
    } else {
      cartEmptyState.classList.add('hidden');
      cartActiveContent.classList.remove('hidden');
    }

    // 3. Render Items
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn minus-btn" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
          <button class="remove-item-btn" data-id="${item.id}" title="Remove Item">&times;</button>
        </div>
      `;
      cartItemsContainer.appendChild(row);
    });

    // 4. Quantity & Remove Button Event Listeners
    document.querySelectorAll('.minus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        updateQuantity(id, -1);
      });
    });

    document.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        updateQuantity(id, 1);
      });
    });

    document.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        removeItem(id);
      });
    });

    // 5. Calculate Cost Outline
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
    renderCart();
  };

  const removeItem = (id) => {
    cart = cart.filter(i => i.id !== id);
    renderCart();
  };


  // ==========================================
  // 5. Payment & Checkout Action
  // ==========================================
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    // Simulate Processing State
    const payBtnText = document.getElementById('payBtnText');
    payBtnText.textContent = 'Processing...';
    checkoutBtn.style.opacity = '0.7';
    checkoutBtn.disabled = true;

    setTimeout(() => {
      // Generate Random Order Ref
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      orderRefNum.textContent = randomOrderNum;

      // Clear Bag Data State & Reset UI
      cart = [];
      cartCountDisplay.textContent = '0';

      // Hide Active View, Show Payment Success View
      cartActiveContent.classList.add('hidden');
      paymentSuccessState.classList.remove('hidden');

      // Reset Button State
      payBtnText.textContent = 'Complete Purchase →';
      checkoutBtn.style.opacity = '1';
      checkoutBtn.disabled = false;
    }, 900);
  });

  // Continue Browsing Button
  continueShoppingBtn.addEventListener('click', () => {
    closeCart();
    setTimeout(() => {
      paymentSuccessState.classList.add('hidden');
      cartEmptyState.classList.remove('hidden');
    }, 400);
  });

});
