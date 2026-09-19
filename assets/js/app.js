/**
 * AURA VAPOR LABS - Interactive Application Logic
 * Handles filtering, search, cart drawer, age verification, quick view, checkout & toast notifications
 */

// Application State
const state = {
  cart: JSON.parse(localStorage.getItem("aura_cart") || "[]"),
  activeCategory: "all",
  activeFlavorFilter: "all",
  searchQuery: "",
  sortBy: "featured",
  promoCode: null,
  discountRate: 0,
  quickViewProduct: null,
  selectedVariant: null
};

// DOM Element References
const elements = {
  productsGrid: document.getElementById("productsGrid"),
  categoryTabs: document.querySelectorAll(".category-tab-btn"),
  flavorPillBtns: document.querySelectorAll(".flavor-pill-btn"),
  sortSelect: document.getElementById("sortSelect"),
  catalogSearchInput: document.getElementById("catalogSearchInput"),
  headerSearchInput: document.getElementById("headerSearchInput"),
  
  // Cart
  cartToggleBtn: document.getElementById("cartToggleBtn"),
  cartDrawerBackdrop: document.getElementById("cartDrawerBackdrop"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartCountBadges: document.querySelectorAll(".cart-count-badge"),
  cartSubtotalText: document.getElementById("cartSubtotalText"),
  cartDiscountRow: document.getElementById("cartDiscountRow"),
  cartDiscountText: document.getElementById("cartDiscountText"),
  cartShippingText: document.getElementById("cartShippingText"),
  cartTotalText: document.getElementById("cartTotalText"),
  freeShippingText: document.getElementById("freeShippingText"),
  freeShippingFill: document.getElementById("freeShippingFill"),
  promoCodeInput: document.getElementById("promoCodeInput"),
  applyPromoBtn: document.getElementById("applyPromoBtn"),
  btnCheckout: document.getElementById("btnCheckout"),
  
  // Modals
  ageModalBackdrop: document.getElementById("ageModalBackdrop"),
  btnAgeConfirm: document.getElementById("btnAgeConfirm"),
  btnAgeReject: document.getElementById("btnAgeReject"),
  ageRememberCheckbox: document.getElementById("ageRememberCheckbox"),
  
  quickViewModalBackdrop: document.getElementById("quickViewModalBackdrop"),
  quickViewCloseBtn: document.getElementById("quickViewCloseBtn"),
  quickViewContent: document.getElementById("quickViewContent"),

  checkoutModalBackdrop: document.getElementById("checkoutModalBackdrop"),
  checkoutCloseBtn: document.getElementById("checkoutCloseBtn"),
  checkoutForm: document.getElementById("checkoutForm"),
  
  toastContainer: document.getElementById("toastContainer"),
  accordionHeaders: document.querySelectorAll(".accordion-header"),
  newsletterForm: document.getElementById("newsletterForm"),
  announcementCode: document.getElementById("announcementCode"),
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  navLinks: document.getElementById("navLinks")
};

// Initialize Application
function initApp() {
  setupAgeVerification();
  renderProducts();
  updateCartUI();
  setupEventListeners();
}

// 1. Age Verification Gate
function setupAgeVerification() {
  const isVerified = localStorage.getItem("aura_age_verified");
  if (!isVerified && elements.ageModalBackdrop) {
    elements.ageModalBackdrop.classList.add("open");
  }

  if (elements.btnAgeConfirm) {
    elements.btnAgeConfirm.addEventListener("click", () => {
      if (elements.ageRememberCheckbox && elements.ageRememberCheckbox.checked) {
        localStorage.setItem("aura_age_verified", "true");
      }
      elements.ageModalBackdrop.classList.remove("open");
      showToast("Age verified. Welcome to Aura Vapor Labs.", "🔞");
    });
  }

  if (elements.btnAgeReject) {
    elements.btnAgeReject.addEventListener("click", () => {
      alert("You must be 21 or older to access this store.");
      window.location.href = "https://www.google.com";
    });
  }
}

// 2. Product Rendering & Filtering
function getFilteredProducts() {
  return PRODUCTS_DATA.filter(product => {
    // Category match
    const categoryMatch = state.activeCategory === "all" || product.category === state.activeCategory;
    
    // Flavor match
    const flavorMatch = state.activeFlavorFilter === "all" || 
                        product.flavorCategory === state.activeFlavorFilter ||
                        (state.activeFlavorFilter === "pods" && product.category === "pods") ||
                        (state.activeFlavorFilter === "device" && product.category === "pod-system");
    
    // Search query match
    const query = state.searchQuery.toLowerCase().trim();
    const searchMatch = !query || 
      product.name.toLowerCase().includes(query) ||
      product.tagline.toLowerCase().includes(query) ||
      product.categoryName.toLowerCase().includes(query) ||
      product.flavorNotes.some(note => note.toLowerCase().includes(query));

    return categoryMatch && flavorMatch && searchMatch;
  }).sort((a, b) => {
    if (state.sortBy === "price-low") return a.price - b.price;
    if (state.sortBy === "price-high") return b.price - a.price;
    if (state.sortBy === "rating") return b.rating - a.rating;
    return 0; // default / featured
  });
}

function renderProducts() {
  if (!elements.productsGrid) return;

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    elements.productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3 style="color: #fff; font-size: 1.3rem; margin-bottom: 8px;">No products found</h3>
        <p>Try adjusting your search query or filter selection.</p>
        <button class="btn-secondary" style="margin-top: 18px;" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  elements.productsGrid.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <span class="product-badge-pill badge-${product.badgeType}">${product.badge}</span>
      
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
        <button class="quick-view-overlay-btn" onclick="openQuickView('${product.id}')">
          <span>👁️</span> Quick View
        </button>
      </div>

      <div class="product-info-wrapper">
        <div class="product-meta-row">
          <span class="product-category-pill">${product.categoryName}</span>
          <div class="product-rating">
            <span>★</span>
            <span>${product.rating}</span>
            <span style="color: var(--text-muted); font-size: 0.72rem;">(${product.reviewsCount})</span>
          </div>
        </div>

        <h3 class="product-title">${product.name}</h3>
        <p class="product-tagline">${product.tagline}</p>

        <!-- Flavor / Taste Attribute Bars -->
        <div class="product-profile-bars">
          <div class="profile-bar-row">
            <span>Sweetness</span>
            <div class="profile-bar-track">
              <div class="profile-bar-fill fill-sweet" style="width: ${product.flavorProfile.sweetness}%;"></div>
            </div>
          </div>
          <div class="profile-bar-row">
            <span>Coolness / Ice</span>
            <div class="profile-bar-track">
              <div class="profile-bar-fill fill-ice" style="width: ${product.flavorProfile.ice}%;"></div>
            </div>
          </div>
          <div class="profile-bar-row">
            <span>Throat Hit</span>
            <div class="profile-bar-track">
              <div class="profile-bar-fill fill-throat" style="width: ${product.flavorProfile.throatHit}%;"></div>
            </div>
          </div>
        </div>

        <!-- Flavor Notes -->
        <div class="flavor-notes-row">
          ${product.flavorNotes.map(note => `<span class="flavor-note-chip">${note}</span>`).join("")}
        </div>

        <div class="product-footer-row">
          <div class="product-price-box">
            <span class="price-current">$${product.price.toFixed(2)}</span>
            <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
          </div>
          <button class="btn-add-cart-card" onclick="addToCart('${product.id}')">
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function resetFilters() {
  state.activeCategory = "all";
  state.activeFlavorFilter = "all";
  state.searchQuery = "";
  if (elements.catalogSearchInput) elements.catalogSearchInput.value = "";
  if (elements.headerSearchInput) elements.headerSearchInput.value = "";

  elements.categoryTabs.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === "all");
  });

  elements.flavorPillBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.flavor === "all");
  });

  renderProducts();
}

