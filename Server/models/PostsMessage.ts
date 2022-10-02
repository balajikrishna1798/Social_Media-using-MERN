import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId:String,
    title:String,
    name:String,
    message:String,
    creator:String,
    tags:Array,
    selectedFile:String,
    likes:{type:Array,default : []},
    createdAt:{
        type:Date,
        default:new Date()
    },
    comments:[{
        content:String,
        postedBy:{type:String,ref:"Users"}
    }]
})
export const postMessage = mongoose.model("postMessage",postSchema)