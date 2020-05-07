const axios = require('axios');
const AdminModel = require('../models/admin')

class BaseClass {
    constructor() {
        this.key = 'H5FBZ-ATCRU-Z5RVM-23X7D-PSS3F-4MBLX';
    }
    async getPosition(req) {
        let ip;
        const defaultIp = '111.195.186.96';
        const cityInfo = {};
        if(process.env.NODE_ENV === 'development') {
            ip = defaultIp;
        } else {
            ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            const ipArr = ip.split(':');
            ip = ipArr[ipArr.length -1] || defaultIp;
        }
        let result = await axios.get('https://apis.map.qq.com/ws/location/v1/ip ', {
            params: {
                ip,
                key: 'H5FBZ-ATCRU-Z5RVM-23X7D-PSS3F-4MBLX'
            }
        });
        if(result.data.status === 0) {
            cityInfo.city = result.data.result.ad_info.city;
        } else {
            cityInfo.city = '定位失败';
        }
        return cityInfo;
    }
    /*
    * 根据用户名获取用户 _id
    * */
    async getUserId(name) {
        const userObj = await AdminModel.findOne({'user_name': name});
        return userObj._id;
    }
}
module.exports = BaseClass;
