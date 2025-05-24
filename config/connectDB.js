require('dotenv').config();
// 01 import mongoose
const mongoose = require('mongoose')

//02 le body
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("La base de donnees est connectee avec succes");
        
    }
    catch(err){
        console.log("N'est pas connecte",err)
    }
}



//03 le export

module.exports = connectDB

