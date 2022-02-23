const LookBookController = require("../controllers/LookBookController");
const express = require("express");
const router = express.Router();


router.get("/lookbook", LookBookController.showLooks);
router.get("/admin/lookbook/all", LookBookController.showAllLooks);

module.exports = router;