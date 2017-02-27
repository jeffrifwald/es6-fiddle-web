var passport = require('passport'),
    GitHubStrategy = require('passport-github2').Strategy,
    Users = require('./db/users');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'abdc217a39032413bc71',
    clientSecret: '78bd8bdbb1b4d6383d8b59ba9079281ae174c06c',
    callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
    Users.findOrCreate(profile,accessToken).then ( user => {
        done(null,user)
    })
    .catch( err => {
        done(err,null)
    });
}));


module.exports = passport;
