document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Example hardcoded credentials
    if (email === "user@example.com" && password === "1234") {
      message.textContent = "Login successful!";
      window.location.href = "home.html"; // Simulate login redirect
    } else {
      message.textContent = "Invalid email or password.";
    }
  });
});
