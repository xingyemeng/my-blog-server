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
const AclModel = require('./models/acl');
const jwt = require('jsonwebtoken');
// all environments

/*http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + config.port);
});*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//session 换成jwt认证 tttttttt
/*app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: obj

}))*/
// token中获取用户信息
app.use(function(req, res, next) {
    if(req.body.token && req.path !== '/admin/register') {
        try{
            let decoded = jwt.verify(req.body.token, 'jiayan');
            // console.log(decoded)
            req.decoded = decoded
            req.session = {}
            req.session.userId = decoded.user_ID
            req.session.name = decoded.name
        } catch(e) {
            console.log(e.message);
            res.send({
                status: 1,
                info: 'token失效'
            });
            return
        }
        
    } 
    next()
})
mongoose.connect(config.url, {useNewUrlParser: true}, function (err) {
    global.acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
    global.acl.allow(aclConf);
    AclModel.find(function (err, list) {
        if(list.length === 0) {
            AclModel.create(aclConf, function (err) {
                if(err) {
                    console.log('初始化角色信息失败');
                }
            });
        }
    })
    router(app);
});
app.listen(config.port);
