const express = require('express');
const router = express.Router();
const dialog_controller = require('../controllers/dialog.controller');

router.get('/create/:id',dialog_controller.isExist,dialog_controller.open_dialog);

router.get('/',  dialog_controller.show_dialog_list)

router.get('/userDialogs', dialog_controller.return_user_dialogs)


module.exports = router;