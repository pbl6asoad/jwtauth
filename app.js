const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const router = require("./routes/export.route");
const app = express();

// mongoose.connect("mongodb+srv://pbl6asoad:1q2w3e4r@cluster0-6bzz4.mongodb.net/vk", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


mongoose.connect("mongodb://localhost:27017/google", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/users", router.userRouter);
app.use("/dialog", router.dialogRouter);
app.listen(5000, () => console.log("Server started on port 5000"));
