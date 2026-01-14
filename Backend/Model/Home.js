const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
 title: String,
  location: String,
  price: Number,
  image: String,
  description: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Home", houseSchema);
