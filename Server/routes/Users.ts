import express from "express";
import { body } from "express-validator";
import upload from "../controller/Services";
import {userClass} from '../controller/users'
import {verifyClass} from '../controller/MailVerification'

const users = new userClass();
const verify = new verifyClass();

import { auth, verifyUser } from "../middleware/auth";
const router = express.Router();
//routes for users
router.post("/signin",verifyUser, users.signin)
router.post("/signup", 
     body('firstName').isLength({ min: 2 }),
     body('email').isEmail(),
     body('password').isLength({ min: 6 }),users.signup)
router.put("/:id/follow",auth, users.follow)    

router.put("/:id/unfollow",auth, users.unfollow)       

router.get("/friends/:userId", auth,users.friends) 

router.post("/googleSignIn",users.GoogleSignIn)
router.post('/profile',auth,upload.single('pic'),users.updateProfile)
router.get("/profile",auth,users.getMyProfile)
router.get("/",users.getUsers)

router.get("/usersProfile/:id",auth,users.getOthersPosts)

router.get("/verify-email",verify.emailVerified)
router.post("/verifypasswordmail",verify.verifyPasswordMail)
router.post("/changePassword",users.changePassword)
router.post("/searchUsers",users.searchUsers)
router.post("/payment",auth,users.payment)


export default router;