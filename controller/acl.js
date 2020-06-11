/**
 * 用户自己增加或删除角色
 * */
const AclModel = require('../models/acl');
const aclConf = require('../conf/aclConf');
const Resources = require('../resource/index')
/*if(AclModel.find())*/
/*AclModel.create(aclConf, function (err) {
    if(err) {
        console.log('初始化角色信息失败');
    }
})*/
class Acl{
    constructor() {
        this.removeRoleResources = this.removeRoleResources.bind(this)
    }

    async roleIsExist(roleName) {
        let roleExist = await AclModel.findOne({roles: roleName})
        if(roleExist){
            return true
        } else {
            return false
        }
    }

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
/**
 * 移除角色
 * 
*/
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
/**
 * 查询角色拥有的资源
*/
    async roleHasResources(req, res, next) {
        if(!req.body.roleName) {
            res.send('为查询到该角色')
        }
        let { roleName } = req.body;
        global.acl.whatResources(roleName, function(err, resourcesList) {
            if(err) {
                res.send('查询角色资源失败')
                console.log(err)
                
            } else {
                let arr = []
                Object.keys(resourcesList).forEach(resource => {
                    arr.push(Resources[resource].name)
                })
                res.send(arr)
                
            }
        })
    }

/**
 * 删除角色资源
*/
    async removeRoleResources(req, res, next) {
        console.log(req.session)
        let { roleName, resources } = req.body;
        let roleIsExist = await this.roleIsExist(roleName)
        if(!roleIsExist) {
            res.send('当前角色不存在')
            return
        }
        let resourcesList = JSON.parse(resources).map(item => {
            return Object.keys(Resources).find(key => {
                return Resources[key].name === item
            })
        })
        global.acl.removeAllow(roleName, resourcesList, ['get', 'post'], function(err) {
            if(err) {
                res.send('权限删除失败')
            } else {
                res.send('权限删除成功')
            }
        })
    }
/**
 * 添加角色资源
*/
    async addRoleResources() {
        let { roleName, resources } = req.body;
        let roleIsExist = await this.roleIsExist(roleName)
        if(!roleIsExist) {
            res.send('当前角色不存在')
            return
        }
    }
}

module.exports = new Acl()
