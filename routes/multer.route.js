const express = require('express');
const router = express.Router();
const multer_controller = require('../controllers/multer.controller');


router.post("/:login", multer_controller.upload) 


module.exports = router;