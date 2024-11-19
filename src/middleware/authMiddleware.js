import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Sesuaikan dengan lokasi model user Anda

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
      const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = verified;

      // Mendapatkan informasi pengguna dari database
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      req.user.role = user.role; // Menambahkan role ke request user
      next();
  } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware; // Gunakan export default
