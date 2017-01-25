require('dotenv').config();

var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('./auth'),
    pkg = require('./package.json'),
    api = require('./api'),
    app = express(),
    port = Number(process.env.PORT || 5001);

app.use(compression());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

//Passport middleware function to make sure user is authenticated.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('ensureAuthenticated: failed');
    res.redirect('/github/login');
}

app.use('/', express.static(__dirname + '/static'));

// This one is matching '/xyz/' NOT -> '/xyz/sdf'
app.get(/^\/\w+\/$/, function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.get(/^\/embed\/\w+\/$/, function(req, res) {
    res.sendFile(__dirname + '/static/embed.html');
});

// This one is matching '/xyz' NOT -> '/xyz/'
app.get(/^\/\w+$/, function(req, res) {
    res.redirect(req.url + '/');
});

app.get(/^\/embed\/\w+$/, function(req, res) {
    res.redirect(req.url + '/');
});

app.get('/github/login', function(req, res) {
    res.send('you are in login page! you are not logged in.');
});

//TESTING URL FOR GITHUB 
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }), function(req, res) {
      // The request will be redirected to GitHub for authentication, so this
     // function will not be called.
      console.log('just to get rid of lint error !',res);
  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { 
      failureRedirect: '/github/login', failureFlash: true }),
  function(req, res) {
    // Successful authentication, redirect home.
      res.redirect('/github/onlyAuthoisedUser');
  });

app.get('/github/onlyAuthoisedUser', ensureAuthenticated, function(req, res) {
    // Testing for authorised user
    res.send(req.user);
});

app.get('/github/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

api(app);

app.listen(port);

console.log(
    'Express version ' +
    pkg.dependencies.express.replace(/[^\w\.]/g, '') +
    ' starting server on port ' +
    port +
    '.'
);

module.exports.app = app;
