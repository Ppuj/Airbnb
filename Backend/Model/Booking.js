const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  home: { type: mongoose.Schema.Types.ObjectId, ref: "Home" },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model("Booking", bookingSchema);
