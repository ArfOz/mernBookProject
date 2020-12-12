const mongoose = require("mongoose");


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log("sUCCESFULLY CONNECTED TO DB");

    } catch(error){
        console.log("error connecting db", error);
    }

};

module.exports = connectDB;