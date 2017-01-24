//var mongo = require('mongodb').MongoClient,
var  Fiddles = require('./db/fiddles');

module.exports = function(app) {
    // mongo.connect(String(process.env.MONGODB_URI), function(err, db) {
    //     fiddles = db.collection('fiddles');
    // });

    app.get(/^\/fiddles\/\w+$/, function(req, res) {
        var fiddle = req.url.split('/').pop();

        if (fiddle) {
            Fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (item) {
                    res.json(item);
                } else {
                    res.status(404).json({
                        'message': '\/* Oops! I got 404,\n * but not the fiddle \"' + fiddle + '\" you are looking for :( \n *\/\n'
                    });
                }
            });
        }
    });

    app.post('/save', function(req, res) {
        var now = Date.now(),
            fiddle = parseInt(now, 10).toString(36);

        if (req.body.value) { //don't save anything empty
            Fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (!item) {
                    var newFiddle = new Fiddles({
                        fiddle: fiddle,
                        value: req.body.value
                    });
                    newFiddle.save(function() {
                        console.log('Inserted fiddle at', fiddle + '.');
                        res.json({      //send response after saving fiddle
                            saved: true,
                            fiddle: fiddle
                        });
                    });
                }
            });
        } else {
            res.status(400).send();
        } 
    });
};
