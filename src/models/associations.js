import Album from "./Album.js";
import Gallery from "./Gallery.js";

// Sekarang kita bisa mendeklarasikan relasi di satu tempat
Album.hasMany(Gallery, { foreignKey: "album_id", as: "photos" });
Gallery.belongsTo(Album, { foreignKey: "album_id" });

export default { Album, Gallery };
