const express = require("express");
const User = require("../models/UserSchema"); // Import the User model
const router = express.Router();
const { body, validationResult } = require("express-validator"); // Import validation functions
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token
require('dotenv').config();

const jwt_secret = process.env.jwt_secret; // Define your JWT secret key 
const fetchUser = require("./fetchUser"); // Import the middleware to fetch user from JWT token


// User signup route ***********************************************
router.post(
  "/signup",
  [
    body("UserName").notEmpty().withMessage("Name is required"), // Validate name
    body("UserPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), // Validate password length
    body("UserEmail").isEmail().withMessage("Invalid email address"), // Validate email
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      // If there are errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status and the errors
    }

    try {
      // Check if the user already exists
      let userexist = await User.findOne({ UserEmail: req.body.UserEmail }); // Await the result
      if (userexist) {
        return res.status(400).json({ error: "User already exists with this email" });
      }

      //salt for hashing
      const salt= await bcrypt.genSalt(10); // Generate a salt for hashing
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.UserPassword, salt); // Hash the password with a salt rounds of 10
        // Create a new user with the provided details
      const user = await User.create({
        UserName: req.body.UserName, // Use the name from the request body
        UserEmail: req.body.UserEmail, // Use the email from the request body
        UserPassword: hashedPassword, // Use the hashed password 
      });
        // Create JWT token with user ID
      const data={
        userId:user.id, // Use the user ID from the created user
      }

      const authToken= jwt.sign(data,jwt_secret);
      

      res.json({ authToken }); // Respond  
    } catch (err) {
      console.error("Error creating user:", err); // Log the error if user creation fails
      return res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status
    }

    }
);



//User login authentication ***********************************************
router.post("/login",
  [
    body("UserEmail").isEmail().withMessage("Invalid email address"), // Validate email
    body("UserPassword").notEmpty().withMessage("Password is required"), // Validate password
  ],
    async (req, res) => {
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
        // If there are errors
        return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status and the errors
        }
        
        const { UserEmail, UserPassword } = req.body; // Destructure email and password from request body

        try {
        // Logic for user
        let userexist = await User.findOne({ UserEmail }); // Await the result
        if (!userexist) {
            return res.status(400).json({ error: "Invalid credentials" }); // Respond with an error if user does not exist
        }

        const passwordCompare = await bcrypt.compare(UserPassword, userexist.UserPassword); // Compare the provided password with the stored hashed password
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid credentials" }); // Respond with an error if password does not match  
        }
        const payloadData={
            userId: userexist.id, // Use the user ID from the found user    
        }
        const authToken = jwt.sign(payloadData, jwt_secret); // Create a JWT token with the user ID
        res.json({ authToken }); // Create a JWT token with the user ID and respond with it
        
        } catch (err) {
        console.error("Error during login:", err); // Log the error if login fails
        return res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status
        }
    });

//Route to get user details ***********************************


router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.userId; // get user ID from the request object
    const user = await User.findById(userId).select("-UserPassword"); // Find the user by ID and exclude the password field
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Respond with a 404 status if user not found
    } 
    res.json(user); // Respond with the user details
  } catch (err) {
    console.error("Error fetching user details:", err); // Log the error if fetching user details fails
    return res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status
  }
});

    module.exports = router; // Export the router to be used in the main app 