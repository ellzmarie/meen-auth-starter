// Dependencies
const express = require('express')
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const PORT = process.env.PORT
const session = require("express-session")
const methodOverride = require("method-override")


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
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

app.use(methodOverride("_method"))


// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes / Controllers
//Root  URL/PATH
app.get("/", (req, res) => {
    if (req.session.currentUser) {
      res.render("dashboard.ejs", {
        currentUser: req.session.currentUser,
      })
    } else {
      res.render("index.ejs", {
        currentUser: req.session.currentUser,
      })
    }
  })

const userController = require("./controllers/users")
app.use("/users", userController)

const sessionsController = require("./controllers/sessions")
app.use("/sessions", sessionsController)



// Listener
app.listen(PORT, ()=> console.log(`You are listening to the smooth sounds of port ${PORT}...`))

