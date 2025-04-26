function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username !== "" && password !== "") {
      alert("Login successful. Redirecting to the main page.");
      window.location.href = "index.html";
    } else {
      alert("Please enter both username and password.");
    }
  }
  