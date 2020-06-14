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
        this.addRoleResources = this.addRoleResources.bind(this)
        this.addRoles = this.addRoles.bind(this)
    }
/**
 * 查询该角色是否存在
*/
    async roleIsExist(roleName) {
        let roleExist = await AclModel.findOne({roles: roleName})
        if(roleExist){
            return true
        } else {
            return false
        }
    }
/**
 * 资源名和资源路径转换
*/
    nameToPath(resources) {
        return JSON.parse(resources).map(item => {
            return Object.keys(Resources).find(key => {
                return Resources[key].name === item
            })
        })
    }
/**
 * 添加角色以及所拥有的资源
*/
    async addRoles(req, res) {
        let { roleName, resources } = req.body;

        let roleExist = await AclModel.findOne({roles: roleName})
        if(roleExist){
            res.send('当前角色已存在')
            return
        }
        let newRole = new AclModel({
            roles: roleName,
            allows: [{resources: this.nameToPath(resources), permissions:['get', 'post']}]
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
 * 待解决问题：删除前一定要删除该角色所有资源
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
 * 要能够删除所有资源
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
 * 添加角色资源，资源默认权限是get、post
 * 问题：1.aclconfs数据表要更新 2.
*/
    async addRoleResources(req, res) {
        let { roleName, resources } = req.body;
        let roleIsExist = await this.roleIsExist(roleName)
        if(!roleIsExist) {
            res.send('当前角色不存在')
            return
        }
        let resourceList = this.nameToPath(resources)
        global.acl.allow(roleName, resourceList, ['get', 'post'], err => {
            if(err) {
                res.send('添加权限失败')
                return
            } else {
                // 要更新aclconfs集合
                AclModel.findOneAndUpdate({roles: roleName}, {allows:[{resources: resourceList, permissions: ['get', 'post']}]}, function(err) {
                    if(err) {
                        console.log("更新aclconfs集合失败")
                    }
                })
                res.send('添加权限成功')

            }
        })
    }
}

module.exports = new Acl()
