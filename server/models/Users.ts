import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type:String},
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    pic:{type:String},
    password:{type:String,trim:true},
    googleId:{type:String},
    emailToken:{type:String},
    role:{type:String,default:"user"},
    gender:{type:String},
    isVerified : Boolean,
    followers:[{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }],
    following:[{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }],
    mobileNumber:{type:Number,default:""}

},{
    timestamps:true
})
export const Users = mongoose.model("User",userSchema)