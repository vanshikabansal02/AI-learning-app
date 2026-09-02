import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    username:{
        type:String ,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'password must be atlast 6 char long'],
    },

    profileImage:{
        type:String,
        default:null
    }
},{  
    timestamps:true

});

//hash password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return;
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

//compare pssword methid
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

};
const User=mongoose.model('User',userSchema)

export default User;
