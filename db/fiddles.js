var mongoose = require('./mongoose');


var fiddles = mongoose.model('fiddles', {

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


module.exports = fiddles

