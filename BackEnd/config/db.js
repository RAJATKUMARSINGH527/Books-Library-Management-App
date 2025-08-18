const mongoose=require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB Atlas"); 
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = {connectToDB};