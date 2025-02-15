import User from './User.js';
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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categories',
      key: 'category_id'
    }
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Albums',
      key: 'album_id'
    }
  }
}, {
  underscored: true, // Jika Anda menggunakan nama kolom dengan garis bawah
  timestamps: true,
});

Gallery.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Gallery, { foreignKey: 'user_id' });

// Ekspor model
export default Gallery;


