// Cardápio inicial de demonstração. Edite os produtos e preços nesta lista.
// Configure o telefone da loja no formato internacional, somente números: 55 + DDD + número.
const WHATSAPP_NUMBER = "";

const products = [
  {id:"classico",name:"Monster Clássico",category:"Hambúrgueres",price:29.90,description:"Pão brioche, burger 180g, queijo cheddar, alface, tomate e molho da casa.",badge:"O QUERIDINHO",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=82"},
  {id:"duplo",name:"Duplo Monstro",category:"Hambúrgueres",price:38.90,description:"Dois burgers  smash, cheddar em dobro, cebola caramelizada e molho especial.",badge:"BEM SERVIDO",image:"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=82"},
  {id:"bacon",name:"Bacon Brabo",category:"Hambúrgueres",price:34.90,description:"Burger 180g, cheddar, bacon crocante, picles e maionese defumada.",badge:"MAIS PEDIDO",image:"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=82"},
  {id:"crispy",name:"Crispy Chicken",category:"Hambúrgueres",price:31.90,description:"Frango crocante, queijo, coleslaw fresquinha e molho levemente picante.",badge:"CROCANTE",image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=82"},
  {id:"fritas",name:"Fritas da Casa",category:"Acompanhamentos",price:14.90,description:"Porção dourada e crocante, com sal da casa. Boa para dividir (ou não).",badge:"ACOMPANHA TUDO",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=82"},
  {id:"onion",name:"Onion Rings",category:"Acompanhamentos",price:17.90,description:"Anéis de cebola empanados, sequinhos e servidos com molho especial.",badge:"CROCÂNCIA",image:"https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=82"},
  {id:"refri",name:"Refrigerante",category:"Bebidas",price:7.00,description:"Lata gelada 350ml. Escolha seu sabor na observação do pedido.",badge:"BEM GELADO",image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=82"},
  {id:"milkshake",name:"Milk-shake",category:"Bebidas",price:18.90,description:"Cremoso, feito na hora. Consulte os sabores disponíveis.",badge:"CREMOSO",image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=82"},
  {id:"combo",name:"Combo Monster",category:"Combos",price:45.90,description:"Monster Clássico, fritas da casa e refrigerante lata. O trio perfeito.",badge:"COMBO",image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=82"}
];

const money = value => value.toLocaleString("pt-BR", {style:"currency",currency:"BRL"});
const cart = new Map();
let selectedCategory = "Todos";
let searchTerm = "";
const menuGrid = document.querySelector("#menu-grid");
const categoryRow = document.querySelector("#category-row");
const cartPanel = document.querySelector("#cart-panel");
const cartBackdrop = document.querySelector("#cart-backdrop");
const toast = document.querySelector("#toast");

function renderCategories(){
  const categories = ["Todos", ...new Set(products.map(product => product.category))];
  categoryRow.innerHTML = categories.map(category => `<button type="button" role="tab" aria-selected="${selectedCategory === category}" class="category-chip ${selectedCategory === category ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
}

function renderProducts(){
  const visible = products.filter(product => (selectedCategory === "Todos" || product.category === selectedCategory) && `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase("pt-BR").includes(searchTerm));
  menuGrid.innerHTML = visible.map(product => `<article class="product-card"><div class="product-image" style="background-image:url('${product.image}')" role="img" aria-label="${product.name}"><span class="product-badge">${product.badge}</span></div><div class="product-body"><div class="product-title-line"><h3 class="product-title">${product.name}</h3><span class="product-price">${money(product.price)}</span></div><p class="product-description">${product.description}</p><div class="product-foot"><span class="product-time">Feito na hora</span><button class="add-button" type="button" data-add="${product.id}">+ ADICIONAR</button></div></div></article>`).join("");
  document.querySelector("#empty-state").hidden = visible.length > 0;
}

function updateCart(){
  const entries = [...cart.entries()];
  const quantity = entries.reduce((sum, [, count]) => sum + count, 0);
  const subtotal = entries.reduce((sum, [id, count]) => sum + products.find(product => product.id === id).price * count, 0);
  document.querySelector("#cart-count").textContent = quantity;
  document.querySelector("#cart-items").innerHTML = entries.map(([id, count]) => {
    const product = products.find(item => item.id === id);
    return `<div class="cart-line"><div><h3>${product.name}</h3><div class="cart-line-sub">${money(product.price)} cada</div></div><b class="cart-line-price">${money(product.price * count)}</b><div class="quantity-control"><button type="button" aria-label="Remover um ${product.name}" data-change="${id}" data-delta="-1">−</button><span>${count}</span><button type="button" aria-label="Adicionar um ${product.name}" data-change="${id}" data-delta="1">+</button></div></div>`;
  }).join("");
  document.querySelector("#cart-empty").hidden = quantity > 0;
  document.querySelector("#cart-bottom").hidden = quantity === 0;
  document.querySelector("#cart-subtotal").textContent = money(subtotal);
  document.querySelector("#checkout-total").textContent = money(subtotal);
}

function openCart(){
  cartBackdrop.hidden = false;
  requestAnimationFrame(() => cartBackdrop.classList.add("visible"));
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector("#close-cart").focus();
}

function closeCart(){
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartBackdrop.classList.remove("visible");
  document.body.style.overflow = "";
  window.setTimeout(() => { if (!cartPanel.classList.contains("open")) cartBackdrop.hidden = true; }, 260);
}

let toastTimer;
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

categoryRow.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = button.dataset.add;
  cart.set(id, (cart.get(id) || 0) + 1);
  updateCart();
  showToast(`${products.find(product => product.id === id).name} adicionado à sacola`);
});

document.querySelector("#cart-items").addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const id = button.dataset.change;
  const next = (cart.get(id) || 0) + Number(button.dataset.delta);
  if (next <= 0) cart.delete(id); else cart.set(id, next);
  updateCart();
});

document.querySelector("#search-input").addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLocaleLowerCase("pt-BR");
  renderProducts();
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
document.querySelector("#back-to-menu").addEventListener("click", closeCart);
document.querySelector("#checkout-button").addEventListener("click", () => document.querySelector("#checkout-dialog").showModal());
document.querySelector("#close-checkout").addEventListener("click", () => document.querySelector("#checkout-dialog").close());
document.querySelector("#checkout-dialog").addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });

document.querySelector("#checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!cart.size) return;
  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    showToast("Adicione o WhatsApp do restaurante no arquivo app.js para receber pedidos.");
    return;
  }
  const data = new FormData(event.currentTarget);
  const lines = [...cart.entries()].map(([id, count]) => {
    const product = products.find(item => item.id === id);
    return `• ${count}x ${product.name} — ${money(product.price * count)}`;
  });
  const subtotal = [...cart.entries()].reduce((sum, [id, count]) => sum + products.find(item => item.id === id).price * count, 0);
  const message = ["Olá! Quero fazer este pedido:", "", ...lines, "", `Subtotal dos itens: ${money(subtotal)}`, `Nome: ${data.get("nome")}`, `Telefone: ${data.get("telefone")}`, `Endereço: ${data.get("endereco")}`, `Pagamento: ${data.get("pagamento")}`, data.get("observacao") ? `Observação: ${data.get("observacao")}` : ""].filter(Boolean).join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#menu-toggle").addEventListener("click", event => {
  const button = event.currentTarget;
  const nav = document.querySelector(".main-nav");
  const isOpen = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
}));
document.addEventListener("keydown", event => { if (event.key === "Escape" && cartPanel.classList.contains("open")) closeCart(); });
document.querySelector("#year").textContent = new Date().getFullYear();
renderCategories();
renderProducts();
updateCart();
