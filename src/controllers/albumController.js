import Album from "../models/Album.js";
import User from "../models/User.js";

// Fungsi untuk membuat album baru
export const createAlbum = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const album = await Album.create({ title, description, user_id });
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk mendapatkan semua album
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk mengupdate album
export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body;

    // Validasi apakah user_id ada
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: "Album tidak ditemukan" });

    await album.update({ title, description, user_id });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk menghapus album
export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: "Album tidak ditemukan" });

    await album.destroy();
    res.json({ message: "Album berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};