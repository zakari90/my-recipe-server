import models from "../models/index.js";

export async function createComment(req, res) {
  const { text } = req.body;
  try {
    await models.Comment.create({
      text,
      PostId: req.params.postId,
      UserId: req.currentUser.id,
    });
    res.status(200).json({ message: "تم إضافة التعليق" });
  }
  catch (e) {
    console.warn("Error creating comment:", e);
    res.status(500).json(e);
  }
}

export async function getPostComment(req, res) {
  try {
    const comments = await models.Comment.findAll({
      where: { PostId: req.params.postId },
      include: [
        {
          model: models.User,
          attributes: { exclude: ["email", "password"] },
        },
      ],
    });
    res.status(200).json(comments);
  }
  catch (e) {
    res.status(500).json(e);
  }
}
