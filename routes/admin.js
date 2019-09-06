const express = require('express');
const Admin = require('../controller/admin');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });   // 上传头像插件
router.post('/login', Admin.login);
router.post('/register', upload.single('avatar'), Admin.register);
router.post('/getUserInfo', Admin.getUserInfo);
module.exports = router;
