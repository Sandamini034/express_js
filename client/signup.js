const username = document.querySelector('input[name="username"]');
const password = document.querySelector('input[name="password"]');
const form = document.querySelector('form');
const error = document.querySelector('p');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/auth/signup', {
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
      error.textContent = data.error || 'Something went wrong';
      error.style.color = 'red';
    } else {
      error.textContent = data.message;
      error.style.color = 'green';
    }
  } catch (err) {
    error.textContent = 'Network error, please try again';
    error.style.color = 'red';
    console.error(err);
  }
});