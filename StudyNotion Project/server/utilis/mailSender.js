const nodemailer = require('nodemailer');


const mailSender = async(email,title,body) => {
    try{
        // create transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        let info = transporter.sendMail({
            from:"StudyNotion || By Akash Shaw",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;
    }catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;