var mongo = require('mongodb').MongoClient,
    fiddles = null;

module.exports = function(app) {
    mongo.connect(String(process.env.MONGOHQ_URL), function(err, db) {
        fiddles = db.collection('fiddles');
    });

    app.get('/embed/:id', function(req, res) {
        var fiddle = req.params.id;
        if (fiddle) {
            fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (item) {
                    res.sendfile(__dirname + '/static/embed.html');
                } else {
                    res.json({
                        'message': 'No fiddle found.'
                    });
                }
            });
        }
    });

    app.get(/^\/fiddles\/\w+$/, function(req, res) {
        var fiddle = req.url.split('/').pop();

        if (fiddle) {
            fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (item) {
                    res.json(item);
                } else {
                    res.json({
                        'message': 'No fiddle found.'
                    });
                }
            });
        }
    });

    app.post('/save', function(req, res) {
        var now = Date.now(),
            fiddle = parseInt(now, 10).toString(36);

        if (req.body.value) { //don't save anything empty
            fiddles.findOne({fiddle: fiddle}, function(err, item) {
                if (!item) {
                    fiddles.insert({
                        fiddle: fiddle,
                        value: req.body.value
                    }, function() {
                        console.log('Inserted fiddle at', fiddle + '.');
                    });
                }
            });
        }

        res.json({
            saved: true,
            fiddle: fiddle
        });
    });
};
