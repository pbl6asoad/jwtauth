const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/redirect', user_controller.redirect)

router.post('/create',  user_controller.user_create);

router.get('/login',user_controller.verifyUser, user_controller.user_login);

router.get('/loging',  user_controller.login_create_token, user_controller.user_loging);

router.get('/profile', user_controller.show_profile);

router.get('/list', user_controller.redirectToUserList)

router.post("/generate100newusers", user_controller.generate100newusers)

router.get('/showUserList', user_controller.show_userlist)

module.exports = router;