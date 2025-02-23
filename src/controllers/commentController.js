import Comment from '../models/Comment.js';
import User from '../models/User.js'; // Pastikan model User diimport

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const newComment = await Comment.create({
      comment,
      user_id: req.user.id,
      gallery_id: req.params.galleryId,
    });
    
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { gallery_id: req.params.galleryId },
      include: [
        {
          model: User,
          attributes: ['username'], // Hanya ambil atribut username
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Tambahkan fungsi update dan delete
export const updateComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const commentId = req.params.commentId;
    
    // Cek kepemilikan komentar
    const existingComment = await Comment.findOne({
      where: { 
        id: commentId,
        user_id: req.user.id 
      }
    });

    if (!existingComment) {
      return res.status(403).json({ message: 'Tidak diizinkan mengubah komentar ini' });
    }

    await Comment.update(
      { comment },
      { where: { id: commentId } }
    );
    
    res.json({ message: 'Komentar berhasil diperbarui' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating comment', error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    
    // Cek kepemilikan komentar
    const existingComment = await Comment.findOne({
      where: { 
        id: commentId,
        user_id: req.user.id 
      }
    });

    if (!existingComment) {
      return res.status(403).json({ message: 'Tidak diizinkan menghapus komentar ini' });
    }

    await Comment.destroy({
      where: { id: commentId }
    });
    
    res.json({ message: 'Komentar berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting comment', error });
  }
};
