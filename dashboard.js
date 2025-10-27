// Check session
const session = JSON.parse(localStorage.getItem("ticketapp_session"));
if (!session) {
  alert("Your session has expired — please log in again.");
  window.location.href = "auth/login.html";
}

// Display user name
document.getElementById("welcomeUser").textContent = `Welcome back, ${session.user}!`;

// Fetch tickets
const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
document.getElementById("totalTickets").textContent = tickets.length;

// Count open/closed
const open = tickets.filter(t => t.status === "open").length;
const closed = tickets.filter(t => t.status === "closed").length;
document.getElementById("openTickets").textContent = open;
document.getElementById("closedTickets").textContent = closed;

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("ticketapp_session");
  alert("You have been logged out.");
  window.location.href = "index.html";
});