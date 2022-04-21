window.onload = function() {

    let user = getUser();
    console.log(user);
    if (user != undefined || user != null) {
        loginAndLoadData(user.username, user.token);
    }

    // login
    const loginBtn = document.getElementById('login-btn');   
    loginBtn.onclick = loginHandler;

    // logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.onclick = logoutHandler;

    // search
    const searchBtn = document.getElementById('search-btn');
    searchBtn.onclick = searchHandler;

};