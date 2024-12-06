const db = require("../config/db");

const Message = {
  create: async (sender_id, receiver_id, content) => {
    const [result] = await db.query(
      "INSERT INTO messages (sender_id, receiver_id, content, is_read) VALUES (?, ?, ?, ?)",
      [sender_id, receiver_id, content, 0]
    );
    return result.insertId;
  },
  getByUser: async (user_id) => {
    const [rows] = await db.query(
      "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY created_at DESC",
      [user_id, user_id]
    );
    return rows;
  },
};

module.exports = Message;
