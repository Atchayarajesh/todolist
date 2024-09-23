let menuItems = [
    { id: 1, name: "Burger", price: 5.99 },
    { id: 2, name: "Pizza", price: 8.99 },
    // Add more menu items here
];

let cart = [];

function addToCart(id) {
    let item = menuItems.find(menuItem => menuItem.id === id);
    cart.push(item);
    renderCart();
}

function renderCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        total += item.price;
        cartItems.appendChild(li);
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Thank you for your order!");
    cart = [];
    renderCart();
}
