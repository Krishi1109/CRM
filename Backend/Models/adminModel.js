const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please Enter Name"],
      },
      password: {
        type: String,
        required: [true, "Please Enter PAssword"],
        minLength: [4, "Password should have more than 4 characters"],
    },

    },
    { timestamps: true },
    { versionKey: false }
  );

  adminSchema.pre('save' ,async  function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        // this.cpassword = await bcrypt.hash(this.cpassword, 12)
        next()
    }
})

adminSchema.methods.generateAuthToken = async function () {
  try {
      let token = jwt.sign({ _id: this._id }, "secret123")
      return token
  } catch (err) {
      console.log(err)
  }
};


  // creat Model
  const Amdin = mongoose.model("admin", adminSchema);
  
  module.exports = Amdin;