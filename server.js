require('dotenv').config();
const express = require("express")

//database
const connectDB = require('./db/connect')

const app = express();

//port
const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch(error){
        console.log(error);
    }
};

start();