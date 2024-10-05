document
  .getElementById("registration")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = event.target.username.value;

    if (username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
      displayError("Invalid username");
      return;
    }

    // Store data if validation passes
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
      // Store user and clear form
    } else {
      displayError("That username is already taken");
    }
  });

function displayError(message) {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.style.display = "block";
  errorDisplay.textContent = message;
}

// Validation for at least 2 unique characters
const uniqueChars = new Set(username).size;
if (uniqueChars < 2) {
  displayError(
    "Username must contain at least 2 unique characters.",
    event.target.username
  );
  valid = false;
}
