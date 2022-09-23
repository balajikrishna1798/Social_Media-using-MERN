"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controller/posts");
const Services_1 = __importDefault(require("../controller/Services"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/search', posts_1.getPostsBySearch);
router.get('/tag/:tag', posts_1.getPostByTag);
router.get('/', posts_1.getPosts);
router.get('/:id', posts_1.getPost);
router.post('/', auth_1.auth, Services_1.default.single('selectedFile'), posts_1.createPosts);
router.get('/userPosts/:id', auth_1.auth, posts_1.getPostsByUser);
router.patch('/:id', auth_1.auth, posts_1.updatePosts);
router.delete('/:id', auth_1.auth, posts_1.deletePosts);
router.patch('/:id/likePost', auth_1.auth, posts_1.likePosts);
router.patch('/:id/comments', auth_1.auth, posts_1.commentPosts);
exports.default = router;
//# sourceMappingURL=Posts.js.map