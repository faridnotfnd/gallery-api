import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define("Categories", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "Categories",
  timestamps: true,
});

export default Category;
