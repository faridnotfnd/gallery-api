import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // ID bertambah otomatis
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Nama kategori wajib diisi
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Deskripsi kategori opsional
    },
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Category;
