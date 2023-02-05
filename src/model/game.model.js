


const mongoose =require("mongoose");

const gameSchema=new mongoose.Schema({

    userid1:{type:String},
    userid2:{type:String},
    gamearray:{type:Array,default:[]},
    gamestate:{type:String}
})

const GameSchema=mongoose.model("game",gameSchema);

module.exports=GameSchema;