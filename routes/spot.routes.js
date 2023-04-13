const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// CREATE a spot
router.post("/spots", (req, res, next) => {
  const { title, description, category, image } = req.body;

  Spot.create({ title, description, category, image: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
//
