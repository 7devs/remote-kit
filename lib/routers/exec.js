var rout = require('express').Router()
    conf = require('../config'),
    $ = require('../utils');

rout.route('/ls')
    .get(function(req, res, next) {
        $.exec(res, ['ls -lh', 'ls -lh'], [{cwd: '/usr'}, {cwd: conf.baseFolder}]);
    });

rout.route('/project')
    .put(function(req, res, next) {
        var port = req.body.port;
        $.exec(res, [
            'git pull',
            'npm install',
            `pm2 restart we${port}`
        ], {cwd: $.path.join(conf.baseFolder, port)});
    })
    .patch(function(req, res, next) {
        var port = req.body.port;
        $.exec(res,[
            'npm install',
            `pm2 start index.js --name "we${port}"`
        ], {cwd: $.path.join(conf.baseFolder, port)}
        );
    })
    .post(function(req, res, next) {
        var port = req.body.port,
            url = req.body.url;
        $.exec(res, [
            `mkdir ${port}`,
            `git clone ${url} ${port}`,
        ], [
            {cwd: conf.baseFolder},
            {cwd: conf.baseFolder},
            {cwd: $.path.join(conf.baseFolder, port)}
        ]);
    });

module.exports = rout;
