import express from "express";
import { createPosts,getPost, deletePosts, getPosts,updatePosts , likePosts, getPostsBySearch, getPostsByUser,commentPosts, getPostByTag} from "../controller/posts";
import upload from "../controller/Services";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get('/search',getPostsBySearch)
router.get('/tag/:tag',getPostByTag)

router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',auth,upload.single('selectedFile'),createPosts)
router.get('/userPosts/:id',auth,getPostsByUser)
router.patch('/:id',auth,updatePosts)
router.delete('/:id',auth,deletePosts)
router.patch('/:id/likePost',auth,likePosts)
router.patch('/:id/comments',auth,commentPosts)



export default router