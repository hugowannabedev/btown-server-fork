const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Spot = require("../models/Spot.model");
const Collection = require("../models/Collection.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST - CREATE a collection
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description, spot } = req.body;
  const userId = req.payload._id

  Collection.create({ name, description, userId, spot })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET - Display all collections of the logged-in user
router.get("/", (req, res, next) => {
  Collection.find()
    .populate("spot")
    .then((allCollections) => res.json(allCollections))
    .catch((error) => res.json(error));
});

/* // GET - Trying to filter the collections by userId
router.get("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  Collection.find({userId})
    .populate("spot")
    .then((allCollections) => res.json(allCollections))
    .catch((error) => res.json(error));
}); */


/* // GET - Display a collection
router.get("/:collectionId", isAuthenticated, (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "This id is not valid" });
    return;
  }

  Collection.findById(collectionId)
    .populate("spot")
    .then((collection) => res.status(200).json(collection))
    .catch((error) => res.json(error));
});



// DELETE  /api/collections/:collectionId  -  Deletes a specific collection by id
router.delete("/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectiontId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Collection.findByIdAndRemove(collectionId)
    .then(() =>
      res.json({
        message: `The collection with ${collectionId} was successfully removed.`,
      })
    )
    .catch((error) => res.json(error));
});

//UPDATE:/api/collections/:collectionId  -  Update a specific Collection by id

router.put("/collection/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Collection.findByIdAndUpdate(collectionId, req.body, { new: true })
    .then((updatedCollection) => res.json(updatedCollection))
    .catch((error) => res.json(error));
}); */


module.exports = router;
