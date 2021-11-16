// import the packages here for server

let express = require('express');
let admin = require('firebase-admin');
let bcrypt = require('bcrypt');
let path = require('path');

// firebase admin setup
var serviceAccount = require("./e-commerce-6cf68-firebase-adminsdk-p1o65-2a3a2fe3a5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// makeing public folder static path

let staticPath = path.join(__dirname, "public");


// initillizing express;

let app = express();

// middleware for public folder
app.use(express.static(staticPath));

// to enable form data sharing
app.use(express.json());

//  routes
// home routes in response it wiil sent index.html file

app.get("/", (req, res)=>{
    res.sendFile(path.join(staticPath, "index.html"));
});

// sign up route
app.get("/signup", (req,res)=>{
    res.sendFile(path.join(staticPath, "signup.html"));
});
// posting my data
app.post("/signup", (req, res) => {
    // console.log(req.body); //so i can see the result
    // to access data
    let{name, email, password, number, term, notifications} = req.body;
    // form vailidation
    if (name.length < 3) {
        return res.json({"alert": "name must be at least 3 letters"})
    }else if(!email.length){
        return res.json({"alert": "enter your email"});
    }else if (password.length < 8){
        return res.json({"alert": "passwor should be 8 charcters at least"});
    }else if(!number.length){
        return res.json({"alert": "enter your phone number"});
    }else if(!Number(number) || number.length < 11){
        return res.json({"alert":"invalid number!, please enter valid one"});
    }else if (!term){
        return res.json({"alert":"you must agree to our terms and conditions"});
    }
    // store users in database
    db.collection('users').doc(email).get()
    .then(user => {
        if (user.exists) {
            return res.json({'alert': 'user already exist'})
        }else{
            // encrypt password before storing it 
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data =>{
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller,
                        })
                    })
                });
            });
        }
    });
    // res.json('data recieved')
});

// login route
app.get('/login',(req,res)=>{
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login',(req,res)=>{
    let { email , password } = req.body;

    if (!email.length || !password.length) {
        return res.json({'alert' : 'fill all the fields'})
    }
    // check if user exists or not
    db.collection('users').doc(email).get()
    .then(user => {
        if (!user.exists) {
            // if not exist show this alert
            return res.json({'alert' : 'email is not exists you need to sign up'})
        }else{
            // if user exists we will use bcrypt to compare password
            bcrypt.compare(password, user.data().password, (err,result)=>{
                if (result) {
                    let data = user.data();
                    return res.json({
                        name : data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                }else{
                    return res.json({'alert': 'password is incorrect'});
                }
            })
        }
    })
})

// app.get('addProduct', (req,res)=>{
//     res.sendFile(path.join(staticPath,'addProduct.html'))
// })

app.get("/search",(req, res)=>{
    res.sendFile(path.join(staticPath, "search.html"));
});
// 404 route and if we going to nested location 404 will be active
app.get("/404",(req, res)=>{
    res.sendFile(path.join(staticPath, "404.html"));
});
app.use((req, res)=>{
   res.redirect("/404");
})
// makeing port listeniing on 3000

app.listen(3000, ()=>{
    console.log("listenning on port 3000...");
})