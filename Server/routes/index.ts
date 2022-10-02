import express from "express";
import postRoutes from './Posts'
import userRoutes from './Users'
import messageRoutes from './Message'
import conversationRoutes from './Conversation'

const app = express();


app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/conversation',conversationRoutes)


export default app

