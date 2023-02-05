const express=require("express");

const registerrouter=express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt=require("bcrypt");
const Register= require("../model/signUp");

const jwt=require("jsonwebtoken");




const generateToken=(user)=>{
    return token = jwt.sign({user},"infobytes");
}

registerrouter.post("/register",async(req,res)=>{
    try {
        let register=await Register.findOne({email:req.body.email});
        let checkUserId=await Register.findOne({username:req.body.username})
        if(register || checkUserId){
           return res.status(400).send("User Already Exists");
        }
        req.body.uuid=uuidv4();
        register=await Register.create(req.body); 
        let token=generateToken(register);
        return res.status(200).send({register,token});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
});

registerrouter.patch("/update/gamerequest/:id",async(req,res)=>{
    try{
        const user=await Register.findByIdAndUpdate(req.params.id,{alert:req.body.alert}).lean();
        console.log(user)
    return res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send({message:error.message});
    }
})

registerrouter.put("/userpushnotification/:id",async(req,res)=>{
    try{
        const userData=await Register.findOneAndUpdate({_id:req.params.id},{$push:{
            notification:req.body.notification
        }});
        return res.status(200).send(userData);
    }catch(err){
        return res.status(401).send({message:err.message})
    }
})
registerrouter.get("/user/:id",async(req,res)=>{
    try{
        const user=await Register.findById(req.params.id);
        return res.status(200).send(user)
    }catch(err){
        return res.status(400).send({message:err.message});
    }
})
registerrouter.post("/login",async(req,res)=>{
    const user=await Register.findOne({username:req.body.username});

    if(!user){
        return res.status(400).send("wrong details entered");
    }
   
    const match=bcrypt.compareSync(req.body.password, user.password);
   

    if(!match){
        return res.status(400).send("wrong details entered");
    }

    let token=generateToken(user);
    return res.status(200).send({user,token});


})
registerrouter.post("/usertoplay",async(req,res)=>{
    try{
        const user=await Register.findOne({email:req.body.email});
        if(!user){
            res.status(200).send("user not found");
        }
        res.status(200).send(user);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
})
module.exports=registerrouter;