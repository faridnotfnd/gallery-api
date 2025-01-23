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
      return res
        .status(404)
        .json({ error: "Gallery atau User tidak ditemukan" });
    }

    // Cek jika user sudah memberikan like pada gallery ini
    const existingLike = await Like.findOne({
      where: { user_id, gallery_id },
    });
    if (existingLike) {
      return res
        .status(400)
        .json({ error: "Anda sudah memberikan like pada foto ini" });
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
    const { gallery_id } = req.params;
    // Ambil user_id dari body request untuk konsistensi
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        error: "User ID diperlukan",
        details: "Silakan sertakan user_id dalam body request",
      });
    }

    // Validasi keberadaan gallery dan user
    const gallery = await Gallery.findByPk(gallery_id);
    const user = await User.findByPk(user_id);

    if (!gallery || !user) {
      return res.status(404).json({
        error: "Data tidak ditemukan",
        details: !gallery ? "Gallery tidak ditemukan" : "User tidak ditemukan",
      });
    }

    // Cari like berdasarkan user_id dan gallery_id
    const like = await Like.findOne({
      where: { user_id, gallery_id },
    });

    if (!like) {
      return res.status(404).json({
        error: "Like tidak ditemukan",
        details: "User belum memberikan like pada gallery ini",
      });
    }

    // Hapus like
    await like.destroy();

    res.json({
      message: "Like berhasil dihapus",
      data: { gallery_id, user_id },
    });
  } catch (error) {
    console.error("Error saat menghapus like:", error);
    res.status(500).json({
      error: "Terjadi kesalahan pada server",
      details: error.message,
    });
  }
};

// Fungsi untuk mendapatkan jumlah like dari sebuah gallery
export const getLikeCount = async (req, res) => {
  try {
    const count = await Like.count({
      where: { gallery_id: req.params.gallery_id },
    });
    res.json({ like_count: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint untuk memeriksa apakah user sudah memberikan like
export const checkUserLike = async (req, res) => {
  try {
    const { user_id } = req.body; // Pastikan user_id dikirimkan di body
    const { gallery_id } = req.params;

    const like = await Like.findOne({
      where: { user_id, gallery_id },
    });

    res.json({ liked: !!like }); // Mengembalikan true/false
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
