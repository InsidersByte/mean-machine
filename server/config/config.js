'use strict';

module.exports = {
    port: process.env.PORT || 8080,
    database: process.env.DATABASE_URL || 'mongodb://localhost:27017/mean-machine',
    secret: 'ilovescotchscotchyscotchscotch',
};
