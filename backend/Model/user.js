const SequelizeModelUser = require('sequelize')

const sequelizeModelUser = require('../util/database.js')


const User = sequelizeModelUser.define('user',{
    id:{
        type:SequelizeModelUser.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:SequelizeModelUser.STRING,
        allowNull:false
    },
    password:{
        type:SequelizeModelUser.STRING
    }
})

module.exports =  User