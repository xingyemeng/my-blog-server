const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')
const AclController = require('../controller/acl')

/*
*  添加角色
*  删除角色
* 1,创建用户角色
* 2.删除用户角色
* 3.修改用户角色权限
* */
router.post('/addUserRoles', AuthController.addUserRoles);
router.post('/removeUserRoles', AuthController.removeUserRoles);
router.post('/userRoles', AuthController.userRoles);


router.post('/addRoles', AclController.addRoles);
router.post('/removeRole', AclController.removeRole);
router.post('/roleHasResources', AclController.roleHasResources);
router.post('/removeRoleResources', AclController.removeRoleResources);
router.post('/addRoleResources', AclController.addRoleResources);

module.exports = router;
