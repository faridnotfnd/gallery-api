  import Gallery from '../models/Gallery.js';
  import User from '../models/User.js'; // Make sure to import the User model
  import multer from 'multer';
  import path from 'path';
  import fs from 'fs';

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

      const { title, description } = req.body;
      const image_url = req.file.path; // Path gambar yang di-upload


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

    // Default nilai jika tidak ada query
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;

    // Ambil data dengan pagination
    const { count, rows } = await Gallery.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']], // Urutkan dari terbaru
    });

    res.status(200).json({
      galleries: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching galleries', error });
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
          attributes: ['username'] // Only include the username
        }]
      });

      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }

      // Transform the gallery object to include username
      const galleryWithUsername = {
        ...gallery.toJSON(), // Convert Sequelize instance to plain object
        username: gallery.User ? gallery.User.username : null
      };

      res.status(200).json(galleryWithUsername);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching gallery', error });
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