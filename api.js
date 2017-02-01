//var mongo = require('mongodb').MongoClient,
var  Fiddles = require('./db/fiddles');

module.exports = function(app) {
    // mongo.connect(String(process.env.MONGODB_URI), function(err, db) {
    //     fiddles = db.collection('fiddles');
    // });

    // This will match /fiddles/fiddleNo
    app.get(/^\/fiddles\/\w+$/, function(req, res) {
        var fiddle = req.url.split('/').pop();

        if (fiddle) {
            Fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (item) {
                    res.json(item);
                } else {
                    res.status(404).json({
                        'message': '\/* Oops! I got 404,\n * but not the fiddle \"' + fiddle + 
                                            '\" you are looking for :( \n *\/\n'
                    });
                }
            });
        }
    });

    app.post('/save', function(req, res) {

        var fiddle;

        if (req.body.value) { //don't save anything empty
            if (req.body.fiddle !== - 1 && req.isAuthenticated()){  //Check if user trying to save existing fiddle;
                fiddle = req.body.fiddle;
            } else {
                fiddle = parseInt(Date.now(), 10).toString(36);
            }
            Fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (!item) { //If no fiddle found save new fiddle
                    let newFiddle = new Fiddles({
                        fiddle: fiddle,
                        value: req.body.value
                    });
                    if (req.isAuthenticated()) {
                        newFiddle.userId = req.user._id;
                    }
                    newFiddle.save(function() {
                        console.log('Inserted fiddle at', fiddle + '.');
                        res.json({      //send response after saving fiddle
                            saved: true,
                            fiddle: fiddle
                        });
                    });
                } else { //Existing fiddle found update that fiddle
                    if ( item.userId && item.userId.toHexString() === req.user._id) {
                        item.value = req.body.value;
                        item.save().then( () =>{
                                    console.log('updated fiddle at', fiddle + '.');
                                    res.json({      //send response after saving fiddle
                                        saved: true,
                                        fiddle: fiddle
                                    });
                                })
                                .catch( () => res.status(400).send());
                    } else {
                        fiddle = parseInt(Date.now(), 10).toString(36);
                        let newFiddle = new Fiddles({
                            fiddle: fiddle,
                            value: req.body.value,
                            userId:req.user._id
                        });
                        newFiddle.save().then( () =>{
                                    console.log('Inserted fiddle at', fiddle + '.');
                                    res.json({      //send response after saving fiddle
                                        saved: true,
                                        fiddle: fiddle
                                    });
                                })
                                .catch( () => res.status(400).send());
                    }
                } 
            });
        } else {
            res.status(400).send();
        } 
    });
};
