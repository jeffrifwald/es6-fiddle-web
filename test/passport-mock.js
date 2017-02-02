/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */

var passport = require('passport'),
    StrategyMock = require('./strategy-mock'),
    Users = require('./../db/users');

function verifyFunction(user, done) { // user = { id: 1};
    // Emulate database fetch result
    Users.findById(user.id).then ( user => done(null,user))
                           .catch( e => done(e,null));

}

module.exports = function(app, options) {
    // create your verify function on your own -- should do similar things as
    // the "real" one.
    passport.use(new StrategyMock(options, verifyFunction));
    app.get('/mock/login', passport.authenticate('mock'), (req,res) => {
        res.send({user:req.user});
    });
};
