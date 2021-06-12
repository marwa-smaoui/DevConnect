const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({

  contact:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Contact'
        },
text:{
    type:String,
    required:true
},
name:{
    type:String,
    
},
avatar:{
    type:String,
    
},
likes:[{
    contact:{
        type:Schema.Types.ObjectId,
        ref:'Contact'
    },
}],
comments:[{
    contact:{
        type:Schema.Types.ObjectId,
        ref:'Contact'
    },
    text:{
        type:String,
        required:true
    },
name:{
    type:String,
    
},
avatar:{
    type:String,
    
},
date:{
    type:Date,
    default:Date.now
}
}],
date:{
    type:Date,
    default:Date.now
}

    })
module.exports=mongoose.model('Post',postSchema)

