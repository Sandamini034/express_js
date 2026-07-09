const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

document.getElementById("show-signup").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "flex";
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "flex";
});

// --- LOGIN ---
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = loginForm.querySelector('input[name="username"]');
  const password = loginForm.querySelector('input[name="password"]');
  const error = loginForm.querySelector("p");

  setTimeout(() => {
    error.textContent = "";
  }, 3000);

  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.textContent = data.error || "Something went wrong";
      error.style.color = "red";
    } else {
      username.value = "";
      password.value = "";

      error.textContent = data.message;
      error.style.color = "green";
    }
  } catch (err) {
    error.textContent = "Network error, please try again";
    error.style.color = "red";
    console.error(err);
  }
});

// --- SIGNUP ---
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = signupForm.querySelector('input[name="username"]');
  const password = signupForm.querySelector('input[name="password"]');
  const email = signupForm.querySelector('input[name="email"]');
  const error = signupForm.querySelector("p");

  setTimeout(() => {
    error.textContent = "";
  }, 3000);

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.textContent = data.error || "Something went wrong";
      error.style.color = "red";
    } else {
      username.value = "";
      password.value = "";
      email.value = "";
      error.textContent = data.message;
      error.style.color = "green";
    }
  } catch (err) {
    error.textContent = "Network error, please try again";
    error.style.color = "red";
    console.error(err);
  }
});
