const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    Cpassword:{
        type:String
    },
    role:{
        type:String
    }
})

const User = mongoose.model("USER",userSchema);
module.exports = User;





















































// mongodb+srv://nishant1252be22:Nishant7280@cluster0.hwnu87t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// <a href="/register">Dont Have an Account ? Please Register here</a>  

//   <a href="/">Already have An Account? Please login here</a>