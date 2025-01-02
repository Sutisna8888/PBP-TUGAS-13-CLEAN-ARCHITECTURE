const express = require("express");
const router = express.Router();
const pemainController = require("../controllers/pemainController");

router.get("/:liga", pemainController.getAllPlayers);
router.get("/:liga/:id", pemainController.getPlayerById);
router.post("/:liga", pemainController.createPlayer);
router.put("/:liga/:id", pemainController.updatePlayer);
router.delete("/:liga/:id", pemainController.deletePlayer);

module.exports = router;
