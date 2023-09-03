const express = require("express")
const { addAdmin, loginAdmin } = require("../controller/adminController")

const router = new express.Router()

router.route("/addadmin").post(addAdmin)
router.route("/loginadmin").post(loginAdmin)

module.exports = router