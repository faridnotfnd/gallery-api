import express from "express";
import {
  addLike,
  removeLike,
  getLikeCount,
  checkUserLike
} from "../controllers/likeController.js";

const router = express.Router();

// Menambahkan like pada foto
router.post("/", addLike);

// Menghapus like berdasarkan user_id dan gallery_id
router.delete("/:gallery_id", removeLike);

// Mendapatkan jumlah like dari sebuah gallery
router.get("/count/:gallery_id", getLikeCount);

// Mengecek apakah user telah memberikan like
router.get("/user/:gallery_id", checkUserLike);


export default router;
