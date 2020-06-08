const express = require('express');
const Admin = require('../controller/admin');
const router = express.Router();
const multer = require('multer');

const test = function(res, req, next) {
    global.acl.middleware()
    upload.single('avatar')
    console.log('aaaa')
    next()
}
router.use(function(req,res,next) {
    req.session = {}
    // req.session.userId = '5ed0bd7cc3df54b423900cb7'
    req.session.userId = '5ed0caccc3df54b423900cb8'
    next()
})
const upload = multer({ dest: 'uploads/' });   // 上传头像插件
router.post('/login', Admin.login);
router.post('/register', global.acl.middleware(), upload.single('avatar'), Admin.register);
router.post('/getUserInfo', Admin.getUserInfo);
module.exports = router;
