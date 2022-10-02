import express from "express";
import { conversationId, message } from "../controller/Message";
import upload from "../controller/Services";
import { auth } from "../middleware/auth";

const router = express.Router();


router.post('/',message)
router.get('/:conversationId',conversationId)




export default router