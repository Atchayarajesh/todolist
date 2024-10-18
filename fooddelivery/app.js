let cart = [];
let totalAmount = 0;
let menu = {
    'thoppi-vaipa': [
        { name: "Dosa", price: 50, img: "images/dosa.jpg" },
        { name: "Idli", price: 40, img: "images/idli.jpg" },
    ],
    'alif': [
        { name: "Shawarma", price: 100, img: "images/shawarma.jpg" },
        { name: "Mandi", price: 200, img: "images/mandi.jpg" },
    ],
    'grill-and-shake': [
        { name: "Grilled Chicken", price: 150, img: "images/grilled-chicken.jpg" },
        { name: "Milkshake", price: 80, img: "images/milkshake.jpg"},
    ]
};

function goToRestaurants() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('restaurant').style.display = 'block';
}

function viewMenu(restaurant) {
    document.getElementById('restaurant').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    let menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = '';

    menu[restaurant].forEach((item) => {
        menuItems.innerHTML += `
            <div>
                <img src="${item.img}" alt="${item.name}" style="width:100px;height:100px;">
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalAmount += itemPrice;
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        cartItems.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });
    document.getElementById('total-amount').textContent = totalAmount;
}

function goToCart() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
}

function goToPayment() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-details').style.display = 'block';
}

function nextStep(step) {
    document.getElementById(`step-${step}`).style.display = 'none';
    document.getElementById(`step-${step + 1}`).style.display = 'block';
}

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    document.getElementById('user-name').textContent = name;

    document.getElementById('order-details').style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';

    cart = [];
    totalAmount = 0;
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-amount').textContent = 0;
});

