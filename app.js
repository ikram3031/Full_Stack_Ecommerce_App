require('dotenv').config();
require('express-async-errors')
//express
const express = require('express')
const app = express()

//rest packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//database
const connectDB = require('./db/connect')

// Routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')


//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//security, remove in production
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());


//morgan middleware
app.use(morgan('tiny'))

//express middleware
app.use(express.json());

//cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

//static assets
app.use(express.static('./public'))

//file upload
app.use(fileUpload())

//home route
app.get('/', (req,res) => {
    res.send('<h1>E_COMMERCE API</h1>')
})

app.get('/api/v1', (req,res) => {
    console.log(req.signedCookies);
    res.send("test")
})

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)


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


