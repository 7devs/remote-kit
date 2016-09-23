var express = require('express'),
    bdp = require('body-parser'),
    app = express(),
    port = 8999;

app.use(bdp.urlencoded({
    extended: false
}));

app.use(express.static('static', {
    index: false,
    maxAge: '7 days'
}));

app.use('/exec', require('./lib/routers/exec.js'));

app.use('/*', function(req, res, next) {
    res.status(404).send('NOT FOUND.');
});

app.listen(port, function(err) {
    console.log('--== Remote Kit ==--');
});
