var mongoose = require('./mongoose');


var Users = mongoose.model('Users', {
    
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
});


module.exports = Users ;
