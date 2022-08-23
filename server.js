const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//database
const connectDB = require('./db/connect')

//routes
const userRoutes = require("./route/users/usersRoute");

const app = express();

//Middleware
app.use(express.json());

//extra middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//Users route
app.use("/api/users", userRoutes);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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