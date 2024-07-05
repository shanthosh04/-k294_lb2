// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// DOM-Elemente für das Produktformular und Kategorie-Auswahlmenü initialisieren
const productForm = document.getElementById('product-form');
const categorySelect = document.getElementById('categoryId');

// URL-Parameter extrahieren, um die Produkt-ID zu erhalten
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');
const token = localStorage.getItem("jwt");

// Event-Listener für das Produktformular
productForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars
    
    const formData = new FormData(this); // Erstellt ein FormData-Objekt aus dem Formular
    const data = {}; // Initialisiert ein leeres Objekt zum Speichern der Formulardaten
    
    // Übertragen der Formulardaten in ein JSON-Objekt, Überprüfung auf leere Felder
    formData.forEach((value, key) => {
        if (!value) {
            alert("Bitte füllen Sie alle Eingabefelder aus!"); // Meldung bei fehlenden Eingaben
            return; // Beendet die Funktion
        }
        data[key] = value; // Fügt die Formulardaten zum Objekt hinzu
    });

    try {
        await createOrUpdateProduct(data); // Ruft die Funktion zur Erstellung/Bearbeitung des Produkts auf
        window.location.href = "./index.html"; // Leitet zur Hauptseite weiter
    } catch (error) {
        alert(`Fehler: ${error.message}`); // Meldung bei Fehler
    }
});

/**
 * Erstellt oder aktualisiert ein Produkt auf dem Server.
 * @param {Object} product - Das Produkt-Objekt.
 */
async function createOrUpdateProduct(product) {
    const url = id ? `http://localhost:3000/products/${id}` : `http://localhost:3000/products`; // URL je nach Aktion (erstellen oder bearbeiten)
    const method = id ? 'PUT' : 'POST'; // HTTP-Methode je nach Aktion

    try {
        const res = await fetch(url, {
            method, // Verwendet die Methode (POST/PUT)
            headers: {
                "Content-Type": "application/json", // Setzt den Content-Type Header
                Authorization: `Bearer ${token}`, // Fügt das JWT-Token für die Authentifizierung hinzu
            },
            body: JSON.stringify(product), // Sendet das Produktobjekt im Request-Body
        });

        if (res.status === 403) {
            alert("Sie sind nicht berechtigt!"); // Meldung bei fehlender Berechtigung
            return; // Beendet die Funktion
        }

        if (!res.ok) {
            const message = await res.text(); // Liest die Fehlermeldung aus der Antwort
            throw new Error(message); // Wirft einen Fehler mit der Nachricht
        }

        return await res.json(); // Gibt die Antwort als JSON zurück
    } catch (error) {
        throw new Error(error.message); // Wirft den Fehler weiter
    }
}

/**
 * Ruft die Produktdetails vom Server ab.
 * @returns {Object|null} - Das Produkt-Objekt oder null bei Fehler.
 */
async function getProduct() {
    if (id) {
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Fügt das JWT-Token für die Authentifizierung hinzu
                }
            });

            if (!res.ok) {
                const message = await res.text(); // Liest die Fehlermeldung aus der Antwort
                throw new Error(message); // Wirft einen Fehler mit der Nachricht
            }

            const data = await res.json(); // Konvertiert die Antwort in JSON

            if (data.message) {
                alert(data.message); // Meldet eine Nachricht an den Benutzer
                return null; // Gibt null zurück, wenn eine Nachricht vorhanden ist
            }

            return data; // Gibt die Daten zurück
        } catch (error) {
            alert(`Error: ${error.message}`); // Meldet einen Fehler
            return null; // Gibt null zurück bei Fehler
        }
    }
    return null; // Gibt null zurück, wenn keine ID vorhanden ist
}

/**
 * Lädt Produktdetails und füllt die Formularfelder damit aus.
 */
async function populateInputFields() {
    const product = await getProduct(); // Ruft die Produktdaten ab
    if (product) {
        document.getElementById('name').value = product.name || ""; // Setzt den Wert des Name-Felds
        document.getElementById('price').value = product.price || ""; // Setzt den Wert des Preis-Felds
        document.getElementById('image').value = product.image || ""; // Setzt den Wert des Bild-URL-Felds
        document.getElementById('categoryId').value = product.categoryId || ""; // Setzt den Wert des Kategorie-Auswahlmenüs
    }
}

// Füllt die Eingabefelder, wenn eine ID vorhanden ist
if (id) {
    populateInputFields();
}

/**
 * Lädt die Kategorieliste und füllt das Kategorie-Auswahlmenü.
 */
async function populateCategories() {
    try {
        const res = await fetch(`http://localhost:3000/categories`); // Sendet eine GET-Anfrage an den Server
        if (!res.ok) {
            const message = await res.text(); // Liest die Fehlermeldung aus der Antwort
            throw new Error(message); // Wirft einen Fehler mit der Nachricht
        }
        const categories = await res.json(); // Konvertiert die Antwort in JSON

        categories.forEach(cat => {
            const opt = document.createElement('option'); // Erstellt ein neues Option-Element
            opt.value = cat.id; // Setzt den Wert des Option-Elements
            opt.text = cat.name; // Setzt den Text des Option-Elements
            categorySelect.appendChild(opt); // Fügt das Option-Element zum Auswahlmenü hinzu
        });
    } catch (error) {
        alert(`Fehler: ${error.message}`); // Meldet einen Fehler
    }
}

// Füllt das Kategorie-Auswahlmenü beim Laden der Seite
populateCategories();

/**
 * Entfernt das JWT-Token aus dem lokalen Speicher und leitet den Nutzer zur Login-Seite.
 */
function logout() {
    localStorage.removeItem("jwt"); // Entfernt das JWT-Token aus dem lokalen Speicher
    window.location.href = "./login.html"; // Leitet zur Login-Seite weiter
}
