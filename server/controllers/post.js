import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js';

export const getPost = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    const isValid = PostMessage.findOne({
        _id
    });
    if (!isValid) return res.status(404).json("No post founded...");
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    const isValid = PostMessage.findOne({
        _id
    });
    if (!isValid) return res.status(404).json("No post founded...");
    try {
        await PostMessage.findByIdAndDelete(_id);
        res.status(200).json("Post has been deleted...");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    const isValid = PostMessage.findOne({
        _id
    });
    if (!isValid) return res.status(404).json("No post founded...");
    try {
        const post = await PostMessage.findById(_id);
        const updatedPost = 
        await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};