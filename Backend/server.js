const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config();
const connectDB=require('./config/db')
const authRoutes = require("./Routes/authRoutes");
const homeRoutes = require("./Routes/homeRoutes");
const bookingRoutes = require("./Routes/bookingRoutes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(  express.static(path.join(__dirname, "..", "Frontend", "dist")))
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,"..","Frontend","dist","index.html"));
})
connectDB(); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
