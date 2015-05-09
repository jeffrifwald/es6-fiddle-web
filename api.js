var mongo = require('mongodb').MongoClient,
    fiddles = null,
    mongoConnectionStr = process.env.MONGOHQ_URL ?
        String(process.env.MONGOHQ_URL) :
        'mongodb://localhost:27017/es6-fiddle';

module.exports = function(app) {
    
    mongo.connect(mongoConnectionStr, function(err, db) {
        if (err) {
            console.error('✗ MongoDB Connection Error ', err);
        } else {
            fiddles = db.collection('fiddles');
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
