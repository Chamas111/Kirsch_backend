const Invoice = require("../models/invoice");

const parseGermanDate = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  return new Date(`${year}-${month}-${day}`);
};

const createRechnung = async (req, res) => {
  try {
    console.log("📥 Received Rechnung data:", req.body);

    const rechnung = await Invoice.create(req.body);
    console.log("✅ Created Rechnung:", rechnung);
    res.status(201).json(rechnung);
  } catch (err) {
    console.error("❌ Error creating Rechnung:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

const getAllRechnung = async (req, res) => {
  try {
    const rechnung = await Invoice.find();
    res.json(rechnung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRechnungById = async (req, res) => {
  try {
    const rechnung = await Invoice.findById(req.params.id);

    if (!rechnung)
      return res.status(404).json({ message: "Rechnung not found" });
    res.json(rechnung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRechnung = async (req, res) => {
  try {
    const updatedRechnung = await Invoice.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedRechnung) {
      return res.status(404).json({ message: "Rechnung nicht gefunden" });
    }
    res.json(updatedRechnung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRechnung = async (req, res) => {
  try {
    const deletedRechnung = await Invoice.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedRechnung) {
      res.status(404).json({ message: "Rechnung nicht gefunden" });
    }
    res.json(deletedRechnung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createRechnung,
  getAllRechnung,
  getRechnungById,
  updateRechnung,
  deleteRechnung,
};
