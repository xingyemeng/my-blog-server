let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
   name: String,
   password: String
}, { collection: 'data'});

let Users = mongoose.model('Use', userSchema);
module.exports = Users;
/*let arr = [
    {
        name: 'admin',
        password: 'admin'
    },
    {
        name: '张三',
        password: 'admin'
    },
    {
        name: '李四',
        password: 'admin'
    },
    {
        name: '王五',
        password: 'admin'
    }
];
Users.create(arr ,function (err ,list) {
    console.log(list);
});*/
