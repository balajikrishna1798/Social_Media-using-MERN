"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClass = void 0;
const Otp_1 = require("../models/Otp");
const Users_1 = require("../models/Users");
const Transporter_1 = __importDefault(require("./Transporter"));
class verifyClass {
    constructor() {
        this.emailVerified = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //getting token from mail verification
                const token = req.query.token;
                //Checking if there any emailToken with token
                const user = yield Users_1.Users.findOne({ emailToken: token });
                if (user) {
                    //assign value to database as verified
                    user.emailToken = null;
                    user.isVerified = true;
                    yield user.save();
                    //redirect to login page after verify email
                    res.redirect("http://localhost:3000/auth");
                }
                else {
                    console.log("Email is not verified");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.verifyPasswordMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Checking emailid from front-end
            const User = yield Users_1.Users.findOne({ email: req.body.email });
            if (User && User.isVerified) {
                const OtpUser = yield Otp_1.Otp.findOne({ email: req.body.email });
                if (!OtpUser) {
                    //generate OTP 
                    let otpCode = Math.floor(Math.random() * 10000 + 1);
                    //save OTP to database with expire time
                    let otpData = new Otp_1.Otp({
                        email: req.body.email,
                        code: otpCode,
                        expiresIn: new Date().getTime() + 300 * 1000,
                    });
                    yield otpData.save();
                    //send OTP to mail
                    const mailOptions = {
                        from: "balajikrishna44589@gmail.com",
                        to: User.email,
                        subject: "verify your email",
                        html: `<p>Hello ${User.name}. Your OTP is ${otpData.code}`,
                    };
                    Transporter_1.default.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log(info);
                            console.log("Verification Mail sent");
                        }
                    });
                    res.status(200).json({ message: "Success" });
                }
                if (OtpUser) {
                    //generate OTP 
                    let otpCode = Math.floor(Math.random() * 10000 + 1);
                    //save OTP to database with expire time
                    OtpUser.code = otpCode;
                    OtpUser.expiresIn = new Date().getTime() + 300 * 1000,
                        yield OtpUser.save();
                    //send OTP to mail
                    const mailOptions = {
                        from: "balajikrishna44589@gmail.com",
                        to: User.email,
                        subject: "verify your email",
                        html: `<p>Hello ${User.name}. Your OTP is ${OtpUser.code}`,
                    };
                    Transporter_1.default.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log(info);
                            console.log("Verification Mail sent");
                        }
                    });
                    res.status(200).json({ message: "Success" });
                }
            }
            else {
                return res.status(400).json({ message: "EmailId not yet registered with funtabulous" });
            }
        });
    }
}
exports.verifyClass = verifyClass;
//# sourceMappingURL=MailVerification.js.map