const express = require("express");
const multer = require("multer");
const {
  createListing,
  modifyListing,
  deleteListing,
  getAllListings,
  getListingsByUniversity,
  getListingById,
  getListingsByUser,
  deletePhotosByID,
} = require("../controllers/listingsController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", upload.array("photos"), createListing);
router.put("/:id", upload.array("photos"), modifyListing);
router.delete("/:id", deleteListing);
router.get("/all", getAllListings);
router.get("/", getListingsByUniversity);
router.get("/:id", getListingById);
router.get("/user/:userId", getListingsByUser);
router.delete("/:id/photos", deletePhotosByID);

module.exports = router;
