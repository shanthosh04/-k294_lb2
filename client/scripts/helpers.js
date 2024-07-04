/**
 * Überprüft, ob ein Benutzer eingeloggt ist (über JWT im localStorage).
 * Leitet den Benutzer zur Login-Seite um, wenn kein Token vorhanden ist.
 */
function redirectLogin() {
    const token = localStorage.getItem('jwt'); // Liest das JWT aus dem localStorage
    if (!token) {
        window.location.href = "./login.html"; // Umleitung zur Login-Seite, wenn kein Token vorhanden ist
    }
    return;
}

// Ruft die Funktion redirectLogin sofort auf, um sicherzustellen, dass der Benutzer eingeloggt ist.
redirectLogin();
