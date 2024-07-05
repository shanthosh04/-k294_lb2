// DOM-Elemente für das Produktformular und Kategorie-Auswahlmenü initialisieren
const productForm = document.getElementById('product-form');
const categorySelect = document.getElementById('categoryId');

// URL-Parameter extrahieren, um die Produkt-ID zu erhalten
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');
const token = localStorage.getItem("jwt");

// Event-Listener für das Produktformular
productForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    
    // Übertragen der Formulardaten in ein JSON-Objekt, Überprüfung auf leere Felder
    formData.forEach((value, key) => {
        if (!value) {
            alert("Bitte füllen Sie alle Eingabefelder aus!");
            return;
        }
        data[key] = value;
    });

    try {
        await createOrUpdateProduct(data);
        window.location.href = "./index.html";
    } catch (error) {
        alert(`Fehler: ${error.message}`);
    }
});

/**
 * Erstellt oder aktualisiert ein Produkt auf dem Server.
 * @param {Object} product - Die Produktinformationen.
 */
async function createOrUpdateProduct(product) {
    const url = id ? `http://localhost:3000/products/${id}` : `http://localhost:3000/products`;
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        });

        if (res.status === 403) {
            alert("Sie sind nicht berechtigt!");
            return;
        }

        if (!res.ok) {
            const message = await res.text();
            throw new Error(message);
        }

        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}


async function getProduct() {
    if (id) {
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message);
            }

            const data = await res.json();

            if (data.message) {
                alert(data.message);
                return null;
            }

            return data;
        } catch (error) {
            alert(`Error: ${error.message}`);
            return null;
        }
    }
    return null;
}


/**
 * Lädt Produktdetails und füllt die Formularfelder damit aus.
 */
async function populateInputFields() {
    const product = await getProduct();
    if (product) {
        document.getElementById('name').value = product.name || "";
        document.getElementById('price').value = product.price || "";
        document.getElementById('image').value = product.image || "";
        document.getElementById('categoryId').value = product.categoryId || "";
    }
}

if (id) {
    populateInputFields();
}

/**
 * Lädt die Kategorieliste und füllt das Kategorie-Auswahlmenü.
 */
async function populateCategories() {
    try {
        const res = await fetch(`http://localhost:3000/categories`);
        if (!res.ok) {
            const message = await res.text();
            throw new Error(message);
        }
        const categories = await res.json();

        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.text = cat.name;
            categorySelect.appendChild(opt);
        });
    } catch (error) {
        alert(`Fehler: ${error.message}`);
    }
}

populateCategories();

/**
 * Entfernt das JWT-Token aus dem lokalen Speicher und leitet den Nutzer zur Login-Seite.
 */
function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "./login.html";
}
