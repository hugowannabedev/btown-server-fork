const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Spot = require("../models/Spot.model");
const Collection = require("../models/Collection.model");

// POST - CREATE a collection
router.post("/collection", (req, res, next) => {
  const { title, description, spot } = req.body;

  Collection.create({ title, spot: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// GET - Display a collection
router.get("/collection/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "This id is not valid" });
    return;
  }

  Collection.findById(collectionId)
    .populate("spots")
    .then((collection) => res.status(200).json(collection))
    .catch((err) => res.json(err));
});

// GET - Display all collections
router.get("collections", (req, res, next) => {
  Collection.find()
    .populate("spots")
    .then((allCollections) => res.json(allCollections))
    .catch((err) => res.json(err));
});

// DELETE  /api/collections/:collectionId  -  Deletes a specific project by id
router.delete("/collections/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectiontId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Spot.findByIdAndRemove(collectionId)
    .then(() =>
      res.json({
        message: `The spot with ${collectionId} was successfully removed.`,
      })
    )
    .catch((error) => res.json(error));
});

//UPDATE:/api/collections/:collectionId  -  Update a specific project by id

router.put("/collection/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Collection(collectionId, req.body, { new: true })
    .then((updatedCollection) => res.json(updatedCollection))
    .catch((error) => res.json(error));
});
module.exports = router;
