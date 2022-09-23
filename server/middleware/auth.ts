import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Users } from '../models/Users'
export interface IGetUserAuthInfoRequest extends Request {
    userId: string
  }
  
export const auth = async(req:any, res:Response,next:NextFunction) =>{
    try{
        const token = req.headers.authorization&&req.headers.authorization.split(" ")[1]
        const isCustomAuth =  token&&token.length<500
        if(token&&isCustomAuth){
            let decodedData:any = jwt.verify(token,'test')
            req.userId= decodedData?.id;
        }
        else{
            let decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;  
        }
        next()
    }
catch(err){
    console.log(err);
} 
}

export const verifyUser = async (req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) => {
    const user = await Users.findOne({ email: req.body.email });
    if (user && user.isVerified) {
      next();
    } else {
      return res.status(400).json({ message: "EmailId is not found" });
    }
  };