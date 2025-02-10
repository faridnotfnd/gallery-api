import sharp from "sharp";
import path from "path";

export const compressImage = async (file, quality = 80) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const timestamp = Date.now();
  const filename = `compressed-${timestamp}${ext}`;
  const outputPath = path.join("uploads", filename);

  try {
    await sharp(file.buffer).jpeg({ quality: quality }).toFile(outputPath);

    return {
      path: outputPath,
      filename: filename,
    };
  } catch (error) {
    throw new Error("Error compressing image: " + error.message);
  }
};
