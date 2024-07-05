// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// DOM-Element für das Kategorie-Formular und JWT-Token aus dem lokalen Speicher abrufen
const createCategorie = document.getElementById('create-categorie');
const token = localStorage.getItem("jwt");
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

// Event-Listener für das Formular, um das Absenden zu verarbeiten
createCategorie.addEventListener('submit', async event => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const name = document.getElementById('name').value; // Ruft den Wert des Name-Felds ab

    // Prüft, ob der Kategoriename eingegeben wurde
    if (!name) {
        alert("Bitte geben Sie einen Kategoriennamen ein");
        return; // Beendet die Funktion, wenn kein Name eingegeben wurde
    }

    try {
        await categorie(name); // Ruft die Funktion zur Erstellung/Bearbeitung der Kategorie auf
        if (id) {
            alert("Kategorie bearbeitet"); // Meldung bei erfolgreicher Bearbeitung
        } else {
            alert("Kategorie erstellt"); // Meldung bei erfolgreicher Erstellung
        }
    } catch (error) {
        console.error("Fehler beim Hinzufügen der Kategorie:", error); // Fehlerprotokollierung
        alert("Fehler beim Hinzufügen der Kategorie: " + error.message); // Fehlermeldung an den Benutzer
    }
});

/**
 * Erstellt oder aktualisiert eine Kategorie auf dem Server.
 * @param {string} name - Der Name der Kategorie.
 */
async function categorie(name) {
    const url = id ? `http://localhost:3000/categories/${id}` : `http://localhost:3000/categories`; // URL je nach Aktion (erstellen oder bearbeiten)
    const method = id ? 'PUT' : 'POST'; // HTTP-Methode je nach Aktion

    try {
        const res = await fetch(url, {
            method, // Verwendet die Methode (POST/PUT)
            headers: {
                "Content-Type": "application/json", // Setzt den Content-Type Header
                Authorization: `Bearer ${token}`, // Fügt das JWT-Token für die Authentifizierung hinzu
            },
            body: JSON.stringify({ name }) // Sendet den Kategorienamen im Request-Body
        });

        if (res.status === 403) {
            alert("Du bist nicht berechtigt!"); // Meldung bei fehlender Berechtigung
            return; // Beendet die Funktion
        }

        if (!res.ok) {
            const message = await res.text(); // Liest die Fehlermeldung aus der Antwort
            throw new Error(message); // Wirft einen Fehler mit der Nachricht
        }
    } catch (error) {
        throw new Error(error.message); // Wirft den Fehler weiter
    }
}

/**
 * Lädt Kategoriedetails vom Server.
 */
async function getCategory() {
    const res = await fetch(`http://localhost:3000/categories/${id}`); // Sendet eine GET-Anfrage an den Server
    const data = await res.json(); // Konvertiert die Antwort in JSON

    console.log(data); // Gibt die Antwort in der Konsole aus

    if (data.message) {
        alert(data.message); // Meldet eine Nachricht an den Benutzer
        return; // Beendet die Funktion
    }

    return data; // Gibt die Daten zurück
}

/**
 * Füllt die Eingabefelder basierend auf der geladenen Kategorie.
 */
async function populateInputFields() {
    const category = await getCategory(); // Ruft die Kategoriedaten ab
    const nameInput = document.getElementById('name'); // Referenz zum Name-Feld

    nameInput.value = category.name; // Setzt den Wert des Name-Felds
}

// Lädt die Kategorie-Details, wenn eine ID vorhanden ist
if (id) {
    populateInputFields(); // Füllt die Eingabefelder, wenn eine ID vorhanden ist
}

/**
 * Entfernt das JWT-Token aus dem lokalen Speicher und leitet den Nutzer zur Login-Seite.
 */
function logout() {
    localStorage.removeItem("jwt"); // Entfernt das JWT-Token aus dem lokalen Speicher
    window.location.href = "./login.html" // Leitet zur Login-Seite weiter
}
