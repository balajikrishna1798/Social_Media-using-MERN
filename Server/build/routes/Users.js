"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const Services_1 = __importDefault(require("../controller/Services"));
const users_1 = require("../controller/users");
const MailVerification_1 = require("../controller/MailVerification");
const users = new users_1.userClass();
const verify = new MailVerification_1.verifyClass();
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
//routes for users
router.post("/signin", auth_1.verifyUser, users.signin);
router.post("/signup", (0, express_validator_1.body)('firstName').isLength({ min: 2 }), (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), users.signup);
router.put("/:id/follow", auth_1.auth, users.follow);
router.put("/:id/unfollow", auth_1.auth, users.unfollow);
router.get("/friends/:userId", auth_1.auth, users.friends);
router.post("/googleSignIn", users.GoogleSignIn);
router.post('/profile', auth_1.auth, Services_1.default.single('pic'), users.updateProfile);
router.get("/profile", auth_1.auth, users.getMyProfile);
router.get("/", users.getUsers);
router.get("/usersProfile/:id", auth_1.auth, users.getOthersPosts);
router.get("/verify-email", verify.emailVerified);
router.post("/verifypasswordmail", verify.verifyPasswordMail);
router.post("/changePassword", users.changePassword);
router.post("/searchUsers", users.searchUsers);
router.post("/payment", auth_1.auth, users.payment);
exports.default = router;
//# sourceMappingURL=Users.js.map