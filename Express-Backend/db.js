const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("we are connected to mongodb successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

module.exports = connectToMongo;
