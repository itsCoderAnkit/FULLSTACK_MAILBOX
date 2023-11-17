const http = require('http')
const express = require('express')
const bodyParser= require('body-parser')
const cors =  require('cors')

const sequelizeApps = require('./util/database.js')

const user = require('./router/user.js')

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.use(user)

app.use((req,res,next)=>{console.log("IN MIDDLEWARE")})

sequelizeApps.sync({force:true}).then(result =>{
    //console.log(result)
    console.log("SERVER STARTED")
    app.listen(8000)
}).catch(err=>{
    console.log("err>>>>",err)
})