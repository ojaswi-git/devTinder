const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

require('dotenv').config();
app.use(express.json());
app.post("/signup",async(req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.send("User saved successfully");
    } catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
});
//Get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const user=await User.find({emailId:userEmail});
        res.send(user);
    } catch(err){
        res.status(400).send("Error fetching the user:"+err.message);
    }
});

app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    } catch(err){
        res.status(400).send("Error fetching the users:"+err.message);
    }
});

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err){
        res.status(400).send("Error deleting the user:"+err.message);
    }
});

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;

    const ALLOWED_UPDATES=["photoUrl","userId","about","skills","gender","age"];
    const isUpateAllowed=Object.keys(data).every((field)=>
        ALLOWED_UPDATES.includes(field)
    );
    if(!isUpateAllowed){
        return res.status(400).send("Invalid updates");
    }
    try{
        await User.findByIdAndUpdate(userId,data);
        res.send("User updated successfully");
    } catch(err){
        res.status(400).send("Error updating the user:"+err.message);
    }
});    
connectDB()
.then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("server is successfully listening on port 7777");
    });
})
.catch((err)=>{
    console.error("Database cannot be connected");
});

