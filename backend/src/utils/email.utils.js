import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"


// expres server --->transport --->   smtp server
console.log( "client id ", process.env.GOOGLE_CLIENT_ID)

const transporter = nodemailer.createTransport({
    service  : "gmail",
    auth : {
       user : process.env.GOOGLE_USER,
       pass : process.env.GOOGLE_PASSWORD
    }
})


transporter.verify((error , success )=>{
    if(error){
        console.log("Error  connectoni to smtp server " , error)
    }else{
        console.log("server is connected with smtp server")
    }
})

const sendEmail = async({to , subject , text , html })=>{

    try {
        const response = await transporter.sendMail({
            from : `"Perplexity-Milan" ${process.env.GOOGLE_USER} `,
            to,  // list of receivers 
            subject, 
            text, 
            html 
        });

        console.log("email sent ", response)
        
    } catch (error) {
         console.log("cannot send email ", error)
    }

}


export default sendEmail