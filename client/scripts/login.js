const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async event => {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value


    if (!username || !password) alert("Please enter username or password!")
    await login(username, password)

    
})

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
    })

    const data = await res.json()
    localStorage.setItem('jwt', data.token)
}


