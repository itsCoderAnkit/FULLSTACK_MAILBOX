const User = require('../Model/user.js')
const sentMail = require('../Model/sentMails.js')


exports.sentMail=async (req,res,next)=>{
    try{
        console.log("sent mail controlller",req.user.id,req.body)
        const saveMail = await sentMail.create({
            receiver:req.body.receiver,
            sender:req.user.email,
            subject:req.user.subject,
            content:req.body.content,
            userId:req.user.id
        })

        console.log(saveMail)
        res.status(201).json({success:true,message:"MAIL SAVED"})

    }
    catch(err){
        console.log(err)
        res.status(400).json({success:false,message:"UNABLE TO SAVE IN DB"})
    }
    


}


