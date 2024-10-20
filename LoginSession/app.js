const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const session=require("express-session");
const User = require("./models/userSchema");

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'secret',
    resave: false,    
    saveUninitialized:true
  }))
  

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("DataBase Connected")
}).catch((err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.render("login");
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    const userExist = await User.findOne({email:email});

    if(userExist)
    {
        if(userExist.password === password)
        {
            if(userExist.role === "user")
            {
                req.session.userAuth=true;
                req.session.name=userExist.name;
            }
            else{
              req.session.adminAuth=true;
              req.session.name=userExist.name;
            }
            res.redirect("/dashBoard");
        }
        else{
            res.json({"Message":"Incorrect Password"})
        }
    }
    else{
        res.json({"Message":"Email Not Registered"})
    }
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async(req,res)=>{
    const {name,email,password,Cpassword,role} = req.body;
    
    const userExist = await User.findOne({email:email});

    if(userExist)
    {
        res.json({"Message":"Email Already Registered,Please Login Instead"})
    }
    else if(password != Cpassword)
    {
        res.json({"Message":"Confirm Password  is not Matching"})
    }
   
    try{
        await User.create(req.body);
        res.redirect("/");
      }catch(err){
        res.end(err);
      }
     // res.end("done");
})

app.get("/dashBoard",(req,res)=>{
  if(req.session.userAuth)
  {
    const name = req.session.name;
    res.render("dashBoard",{name});
  }
  else if(req.session.adminAuth)
  {
    const name = req.session.name;
    res.render("adminDashBoard",{name});
  }
  else
  {
    console.log("Unauthorized!!!! -->  Access Denied")
    res.redirect("/");
  }

})

app.post("/logout",(req,res)=>{
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Error destroying session');
      } else {
        res.redirect('/');
      }
    });
  })
  




app.listen(8080,(req,res)=>{
    console.log("Your server has Started at Port 8080");
})