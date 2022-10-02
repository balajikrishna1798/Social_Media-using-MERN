import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
   conversationId : {
    type:String
   },
   sender:{
    type:String
   },
   text:{
    type:String
   }
},{
    timestamps:true
})
export const messages = mongoose.model("messages",messageSchema)