// 3. Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  state.quickViewProduct = product;
  state.selectedVariant = product.nicotineStrength[0];

  elements.quickViewContent.innerHTML = `
    <div class="quick-view-card">
      <div class="qv-image-side">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="qv-content-side">
        <div class="product-meta-row" style="margin-bottom: 4px;">
          <span class="product-category-pill">${product.categoryName}</span>
          <span style="color: var(--accent-green); font-size: 0.8rem; font-weight: 700;">● In Stock</span>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; margin-bottom: 8px;">${product.name}</h2>
        <div class="product-price-box" style="margin-bottom: 16px;">
          <span class="price-current" style="font-size: 1.6rem;">$${product.price.toFixed(2)}</span>
          <span class="price-original" style="font-size: 1.1rem;">$${product.originalPrice.toFixed(2)}</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 18px;">${product.description}</p>

        <div style="font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 6px;">Select Nicotine Strength / Variant:</div>
        <div class="strength-options-row">
          ${product.nicotineStrength.map((strength, index) => `
            <button class="strength-pill-btn ${index === 0 ? 'active' : ''}" onclick="selectVariant('${strength}', this)">
              ${strength}
            </button>
          `).join("")}
        </div>

        <table class="qv-specs-table">
          <tr>
            <td class="label">Puff Count:</td>
            <td class="val">${product.puffCount}</td>
          </tr>
          <tr>
            <td class="label">Battery / Power:</td>
            <td class="val">${product.battery}</td>
          </tr>
          <tr>
            <td class="label">Capacity:</td>
            <td class="val">${product.eLiquidCapacity}</td>
          </tr>
          <tr>
            <td class="label">Coil Specification:</td>
            <td class="val">${product.coil}</td>
          </tr>
        </table>

        <div style="margin-top: 14px; display: flex; gap: 14px;">
          <button class="btn-primary" style="flex: 1;" onclick="addQuickViewToCart()">
            Add to Cart - $${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  `;

  elements.quickViewModalBackdrop.classList.add("open");
}

