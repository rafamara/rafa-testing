const sellForm = document.getElementById('sell-form');
const buybackList = document.getElementById('buyback-list');
const buybackProductSelect = document.getElementById('buyback-product');

let products = [
    { name: "Product 1", price: 100 } // Add a default product to the array
];

// Populate buyback product select when the page loads
for (const product of products) {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    buybackProductSelect.appendChild(option);
}

// Add an event listener for the "Sell" button
const sellButton = document.getElementById('sell-form').querySelector('button[type="submit"]');

// Ensure that the event listener is bound only once
sellButton.removeEventListener('click', sellButtonClickHandler); // Remove existing listener if any
sellButton.addEventListener('click', sellButtonClickHandler);

function sellButtonClickHandler(event) {
    event.preventDefault(); // Prevent default form submission behavior
    event.stopPropagation(); // Stop event propagation

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;

    // Track purchase event in GA4
    gtag('event', 'purchase', {
        'items': [
            {
                'id': 'RF_1234', // Replace with the actual product ID
                'name': productName, // Use the actual product name dynamically
                'quantity': 1,
                'price': 19 // Convert the product price to a float or use the appropriate data type
            }
        ]
    });

    // Additional logic related to the "Sell" button click can be added here

    // Clear the form fields
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
}

sellForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;

    products.push({ name: productName, price: productPrice });

    const listItem = document.createElement('li');
    listItem.textContent = `Product: ${productName}, Price: ${productPrice}`;
    buybackList.appendChild(listItem);

    // Update buyback product select options
    const option = document.createElement('option');
    option.value = productName;
    option.textContent = productName;
    buybackProductSelect.appendChild(option);

    // Clear the form fields
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
});

buybackForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const buybackProductName = buybackProductSelect.value;

    products = products.filter((product) => product.name !== buybackProductName);

    // Remove product from buyback list
    for (const item of buybackList.children) {
        if (item.textContent.includes(buybackProductName)) {
            item.remove();
            break;
        }
    }

    // Remove product from select options
    buybackProductSelect.remove(buybackProductSelect.selectedIndex);
});
