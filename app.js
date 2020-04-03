const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const cors = require('cors');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

mongoose.connect('mongodb://localhost:27017/google', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + "/public"));
const user = require("./routes/user.route");
app.use("/users", user);
app.listen(5000, () => console.log('Server started on port 5000'));


