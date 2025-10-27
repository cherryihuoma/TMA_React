// Session check
const session = JSON.parse(localStorage.getItem("ticketapp_session"));
if (!session) {
  alert("Please log in first.");
  window.location.href = "auth/login.html";
}

const form = document.getElementById("ticketForm");
const ticketsContainer = document.getElementById("ticketsContainer");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// Render Tickets
function renderTickets(filterText = "", status = "", priority = "") {
  ticketsContainer.innerHTML = "";

  const filtered = tickets.filter((t) => {
    const matchesText =
      t.title.toLowerCase().includes(filterText.toLowerCase()) ||
      t.description.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = status ? t.status === status : true;
    const matchesPriority = priority ? t.priority === priority : true;
    return matchesText && matchesStatus && matchesPriority;
  });

  if (filtered.length === 0) {
    ticketsContainer.innerHTML = "<p>No matching tickets found.</p>";
    return;
  }

  filtered.forEach((ticket, index) => {
    const card = document.createElement("div");
    card.classList.add("ticket-card");

    card.innerHTML = `
      <h3>${ticket.title}</h3>
      <p class="ticket-meta">
        Priority: <strong>${ticket.priority}</strong> |
        Status: <strong>${ticket.status}</strong>
      </p>
      <p>${ticket.description}</p>
      <div class="ticket-actions">
        <button class="status-btn" onclick="toggleStatus(${index})">Toggle Status</button>
        <button class="edit-btn" onclick="editTicket(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTicket(${index})">Delete</button>
      </div>
    `;

    ticketsContainer.appendChild(card);
  });
}

// Add Ticket
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;

  if (!title || !description || !priority) {
    alert("Please fill out all fields.");
    return;
  }

  tickets.push({
    title,
    description,
    priority,
    status: "open",
  });

  localStorage.setItem("tickets", JSON.stringify(tickets));
  form.reset();
  renderTickets(searchInput.value, statusFilter.value, priorityFilter.value);
});

// Edit Ticket
window.editTicket = (index) => {
  const ticket = tickets[index];
  document.getElementById("title").value = ticket.title;
  document.getElementById("description").value = ticket.description;
  document.getElementById("priority").value = ticket.priority;

  tickets.splice(index, 1);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets(searchInput.value, statusFilter.value, priorityFilter.value);
};

// Delete Ticket
window.deleteTicket = (index) => {
  if (confirm("Delete this ticket?")) {
    tickets.splice(index, 1);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    renderTickets(searchInput.value, statusFilter.value, priorityFilter.value);
  }
};

// Toggle Status
window.toggleStatus = (index) => {
  tickets[index].status =
    tickets[index].status === "open"
      ? "closed"
      : tickets[index].status === "closed"
      ? "in_progress"
      : "open";
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets(searchInput.value, statusFilter.value, priorityFilter.value);
};

// Filters + Search
searchInput.addEventListener("input", () =>
  renderTickets(searchInput.value, statusFilter.value, priorityFilter.value)
);
statusFilter.addEventListener("change", () =>
  renderTickets(searchInput.value, statusFilter.value, priorityFilter.value)
);
priorityFilter.addEventListener("change", () =>
  renderTickets(searchInput.value, statusFilter.value, priorityFilter.value)
);

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("ticketapp_session");
  alert("Logged out successfully.");
  window.location.href = "index.html";
});

// Initial render
renderTickets();