const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const fs = require('fs')

exports.verifyUser = function (req, res, next) {
  try {
    let token = req.headers["authorization"].split(" ");
    let decode = jwt.verify(token[1], "secretkey");
    req.isVerified = "true";
    req.username = decode["user"]["login"];

    next();
  } catch {
    next();
  }
};

exports.login_create_token = function (req, res, next) {
  let user = new User({
    login: req.headers["login"],
    password: req.headers["password"],
  });
  User.find(
    { login: user["login"], password: user["password"] },
    (err, data) => {
      if (data.length) {
        jwt.sign(
          { user },
          "secretkey",
          (err, token, next) => {
            req.name = data[0].name;
            req.login = data[0].login;
            req.isPassed = "true";
            req.msg = `Вы вошли как ${data[0].login}`;
            req.token = token;
            next();
          }
        );
      } else {
        req.isPassed = "false";
      }
    }
  );
  setTimeout(next, 100);
};

exports.user_create = function (req, res) {
  User.find({ login: req.body.login }, (err, data) => {
    if (data.length) {
      return res.json({
        msg: "Пользователь с таким логином уже существует",
      });
    } else {
      let user = new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        authType: req.body.authType,
      });

      jwt.sign(
        { user },
        "secretkey",
        (err, token, next) => {
          res.json({ user, token });
        }
      );

      user.save(function (err) {
        if (err) {
          return err;
        }
        console.log("User Created successfully");
      });
    }
  });
};

exports.user_login = function (req, res) {
  User.find({ login: req.username }, (err, data) => {
    if (data.length) {
      if (req.isVerified) {
        res.json({
          name: data[0].name,
          login: data[0].login,
          isPassed: "true",
          msg: `Вы вошли как ${req.username}`,
        });
      } else {
        res.json({
          isPassed: "false",
          msg: `Введите логин и пароль`,
        });
      }
    } else {
    }
  });
};

exports.user_loging = function (req, res) {
  res.json({
    name: req.name,
    login: req.login,
    isPassed: req.isPassed,
    msg: req.msg,
    token: req.token,
  });
};

exports.redirect = function (req, res) {
  let code = req.url.split("=");
  res.redirect("http://localhost:5000/loginvk.html?code=" + code[1]);
};

exports.show_profile = function(req, res) {
  let profilePath = __dirname.split("\\");
  if(profilePath[profilePath.length-1] == "controllers") {
    let path = profilePath.splice(0, 3);
    profilePath = path.join("\\")
    res.sendFile(profilePath + "/public/profile.html")
  }
} 

exports.redirectToUserList = function(req, res){
  let profilePath = __dirname.split("\\");
  if(profilePath[profilePath.length-1] == "controllers") {
    let path = profilePath.splice(0, 3);
    profilePath = path.join("\\")
    res.sendFile(profilePath + "/public/userlist.html")
  }
}

exports.show_userlist = function(req, res){
  User.find({}, (err, data) => {
      res.json(data);
  });
}


exports.generate100newusers = function(req, res){
  User.deleteMany({img: "https://vk.com/images/camera_400.png?ava=1"}, (err, data) => {

  })
  User.deleteMany({img: "https://vk.com/images/deactivated_400.png"}, (err, data) => {

  })

  for(let i = 0; i < 1; i++){
    Object.keys(req.body).length
    console.log("meow"); 
    let user = new User({
      login: req.body[i].domain,
      password: req.body[i].id,
      name: req.body[i].first_name +" "+ req.body[i].last_name,
      img: req.body[i].photo_max_orig,
      authType: "vk",
      dialogs: []
    });   
    console.log(user);
    user.save(function (err) {
      if (err) {
        console.log("error");
        return err;
      }
      console.log("User Created successfully");
    });
  }
}
