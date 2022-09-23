//importing libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { postMessage } from "../models/PostsMessage";
import crypto from "crypto";
import { Otp } from "../models/Otp";
import { Users } from "../models/Users";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import transporter from "./Transporter";
import { createAccessToken, refreshAccessToken } from "./TokenGenerator";

const stripe = require( 'stripe')("sk_test_51LLijESDK40ce5vjrclbEM87Z9oC9uYW8fViMj7aIe67uqpO1eJAWH11AeQfgoGEFaM8yg0sJnQxd8pqKgCZxpao00BuFZ4taW")

export interface IGetUserAuthInfoRequest extends Request {
  userId: string
}


export const signin = async (req:IGetUserAuthInfoRequest, res:Response) => {
  //getting request from front-end
  const { email, password } = req.body;
  //checking whether the user is exists or not
  const existingUser:any = await Users.findOne({ email });
  //decline if there is no existing User
  if (!existingUser) {
    return res.status(400).json({ message: "EmailId is not found" });
  } else {
    //checking whether the password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    //if the password is incorrect decline request
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const accessToken = createAccessToken({email: existingUser.email, id: existingUser._id })
    const refreshToken = refreshAccessToken({email: existingUser.email, id: existingUser._id })

    res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      path:'/api/refreshToken',
      maxAge:30*7*24*60*100
    })
    res.status(200).json({ accessToken, result:{...existingUser._doc,password:""} });
  }
};



export const signup = async (req:IGetUserAuthInfoRequest, res:Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }
  //getting request from front-end
  const { firstName, email, password, confirmPassword,gender } = req.body;
  let username = firstName.toLowerCase().replace(/ /g,'')
  try {
    //checking whether the user is exists or not
    const existingUser = await Users.findOne({ email });
       
    //if email already exists decline
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //checking that given password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    //bcrypting  given password
    const hashedPassword = await bcrypt.hash(password, 12);
    //saving to database if all the validation passed
    const User:any = new Users({
      email,
      password: hashedPassword,
      name: username,
      isVerified: false, 
      emailToken: crypto.randomBytes(64).toString("hex"),
      gender
    });
    await User.save();
    //sending Email to the user to verify
    const mailOptions = {
      from: "balajikrishna44589@gmail.com",
      to: User.email,
      subject: "Verify your email address",
      html: `<p>Hello ${User.name}! Welcome to funtabulous.Please Verify your email address to complete the signup process and login to your account</p>
            <p>press here <a href="http://${req.headers.host}/users/verify-email?token=${User.emailToken}"> here</a> to verify your mailId. </p>`,
    };
    transporter.sendMail(mailOptions, function (error:Error) {
      if (error) {
        console.log(error);
      } 
        console.log("Verification Mail sent");
        res.status(400).json({ message: "Verification Mail sent" });
    });
  } catch (error) {
    console.log(error);
  }
};


export const payment = async (req:IGetUserAuthInfoRequest, res:Response) =>{
  const amount = req.body.amount
  const quantity = req.body.quantity

  console.log(amount,quantity);
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Donate',
          },
          unit_amount: amount*100,
        },
        quantity,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/failure',
  });

  res.json({url:session.url});
  
};




export const changePassword = async (req:IGetUserAuthInfoRequest, res:Response) => {
    //Checking whether is there any OTP with that mail address
  let data:any = await Otp.findOne({ email: req.body.email, code: req.body.code });

  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    //if time expires OTP will not be valid
    if (diff < 0) {
      return res.status(400).json("error");
    } else {
    //if valid new password will be save.
      const User:any = await Users.findOne({ email: req.body.email });
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      User.password = hashedPassword;
      User.save();
      console.log("Success");
      res.status(200).json("Password Changed");
    }
  } else {
    return res.status(400).json({message:"Enter correct OTP"});
  }
};


export const updateProfile = async (req:IGetUserAuthInfoRequest, res:Response) => {
 
  try {
   
    //checking any user with that id
    const existingUser:any = await Users.findById(req.userId);
    //if user exists update details in database
    if (existingUser) {
      existingUser.name = req.body.name || existingUser.name;
      existingUser.email = req.body.email || existingUser.email;
      existingUser.pic=  req.file?.filename|| existingUser.pic,
       await existingUser.save();
       console.log(existingUser);
      console.log(req.file);
      return res.status(200).json({ result: existingUser });
    }
  }

  catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req:IGetUserAuthInfoRequest, res:Response) => {
  try {
    const existingUser:any = await Users.findById(req.userId);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    );
    if (existingUser) {
      return res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {}
};

export const GoogleSignIn = async (req:IGetUserAuthInfoRequest, res:Response) => {
  const { email, name, token, googleId,imageUrl } = req.body;
  try {
    const existingUser:any = await Users.findOne({ email });
    if (existingUser &&existingUser.isVerified) {
      res.status(400).json({ message: "Email Address already exists" });
    } else if (existingUser) {
      res.status(200).json({ result: existingUser, token });
    }
    if (!existingUser) {
      const result = await Users.create({
        email,
        name,
        googleId,
        pic:imageUrl
      });
      res.status(200).json({ result, token });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getOthersPosts = async (req:IGetUserAuthInfoRequest, res:Response) => {
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      postMessage
        .find({ creator: req.params.id })
        .exec((err, posts) => {
          if (posts) {
            res.json({ user, posts });
          }
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};

export const getOthersGooglePosts = async (req:IGetUserAuthInfoRequest, res:Response) => {
  Users.findOne({ googleId: req.params.id })
    .then((user) => {
      postMessage
        .find({ creator: req.params.id })
        .exec((err, posts) => {
          if (posts) {
            res.json({ user, posts });
          }
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};


export const searchUsers = async(req:IGetUserAuthInfoRequest, res:Response) =>{
    const name = req.body.name
    Users.find({name:{$regex:name,$options:'$i'}})
    .then(user=>{
       res.json({user})     
    }).catch(err=>{
        console.log(err);
        res.send(err)                                 
    })
    }


