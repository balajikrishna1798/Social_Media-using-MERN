import express from "express";
import { body } from "express-validator";
import { emailVerified, verifyPasswordMail } from "../controller/MailVerification";
import upload from "../controller/Services";
import { GoogleSignIn, signin, signup,updateProfile,getOthersPosts,getOthersGooglePosts, getMyProfile, changePassword, searchUsers, payment} from "../controller/users";
import { auth, verifyUser } from "../middleware/auth";
const router = express.Router();
//routes for users
router.post("/signin",verifyUser, signin)
router.post("/signup", 
     body('username').isLength({ min: 2 }),
     body('email').isEmail(),
     body('password').isLength({ min: 6 }),signup)
                                            
router.post("/googleSignIn",GoogleSignIn)
router.post('/profile',auth,upload.single('pic'),updateProfile)
router.get("/profile",auth,getMyProfile)
router.get("/usersProfile/:id",auth,getOthersPosts)
router.get("/googleusersProfile/:id",auth,getOthersGooglePosts)
router.get("/verify-email",emailVerified)
router.post("/verifypasswordmail",verifyPasswordMail)
router.post("/changePassword",changePassword)
router.post("/searchUsers",searchUsers)
router.post("/payment",auth,payment)


export default router;