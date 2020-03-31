const express = require('express');
const router = express.Router();



const user_controller = require('../controllers/user.controller');

router.post('/create',express.urlencoded({ extended: true }), user_controller.user_create);

router.get('/login',express.urlencoded({ extended: true }), user_controller.user_login);


module.exports = router;