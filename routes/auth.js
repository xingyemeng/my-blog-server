const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')
const AclController = require('../controller/acl')

/*
* 1,创建用户角色
* 2.删除用户角色
* 3.修改用户角色权限
* */
router.post('/addUserRoles', AuthController.addUserRoles);
router.post('/addRoles', AclController.addRoles);

module.exports = router;
