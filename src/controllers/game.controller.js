

const express=require("express");

const gamerouter=express.Router();

const GameSchema=require("../model/game.model")


gamerouter.get("/gamesall",async(req,res)=>{
    try{
        const games=await GameSchema.find().lean().exec();
        return res.status(200).send(games);
    }catch(err){
        return res.status(400).send({message:err.message})
    }
})

gamerouter.post("/creategame",async(req,res)=>{
    try{
        const games=await GameSchema.create(req.body);
        
        return res.status(200).send(games);
    }catch(err){
        return res.status(400).send({message:err.message})
    }
})

gamerouter.patch("/update/game/:id",async(req,res)=>{
    try{
        const user=await GameSchema.findByIdAndUpdate(req.params.id,{alert:req.body.alert}).lean();
        console.log(user)
    return res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send({message:error.message});
    }
})





module.exports=gamerouter;