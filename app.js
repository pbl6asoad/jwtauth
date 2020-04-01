const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const cors = require('cors');


const app = express();

mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(cors())
app.use(express.json())
const user = require("./routes/user.route");
app.use("/users", user);

// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Welcome to the API'
//   });
// });




// app.post('/api/posts', verifyToken, (req, res) => {  
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created...',
//         authData
//       });
//     }
//   });
// });

// app.post('/api/login', (req, res) => {
 
//   const user = {
//     id: 1, 
//     username: `${req.headers.login}`,
//     email: `${req.headers.password}`
//   }
  
//   jwt.sign({user}, 'secretkey', /* { expiresIn: '30s' },*/ (err, token) => {
//     res.json({
//       token
//     });
//   });
// });


// function verifyToken(req, res, next) {

//   const bearerHeader = req.headers['authorization'];
  
//   if(typeof bearerHeader !== 'undefined') {
    
//     const bearer = bearerHeader.split(' ');
    
//     const bearerToken = bearer[1];
    
//     req.token = bearerToken;
    
//     next();
//   } else {
    
//     res.sendStatus(403);
//   }

// }

app.listen(5000, () => console.log('Server started on port 5000'));