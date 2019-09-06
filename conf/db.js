const mongoose = require('mongoose');
const node_acl = require('acl');
const aclConf = require('./aclConf');
const conf = require('./index');


function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(conf.url,  {useNewUrlParser: true}, function (err) {
            if(err) {
                console.log('数据库连接失败');
            } else {
                console.log('数据库连接成功');
                resolve(mongoose.connection.db)
            }
        })
    })
}
async function test() {
    let db = await connect()
    return db
}
const DB = test()
console.log(DB)
module.exports = DB;
