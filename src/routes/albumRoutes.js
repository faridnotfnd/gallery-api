import express from "express";
import {
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../controllers/albumController.js"; // Import controller

const router = express.Router();

// Get all albums
router.get("/", getAllAlbums);

// Create a new album
router.post("/", createAlbum);

// Update an album
router.put("/:id", updateAlbum);

// Delete an album
router.delete("/:id", deleteAlbum);

// Tambahkan endpoint untuk menambah foto ke album
router.post("/:id/photos", async (req, res) => {
  try {
    const { id } = req.params;
    const { photoIds } = req.body;

    const album = await Album.findByPk(id);
    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan" });
    }

    // Update foto-foto yang dipilih dengan album_id yang baru
    await Gallery.update({ album_id: id }, { where: { id: photoIds } });

    res.json({ message: "Foto berhasil ditambahkan ke album" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
