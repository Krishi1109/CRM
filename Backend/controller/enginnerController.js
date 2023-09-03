const Enginner = require("../Models/engineerModel");
const catchAsyncError = require("../middleware/catchAsyncError")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/ErrorHandler")

exports.newEngineer = async (req, res) => {
    try {
      const { username, address, city, state, mobile,password } = req.body;

      const enginner = new Enginner({ username, address, city, state, mobile, password });
      const userRegister = await enginner.save();
      return res.status(201).send({
        success: true,
        message: "Engineer Added Successfully",
        result: userRegister,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  };


  exports.loginEngineer = catchAsyncError(async (req, res, next) => {
    // const token = true;
    console.log(req.cookies.jwtoken)
    const token = req.cookies.engineerToken;
    if (true) {
        const { username, password } = req.body
        const engineer = await Enginner.findOne({
            username
        })

        if (engineer == null) return next(new ErrorHandler("Invalid Credentials", 422))
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            engineer.password
        )
        if (isPasswordValid) {
            let token = await engineer.generateAuthToken()

            res.cookie("engineerToken", token, {
                expiresIn: 10 * 60 * 1000,
                httpOnly: true
            })

            res.status(200).send({
                success: true,
                message: "Login Successfull..!",
                result: {
                    id: engineer._id,
                    username: engineer.username,
                    engineerToken : token
                }
            })
        } else {
            return next(new ErrorHandler("Invalid Credentials", 422))
        }
    } else {
        return next(new ErrorHandler("You Are Already Loggedin", 422))
    }

  })


  exports.updateEngineer = catchAsyncError(async (req, res, next) => {
    const _id = req.params.id
    const { username, address, city, state, mobile,password } = req.body
    const updateEngg = await Enginner.findByIdAndUpdate({ _id }, {  username, address, city, state, mobile,password }, { new: true })
    if (updateEngg) {
        res.status(200).json({
            success: true,
            message: "Update Successfully",
            result: updateEngg
        })
    } else {
        return next(new ErrorHandler("Item Not Found..!", 404))
    }
})


exports.deleteEngineer = catchAsyncError(async (req, res, next) => {
    const _id = req.params.id
    const deleteItem = await Enginner.findByIdAndDelete(_id)
    if (!deleteItem || deleteItem == null) {
        return next(new ErrorHandler("Item Not Found..!", 404))

    } else {
        return res.status(201).json({
            success: true,
            messege: "Item Deleted Successfully"
        })
    }
})
