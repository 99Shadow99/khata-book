const express=require("express")
const app=express()
const path=require("path")


const indexRouter = require('./routes/indexRoute');
const registerRouter=require("./routes/registerRouter")
const loginRouter=require("./routes/loginRouter")
const db =require("./config/mongoose-connection")
const cookieParser=require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);



app.listen(process.env.PORT || 3000)
