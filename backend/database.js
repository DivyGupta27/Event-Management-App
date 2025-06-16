const { default: mongoose } = require("mongoose");
require('dotenv').config()

const connectToDB=()=>{mongoose.connect(process.env.DB_URL)
    try{
        console.log('database connected')
    }
    catch(error){
        console.log('database not connected',error)
    }
}
module.exports=connectToDB