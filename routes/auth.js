const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')

/*
* 1,创建用户角色
* 2.删除用户角色
* 3.修改用户角色权限
* */
router.post('/addUserRoles', AuthController.addUserRoles)

module.exports = router;
