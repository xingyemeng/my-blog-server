const BaseClass = require('../baseClass/baseClass');

class AuthController extends BaseClass{
    constructor() {
        super();
    }
    async addUserRoles(req, res) {
        const name = req.body.name;
        const userId = await super.getUserId(name);
        global.acl.addUserRoles(userId.toString(), 'admin');
        res.send('添加成功');
    }
    async removeUserRoles(req, res) {

    }
}
module.exports = new AuthController()
