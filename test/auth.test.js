var request = require('supertest'),
    superagent = require('superagent'),
    expect = require('chai').expect,
    app = require('./../app').app,
    passportMock = require('./passport-mock'),
    { testUser, testFiddle } = require('./seedData');

describe('GET /github/onlyAuthoisedUser authorized', function() {
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

    it('should allow access to /github/onlyAuthoisedUser', function(done) {
        var req = agent.get('/github/onlyAuthoisedUser');
        //agent.attachCookies(req);
        req.expect(200, done);
    });
            
});
