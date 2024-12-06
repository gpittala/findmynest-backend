const express = require("express");
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

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/universities", universitiesRoutes);

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
