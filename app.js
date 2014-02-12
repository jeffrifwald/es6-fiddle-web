var express = require('express'),
    app = express(),
    port = 8080;

app.configure(function() {
    app.use('/', express.static(__dirname + '/static'));
});

app.listen(port);
