const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const collectionSchema = new Schema({
  title: String,
  spot: { text: String, ref: "Spot" },
});

const Collection = model("collection", collectionSchema);

module.exports = Collection;
