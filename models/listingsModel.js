const db = require("../config/db");

const Listing = {
  create: async (data) => {
    const [result] = await db.query(
      `INSERT INTO listings (
        user_id, title, building_name, building_type, address, description, bedrooms, bathrooms,
        monthly_rent, security_deposit, lease_type, lease_duration, sq_feet,
        amenities, contact_email, contact_mobile, fees_policies, location_coordinates,
        availability, university_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      data
    );
    return result.insertId;
  },

  update: async (data) => {
    const [result] = await db.query(
      `UPDATE listings SET
        title = ?, building_name = ?, building_type = ?, address = ?, description = ?,
        bedrooms = ?, bathrooms = ?, monthly_rent = ?, security_deposit = ?, lease_type = ?,
        lease_duration = ?, sq_feet = ?, amenities = ?, contact_email = ?, 
        contact_mobile = ?, fees_policies = ?, location_coordinates = ?, availability = ?
      WHERE id = ?`,
      data
    );
    return result;
  },

  delete: async (id) => {
    await db.query("DELETE FROM Listing_Photos WHERE listing_id = ?", [id]);
    await db.query("DELETE FROM listings WHERE id = ?", [id]);
  },

  addPhotos: async (listingId, photoUrls) => {
    const values = photoUrls.map((url) => [listingId, url]);
    await db.query(
      "INSERT INTO Listing_Photos (listing_id, photo_url) VALUES ?",
      [values]
    );
  },

  removePhotos: async (listingId, photoUrls) => {
    await db.query(
      "DELETE FROM Listing_Photos WHERE listing_id = ? AND photo_url IN (?)",
      [listingId, photoUrls]
    );
  },

  getAllWithPhotos: async () => {
    const [listings] = await db.query("SELECT * FROM listings");
    for (const listing of listings) {
      const [photos] = await db.query(
        "SELECT photo_url FROM Listing_Photos WHERE listing_id = ?",
        [listing.id]
      );
      listing.photos = photos;
    }
    return listings;
  },

  getByUniversityWithPhotos: async (university_id) => {
    const [listings] = await db.query(
      "SELECT * FROM listings WHERE university_id = ?",
      [university_id]
    );
    for (const listing of listings) {
      const [photos] = await db.query(
        "SELECT photo_url FROM Listing_Photos WHERE listing_id = ?",
        [listing.id]
      );
      listing.photos = photos;
    }
    return listings;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM listings WHERE id = ?", [id]);
    return rows[0];
  },

  getPhotosByListing: async (listingId) => {
    const [photos] = await db.query(
      "SELECT photo_url FROM Listing_Photos WHERE listing_id = ?",
      [listingId]
    );
    return photos;
  },
  getByUserId: async (userId) => {
    const [listings] = await db.query(
      "SELECT * FROM listings WHERE user_id = ?",
      [userId]
    );
    for (const listing of listings) {
      const [photos] = await db.query(
        "SELECT photo_url FROM Listing_Photos WHERE listing_id = ?",
        [listing.id]
      );
      listing.photos = photos;
    }
    return listings;
  },
  removePhoto: async (listingId, photoUrl) => {
    await db.query(
      "DELETE FROM Listing_Photos WHERE listing_id = ? AND photo_url = ?",
      [listingId, photoUrl]
    );
  },
};

module.exports = Listing;
