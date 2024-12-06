const Rating = require("../models/ratingsModel");

const rateListing = async (req, res) => {
  const { listing_id, user_id, rating } = req.body;

  try {
    const id = await Rating.create(listing_id, user_id, rating);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Failed to rate listing" });
  }
};

const getRatingsByListing = async (req, res) => {
  const { listing_id } = req.params;
  try {
    const ratings = await Rating.getByListing(listing_id);
    res.status(200).json(ratings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch ratings", details: error.message });
  }
};

module.exports = { rateListing, getRatingsByListing };
