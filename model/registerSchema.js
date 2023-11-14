const mongoose=require("mongoose");
const registerSchema=new mongoose.Schema({
    "name":{type:String},
    "email":{type:String},
    "password":{type:String}
},{
    collection:"registrants"
})

module.exports=mongoose.model("registerSchema",registerSchema)