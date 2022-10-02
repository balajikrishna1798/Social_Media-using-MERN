import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({

    start:{type:Date},
    end:{type:Date},
    title:{type:String},
},{
    timestamps:true
})
export const Event = mongoose.model("Event",EventSchema)