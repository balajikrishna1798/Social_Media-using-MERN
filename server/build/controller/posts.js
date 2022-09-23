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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByTag = exports.getPostsByUser = exports.commentPosts = exports.likePosts = exports.deletePosts = exports.updatePosts = exports.createPosts = exports.getPostsBySearch = exports.getPost = exports.getPosts = void 0;
const PostsMessage_1 = require("../models/PostsMessage");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postMessages = yield PostsMessage_1.postMessage.find();
        res.send(postMessages);
    }
    catch (error) {
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postMessages = yield PostsMessage_1.postMessage.findById(id);
        console.log(postMessages);
        res.send(postMessages);
    }
    catch (error) {
    }
});
exports.getPost = getPost;
const getPostsBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title;
    try {
        const posts = yield PostsMessage_1.postMessage.find({ title: { $regex: title, $options: '$i' } });
        console.log(posts);
        res.json({ data: posts });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostsBySearch = getPostsBySearch;
const createPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newPost = new PostsMessage_1.postMessage(Object.assign(Object.assign({}, req.body), { creator: req.userId, selectedFile: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename, createdAt: new Date().toISOString() }));
    try {
        if (newPost) {
            yield newPost.save();
            console.log(newPost);
            res.status(200).send(newPost);
        }
        else {
            res.status(400).json({ message: "sdasdsa" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPosts = createPosts;
const updatePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    console.log("updatedData", _id, req.body);
    try {
        const updatedPost = yield PostsMessage_1.postMessage.findByIdAndUpdate(_id, req.body, { new: true });
        res.json(updatedPost);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePosts = updatePosts;
const deletePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield PostsMessage_1.postMessage.findByIdAndRemove(id);
        res.json({ message: "Message Deleted Successfully" });
    }
    catch (error) {
    }
});
exports.deletePosts = deletePosts;
const likePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Unauthorized" });
    const post = yield PostsMessage_1.postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    }
    else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = yield PostsMessage_1.postMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
});
exports.likePosts = likePosts;
const commentPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Unauthorized" });
    const comment = {
        content: req.body.content,
        postedBy: req.userId
    };
    console.log(req.body);
    const updatedPost = yield PostsMessage_1.postMessage.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true });
    res.json(updatedPost);
});
exports.commentPosts = commentPosts;
const getPostsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userPosts = yield PostsMessage_1.postMessage.find({ creator: id });
    res.status(200).json(userPosts);
});
exports.getPostsByUser = getPostsByUser;
const getPostByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag } = req.params;
    try {
        const posts = yield PostsMessage_1.postMessage.find({ tags: { $in: tag } });
        console.log(posts);
        res.json(posts);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostByTag = getPostByTag;
//# sourceMappingURL=posts.js.map