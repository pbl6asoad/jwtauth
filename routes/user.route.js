const express = require('express');
const router = express.Router();
const passport = require('passport');

const user_controller = require('../controllers/user.controller');

router.get('/redirect', user_controller.redirect)

router.post('/create',  user_controller.user_create);

router.get('/login',user_controller.verifyUser, user_controller.user_login);

router.get('/loging',  user_controller.login_create_token, user_controller.user_loging);
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

module.exports = router;