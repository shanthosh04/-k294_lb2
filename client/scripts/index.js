// Führt Funktionen aus, sobald das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Ruft Kategoriedaten vom Server ab
    fetch('http://localhost:3000/categories', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}` // Verwendet JWT für die Authentifizierung
        }
    })
    .then(response => response.json())
    .then(categories => {
        const categoryList = document.getElementById('category-list');
        categoryList.innerHTML = ''; // Löscht vorhandene Kategorien, um Duplikate zu vermeiden
        categories.forEach(category => {
            const listItem = document.createElement('li'); // Erstellt ein neues Listenelement für jede Kategorie
            listItem.innerHTML = `<a href="#${category.id}" class="block py-2 px-4 bg-gray-100 rounded hover:bg-gray-200">${category.name}</a>`;
            categoryList.appendChild(listItem); // Fügt das Listenelement der Liste hinzu
        });
    })
    .catch(error => console.error('Fehler beim Laden der Kategorien:', error));
});

// Asynchrone Funktion zum Abrufen von Produktinformationen
async function getProducts() {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    return data;
}
  
// Funktion zur Anzeige von Produkten auf der Seite
async function displayProducts() {
    const products = await getProducts();
    const productsList = document.getElementById('product-list');

    products.forEach(product => {
        const card = `
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <a href="#">
                    <img class="p-8 rounded-t-lg w-72" src="${product.image}" alt="${product.name}" />
                </a>
                <div class="px-5 pb-5">
                    <a href="./product.html?id=${product.id}">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900">${product.name}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-gray-900">${product.price} CHF</span>                        
                    </div>
                </div>
            </div>
        `;
        productsList.insertAdjacentHTML('afterend', card); // Fügt die Produktkarte ans Ende der Liste hinzu
    });
}

displayProducts(); // Ruft die Funktion auf, um Produkte beim Laden der Seite anzuzeigen
