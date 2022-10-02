import { Request, Response } from "express";
import { Otp } from "../models/Otp";
import { Users } from "../models/Users";
import transporter from "./Transporter";

export interface IGetUserAuthInfoRequest extends Request {
  userId: string;
}

export class verifyClass {
  emailVerified = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      //getting token from mail verification
      const token = req.query.token;
      //Checking if there any emailToken with token
      const user = await Users.findOne({ emailToken: token });
      if (user) {
        //assign value to database as verified
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        //redirect to login page after verify email
        res.redirect("http://localhost:3000/auth");
      } else {
        console.log("Email is not verified");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyPasswordMail = async (req: IGetUserAuthInfoRequest, res: Response) => {
    //Checking emailid from front-end
    const User = await Users.findOne({ email: req.body.email });

    if (User && User.isVerified) {
      const OtpUser: any = await Otp.findOne({ email: req.body.email });
      if (!OtpUser) {
        //generate OTP
        let otpCode: any = Math.floor(Math.random() * 10000 + 1);
        //save OTP to database with expire time
        let otpData: any = new Otp({
          email: req.body.email,
          code: otpCode,
          expiresIn: new Date().getTime() + 300 * 1000,
        });
        await otpData.save();
        //send OTP to mail

        const mailOptions: any = {
          from: "balajikrishna44589@gmail.com",
          to: User.email,
          subject: "verify your email",
          html: `<p>Hello ${User.name}. Your OTP is ${otpData.code}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(info);
            console.log("Verification Mail sent");
          }
        });
        res.status(200).json({ message: "Success" });
      }
      if (OtpUser) {
        //generate OTP
        let otpCode: any = Math.floor(Math.random() * 10000 + 1);
        //save OTP to database with expire time
        OtpUser.code = otpCode;
        (OtpUser.expiresIn = new Date().getTime() + 300 * 1000),
          await OtpUser.save();
        //send OTP to mail
        const mailOptions: any = {
          from: "balajikrishna44589@gmail.com",
          to: User.email,
          subject: "verify your email",
          html: `<p>Hello ${User.name}. Your OTP is ${OtpUser.code}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(info);
            console.log("Verification Mail sent");
          }
        });
        res.status(200).json({ message: "Success" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "EmailId not yet registered with funtabulous" });
    }
  };
}
