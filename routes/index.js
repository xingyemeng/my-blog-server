module.exports = app => {
    app.use('/admin', require('./admin'));
    app.use('/auth', require('./auth'));
};
