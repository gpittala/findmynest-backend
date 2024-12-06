const db = require("../config/db");

const Comment = {
  create: async (listing_id, user_id, comment) => {
    const [result] = await db.query(
      "INSERT INTO comments (listing_id, user_id, comment, created_at) VALUES (?, ?, ?, NOW())",
      [listing_id, user_id, comment]
    );
    return result.insertId;
  },
  getByListing: async (listing_id) => {
    const [rows] = await db.query(
      "SELECT * FROM comments WHERE listing_id = ?",
      [listing_id]
    );
    return rows;
  },
};

module.exports = Comment;
