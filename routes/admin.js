const express = require('express');
const Admin = require('../controller/admin');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/login', Admin.login);
router.post('/register', upload.single('avatar'), Admin.register);
module.exports = router;
