const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'pls enter your name'],
        maxlength:[20,'name cannot exceed 2p char'],
        minlength:[4,'name should have more than 4 char']
    },
    last_name:{
        type:String,
        required:[true,'pls enter your name'],
        maxlength:[20,'name cannot exceed 2p char'],
        minlength:[4,'name should have more than 4 char']
    },
    email:{
        type:String,
        required:[true,'pls enter your email'],
        unique:true,
        validate:[validator.isEmail,'pls anter avalid email']
    },
    password:{
        type:String,
        required:[true,'pls enter your password'],
        minlength:[3,'password should be grather than 3 char'],
        select:false,
    },
   
    avatar:{
        public_id:{
            type:String,
            required:false
        },
        url:{
            type:String,
            required:false
        },
    },
            
    role:{
        type:String,
        default:"user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password =await bcrypt.hash(this.password,10)
})
//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model("User",userSchema);