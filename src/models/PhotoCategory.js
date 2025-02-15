// import { DataTypes } from "sequelize";
// import sequelize from "../config/database.js";

// const PhotoCategory = sequelize.define(
//   "PhotoCategory",
//   {
//     galleries_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'galleries',
//         key: 'id'
//       }
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Categories',
//         key: 'category_id'  // Sesuaikan dengan primary key di tabel Categories
//       }
//     }
//   },
//   {
//     tableName: 'PhotoCategories'
//   }
// );

// export default PhotoCategory;