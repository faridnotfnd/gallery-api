import Album from "../models/Album.js";
import User from "../models/User.js";
import Photo from "../models/Gallery.js";
import Gallery from "../models/Gallery.js";  // Pastikan model Photo sudah ada
export const getAlbumsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const albums = await Album.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Gallery,
          as: "photos",
          required: false // Use left join so albums without photos still appear
        }
      ]
    });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat album baru
export const createAlbum = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    // Validasi input
    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        error: "Judul album wajib diisi dan minimal 3 karakter.",
      });
    }

    if (!user_id) {
      return res.status(400).json({
        error: "User ID wajib diisi.",
      });
    }

    // Validasi keberadaan pengguna
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        error: "Pengguna dengan ID tersebut tidak ditemukan.",
      });
    }

    // Membuat album baru
    const album = await Album.create({
      title: title.trim(),
      description: description?.trim() || null,
      user_id: parseInt(user_id, 10),
    });

    // Ambil data album dengan include User
    const albumWithUser = await Album.findByPk(album.album_id, {
      include: [
        { model: User },
        { model: Gallery, as: "photos" }
      ]
    });

    res.status(201).json({
      message: "Album berhasil dibuat.",
      album: albumWithUser
    });
  } catch (error) {
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat album.",
      details: error.message,
    });
  }
};

// Mendapatkan semua album
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [{ model: Photo, as: "photos" }], // Pastikan relasi photos ada
    });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengupdate album
export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body;

    const album = await Album.findByPk(id);
    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan" });
    }

    // Validasi user_id
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: "User tidak ditemukan" });
      }
    }

    await album.update({
      title: title?.trim() || album.title,
      description: description?.trim() || album.description,
      user_id: user_id || album.user_id,
    });

    res.json({ message: "Album berhasil diperbarui", album });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus album
export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findByPk(id);
    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan" });
    }

    await album.destroy();
    res.json({ message: "Album berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
