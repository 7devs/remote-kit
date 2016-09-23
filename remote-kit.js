var app = require('express')(),
    port = 8999;

app.use('/', require('./lib/routers/main.js'));

app.listen(port, function(err) {
    console.log('--== Remote Kit ==--');
});
