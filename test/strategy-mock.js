/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */

var passport = require('passport'),
    util = require('util');

function StrategyMock(options, verify) {
    this.name = 'mock';
    this.passAuthentication = options.passAuthentication || true;
    this.userId = options.userId || 1;
    this.verify = verify;
}

util.inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = function authenticate(req) {
    if (this.passAuthentication) {
        var user = {
                id: this.userId
            },
            self = this;
        this.verify(user, function(err, resident) {
            if (err) {
                self.fail(err);
            } else {
                self.success(resident);
            }
        });
    } else {
        this.fail('Unauthorized');
    }
}

module.exports = StrategyMock;
