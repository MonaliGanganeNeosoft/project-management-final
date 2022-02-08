const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const sendToken= require("../utils/jwtToken");
const cloudinary = require("cloudinary");

//Register User
exports.registerUser =catchAsyncErrors( async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    
    const {first_name,last_name,email,password}=req.body;
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
            // public_id:"id1",
            // url:"pro1",
        },
    });
    console.log(user)
    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        token,
    })
    sendToken(user,201,res)
});

//login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHander("pls enter a email and password",400));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid email or password",401))
    }
    const isPasswordMatched =await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401))
    }
    sendToken(user,200,res)
    // console.log(res)
    //const token = user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token,
    // })
});

//logout user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})