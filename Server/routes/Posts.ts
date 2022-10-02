import express from "express";
import upload from "../controller/Services";
import { auth } from "../middleware/auth";
import {postClass} from '../controller/posts'
const post = new postClass();

const router = express.Router();

router.get('/search',post.getPostsBySearch)
router.get('/tag/:tag',post.getPostByTag)

router.get('/',post.getPosts)
router.get('/:id',post.getPost)
router.post('/',auth,upload.single('selectedFile'),post.createPosts)
router.get('/userPosts/:id',auth,post.getPostsByUser)
router.patch('/:id',auth,post.updatePosts)
router.delete('/:id',auth,post.deletePosts)
router.patch('/:id/likePost',auth,post.likePosts)
router.patch('/:id/comments',auth,post.commentPosts)



export default router