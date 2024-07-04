const token = localStorage.getItem('jwt');

// Asynchrone Funktion zum Abrufen aller Kategorien von der API
async function getCategories() {
    const response = await fetch('http://localhost:3000/categories', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
}

// Funktion zum Anzeigen aller Kategorien in der HTML-Tabelle
async function displayCategories() {
    const categories = await getCategories();
    const tbody = document.getElementById('category-list');
    
    categories.forEach(category => {
        const tr = `
            <tr>
                <td class="py-2 px-4 border">${category.name}</td>
                <td class="py-2 px-4 border">
                    <a href="./create-categorie.html?id=${category.id}" class="bg-yellow-500 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300">Bearbeiten</a>
                    <button onclick="deleteCategory(${category.id})" class="bg-red-600 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Löschen</button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', tr); // Ändern zu 'beforeend' für korrektes Hinzufügen der Zeilen
    });
}

displayCategories();

// Funktion zum Löschen einer Kategorie
async function deleteCategory(id) {
    if (!confirm("Sind Sie sicher, dass Sie löschen möchten?")) return;

    const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if(response.status === 403) {
        alert("Sie sind nicht berechtigt!");
        return;
    }

    window.location.reload(); // Lädt die Seite neu, um Änderungen anzuzeigen
}

// Funktion zum Abrufen aller Produkte
async function getProducts() {
    const response = await fetch('http://localhost:3000/products', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
}

// Funktion zum Anzeigen aller Produkte in der HTML-Tabelle
async function displayProducts() {
    const products = await getProducts();
    const tbody = document.getElementById('product-list');

    products.forEach(product => {
        const tr = `
            <tr>
                <td class="py-2 px-4 border">${product.name}</td>
                <td class="py-2 px-4 border">
                    <a href="./create-product.html?id=${product.id}" class="bg-yellow-500 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300">Bearbeiten</a>
                    <button onclick="deleteProduct(${product.id})" class="bg-red-600 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Löschen</button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', tr);
    });
}

displayProducts();

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "./login.html"
}

// Funktion zum Löschen eines Produkts
async function deleteProduct(id) {
    if (!confirm("Sind Sie sicher, dass Sie löschen möchten?")) return;

    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if(response.status === 403) {
        alert("Sie sind nicht berechtigt!");
        return;
    }

    window.location.reload(); // Lädt die Seite neu, um Änderungen anzuzeigen
}