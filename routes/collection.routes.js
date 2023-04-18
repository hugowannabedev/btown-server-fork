const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Spot = require("../models/Spot.model");
const Collection = require("../models/Collection.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST - CREATE a collection
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description } = req.body;
  console.log("collection BILL", req.body)
  console.log("User", req.payload._id)


  Collection.create({ name, description, userId: req.payload._id }) 
    .then((response) => {
      console.log(response)
      res.json(response)
    })
    .catch((error) => res.json(error));
});

 // GET - Display all collections
router.get("/", isAuthenticated, (req, res, next) => {
  Collection.find({userId: { $nin: req.payload._id }}) // This excludes the logged-in user
    .populate("spot")
    .then((allCollections) => res.json(allCollections))
    .catch((error) => res.json(error));
});

 // GET - Filter the collections by userId
router.get("/mycollection", isAuthenticated, (req, res, next) => {
  console.log("userId when getting collection page", req.payload._id)
  Collection.find({userId: req.payload._id})

    .populate("spot")
    .then((allCollections) => {
      res.json(allCollections)
      console.log(allCollections)
    })
    .catch((error) => res.json(error));
});


/* // GET - Display the details of a collection
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
