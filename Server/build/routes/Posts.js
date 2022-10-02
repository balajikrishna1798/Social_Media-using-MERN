"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Services_1 = __importDefault(require("../controller/Services"));
const auth_1 = require("../middleware/auth");
const posts_1 = require("../controller/posts");
const post = new posts_1.postClass();
const router = express_1.default.Router();
router.get('/search', post.getPostsBySearch);
router.get('/tag/:tag', post.getPostByTag);
router.get('/', post.getPosts);
router.get('/:id', post.getPost);
router.post('/', auth_1.auth, Services_1.default.single('selectedFile'), post.createPosts);
router.get('/userPosts/:id', auth_1.auth, post.getPostsByUser);
router.patch('/:id', auth_1.auth, post.updatePosts);
router.delete('/:id', auth_1.auth, post.deletePosts);
router.patch('/:id/likePost', auth_1.auth, post.likePosts);
router.patch('/:id/comments', auth_1.auth, post.commentPosts);
exports.default = router;
//# sourceMappingURL=Posts.js.map