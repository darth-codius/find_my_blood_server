// Database connection function
const mongoose = require('mongoose')
require('dotenv').config()
const DB = 'mongodb://localhost:27017/findMyBlood-db'
// process.env.DATABASE_URL ||
const mongodb = async ()=> { 
 
    try {
       await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            createIndexes: true,
            })
            
            console.log(`Database connection successful!`)    
    } catch (err) {
        console.log(DB)
        console.log(err)     
        
    }
    
    }
    
module.exports = mongodb;