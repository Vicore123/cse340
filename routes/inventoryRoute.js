const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const itemController = require("../controllers/itemController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:itemId", itemController.buildByItemId);

module.exports = router;