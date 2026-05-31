// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart array from sessionStorage (or empty array if nothing exists)
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  // Clear existing list to prevent duplication if re-rendered
  productList.innerHTML = ""; 
  
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  // Clear the current cart DOM display
  cartList.innerHTML = "";

  // Populate the cart list with current items
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  // Find the product details from the products array using the ID
  const productToAdd = products.find((product) => product.id === productId);
  
  if (productToAdd) {
    cart.push(productToAdd);
    // Update sessionStorage and re-render the cart UI
    updateSessionStorage();
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  updateSessionStorage();
  renderCart();
}

// Helper function to sync current cart state to sessionStorage
function updateSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --- Event Listeners ---

// Event delegation to capture clicks on "Add to Cart" buttons dynamically
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Click event listener for clearing the entire cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render sequence on page load
renderProducts();
renderCart();