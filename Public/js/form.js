// redirect to home page if user logged in
window.onload = () =>{
    if (sessionStorage.user) {
        // to access to session storage we must use json .parse
        user = JSON.parse(sessionStorage.user);
        // if user exist cmpare authtoken
        // if user is loged in he wiil not be able to exit again
        if (compareToken(user.authToken, user.email)) {
            location.replace('/');
        }

    }
}

// get loader
let loader = document.querySelector(".loader");
// select all inputs
let submitBtn = document.querySelector(".submit-btn");
let name = document.querySelector("#name") || null;
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let number = document.querySelector("#number") || null;
let term = document.querySelector("#terms") || null;
let notifications = document.querySelector("#notifications") || null;

submitBtn.addEventListener("click", (eo) =>{
    // alert("clicked")
    // if there is no user name means we are on login page
    if (name != null) {
        // sign up page
        if(name.value.length < 3){
            showAlert("username must be at least 3 letters");
        }else if(!email.value.length){
            showAlert("enter your email");
        }else if (password.value.length < 8){
            showAlert("passwor should be 8 charcters at least");
        }else if(!number.value.length){
            showAlert("enter your phone number");
        }else if(!Number(number.value) || number.value.length < 11){
            showAlert("invalid number!, please enter valid one");
        }else if (!term.checked){
            showAlert("you must agree to our terms and conditions");
        }else{
            // submit form
            loader.style.display = "block";
            sendData('/signup',{
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                term: term.checked,
                notifications: notifications.checked,
                seller: false
            })
        }
    }else{
        // login page
        if (!email.value.length || !password.value.length) {
            showAlert('fill all the inputs');
        }else{
            loader.style.display = "block";
            sendData('/login',{
                email: email.value,
                password: password.value,
            })
        }
    }
});

//send data function
// this func will take signup as a parameter (argument) and second one will be object
// this func wiil send data by fetch func & method post 
let sendData = (path, data) => {
    fetch(path,{
        method: 'post',
        headers: new Headers({'Content-Type': "application/json"}),
        body: JSON.stringify(data)        
    })
    .then((res) => res.json())
    .then((data)=>{
        ProcessData(data);
    })
}
// stotring values in data base
let ProcessData = (data)=>{
    loader.style.display = null;
    if (data.alert) {
        showAlert(data.alert)
    }else if(data.name){
        // console.log(data);
        // crete auth token
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');
    }
}
// alert
let showAlert = (msg) => {
    let alertBox = document.querySelector(".alert-box");
    let alertMsg = document.querySelector(".alert-msg");

    alertMsg.innerHTML = msg;
    alertBox.classList.add("show");
    setTimeout(()=>{
        alertBox.classList.remove("show");
    }, 1000)
}
