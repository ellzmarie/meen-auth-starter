// Dependencies
const express = require('express')
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
// Database Connection Logs
const db = mongoose.connection
db.on("error", (err) => console.log(err.message))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes / Controllers
const userController = require("./controllers/users")
app.use("/users", userController)



// Listener
app.listen(PORT, ()=> console.log(`You are listening to the smoothe sounds of port ${PORT}...`))

