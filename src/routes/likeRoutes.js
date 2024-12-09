import express from 'express';
import { addLike, removeLike, getLikeCount } from '../controllers/likeController.js';

const router = express.Router();

// Menambahkan like pada foto
router.post('/', addLike);

// Menghapus like dari foto
router.delete('/:id', removeLike);

// Mendapatkan jumlah like dari sebuah gallery
router.get('/count/:gallery_id', getLikeCount);

export default router;
