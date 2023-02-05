
const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
//creating model schema for user signup

const signUp= new mongoose.Schema({
    email:{type:String,required:true},
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    uuid:{type:String},
    play:{type:Boolean,default:false},
    alert:{type:String},
    games:{type:Object},
    notification:{type:Array,default:[]},
    data:{type:Array,default:[]}
},
{
    versionKey:false,
    timestamps:true
}

)

signUp.pre("save",function(next){
    let salt=8;
    const hash = bcrypt.hashSync(this.password,salt);
    this.password=hash;
    return  next();

})



const Register=mongoose.model("register",signUp)
module.exports=Register;