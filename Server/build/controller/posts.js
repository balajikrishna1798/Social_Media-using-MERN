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
exports.postClass = void 0;
const PostsMessage_1 = require("../models/PostsMessage");
class postClass {
    constructor() {
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postMessages = yield PostsMessage_1.postMessage.find();
                res.send(postMessages);
            }
            catch (error) {
            }
        });
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const postMessages = yield PostsMessage_1.postMessage.findById(id);
                console.log(postMessages);
                res.send(postMessages);
            }
            catch (error) {
            }
        });
        this.getPostsBySearch = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        this.createPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const newPost = new PostsMessage_1.postMessage(Object.assign(Object.assign({}, req.body), { creator: req.userId, selectedFile: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename, createdAt: new Date().toISOString() }));
            try {
                if (newPost) {
                    yield newPost.save();
                    console.log(newPost);
                    res.status(200).send(newPost);
                }
                else {
                    res.status(400).json({ message: "Cannot create posts" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.updatePosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        this.deletePosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield PostsMessage_1.postMessage.findByIdAndRemove(id);
                res.json({ message: "Message Deleted Successfully" });
            }
            catch (error) {
            }
        });
        this.likePosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        this.commentPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        this.getPostsByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userPosts = yield PostsMessage_1.postMessage.find({ creator: id });
            res.status(200).json(userPosts);
        });
        this.getPostByTag = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.postClass = postClass;
//# sourceMappingURL=posts.js.map