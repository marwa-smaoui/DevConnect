const mongoose = require("mongoose");
const { Schema } = mongoose;

const profilSchema = new Schema({

  contact:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Contact'
        },

  company:{
     type:String
  },
  website:{
   type:String
   
    },
  location:{
   type:String
   },
 status:{
type:String,
required:true
 },

 skills:{
    type:[String],
    required:true
         },
 bio:{
 type:String
            
  },
  githubusername:{
   type:String
              
    },

experience:[{
   title:{
      type:String
                    
      },

  company:{
   type:String
                 
   },
   location:{
      type:String
                    
      },
      from:{
         type:Date,
         required:true

                       
         },
         to:{
            type:Date
                          
            },
    current:{
       type:Boolean,
       default:false
    },
    description:{
      type:String,
     
   },

}],

education:[{
school:{
   type:String,
   required:true
},
degree:{
   type:String,
   required:true
},
filedofstudy:{
   type:String,
   required:true
},

from:{
   type:Date,
   required:true

                 
   },
   to:{
      type:Date
                    
      },
current:{
 type:Boolean,
 default:false
},
description:{
type:String,

},


}],
social:{
youtube:{
 type:String
},
facebook:{
   type:String
  },
  twitter:{
   type:String
  },
  linkedin:{
   type:String
  },
  instagram:{
   type:String
  },
},
date:{
   type:Date,
   default:Date.now
}
    
})
module.exports=mongoose.model('Profile',profilSchema)