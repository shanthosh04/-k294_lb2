// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// DOM-Element für das Kategorie-Formular und JWT-Token aus dem lokalen Speicher abrufen
const createCategorie = document.getElementById('create-categorie');
const token = localStorage.getItem("jwt");
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

// Event-Listener für das Formular, um das Absenden zu verarbeiten
createCategorie.addEventListener('submit', async event => {
    event.preventDefault();

    const name = document.getElementById('name').value;

    // Prüft, ob der Kategoriename eingegeben wurde
    if (!name) {
        alert("Bitte geben Sie einen Kategoriennamen ein");
        return;
    }

    try {
        await categorie(name);
        if (id) {
            alert("Kategorie bearbeitet");
        } else {
            alert("Kategorie erstellt");
        }
    } catch (error) {
        console.error("Fehler beim Hinzufügen der Kategorie:", error);
        alert("Fehler beim Hinzufügen der Kategorie: " + error.message);
    }
});

/**
 * Erstellt oder aktualisiert eine Kategorie auf dem Server.
 * @param {string} name - Der Name der Kategorie.
 */
async function categorie(name) {
    const url = id ? `http://localhost:3000/categories/${id}` : `http://localhost:3000/categories`;
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name })
        });

        if (res.status === 403) {
            alert("Du bist nicht berechtigt!");
            return;
        }

        if (!res.ok) {
            const message = await res.text();
            throw new Error(message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Lädt Kategoriedetails vom Server.
 */
async function getCategory() {
    const res = await fetch(`http://localhost:3000/categories/${id}`);
    const data = await res.json();

    console.log(data);

    if (data.message) {
        alert(data.message);
        return;
    }

    return data;
}

/**
 * Füllt die Eingabefelder basierend auf der geladenen Kategorie.
 */
async function populateInputFields() {
    const category = await getCategory();
    const nameInput = document.getElementById('name');

    nameInput.value = category.name;
}

// Lädt die Kategorie-Details, wenn eine ID vorhanden ist
if (id) {
    populateInputFields();
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "./login.html"
}