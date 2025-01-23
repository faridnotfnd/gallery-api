import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Gallery from "./Gallery.js"; // Sesuaikan path jika perlu
import User from "./User.js"; // Sesuaikan path jika perlu

const Like = sequelize.define(
  "Like",
  {
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment untuk like_id
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Model untuk User
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    gallery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Gallery, // Model untuk Gallery
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    underscored: true,
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
    createdAt: "created_at", // Kolom untuk createdAt
    updatedAt: "updated_at", // Kolom untuk updatedAt
    tableName: "likes", // Nama tabel di database
  }
);

// Definisi relasi
Like.belongsTo(User, { foreignKey: "user_id", as: "User" });
Like.belongsTo(Gallery, { foreignKey: "gallery_id", as: "Gallery" });

export default Like;