const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const spotSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    category: {
      type: String,
      enum: ["Food", "Viewpoint", "Others"],
      required: [true, "Category is required."],
    },
    image: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId, ref: "User"
    },   
    spotId: {
      type: Schema.Types.ObjectId, ref: "Spot"
    },
  },
  {
    timestamps: true,
  }
);

const Spot = model("Spot", spotSchema);

module.exports = Spot;
