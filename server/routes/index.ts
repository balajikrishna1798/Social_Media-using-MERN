import express from "express";
import postRoutes from './Posts'
import userRoutes from './Users'
import calenderRoutes from './Calender'
const app = express();


app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes)
app.use('/api/calendar',calenderRoutes)

export default app

