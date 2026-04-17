const API = "https://69d914660576c938825a7fca.mockapi.io/users/users";

function cadastrar() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(() => {
        alert("Usuário cadastrado!");
        window.location.href = "index.html";
    });
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(API)
    .then(res => res.json())
    .then(users => {
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "home.html";
        } else {
            alert("Login inválido!");
        }
    });
}

function carregarUsuarios() {
    fetch(API)
    .then(res => res.json())
    .then(users => {
        const lista = document.getElementById("lista");

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            lista.appendChild(li);
        });
    });
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

if (window.location.pathname.includes("home.html")) {
    carregarUsuarios();
}