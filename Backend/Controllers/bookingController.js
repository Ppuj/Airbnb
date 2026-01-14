const booking = require("../Model/Booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.bookings= async(req,res)=>{
    if (req.user.role !== "guest")
        return res.status(403).json({ message: "Only guest allowed" });
    
      const booking = await Booking.create({
        ...req.body,
        guest: req.user.id
      });
    
      res.json(booking);
}
exports.bookingsguest=async(req,res)=>{
     const bookings = await Booking.find({ guest: req.user.id }).populate("home");
      res.json(bookings);
}