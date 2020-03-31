const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

exports.user_create = function (req, res) {
 
   User.find({login:req.body.login}, (err, data) =>{
        console.log(data);
        if (data.length) { 
            return res.json({
                msg: "Пользователь с таким логином уже существует"
            })
        } else {
            let user = new User(
                {
                    login: req.body.login,
                    password: req.body.password
                }
            );
        
            jwt.sign({user}, 'secretkey', /* { expiresIn: '30s' },*/ (err, token, next) => {
                user['token'] = token
                res.json({
                  token
                });
              });
        
            user.save(function (err) {  
                if (err) {
                    return err;
                }
                console.log('User Created successfully')
            })  
        }


    })
   
};

exports.user_login = function (req, res) {
   let token = req.headers["authorization"].split(' ')
    
  
   User.find({token:token[1]}, (err, data) => {
       console.log(data);
       if(data.length) {
           console.log("good");
       } else {
           console.log("bad");
           res({
               msg: `Вы вошли как ${data[0].login}`
           })
       }
   }) 
   
};

