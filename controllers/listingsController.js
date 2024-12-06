const Listing = require("../models/listingsModel");
const User = require("../models/usersModel");

const createListing = async (req, res) => {
  const {
    user_id,
    title,
    building_name,
    building_type,
    address,
    description,
    bedrooms,
    bathrooms,
    monthly_rent,
    security_deposit,
    lease_type,
    lease_duration,
    sq_feet,
    amenities,
    contact_email,
    contact_mobile,
    fees_policies,
    location_coordinates,
    availability,
    university_id,
  } = req.body;

  const photoFiles = req.files || [];

  const data = [
    user_id,
    title,
    building_name,
    building_type,
    address,
    description,
    bedrooms,
    bathrooms,
    monthly_rent,
    security_deposit,
    lease_type,
    lease_duration,
    sq_feet,
    amenities,
    contact_email,
    contact_mobile,
    fees_policies,
    location_coordinates,
    availability,
    university_id,
  ];

  try {
    const listingId = await Listing.create(data);
    const photoUrls = photoFiles.map((file) => `/uploads/${file.filename}`);
    if (photoUrls.length > 0) {
      await Listing.addPhotos(listingId, photoUrls);
    }

    res
      .status(201)
      .json({ id: listingId, message: "Listing created successfully" });
  } catch (error) {
    console.error("Error creating listing:", error.message);
    res.status(500).json({ error: "Failed to create listing" });
  }
};

const modifyListing = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    building_name,
    building_type,
    address,
    description,
    bedrooms,
    bathrooms,
    monthly_rent,
    security_deposit,
    lease_type,
    lease_duration,
    sq_feet,
    amenities,
    contact_email,
    contact_mobile,
    fees_policies,
    location_coordinates,
    availability,
  } = req.body;

  const photoFiles = req.files || [];

  const data = [
    title,
    building_name,
    building_type,
    address,
    description,
    bedrooms,
    bathrooms,
    monthly_rent,
    security_deposit,
    lease_type,
    lease_duration,
    sq_feet,
    amenities,
    contact_email,
    contact_mobile,
    fees_policies,
    location_coordinates,
    availability,
    id,
  ];

  try {
    const result = await Listing.update(data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }
    const photoUrls = photoFiles.map((file) => `/uploads/${file.filename}`);
    if (photoUrls.length > 0) {
      await Listing.addPhotos(id, photoUrls);
    }
    const { removePhotos } = req.body;
    if (removePhotos && removePhotos.length > 0) {
      await Listing.removePhotos(id, removePhotos);
    }
    res.status(200).json({ id: id, message: "Listing updated successfully" });
  } catch (error) {
    console.error("Error updating listing:", error.message);
    res.status(500).json({ error: "Failed to update listing" });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    await Listing.delete(id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error.message);
    res.status(500).json({ error: "Failed to delete listing" });
  }
};

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.getAllWithPhotos();
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching all listings:", error.message);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

const getListingsByUniversity = async (req, res) => {
  const { university_id } = req.query;

  try {
    const listings = await Listing.getByUniversityWithPhotos(university_id);
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings by university:", error.message);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

const getListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.getById(id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    const photos = await Listing.getPhotosByListing(id);
    const user = await User.getById(listing.user_id);
    res.status(200).json({ listing, photos, user });
  } catch (error) {
    console.error("Error fetching listing by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch listing details" });
  }
};

const getListingsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const listings = await Listing.getByUserId(userId);
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings by user:", error.message);
    res.status(500).json({ error: "Failed to fetch user listings" });
  }
};

const deletePhotosByID = async (req, res) => {
  const { id } = req.params;
  const { photo_url } = req.body;

  try {
    await Listing.removePhoto(id, photo_url);
    res.status(200).json({ message: "Photo removed successfully" });
  } catch (error) {
    console.error("Error removing photo:", error);
    res.status(500).json({ error: "Failed to remove photo" });
  }
};

module.exports = {
  createListing,
  modifyListing,
  deleteListing,
  getAllListings,
  getListingsByUniversity,
  getListingById,
  getListingsByUser,
  deletePhotosByID,
};
