// User data storage
const userData = [];

// Get the message screen and welcome message element by ID
const messageScreen = document.getElementById("messageScreen");
const welcomeMessage = document.getElementById("welcomeMessage");

// Function to show the message screen
function showMessage(message) {
  messageScreen.classList.remove("hidden");
  welcomeMessage.textContent = message;
}

// Function to hide the message screen
function hideMessage() {
  messageScreen.classList.add("hidden");
}

// Function to show the Login form and activate the Login tab
function showLoginForm() {
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("forgotForm").style.display = "none";
}

// Function to show the Registration form and activate the Register tab
function showRegisterForm() {
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.add("active");
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("forgotForm").style.display = "none";
}

// Function to show the Forgot Password form
function showForgotForm() {
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.remove("active");
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("forgotForm").style.display = "block";
  hideMessage(); // Hide the message screen when switching to the Forgot Password form
}

// Function to register a user
function register() {
  event.preventDefault();

  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (email === "" || password === "") {
    alert("Please fill in both email and password fields.");
    return;
  }

  // Check if the email contains the "@" symbol
  if (!email.includes("@")) {
    alert("Invalid email format. Please enter a valid email address.");
    return;
  }
  
  const user = { username, email, password };
  userData.push(user);

  alert(email + " Thanks for registration. Try to login now.");
  document.getElementById("registerUsername").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";
  showLoginForm(); // Switch to the Login form after successful registration
}

// Function to perform login
function login() {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (username === "" || password === "") {
    alert("Please fill in both username and password fields.");
    return;
  }

  const user = userData.find((u) => u.username === username && u.password === password);

  if (user) {
    showMessage("Welcome, " + username +" Lets Explore my Website https://www.techshabs.com");
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
  } else {
    alert("Invalid username or password.");
  }
}


// Function to send a reset password link
function forgotPassword() {
  event.preventDefault();

  const email = document.getElementById("forgotEmail").value;

  if (email === "") {
    alert("Please enter your email.");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email format. Please enter a valid email address.");
    return;
  }

  const user = userData.find((u) => u.email === email);

  if (user) {
    alert("Password reset link sent to your email.");
    document.getElementById("forgotEmail").value = "";
  } else {
    alert("Email not found in our records.");
  }
}

// Event listeners for registration, login, and message screen
document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("loginButton").addEventListener("click", login);


// Initial state: Show the Login form by default
showLoginForm();



// Function to show Privacy Policy content
function showPrivacyPolicy() {
  document.getElementById("privacyPolicyInfo").classList.remove("hidden");
  document.getElementById("passwordRulesInfo").classList.add("hidden");
}

// Function to show Password Rules content
function showPasswordRules() {
  document.getElementById("privacyPolicyInfo").classList.add("hidden");
  document.getElementById("passwordRulesInfo").classList.remove("hidden");
}


// Add event listeners for the privacy policy and password rules links
document.getElementById("privacyPolicyLink").addEventListener("click", showPrivacyPolicy);
document.getElementById("passwordRulesLink").addEventListener("click", showPasswordRules);
