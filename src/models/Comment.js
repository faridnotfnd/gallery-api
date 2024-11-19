import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Gallery from './Gallery.js';

const Comment = sequelize.define('Comment', {
  comment: { type: DataTypes.TEXT, allowNull: false },
}, {
  timestamps: true, // Aktifkan timestamps
  created_at: 'created_at', // Menyimpan dalam kolom created_at
  updated_at: 'updated_at', // Menyimpan dalam kolom updated_at
});

// Menetapkan relasi
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Gallery, { foreignKey: 'gallery_id' });

export default Comment;
