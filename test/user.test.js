const { expect } = require('chai'),
  Users = require('../server/db/users'),
  mongoose = require('mongoose');

const MONGODB_URI_TEST = 'mongodb://localhost:27017/Fiddles_Test';

beforeEach((done) => {
  function clearDB() {
    for (let i = 0; i < mongoose.connection.collections.length; i += 1) {
      mongoose.connection.collections[i].remove(() => {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    return mongoose.connect(MONGODB_URI_TEST, (err) => {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  }

  return clearDB();
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});


describe('Database Tests', () => {
  let testUser;

  beforeEach(() => {
    testUser = new Users({
      login: 'octocat',
      name: 'monalisa octocat',
      email: 'octocat@github.com',
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      url: 'https://api.github.com/users/octocat',
      html_url: 'https://github.com/octocat',
      location: 'San Francisco',
      company: 'GitHub',
      public_repos: 2,
      public_gists: 4,
      followers: 20,
      following: 0,
      accessToken: 'randomAccesToken',
      refreshToken: 'randomRefreshToken',
      totalFiddles: 2,
    });
  });

  describe('Users: models', () => {
    describe('#create()', () => {
      it('should create a new User', (done) => {
        // Create a User object to pass to User.create()
        Users.create(testUser, (err, createdUser) => {
          // Confirm that that an error does not exist
          // verify that the returned user is what we expect
          expect(createdUser.name).to.equal('monalisa octocat');
          expect(createdUser.accessToken).to.equal('randomAccesToken');
          // Call done to tell mocha that we are done with this test
          return done();
        });
      });
    });
  });
});
