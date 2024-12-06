const express = require("express");
const {
  addComment,
  getCommentsByListing,
} = require("../controllers/commentsController");

const router = express.Router();

router.post("/", addComment);
router.get("/:listing_id", getCommentsByListing);

module.exports = router;
