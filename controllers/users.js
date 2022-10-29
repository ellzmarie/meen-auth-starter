// Dependencies
const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const hashedString = bcrypt.hashSync("yourPasswordStringHere", bcrypt.genSaltSync(10))


// New (registration page)
userRouter.get("/new", (req, res) => {
    res.render("users/new.ejs", {
      currentUser: req.session.currentUser,
    })
  })

// Create (registration route)
userRouter.post("/", (req, res) => {
    console.log(req.body)
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, createdUser) => {
        res.redirect("/")

    // CREATE USER
    // User.create(req.body, (error, createdUser) => {
    //     res.send(createdUser)
  })
})

// Export User Router
module.exports = userRouter


        