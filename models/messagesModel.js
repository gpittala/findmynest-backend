const db = require("../config/db");

const Messages = {
  createConversation: async (user1Id, user2Id) => {
    // Ensure user1_id < user2_id for consistent insertion
    const [sortedUser1Id, sortedUser2Id] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id];
    const query = `
      INSERT INTO conversations (user1_id, user2_id)
      SELECT ?, ?
      WHERE NOT EXISTS (
        SELECT 1 FROM conversations WHERE user1_id = ? AND user2_id = ?
      );
    `;
    await db.query(query, [sortedUser1Id, sortedUser2Id, sortedUser1Id, sortedUser2Id]);

    const [result] = await db.query(
      `SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ?`,
      [sortedUser1Id, sortedUser2Id]
    );
    return result[0].id;
  },

  getConversationsByUserId: async (userId) => {
    const query = `
      SELECT c.id AS conversation_id,
             CASE
               WHEN c.user1_id = ? THEN u2.name
               ELSE u1.name
             END AS other_user_name,
             (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message,
             (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message_time
      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id
      WHERE c.user1_id = ? OR c.user2_id = ?
      ORDER BY last_message_time DESC;
    `;
    const [rows] = await db.query(query, [userId, userId, userId]);
    return rows;
  },

  getMessagesByConversationId: async (conversationId) => {
    const query = `
      SELECT id AS message_id, sender_id, content, created_at
      FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC;
    `;
    const [rows] = await db.query(query, [conversationId]);
    return rows;
  },

  createMessage: async (conversationId, senderId, content) => {
    const query = `
      INSERT INTO messages (conversation_id, sender_id, content)
      VALUES (?, ?, ?);
    `;
    const [result] = await db.query(query, [conversationId, senderId, content]);
    return result.insertId;
  },
};

module.exports = Messages;
