const products = [
    { 
        id: 1, 
        name: "Sculpted Wool Blazer", 
        price: 450, 
        category: "outerwear", 
        img: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 2, 
        name: "Oversized Silk Shirt", 
        price: 180, 
        category: "tops", 
        img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 3, 
        name: "Tailored Wide Trousers", 
        price: 220, 
        category: "bottoms", 
        img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 4, 
        name: "Cashmere Turtleneck", 
        price: 285, 
        category: "tops", 
        img: "https://images.unsplash.com/photo-1574180563860-026534704bfc?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 5, 
        name: "Classic Trench Coat", 
        price: 550, 
        category: "outerwear", 
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 6, 
        name: "Minimalist Knit Vest", 
        price: 120, 
        category: "tops", 
        img: "https://images.unsplash.com/photo-1610738753726-39903ee5240c?q=80&w=800&auto=format&fit=crop" 
    }
];

let cart = [];

// This function builds the product grid on the page
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="img-container">
                <img src="${product.img}" 
                     alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/400x600?text=Fashion+Piece'">
                <button class="add-btn" onclick="addToCart(${product.id})">ADD TO BAG</button>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Opens/Closes the slide-out cart
function toggleCart(forceOpen = false) {
    const sidebar = document.getElementById('cart-sidebar');
    if(forceOpen) sidebar.classList.add('active');
    else sidebar.classList.toggle('active');
}

// Logic to add items to the cart
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    toggleCart(true); // Auto-open cart to show progress
}

// Logic to remove items
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Updates the numbers and list in the cart sidebar
function updateCartUI() {
    const count = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    
    count.innerText = cart.length;
    
    itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display:flex; gap:15px; margin-bottom:25px; align-items: center;">
            <img src="${item.img}" style="width:60px; height:80px; object-fit:cover;">
            <div style="flex:1">
                <h5 style="margin-bottom:5px; font-size: 0.9rem;">${item.name}</h5>
                <p style="font-size:0.8rem; color:#888;">$${item.price.toFixed(2)}</p>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:#999; cursor:pointer; font-size:0.6rem; text-transform:uppercase; margin-top:5px; border-bottom: 1px solid #ccc;">Remove</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = total.toFixed(2);
}

// Handles the filter dropdown
function filterProducts() {
    const val = document.getElementById('categoryFilter').value;
    renderProducts(val);
}

// Navbar styling change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 80) {
        nav.style.padding = '1rem 5%';
        nav.style.background = 'rgba(255,255,255,0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.background = 'white';
        nav.style.boxShadow = 'none';
    }
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});