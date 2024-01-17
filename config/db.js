const mongoose = require('mongoose')
const connectDb=async ()=>{
    try{
        const connection = await mongoose.connect('mongodb+srv://anushma2015:oltewAl6fEMkd9Lv@cluster0.9rcwnk4.mongodb.net/',{
    useNewUrlParser:'true'
    })
    console.log("MongoDb database connected")
}
catch(err){
    console.log(err);
}
}
module.exports=connectDb



//oltewAl6fEMkd9Lv