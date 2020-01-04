/**
 * 用户自己增加或删除角色
 * */
const AclModel = require('../models/acl');
const aclConf = require('../conf/aclConf');

/*if(AclModel.find())*/
/*AclModel.create(aclConf, function (err) {
    if(err) {
        console.log('初始化角色信息失败');
    }
})*/
class Acl{
    addRoles(req, res, next) {
        let { roleName, allows } = req.body;
        let newRole = new AclModel({
            roles: roleName,
            allows: JSON.parse(allows)
        });
        newRole.save(function (err, product) {
            if(err) {
                console.log('添加角色失败');
            } else {
                console.log(product);
                res.send(JSON.stringify(product));
            }
        });
    }
}

module.exports = new Acl()
