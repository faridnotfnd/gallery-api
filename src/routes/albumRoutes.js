import express from "express";
import {
  getAlbumsByUser,
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  addPhotosToAlbum,
  getAlbumById,
  uploadMiddleware
} from "../controllers/albumController.js";

const router = express.Router();

// Route untuk mendapatkan semua album
router.get("/", getAllAlbums);

// Route untuk mendapatkan album berdasarkan user
router.get("/user/:userId", getAlbumsByUser);

// Route untuk mendapatkan detail album
router.get("/:albumId", getAlbumById);

// Route untuk membuat album baru dengan multiple photos
router.post("/", uploadMiddleware, createAlbum);

// Route untuk menambahkan foto ke album yang sudah ada
router.post("/:albumId/photos", uploadMiddleware, addPhotosToAlbum);

// Ubah parameter 
router.put("/:albumId", updateAlbum);

// Route untuk menghapus album
router.delete("/:id", deleteAlbum);

export default router;                      