document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signUpForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      message.textContent = "❌ Passwords do not match.";
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      message.textContent = "❌ Please fill out all fields.";
      return;
    }

    // Simulate success
    message.textContent = "✅ Sign up successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
});
