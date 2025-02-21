import Album from "../models/Album.js";
import User from "../models/User.js";
import Gallery from "../models/Gallery.js";
import GalleryCategory from "../models/GalleryCategory.js";
import Category from "../models/Category.js";
import multer from "multer";
import path from "path";

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Pastikan folder 'uploads' sudah dibuat
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validasi tipe file
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diperbolehkan!"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Batas ukuran file (5MB)
  },
});

export const getAlbumsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const albums = await Album.findAll({
      where: { user_id: userId },
      attributes: ["album_id", "title", "description", "cover_photo"],
      include: [
        {
          model: Gallery,
          as: "photos",
          required: false, // Use left join so albums without photos still appear
        },
      ],
    });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findByPk(albumId, {
      include: [
        {
          model: Gallery,
          as: "photos",
          attributes: ["id", "title", "image_url"] // Menggunakan kolom yang benar
        },
      ],
    });

    console.log("Album Data (Before Response):", album);

    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan." });
    }

    res.json({
      message: "Album berhasil ditemukan",
      data: album
    });
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({ 
      error: "Terjadi kesalahan saat mengambil data album",
      details: error.message 
    });
  }
};
// Membuat album baru
export const uploadMiddleware = upload.array("photos", 10); // Maksimal 10 foto

// Controller untuk membuat album baru dengan atau tanpa foto
export const createAlbum = async (req, res) => {
  try {
    console.log("=== DEBUG INFO ===");
    console.log("Request body (raw):", req.body);
    console.log("Files received:", req.files);
    
    // Ekstrak data dengan aman dari form-data
    // Form-data bisa menjadikan fields sebagai array jika memiliki nama yang sama
    const extractField = (fieldName) => {
      const value = req.body[fieldName];
      if (Array.isArray(value)) return value[0];
      return value;
    };
    
    const title = extractField('title');
    const description = extractField('description');
    const user_id = extractField('user_id');
    
    console.log("Extracted data:");
    console.log("- title:", title, "type:", typeof title);
    console.log("- description:", description);
    console.log("- user_id:", user_id);

    // Validasi input
    if (!title || (typeof title === "string" && title.trim().length === 0)) {
      return res.status(400).json({ error: "Judul album wajib diisi." });
    }

    if (!user_id) {
      return res.status(400).json({ error: "User ID wajib diisi." });
    }

    // Validasi user
    const userIdInt = parseInt(user_id, 10);
    if (isNaN(userIdInt)) {
      return res.status(400).json({ error: "User ID harus berupa angka." });
    }
    
    const user = await User.findByPk(userIdInt);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    // Pastikan data yang dikirim ke database sudah bersih
    const cleanTitle = typeof title === "string" ? title.trim() : String(title);
    const cleanDescription = description && typeof description === "string" 
      ? description.trim() 
      : null;

    // Buat album tanpa cover_photo (kolom ini tidak lagi digunakan)
    const album = await Album.create({
      title: cleanTitle,
      description: cleanDescription,
      user_id: userIdInt,
      // Menghilangkan penggunaan cover_photo 
    });
    
    console.log("Album created successfully:", album.album_id);
    
    // Simpan foto-foto ke Gallery jika ada foto yang diunggah
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map((file) =>
          Gallery.create({
            title: cleanTitle, // Menggunakan judul album untuk semua foto
            image_url: `uploads/${file.filename}`,
            user_id: userIdInt,
            album_id: album.album_id,
          })
        )
      );
      console.log(`Added ${req.files.length} photos to gallery`);
    }

    // Ambil data album beserta relasinya
    const albumWithPhotos = await Album.findByPk(album.album_id, {
      include: [
        {
          model: Gallery,
          as: "photos",
        },
      ],
    });

    res.status(201).json({
      message: "Album berhasil dibuat",
      data: albumWithPhotos,
    });
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat album",
      details: error.message,
    });
  }
};
// Controller untuk menambah foto ke album yang sudah ada
export const addPhotosToAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    
    // Validasi album
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan." });
    }

    // Validasi files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Minimal satu foto harus diunggah." });
    }

    // Simpan foto-foto ke Gallery
    let photoDetails;
    
    // Cek apakah ada data photo details atau tidak
    if (req.body.photos) {
      try {
        photoDetails = JSON.parse(req.body.photos);
        
        if (!Array.isArray(photoDetails) || photoDetails.length !== req.files.length) {
          photoDetails = req.files.map(() => ({ title: "Untitled" }));
        }
      } catch (error) {
        photoDetails = req.files.map(() => ({ title: "Untitled" }));
      }
    } else {
      photoDetails = req.files.map(() => ({ title: "Untitled" }));
    }

    // Simpan foto-foto ke Gallery
    const photos = await Promise.all(
      req.files.map(async (file, index) => {
        const photoData = photoDetails[index] || { title: "Untitled" };
        
        // Buat entry di Gallery
        const gallery = await Gallery.create({
          title: photoData.title || "Untitled",
          description: photoData.description || null,
          image_url: `uploads/${file.filename}`,
          user_id: album.user_id,
          album_id: album.album_id,
        });

        // Jika ada kategori, proses kategorinya
        if (photoData.categories && Array.isArray(photoData.categories)) {
          for (const categoryName of photoData.categories) {
            let category = await Category.findOne({
              where: { name: categoryName }
            });

            if (!category) {
              category = await Category.create({
                name: categoryName,
                description: `Category for ${categoryName}`
              });
            }

            await GalleryCategory.create({
              gallery_id: gallery.id,
              category_id: category.category_id
            });
          }
        }

        return gallery;
      })
    );

    // Ambil data album yang diperbarui beserta foto-fotonya
    const updatedAlbum = await Album.findByPk(albumId, {
      include: [
        {
          model: Gallery,
          as: "photos",
          include: [{
            model: Category,
            as: "categories",
            attributes: ["category_id", "name"],
            through: { attributes: [] }
          }]
        },
      ],
    });

    res.status(200).json({
      message: "Foto berhasil ditambahkan ke album",
      data: updatedAlbum,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat menambah foto",
      details: error.message,
    });
  }
};

