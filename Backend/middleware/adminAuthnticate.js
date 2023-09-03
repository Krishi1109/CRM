const Admin = require('../Models/adminModel')
const jwt = require('jsonwebtoken')

// "tokens.token": token}
exports.adminAuthntation = async (req, res, next) => {
  try {
    console.log("Hello")
    const token =  req.cookies.adminToken;
    console.log(token)
    const verifyToken = jwt.verify(token, "secret123")

    const rootUser = await Admin.findOne({ _id: verifyToken._id, })

    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Unauthorized : No token provided --This route is avilable for the admin"
    })
  }
}
