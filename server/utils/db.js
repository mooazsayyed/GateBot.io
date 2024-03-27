const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
//mongoose.connect(URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("data base connection sucessfull")
    }
    catch(error) {
        console.error("data base connection failed")
        process.exit(0);
    }
};

module.exports = connectDb;