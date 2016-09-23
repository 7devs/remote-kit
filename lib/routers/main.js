var rout = require('express').Router();

rout.route('/')
    .get(function(req, res, next) {
        res.send('ok');
    });
