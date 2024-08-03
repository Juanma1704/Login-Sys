document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.text();
    
    if (response.status === 200) {
        message.textContent = data;
        message.style.color = "green";
    } else {
        message.textContent = data;
        message.style.color = "red";
    }
});

document.getElementById('registerButton').addEventListener('click', async function() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const registerMessage = document.getElementById('registerMessage');

    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, password: newPassword })
    });

    const data = await response.text();

    if (response.status === 201) {
        registerMessage.textContent = data;
        registerMessage.style.color = "green";
        document.getElementById('registerForm').reset(); // Limpiar el formulario
    } else {
        registerMessage.textContent = data;
        registerMessage.style.color = "red";
    }
});