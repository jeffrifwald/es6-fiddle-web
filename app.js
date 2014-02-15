var express = require('express'),
    pkg = require('./package.json'),
    app = express(),
    port = Number(process.env.PORT || 5000),
    expressVersion = pkg.dependencies.express.replace(/[^\w\.]/g, '');

app.use(express.compress());
app.use(express.logger());
app.use(express.favicon(__dirname + '/static/images/favicon.png'));

app.configure(function() {
    app.use('/', express.static(__dirname + '/static'));
});

app.listen(port);

console.log('Express version ' + expressVersion + ' starting server on port ' + port + '.');
