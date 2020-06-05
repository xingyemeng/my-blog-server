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
    async addRoles(req, res, next) {
        let { roleName, allows } = req.body;

        let roleExist = await AclModel.findOne({roles: roleName})
        if(roleExist){
            res.send('当前角色已存在')
            return
        }
        let newRole = new AclModel({
            roles: roleName,
            allows: JSON.parse(allows)
        });
        newRole.save(async function (err, product) {
            if(err) {
                console.log('添加角色失败');
            } else {
                console.log(product);
                res.send(JSON.stringify(product));
                let aclConf = await AclModel.find()
                global.acl.allow(aclConf)
            }
        });
    }

    async removeRole(req, res, next) {
        if(!req.body.roleName) {
            res.send('请添加角色名称')
        }
        let { roleName } = req.body;
        global.acl.removeRole(roleName, function(err) {
            if(err) {
                res.send('角色删除失败')
                console.log(err)
                
            } else {
                res.send('删除成功')
                AclModel.remove({roles: roleName}, (err) => {
                    if(err) {
                        console.error('删除aclConf配置文件出错')
                    }
                })
            }
        })
    }
}

module.exports = new Acl()
