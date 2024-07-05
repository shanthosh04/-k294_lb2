// Die Code Kommentare wurde selber geschrieben, aber dafür mit hilfe Chatgpt abgeändert und profisionneler geschrieben
// Initialisierung des Registrierungsformulars und Event-Listener hinzufügen
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Überprüfen, ob Benutzername und Passwort eingegeben wurden
    if (!username || !password) {
        alert("Bitte Benutzernamen und Passwort eingeben!");
        return;
    }

    // Überprüfen, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        alert("Passwörter stimmen nicht überein!");
        return;
    }

    await register(username, password);
});

// Funktion zur Handhabung der Registrierung
async function register(username, password) {
    try {
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();

        // Weiterleitung zur Anmeldeseite bei erfolgreicher Registrierung
        if (data.id) {
            window.location.href = './login.html';
            return;
        } else {
            alert("Registrierung fehlgeschlagen");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Ein Fehler ist bei der Registrierung aufgetreten");
    }
}

// Funktion zur automatischen Weiterleitung, wenn bereits eingeloggt
function redirectHome() {
    const token = localStorage.getItem('jwt');
    if (token) {
        window.location.href = "./index.html";
        return;
    }
}

redirectHome();
