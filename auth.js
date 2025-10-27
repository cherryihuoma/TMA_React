// Helper function to show a toast message
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = type === "error" ? "#e74c3c" : "#0077ff";
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

// SIGNUP LOGIC
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!fullname || !email || !password) {
      showToast("All fields are required.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const exists = users.find(u => u.email === email);
    if (exists) {
      showToast("Email already exists.", "error");
      return;
    }

    users.push({ fullname, email, password });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    showToast("Account created successfully!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
}

// LOGIN LOGIC
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showToast("Invalid email or password.", "error");
      return;
    }

    // Simulated session
    localStorage.setItem("ticketapp_session", JSON.stringify({
      user: user.fullname,
      email: user.email,
      token: Date.now()
    }));

    showToast("Login successful!");
    setTimeout(() => {
      window.location.href = "../dashboard.html";
    }, 1500);
  });
}