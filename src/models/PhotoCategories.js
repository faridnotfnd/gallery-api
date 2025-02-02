import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Photo from "./Gallery.js"; // Pastikan path benar untuk model Photo/Gallery
import Category from "./Category.js";

const PhotoCategory = sequelize.define(
  "PhotoCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // ID bertambah otomatis
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Photo, // Model foto
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category, // Model kategori
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

PhotoCategory.belongsTo(Photo, { foreignKey: "photo_id" });
PhotoCategory.belongsTo(Category, { foreignKey: "category_id" });

export default PhotoCategory;
