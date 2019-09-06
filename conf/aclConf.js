module.exports = [
    {
        roles: 'admin', // 一般用户
        allows: [
            { resources: ['/admin/login', '/admin/register'], permissions: ['get', 'post'] },
        ]
    }
];
