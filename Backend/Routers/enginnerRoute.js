const express = require("express")
const { newEngineer, loginEngineer, updateEngineer, deleteEngineer } = require("../controller/enginnerController")
const { adminAuthntation } = require("../middleware/adminAuthnticate")

const router = new express.Router()
router.route("/add").post(adminAuthntation, newEngineer)
router.route("/login").post(loginEngineer)

router.route("/update/:id").patch(adminAuthntation, updateEngineer)
router.route("/delete/:id").delete(adminAuthntation, deleteEngineer)
module.exports = router