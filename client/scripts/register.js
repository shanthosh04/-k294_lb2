// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// Initialisierung des Registrierungsformulars und Event-Listener hinzufügen
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async event => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const username = document.getElementById('username').value; // Liest den Benutzernamen aus
    const password = document.getElementById('password').value; // Liest das Passwort aus
    const confirmPassword = document.getElementById('confirm-password').value; // Liest das Bestätigungspasswort aus

    // Überprüfen, ob Benutzername und Passwort eingegeben wurden
    if (!username || !password) {
        alert("Bitte Benutzernamen und Passwort eingeben!"); // Meldung bei fehlenden Eingaben
        return; // Beendet die Funktion
    }

    // Überprüfen, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        alert("Passwörter stimmen nicht überein!"); // Meldung bei nicht übereinstimmenden Passwörtern
        return; // Beendet die Funktion
    }

    await register(username, password); // Ruft die Registrierungsfunktion auf
});

// Funktion zur Handhabung der Registrierung
async function register(username, password) {
    try {
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST', // Setzt die HTTP-Methode auf POST
            headers: {
                accept: "application/json", // Akzeptiert JSON-Antworten
                'Content-Type': 'application/json', // Setzt den Content-Type Header
            },
            body: JSON.stringify({
                username, // Sendet den Benutzernamen im Request-Body
                password // Sendet das Passwort im Request-Body
            })
        });

        const data = await res.json(); // Konvertiert die Antwort in JSON

        // Weiterleitung zur Anmeldeseite bei erfolgreicher Registrierung
        if (data.id) {
            window.location.href = './login.html'; // Leitet zur Login-Seite weiter
            return; // Beendet die Funktion
        } else {
            alert("Registrierung fehlgeschlagen"); // Meldung bei fehlgeschlagener Registrierung
        }
    } catch (error) {
        console.error('Error:', error); // Fehlerprotokollierung
        alert("Ein Fehler ist bei der Registrierung aufgetreten"); // Meldung bei Fehler
    }
}

// Funktion zur automatischen Weiterleitung, wenn bereits eingeloggt
function redirectHome() {
    const token = localStorage.getItem('jwt'); // Liest das JWT aus dem localStorage
    if (token) {
        window.location.href = "./index.html"; // Leitet zur Hauptseite weiter, wenn ein Token vorhanden ist
        return; // Beendet die Funktion
    }
}

redirectHome(); // Ruft die Funktion zur Überprüfung auf
