const Auftrag = require("../models/auftrag");

const createAuftrag = async (req, res) => {
  try {
    const newAuftrag = await Auftrag.create(req.body);
    res.status(201).json(newAuftrag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.find();
    res.json(auftraege);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuftragById = async (req, res) => {
  try {
    const auftraege = await Auftrag.find({ _id: req.params.id });
    if (auftraege.length === 0) {
      res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    res.json(auftraege[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuftrag = async (req, res) => {
  try {
    const updatedAuftrag = await Auftrag.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedAuftrag) {
      return res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    res.json(updatedAuftrag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuftrag = async (req, res) => {
  try {
    const deletedAuftrag = await Auftrag.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedAuftrag) {
      res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    res.json(deletedAuftrag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAuftrag,
  getAllAuftraege,
  getAuftragById,
  updateAuftrag,
  deleteAuftrag,
};
