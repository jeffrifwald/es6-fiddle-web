var express = require('express'),
    app = express(),
    port = 5000;

app.configure(function() {
    app.use('/', express.static(__dirname + '/static'));
});

app.listen(port);
