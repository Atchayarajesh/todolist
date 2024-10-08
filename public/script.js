// Define restaurants and their menu items, including images
const restaurants = {
    alifRestaurant: {
        name: 'Alif Restaurant',
        specialty: 'Pakistani Cuisine',
        image:'D:\full stack\fooddelivery\public\assets\alif_restaurant.jpg.jpg'// Ensure this image exists in the assets folder
    },
    bilalRestaurant: {
        name: 'Bilal Restaurant',
        specialty: 'Chinese Cuisine',
        image: 'assets/bilal_restaurant.jpg' // Ensure this image exists in the assets folder
    }
};

const menuItems = {
    alifRestaurant: [
        {
            name: 'Biryani',
            price: 9.99,
            image: 'D:\full stack\fooddelivery\public\assets\biryani.jpg.jpg' // Ensure this image exists in the assets folder
        },
        {
            name: 'Kebab Platter',
            price: 11.49,
            image: 'kebab_platter.jpg' // Ensure this image exists in the assets folder
        }
    ],
    bilalRestaurant: [
        {
            name: 'Sweet and Sour Chicken',
            price: 10.99,
            image: 'assets/bilal_restaurant.jpg' // Ensure this image exists in the assets folder
        },
        {
            name: 'Chow Mein',
            price: 8.99,
            image: 'assets/chow_mein.jpg' // Ensure this image exists in the assets folder
        }
    ]
};

let cart = [];

// Show list of restaurants with images
function showRestaurants() {
    const restaurantContainer = document.getElementById('restaurant-container');
    restaurantContainer.innerHTML = '';

    for (const restaurantKey in restaurants) {
        const restaurant = restaurants[restaurantKey];
        const restaurantItem = document.createElement('div');
        restaurantItem.classList.add('restaurant');

        restaurantItem.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
            <div class="restaurant-details">
                <h3>${restaurant.name}</h3>
                <p>Specialty: ${restaurant.specialty}</p>
                <button onclick="showMenu('${restaurantKey}')">View Menu</button>
            </div>
        `;
        restaurantContainer.appendChild(restaurantItem);
    }
}

// Show menu items for selected restaurant
function showMenu(restaurantKey) {
    const menuSection = document.getElementById('menu-section');
    menuSection.innerHTML = `<h2>Menu for ${restaurants[restaurantKey].name}</h2>`;

    menuItems[restaurantKey].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-image">
            <div class="food-details">
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="addToCart('${restaurantKey}', '${item.name}', ${item.price})">Add to Cart</button>
            </div>
        `;
        menuSection.appendChild(menuItem);
    });
}

// Add an item to the cart
function addToCart(restaurantKey, itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
}

// Update cart section with current items
function updateCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.innerHTML = '<h2>Your Cart</h2>';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartSection.appendChild(cartItem);
        total += item.price;
    });

    const totalDisplay = document.createElement('div');
    totalDisplay.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartSection.appendChild(totalDisplay);

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Place Order';
    orderButton.onclick = placeOrder;
    cartSection.appendChild(orderButton);
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Place order and show thank you message
function placeOrder() {
    const cartSection = document.getElementById('cart-section');
    cartSection.innerHTML = `<h2>Thank You for Your Order!</h2><p>Your food is on its way.</p>`;
    cart = []; // Clear the cart after placing the order
}

// Initial call to show restaurants when the page loads
showRestaurants();
