const User = require('../Model/user.js')
const sentMail = require('../Model/sentMails.js')

exports.sentMail=async (req,res,next)=>{
    try{
        console.log("sent mail controlller",req.user.id,req.body)
        const saveMail = await sentMail.create({
            receiver:req.body.receiver,
            sender:req.user.email,
            subject:req.body.subject,
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

exports.getAllInbox = async (req,res,next)=>{
    try{
        //console.log("get all inbox",req.user)

        const allInboxMails = await sentMail.findAll({where:{receiver:req.user.email}})

       // console.log(allInboxMails)
        res.status(200).json({success:true,data:allInboxMails})

    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Unable to Fetch inbox mails"})
    }
}

exports.getSentMails = async(req,res,next)=>{
    try{
        console.log("sentmailcontroller>>",req.user.email)
        const allSentMails = await sentMail.findAll({where:{sender:req.user.email}})
        console.log(allSentMails)

        res.status(200).json({success:true,message:"GOT SENT MAILS",data:allSentMails})

    }
    catch(err){
        console.log(err)
    }
}

exports.viewMail = async(req,res,next)=>{
    try{
        console.log("view mail >>",req.params.id)

        const viewMail = await sentMail.findOne({where:{id:req.params.id}})
        console.log(viewMail)

        const updateSeen = await sentMail.update({seen:true},{where:{id:req.params.id}})

        res.status(200).json({success:true,message:"Found One Mail",data:viewMail})
    }
    catch(err){
        console.log(err)
        res.status(400).json({success:true,message:"unable to get mail"})
    }
}

exports.deleteInboxMail = async (req,res,next)=>{

    try{
        console.log("DELETING MAIL FROM INBOX",req.params)

    const deleteMail = await sentMail.destroy({where:{id:req.params.id}})
    console.log("deleted mail>>",deleteMail)

    res.status(200).json({success:true,message:"INBOX MAIL DELETED SUCCESSFULLY"})

    }
    catch(err){
        console.log(err)
        res.status(400).json({success:false,message:"INBOX MAIL NOT DELETED"})
    }

}