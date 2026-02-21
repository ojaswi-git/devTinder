const mongoose=require("mongoose");

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://namastedev:RmDRpLBcKP0cb6hu@namastenode.gzgnvot.mongodb.net/devTinder");
};

module.exports=connectDB;