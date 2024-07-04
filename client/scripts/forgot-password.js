const token = localStorage.getItem('jwt')
const form = document.getElementById('reset-password')

form.addEventListener('submit', async function(event) {
    event.preventDefault()

    const formData = new FormData(this);
    const data = {};
    
    formData.forEach((value, key) => {
        if (!value) {
            alert("Please fill in all the inputs!");
            return;
        }
        data[key] = value;
    });

    const res = await fetch(`http://localhost:3000/reset-password`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });


})