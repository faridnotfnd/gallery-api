import express from "express";
import multer from "multer";

import {
  getAlbumsByUser,
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  uploadPhotoToAlbum,
  getAlbumById,
} from "../controllers/albumController.js"; // Import controller

const router = express.Router();
// Konfigurasi penyimpanan file (uploads/)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Simpan ke folder uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename file agar unik
  },
});

const upload = multer({ storage: storage });

router.get("/user/:userId", getAlbumsByUser);

// Get all albums
router.get("/", getAllAlbums);

// Update an album
router.put("/:id", updateAlbum);

// Route untuk buat album dengan upload gambar
router.post("/", upload.array("photos"), createAlbum);

// Delete an album
router.delete("/:id", deleteAlbum);

// Route untuk menambahkan foto ke album
router.post("/:albumId/photos", upload.array("photos"), uploadPhotoToAlbum);

router.get("/:albumId", getAlbumById);

export default router;
