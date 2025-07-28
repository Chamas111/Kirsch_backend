const Hvz = require("../models/hvz");

const parseGermanDate = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  return new Date(`${year}-${month}-${day}`);
};

const createHvz = async (req, res) => {
  try {
    if (req.body.datum) {
      req.body.datum = parseGermanDate(req.body.datum);
    }

    const newHvz = await Hvz.create(req.body);
    res.status(201).json(newHvz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHvz = async (req, res) => {
  try {
    const hvz = await Hvz.find();
    res.json(hvz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHvzById = async (req, res) => {
  try {
    const hvz = await Hvz.findById(req.params.id);

    if (!hvz) return res.status(404).json({ message: "Event not found" });
    res.json(hvz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHvz = async (req, res) => {
  try {
    const updatedHvz = await Hvz.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedHvz) {
      return res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    res.json(updatedHvz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHvz = async (req, res) => {
  try {
    const deletedHvz = await Hvz.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedHvz) {
      res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    res.json(deletedHvz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllHvz,
  createHvz,
  getHvzById,
  updateHvz,
  deleteHvz,
};
