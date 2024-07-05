// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
const searchParams = new URLSearchParams(window.location.search); // Extrahiert die URL-Parameter
const filter = searchParams.get('filter'); // Ruft den Wert des Filters ab

//  Zeile 5 - 19 von Chat-gpt abgeschaut und gemacht https://chatgpt.com/
fetch('http://localhost:3000/categories', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}` // Verwendet JWT für die Authentifizierung
    }
})
.then(response => response.json()) // Konvertiert die Antwort in JSON
.then(categories => {
    const categoryList = document.getElementById('category-list'); // Referenz zur Kategorieliste
    categoryList.innerHTML = ''; // Löscht vorhandene Kategorien, um Duplikate zu vermeiden
    categories.forEach(category => {
        const listItem = document.createElement('li'); // Erstellt ein neues Listenelement für jede Kategorie
        listItem.innerHTML = `<a href="?filter=${category.id}" class="block py-2 px-4 bg-gray-100 rounded hover:bg-gray-200">${category.name}</a>`; // Setzt den HTML-Inhalt des Listenelements
        categoryList.appendChild(listItem); // Fügt das Listenelement der Liste hinzu
    });
})

// Asynchrone Funktion zum Abrufen von Produktinformationen
async function getProducts() {
    const res = await fetch('http://localhost:3000/products'); // Sendet eine GET-Anfrage an den Server
    const data = await res.json(); // Konvertiert die Antwort in JSON
    return data; // Gibt die Produktdaten zurück
}
  
// Funktion zur Anzeige von Produkten auf der Seite
async function displayProducts() {
    const products = await getProducts(); // Ruft die Produktdaten ab
    const productsList = document.getElementById('product-list'); // Referenz zur Produktliste

    // Zeile 34 - 52 Chat gpt https://chatgpt.com/ 
    products.filter(product => filter === 'all' || filter == product.categoryId || !filter).forEach(product => {
        const card = `
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div class="bg-white border border-gray-200 rounded-lg shadow">
                <a href="#">
                    <img class="p-8 rounded-t-lg w-full" src="${product.image}" alt="${product.name}" />
                </a>
                <div class="px-5 pb-5">
                    <a href="./product.html?id=${product.id}">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900">${product.name}</h5>
                    </a>
                    <span class="text-3xl font-bold text-gray-900">${product.price} CHF</span>
                </div>
            </div>
        </div>
    `; // HTML-Vorlage für das Produkt
        productsList.insertAdjacentHTML('afterend', card); // Fügt die Produktkarte ans Ende der Liste hinzu
    });
}

// Ruft die Funktion auf, um Produkte beim Laden der Seite anzuzeigen
displayProducts();

/**
 * Entfernt das JWT-Token aus dem lokalen Speicher und leitet den Nutzer zur Login-Seite.
 */
function logout() {
    localStorage.removeItem("jwt"); // Entfernt das JWT-Token aus dem lokalen Speicher
    window.location.href = "./login.html" // Leitet zur Login-Seite weiter
}
