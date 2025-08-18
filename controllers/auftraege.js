const Auftrag = require("../models/auftrag");

const createAuftrag = async (req, res) => {
  try {
    const newAuftrag = await Auftrag.create({
      ...req.body,
      createdBy: req.user._id,
    });
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

const auftragStatsMonthly = async (req, res) => {
  try {
    const year = parseInt(req.params.year); // e.g. /stats/monthly/2025

    const stats = await Auftrag.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(
      stats.map((s) => ({
        month: s._id,
        count: s.count,
      }))
    );
  } catch (err) {
    console.error("❌ Error fetching monthly stats:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const auftragStatsYearly = async (req, res) => {
  try {
    const stats = await Auftrag.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(stats.map((s) => ({ year: s._id, count: s.count })));
  } catch (err) {
    console.error("❌ Error fetching yearly stats:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createAuftrag,
  getAllAuftraege,
  getAuftragById,
  updateAuftrag,
  deleteAuftrag,
  auftragStatsYearly,
  auftragStatsMonthly,
};
