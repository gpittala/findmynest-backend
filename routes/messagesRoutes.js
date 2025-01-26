const express = require("express");
const MessagesController = require("../controllers/messagesController");

const router = express.Router();

router.post("/conversation", MessagesController.createConversation);
router.get("/conversations/:userId", MessagesController.getConversations);
router.get("/conversation/:conversationId", MessagesController.getMessages);
router.post("/", MessagesController.createMessage);

module.exports = router;
