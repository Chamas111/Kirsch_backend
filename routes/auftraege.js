const express = require("express");
const router = express.Router();
const {
  getAllAuftraege,
  getAuftragById,
  updateAuftrag,
  deleteAuftrag,
  createAuftrag,
} = require("../controllers/auftraege");

router.get("/", getAllAuftraege);
router.get("/:id", getAuftragById);
router.put("/:id", updateAuftrag);
router.post("/", createAuftrag);
router.delete("/:id", deleteAuftrag);

module.exports = router;
