const http = require('http')
const express = require('express')
const bodyParser= require('body-parser')
const cors =  require('cors')

const sequelizeApps = require('./util/database.js')

const userRouter = require('./router/user.js')
const mailRouter = require('./router/mail.js')

const userModel = require('./Model/user.js')
const sentMailModel = require('./Model/sentMails.js')

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.use(userRouter)
app.use(mailRouter)

userModel.hasMany(sentMailModel)
sentMailModel.belongsTo(userModel)

app.use((req,res,next)=>{console.log("IN MIDDLEWARE")})

sequelizeApps.sync().then(result =>{
    //console.log(result)
    console.log("SERVER STARTED")
    app.listen(8000)
}).catch(err=>{
    console.log("err>>>>",err)
})