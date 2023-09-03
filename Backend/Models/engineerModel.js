const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const engineerSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please Enter Name"],
      },
      address: {
        type: String,
        required: [true, "Please Enter Address"],
      },
      city :{
        type:String,
        required : [true, "Please Enter your city"]
      },
      state: {
        type: String,
        required : [true, "Please Enter State"]
      },
      mobile : {
        type : Number,
        required : [true, "Please Enter Mobile Number "]
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
  
  engineerSchema.pre('save' ,async  function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        // this.cpassword = await bcrypt.hash(this.cpassword, 12)
        next()
    }
})

engineerSchema.methods.generateAuthToken = async function () {
  try {
      let token = jwt.sign({ _id: this._id }, "secret123")
      return token
  } catch (err) {
      console.log(err)
  }
};


  // creat Model
  const Enginner = mongoose.model("enginner", engineerSchema);
  
  module.exports = Enginner;