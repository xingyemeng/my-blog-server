const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aclSchema = new Schema({
    roles: String,
    allows: Array
});
module.exports = mongoose.model('aclconf', aclSchema);
