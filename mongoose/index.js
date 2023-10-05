const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE
async function connectMongo() {
    try {
        await mongoose.connect(DATABASE)
        console.log("Successfully connected to mongoDB")
    } catch { err => console.log(err, "something is wrong") }
}

module.exports = { connectMongo }