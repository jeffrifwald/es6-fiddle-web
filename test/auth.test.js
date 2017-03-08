var request = require('supertest'),
    superagent = require('superagent'),
    expect = require('chai').expect,
    app = require('./../server/app').app,
    passportMock = require('./passport-mock'),
    { testUser, testFiddle } = require('./seedData');

describe('GET /github/myProfile authorized', function() {
    var agent = request.agent(app);
    beforeEach(function(done) {
        passportMock(app, {
            passAuthentication: true,
            userId: testUser.user1._id
        });
        agent.get('/mock/login')
            .end(function(err, result) {
                if (!err) {
                    done();
                } else {
                    done(err);
                }
            });
    })

    it('should allow access to /github/myProfile', function(done) {
        var req = agent.get('/github/myProfile');
        //agent.attachCookies(req);
        req.expect(200, done);
    });
            
});
