const express = require('express');
const mongoose = require('mongoose');
const config = require('./conf');
const router = require('./routes');
const bodyParser = require('body-parser');
// const session = require('express-session');

const app = express();
// all environments
mongoose.connect(config.url, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log('数据库连接成功');
});
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
router(app);
app.listen(config.port);
