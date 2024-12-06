const db = require("../config/db");

const Rating = {
  create: async (listing_id, user_id, rating) => {
    const [result] = await db.query(
      "INSERT INTO ratings (listing_id, user_id, rating, created_at) VALUES (?, ?, ?, NOW())",
      [listing_id, user_id, rating]
    );
    return result.insertId;
  },
  getByListing: async (listing_id) => {
    const [rows] = await db.query(
      "SELECT * FROM ratings WHERE listing_id = ?",
      [listing_id]
    );
    return rows;
  },
};

module.exports = Rating;
