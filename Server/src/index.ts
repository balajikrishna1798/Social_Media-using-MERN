import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import route from '../routes/index'
import dotenv from "dotenv";
import path from "path";

dotenv.config()
const __variableOfChoice = path.resolve();
const app = express();
const port = 5000;


app.use('/uploads',express.static(path.join(__variableOfChoice,"uploads")))
app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use(route)
const URI = process.env.MONGODB_URL   

mongoose.connect(URI).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`)
    })
})