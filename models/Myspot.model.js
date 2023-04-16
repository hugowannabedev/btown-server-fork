const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const myspotSchema = new Schema(
    {
        spot: {
            type: Schema.Types.ObjectId, 
            ref: "Spot", 
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },   
    },
    {
        timestamps: true
    } 
);

const Myspot = model("Myspot", myspotSchema);

module.exports = Myspot;