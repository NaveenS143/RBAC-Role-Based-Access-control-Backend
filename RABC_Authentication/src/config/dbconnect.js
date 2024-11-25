const mongoose=require('mongoose');

const dbConnect= async () => {
   try{ const connect =await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Connected to MongoDB at ${connect.connection.host}`);
   }catch(e){ 
    console.log(e);
    process.exit(1);
   }
};

module.exports=dbConnect;