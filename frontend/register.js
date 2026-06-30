async function register() {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://codealpha-tasks-apqo.onrender.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await res.text();

    alert(data);

    if (data === "User registered successfully") {
    alert("Registration Successful! Please login.");
    window.location.href = "index.html";
}
}