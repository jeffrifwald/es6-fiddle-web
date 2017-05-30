const passport = require('../auth');
const Fiddles = require('../db/fiddles');
const Users = require('../db/users');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('ensureAuthenticated: failed');
    res.redirect('/github/login');
}

module.exports = app => {
    app.get('/profile/:_id', (req, res) => {
        Users.find({ _id: req.params._id }).then( user => {
            Fiddles.find({ userId: req.params._id }).then(fiddles => {
                res.render('authenticated', {
                    user: user, fiddles: fiddles,
                    message: req.flash()
                });
            })
        })
            .catch(e => res.status(400).send(e));
    });
}
