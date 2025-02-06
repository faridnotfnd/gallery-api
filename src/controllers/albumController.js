import Album from "../models/Album.js";
import User from "../models/User.js";
import Photo from "../models/Gallery.js";
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
          attributes: ["id", "path"],
        },
      ],
    });

    console.log("Album Data (Before Response):", album); // Debugging

    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan." });
    }

    res.json(album);
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({ error: error.message });
  }
};

// Membuat album baru
export const createAlbum = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const { albumId } = req.params;

    // Validasi input
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Judul album wajib diisi." });
    }

    if (!user_id) {
      return res.status(400).json({ error: "User ID wajib diisi." });
    }

    // Cek apakah ada file yang diupload
    const uploadedPhotos = req.files
      ? req.files.map((file) => ({
          album_id: null, // Akan diisi setelah album dibuat
          filename: file.filename,
          path: `uploads/${file.filename}`,
        }))
      : [];

    // 1️⃣ Pastikan `uploadedPhotos` sudah ada sebelum digunakan di coverPhoto
    const coverPhoto =
      uploadedPhotos.length > 0 ? uploadedPhotos[0].path : null;

    // 2️⃣ Validasi keberadaan pengguna
    const user = await User.findByPk(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Pengguna dengan ID tersebut tidak ditemukan." });
    }

    // 3️⃣ Buat album
    const album = await Album.create({
      title: title.trim(),
      description: description?.trim() || null,
      user_id: parseInt(user_id, 10),
      cover_photo: coverPhoto,
    });

    // 4️⃣ Simpan foto ke dalam Gallery dengan album_id yang benar
    if (uploadedPhotos.length > 0) {
      const photosToInsert = uploadedPhotos.map((photo) => ({
        album_id: album.id, // Sekarang album_id sudah ada
        path: photo.path,
      }));

      await Gallery.bulkCreate(photosToInsert); // Simpan semua foto sekaligus
    }

    res.status(201).json({
      message: "Album berhasil dibuat.",
      album,
      uploadedPhotos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat album.",
      details: error.message,
    });
  }
};

export const uploadPhotoToAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    // Pastikan album ada
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).json({ error: "Album tidak ditemukan." });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Tidak ada file yang diunggah." });
    }

    // Simpan foto ke database
    const uploadedPhotos = req.files.map((file) => ({
      album_id: album.id,
      path: `uploads/${file.filename}`,
    }));

    await Gallery.bulkCreate(uploadedPhotos);

    res.status(201).json({
      message: "Foto berhasil ditambahkan ke album.",
      uploadedPhotos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Terjadi kesalahan saat mengunggah foto.",
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
