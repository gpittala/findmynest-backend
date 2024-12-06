const express = require("express");
const {
  rateListing,
  getRatingsByListing,
} = require("../controllers/ratingsController");

const router = express.Router();

router.post("/", rateListing);
router.get("/:listing_id", getRatingsByListing);

module.exports = router;
