// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
const token = localStorage.getItem('jwt'); // Liest das JWT aus dem localStorage

// Asynchrone Funktion zum Abrufen aller Kategorien von der API
async function getCategories() {
    const response = await fetch('http://localhost:3000/categories', {
        headers: { Authorization: `Bearer ${token}` } // Fügt das JWT für die Authentifizierung hinzu
    });
    const data = await response.json(); // Konvertiert die Antwort in JSON
    return data; // Gibt die Kategoriedaten zurück
}

// Funktion zum Anzeigen aller Kategorien in der HTML-Tabelle
// Zeile 14 - 30 https://chatgpt.com/
async function displayCategories() {
    const categories = await getCategories(); // Ruft die Kategoriedaten ab
    const tbody = document.getElementById('category-list'); // Referenz zur Kategorieliste
    
    categories.forEach(category => {
        const tr = `
            <tr>
                <td class="py-2 px-4 border">${category.name}</td>
                <td class="py-2 px-4 border">
                    <a href="./create-categorie.html?id=${category.id}" class="bg-yellow-500 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300">Bearbeiten</a>
                    <button onclick="deleteCategory(${category.id})" class="bg-red-600 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Löschen</button>
                </td>
            </tr>
        `; // HTML-Vorlage für die Kategoriezeile
        tbody.insertAdjacentHTML('beforeend', tr); // Fügt die Zeile ans Ende der Tabelle hinzu
    });
}

// Ruft die Funktion auf, um Kategorien beim Laden der Seite anzuzeigen
displayCategories();

// Funktion zum Löschen einer Kategorie
async function deleteCategory(id) {
    if (!confirm("Sind Sie sicher, dass Sie löschen möchten?")) return; // Bestätigt die Löschaktion

    const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE', // Setzt die HTTP-Methode auf DELETE
        headers: { Authorization: `Bearer ${token}` }, // Fügt das JWT für die Authentifizierung hinzu
    });

    if(response.status === 403) {
        alert("Sie sind nicht berechtigt!"); // Meldung bei fehlender Berechtigung
        return; // Beendet die Funktion
    }

    window.location.reload(); // Lädt die Seite neu, um Änderungen anzuzeigen
}

// Funktion zum Abrufen aller Produkte
async function getProducts() {
    const response = await fetch('http://localhost:3000/products', {
        headers: { Authorization: `Bearer ${token}` } // Fügt das JWT für die Authentifizierung hinzu
    });
    const data = await response.json(); // Konvertiert die Antwort in JSON
    return data; // Gibt die Produktdaten zurück
}

// Funktion zum Anzeigen aller Produkte in der HTML-Tabelle
// Zeile 62 - 78 https://chatgpt.com/
async function displayProducts() {
    const products = await getProducts(); // Ruft die Produktdaten ab
    const tbody = document.getElementById('product-list'); // Referenz zur Produktliste

    products.forEach(product => {
        const tr = `
            <tr>
                <td class="py-2 px-4 border">${product.name}</td>
                <td class="py-2 px-4 border">
                    <a href="./create-product.html?id=${product.id}" class="bg-yellow-500 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300">Bearbeiten</a>
                    <button onclick="deleteProduct(${product.id})" class="bg-red-600 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Löschen</button>
                </td>
            </tr>
        `; // HTML-Vorlage für die Produktzeile
        tbody.insertAdjacentHTML('beforeend', tr); // Fügt die Zeile ans Ende der Tabelle hinzu
    });
}

// Ruft die Funktion auf, um Produkte beim Laden der Seite anzuzeigen
displayProducts();

/**
 * Entfernt das JWT-Token aus dem lokalen Speicher und leitet den Nutzer zur Login-Seite.
 */
function logout() {
    localStorage.removeItem("jwt"); // Entfernt das JWT-Token aus dem lokalen Speicher
    window.location.href = "./login.html"; // Leitet zur Login-Seite weiter
}

// Funktion zum Löschen eines Produkts
async function deleteProduct(id) {
    if (!confirm("Sind Sie sicher, dass Sie löschen möchten?")) return; // Bestätigt die Löschaktion

    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE', // Setzt die HTTP-Methode auf DELETE
        headers: { Authorization: `Bearer ${token}` }, // Fügt das JWT für die Authentifizierung hinzu
    });

    if(response.status === 403) {
        alert("Sie sind nicht berechtigt!"); // Meldung bei fehlender Berechtigung
        return; // Beendet die Funktion
    }

    window.location.reload(); // Lädt die Seite neu, um Änderungen anzuzeigen
}
