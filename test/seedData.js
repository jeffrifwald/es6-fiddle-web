var mongoose = require('mongoose'),
    Fiddles = require('./../db/fiddles'),
    Users = require('./../db/users');

var user1 = {
    _id: new mongoose.Types.ObjectId(),
    githubId: 1111111,
    login: 'testUser1',
    name: 'testUser1',
}

var user2 = {
    _id: new mongoose.Types.ObjectId(),
    githubId: 2222222,
    login: 'testUser2',
    name: 'testUser2',
}

Users.insertMany([user1,user2]).then( () => console.log('       test users inserted to db'))
                                       .catch( e => console.log(e));

var fiddleU1 = {
  userId: user1._id,
  fiddle: parseInt( Date.now() , 10).toString(36),
  value: "console.log('Testing....');",
}

var fiddleU2 = {
  userId: user2._id,
  fiddle: parseInt( Date.now()+1 , 10).toString(36),
  value: "console.log('Testing....');",
}

var fiddleGuest = {
  fiddle: parseInt( Date.now()+2 , 10).toString(36),
  value: "console.log('Testing....');",
}

Fiddles.insertMany([fiddleU1,fiddleU2,fiddleGuest]).then( () => console.log('       test Fiddles inserted to db'))
                                       .catch( e => console.log(e));

module.exports = {
    testUser : {user1,user2},
    testFiddle : {fiddleU1,fiddleU2,fiddleGuest}
};
