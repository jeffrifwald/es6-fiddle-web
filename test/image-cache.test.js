var request = require('supertest'),
    superagent = require('superagent'),
    expect = require('chai').expect,
    app = require('./../app').app,
    fs = require('fs');

describe('GET /images/', () => {
	fs.readdir(__dirname.replace(/test/, "static/images/"), (err, files) => {
		files.forEach( file => {
			it(`${file} responds with a max-age of 2628000`, (done) => {
				request(app)
				.get(`/images/${file}`)
				.expect(200)
				.expect((res) => {
					expect(res.headers['cache-control']).to.equal('public, max-age=2628000');
				}).end(done);
			});

		});
	});
});