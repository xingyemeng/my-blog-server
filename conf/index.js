'use strict'
/* eslint-disable */
process.env.NODE_ENV = 'development';
module.exports = {
    port: parseInt(process.env.PORT, 10) || 8001,
    url: 'mongodb://localhost:27017/myblog'
}
