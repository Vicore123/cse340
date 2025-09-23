const itemModel = require("../models/item-model")
const utilities = require("../utilities/")

const itemCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
itemCont.buildByItemId = async function (req, res, next) {
  const item_id = req.params.itemId
  const data = await itemModel.getItemByItemId(item_id)
  const grid = await utilities.buildItem(data[0])
  let nav = await utilities.getNav()
  
  res.render("./inventory/classification", {
    title: `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`,
    nav,
    grid,
  })
}

module.exports = itemCont