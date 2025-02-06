// PhotoCategoryController.js
import PhotoCategory from "../models/PhotoCategory.js";
import Photo from "../models/Gallery.js";
import Category from "../models/Category.js";

export const assignCategoriesToPhoto = async (req, res) => {
  try {
    const { photo_id, category_ids } = req.body;

    // Validate input
    if (!photo_id || !category_ids || !Array.isArray(category_ids)) {
      return res.status(400).json({ 
        message: "Photo ID and array of category IDs are required" 
      });
    }

    // Check if photo exists
    const photo = await Photo.findByPk(photo_id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Delete existing categories for this photo
    await PhotoCategory.destroy({
      where: { photo_id }
    });

    // Create new category assignments
    const photoCategories = await Promise.all(
      category_ids.map(category_id => 
        PhotoCategory.create({ photo_id, category_id })
      )
    );

    res.status(201).json(photoCategories);
  } catch (error) {
    res.status(500).json({ 
      message: "Error assigning categories to photo", 
      error: error.message 
    });
  }
};

export const getPhotoCategories = async (req, res) => {
  try {
    const { photo_id } = req.params;
    
    const photoCategories = await PhotoCategory.findAll({
      where: { photo_id },
      include: [{
        model: Category,
        attributes: ['id', 'name', 'description']
      }]
    });

    res.json(photoCategories);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching photo categories", 
      error: error.message 
    });
  }
};

export const getPhotosByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    
    const photos = await PhotoCategory.findAll({
      where: { category_id },
      include: [{
        model: Photo,
        attributes: ['id', 'title', 'description', 'image_path']
      }]
    });

    res.json(photos);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching photos by category", 
      error: error.message 
    });
  }
};

export const removePhotoCategory = async (req, res) => {
  try {
    const { photo_id, category_id } = req.params;
    
    const deleted = await PhotoCategory.destroy({
      where: { photo_id, category_id }
    });

    if (!deleted) {
      return res.status(404).json({ 
        message: "Photo category association not found" 
      });
    }

    res.json({ message: "Category removed from photo successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error removing category from photo", 
      error: error.message 
    });
  }
};