


const mongoose =require("mongoose");

const gameSchema=new mongoose.Schema({
    creater:{type:String,required:true},
    responser:{type:String,required:true},
    userid1:{type:String},
    userid2:{type:String},
    gamearray:{type:Array,default:[]},
    gamestate:{type:String},
    data:{type:Array,default:[]}
})

const GameSchema=mongoose.model("game",gameSchema);

module.exports=GameSchema;