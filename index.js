const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const listingsRoutes = require("./routes/listingsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const ratingsRoutes = require("./routes/ratingsRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const universitiesRoutes = require("./routes/universitiesRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/users", usersRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/universities", universitiesRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });

  socket.on("sendMessage", (messageData) => {
    const { conversationId, content } = messageData;
    console.log("Message received:", content);

    io.to(conversationId).emit("newMessage", {
      conversationId,
      content,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
