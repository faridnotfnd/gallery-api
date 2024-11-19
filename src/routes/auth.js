import express from 'express';
import { adminRegister, adminLogin, register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/register', adminRegister); // Rute registrasi admin
router.post('/admin/login', adminLogin); // Rute login admin

router.post('/register', register);
router.post('/login', login);
// router.get('/', getUsers);

export default router;
