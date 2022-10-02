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

const stripe = require('stripe')("sk_test_51LLijESDK40ce5vjrclbEM87Z9oC9uYW8fViMj7aIe67uqpO1eJAWH11AeQfgoGEFaM8yg0sJnQxd8pqKgCZxpao00BuFZ4taW")

export interface IGetUserAuthInfoRequest extends Request {
  userId: string
}
export class userClass {

signin = async (req: IGetUserAuthInfoRequest, res: Response) => {
  //getting request from front-end
  const { email, password } = req.body;
  //checking whether the user is exists or not
  const existingUser: any = await Users.findOne({ email });
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

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    );
    res.status(200).json({ result: existingUser, token });
  }
};



 signup = async (req: IGetUserAuthInfoRequest, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }
  //getting request from front-end
  const { firstName, email, password, confirmPassword, gender } = req.body;
  let username = firstName.toLowerCase().replace(/ /g, '')
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
    const User: any = new Users({
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
            <p>press here <a href="http://${req.headers.host}/api/users/verify-email?token=${User.emailToken}"> here</a> to verify your mailId. </p>`,
    };
    transporter.sendMail(mailOptions, function (error: Error) {
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





 payment = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const amount = req.body.amount
  const quantity = req.body.quantity

  console.log(amount, quantity);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Donate',
          },
          unit_amount: amount * 100,
        },
        quantity,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/failure',
  });

  res.json({ url: session.url });

};




changePassword = async (req: IGetUserAuthInfoRequest, res: Response) => {
  //Checking whether is there any OTP with that mail address
  let data: any = await Otp.findOne({ email: req.body.email, code: req.body.code });

  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    //if time expires OTP will not be valid
    if (diff < 0) {
      return res.status(400).json("error");
    } else {
      //if valid new password will be save.
      const User: any = await Users.findOne({ email: req.body.email });
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      User.password = hashedPassword;
      User.save();
      console.log("Success");
      res.status(200).json("Password Changed");
    }
  } else {
    return res.status(400).json({ message: "Enter correct OTP" });
  }
};


 updateProfile = async (req: IGetUserAuthInfoRequest, res: Response) => {

  try {

    //checking any user with that id
    const existingUser: any = await Users.findById(req.userId);
    //if user exists update details in database
    if (existingUser) {
      existingUser.name = req.body.name || existingUser.name;
      existingUser.email = req.body.email || existingUser.email;
      existingUser.mobileNumber = req.body.mobileNumber || existingUser.mobileNumber;
      existingUser.pic = req.file?.filename || existingUser.pic,
      await existingUser.save();
      console.log(existingUser);
      console.log(req.file);
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "test"
      );
      return res.status(200).json({ result: existingUser,token });
    }
  }

  catch (error) {
    console.log(error);
  }
};

getMyProfile = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const existingUser: any = await Users.findById(req.userId);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    );
    if (existingUser) {
      return res.status(200).json({ result: existingUser, token });
    }
  } catch (error) { }
};

GoogleSignIn = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { email, name, token, googleId, imageUrl } = req.body;
  try {
    const existingUser: any = await Users.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      res.status(400).json({ message: "Email Address already exists" });
    } else if (existingUser) {
      res.status(200).json({ result: existingUser, token });
    }
    if (!existingUser) {
      const result = await Users.create({
        email,
        name,
        googleId,
        pic: imageUrl
      });
      res.status(200).json({ result, token });
    }
  } catch (err) {
    console.log(err);
  }
};

getOthersPosts = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try{
    const user = await Users.findOne({ _id: req.params.id })
    const posts = await postMessage.find({ creator: req.params.id })   
    return res.status(200).json({ user, posts });
      }
    
    catch(err) {
      return res.status(400).send(err);
    };
};



getUsers=  async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.query.userId;
  try {
    const user:any =  await Users.findById(userId)
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};


searchUsers = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const name = req.body.name
  const user = await  Users.find({ name: { $regex: name, $options: '$i' } })
  res.json({user})
}

follow = async (req: IGetUserAuthInfoRequest, res: Response) => {

  if (req.body.userId !== req.params.id) {
    try {
      const user = await Users.findById(req.params.id);
      const currentUser = await Users.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId }},{new:true} );
        await currentUser.updateOne({ $push: { following: req.params.id }},{new:true});
        const followings = await Users.findById(req.body.userId);
        console.log(followings);
        const token = jwt.sign(
          { email: currentUser.email, id: currentUser._id },
          "test"
        );
        res.status(200).json({result:followings,token});
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};



unfollow = async (req: IGetUserAuthInfoRequest, res: Response) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await Users.findById(req.params.id);
      const currentUser = await Users.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        const followings = await Users.findById(req.body.userId);
        const token = jwt.sign(
          { email: currentUser.email, id: currentUser._id },
          "test"
        );
        res.status(200).json({result:followings,token});
      } else {
        res.status(403).json("you dont followed this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};


friends = async (req:IGetUserAuthInfoRequest, res: Response) => {
  try {
    const user = await Users.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return Users.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, name, pic } = friend;
      friendList.push({ _id, name, pic });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
};
}

