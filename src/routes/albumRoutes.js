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

export default router;
