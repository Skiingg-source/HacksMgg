const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartBuyBtn = document.getElementById("cartBuyBtn");

const addCartButtons = document.querySelectorAll(".add-cart");
const revealItems = document.querySelectorAll(".reveal");

// CAMBIA ESTE NUMERO POR TU WHATSAPP
const phoneNumber = "51999999999";

let cart = [];

// Navbar scroll
window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Menu mobile
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    if (mobileMenu) mobileMenu.classList.remove("show");
  });
});

// Helpers
function parsePrice(priceText) {
  if (!priceText) return 0;
  const cleaned = priceText.replace("S/", "").replace(",", "").trim();
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
}

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);
  if (cartTotal) cartTotal.textContent = `S/${total.toFixed(2)}`;
}

function renderCart() {
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Tu carrito está vacío</p>`;
    if (cartBuyBtn) cartBuyBtn.disabled = true;
    updateCartCount();
    updateCartTotal();
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-name">${item.product}</span>
        <span class="cart-item-price">${item.price}</span>
      </div>
      <button class="cart-remove-btn" data-index="${index}" aria-label="Eliminar producto">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  `).join("");

  document.querySelectorAll(".cart-remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-index"));
      cart.splice(index, 1);
      renderCart();
    });
  });

  if (cartBuyBtn) cartBuyBtn.disabled = false;

  updateCartCount();
  updateCartTotal();
}

// Agregar producto
addCartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.getAttribute("data-product") || "Producto";
    const price = btn.getAttribute("data-price") || "S/0.00";

    cart.push({ product, price });
    renderCart();

    if (cartDropdown) cartDropdown.classList.add("show");
  });
});

// Abrir/cerrar carrito
if (cartBtn && cartDropdown) {
  cartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cartDropdown.classList.toggle("show");
  });
}

if (cartCloseBtn && cartDropdown) {
  cartCloseBtn.addEventListener("click", () => {
    cartDropdown.classList.remove("show");
  });
}

document.addEventListener("click", (e) => {
  if (!cartDropdown || !cartBtn) return;

  const insideDropdown = cartDropdown.contains(e.target);
  const insideCartBtn = cartBtn.contains(e.target);

  if (!insideDropdown && !insideCartBtn) {
    cartDropdown.classList.remove("show");
  }
});

// Comprar por WhatsApp
if (cartBuyBtn) {
  cartBuyBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    let total = 0;
    let message = "Hola, quiero comprar los siguientes productos:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product} - ${item.price}\n`;
      total += parsePrice(item.price);
    });

    message += `\nTotal: S/${total.toFixed(2)}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  });
}

// Reveal
if (revealItems.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => observer.observe(item));
}

// Init
renderCart();