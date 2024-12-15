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
