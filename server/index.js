const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 4000;

//Modules :
const User = require("./models/user.js");

mongoose
  .connect("mongodb://localhost:27017/MERN")
  .then(() => {
    console.log("mongoDB connected ✅");
  })
  .catch((e) => {
    throw new e();
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.post("/api/login", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  let token = jwt.sign(
    { email: req.body.email, password: req.body.password },
    "admin@123"
  );

  if (user) {
    res.json({ user: "Found ✅","token": token});
  } else {
    res.json({ user: "Not Found ❌" });
  }
});
app.post("/api/register", async (req, res) => {
  let newUser = new User(req.body);
  await newUser.save();
  if (newUser) {
    res.json({ status: "Add New User" });
  } else {
    res.json({ status: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER --> http://localhost:${PORT}/`);
});
