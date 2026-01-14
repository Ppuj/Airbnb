const express = require("express");
const auth = require("../middleware/authMiddleware");
const { bookings, bookingsguest } = require("../Controllers/bookingController");

const router = express.Router();

router.post("/", auth, bookings);

router.get("/my", auth, bookingsguest);

module.exports = router;
