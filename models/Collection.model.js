const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const collectionSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    spot: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
  },
  {
    timestamps: true,
  }
);

const Collection = model("collection", collectionSchema);

module.exports = Collection;
