const USERS= require('../Modals/userModel')
const bcrypt = require('bcrypt'); // Require bcrypt to use
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const  doSignUp =async(req,res)=>{
   const users= await USERS.findOne({email:req.body.email})
if (users) {
    res.status(200).json({message:"email already exist"})
    return
}
//console.log(req.body,"sign up data");
bcrypt.hash(req.body.password, saltRounds, (err, hash) => {      // Now we can store the password hash in db. 
    console.log(hash);
    USERS({
        fname:req.body.fName,
        lname:req.body.lName,
        birthday:req.body.birthday,
        gender:req.body.gender,
        email:req.body.email,
        password:hash,
        phone:req.body.phone,
        role:req.body.role
    }).save().then((response)=>{
        res.status(200).json({message:"signup successful"})
    })
  });
}   
const doLogin=async(req,res)=>{
    //console.log(req.body,"step 1");
    const user=await USERS.findOne({email:req.body.email})
//console.log(user,"step 2");
if(user){
    bcrypt.compare(req.body.password,user.password,(err,hashRes)=>{
       // console.log(hashRes,"step 3");
        if (hashRes){
            //console.log("cred true step 4",process.env.JWT_PASSWORD);
            const token=jwt.sign({userId:user._id,email:user.email,fname:user?.fname,lname:user.lname,role:user?.role},"courtbooking",{expiresIn:'2d'})
        //console.log(token,"step 5");
        user.password=undefined
            res.status(200).json({message:'login successfull',token:token,user:user})
            
        }
    })
   }   else{
        res.status(200).json({message:"invalid credentials",token:null})
    }
}
module.exports={doSignUp,doLogin}