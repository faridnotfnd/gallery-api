import cache from '../config/cache.js';
import path from 'path';
import fs from 'fs';

export const imageCacheMiddleware = (req, res, next) => {
  const imageUrl = req.url;
  const cacheKey = `image_${imageUrl}`;

  // Cek apakah gambar ada di cache
  const cachedImage = cache.get(cacheKey);
  if (cachedImage) {
    return res.end(cachedImage);
  }

  // Jika tidak ada di cache, baca file dan simpan ke cache
  const imagePath = path.join('uploads', path.basename(imageUrl));
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    cache.set(cacheKey, imageBuffer);
    return res.end(imageBuffer);
  }

  next();
};