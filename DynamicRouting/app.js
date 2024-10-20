const fs = require("fs");

const express = require("express");
const path = require("path"); // Import the 'path' module



const app = express();
const data=JSON.parse(fs.readFileSync("./public/users.json","utf-8"));
app.use(express.static("./public"));



app.get("/", (req, res) => {
    res.end("This is the Home page");
});

app.get("/users", (req, res) => {
    // fs.readFile("./public/users.json","utf-8",(err,data)=>{
    //     res.status(200).json({
    //     "status":"success",
    //     "data":JSON.parse(data)
    //     })
    //     console.log(data);
    // })    //this method just renders all the users in a string format on the page because the file has been read in a string format

     res.status(200).json({
        status:"success",
        data:data
     })

});

app.get("/users/:id", async (req,res)=>{
    const id=req.params.id;
    const userExist= await data.find((el)=>el.id==id);

    if(userExist)
    {
        res.status(200).json({
            status:"success",
            data:userExist
        });
    }
    else{
        res.status(404).json({
            status:"failed",
           message:"invalid ID"
        });
    }

})
app.listen(3000, () => {
  console.log("Server started");
});
