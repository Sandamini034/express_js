const username = document.querySelector('input[name="username"]');
const password = document.querySelector('input[name="password"]');
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // backend sent { error: "..." }
      error.textContent = data.error || 'Something went wrong';
      error.style.color = 'red';
    } else {
      // backend sent { message: "..." }
      error.textContent = data.message;
      error.style.color = 'green';
    }
  } catch (err) {
    err.textContent = 'Network error, please try again';
    err.style.color = 'red';
    console.error(err);
  }
});