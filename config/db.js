const mongoose = require("mongoose");

const connectDB= async () => {
    try{
        const conn = await mongoose.connect(  
        "mongodb+srv://patilvishal03081979:patilvishal03081979@database.wm117kc.mongodb.net/Learnflow?retryWrites=true&w=majority",
        {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        }
        );
        console.log(`MongoDB connected ${conn.connection.host}`);
    }   catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports=connectDB;