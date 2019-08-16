const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    id: Number,
    user_name: String,
    password: String,
    create_time: String,
    admin: {type: String, default: '管理员'},
    status: Number,
    avatar: {type: String, default: 'default.jpg'},
    city: String
});
module.exports = new mongoose.model('admin', adminSchema)
