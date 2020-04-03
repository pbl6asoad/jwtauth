const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.verifyUser = function(req, res, next) {
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

exports.login_create_token = function(req, res, next) {
    let user = new User({
        login: req.headers["login"],
        password: req.headers["password"]
      });
      User.find(
        { login: user["login"], password: user["password"] },
        (err, data) => {
          if (data.length) {
            jwt.sign(
              { user },
              "secretkey",
              { expiresIn: "10s" },
              (err, token, next) => {
                req.isPassed = "true"
                req.msg = `Вы вошли как ${data[0].login}`
                req.token = token
                console.log(req.isPassed);
                console.log(req.msg);
                console.log(req.token);
next()
                });
              } else {
            req.isPassed = "false"
            
            }
        
          }
      )
      setTimeout(next, 100)
}

exports.user_create = function(req, res) {
  User.find({ login: req.body.login }, (err, data) => {
    if (data.length) {
      return res.json({
        msg: "Пользователь с таким логином уже существует"
      });
    } else {
      let user = new User({
        login: req.body.login,
        password: req.body.password
      });

      jwt.sign(
        { user },
        "secretkey",
        { expiresIn: "10s" },
        (err, token, next) => {
          // user['token'] = token
          res.json({
            token
          });
        }
      );

      user.save(function(err) {
        if (err) {
          return err;
        }
        console.log("User Created successfully");
      });
    }
  });
};

exports.user_login = function(req, res) {
  if (req.isVerified) {
    res.json({
      isPassed: "true",
      msg: `Вы вошли как ${req.username}`
    });
  } else {
    res.json({
      isPassed: "false",
      msg: `Введите логин и пароль`
    });
  }
};

exports.user_loging = function(req, res) {
  console.log("meow");
    console.log(req.isPassed);
    console.log(req.msg);
    console.log(req.token);

    res.json({
        isPassed: req.isPassed,
        msg: req.msg,
        token: req.token
    })
};

exports.redirect = function(req, res) {
  let code = req.url.split("=");
  res.redirect("http://localhost:5000/loginvk.html?code=" + code[1]);
};
