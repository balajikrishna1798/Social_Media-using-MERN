import { Request, Response } from "express";
import { messages } from "../models/Message";

export const message = async (req: Request, res: Response) => {
  const newMessage = new messages(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get

export const conversationId = async (req: Request, res: Response) => {
  try {
    const Messages = await messages.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(Messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
