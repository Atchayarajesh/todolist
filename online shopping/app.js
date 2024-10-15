// Variables to store users and product listings
let users = [];
let listings = [];

// Event listener for registration form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // Add the new user to the users array
    users.push({ username, email, password });
    alert('Registration successful!');

    // Clear the form
    document.getElementById('registerForm').reset();
});

// Event listener for product listing form submission
document.getElementById('listingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;

    // Add the new listing to the listings array
    listings.push({ productName, productCategory, productPrice, productDescription });

    // Clear the form
    document.getElementById('listingForm').reset();

    // Display updated product listings
    displayListings();
});

// Function to display product listings
function displayListings() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    listings.forEach(listing => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${listing.productName}</h3>
            <p><strong>Category:</strong> ${listing.productCategory}</p>
            <p><strong>Price:</strong> $${listing.productPrice}</p>
            <p>${listing.productDescription}</p>
        `;
        productList.appendChild(productCard);
    });
}

// Event listeners to toggle registration form visibility
document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('registration').classList.toggle('hidden');
});