const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    spot: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);

const Collection = model("collection", collectionSchema);

module.exports = Collection;