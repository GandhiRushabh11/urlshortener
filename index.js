const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const ConnectDB = require("./config/ConnectDB")
const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
var cookieParser = require('cookie-parser')
const path = require('path');
const user = require('./model/users')
const app = new express()
//Load env vars
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 4000

//Connect With MongoDB
ConnectDB(process.env.MONGO_URL)

//Middleware 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(cookieParser())
app.use('/api', urlRouter)
app.use('/', staticRouter)
app.listen(PORT, () => { console.log(`Server Started and Running at ${PORT}`) })