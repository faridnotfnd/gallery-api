import express from 'express';
import * as CategoryController from '../controllers/CategoryController.js';
import * as PhotoCategoryController from '../controllers/PhotoCategoryController.js';

const router = express.Router();

// Category routes
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:id', CategoryController.getCategoryById);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

// PhotoCategory routes
router.post('/photo-categories', PhotoCategoryController.assignCategoriesToPhoto);
router.get('/photos/:photo_id/categories', PhotoCategoryController.getPhotoCategories);
router.get('/categories/:category_id/photos', PhotoCategoryController.getPhotosByCategory);
router.delete('/photos/:photo_id/categories/:category_id', PhotoCategoryController.removePhotoCategory);

export default router;