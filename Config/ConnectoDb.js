const mongosse = require ("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const mongodbUri = process.env.MONGO_URI

const connecToDb = async () =>{
    console.log("connecting........");

    try {
        const connected = await mongosse.connect(mongodbUri)

        if(connected){
            console.log("connected to Database succesfuly");
            
        }
        
    } catch (error) {
        console.log(error);
        
        
    }
    
}

module.exports = connecToDb;