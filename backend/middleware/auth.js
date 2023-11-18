const jwt = require('jsonwebtoken')
const User = require('../Model/user')
const dotenv = require('dotenv')

dotenv.config()


exports.authenticate = async (req,res,next)=>{
    try{
        console.log("in middle", )
        const token = req.headers.authorization
        console.log(token)

        const user = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(user)

        const userVerify = await User.findByPk(user.userId)

        console.log(userVerify)

        if(userVerify){
            req.user = userVerify
            next()
        }
        else{
            throw new Error("KINDLY LOGIN FIRST")
        }


    }
    catch(err){
        console.log(err)
        res.status(500).json("LOGIN TOKEN NOT FOUND, KINDLY LOGIN FIRST")
    }
}