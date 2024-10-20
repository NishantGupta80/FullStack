const express = require("express");
const app = express();
app.listen(3000);

//app.use(express.static("./public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/Home.html");
})

app.get("/index.css",(req,res)=>{
   res.sendFile(__dirname + "/public/index.css");
})

app.get("/index.js",(req,res)=>{
    res.sendFile(__dirname + "/public/index.js");
 })

 app.get("/Iron_Man.jpeg",(req,res)=>{
    res.sendFile(__dirname + "/public/Iron_Man.jpeg");
 })
 
 

