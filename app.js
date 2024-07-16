const express=require("express")
const app=express()
const path=require("path")


const db =require("./config/mongoose-connection")
const indexRouter = require('./routes/indexRoute');
const registerRouter=require("./routes/registerRouter")
const profileRouter=require("./routes/profileRoute")
const createRoute=require("./routes/createRoute.js")
var session = require('express-session')
const flash=require("connect-flash")


const cookieParser=require('cookie-parser')
const bcrypt = require('bcrypt');





app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }) )
app.use(flash())



app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use("/profile",profileRouter)
app.use("/profile/create",createRoute)


app.listen(process.env.PORT || 3000)
