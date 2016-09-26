var express = require('express'),
    bdp = require('body-parser'),
    path = require('path'),
    app = express(),
    port = 8999;

app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'ejs');

app.use(bdp.urlencoded({
    extended: false
}));

app.use(express.static('static', {
    index: false,
    maxAge: '7 days'
}));

app.use('/exec', require('./lib/routers/exec.js'));

app.use('/*', function(req, res, next) {
    res.render('index');
});

app.listen(port, function(err) {
    console.log('--== Remote Kit ==--');
});
