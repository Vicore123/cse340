const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null,
  })
}

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

invCont.addClassification = async function (req, res, next) {
  const  { classification_name } = req.body
  let nav = await utilities.getNav()
  req.flash(
      "notice",
      `Congratulations, Classification Added`
    )
  res.status(200).render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })

  const regResult = await invModel.addClassification(classification_name)

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, Classification Added`
    )
  } else {
    req.flash("notice", "Sorry, the classification adding failed.")
  }
}

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: null,
    classificationList
  })
}

invCont.addInventory = async function (req, res, next) {
  const  { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color } = req.body
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  req.flash(
      "notice",
      `Congratulations, Inventory Added`
    )
  res.status(200).render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: null,
    classificationList
  })

  const regResult = await invModel.addInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, Inventory Added`
    )
  } else {
    req.flash("notice", "Sorry, the Inventory adding failed.")
  }
}

module.exports = invCont