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
exports.searchUsers = exports.getOthersGooglePosts = exports.getOthersPosts = exports.GoogleSignIn = exports.getMyProfile = exports.updateProfile = exports.changePassword = exports.verifyPasswordMail = exports.emailVerified = exports.payment = exports.signup = exports.verifyUser = exports.signin = void 0;
//importing libraries
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PostsMessage_1 = require("../models/PostsMessage");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const Otp_1 = require("../models/Otp");
const Users_1 = require("../models/Users");
const stripe = require('stripe')("sk_test_51LLijESDK40ce5vjrclbEM87Z9oC9uYW8fViMj7aIe67uqpO1eJAWH11AeQfgoGEFaM8yg0sJnQxd8pqKgCZxpao00BuFZ4taW");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //getting request from front-end
    const { email, password } = req.body;
    //checking whether the user is exists or not
    const existingUser = yield Users_1.Users.findOne({ email });
    //decline if there is no existing User
    if (!existingUser) {
        return res.status(400).json({ message: "EmailId is not found" });
    }
    else {
        //checking whether the password is correct or not
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        //if the password is incorrect decline request
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }
        //assign token and results to front-end by using Secret-Key
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, "test");
        res.status(200).json({ result: existingUser, token });
    }
});
exports.signin = signin;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOne({ email: req.body.email });
    if (user && user.isVerified) {
        next();
    }
    else {
        return res.status(400).json({ message: "EmailId is not found" });
    }
});
exports.verifyUser = verifyUser;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //getting request from front-end
    const { firstName, email, password, confirmPassword } = req.body;
    try {
        //checking whether the user is exists or not
        const existingUser = yield Users_1.Users.findOne({ email });
        //if email already exists decline
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        //checking that given password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match" });
        }
        //bcrypting  given password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        //saving to database if all the validation passed
        const User = new Users_1.Users({
            email,
            password: hashedPassword,
            name: firstName,
            isVerified: false,
            emailToken: crypto_1.default.randomBytes(64).toString("hex"),
        });
        yield User.save();
        //sending Email to the user to verify
        const mailOptions = {
            from: "balajikrishna44589@gmail.com",
            to: User.email,
            subject: "Verify your email address",
            html: `<p>Hello ${User.name}! Welcome to funtabulous.Please Verify your email address to complete the signup process and login to your account</p>
            <p>press here <a href="http://${req.headers.host}/users/verify-email?token=${User.emailToken}"> here</a> to verify your mailId. </p>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            console.log("Verification Mail sent");
            res.status(400).json({ message: "Verification Mail sent" });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    const quantity = req.body.quantity;
    console.log(amount, quantity);
    const session = yield stripe.checkout.sessions.create({
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
});
exports.payment = payment;
const emailVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.emailVerified = emailVerified;
const verifyPasswordMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            transporter.sendMail(mailOptions, function (error, info) {
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
            transporter.sendMail(mailOptions, function (error, info) {
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
exports.verifyPasswordMail = verifyPasswordMail;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Checking whether is there any OTP with that mail address
    let data = yield Otp_1.Otp.findOne({ email: req.body.email, code: req.body.code });
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expiresIn - currentTime;
        //if time expires OTP will not be valid
        if (diff < 0) {
            return res.status(400).json("error");
        }
        else {
            //if valid new password will be save.
            const User = yield Users_1.Users.findOne({ email: req.body.email });
            const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 12);
            User.password = hashedPassword;
            User.save();
            console.log("Success");
            res.status(200).json("Password Changed");
        }
    }
    else {
        return res.status(400).json({ message: "Enter correct OTP" });
    }
});
exports.changePassword = changePassword;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //checking any user with that id
        const existingUser = yield Users_1.Users.findById(req.userId);
        //if user exists update details in database
        if (existingUser) {
            existingUser.name = req.body.name || existingUser.name;
            existingUser.email = req.body.email || existingUser.email;
            existingUser.pic = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || existingUser.pic,
                yield existingUser.save();
            console.log(existingUser);
            console.log(req.file);
            return res.status(200).json({ result: existingUser });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProfile = updateProfile;
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield Users_1.Users.findById(req.userId);
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, "test");
        if (existingUser) {
            return res.status(200).json({ result: existingUser, token });
        }
    }
    catch (error) { }
});
exports.getMyProfile = getMyProfile;
const GoogleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, token, googleId, imageUrl } = req.body;
    try {
        const existingUser = yield Users_1.Users.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            res.status(400).json({ message: "Email Address already exists" });
        }
        else if (existingUser) {
            res.status(200).json({ result: existingUser, token });
        }
        if (!existingUser) {
            const result = yield Users_1.Users.create({
                email,
                name,
                googleId,
                pic: imageUrl
            });
            res.status(200).json({ result, token });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.GoogleSignIn = GoogleSignIn;
const getOthersPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.Users.findOne({ _id: req.params.id })
        .then((user) => {
        PostsMessage_1.postMessage
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
});
exports.getOthersPosts = getOthersPosts;
const getOthersGooglePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.Users.findOne({ googleId: req.params.id })
        .then((user) => {
        PostsMessage_1.postMessage
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
});
exports.getOthersGooglePosts = getOthersGooglePosts;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    Users_1.Users.find({ name: { $regex: name, $options: '$i' } })
        .then(user => {
        res.json({ user });
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});
exports.searchUsers = searchUsers;
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "balajikrishna44589@gmail.com",
        pass: "gjvkdihwboxlykyz",
    },
});
//# sourceMappingURL=users.js.map