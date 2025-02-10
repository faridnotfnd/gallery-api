import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Gallery from "./Gallery.js"; // Model Gallery
import Category from "./Category.js"; // Model Category

const PhotoCategory = sequelize.define(
  "PhotoCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // ID bertambah otomatis
    },
    galleries_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Gallery, // Model Gallery (sebelumnya Photo)
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
    tableName: "gallery_db_Photo_categories", // Sesuai dengan gambar
    timestamps: true,
    createdAt: "created_at",
  }
);

PhotoCategory.belongsTo(Gallery, { foreignKey: "galleries_id" });
PhotoCategory.belongsTo(Category, { foreignKey: "category_id" });

export default PhotoCategory;
