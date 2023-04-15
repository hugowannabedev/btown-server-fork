const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    spots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
  },
  {
    timestamps: true,
  }
);

const Collection = model("collection", collectionSchema);

module.exports = Collection;