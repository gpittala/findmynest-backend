const db = require("../config/db");

const Messages = {
  createConversation: async (user1Id, user2Id) => {
    const query = `
      INSERT INTO conversations (user1_id, user2_id)
      VALUES (LEAST(?, ?), GREATEST(?, ?))
      ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);
    `;
    const [result] = await db.query(query, [user1Id, user2Id, user1Id, user2Id]);
    return result.insertId;
  },

  getConversationsByUserId: async (userId) => {
    const query = `
      SELECT c.id AS conversation_id,
             u1.name AS user1_name,
             u2.name AS user2_name,
             c.created_at
      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id
      WHERE c.user1_id = ? OR c.user2_id = ?
      ORDER BY c.created_at DESC;
    `;
    const [rows] = await db.query(query, [userId, userId]);
    return rows;
  },

  getMessagesByConversationId: async (conversationId) => {
    const query = `
      SELECT id AS message_id, content, is_read, created_at
      FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC;
    `;
    const [rows] = await db.query(query, [conversationId]);
    return rows;
  },

  createMessage: async (conversationId, content) => {
    const query = `
      INSERT INTO messages (conversation_id, content)
      VALUES (?, ?);
    `;
    const [result] = await db.query(query, [conversationId, content]);
    return result.insertId;
  },
};

module.exports = Messages;
