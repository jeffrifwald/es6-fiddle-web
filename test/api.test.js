//var mongo = require('mongodb').MongoClient,
var request = require('supertest'),
    superagent = require('superagent'),
    expect = require('chai').expect,
    app = require('./../app').app,
    Fiddles = require('./../db/fiddles'),
    passportMock = require('./passport-mock'),
    { testUser, testFiddle } = require('./seedData');

// var testFiddle = new Fiddles({
//     fiddle: parseInt( Date.now() , 10).toString(36),
//     value: "console.log('Testing....');"
// });

// testFiddle.save().then ( (fiddle) => console.log('Test Fiddle Saved', JSON.stringify(fiddle,undefined,2)))
//                  .catch( e => console.log('Error while saving test fiddle',e));


describe('POST /save', function () {

    it('Should save fiddle in to database', (done) => {
        var fiddleValue = "console.log('Testing....');"

        request(app).post('/save').send({value: fiddleValue })
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.be.a('string');
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                // Make sure fiddle is saved in database
                Fiddles.findOne({ fiddle:res.body.fiddle }, function (err, item) {
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
                                  .expect( res => {
                                        expect(res.body).to.empty;                                        
                                    })
                                  .end(done);
    });

});

describe('POST /save Authorized', function () {
    var agent = request.agent(app);
    beforeEach(function(done) {
        passportMock(app, {
            passAuthentication: true,
            userId: testUser.user1._id
        });
        agent.get('/mock/login')
            .end(function(err, result) {
                if (!err) {
                    //console.log(JSON.stringify(result,undefined,2));
                    done();
                } else {
                    done(err);
                }
            });
    })

    it('Types of users')
        it('user1 - Registered  user - currently logged in ');
        it('user2 - Registered  user');
        it('guest - Not Registered');
 
    it('Should Update existing fiddle for user1', done => {
            let newFiddle = {
                        fiddle: testFiddle.fiddleU1.fiddle,
                        value: 'console.log("updating existing fiddle")'}
            agent.post('/save').send(newFiddle)
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.equal(newFiddle.fiddle);
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                    // Make sure same fiddle fiddle is saved in database
                    Fiddles.findOne({ fiddle:newFiddle.fiddle }, function (err, item) {
                        if (err) {
                            return done(err);
                        }
                    expect(item.fiddle).to.equal(res.body.fiddle);
                    expect(item.value).to.equal(newFiddle.value);
                    expect(item.userId).to.eql(testUser.user1._id);
                    done();
                });
            });
    });

    it('should create new fiddle for user1 if user1 is trying to update user2\'s fiddle', done => {
            let newFiddle = {
                        fiddle: testFiddle.fiddleU2.fiddle,
                        value: 'console.log("updating existing fiddle")'}
            agent.post('/save').send(newFiddle)
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.not.equal(newFiddle.fiddle);
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                    // Make sure same fiddle fiddle is saved in database
                    Fiddles.findOne({ fiddle:res.body.fiddle }, function (err, item) {
                        if (err) {
                            return done(err);
                        }
                    expect(item.fiddle).to.not.equal(newFiddle.fiddle);
                    expect(item.value).to.equal(newFiddle.value);
                    expect(item.userId).to.eql(testUser.user1._id);
                    done();
                });
            });
    });

    it('should create new fiddle if existing fiddle doen\'t have userID property.', done => {
            let newFiddle = {
                        fiddle: testFiddle.fiddleGuest.fiddle,
                        value: 'console.log("updating existing fiddle")'}
            agent.post('/save').send(newFiddle)
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.not.equal(newFiddle.fiddle);
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                    // Make sure same fiddle fiddle is saved in database
                    Fiddles.findOne({ fiddle:res.body.fiddle }, function (err, item) {
                        if (err) {
                            return done(err);
                        }
                    expect(item.fiddle).to.not.equal(newFiddle.fiddle);
                    expect(item.value).to.equal(newFiddle.value);
                    expect(item.userId).to.eql(testUser.user1._id);
                    done();
                });
            });
    });

    it('should create new fiddle for guest user. if guest is trying to update user2\'s fiddle', done => {
            let newFiddle = {
                        fiddle: testFiddle.fiddleU1.fiddle,
                        value: 'console.log("updating existing fiddle")'}
        request(app).post('/save').send(newFiddle)
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.not.equal(newFiddle.fiddle);
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                    // Make sure same fiddle fiddle is saved in database
                    Fiddles.findOne({ fiddle:res.body.fiddle }, function (err, item) {
                        if (err) {
                            return done(err);
                        }
                    expect(item.fiddle).to.not.equal(newFiddle.fiddle);
                    expect(item.value).to.equal(newFiddle.value);
                    expect(item.userId).to.undefined;
                    done();
                });
            });
    });
});


describe('GET /fiddles/fiddle', function () {
    it('should get correct fiddle from DB', (done) => {
        request(app).get('/fiddles/'+testFiddle.fiddleGuest.fiddle)
                    .expect(200)
                    .expect( res => {
                        expect(res.body).to.not.null;
                        expect(res.body.fiddle).to.equal(testFiddle.fiddleGuest.fiddle);
                        expect(res.body.value).to.equal(testFiddle.fiddleGuest.value);
                    })
                    .end(done);
    });

    it('should not return fiddle', (done) => {
        request(app).get('/fiddles/'+ parseInt( Date.now() , 10).toString(36) )
                    .expect(404) 
                    .expect( res => {
                        expect(res.body).to.exist;
                        expect(res.body.fiddle).to.not.exist;
                        expect(res.body.value).to.not.exist;
                        expect(res.body.message).to.exist;
                        
                    })
                    .end(done);
    });
});


describe('POST /star/:fiddle', function () {
    var agent = request.agent(app);
    beforeEach(function(done) {
        passportMock(app, {
            passAuthentication: true,
            userId: testUser.user1._id
        });
        agent.get('/mock/login')
            .end(function(err, result) {
                if (!err) {
                    //console.log(JSON.stringify(result,undefined,2));
                    done();
                } else {
                    done(err);
                }
            });
    })
    it('Should Star fiddle', done => {
        agent.post('/star/'+testFiddle.fiddleU1.fiddle)
                .expect(200)
                .end((err,res) => {
                    if(err) 
                        return done(err);
                    Fiddles.findOne({fiddle:testFiddle.fiddleU1.fiddle}).then(fiddle =>{
                        expect(fiddle.starCounter).to.equal(1);
                        done();
                    }).catch( e => done(e));
                });
    });

    it('Should return 400 if user trying to Star a fiddle AGAIN', done => {
        agent.post('/star/'+testFiddle.fiddleU1.fiddle)
                .expect(400)
                .end((err,res) => {
                    if(err) 
                        return done(err);
                    done();
                });
    });

    it('Shuold return 400 unknown fiddle', done => {
        agent.post('/star/'+parseInt( Date.now() , 10).toString(36))
                .expect(400)
                .end((err,res) => {
                    if(err) 
                        return done(err);
                    done();
                });
    });

    it('should return 401 for unauthorized user', done => {
        request(app).post('/star/'+testFiddle.fiddleU1.fiddle)
                .expect(401)
                .end((err,res) => {
                    if(err) 
                        return done(err);
                    done();
                });
    });

});