const mongoose=require("mongoose");
const contactSchema=new mongoose.Schema({
    "Fname":{type:String},
    "Lname":{type:String},
    "email":{type:String},
    "subject":{type:String},
    "message":{type:String}
},{
    collection:"contacts"
})

module.exports=mongoose.model("contactSchema",contactSchema)