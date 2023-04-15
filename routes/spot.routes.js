const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Spot = require("../models/Spot.model");

// POST - CREATE a spot
router.post("/", (req, res, next) => {
  const { title, description, category, image, userId } = req.body;

  Spot.create({ title, description, category, image, userId })
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
router.get("/:spotId", (req, res, next) => {
  const { spotId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(spotId)) {
    res.status(400).json({ message: "This is not a valid id" });
  }

  Spot.findById(spotId)
    .then((spot) => res.status(200).json(spot))
    .catch((error) => res.json(error));
});

module.exports = router;

