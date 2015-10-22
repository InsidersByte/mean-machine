'use strict';

module.exports = function() {
    const client = './public/';
    const server = './server/';
    const clientApp = client + 'app/';
    const clientStyles = client + 'styles/';

    let config = {
        /**
         *  File paths
         */
        alljs: [
            client + '/**/*.js',
            server + '**/*.js',
            './*.js',
        ],
        client: client,
        css: clientStyles + 'styles.css',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
        ],
        index: client + 'index.html',
        server: server,

        /**
         * browser sync
         */
        browserReloadDelay: 1000,
        logPrefix: 'mean-machine',

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '..',
        },

        /**
         * Node settings
         */
        nodeServer: './server.js',
        defaultPort: '8001',
    };

    //////////////////

    config.getWiredepDefaultOptions = function() {
        let options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
        };

        return options;
    };

    return config;
};
