const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT name FROM universities WHERE id = ?",
      [id]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "University not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch university details" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name FROM universities");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch universities" });
  }
});

module.exports = router;
