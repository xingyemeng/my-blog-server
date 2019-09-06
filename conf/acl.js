const db = require('./db');
const node_acl = require('acl');
const aclConf = require('./aclConf');


acl = new node_acl(new node_acl.mongodbBackend(db));
acl.allow(aclConf);

module.exports = acl;

