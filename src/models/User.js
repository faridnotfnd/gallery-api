import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Default role sebagai user
  },
  adminCode: { 
    type: DataTypes.STRING,
    allowNull: true, // Hanya diperlukan untuk admin
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default User;
