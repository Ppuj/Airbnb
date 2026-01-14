debugger;
const express = require("express");
const cors = require("cors");
// require("dotenv").config();
require("dotenv").config({ path: __dirname + "/.env" });
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
connectDB(); 



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
