const AdminModel = require('../models/admin');
const crypto = require('crypto');
const fs = require('fs');
const BaseClass = require('../baseClass/baseClass');
const time = require('time-formater');
const jwt = require('jsonwebtoken');

class Admin extends BaseClass{
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    /*
    * 管理平台登陆
    * */
    async login(req, res, next) {
/*
测试session
console.log(req.sessionID)
req.sessionStore.all(function (err, lists) {
    console.log(lists)
})*/
        const {user_name, password, status = 1} = req.body;
        let newPassword = this.encryption(password);
        const cityInfo = await this.getPosition(req);
        /*const initAdmin = {
            user_name,
            password: newPassword,
            id: 0,
            create_time: time().format('YYYY-MM-DD HH:mm:ss'),
            admin: '超级管理员',
            status,
            city: '北京'
        };
        await AdminModel.create(initAdmin)*/
        let admin = await AdminModel.findOne({user_name});
        if(!admin) {
            res.send({
                status: 1,
                msg: '用户不存在，登陆失败！'
            });
        } else {
            if(admin.password !== newPassword) {
                res.send({
                    status: 1,
                    msg: '密码错误，登陆失败！'
                });
            } else {
                admin.city = cityInfo.city;
                admin.save();
                const token = jwt.sign({name: admin.user_name}, 'jiayan', { expiresIn: 60*60*1});
                res.send({
                    status: 0,
                    token: token,
                    msg: '登陆成功！'
                });
            }
        }
    }
    encryption(password) {
        let newPassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newPassword;
    }
    Md5(password) {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
    /*
    * 上传图片重命名
    * */
    imgRename(path, imgType) {
        return new Promise((resolve, reject) => {
            fs.rename(path, path + '.' + imgType, function (err) {
                if(err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
    /*
    * 管理员注册
    * */
    async register(req, res, next) {
        let mimeArr = req.file.mimetype.split('/');
        let len = mimeArr.length;
        let imgType = mimeArr[len - 1]
        const avatar = req.file.filename + '.' + imgType;
        const flag = await this.imgRename(req.file.path, imgType);
        if(!flag) {
            console.log('头像上传失败');
            res.send('头像上传失败');
            return;
        }
        const {user_name, password, status} = req.body;
        const newPassword = this.encryption(password);
        const admin = await AdminModel.findOne({user_name});
        const cityInfo = await this.getPosition(req);
        if(!admin){
            const newAdmin = {
                user_name,
                password: newPassword,
                id: 0,
                avatar,
                create_time: time().format('YYYY-MM-DD HH:mm:ss'),
                admin: status === 1 ? '超级管理员' : '管理员',
                status,
                city: cityInfo.city
            };
            await AdminModel.create(newAdmin);
            // global.acl.addUserRoles(user_name, 'admin');
            res.send('注册成功');
        } else {
            res.send('用户已存在');
        }
    }
    /*
    * node_acl 根据用户名获取用户所拥有的角色
    * */
    getRoles(userId){
        return new Promise((resolve, reject) => {
            global.acl.userRoles(userId).then(
                (roles) => {
                    resolve(roles);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
    /*
    * 获取用户信息
    * */
    async getUserInfo(req, res) {
        const userInfo = {};
        const token = req.body.token;
        try {
            let decoded = jwt.verify(token, 'jiayan');
            let admin = await AdminModel.findOne({user_name: decoded.name});
            if(admin) {
                let roles = await this.getRoles(admin.user_name);
                userInfo.userName = admin.user_name;
                userInfo.userId = admin._id;
                userInfo.avatarImgPath = admin.avatar;
                userInfo.access = roles;
                res.send({
                    status: 0,
                    info: userInfo
                });
            }
        } catch (e) {
            console.log(e.message);
            res.send({
                status: 1,
                info: 'token失效'
            });
        }

    }
}
module.exports = new Admin();
