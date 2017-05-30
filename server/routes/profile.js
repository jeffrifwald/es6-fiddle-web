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
        const _id = req.params._id

        if(req.user && _id === req.user._id){
            res.redirect('/github/myProfile')
        } else {
            Users.findOne({ _id: _id }).then( user => {
                Fiddles.find({
                    userId: req.params._id,
                    isPrivate: false
                }).then( fiddles => {
                    res.render('authenticated', {
                        user: user, fiddles: fiddles,
                        startedFiddles: [],
                        message: req.flash()
                    });
                })
            })
                .catch(e => res.status(400).send(e));
        }
    });
}
