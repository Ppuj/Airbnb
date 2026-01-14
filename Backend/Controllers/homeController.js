const House = require("../Model/Home");

// Add house (host only)
exports.addHouse = async (req, res) => {
  if (req.user.role !== "host") return res.status(403).json({ message: "Only hosts can add houses" });
  try {
    const house = await House.create({
      ...req.body,
      host: req.user.id
    });
    res.status(201).json(house);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all houses
exports.getHouses = async (req, res) => {
  try {
    const houses = await House.find().populate("host", "name email role");
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update house
exports.updateHouse = async (req, res) => {
  try {
      if (req.user.role !== "host") return res.status(403).json({ message: "Only hosts can edit houses" });
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: "House not found" });
    if (house.host.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHouse);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete house
exports.deleteHouse = async (req, res) => {
  try {
    if (req.user.role !== "host") {
      return res.status(403).json({ message: "Only hosts can delete houses" });
    }

    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: "House not found" });

    if (house.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await House.findByIdAndDelete(req.params.id); // safer than house.remove()
    res.json({ message: "House removed" });

  } catch (err) {
    console.error("DELETE HOUSE ERROR:", err); // log the real error
    res.status(500).json({ message: err.message }); // send real error
  }
};

exports.getHouseById = async (req, res) => {
  try {
     const { id } = req.params;
    const house = await House.findById(id);
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house);
  } catch (err) {
    console.error("GET HOUSE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
