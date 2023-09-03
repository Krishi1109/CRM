const Admin = require("../Models/adminModel");
const catchAsyncError = require("../middleware/catchAsyncError")
const bcrypt = require("bcrypt")

exports.addAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;

      const admin = new Admin({ username,password });
      const userRegister = await admin.save();
      return res.status(201).send({
        success: true,
        message: "Admin Added Successfully",
        result: userRegister,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  };


  
  exports.loginAdmin = catchAsyncError(async (req, res, next) => {
    const token = true;
    const admintoken = req.cookies.adminToken;
    console.log(admintoken)
    if (token) {
        const { username, password } = req.body
        const admin = await Admin.findOne({
            username
        })

        if (admin == null) return next(new ErrorHandler("Invalid Credentials", 422))
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            admin.password
        )
        if (isPasswordValid) {
            let token = await admin.generateAuthToken()

            res.cookie("adminToken", token, {
                expiresIn: 10 * 60 * 1000,
                httpOnly: true
            })

            res.status(200).send({
                success: true,
                message: "Admin Login Successfull..!",
                result: {
                    id: admin._id,
                    username: admin.username,
                    adminToken : token
                }
            })
        } else {
            return next(new ErrorHandler("Invalid Credentials", 422))
        }
    } else {
        return next(new ErrorHandler("You Are Already Loggedin", 422))
    }

  })