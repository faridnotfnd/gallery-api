import Like from "../models/Like.js"; // Import model Like
import Gallery from "../models/Gallery.js"; // Import model Gallery
import User from "../models/User.js"; // Import model User

// Fungsi untuk menambahkan like pada foto
export const addLike = async (req, res) => {
  try {
    const { user_id, gallery_id } = req.body;
    
    // Pastikan gallery_id dan user_id ada
    const gallery = await Gallery.findByPk(gallery_id);
    const user = await User.findByPk(user_id);
    
    if (!gallery || !user) {
      return res.status(404).json({ error: 'Gallery atau User tidak ditemukan' });
    }

    const like = await Like.create({ user_id, gallery_id });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk menghapus like dari foto
export const removeLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    
    if (!like) {
      return res.status(404).json({ error: 'Like tidak ditemukan' });
    }

    await like.destroy();
    res.json({ message: 'Like berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk mendapatkan jumlah like dari sebuah gallery
export const getLikeCount = async (req, res) => {
  try {
    const count = await Like.count({ where: { gallery_id: req.params.gallery_id } });
    res.json({ like_count: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};