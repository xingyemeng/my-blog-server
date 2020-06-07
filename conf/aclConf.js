const AclModel = require('../models/acl')

let aclConfs = [
    {
        roles: 'admin', // 超级管理员
        allows: [
            { resources: ['/admin/login', '/admin/register'], permissions: ['get', 'post'] },
        ]
    }
]
async function getAclConfs() {
    let res = await AclModel.find()
    if(res.length && res.length > 0) {
        aclConfs = res
    }
}

module.exports = aclConfs