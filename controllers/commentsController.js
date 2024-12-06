const Comment = require("../models/commentsModel");

const addComment = async (req, res) => {
  const { listing_id, user_id, comment } = req.body;

  try {
    const id = await Comment.create(listing_id, user_id, comment);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

const getCommentsByListing = async (req, res) => {
  const { listing_id } = req.params;
  try {
    const comments = await Comment.getByListing(listing_id);
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch comments", details: error.message });
  }
};

module.exports = { addComment, getCommentsByListing };
