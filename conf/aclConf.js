module.exports = [
    {
        roles: 'admin', // 超级管理员
        allows: [
            { resources: ['/admin/login', '/admin/register'], permissions: ['get', 'post'] },
        ]
    }
];
