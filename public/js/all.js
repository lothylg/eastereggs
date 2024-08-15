const loginBtn = document.querySelector(".loginBtn");
if (sessionStorage.login === true){
    loginBtn.innerHTML === "Log Out";
    localStorage.setItem("log", "loggedIn");
} else {
    loginBtn.innerHTML === "Log In";
    localStorage.setItem("log", "loggedOut");
}


    

    
