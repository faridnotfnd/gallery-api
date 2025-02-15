import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GalleryCategory = sequelize.define(
  "GalleryCategories",
  {
    gallery_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Gallery",
        key: "id",
      },
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "category_id",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "GalleryCategories",
    timestamps: false,
  }
);

export default GalleryCategory;
