function redirectLogin() {
    const token = localStorage.getItem('jwt')
    if (!token) window.location.href = "./login.html"
    return;
}

redirectLogin()

