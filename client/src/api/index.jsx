import axios from 'axios';

const postUrl = 'http://localhost:8000/posts';

export const fetchPosts = () => axios.get(postUrl);

export const createPost = (newPost) => axios.post(postUrl, newPost);

export const updatePost = (id, updatedPost) => axios.put(`${postUrl}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);

export const likePost = (id) => axios.put(`${postUrl}/like/${id}`);