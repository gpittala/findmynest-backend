const Messages = require("../models/messagesModel");

const MessagesController = {
  createConversation: async (req, res) => {
    try {
      const { user1Id, user2Id } = req.body;
      const conversationId = await Messages.createConversation(user1Id, user2Id);
      res.status(201).json({ conversationId });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation." });
    }
  },

  getConversations: async (req, res) => {
    try {
      const { userId } = req.params;
      const conversations = await Messages.getConversationsByUserId(userId);
      res.status(200).json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations." });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { conversationId } = req.params;
      const messages = await Messages.getMessagesByConversationId(conversationId);
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages." });
    }
  },

  createMessage: async (req, res) => {
    try {
      const { conversationId, content } = req.body;
      const messageId = await Messages.createMessage(conversationId, content);
      res.status(201).json({ messageId });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message." });
    }
  },
};

module.exports = MessagesController;
