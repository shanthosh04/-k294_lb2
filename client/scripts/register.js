const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please enter username or password!");
        return;
    }

    await register(username, password);
});

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

        const data = await res.json()

        if (data.id) {
            window.location.href = './login.html'
            return
        } else {
            alert("Registration failed");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred during registration");
    }
}
