const express = require('express')
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/Error")
dotenv.config()

const port = process.env.PORT || 4000

const cors = require('cors')


const connectDatabase = require("./db/conn")
connectDatabase()

const app = express()
app.use(express.json())
app.use(cookieParser());

app.use(cors())

const engineerRoute = require("./Routers/enginnerRoute")
app.use('/api/enginner', engineerRoute)

const adminRoute = require("./Routers/adminRoute")
app.use("/api/admin", adminRoute)

// Port Listen
app.listen(port, () => {
    console.log(`Connection is live on port number ${port}`)
})


app.use(errorMiddleware)
