const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const User = require("./models/userSchema");
const Uploads = require("./models/Uploads");

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const role = req.session.userAuth ? "user" : "admin";
    console.log("Form Data (req.body):", req.body);
    console.log("Role:", role);

    let uploadPath;
    if (role === 'admin') {
      uploadPath = './public/admins';
    } else if (role === 'user') {
      uploadPath = './public/users';
    } else {
      return cb(new Error('Invalid role or role not provided'), null);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

const upload = multer({ storage: storage });

app.post("/Upload", upload.single("Image"), (req, res) => {
  const newUpload = new Uploads({
    userId: req.session.email,
    imageName: req.file.filename,
    role: req.session.userAuth ? 'user' : 'admin'
  });

  newUpload.save()
    .then(() => {
      console.log(req.file);
      res.end("Your file has been uploaded.");
    })
    .catch((err) => {
      console.log(err);
      res.end("Error while uploading the file.");
    });
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    if (userExist.password === password) {
      if (userExist.role === "user") {
        req.session.userAuth = true;
        req.session.name = userExist.name;
        req.session.email = userExist.email;
      } else {
        req.session.adminAuth = true;
        req.session.name = userExist.name;
        req.session.email = userExist.email;
      }
      res.redirect("/dashBoard");
    } else {
      res.json({ "Message": "Incorrect Password" });
    }
  } else {
    res.json({ "Message": "Email Not Registered" });
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { name, email, password, Cpassword, role } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.json({ "Message": "Email Already Registered, Please Login Instead" });
  } else if (password != Cpassword) {
    res.json({ "Message": "Confirm Password is not Matching" });
  }

  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    res.end(err);
  }
});

app.get("/dashBoard", (req, res) => {
  if (req.session.userAuth) {
    const name = req.session.name;
    res.render("dashBoard", { name });
  } else if (req.session.adminAuth) {
    const name = req.session.name;
    res.render("adminDashBoard", { name });
  } else {
    console.log("Unauthorized!!!! --> Access Denied");
    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error destroying session');
    } else {
      res.redirect('/');
    }
  });
});

app.get("/seeAllusers", async (req, res) => {
    try {
        const userUploads = await Uploads.find();
        console.log(userUploads);

  
        res.json({ users: userUploads });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching users" });
    }
});





app.listen(8080, (req, res) => {
  console.log("Your server has started at Port 8080");
});
