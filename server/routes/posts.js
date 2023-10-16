import express from 'express';
import { 
    getPost, 
    createPost, 
    updatePost, 
    deletePost, 
    likePost 
} from '../controllers/post.js';

const router = express.Router();

router.get('/', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.put('/like/:id', likePost);

export default router;