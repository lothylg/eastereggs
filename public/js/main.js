const loginBtn = document.querySelector('#loginBtn');
const loginFormBtn = document.querySelector('#loginFormBtn');
const createUserBtn = document.querySelector('#createUserBtn');
const homeBtn = document.querySelector('#homeBtn');
const myProfile = document.querySelector('#myProfile');

loginBtn.addEventListener('click', () => {
    window.location.href = "/login"
});


homeBtn.addEventListener('click', () => {
    window.location.href = "/"
});

myProfile.addEventListener('click', () => {
    window.location.href = "/me"
});
createUserBtn?.addEventListener('click', (event) => {
    event.preventDefault();

    const displayName = document.querySelector('#dNameInput').value;
    const email = document.querySelector('#emailInput').value;
    const password = document.querySelector('#hashedPwInput').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered:', data);
        // Redirect or show a success message
    })
    .catch(error => console.error('Error:', error));
});

// Handle user login
loginFormBtn?.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.querySelector('#loginEmailInput').value;
    const password = document.querySelector('#loginPasswordInput').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response:', data);
        // Redirect or show a success message
    })
    .catch(error => console.error('Error:', error));
});




//fetch call is data