const mongoose=require('mongoose')

const courtSchema=mongoose.Schema({
    courtName:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,      
    },
    courtPicture:
    {
        type:String,
        required:true
    },
    timeStamp:{
        type:Date,
        default:new Date
    }    
})
const court=mongoose.model('courts',courtSchema)
module.exports=court