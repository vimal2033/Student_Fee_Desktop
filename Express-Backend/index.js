
const connectToMongo=require('./db')
const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const port = process.env.PORT || 3000; // Define the port, using environment variable or default to 3000
require('dotenv').config();
const cors = require("cors");

app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB using the connectToMongo function from db.js
connectToMongo();

// Route for authantication
app.use('/api/auth',require('./routes/auth')); // Use the auth routes defined in routes/auth.js
//Rout for student profile management
app.use('/api/student', require('./routes/fetchData')); // Use the student profile routes


// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Express server listening at ${port}`);
});