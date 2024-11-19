import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Sesuaikan path jika perlu

const Gallery = sequelize.define('Gallery', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  underscored: true, // Jika Anda menggunakan nama kolom dengan garis bawah
});

// Ekspor model
export default Gallery;

