const mongoose=require('mongoose')

const courtSchedulesSchema=mongoose.Schema({
  date:{
        type:Date,
        required:true,
    },
   slot:{
        type:Object,
        required:true
    },
   cost:{
        type:Number,
        required:true,
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
       ref:'users'      
    },
    Cancellation:{
        type:Array,//userid,payment
       
    },
   courtId:{
    type:mongoose.Types.ObjectId,
    ref:'courts'
    },
    paymentOrders:{
        type:Array
    }    
})
const courtSchedules=mongoose.model('courtSchedules',courtSchedulesSchema)
module.exports=courtSchedules