// import { User, Gallery } from '../models'; // Sesuaikan dengan model Anda
import User from "../models/User.js";
import Gallery from "../models/Gallery.js";
import Album from "../models/Album.js";
import Like from "../models/Like.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";

// Melihat semua pengguna
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: "user",
      },
      attributes: ["id", "username", "email", "created_at", "updated_at"],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

// Menghapus pengguna dan galeri mereka

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await sequelize.transaction(async (t) => {
          // 1. Hapus semua likes yang dibuat user
          await Like.destroy({
              where: { user_id: id },
              transaction: t
          });

          // 2. Hapus semua likes pada gallery user
          await Like.destroy({
              where: { 
                  gallery_id: {
                      [Op.in]: sequelize.literal(
                          `(SELECT id FROM galleries WHERE user_id = ${id})`
                      )
                  }
              },
              transaction: t
          });

          // 3. Hapus albums user
          await Album.destroy({
              where: { user_id: id },
              transaction: t
          });

          // 4. Hapus galleries
          await Gallery.destroy({ 
              where: { user_id: id },
              transaction: t 
          });

          // 5. Terakhir hapus user
          await user.destroy({ transaction: t });
      });

      return res.json({ 
          message: 'User and all associated data deleted successfully' 
      });

  } catch (error) {
      console.error('Detail error:', error);
      return res.status(500).json({ 
          message: 'Error deleting user',
          error: error.message 
      });
  }
};

// Melihat galeri spesifik dari pengguna
export const getUserGalleries = async (req, res) => {
  const { id } = req.params;
  try {
    // Tambahkan pengecekan user exists
    const userExists = await User.findByPk(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const galleries = await Gallery.findAll({
      where: { user_id: id },
    });

    // Jika tidak ada galleries, kembalikan array kosong
    return res.status(200).json(galleries || []);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return res.status(500).json({
      message: "Error fetching galleries",
      error: error.message,
    });
  }
};
// Menghapus galeri spesifik
export const deleteGallery = async (req, res) => {
  const { userId, galleryId } = req.params;
  try {
    // Cari user terlebih dahulu
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cari gallery yang dimiliki oleh user tersebut
    const gallery = await Gallery.findOne({
      where: {
        id: galleryId,
        user_id: userId,
      },
    });

    if (!gallery) {
      return res
        .status(404)
        .json({
          message: "Gallery not found or does not belong to the specified user",
        });
    }

    // Hapus gallery
    await gallery.destroy();

    return res.json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return res
      .status(500)
      .json({ message: "Error deleting gallery", error: error.message });
  }
};
