const jsonlink = "https://jsonplaceholder.typicode.com/users";
const grid = document.querySelector(".grid");
const loader = document.getElementById("loader");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const searchInput = document.querySelector(".search-input");
let usersData = [];

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError(msg) {
  errorContainer.style.display = "block";
  errorMessage.textContent = msg;
}

function getInitials(name) {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
}

function formatAddress(address) {
  return `${address.street}, ${address.suite}<br />${address.city}`;
}

function createCard(user) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header">
      <div class="card-avatar">${getInitials(user.name)}</div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${user.name}</h3>
      <p class="card-username">@${user.username}</p>

      <div class="card-details">
        <p class="card-details-title">Address</p>
        <p class="card-address">${formatAddress(user.address)}</p>
      </div>

      <div class="card-details">
        <p class="card-details-title">Company</p>
        <p class="card-company">${user.company.name}</p>
      </div>
    </div>
  `;

  return card;
}

function renderUsers(users) {
  grid.innerHTML = "";
  users.forEach(user => {
    grid.appendChild(createCard(user));
  });
}

function fetchUsers() {
  showLoader();
  fetch(jsonlink)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch users.");
      return res.json();
    })
    .then(data => {
      usersData = data;
      renderUsers(usersData);
    })
    .catch(err => {
      showError(err.message);
    })
    .finally(() => {
      hideLoader();
    });
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = usersData.filter(user =>
    user.name.toLowerCase().includes(value)
  );
  renderUsers(filtered);
});

fetchUsers();
