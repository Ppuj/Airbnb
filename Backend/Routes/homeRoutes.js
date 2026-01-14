const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addHouse,
  getHouses,
  updateHouse,
  deleteHouse,
  getHouseById
} = require("../Controllers/homeController");

router.get("/", getHouses);
router.get("/:id", auth, getHouseById);
router.post("/", auth, addHouse);
router.put("/:id", auth, updateHouse);
router.delete("/:id", auth, deleteHouse);

module.exports = router;
