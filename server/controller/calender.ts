import moment from "moment";
import { Event } from "../models/Event"
import { RequestHandler } from 'express';
export const createEvent: RequestHandler = async(req,res) =>{

    const event = new Event(req.body);
  
        await event.save();
        console.log(event);
        res.status(200).send(event)
        }


export const getEvent: RequestHandler =async (req:any,res) => {
    const events = await Event.find({
        start:{
            $gte:moment(req.query.start).toDate()},  
        end:{
            $lte:moment(req.query.end).toDate()},
        }  
    )
    res.send(events)
}