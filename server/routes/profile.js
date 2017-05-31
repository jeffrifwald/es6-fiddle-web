const Fiddles = require('../db/fiddles');
const Users = require('../db/users');

module.exports = app => {
    app.get('/profile/:_id', (req, res) => {
        const _id = req.params._id

        if(req.user && _id === req.user._id){
            res.redirect('/github/myProfile')
        } else {
            Users.findOne({ _id: _id }, (err, user) => {
                if (user){
                    Fiddles.find({
                        userId: req.params._id,
                        isPrivate: false
                    }).then( fiddles => {
                        res.render('profile', {
                            user: user, fiddles: fiddles,
                            message: req.flash(), publicProfile: true,
                            authenticatedProfile: false,
                        });
                    })
                } else {
                    res.render('profile', {
                        _id: _id,
                    });
                }
            })
        }
    });
}
