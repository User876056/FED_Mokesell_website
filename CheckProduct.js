// Fetch data from API
async function fetchProducts() {
    const API_URL = 'https://mokesellproducts-3f4b.restdb.io/rest/products'; 
    const API_KEY = '67965648ed070e2a073bbb9c';

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
                <p class="review/s">Ratings: ${Product.ratings}</p>
            </div>
        `;
        card.addEventListener("click", () => {
            name = Product.name; // Store the product's name in the variable
            localStorage.setItem("ChosenProductName",name)
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


const MAX_SUGGESTIONS = 5; // Limit number of search suggestions shown initially

// 🔹 Populate the search dropdown list dynamically
function populateSearchList(productNames) {
    const ul = document.getElementById("myUL");

    if (!ul) {
        console.error("Error: myUL element not found!");
        return;
    }

    ul.innerHTML = ""; // Clear existing list

    // Show only the first MAX_SUGGESTIONS initially
    productNames.slice(0, MAX_SUGGESTIONS).forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        li.onclick = function () {
            document.getElementById("input-box").value = name; // Set search box value
            ul.style.display = "none"; // Hide dropdown after selection

            // Store the selected product's name in localStorage
            localStorage.setItem("ChosenProduct", name);  // Save product's unique name

            // Redirect to product details page
            window.location.href = "Product_Details.html"; // Redirect
        };

        ul.appendChild(li);
    });

    ul.style.display = productNames.length ? "block" : "none"; // Show only if items exist
}

// 🔹 Fetch products and populate search list on page load
document.addEventListener("DOMContentLoaded", async function () {
    const inputBox = document.getElementById("input-box");
    const ul = document.getElementById("myUL");

    if (!inputBox || !ul) {
        console.error("Error: input-box or myUL element not found!");
        return;
    }

    // Fetch and store products
    try {
        currentProducts = await fetchProducts();
        if (currentProducts.length === 0) {
            console.warn("No products found!");
            return;
        }

        // Extract product names and populate the initial search list
        const productNames = currentProducts.map(product => product.name);
        populateSearchList(productNames);

        // 🔹 Live search filtering
        inputBox.addEventListener("input", function () {
            const filter = inputBox.value.toLowerCase();
            ul.innerHTML = ""; // Clear existing list
            let hasMatches = false;

            // Filter products dynamically based on input
            currentProducts.forEach(product => {
                if (product.name.toLowerCase().includes(filter)) {
                    const li = document.createElement("li");
                    li.textContent = product.name;
                    li.onclick = function () {
                        inputBox.value = product.name; // Set search box value
                        ul.style.display = "none"; // Hide dropdown after selection

                        // Store the selected product's name in localStorage
                        localStorage.setItem("ChosenProduct", product.name);  // Save product's unique name

                        // Redirect to product details page
                        window.location.href = "Product_Details.html"; // Redirect
                    };

                    ul.appendChild(li);
                    hasMatches = true;
                }
            });

            // Show only if there are matches
            ul.style.display = hasMatches ? "block" : "none";
        });

    } catch (error) {
        console.error("Failed to fetch and populate search list:", error);
    }

    // 🔹 Hide list when clicking outside
    document.addEventListener("click", function (e) {
        if (!inputBox.contains(e.target) && !ul.contains(e.target)) {
            ul.style.display = "none";
        }
    });
});


