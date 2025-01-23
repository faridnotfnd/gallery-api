import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Sesuaikan path jika perlu
import User from "./User.js"; // Import model User untuk relasi

const Album = sequelize.define(
  "Album",
  {
    album_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // ID akan bertambah otomatis
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Kolom title tidak boleh kosong
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Deskripsi boleh kosong
    },
  },
  {
    underscored: true, // Menyusun kolom dengan garis bawah (contoh: created_at)
    timestamps: true, // Akan menambahkan createdAt dan updatedAt secara otomatis
    createdAt: "created_at", // Menyusun nama kolom sesuai dengan kebutuhan
  }
);

// Membuat relasi antara Album dan User
Album.belongsTo(User, { foreignKey: "user_id" });
export default Album;
