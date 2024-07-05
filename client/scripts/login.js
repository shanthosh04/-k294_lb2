// Initialisierung des Login-Formulars und Event-Listener hinzufügen
// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async event => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const username = document.getElementById('username').value; // Liest den Benutzernamen aus
    const password = document.getElementById('password').value; // Liest das Passwort aus

    // Überprüfen, ob Benutzername und Passwort eingegeben wurden
    if (!username || !password) {
        alert("Bitte Benutzernamen und Passwort eingeben!"); // Meldung bei fehlenden Eingaben
        return;  // Verhindert die Ausführung der nächsten Zeile, wenn die Bedingung wahr ist
    }
    await login(username, password); // Ruft die Login-Funktion auf
});

// Funktion, die den Login-Prozess handhabt
async function login(username, password) {
    const res = await fetch('http://localhost:3000/login', {
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
    localStorage.setItem('jwt', data.token); // Speichert das JWT im localStorage

    // Weiterleitung zum Hauptbereich, wenn der Login erfolgreich war
    if (data.token) {
        window.location.href = './index.html'; // Leitet zur Hauptseite weiter
        return; // Beendet die Funktion
    }

    alert("Login fehlgeschlagen"); // Meldung bei fehlgeschlagenem Login
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
