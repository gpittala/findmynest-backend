const Message = require("../models/messagesModel");

const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    const id = await Message.create(sender_id, receiver_id, content);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

const getUserMessages = async (req, res) => {
  const { user_id } = req.user;
  try {
    const messages = await Message.getByUser(user_id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = { sendMessage, getUserMessages };
