var mongoose = require('./mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
    
    login: String,
    name: String,
    email: String,
    avatar_url: String,
    url: String,        //"https://api.github.com/users/octocat"
    html_url: String,   //"https://github.com/octocat",
    location: String,
    company: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,

    accessToken:String,
    refreshToken:String,
    totalFiddles:Number,
    startedFiddles:[String]     //We will store fiddle string here NOT objectID
});

var Users = mongoose.model('Users',usersSchema)

module.exports = Users ;
