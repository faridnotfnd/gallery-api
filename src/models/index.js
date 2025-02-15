import Gallery from "./Gallery.js";
import Category from "./Category.js";
import GalleryCategory from "./GalleryCategory.js";

// Hubungan many-to-many (Dideklarasikan setelah model dibuat)
Gallery.belongsToMany(Category, {
  through: GalleryCategory,
  foreignKey: "gallery_id",
  as: "categories",
});

Category.belongsToMany(Gallery, {
  through: GalleryCategory,
  foreignKey: "category_id",
  as: "galleries",
});

export { Gallery, Category, GalleryCategory };
