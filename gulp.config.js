'use strict';

module.exports = function() {
    const client = './public/';
    const server = './server/';
    const clientApp = client + 'app/';
    const clientAssets = client + 'assets/';
    const clientStyles = clientAssets + 'css/';
    const temp = './.tmp/';

    let config = {
        /**
         *  File paths
         */
        alljs: [
            client + '/**/*.js',
            server + '**/*.js',
            './*.js',
        ],
        build: './build/',
        client,
        css: clientStyles + 'style.css',
        htmltemplates: clientApp + '**/*.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
        ],
        index: client + 'index.html',
        server,
        temp,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/',
            },
        },

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
        nodeServer: server + './server.js',
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
