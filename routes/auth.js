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
// function authentication(req, res) {
//     if(req.decoded) {
//         return global.acl.middleware(1,function(req, res){return req.decoded.user_ID})
//     } else {
//         res.send('抱歉，您没有权限查看该栏目，请联系管理员')
//         return
//     }
// }
// router.use(function(req, res, next) {
//     if(req.decoded) {
//         global.acl.middleware()
//     } else {
//         res.send('抱歉，您没有权限查看该栏目，请联系管理员')
//         return
//     }
// })
router.post('/addUserRoles',global.acl.middleware(), AuthController.addUserRoles);
router.post('/removeUserRoles', AuthController.removeUserRoles);
router.post('/userRoles', AuthController.userRoles);
router.post('/userRolesDetail', AuthController.userRolesDetail);


router.post('/addRoles', AclController.addRoles);
router.post('/removeRole', AclController.removeRole);
router.post('/roleHasResources', AclController.roleHasResources);
router.post('/removeRoleResources', AclController.removeRoleResources);
router.post('/addRoleResources', AclController.addRoleResources);

module.exports = router;
