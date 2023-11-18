const Sequelize = require('sequelize')

const sequelize = require('../util/database.js')

const SentMails = sequelize.define('sent_mails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    receiver:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sender:{
        type:Sequelize.STRING,
        allowNull:false
    },
    subject:{
        type:Sequelize.STRING,
        allowNull:true
    },
    content:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

module.exports = SentMails