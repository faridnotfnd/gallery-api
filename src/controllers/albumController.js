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
          attributes: ["id", "title", "image_url"], // Menggunakan kolom yang benar
        },
      ],
    });

    console.log("Album Data (Before Response):", album);

    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan." });
    }

    res.json({
      message: "Album berhasil ditemukan",
      data: album,
    });
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil data album",
      details: error.message,
    });
  }
};
// Membuat album baru
export const uploadMiddleware = upload.array("photos", 10); // Maksimal 10 foto

// Controller untuk membuat album baru dengan atau tanpa foto
export const createAlbum = async (req, res) => {
  try {
    console.log("=== DEBUG INFO ===");
    console.log("Request body:", req.body);
    console.log("Files received:", req.files);

    const title = req.body.title?.trim();
    const description = req.body.description?.trim() || "";
    const user_id = req.body.user_id;
    let photos_metadata = [];

    if (req.body.photos_metadata) {
      try {
        photos_metadata = JSON.parse(req.body.photos_metadata);
      } catch (error) {
        console.error("Error parsing photos_metadata:", error);
        photos_metadata = [];
      }
    }

    if (!title) {
      return res.status(400).json({ error: "Judul album wajib diisi." });
    }

    if (!user_id) {
      return res.status(400).json({ error: "User ID wajib diisi." });
    }

    const userIdInt = parseInt(user_id, 10);
    if (isNaN(userIdInt)) {
      return res.status(400).json({ error: "User ID harus berupa angka." });
    }

    const user = await User.findByPk(userIdInt);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    const album = await Album.create({
      title,
      description,
      user_id: userIdInt,
    });

    if (req.files && req.files.length > 0) {
      const galleryPromises = req.files.map(async (file, index) => {
        const photoMeta = photos_metadata[index] || {};
        // Ambil kategori dari metadata foto, bukan dari req.body
        const categories = photoMeta.categories || [];
    
        try {
          // Buat foto di Gallery
          const gallery = await Gallery.create({
            title: photoMeta.title || "Untitled",
            description: photoMeta.description || null,
            image_url: file.path,
            user_id: album.user_id,
            album_id: albumId,
          });
    
          // Proses kategori untuk setiap foto
          if (categories.length > 0) {
            const categoryPromises = categories.map(async (categoryName) => {
              const [category] = await Category.findOrCreate({
                where: { name: categoryName.trim() },
                defaults: {
                  description: `Category for ${categoryName.trim()}`
                }
              });
    
              await GalleryCategory.create({
                gallery_id: gallery.id,
                category_id: category.id
              });
            });
    
            await Promise.all(categoryPromises);
          }
    
          return gallery;
        } catch (error) {
          console.error(`Error processing file ${file.originalname}:`, error);
          return null;
        }
      });
    
      await Promise.all(galleryPromises);
    }
    let galleryPhotosData = [];
    if (req.body.gallery_photos) {
      try {
        galleryPhotosData = JSON.parse(req.body.gallery_photos);

        for (const galleryPhoto of galleryPhotosData) {
          const originalGallery = await Gallery.findByPk(
            galleryPhoto.gallery_id
          );
          if (originalGallery) {
            await originalGallery.update({
              album_id: album.album_id,
            });
          }
        }
      } catch (error) {
        console.error("Error processing gallery photos:", error);
      }
    }

    const createdAlbum = await Album.findByPk(album.album_id, {
      include: [
        {
          model: Gallery,
          as: "photos",
          attributes: ["id", "title", "image_url", "description"],
        },
      ],
    });

    res.status(201).json({
      message: "Album berhasil dibuat",
      data: createdAlbum,
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
    console.log("=== DEBUG INFO ===");
    console.log("Request body:", req.body);
    console.log("Files received:", req.files);

    const { albumId } = req.params;
    let photos_metadata = [];

    // Parse metadata foto termasuk kategori
    if (req.body.photos_metadata) {
      try {
        photos_metadata = JSON.parse(req.body.photos_metadata);
        console.log("Parsed photos_metadata:", photos_metadata); // Debug log
      } catch (error) {
        console.error("Error parsing photos_metadata:", error);
        photos_metadata = [];
      }
    }

    // Validasi album
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan." });
    }

    // Handle foto dari perangkat
// Handle foto dari perangkat
if (req.files && req.files.length > 0) {
  const galleryPromises = req.files.map(async (file, index) => {
    const photoMeta = photos_metadata[index] || {};
    const categories = req.body.categories || [];

    try {
      // Buat foto di Gallery
      const gallery = await Gallery.create({
        title: photoMeta.title || "Untitled",
        description: photoMeta.description || null,
        image_url: file.path,
        user_id: album.user_id,
        album_id: albumId,
      });

      // Proses kategori seperti di galleryController
      if (categories.length > 0) {
        const categoryPromises = categories.map(async (categoryName) => {
          const [category] = await Category.findOrCreate({
            where: { name: categoryName.trim() },
            defaults: {
              description: `Category for ${categoryName.trim()}`
            }
          });

          await GalleryCategory.create({
            gallery_id: gallery.id,
            category_id: category.id
          });
        });

        await Promise.all(categoryPromises);
      }

      return gallery;
    } catch (error) {
      console.error(`Error processing file ${file.originalname}:`, error);
      return null;
    }
  });

  await Promise.all(galleryPromises);
}
    // Handle foto dari galeri dengan kategori
    let galleryPhotosData = [];
    if (req.body.gallery_photos) {
      try {
        galleryPhotosData = JSON.parse(req.body.gallery_photos);

        for (const galleryPhoto of galleryPhotosData) {
          const originalGallery = await Gallery.findByPk(
            galleryPhoto.gallery_id
          );
          if (originalGallery) {
            await originalGallery.update({
              album_id: albumId,
            });

            // Proses kategori untuk foto galeri
            if (galleryPhoto.categories && galleryPhoto.categories.length > 0) {
              for (const categoryName of galleryPhoto.categories) {
                const [category] = await Category.findOrCreate({
                  where: { name: categoryName },
                });

                await GalleryCategory.create({
                  gallery_id: originalGallery.id,
                  category_id: category.id,
                });
              }
            }
          }
        }
      } catch (error) {
        console.error("Error processing gallery photos:", error);
      }
    }

    // Ambil data album yang diperbarui
    const updatedAlbum = await Album.findByPk(albumId, {
      include: [
        {
          model: Gallery,
          as: "photos",
          include: [
            {
              model: Category,
              as: "categories",
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Foto berhasil ditambahkan ke album",
      data: updatedAlbum,
    });
  } catch (error) {
    console.error("Error adding photos to album:", error);
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
      include: [
        {
          model: Gallery,
          as: "photos",
          attributes: ["id", "title", "image_url"],
        },
      ],
    });

    if (albums.length === 0) {
      return res.status(200).json({ message: "Belum ada album", data: [] });
    }

    res.status(200).json({
      message: "Albums retrieved successfully",
      data: albums,
    });
  } catch (error) {
    console.error("Error in getAllAlbums:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil data album",
      details: error.message,
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
      include: [
        {
          model: Gallery,
          as: "photos",
          attributes: ["id", "title", "image_url"],
        },
      ],
    });

    if (!album) {
      return res.status(404).json({
        message: "Album tidak ditemukan",
        error: true,
      });
    }

    // Persiapkan data update untuk album
    const updateData = {};

    // Bersihkan dan validasi data album
    if (title !== undefined) {
      updateData.title = title.replace(/['"\\]/g, "").trim();
    }

    if (description !== undefined) {
      updateData.description = description.replace(/['"\\]/g, "").trim();
    }

    if (user_id !== undefined) {
      const userExists = await User.findByPk(user_id);
      if (!userExists) {
        return res.status(404).json({
          message: "User tidak ditemukan",
          error: true,
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
              title: photo.title?.replace(/['"\\]/g, "").trim(),
              description: photo.description?.replace(/['"\\]/g, "").trim(),
            },
            {
              where: {
                id: photo.id,
                album_id: albumId,
              },
            }
          );
        }
      }
    }

    // Ambil data terbaru setelah update
    const updatedAlbum = await Album.findByPk(albumId, {
      include: [
        {
          model: Gallery,
          as: "photos",
          attributes: ["id", "title", "image_url", "description"],
        },
      ],
    });

    res.status(200).json({
      message: "Foto berhasil ditambahkan ke album",
      data: updatedAlbum,
    });
  } catch (error) {
    console.error("Error adding photos to album:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat menambah foto",
      details: error.message,
    });
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
