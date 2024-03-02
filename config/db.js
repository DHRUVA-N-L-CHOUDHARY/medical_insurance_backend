const mongoose = require("mongoose")

try {
    mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.zqjxe.mongodb.net/"+process.env.DB_DATABASE+"?retryWrites=true&w=majority")
    
    console.log("Connection established")
} catch (err) {
    console.log("Mongoose error")
}