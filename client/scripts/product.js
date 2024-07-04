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
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();

    // Prüft, ob das Produkt gefunden wurde
    if (data.message) {
        alert("Produkt nicht gefunden");
        window.location.href = "./index.html";
        return null; // Beendet die Funktion frühzeitig, wenn kein Produkt gefunden wurde
    }
    return data;
}

/**
 * Lädt Kategoriedetails basierend auf der übergebenen Kategorie-ID.
 */
async function getCategory(categoryId) {
    const response = await fetch(`http://localhost:3000/categories/${categoryId}`);
    const data = await response.json();
    return data;
}

/**
 * Verwendet die Produktinformationen, um die DOM-Elemente zu aktualisieren.
 */
async function displayProduct() {
    const product = await getProduct();
    if (!product) return; // Stoppt die Ausführung, falls kein Produkt geladen wurde

    const productCategory = await getCategory(product.categoryId);

    image.src = product.image;
    title.textContent = product.name;
    price.textContent = product.price;
    categoryElement.textContent = productCategory.name;
}

// Initiiert die Produktanzeige, wenn die Seite geladen wird
displayProduct();


function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "./login.html"
}