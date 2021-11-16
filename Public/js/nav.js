// to create nav in all pages dynamic with out copying it
let createNav = ()=>{
    let nav = document.querySelector(".navbar");

    nav.innerHTML = `
            <div class="container">
                <div class="row col-3">
                    <div class="nav">
                        <img src="img/logo/logo.png" class="brand-img" alt="">
                    </div>
                </div>
                <!-- row -->
                <div class="row col-9">
                    <div class="nav-items">
                        <div class="search">
                            <input type="text" placeholder="search brand, product" class="search-box">
                            <button class="btn search-btn">search</button>
                        </div>
                        <a>
                            <span class="icon-user-circle-o" id="user-img"></span>
                            <div class="login-logout-popup hide">
                                <p class="account-info">Login as, name</p>
                                <button class="btn logout-btn" id="user-btn">Log Out</button>
                            </div>
                        </a>
                        <a href="#">
                            <span class="icon-cart-plus"></span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- container -->
            <div class="container-fluid">
                <div class="row col-12">
                    <ul class="links-container">
                        <li class="link-item"><a href="" class="link">home</a></li>
                        <li class="link-item"><a href="" class="link">women</a></li>
                        <li class="link-item"><a href="" class="link">men</a></li>
                        <li class="link-item"><a href="" class="link">kids</a></li>
                        <li class="link-item"><a href="" class="link">accessories</a></li>
                    </ul>
            </div>
        </div>
    `;
}

createNav();


// nav popup

let userImgBtn = document.getElementById("user-img");
let userPopup = document.querySelector(".login-logout-popup");
let poupText = document.querySelector(".account-info");
let logoutBtn = document.getElementById("user-btn");

userImgBtn.addEventListener("click", ()=>{
    userPopup.classList.toggle("hide");

})

window.onload = () =>{
    let user = JSON.parse(sessionStorage.user || null);

    if (user != null) {
        // means user logged in
        poupText.innerHTML = `login as, ${user.name}`;
        logoutBtn.innerHTML = `log out`;
        logoutBtn.addEventListener("click", ()=>{
            sessionStorage.clear();
            location.reload();
        })
    }else{
        // user logged out
        poupText.innerHTML = `click log in to go to login page `;
        logoutBtn.innerHTML = `log in`;
        logoutBtn.addEventListener('click',(eo)=>{
            location.href = "/login";
        })
    }
}

// search box 
let searchBtn = document.querySelector(".search-btn");
let searchBox = document.querySelector(".search-box");
console.log(searchBtn);
searchBtn.addEventListener("click", (eo)=>{
    if (searchBox.value.length) {
        location.href = "/search/${searchBox.value}"
    }
})