import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import connect from "../src/db/connect.js"
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

//connecting to a port

app.listen(8080,async(req,res)=>{
    try{
        mongoose.set('strictQuery', false);
        await connect();
       
        console.log("connected at the port 8080");
    }catch(err){
        console.log({message:err.message})
    }
})

export default app;