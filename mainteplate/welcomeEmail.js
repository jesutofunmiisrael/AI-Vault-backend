const transporter = require("../Config/Nodemailler")

const WelcomeEmail = async (name, email) =>{
    
     transporter.sendMail({
        to:email,
        from:"jesutofunmi",
        subject:`Welcome ${name}`,
           html:`<div style=" padding: 1rem;">
        <h2>Hello, ${name}</h2>

        <p>Welcome to AIVault 🔥</p>

     
            
    </div>`
     }, (err, info) =>{
        if(err){
            console.log(err);
            
        }else{
            console.log(`email sent to ${email}`);
            
        }
     })

}

module.exports = WelcomeEmail

