import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type:String},
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    pic:{type:String},
    password:{type:String,trim:true},
    googleId:{type:String},
    emailToken:{type:String},
    gender:{type:String},
    isVerified : Boolean,
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    mobileNumber:{type:String,default:""}

},{
    timestamps:true
})
export const Users = mongoose.model("user",userSchema)