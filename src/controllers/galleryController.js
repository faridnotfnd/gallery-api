import Gallery from '../models/Gallery.js';
import User from '../models/User.js'; // Make sure to import the User model
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { compressImage } from './imageCompression.js';

// Konfigurasi penyimpanan untuk gambar yang di-upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Menyimpan gambar di folder 'uploads'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Menggunakan nama file unik
  }
});

// Filter untuk memeriksa apakah file adalah gambar
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Setup multer dengan konfigurasi storage dan filter
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Membatasi ukuran gambar maksimal 5MB
  fileFilter: fileFilter
});

// Create Gallery dengan upload gambar
export const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const { title, description, compress } = req.body;
    let image_url;

    if (compress === 'true') {
      // Compress the image
      const compressedImage = await compressImage(req.file);
      image_url = compressedImage.path;
    } else {
      // Use original image
      image_url = req.file.path;
    }

    const gallery = await Gallery.create({
      title,
      description,
      image_url,
      user_id: req.user.id,
    });
    
    res.status(201).json({ message: 'Gallery created successfully', gallery });
  } catch (error) {
    res.status(400).json({ message: 'Error creating gallery', error });
  }
};

// Get All Galleries with Pagination
export const getAllGalleries = async (req, res) => {
  try {
    let { page, limit } = req.query;
    
    // Ubah default dan validasi
    page = Math.max(1, parseInt(page) || 1); // Pastikan minimal page 1
    limit = Math.min(50, Math.max(1, parseInt(limit) || 12)); // Default 12, max 50
    
    // Perbaiki perhitungan offset
    const offset = (page - 1) * limit;

    const { count, rows } = await Gallery.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']], // Tetap urutkan dari terbaru
      attributes: { 
        include: [
          'id', 
          'title', 
          'description', 
          'image_url', 
          'user_id', 
          'album_id',
          'createdAt', 
          'updatedAt'
        ] 
      },
      raw: true // Untuk optimasi performa
    });

    // Tambahkan logging untuk debug
    console.log(`Fetching galleries: page=${page}, limit=${limit}, offset=${offset}, total=${count}`);

    res.status(200).json({
      galleries: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      itemsPerPage: limit,
      offset: offset
    });
  } catch (error) {
    console.error('Error in getAllGalleries:', error);
    res.status(500).json({ 
      message: 'Error fetching galleries', 
      error: error.message 
    });
  }
};

export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.findAll({ where: { user_id: req.user.id } });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching galleries', error });
  }
};

// Get Single Gallery
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'username'] // Tambahkan id user
      }]
    });

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    // Transform the gallery object to include user data
    const galleryWithUser = {
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      image_url: gallery.image_url,
      user_id: gallery.User ? gallery.User.id : null, // Pastikan user_id ada
      username: gallery.User ? gallery.User.username : null,
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt
    };

    res.status(200).json(galleryWithUser);
  } catch (error) {
    console.error('Error in getGallery:', error);
    res.status(500).json({ message: 'Error fetching gallery', error: error.message });
  }
};

// Update Gallery dengan upload gambar baru
export const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    const { title, description } = req.body;
    
    // Jika ada file gambar baru, hapus gambar lama dan simpan yang baru
    if (req.file) {
      if (gallery.image_url) {
        fs.unlinkSync(gallery.image_url); // Hapus gambar lama
      }
      gallery.image_url = req.file.path; // Ganti dengan gambar baru
    }

    gallery.title = title;
    gallery.description = description;
    
    await gallery.save();
    res.status(200).json({ message: 'Gallery updated successfully', gallery });
  } catch (error) {
    res.status(400).json({ message: 'Error updating gallery', error }); 
  }
};

// Delete Gallery
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    // Hapus file gambar dari sistem file
    const imagePath = path.join('uploads', path.basename(gallery.image_url));
    if (fs.existsSync(imagePath)) { // Periksa jika file ada sebelum menghapus
      fs.unlinkSync(imagePath);
    }

    await gallery.destroy();
    res.status(200).json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting gallery', error });
  }
};


// Export multer upload untuk digunakan di route
export { upload };