// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// DOM-Elemente für die Produktanzeige initialisieren
const image = document.getElementById('image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const categoryElement = document.getElementById('category');

// URL-Parameter extrahieren, um die Produkt-ID zu erhalten
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

/**
 * Lädt Produktdetails von der API basierend auf der übergebenen ID.
 */
async function getProduct() {
    const response = await fetch(`http://localhost:3000/products/${id}`); // Sendet eine GET-Anfrage an den Server
    const data = await response.json(); // Konvertiert die Antwort in JSON

    // Prüft, ob das Produkt gefunden wurde
    if (data.message) {
        alert("Produkt nicht gefunden"); // Meldung bei nicht gefundenem Produkt
        window.location.href = "./index.html"; // Leitet zur Hauptseite weiter
        return null; // Beendet die Funktion frühzeitig, wenn kein Produkt gefunden wurde
    }
    return data; // Gibt die Produktdaten zurück
}

/**
 * Lädt Kategoriedetails basierend auf der übergebenen Kategorie-ID.
 */
async function getCategory(categoryId) {
    const response = await fetch(`http://localhost:3000/categories/${categoryId}`); // Sendet eine GET-Anfrage an den Server
    const data = await response.json(); // Konvertiert die Antwort in JSON
    return data; // Gibt die Kategoriedaten zurück
}

/**
 * Verwendet die Produktinformationen, um die DOM-Elemente zu aktualisieren.
 */
async function displayProduct() {
    const product = await getProduct(); // Ruft die Produktdaten ab
    if (!product) return; // Stoppt die Ausführung, falls kein Produkt geladen wurde

    const productCategory = await getCategory(product.categoryId); // Ruft die Kategoriedaten ab

    image.src = product.image; // Setzt das Bild-Element
    title.textContent = product.name; // Setzt den Titel-Text
    price.textContent = product.price; // Setzt den Preis-Text
    categoryElement.textContent = productCategory.name; // Setzt den Kategorie-Text
}

// Initiiert die Produktanzeige, wenn die Seite geladen wird
displayProduct();

/**
 * Entfernt das JWT-Token aus dem lokalen Speicher und leitet den Nutzer zur Login-Seite.
 */
function logout() {
    localStorage.removeItem("jwt"); // Entfernt das JWT-Token aus dem lokalen Speicher
    window.location.href = "./login.html"; // Leitet zur Login-Seite weiter
}
