const express = require("express");
const router = express.Router();
const moulues_controller = require("../controller/moulues_controller");


router.get("/moulues", moulues_controller.getAllDataMoulues);
router.get("/moulues/:id", moulues_controller.getDataByIdMoulues);
router.post("/moulues", moulues_controller.createDataMoulues);
router.put("/moulues/:id", moulues_controller.putDataMoulues);
router.delete("/moulues/:id", moulues_controller.deleteDataMoulues)

module.exports = router