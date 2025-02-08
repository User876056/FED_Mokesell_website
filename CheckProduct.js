// Fetch data from API
async function fetchProducts() {
    const API_URL = 'https://mokesold-2e4b.restdb.io/rest/products'; 
    const API_KEY = '67a670f5df7c26d07d9657c0';

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'x-apikey': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Render products on the page
function renderProducts(Products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear previous content

    
    Products.forEach(Product => {  // Use 'Product' for each product item
        const card = document.createElement('div');
        card.className = `product-card filterDiv ${Product.name}`;  // Ensure correct casing here
        card.innerHTML = `
            

            <img src="Product_Images/${Product.image_name || 'placeholder.jpg'}" alt="${Product.name}" />
            <div class="product-info">
                <h3>${Product.name}</h3>
                <p class="price">Price: $${Product.price_sg}</p>
                <p class="review/s">Price: $${Product.price_sg}</p>
            </div>
        `;
        card.addEventListener("click", () => {
            name = Product.name; // Store the product's name in the variable
            localStorage.setItem("ChosenProduct",name)
            console.log("Selected product:", name); // Debugging output
            window.location.href = "Product_Details.html"
        });
        container.appendChild(card);
    });
}

// Filter products by category
function filterSelection(category) {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => button.classList.remove('active'));

    document
        .querySelector(`button[onclick="filterSelection('${category}')"]`)
        .classList.add('active');

    if (category === 'all') {
        renderProducts(currentProducts);
    } else {
        const filteredProducts = currentProducts.filter(Product =>
            Product.name.toLowerCase().includes(category.toLowerCase())  // Ensure correct casing
        );
        renderProducts(filteredProducts);
    }
}

let currentProducts = [];

