const expect = require('chai').expect,
  Users = require('../server/db/users');

describe('Users model', () => {
  const user = new Users({
    githubId: 3333333,
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

  it('saves appropriate fields', (done) => {
    user.save().then((savedUser) => {
      expect(savedUser.login).to.equal('octocat');
      expect(savedUser.accessToken).to.equal('randomAccesToken');
      done();
    }).then(null, done);
  });

  it('findOrCreate updates accessTokens', (done) => {
    const profile = { id: user.githubId };
    Users.findOrCreate(profile, 'newToken').then((savedUser) => {
      expect(savedUser.login).to.equal('octocat');
      expect(savedUser.accessToken).to.equal('newToken');
      done();
    }).then(null, done);
  });
});
