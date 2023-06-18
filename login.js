var loginbtn = document.getElementById("loginButton");
var errorInfo = document.getElementById("errorLoginInfo");

function login(event) {
event.preventDefault(); // Prevent form submission

// Retrieve input values
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

// Get password and username from local storage
var storedUsername = localStorage.getItem("username");
var storedPassword = localStorage.getItem("password");

// Perform input validation
if (username === "" || password === "") {
errorInfo.innerHTML = "Please fill in all fields.";
return;
}
if (username !== storedUsername) {
errorInfo.innerHTML = "Username does not match.";
return;
}
if (password !== storedPassword) {
errorInfo.innerHTML = "Password does not match.";
return;
}

// Redirect to options page
window.location.href = "options.html";
}

// login button event handler
loginbtn.addEventListener("click", login);

