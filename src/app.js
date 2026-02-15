const express=require("express");
const app=express();

app.use("/user",(req,res)=>{
    res.send("HAHAHAHA");
});
app.get("/user",(req,res)=>{
    res.send("GET METHOD");
});
app.post("/user",(req,res)=>{
    res.send("POST METHOD");
});
app.delete("/user",(req,res)=>{
    res.send("DELETE METHOD");
});
app.listen(7777,()=>{
    console.log("server is successfully listening on port 7777");
});