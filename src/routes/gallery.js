import express from 'express';
import { createGallery, getAllGalleries, getGalleries, getGallery, updateGallery, deleteGallery, upload } from '../controllers/galleryController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware untuk autentikasi user

const router = express.Router();

// Buat galeri baru dengan gambar
router.post('/', authMiddleware, upload.single('image'), createGallery);

router.get('/my-galleries', authMiddleware, getGalleries);

// Dapatkan semua galeri
router.get('/', getAllGalleries);

// Dapatkan galeri berdasarkan ID
router.get('/:id', getGallery,);

// Update galeri berdasarkan ID
router.put('/:id', authMiddleware, upload.single('image'), updateGallery);

// Hapus galeri berdasarkan ID
router.delete('/:id', authMiddleware, deleteGallery);

export default router;
