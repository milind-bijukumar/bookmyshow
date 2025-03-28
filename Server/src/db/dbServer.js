const mongoose = require("mongoose");

const connectDB = ()=>{

    const dbURL = process.env.DB_URL;
    mongoose.connect(dbURL)
    .then(()=>{
        console.log("Connected to DB Succesfully")
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;