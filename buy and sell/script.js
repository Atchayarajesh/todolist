let currentUser = null; // Track the currently logged-in user
let cart = []; // Array to store added products to the cart

// Register form handler
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Store user data locally
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    alert('Registration successful! You can now login.');
    showLoginPage();
});

// Show Login Page
document.getElementById('showLogin').addEventListener('click', showLoginPage);
function showLoginPage() {
    hideAllSections();
    document.getElementById('login').classList.remove('hidden');
}

// Show Register Page
document.getElementById('showRegister').addEventListener('click', showRegisterPage);
function showRegisterPage() {
    hideAllSections();
    document.getElementById('register').classList.remove('hidden');
}

// Hide all sections
function hideAllSections() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let emailLogin = document.getElementById('emailLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === emailLogin && user.password === passwordLogin) {
        currentUser = user; // Set current user
        alert('Login successful!');
        showProductOptions();
    } else {
        alert('Incorrect email or password');
    }
});

// Show product options after login or registration
function showProductOptions() {
    hideAllSections();
    document.getElementById('sellProduct').classList.remove('hidden');
    document.getElementById('products').classList.remove('hidden');
    displayProducts(); // Display products on login
}

// Show available products
function showProducts() {
    hideAllSections();
    document.getElementById('products').classList.remove('hidden');
    displayProducts(); // Refresh product list
}

// Show sell product section
function showSellProduct() {
    hideAllSections();
    document.getElementById('sellProduct').classList.remove('hidden');
}

// Sell product handler
document.getElementById('sellForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let productDescription = document.getElementById('productDescription').value;
    let productImage = document.getElementById('productImage').files[0];

    // Create a file reader to read the image file
    const reader = new FileReader();
    reader.onloadend = function () {
        let product = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: reader.result // Store base64 encoded image
        };

        // Store product in local storage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        alert('Product added successfully!');
        displayProducts(); // Refresh product list
    };
    
    // Read the image file as a data URL
    if (productImage) {
        reader.readAsDataURL(productImage);
    }
});

// Function to display available products
function displayProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        let productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100" height="100">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1); // Remove product from the array
    localStorage.setItem('products', JSON.stringify(products)); // Update local storage
    displayProducts(); // Refresh product list
}

// Function to add a product to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    alert(`${name} added to cart.`);
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Cart is empty. Please add products to the cart before proceeding to checkout.');
        return;
    }

    document.getElementById('products').classList.add('hidden');
    document.getElementById('checkout').classList.remove('hidden');
}

// Checkout form handler
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let deliveryAddress = document.getElementById('deliveryAddress').value;
    let pincode = document.getElementById('pincode').value;
    let paymentMethod = document.getElementById('paymentMethod').value;

    // Build order details message
    let orderItems = cart.map(item => `${item.name} - $${item.price}`).join(', ');
    let orderDetails = `
        <p><strong>Order Details:</strong></p>
        <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Items in Cart:</strong> ${orderItems}</p>
        <p><strong>Total Amount:</strong> $${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
    `;

    // Show thank you message and order details
    document.getElementById('orderDetails').innerHTML = orderDetails;
    document.getElementById('thankYouMessage').classList.remove('hidden');
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('orderConfirmation').classList.remove('hidden');

    // Clear the cart
    cart = [];
});

// Initially display products if any
displayProducts();