// Mengupdate getAllAlbums untuk menghapus referensi ke cover_photo
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [{ 
        model: Gallery,
        as: "photos",
        attributes: ['id', 'title', 'image_url'] 
      }]
    });
    
    if (albums.length === 0) {
      return res.status(200).json({ message: "Belum ada album", data: [] });
    }
    
    res.status(200).json({
      message: "Albums retrieved successfully",
      data: albums
    });
  } catch (error) {
    console.error('Error in getAllAlbums:', error);
    res.status(500).json({ 
      error: "Terjadi kesalahan saat mengambil data album",
      details: error.message 
    });
  }
};

// Mengupdate updateAlbum untuk menghapus referensi ke cover_photo
export const updateAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { title, description, user_id, photos } = req.body;

    // Cari album yang akan diupdate
    const album = await Album.findByPk(albumId, {
      include: [{ 
        model: Gallery,
        as: "photos",
        attributes: ['id', 'title', 'image_url'] 
      }]
    });

    if (!album) {
      return res.status(404).json({ 
        message: "Album tidak ditemukan",
        error: true 
      });
    }

    // Persiapkan data update untuk album
    const updateData = {};
    
    // Bersihkan dan validasi data album
    if (title !== undefined) {
      updateData.title = title.replace(/['"\\]/g, '').trim();
    }
    
    if (description !== undefined) {
      updateData.description = description.replace(/['"\\]/g, '').trim();
    }
    
    if (user_id !== undefined) {
      const userExists = await User.findByPk(user_id);
      if (!userExists) {
        return res.status(404).json({ 
          message: "User tidak ditemukan",
          error: true 
        });
      }
      updateData.user_id = parseInt(user_id, 10);
    }

    // Update data album
    await album.update(updateData);

    // Update foto-foto jika ada
    if (photos && Array.isArray(photos)) {
      for (const photo of photos) {
        if (photo.id) {
          // Update foto yang sudah ada
          await Gallery.update(
            {
              title: photo.title?.replace(/['"\\]/g, '').trim(),
              description: photo.description?.replace(/['"\\]/g, '').trim()
            },
            {
              where: {
                id: photo.id,
                album_id: albumId
              }
            }
          );
        }
      }
    }

    // Ambil data terbaru setelah update
    const updatedAlbum = await Album.findByPk(albumId, {
      include: [{ 
        model: Gallery,
        as: "photos",
        attributes: ['id', 'title', 'image_url', 'description'] 
      }]
    });

    res.status(200).json({
      message: "Album berhasil diperbarui",
      data: updatedAlbum
    });

  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ 
      message: "Terjadi kesalahan saat memperbarui album",
      error: true,
      details: error.message 
    });
  }
}

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