function selectVariant(variant, btn) {
  state.selectedVariant = variant;
  const pills = elements.quickViewContent.querySelectorAll(".strength-pill-btn");
  pills.forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
}

function addQuickViewToCart() {
  if (!state.quickViewProduct) return;
  addToCart(state.quickViewProduct.id, state.selectedVariant);
  elements.quickViewModalBackdrop.classList.remove("open");
}

// 4. Cart Management & Drawer
function addToCart(productId, variant = null) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const itemVariant = variant || product.nicotineStrength[0];
  const existingIndex = state.cart.findIndex(
    item => item.id === productId && item.variant === itemVariant
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: itemVariant,
      category: product.categoryName,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to cart!`, "🛒");
  openCartDrawer();
}

function updateCartQuantity(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function removeCartItem(index) {
  if (!state.cart[index]) return;
  const name = state.cart[index].name;
  state.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast(`Removed "${name}" from cart`, "🗑️");
}

function saveCart() {
  localStorage.setItem("aura_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  // Total count
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCountBadges.forEach(badge => {
    badge.textContent = totalCount;
  });

  // Render items list
  if (state.cart.length === 0) {
    elements.cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">💨</div>
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 6px;">Your cart is empty</h4>
        <p style="font-size: 0.88rem;">Explore our premium vapes, pods, and flavors to get started!</p>
      </div>
    `;
    elements.cartSubtotalText.textContent = "$0.00";
    elements.cartDiscountRow.style.display = "none";
    elements.cartShippingText.textContent = "$0.00";
    elements.cartTotalText.textContent = "$0.00";
    elements.freeShippingText.innerHTML = `Add <strong>$50.00</strong> more for FREE shipping!`;
    elements.freeShippingFill.style.width = "0%";
    return;
  }

  elements.cartItemsList.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h5 class="cart-item-title">${item.name}</h5>
        <span class="cart-item-variant">${item.variant}</span>
        <div class="cart-item-controls">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeCartItem(${index})" style="color: var(--text-muted); font-size: 0.85rem;" title="Remove">✕</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  // Calculate Totals
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * state.discountRate;
  const isFreeShipping = subtotal >= 50;
  const shipping = isFreeShipping || subtotal === 0 ? 0 : 5.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  elements.cartSubtotalText.textContent = `$${subtotal.toFixed(2)}`;
  
  if (state.discountRate > 0) {
    elements.cartDiscountRow.style.display = "flex";
    elements.cartDiscountText.textContent = `-$${discountAmount.toFixed(2)} (${state.discountRate * 100}%)`;
  } else {
    elements.cartDiscountRow.style.display = "none";
  }

  elements.cartShippingText.textContent = isFreeShipping ? "FREE" : `$${shipping.toFixed(2)}`;
  elements.cartTotalText.textContent = `$${total.toFixed(2)}`;

  // Free shipping tracker
  const remaining = Math.max(0, 50 - subtotal);
  if (remaining === 0) {
    elements.freeShippingText.innerHTML = `<span style="color: var(--accent-green); font-weight: 700;">🎉 You unlocked FREE Express Shipping!</span>`;
    elements.freeShippingFill.style.width = "100%";
  } else {
    elements.freeShippingText.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> more for FREE shipping!`;
    elements.freeShippingFill.style.width = `${Math.min(100, (subtotal / 50) * 100)}%`;
  }
}

function openCartDrawer() {
  elements.cartDrawerBackdrop.classList.add("open");
}

function closeCartDrawer() {
  elements.cartDrawerBackdrop.classList.remove("open");
}

// 5. Checkout Modal
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Please add items to your cart first!", "⚠️");
    return;
  }
  closeCartDrawer();
  elements.checkoutModalBackdrop.classList.add("open");
}

function closeCheckoutModal() {
  elements.checkoutModalBackdrop.classList.remove("open");
}

// 6. Toast Notification System
function showToast(message, icon = "✨") {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 7. Event Listeners Setup
function setupEventListeners() {
  // Category tabs
  elements.categoryTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.categoryTabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Flavor pills
  elements.flavorPillBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.flavorPillBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeFlavorFilter = btn.dataset.flavor;
      renderProducts();
    });
  });

  // Sort dropdown
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Search inputs
  const handleSearch = (val) => {
    state.searchQuery = val;
    if (elements.catalogSearchInput) elements.catalogSearchInput.value = val;
    if (elements.headerSearchInput) elements.headerSearchInput.value = val;
    renderProducts();
  };

  if (elements.catalogSearchInput) {
    elements.catalogSearchInput.addEventListener("input", (e) => handleSearch(e.target.value));
  }
  if (elements.headerSearchInput) {
    elements.headerSearchInput.addEventListener("input", (e) => handleSearch(e.target.value));
  }

  // Mobile Menu Toggle
  if (elements.mobileMenuBtn && elements.navLinks) {
    elements.mobileMenuBtn.addEventListener("click", () => {
      const isOpen = elements.navLinks.classList.toggle("open");
      elements.mobileMenuBtn.classList.toggle("open", isOpen);
      elements.mobileMenuBtn.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Auto close mobile menu when clicking any navigation link
    elements.navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        elements.navLinks.classList.remove("open");
        elements.mobileMenuBtn.classList.remove("open");
        elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Cart Drawer open/close
  if (elements.cartToggleBtn) {
    elements.cartToggleBtn.addEventListener("click", openCartDrawer);
  }
  if (elements.cartCloseBtn) {
    elements.cartCloseBtn.addEventListener("click", closeCartDrawer);
  }
  if (elements.cartDrawerBackdrop) {
    elements.cartDrawerBackdrop.addEventListener("click", (e) => {
      if (e.target === elements.cartDrawerBackdrop) closeCartDrawer();
    });
  }

  // Quick View close
  if (elements.quickViewCloseBtn) {
    elements.quickViewCloseBtn.addEventListener("click", () => {
      elements.quickViewModalBackdrop.classList.remove("open");
    });
  }
  if (elements.quickViewModalBackdrop) {
    elements.quickViewModalBackdrop.addEventListener("click", (e) => {
      if (e.target === elements.quickViewModalBackdrop) {
        elements.quickViewModalBackdrop.classList.remove("open");
      }
    });
  }

  // Checkout modal
  if (elements.btnCheckout) {
    elements.btnCheckout.addEventListener("click", openCheckoutModal);
  }
  if (elements.checkoutCloseBtn) {
    elements.checkoutCloseBtn.addEventListener("click", closeCheckoutModal);
  }
  if (elements.checkoutModalBackdrop) {
    elements.checkoutModalBackdrop.addEventListener("click", (e) => {
      if (e.target === elements.checkoutModalBackdrop) closeCheckoutModal();
    });
  }

  if (elements.checkoutForm) {
    elements.checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = elements.checkoutForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Processing Demo Order...";

      setTimeout(() => {
        elements.checkoutModalBackdrop.classList.remove("open");
        state.cart = [];
        saveCart();
        updateCartUI();
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Complete Demo Order";
        showToast("🎉 Demo Order #AURA-" + Math.floor(100000 + Math.random() * 900000) + " Placed Successfully!", "📦");
      }, 1200);
    });
  }

  // Promo Code
  if (elements.applyPromoBtn) {
    elements.applyPromoBtn.addEventListener("click", () => {
      const code = elements.promoCodeInput.value.trim().toUpperCase();
      if (code === "AURA20") {
        state.promoCode = code;
        state.discountRate = 0.20; // 20% off
        updateCartUI();
        showToast("Promo code AURA20 applied! 20% discount activated.", "🏷️");
      } else if (code) {
        showToast("Invalid promo code. Try 'AURA20'", "❌");
      }
    });
  }

  // Copy announcement promo code
  if (elements.announcementCode) {
    elements.announcementCode.addEventListener("click", () => {
      navigator.clipboard.writeText("AURA20");
      showToast("Coupon code 'AURA20' copied to clipboard!", "📋");
      if (elements.promoCodeInput) elements.promoCodeInput.value = "AURA20";
    });
  }

  // FAQ Accordions
  elements.accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active");
    });
  });

  // Newsletter Form
  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = elements.newsletterForm.querySelector("input");
      if (input.value) {
        showToast("Subscribed! Your $10 VIP coupon code: VIP10", "🎁");
        input.value = "";
      }
    });
  }
}

// Global functions for inline HTML calls
window.openQuickView = openQuickView;
window.addToCart = addToCart;
window.addQuickViewToCart = addQuickViewToCart;
window.selectVariant = selectVariant;
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;
window.resetFilters = resetFilters;

// Boot application
document.addEventListener("DOMContentLoaded", initApp);
