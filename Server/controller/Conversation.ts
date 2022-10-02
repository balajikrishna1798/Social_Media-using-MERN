import { Request, Response } from "express";
import { conversation } from "../models/Conversation";

export class conversationClass {

Conversation = async(req:Request, res:Response) => {
  const newConversation = new conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};


userId = async (req:Request, res:Response) => {
  try {
    const Conversation = await conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(Conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};


findUserId =  async (req:Request, res:Response) => {
  try {
    const Conversation = await conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(Conversation)
  } catch (err) {
    res.status(500).json(err);
  }
}
}

