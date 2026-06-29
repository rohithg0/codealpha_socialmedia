async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://codealpha-tasks-apqo.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await res.json();

    if (data.success) {

        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.username);

        alert("Login Successful");

        window.location.href = "home.html";

    } else {
        alert(data.message);
    }
}