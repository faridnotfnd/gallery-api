// CategoryController.js
import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["name", "ASC"]]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching categories", 
      error: error.message 
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching category", 
      error: error.message 
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({
      name,
      description
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating category", 
      error: error.message 
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update({
      name: name || category.name,
      description: description || category.description
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating category", 
      error: error.message 
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting category", 
      error: error.message 
    });
  }
};