const express = require('express');
const config = require('./conf');
const mongoose = require('mongoose');
const router = require('./routes');
const bodyParser = require('body-parser');
// const session = require('express-session');
let acl = require('acl');
const aclConf = require('./conf/aclConf')
const app = express();
app.use(express.static('uploads'))
// all environments

/*http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + config.port);
});*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//session 换成jwt认证
/*app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: obj
}))*/
mongoose.connect(config.url, {useNewUrlParser: true}, function (err) {
    global.acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
    global.acl.allow(aclConf);
    router(app);
});
app.listen(config.port);
