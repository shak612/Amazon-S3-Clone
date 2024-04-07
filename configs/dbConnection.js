const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/AWS_S3_Clone');

        console.log("Connected to Database...");

    }
    catch (err) {
        console.log("Could Not connect to Database...", err)
    }
}

module.exports = connectDB;