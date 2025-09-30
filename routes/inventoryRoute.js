const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const itemController = require("../controllers/itemController")
const utilities = require("../utilities/index")
const regValidate = require('../utilities/account-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:itemId", utilities.handleErrors(itemController.buildByItemId));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

router.post(
  "/add-classification",
  regValidate.AddClassificationRules(),
  regValidate.checkRegDataAddClassification,
  utilities.handleErrors(invController.addClassification)
)

router.post(
  "/add-inventory",
  regValidate.AddInventoryRules(),
  regValidate.checkRegDataAddInventory,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router;