var btn = document.getElementById("signupButton");
var errorText = document.getElementById("errorInfo");
function signup(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Perform input validation
    if (username === "" || password === "" || confirmPassword === "") {
      errorText.innerHTML = "Please fill in all fields.";
      return;
    }

    // Perform input validation
    if (password !== confirmPassword) {
      errorText.innerHTML = "Passwords do not match or exists.";
      return;
    }

    // save username to local storage
    localStorage.setItem("username", username);
    // Save password to local storage
    localStorage.setItem("password", password);

    window.location.href = "login.html"; // Uncomment to redirect to another page after successful sign-up

  }

  btn.addEventListener("click", signup);
