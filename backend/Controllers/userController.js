const User = require('../Model/user.js');
const UserDB = require('../Model/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.postUserSignUp = async (req, res, next) => {
    try {
        console.log('in postusersignup')
        //console.log(req.body)
        const emailUser = req.body.email;
        const passwordUser = req.body.password;
        const confirmPasswordUser = req.body.confirmPassword;

        if (emailUser.length == 0 || passwordUser.length == 0 || confirmPasswordUser.length == 0) {
            return res.status(500).json("ALL FIELD DETAILS NOT PROVIDED")
        }
        else {
            const existingUser = await UserDB.findAll({ where: { email: emailUser } })
            //console.log(">>", existingUser[0])
            if (existingUser[0]) {
                return res.status(500).json("USER ALREADY EXIST")
            }
            else {
                if (passwordUser === confirmPasswordUser) {
                    bcrypt.hash(passwordUser, 10, async (err, hash) => {
                        //console.log(err, hash)
                        const newUser = await UserDB.create({ email: emailUser, password: hash })
                        //console.log(newUser)
                        return res.status(201).json("created account")
                    })
                }
                else {
                    return res.status(500).json("PASSWORDS DID NOT MATCH")
                }

            }

        }

    }
    catch (err) {
        return res.status(400).json(err)
        console.log("signup error>>", err)
    }

}

function generateAccessToken(id, email) {
    return jwt.sign({ userId: id, userEmail: email }, process.env.JWT_SECRET_KEY)
}


exports.postUserLogin = async (req, res, next) => {
    //console.log("LOGIN CONT..")
    //console.log(req.body)

    const existingUser = await UserDB.findAll({ where: { email: req.body.email } })
    try{
        //console.log(existingUser[0])
    if (existingUser[0]) {
        const user = existingUser[0].dataValues
        bcrypt.compare( req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: "SOMETHING WENT WRONG, TRY AGAIN" })
            }
            if (result === true) {
               return res.status(200).json({ success: true, message: "USER LOGGED IN SUCCESSFULLY...",token:generateAccessToken(user.id,user.email) })
            }
            else {
                return res.status(400).json({ success: false, message: 'INVALID CREDENTIALS' })
            }
        })
    }
    else if (!existingUser[0]) {
       return res.status(404).json({success: false, message: "USER NOT FOUND"})
    }
    }
    catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
    

}