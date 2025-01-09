const API_BASE_URL = "http://localhost:3000/api";

// Utility functions
const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const { token } = await response.json();
    return token;
  } catch (error) {
    throw error;
  }
};

const isLoggedIn = () => !!localStorage.getItem("token");

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "index.html"; // Redirect to login
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  if (currentPath.endsWith("index.html")) {
    // Login page logic
    if (isLoggedIn()) {
      window.location.href = "home.html"; // Redirect to home if already logged in
      return;
    }

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        document.getElementById("error").textContent = "Username and password are required.";
        return;
      }

      try {
        const token = await login(username, password);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        window.location.href = "home.html"; // Redirect to home page
      } catch (err) {
        document.getElementById("error").textContent = err.message;
      }
    });
  } else if (currentPath.endsWith("home.html")) {
    // Home page logic
    if (!isLoggedIn()) {
      window.location.href = "index.html"; // Redirect to login if not logged in
      return;
    }

    const username = localStorage.getItem("username");
    document.getElementById("welcomeMessage").textContent = `Welcome, ${username}!`;

    document.getElementById("logoutButton").addEventListener("click", logout);

    document.getElementById("markAttendanceButton").addEventListener("click", () => {
      alert("Navigating to Mark Attendance Page...");
    });

    document.getElementById("viewAttendanceButton").addEventListener("click", () => {
      alert("Navigating to View Attendance Page...");
    });
  }
});
