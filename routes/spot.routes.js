const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const Spot = require("../models/Spot.model");

// POST - CREATE a spot
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description, category, image } = req.body;
  const userId = req.payload._id

  Spot.create({ name, description, category, image, userId })
    .then((spot) => res.json(spot))
    .catch((error) => res.json(error));
});

// GET - DISPLAY all spots
router.get("/", (req, res, next) => {
  Spot.find()
    .then((allSpots) => res.json(allSpots))
    .catch((error) => res.json(error));
});

// GET - DISPLAY a spot
router.get("/:spotId", isAuthenticated, (req, res, next) => {
  const { spotId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(spotId)) {
    res.status(400).json({ message: "This is not a valid id" });
  }

  Spot.findById(spotId)
    .then((spot) => res.status(200).json(spot))
    .catch((error) => res.json(error));
});

module.exports = router;

