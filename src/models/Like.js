import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Gallery from './Gallery.js'; // Sesuaikan path jika perlu
import User from './User.js'; // Sesuaikan path jika perlu

const Like = sequelize.define('Like', {
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
      key: 'id',
    },
  },
  gallery_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Gallery, // Model untuk Gallery
      key: 'id',
    },
  },
}, {
  underscored: true,
  timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  createdAt: 'created_at',
  updatedAt: 'updated_at', // Kolom untuk createdAt//
});

export default Like;