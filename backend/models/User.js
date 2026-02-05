import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    username:{
        type:string ,
        required:true,
        unique:true,
        trin:true,
    },
    email:{
        type:string,
        unique:true,
        required:true,
    },
    password:{
        type:string,
        required:true,
        minlength:[6,'password must be atlast 6 char long'],
    },

    profileImage:{
        type:string,
        default:null
    }
},{  
    timestamps:true

});

//hash password before saving
userSchema.pre('save',async function(next){
    if(!this.isModeified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

//compare pssword methid
userSchema.methids.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPasssword,this.password);

};
const User=mongoose.model('User',userSchema)

export default User;