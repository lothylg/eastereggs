// const { response } = require("express");

const loginBtn = document.querySelector('#loginBtn');
const loginFormBtn = document.querySelector('#loginFormBtn');
const logoutBtn = document.querySelector('#logOut');

const homeBtn = document.querySelector('#homeBtn');
const myProfile = document.querySelector('#myProfile');
const discussionTopic = document.querySelector('.discussionTopic');

loginBtn.addEventListener('click', () => {
    window.location.href = "/login"
});
logoutBtn.addEventListener('click', () => {
    const logout = async () => {
        const response = await fetch('/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      };
      
    //   document.querySelector('#logout').addEventListener('click', logout);

});


homeBtn.addEventListener('click', () => {
    window.location.href = "/"
});

myProfile?.addEventListener('click', () => {
    window.location.href = "/profile"
});

discussionTopic?.addEventListener('click', () => {
    window.location.href = "/discussion/"
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
