// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// Token aus dem lokalen Speicher holen, der für die Authentifizierung bei der API verwendet wird
const token = localStorage.getItem('jwt');
const form = document.getElementById('reset-password');

// Event-Listener hinzufügen, um das Formular für das Zurücksetzen des Passworts zu verarbeiten
form.addEventListener('submit', async function(event) {
    event.preventDefault();  // Verhindert, dass das Formular auf herkömmliche Weise gesendet wird

    const formData = new FormData(this); // Erstellt ein FormData-Objekt aus dem Formular
    const data = {}; // Initialisiert ein leeres Objekt zum Speichern der Formulardaten
    
    // Überprüft, ob alle Felder des Formulars ausgefüllt wurden
    formData.forEach((value, key) => {
        if (!value) {
            alert("Bitte füllen Sie alle Eingabefelder aus!");
            return;  // Beendet die Funktion frühzeitig, wenn ein Feld leer ist
        }
        data[key] = value;  // Fügt jedes Schlüssel-Wert-Paar zum Datenobjekt hinzu
    });

    // Sendet die Anfrage zum Zurücksetzen des Passworts an den Server
    try {
        const response = await fetch(`http://localhost:3000/reset-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // Fügt das JWT für die Autorisierung hinzu
            },
            body: JSON.stringify(data),  // Konvertiert das Datenobjekt in einen JSON-String
        });

        // Überprüft die Antwort vom Server
        if (response.ok) {
            alert("Ihr Passwort wurde erfolgreich zurückgesetzt.");
        } else {
            const errorMsg = await response.text();  // Liest die Fehlermeldung aus der Antwort
            alert(`Fehler beim Zurücksetzen des Passworts: ${errorMsg}`);
        }
    } catch (error) {
        alert(`Netzwerkfehler: ${error.message}`);
    }
});

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "./login.html"
}