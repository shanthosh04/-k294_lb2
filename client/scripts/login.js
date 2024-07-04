// Initialisierung des Login-Formulars und Event-Listener hinzufügen
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Überprüfen, ob Benutzername und Passwort eingegeben wurden
    if (!username || !password) {
        alert("Bitte Benutzernamen und Passwort eingeben!");
        return;  // Verhindert die Ausführung der nächsten Zeile, wenn die Bedingung wahr ist
    }
    await login(username, password);
});

// Funktion, die den Login-Prozess handhabt
async function login(username, password) {
    const res = await fetch('http://localhost:3000/login', {
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
    localStorage.setItem('jwt', data.token);

    // Weiterleitung zum Hauptbereich, wenn der Login erfolgreich war
    if (data.token) {
        window.location.href = './index.html';
        return;
    }

    alert("Login fehlgeschlagen");
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
