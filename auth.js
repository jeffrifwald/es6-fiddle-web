var passport = require('passport'),
    GitHubStrategy = require('passport-github2').Strategy,
    Users = require('./db/users');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID  || 'see_sample.env_file',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'see_sample.env_file',
    callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {

    Users.findOrCreate(profile,accessToken).then ( (user) => {
                                                    done(null,user)
                                                })
                                           .catch( err => {
                                                    done(err,null)
                                                });
}));


module.exports = passport;
