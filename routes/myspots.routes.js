const express = require("express");
const router = express.Router();
const Myspot = require("../models/Myspot.model");


// POST - Create a new spot
router.post("/", (req, res, next) => {
    const { spotId } = req.body;
    const userId = req.useer._id;

    Myspot.create({ spot: spotId, user: userId })
        .then((myspot) => res.json(myspot))
        .catch((error) => next(error));
})

// GET - Display all the spots of the user
router.get("/", (req, res, next) => {
    const userId = re.user._id;

    Myspot.find({ user: userId })
        .populate("spot")
        .then((myspots) => res.json(myspots))
        .catch((error) => next(error));
});


module.exports = router;