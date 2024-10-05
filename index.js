// Registration form validation
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const terms = document.getElementById('terms');
const errorDisplay = document.getElementById('errorDisplay');

// Registration form submission event listener
document.getElementById('registration').addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the form from being submitted automatically

    clearErrors(); // Clear any previous error messages

    // Validate each input and stop if there's an error
    if (!validateUsername(username.value)) return username.focus();
    if (!validateEmail(email.value)) return email.focus();
    if (!validatePassword(password.value, username.value)) return password.focus();
    if (!terms.checked) return displayError('You must agree to the Terms of Use.');

    // Save user data if everything is valid
    storeUser(username.value, email.value, password.value);

    // Reset the form and show success message
    event.target.reset();
    displaySuccess('Registration successful!');
});

// Function to clear error messages
function clearErrors() {
    errorDisplay.style.display = 'none';
    errorDisplay.textContent = '';
}

// Function to show error messages
function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
}

// Function to show success messages
function displaySuccess(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
    errorDisplay.style.color = 'green';
    errorDisplay.style.fontWeight = 'bold';
}

// Username validation
function validateUsername(username) {
    if (username === "") {
        displayError("Username cannot be blank.");
        return false;
    }
    if (username.length < 4) {
        displayError("Username must be at least 4 characters long.");
        return false;
    }
    const uniqueChars = new Set(username);
    if (uniqueChars.size < 2) {
        displayError("Username must have at least 2 unique characters.");
        return false;
    }
    if (/[^a-zA-Z0-9]/.test(username)) {
        displayError("Username can only have letters and numbers.");
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username.toLowerCase()]) {
        displayError("This username is already taken.");
        return false;
    }

    return true;
}

// Email validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayError("Please enter a valid email address.");
        return false;
    }
    if (email.endsWith("@example.com")) {
        displayError("Email cannot be from 'example.com'.");
        return false;
    }

    return true;
}

// Password validation
function validatePassword(password, username) {
    if (password.length < 12) {
        displayError("Password must be at least 12 characters long.");
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        displayError("Password must have at least one uppercase letter.");
        return false;
    }
    if (!/[a-z]/.test(password)) {
        displayError("Password must have at least one lowercase letter.");
        return false;
    }
    if (!/[0-9]/.test(password)) {
        displayError("Password must have at least one number.");
        return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
        displayError("Password must have at least one special character.");
        return false;
    }
    if (password.toLowerCase().includes("password")) {
        displayError("Password cannot contain the word 'password'.");
        return false;
    }
    if (password.toLowerCase().includes(username.toLowerCase())) {
        displayError("Password cannot contain the username.");
        return false;
    }

    return true;
}

// Store user data in localStorage
function storeUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[username.toLowerCase()] = { email: email.toLowerCase(), password: password };
    localStorage.setItem('users', JSON.stringify(users));
}

// Login form validation
const loginForm = document.getElementById('login');
const loginUsername = loginForm.querySelector('input[name="username"]');
const loginPassword = loginForm.querySelector('input[name="password"]');
const keepLoggedIn = loginForm.querySelector('input[name="persist"]');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the form from submitting

    clearErrors(); // Clear previous errors

    // Validate login inputs
    if (!validateLoginUsername(loginUsername.value)) return loginUsername.focus();
    if (!validateLoginPassword(loginUsername.value, loginPassword.value)) return loginPassword.focus();

    // Reset login form
    loginUsername.value = '';
    loginPassword.value = '';

    // Show success message based on "Keep me logged in" checkbox
    if (keepLoggedIn.checked) {
        displaySuccess("Login successful! (Keep me logged in selected)");
    } else {
        displaySuccess("Login successful! (Keep me logged in NOT selected)");
    }
});

// Validate login username
function validateLoginUsername(username) {
    if (username === "") {
        displayError("Username cannot be blank.");
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username.toLowerCase()]) {
        displayError("Username does not exist.");
        return false;
    }

    return true;
}

// Validate login password
function validateLoginPassword(username, password) {
    if (password === "") {
        displayError("Password cannot be blank.");
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const storedUser = users[username.toLowerCase()];
    if (!storedUser || storedUser.password !== password) {
        displayError("Incorrect password.");
        return false;
    }

    return true;
}
