import express from "express";
import {conversationClass} from '../controller/Conversation'
const Conversation = new conversationClass();

const router = express.Router();


router.post('/',Conversation.Conversation)
router.get('/:userId',Conversation.userId)
router.get('/find/:firstUserId/:secondUserId',Conversation.findUserId)



export default router