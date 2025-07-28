const express = require("express");
const router = express.Router();
const {
  getAllHvz,
  createHvz,
  getHvzById,
  updateHvz,
  deleteHvz,
} = require("../controllers/hvzs");

router.get("/", getAllHvz);

router.post("/", createHvz);
router.get("/:id", getHvzById);
router.put("/:id", updateHvz);
router.delete("/:id", deleteHvz);
module.exports = router;
