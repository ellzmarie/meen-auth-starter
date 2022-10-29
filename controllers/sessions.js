// Dependencies
const express = require("express")
const bcrypt = require("bcrypt")
const sessionsRouter = express.Router()
const User = require("../models/user.js")

// New (login page)

// Delete (logout route)
sessionsRouter.delete("/", (req, res) => {
    req.session.destroy((error) => {
      res.redirect("/")
    })
  })

// Create (login route)
sessionsRouter.post("/", (req, res) => {
    // Check for an existing user
    User.findOne(
      {
        email: req.body.email,
      },
      (error, foundUser) => {
        // send error message if no user is found
        if (!foundUser) {
          res.send(`Oops! No user with that email address has been registered.`)
        } else {
            console.log('User:', foundUser)
          // If a user has been found
          // compare the given password with the hashed password we have stored
          // this will return a true or false 
          const passwordMatches = bcrypt.compareSync(
            req.body.password,
            foundUser.password
          )
        console.log('passwordMatches', passwordMatches)
          // if the passwords match
          if (passwordMatches) {
            // add the user to our session
            req.session.currentUser = foundUser
            
            console.log('session data', req.session.currentUser)

            // redirect back to our home page
            res.redirect("/")
          } else {
            // if the passwords don't match
            res.send("Oops! Invalid credentials.")
          }
        }
      }
    )
  })


// Export Sessions Router
module.exports = sessionsRouter