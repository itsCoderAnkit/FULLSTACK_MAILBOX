const SequelizeUtil = require('sequelize')
const dotenv= require('dotenv')
dotenv.config()


const sequelizeUtil = new SequelizeUtil(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.DB_HOST
})

module.exports = sequelizeUtil
