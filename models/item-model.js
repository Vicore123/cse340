const pool = require("../database/")


async function getItemByItemId(item_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [item_id]
    )
    return data.rows
  } catch (error) {
    console.error("getItembyid error " + error)
  }
}

module.exports = {getItemByItemId};