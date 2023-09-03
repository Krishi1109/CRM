const { default: mongoose } = require("mongoose");

const dotenv = require("dotenv")
dotenv.config()
const DB_URL = process.env.DB_URL

const connectDatabase = () => {
mongoose
    .connect(DB_URL)
    .then((data) => {
        console.log("Connection Successful...!!")
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((e) => {
        console.log(e)
    })
}

module.exports = connectDatabase;