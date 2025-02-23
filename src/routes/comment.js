import express from 'express';
import { addComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:galleryId', authMiddleware, addComment);
router.get('/:galleryId', getComments);
router.put('/:commentId', authMiddleware, updateComment);
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
