var mongoose = require('./mongoose'),
    Schema = mongoose.Schema;

var fiddlesSchema = new Schema({

    userId:{    
        type:mongoose.Schema.Types.ObjectId,
    },
    fiddle:{
        type:String,
        require:true
    },
    value:{
        type:String,
        require:true
    }


});

var fiddles = mongoose.model('fiddles', fiddlesSchema);

module.exports = fiddles

