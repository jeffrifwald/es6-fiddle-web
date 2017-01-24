/**
 * Run this file to test DB
 * Only need to run this file after setting up MONGODB_URI
 * 
 * export MONGODB_URI='mongodb://localhost:27017/fiddles'
 * 
 * Not actual test file this is just to check if any conflict with old and new database schema
 */

//Just ran this file after setting up MONGODB_URI

var mongoose = require('mongoose'),
    Users = require('./users'),
    fiddles = require('./fiddles');


var userId= new mongoose.Types.ObjectId();

var user = new Users({
    login: 'octocat',
    name: 'monalisa octocat',
    email: 'octocat@github.com',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    url:'https://api.github.com/users/octocat',
    html_url: 'https://github.com/octocat',
    location: 'San Francisco',
    company: 'GitHub',
    public_repos: 2,
    public_gists: 4,
    followers: 20,
    following: 0,

    accessToken:'randomAccesToken',
    refreshToken:'randomRefreshToken',
    totalFiddles:2,
});

//With UserID
var testFiddle1 = new fiddles({
    userId:userId,
    fiddle: parseInt( Date.now() , 10).toString(36),
    value: "console.log('Testing....');"
});

//With UserID
var testFiddle2 = new fiddles({
    fiddle: parseInt( Date.now() , 10).toString(36),
    value: "console.log('Testing....');"
});


user.save().then( (user) => console.log('User Added:',JSON.stringify(user,undefined,2)))
                 .catch( (e) => console.log(e));


testFiddle1.save().then( (fiddle) => console.log('Fiddle added(with UserID):',JSON.stringify(fiddle,undefined,2)))
                          .catch( (e) => console.log(e));

testFiddle2.save().then( (fiddle) => console.log('Fiddle added(without UserID):',JSON.stringify(fiddle,undefined,2)))
                          .catch( (e) => console.log(e));

