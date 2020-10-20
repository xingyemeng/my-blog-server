const BaseClass = require('../baseClass/baseClass');

class AuthController extends BaseClass{
    constructor() {
        super();
        this.userRolesDetail = this.userRolesDetail.bind(this)
    }
    /**
     * 给用户添加角色
     * @params userName: 用户名  roleName: 角色名
     * note： 只要给一个角色名就可以添加，即使目前没有这个角色
    */
    async addUserRoles(req, res) {
        const {userName, roleName} = req.body;
        const userId = await super.getUserId(userName);
        if(!userId) {
            res.send('当前用户不存在')
            return
        }
        global.acl.addUserRoles(userId.toString(), roleName, err => {
            if(err) {
                res.send('添加失败');
            } else {
                res.send('添加成功')
            }
        });
        
    }
    /**
     * 删除用户角色
     * note: 给一个角色名就可以删除成功，即使没有这个角色名存在
    */
    async removeUserRoles(req, res) {
        const {userName, roleName} = req.body;
        const userId = await super.getUserId(userName);
        if(!userId) {
            res.send('当前用户不存在')
            return
        }
        global.acl.removeUserRoles(userId.toString(), roleName, err => {
            if(err) {
                res.send('删除失败');
            } else {
                res.send('删除成功')
            }
        });
    }
    /**
     * 查询用户角色
    */
   async userRoles(req, res) {
       console.log(req.decoded)
        const userName = req.decoded ? req.decoded.name : req.body.userName
        const userId = await super.getUserId(userName);
        if(!userId) {
            res.send('当前用户不存在')
            return
        }
        global.acl.userRoles(userId.toString(), (err, rolesList) => {
            if(err) {
                res.send('查询失败');
            } else {

                res.send(JSON.stringify(rolesList))
            }
        });
    }

    /**
     * userRolesDetail
     * 查询当前用户的角色、资源
    */
    async userRolesDetail(req, res) {
        const userId = req.decoded.user_ID
        // console.log(this.responseObj)
        // return
        Promise.all()
        global.acl.userRoles(userId.toString(), (err, rolesList) => {
            if(err) {
                res.send('查询失败');
            } else {

                res.send(JSON.stringify(rolesList))
            }
        });
    }
}
module.exports = new AuthController()
