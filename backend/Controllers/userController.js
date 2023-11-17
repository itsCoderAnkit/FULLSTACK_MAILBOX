const User = require('../Model/user.js');
const UserDB  = require('../Model/user.js')
const bcrypt = require('bcrypt')

exports.postUserSignUp = async (req,res,next)=>{
    console.log('in postusersignup')
    console.log(req.body)
    const emailUser= req.body.email;
    const passwordUser = req.body.password;
    const confirmPasswordUser = req.body.confirmPassword;

    if(emailUser.length==0 || passwordUser.length==0 ||  confirmPasswordUser.length==0){
        return res.status(500).json("ALL FIELD DETAILS NOT PROVIDED")
    }
    else{
        const existingUser = await UserDB.findAll({where:{email:emailUser}})
        console.log(">>",existingUser[0])
        if(existingUser[0]){
            return res.status(500).json("USER ALREADY EXIST")
        }
        else{
            if(passwordUser===confirmPasswordUser){
                bcrypt.hash(passwordUser,10,async(err,hash)=>{
                    console.log(err,hash)
                        const newUser = await UserDB.create({email:emailUser,password:hash})
                        console.log(newUser)
                        return res.status(201).json("created account")
                    })
            }
            else{
                return res.status(500).json("PASSWORDS DID NOT MATCH")
            }
            
        }

    }

    
}