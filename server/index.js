const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const { mongoose } = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();
const port = 8080;

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected successfully"))
.catch((err)=> console.log("Database not connected", err))

app.use('/',require('./routes/authRoutes'))

app.listen(port, ()=> console.log(`App is listening in the port ${port}`));