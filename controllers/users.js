// Dependencies
const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const hashedString = bcrypt.hashSync("yourPasswordStringHere", bcrypt.genSaltSync(10))


// New (registration page)

// Create (registration route)

// Export User Router
module.exports = userRouter

userRouter.post("/", (req, res) => {
    console.log(req.body)
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    res.send(req.body)
  })

