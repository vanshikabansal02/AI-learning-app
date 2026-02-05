import jwt from 'jsonwebtoken'
import User from '../model/User.js'
 //generate jwt token
 const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE || "7d",
 });
 }  

 //@desc register new user
 //@route POST/api/auth/register
 //@access Public
 export const register=async(req,res,next)=>{

  try{
 const{username,email,password}=req.body;

 const userExists=await User.findone({$or:[{email}]});

 if(userExists){
    return res.status(400).json({
        success:false,
        error:
        userExists.email===email?
        "email already registered"
        :"username already taken",
        statusCode:400,
    });
 }
    //else create user
    const user=await User.create({
        username,
        email,
        password
    });
 
//generate token
const token=generateToken(user._id);
 res.status(201).json({
    success:true,
    data:{
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            profieImage:user.profileImage,
            createdAt:user.createdAt,
        },
        token,
    },
    meassage:"user registered succesfully",
 });

  }catch(error){
    next(error);
  }

 };

 ////login user

 export const login=async(req,res,next)=>{


  try{
    const {email,password}=req.body;
    //validate input
    if(!email ||!password){
      return res.status(400).json({
        success:false,
        error:"please provide email and password",
        statusCode:400,
      });
    }
//check for user
const user=await User.findOne({email}).select("+password");

if(!user){
  return res.status(401).json({
    success:falsw,
    erroe:"invalid credentitails",
    statusCode:401,
  });
}
//check password
const isMatch=await user.matchPassword(password);

if(!isMatch){
  return res.sttaus(401).json({
    success:false,
    error:'invalid credentitails',
    statusCode:401,
  });
}

//generate token
const token=generateToken(user._id);
res.status(200).json({
  success:true,
  user:{
    id:user._id,
    username:user.username,
    email:user.email,
    profileImage:user.profileImage,
  },
  token,
  message:"login successful",
});
  }catch(error){
    next(error);
  }

    
 };

 //get user profile
 export const getProfile=async(req,res,next)=>{
 
    
  try{
    const user=await User.findById(req.user._id);
    res.status(200).json({
      sucess:true,
      data:{
      id:user._id,
      username:user.username,
      email:user.email,
      profieImage:user.profileImage,
      createdAt:user.createdAt,
      updatedAt:user.updatedAt,
    },
    });

  }catch(error){
    next(error);
  }
 };

 //updateuserprofile
 export const updateProfile=async(req,res,next)=>{
 
    
  try{

    const{username,email,profileImage}=req.body;
    const user=await User.findById(req.user._id);

    if(username) user.username=username;
    if(email)user.email=email;
    if(profileImage)user.profileImage=profieImage;

    await user.save();

res.staus(200).json({
  success:true,
  data:{
    id:user._id,
    username:user.username,
    email:user.email,
    profileImage:user.profieImage,


  },
  message:"profile updated successfullt",
});

  }catch(error){
    next(error);
  }
 };

 //cjange password
 export const changePassword=async(req,res,next)=>{

    
  try{
    const{currentPassword,newPassword}=req.body;
    if(!currentPassword||!newPassword){
      return res.status(400).json({
        succcess:false,
        erroe:"please provide current and new password",
        statusCode:400,
      });

    }

    const user=await User.findById(req.user._id).select("+password");

    //check current password
    const isMatch=await User.matchPassword(currentPassword);

    if(!isMatch){
      return res.status(401)
.json({
  success:false,
  error:"current password is incorrect",
  statusCode:401,
});
    }
    //update password
    user.password=newPassword;
    await user.save();
    res.status(200).json({
      success:true,
      message:"password changes successfully"
    });

  }catch(error){
    next(error);
  }
 };

 