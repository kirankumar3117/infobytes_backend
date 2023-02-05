const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const connect=require("../src/db/connect.js");

//signup controller import to use in router

const registerrouter=require("./controllers/register.controller");
const gamerouter = require("./controllers/game.controller.js");
require("dotenv").config();

const port=process.env.port || 8080;
// assigning express router method to app
const app=express();

app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send({
        "name":"kiran",
        "lastname":"challagiiri"
    })
})

app.use("/",registerrouter);
app.use("/",gamerouter);


//connecting to a port

app.listen(port,async(req,res)=>{
    try{
     
        mongoose.set('strictQuery', false);
        await connect();
        mongoose.set('bufferCommands', false);
       
        console.log("connected at the port 8080");
    }catch(err){
        console.log({message:err.message})
    }
})

module.exports=app;