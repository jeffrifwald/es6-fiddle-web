var mongo = require('mongodb').MongoClient,
    request = require('superTest'),
    expect = require('chai').expect,
    app = require('./../app').app;

var testFiddle = {
    fiddle: parseInt( new Date(), 10).toString(36),
    value: "console.log('Testing....');"
}

mongo.connect(String(process.env.MONGODB_URI), function (err, db) {
    fiddles = db.collection('fiddles');
    fiddles.insert(testFiddle);
});


// beforeEach( () =>{
//     fiddles.findOne({fiddle:testFiddle.fiddle}, (err,item) => {
//             if(err)
//                 return ;
//             console.log('test fiddle',item);
            
//         });
// });



describe('/save', function () {

    it('Should save fiddle in to database', (done) => {
        var fiddleValue = "console.log('Testing....');"

        request(app).post('/save').send({ value: fiddleValue })
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.be.a('string');
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                // Make sure fiddle is saved in database
                fiddles.findOne({ fiddle:res.body.fiddle }, function (err, item) {
                    if (err) {
                        return done(err);
                    }
                    expect(item).to.not.null;
                    expect(item.fiddle).to.equal(res.body.fiddle);
                    expect(item.value).to.equal(fiddleValue);
                    done();
                });
            });
    });

    it('Should return 400 Bad Request for empty fiddle (no value)', (done) =>{
        request(app).post('/save').send({ })
                                  .expect(400)
                                  .end(done);
    });


});