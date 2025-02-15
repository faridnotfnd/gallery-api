import User from "../models/User.js"; // Make sure to import the User model
import Like from "../models/Like.js"; // Pastikan Like di-import
import { Gallery, Category, GalleryCategory } from "../models/index.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { compressImage } from "./imageCompression.js";
import { Sequelize } from "sequelize"; // Tambahkan ini di bagian atas

// Konfigurasi penyimpanan untuk gambar yang di-upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Menyimpan gambar di folder 'uploads'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Menggunakan nama file unik
  },
});

// Filter untuk memeriksa apakah file adalah gambar
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Setup multer dengan konfigurasi storage dan filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Membatasi ukuran gambar maksimal 5MB
  fileFilter: fileFilter,
});

export const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const { title, description, compress, categories } = req.body;
    let image_url =
      compress === "true"
        ? (await compressImage(req.file)).path
        : req.file.path;

    // Pastikan categories adalah array
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "Categories must be a non-empty array" });
    }

    // Buat galeri baru
    const gallery = await Gallery.create({
      title,
      description,
      image_url,
      user_id: req.user.id,
    });

    // Proses kategori secara paralel untuk efisiensi
    const categoryInstances = await Promise.all(
      categories.map(async (categoryName) => {
        let category = await Category.findOne({
          where: { name: categoryName },
        });

        if (!category) {
          category = await Category.create({
            name: categoryName,
            description: `Category for ${categoryName}`,
          });
        }

        return category;
      })
    );

    // Tambahkan ke tabel pivot GalleryCategory
    await Promise.all(
      categoryInstances.map((category) =>
        GalleryCategory.create({
          gallery_id: gallery.id,
          category_id: category.category_id,
        })
      )
    );

    // Ambil galeri dengan daftar kategori terkait
    const galleryWithCategories = await Gallery.findByPk(gallery.id, {
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["category_id", "name"],
        },
      ],
    });

    res.status(201).json({
      message: "Gallery created successfully",
      gallery: galleryWithCategories,
    });
  } catch (error) {
    console.error("Error in createGallery:", error);
    res.status(500).json({
      message: "Error creating gallery",
      error: error.message,
    });
  }
};

export const getAllGalleries = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.min(50, Math.max(1, parseInt(limit) || 12));

    const offset = (page - 1) * limit;

    const { count, rows } = await Gallery.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]], // Gunakan urutan berdasarkan waktu upload, bukan acak!
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["category_id", "name"],
        },
      ],
    });

    res.status(200).json({
      galleries: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      itemsPerPage: limit,
      offset: offset,
    });
  } catch (error) {
    console.error("Error in getAllGalleries:", error);
    res
      .status(500)
      .json({ message: "Error fetching galleries", error: error.message });
  }
};

export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.findAll({
      where: { user_id: req.user.id },
    });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching galleries", error });
  }
};

// Get Single Gallery
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username"] },
        {
          model: Category,
          as: "categories",
          attributes: ["category_id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Transform the gallery object to include user data
    const galleryWithUser = {
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      image_url: gallery.image_url,
      user_id: gallery.User ? gallery.User.id : null, // Pastikan user_id ada
      username: gallery.User ? gallery.User.username : null,
      categories: gallery.categories || [],
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt,
    };

    res.status(200).json(galleryWithUser);
  } catch (error) {
    console.error("Error in getGallery:", error);
    res
      .status(500)
      .json({ message: "Error fetching gallery", error: error.message });
  }
};

// Update Gallery dengan upload gambar baru
export const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const { title, description, categories } = req.body;

    gallery.title = title;
    gallery.description = description;
    await gallery.save();

    // Jika ada kategori baru, hapus yang lama dan tambahkan yang baru
    if (categories && Array.isArray(categories)) {
      await GalleryCategory.destroy({ where: { gallery_id: gallery.id } });

      for (const categoryName of categories) {
        let category = await Category.findOne({
          where: { name: categoryName },
        });

        if (!category) {
          category = await Category.create({
            name: categoryName,
            description: `Category for ${categoryName}`,
          });
        }

        await GalleryCategory.create({
          gallery_id: gallery.id,
          category_id: category.category_id,
        });
      }
    }

    res.status(200).json({ message: "Gallery updated successfully", gallery });
  } catch (error) {
    res.status(400).json({ message: "Error updating gallery", error });
  }
};

// Delete Gallery
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Hapus semua like terkait gallery ini sebelum menghapus gallery
    await Like.destroy({ where: { gallery_id: gallery.id } });

    // Hapus file gambar dari sistem file
    const imagePath = path.join("uploads", path.basename(gallery.image_url));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Hapus gallery setelah like dihapus
    await gallery.destroy();

    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(400).json({ message: "Error deleting gallery", error });
  }
};

// Export multer upload untuk digunakan di route
export { upload };
