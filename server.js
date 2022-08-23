const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//database
const connectDB = require('./db/connect')

const userRoutes = require("./route/users/usersRoute");

const app = express();

//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);

//server
//port
const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
        console.log('Connected')
    } catch(error){
        console.log(error);
    }
};

start();